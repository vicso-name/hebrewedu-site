"""Offline behavioral checks. No provider calls, credentials or real history writes."""
import copy
import csv
import io
import json
from pathlib import Path
import sqlite3
import tempfile
import unittest
from unittest.mock import patch
from decimal import Decimal
from types import SimpleNamespace

import rank_tracker as rt


def keywords():
    return [dict(keyword=f"keyword {i}", target_url="https://hebrewedu.com/blog/target/") for i in range(36)]


def response(keyword="keyword 0", rank=7, url="https://hebrewedu.com/blog/target/", cost="0.004"):
    data = {k: v for k, v in rt.CONFIG.items() if k != "search_engine"}
    data["keyword"] = keyword
    items = [dict(type="organic", rank_group=i, rank_absolute=i+3,
                  url=url if i == rank else f"https://other.example/{i}") for i in range(1, 21)]
    return dict(status_code=20000, cost=cost, tasks_count=1, tasks=[dict(
        id="task-id", status_code=20000, cost=cost, result_count=1, data=data,
        result=[dict(keyword=keyword, location_code=2840, language_code="en",
                     items=items, items_count=len(items), pages_count=2)])])


def account_response(base="0.002", balance="0.798"):
    return dict(status_code=20000, cost=0, tasks=[dict(status_code=20000, result=[dict(
        price=dict(serp=dict(live=dict(advanced=dict(priority_normal=[dict(cost_type="per_request", cost=base)])))),
        money=dict(balance=balance))])])


class ParsingTests(unittest.TestCase):
    def parse(self, p):
        return rt.parse_response(p, "keyword 0", "https://hebrewedu.com/blog/target/")

    def test_organic_rank_uses_group_not_absolute(self):
        p = self.parse(response())
        self.assertEqual((p["status"], p["organic_rank"]), ("exact_target", 7))
        self.assertEqual(p["returned_result_count"], 20)
        self.assertEqual(p["returned_organic_count"], 20)

    def test_exact_target_precedes_better_other_owned_url(self):
        p = response()
        p["tasks"][0]["result"][0]["items"][0]["url"] = "https://hebrewedu.com/"
        self.assertEqual(self.parse(p)["organic_rank"], 7)

    def test_other_owned_url_distinct_from_assigned_target(self):
        p = self.parse(response(url="https://hebrewedu.com/blog/other/"))
        self.assertEqual((p["status"], p["organic_rank"]), ("other_hebrewedu_url", 7))

    def test_host_spoofing_and_subdomains(self):
        self.assertFalse(rt.own_url("https://hebrewedu.com.evil.example/"))
        self.assertFalse(rt.own_url("https://evil.example/hebrewedu.com"))
        self.assertTrue(rt.own_url("https://www.hebrewedu.com/"))
        self.assertFalse(rt.own_url(42))

    def test_url_normalization_is_conservative(self):
        self.assertEqual(rt.normalized_url("https://HEBREWEDU.COM:443#fragment"), "https://hebrewedu.com/")
        self.assertNotEqual(rt.normalized_url("https://www.hebrewedu.com/"), rt.normalized_url("https://hebrewedu.com/"))
        self.assertNotEqual(rt.normalized_url("https://hebrewedu.com/path"), rt.normalized_url("https://hebrewedu.com/path/"))
        self.assertNotEqual(rt.normalized_url("https://hebrewedu.com/?a=1"), rt.normalized_url("https://hebrewedu.com/"))

    def test_absence_with_sparse_results_remains_unobserved(self):
        p = response(rank=None)
        r = p["tasks"][0]["result"][0]
        r["items"] = r["items"][:6]
        r["items_count"] = 6
        result = self.parse(p)
        self.assertEqual(result["status"], "not_found")
        self.assertIsNone(result["organic_rank"])
        self.assertEqual(result["checked_organic_count"], 6)
        self.assertIn("6 checked", result["note"])

    def test_items_beyond_checked_depth_are_not_rankings(self):
        p = response(rank=None)
        r = p["tasks"][0]["result"][0]
        r["items"].append(dict(type="organic",rank_group=21,url="https://hebrewedu.com/blog/target/"))
        r["items_count"] = len(r["items"])
        self.assertEqual(self.parse(p)["status"], "not_found")

    def test_missing_empty_and_invalid_data_are_not_absence(self):
        variants = [None, {}, [], dict(status_code=20000, tasks=[])]
        p = response(); p["tasks"][0]["result"] = None; variants.append(p)
        p = response(); p["tasks"][0]["result"][0]["items"] = []; variants.append(p)
        p = response(rank=None); p["tasks"][0]["result"][0]["items"][0]["rank_group"] = 0; variants.append(p)
        p = response(rank=None); p["tasks"][0]["result"][0]["items"][0]["url"] = None; variants.append(p)
        p = response(rank=None); p["tasks"][0]["result"][0]["items_count"] = 999; variants.append(p)
        p = response(); p["tasks"][0]["data"]["device"] = "desktop"; variants.append(p)
        p = response(); p["tasks"][0]["data"]["depth"] = 10; variants.append(p)
        p = response(); p["tasks"][0]["result"][0]["keyword"] = "different"; variants.append(p)
        for p in variants:
            with self.subTest(p=p):
                result = self.parse(p)
                self.assertEqual(result["status"], "missing_data")
                self.assertIsNone(result["organic_rank"])

    def test_failure_and_missing_cost(self):
        p = response(); p["tasks"][0]["status_code"] = 40100
        self.assertEqual(self.parse(p)["status"], "api_failure")
        p = response(); del p["cost"]; del p["tasks"][0]["cost"]
        self.assertIsNone(self.parse(p)["charged_cost_usd"])

    def test_costs_not_double_counted_or_coerced_to_zero(self):
        result = self.parse(response())
        self.assertEqual(Decimal(result["charged_cost_usd"]), Decimal("0.004"))
        self.assertIsNone(rt.money(None)); self.assertIsNone(rt.money("NaN"))
        self.assertIsNone(rt.money(-1)); self.assertIsNone(rt.money(True))
        self.assertEqual(rt.balance_value("-0.1"), Decimal("-0.1"))
        p = response(); p["cost"] = "0.005"
        self.assertEqual(self.parse(p)["charged_cost_usd"], "0.005")


class HistoryTests(unittest.TestCase):
    def setUp(self):
        self.db = rt.connection()
        self.rows = keywords()
        self.start("run-1")

    def tearDown(self):
        self.db.close()

    def start(self, rid, rows=None):
        rt.start_run(self.db, rid, rows or self.rows, "csv-hash", Decimal("0.20"), Decimal("0.144"), {})

    def fake_api(self, *args):
        payload = args[2]
        self.assertEqual(len(payload), 1)
        self.assertEqual(payload[0]["depth"], 20)
        self.assertEqual(payload[0]["max_crawl_pages"], 2)
        self.assertFalse(payload[0]["load_async_ai_overview"])
        self.assertFalse(payload[0]["calculate_rectangles"])
        return 200, json.dumps(response(keyword=payload[0]["keyword"]))

    def execute(self, api=None, cap="0.20", rid="run-1"):
        return rt.execute_tasks(self.db, rid, self.rows, Decimal("0.004"), Decimal(cap), ("fake", "fake"), api_fetch=api or self.fake_api)

    def test_schema_and_all_history_tables_are_append_only(self):
        rt.validate_schema(self.db)
        for table in rt.TABLES:
            for action in ("UPDATE", "DELETE"):
                with self.subTest(table=table, action=action):
                    # Fill each table below before attempting modification: triggers fire on rows.
                    triggers = list(self.db.execute("SELECT name FROM sqlite_master WHERE type='trigger' AND name=?", (f"{table}_no_{action.lower()}",)))
                    self.assertEqual(len(triggers), 1)
        with self.assertRaises(sqlite3.IntegrityError):
            self.db.execute("UPDATE runs SET started_at='changed'")
        with self.assertRaises(sqlite3.IntegrityError):
            self.db.execute("DELETE FROM run_keywords")
        self.db.execute("DROP TRIGGER observations_no_update")
        with self.assertRaises(rt.TrackerError):
            rt.validate_schema(self.db)

    def test_successful_36_keyword_run_and_raw_json_roundtrip(self):
        total, unknown, reason = self.execute()
        self.assertEqual((total, unknown, reason), (Decimal("0.144"), 0, "completed"))
        obs = list(self.db.execute("SELECT * FROM observations"))
        self.assertEqual(len(obs), 36)
        self.assertEqual(len(list(self.db.execute("SELECT * FROM requests"))), 36)
        self.assertEqual(json.loads(obs[0]["provider_response_json"]), response())
        self.assertEqual(obs[0]["raw_response_text"], json.dumps(response()))
        with self.assertRaises(sqlite3.IntegrityError):
            self.db.execute("UPDATE observations SET organic_rank=0")
        with self.assertRaises(sqlite3.IntegrityError):
            self.db.execute("DELETE FROM observations")

    def test_cost_cap_stops_and_records_unattempted_rows(self):
        total, unknown, reason = self.execute(cap="0.008")
        self.assertEqual((total, unknown, reason), (Decimal("0.008"), 0, "budget_stop"))
        self.assertEqual(self.db.execute("SELECT COUNT(*) FROM requests").fetchone()[0], 2)
        self.assertEqual(self.db.execute("SELECT COUNT(*) FROM observations WHERE status='missing_data' AND attempted=0 AND organic_rank IS NULL").fetchone()[0], 34)

    def test_reserve_next_request_before_crossing_cap(self):
        self.execute(cap="0.006")
        self.assertEqual(self.db.execute("SELECT COUNT(*) FROM requests").fetchone()[0], 1)

    def test_transport_error_stops_without_retry(self):
        calls = []
        def fail(*args):
            calls.append(args)
            raise rt.TrackerError("Transport failure")
        total, unknown, reason = self.execute(fail)
        self.assertEqual((len(calls), total, unknown, reason), (1, Decimal(0), 1, "transport_failure"))
        r = self.db.execute("SELECT * FROM observations WHERE keyword='keyword 0'").fetchone()
        self.assertEqual(r["status"], "api_failure")
        self.assertIsNone(r["charged_cost_usd"])
        self.assertIsNone(r["organic_rank"])

    def test_http_and_provider_failures_preserved(self):
        for http, mutate in [(500, False), (200, True)]:
            with self.subTest(http=http):
                rid = f"run-{http}"
                self.start(rid)
                p = response()
                if mutate: p["tasks"][0]["status_code"] = 40100
                _, _, reason = self.execute(lambda *a: (http, json.dumps(p)), rid=rid)
                self.assertEqual(reason, "api_failure")
                r = self.db.execute("SELECT * FROM observations WHERE run_id=? AND attempted=1", (rid,)).fetchone()
                self.assertEqual(json.loads(r["provider_response_json"]), p)
                self.assertEqual(r["status"], "api_failure")

    def test_non_json_http_failure_preserves_body_and_unknown_charge(self):
        _, unknown, reason = self.execute(lambda *a: (502, "upstream failed"))
        r = self.db.execute("SELECT * FROM observations WHERE attempted=1").fetchone()
        self.assertEqual((unknown, reason, r["raw_response_text"]), (1, "unknown_cost", "upstream failed"))

    def test_unknown_charge_and_unexpected_charge_stop(self):
        p = response(); p.pop("cost"); p["tasks"][0].pop("cost")
        self.assertEqual(self.execute(lambda *a: (200, json.dumps(p)))[2], "unknown_cost")
        self.start("run-2")
        self.assertEqual(self.execute(lambda *a: (200, json.dumps(response(cost="0.05"))), rid="run-2")[2], "unexpected_cost")

    def test_interruption_and_local_error_are_recorded(self):
        def interrupt(*a): raise KeyboardInterrupt
        _, unknown, reason = self.execute(interrupt)
        self.assertEqual((unknown, reason), (1, "interrupted"))
        self.start("run-2")
        def bug(*a): raise RuntimeError("synthetic local bug")
        with self.assertRaises(RuntimeError): self.execute(bug, rid="run-2")
        e = self.db.execute("SELECT details_json FROM run_events WHERE run_id='run-2'").fetchone()
        self.assertEqual(json.loads(e[0])["reason"], "local_failure")
        self.assertEqual(self.db.execute("SELECT COUNT(*) FROM observations WHERE run_id='run-2'").fetchone()[0], 36)

    def test_previous_comparable_complete_run_changes(self):
        self.execute()
        self.start("run-partial")
        self.execute(cap="0.008",rid="run-partial")
        self.start("run-2")
        rt.execute_tasks(self.db, "run-2", self.rows, Decimal("0.004"), Decimal("0.20"), ("fake","fake"),
                         api_fetch=lambda *a: (200, json.dumps(response(keyword=a[2][0]["keyword"], rank=4))))
        entries, _, previous = rt.latest_rows(self.db, self.rows)
        self.assertEqual(previous["id"], "run-1")
        self.assertEqual(entries[0]["change"], 3)

    def test_target_or_device_change_is_incomparable(self):
        self.execute()
        changed = copy.deepcopy(self.rows); changed[0]["target_url"] = "https://hebrewedu.com/changed/"
        self.start("run-2", changed)
        entries, _, previous = rt.latest_rows(self.db, changed)
        self.assertIsNone(previous)
        self.assertIsNone(entries[0]["change"])
        before = rt.comparable_key(self.rows)
        with patch.dict(rt.CONFIG, device="desktop"):
            self.assertNotEqual(before, rt.comparable_key(self.rows))

    def test_unobserved_previous_or_latest_never_gets_numeric_change(self):
        self.execute()
        self.start("run-2")
        self.execute(lambda *a: (200, json.dumps(response(keyword=a[2][0]["keyword"],rank=None))),rid="run-2")
        entries, _, _ = rt.latest_rows(self.db, self.rows)
        self.assertIsNone(entries[0]["change"])
        self.assertIsNone(entries[0]["organic_rank"])
        with tempfile.TemporaryDirectory() as tmp, patch("sys.stdout", new=io.StringIO()):
            rt.write_report(self.db, self.rows, Path(tmp))
            export = list(csv.DictReader(io.StringIO((Path(tmp)/'run-2.csv').read_text())))
            self.assertEqual(export[0]["organic_rank"], "")
            self.assertEqual(export[0]["change"], "")

    def test_pending_request_is_visible(self):
        self.db.execute("INSERT INTO requests VALUES('run-1','keyword 0','timestamp','[]')")
        entries, _, _ = rt.latest_rows(self.db, self.rows)
        self.assertEqual((entries[0]["status"], entries[0]["attempted"]), ("api_failure", 1))
        self.assertIn("charge unknown", entries[0]["note"])

    def test_pilot_import_is_separate_and_idempotent(self):
        rt.import_pilot(self.db, rt.HERE/'historic-pilot.json')
        rt.import_pilot(self.db, rt.HERE/'historic-pilot.json')
        self.assertEqual(self.db.execute("SELECT COUNT(*) FROM pilot_observations").fetchone()[0], 1)
        self.assertEqual(self.db.execute("SELECT COUNT(*) FROM observations").fetchone()[0], 0)
        with self.assertRaises(sqlite3.IntegrityError):
            self.db.execute("DELETE FROM pilot_observations")

    def test_complete_provider_json_export_is_immutable(self):
        self.execute()
        with tempfile.TemporaryDirectory() as tmp:
            output = Path(tmp)
            rt.export_json(self.db,output)
            paths = list(output.rglob('*.json'))
            self.assertEqual(len(paths),36)
            p = output/'run-1'/(rt.sha(b'keyword 0')+'.json')
            self.assertEqual(json.loads(p.read_text()),response())
            rt.export_json(self.db,output)
            p.write_text('{}')
            with self.assertRaises(rt.TrackerError): rt.export_json(self.db,output)


class SafetyTests(unittest.TestCase):
    def test_modified_input_requires_reapproval(self):
        with tempfile.TemporaryDirectory() as tmp:
            p = Path(tmp)/'keywords.csv'
            p.write_text('keyword,target_url\nchanged,https://hebrewedu.com/\n')
            with self.assertRaisesRegex(rt.TrackerError,'differs from the approved'):
                rt.read_keywords(p)
    def test_budget_and_saved_evidence(self):
        unit, _ = rt.offline_pricing(rt.HERE/'pricing-evidence.json')
        self.assertEqual(rt.budget_check(unit, 36, Decimal('0.20')), Decimal('0.144'))
        with self.assertRaises(rt.TrackerError): rt.budget_check(unit,36,Decimal('0.14'))

    def test_fresh_pricing_verification_or_fail_closed(self):
        price = "<h2>Live Mode</h2><p>Price per 1 SERP (10 search results)</p><b>$0.002</b>"
        docs = "Your account will be billed per each SERP containing up to 10 results;"
        with patch.object(rt, 'fetch', side_effect=[(200,json.dumps(account_response())), (200,price),(200,docs)]):
            unit, _, _, balance = rt.verify_pricing(('fake','fake'))
            self.assertEqual((unit,balance),(Decimal('0.004'),Decimal('0.798')))
        for bad_price,bad_docs in [(price.replace('0.002','0.003'), docs),(price,'changed depth rules'),('unavailable',docs)]:
            with patch.object(rt,'fetch', side_effect=[(200,json.dumps(account_response())),(200,bad_price),(200,bad_docs)]):
                with self.assertRaises(rt.TrackerError): rt.verify_pricing(('fake','fake'))

    def test_account_lookup_failure_and_tariff_shape_change_block(self):
        p = account_response(); p['cost'] = '0.001'
        with patch.object(rt,'fetch', return_value=(200,json.dumps(p))):
            with self.assertRaises(rt.TrackerError): rt.verify_pricing(('fake','fake'))
        p = account_response(); p['tasks'][0]['result'][0]['price'] = {}
        with patch.object(rt,'fetch', return_value=(200,json.dumps(p))):
            with self.assertRaises(rt.TrackerError): rt.verify_pricing(('fake','fake'))

    def test_noninteractive_execution_stops_before_network(self):
        args = SimpleNamespace(keywords=Path('fake.csv'),pilot=Path('fake.json'))
        with patch.object(rt,'read_keywords',return_value=(keywords(),'hash')), patch.object(rt,'pilot_data'), patch('sys.stdin.isatty',return_value=False), patch.object(rt,'fetch') as fetch:
            with self.assertRaises(rt.TrackerError): rt.run(args)
            fetch.assert_not_called()

    def test_wrong_confirmation_cannot_send_paid_request(self):
        with tempfile.TemporaryDirectory() as tmp:
            args = SimpleNamespace(keywords=Path('fake.csv'),pilot=rt.HERE/'historic-pilot.json',
                                   db=Path(tmp)/'history.sqlite3',budget=Decimal('0.20'))
            p = account_response()
            with patch.object(rt,'read_keywords',return_value=(keywords(),'hash')), patch('sys.stdin.isatty',return_value=True), patch.object(rt,'load_credentials',return_value=('fake','fake')), patch.object(rt,'verify_pricing',return_value=(Decimal('0.004'),dict(verified_at=rt.now()),p,Decimal('0.798'))), patch('builtins.input',return_value='not confirmed'), patch.object(rt,'fetch') as fetch, patch('sys.stdout',new=io.StringIO()):
                with self.assertRaisesRegex(rt.TrackerError,'not confirmed'):
                    rt.run(args)
                fetch.assert_not_called()
            db = rt.connection(args.db,readonly=True)
            try: self.assertEqual(db.execute('SELECT COUNT(*) FROM runs').fetchone()[0],0)
            finally: db.close()

    def test_unfinished_run_blocks_new_spend(self):
        with tempfile.TemporaryDirectory() as tmp:
            args = SimpleNamespace(keywords=Path('fake.csv'),pilot=rt.HERE/'historic-pilot.json',
                                   db=Path(tmp)/'history.sqlite3',budget=Decimal('0.20'))
            db = rt.connection(args.db)
            rt.start_run(db,'unfinished',keywords(),'hash',Decimal('0.20'),Decimal('0.144'),{})
            db.close()
            with patch.object(rt,'read_keywords',return_value=(keywords(),'hash')), patch('sys.stdin.isatty',return_value=True), patch.object(rt,'load_credentials',return_value=('fake','fake')), patch.object(rt,'verify_pricing') as verify:
                with self.assertRaisesRegex(rt.TrackerError,'Unfinished run'):
                    rt.run(args)
                verify.assert_not_called()

    def test_dry_run_has_no_network_or_history_mutation(self):
        with tempfile.TemporaryDirectory() as tmp:
            args = SimpleNamespace(keywords=Path('fake.csv'),pilot=rt.HERE/'historic-pilot.json',db=Path(tmp)/'history.sqlite3',pricing=rt.HERE/'pricing-evidence.json',budget=Decimal('0.20'))
            with patch.object(rt,'read_keywords',return_value=(keywords(),'hash')), patch.object(rt,'load_credentials'), patch.object(rt,'fetch', side_effect=AssertionError('Network forbidden')):
                output = rt.dry_run(args)
            self.assertIn('OFFLINE DRY-RUN PASS',output)
            self.assertFalse(args.db.exists())


if __name__ == '__main__':
    unittest.main()
