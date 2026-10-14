#!/usr/bin/env python3
"""HebrewEdu Rank Tracker v1. Standard library only; paid runs are interactive."""
import argparse
import base64
import csv
import fcntl
import hashlib
import html
import io
import json
import os
from pathlib import Path
import re
import sqlite3
import sys
from contextlib import contextmanager
from datetime import datetime, timezone
from decimal import Decimal, InvalidOperation
from urllib.error import HTTPError, URLError
from urllib.parse import urlsplit, urlunsplit
from urllib.request import Request, build_opener, HTTPRedirectHandler
import uuid

HERE = Path(__file__).resolve().parent
CONFIG = dict(search_engine="google", location_code=2840, language_code="en",
              device="mobile", os="android", depth=20)
ENDPOINT = "/v3/serp/google/organic/live/advanced"
ACCOUNT_ENDPOINT = "/v3/appendix/user_data"
PRICE_URL = "https://dataforseo.com/pricing/google-serp/google-organic-serp-api"
DOC_URL = "https://docs.dataforseo.com/v3/serp/google/organic/live/advanced/"
CREDENTIALS = Path.home() / ".config/codex-seo/dataforseo/credentials.json"
TABLES = ("runs", "run_keywords", "requests", "observations", "run_events",
          "account_snapshots", "pilot_observations")
RANKED = {"exact_target", "other_hebrewedu_url"}


class TrackerError(Exception):
    pass


def now():
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def dump(value):
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":"))


def sha(value):
    return hashlib.sha256(value).hexdigest()


def money(value):
    if isinstance(value, bool) or value is None:
        return None
    try:
        d = Decimal(str(value))
        return d if d.is_finite() and d >= 0 else None
    except (InvalidOperation, ValueError):
        return None


def cash(value):
    return str(value) if value is not None else None


def balance_value(value):
    try:
        d = Decimal(str(value))
        return d if d.is_finite() else None
    except (InvalidOperation, ValueError):
        return None


def positive_int(value):
    return value if type(value) is int and value > 0 else None


def count(value):
    return value if type(value) is int and value >= 0 else None


def normalized_url(value):
    """Normalize scheme/host casing, default ports, fragment and empty root path only.

    Keep www, HTTP vs HTTPS, queries, non-root trailing slash and path case distinct.
    """
    try:
        if not isinstance(value, str) or not value:
            raise ValueError
        u = urlsplit(value)
        if u.scheme.lower() not in ("http", "https") or not u.hostname or u.username or u.password:
            raise ValueError
        host = u.hostname.lower()
        port = u.port
        if port and port != (443 if u.scheme.lower() == "https" else 80):
            host += f":{port}"
        return urlunsplit((u.scheme.lower(), host, u.path or "/", u.query, ""))
    except (ValueError, TypeError):
        raise TrackerError("Invalid URL in input or response") from None


def own_url(value):
    try:
        host = urlsplit(normalized_url(value)).hostname
        return host == "hebrewedu.com" or host.endswith(".hebrewedu.com")
    except TrackerError:
        return False


def read_keywords(path):
    data = path.read_bytes()
    approved = (HERE / "approved-keywords.sha256").read_text().split()[0]
    if sha(data) != approved:
        raise TrackerError("CSV differs from the approved 36-keyword input; review and reapprove changes first")
    rows = list(csv.DictReader(io.StringIO(data.decode("utf-8-sig"))))
    if len(rows) != 36:
        raise TrackerError(f"Expected 36 approved keywords; got {len(rows)}")
    expected = dict(location_code="2840", search_engine="google", language_code="en",
                    device="mobile", os="android", country="united states", language="english")
    seen = set()
    for row in rows:
        keyword = row.get("keyword", "")
        if not keyword or keyword != keyword.strip() or keyword.casefold() in seen or len(keyword) > 700:
            raise TrackerError("Keywords must be nonempty, unique and at most 700 characters")
        seen.add(keyword.casefold())
        # Reject operators and encoded input, rather than permitting unbudgeted multipliers.
        if any(c in keyword for c in (":", "%", "+", "\n", "\r", "\t")):
            raise TrackerError("Search operators or encoded keywords are not permitted")
        for k, v in expected.items():
            if row.get(k, "").strip().lower() != v:
                raise TrackerError(f"CSV must use the fixed configuration ({k})")
        if not own_url(row.get("target_url", "")):
            raise TrackerError("All target URLs must belong to HebrewEdu")
        if row.get("baseline_position") and positive_int(int(row["baseline_position"])) is None:
            raise TrackerError("Pilot positions must be positive, never zero")
    return rows, sha(data)


def comparable_key(rows):
    pairs = sorted((r["keyword"], normalized_url(r["target_url"])) for r in rows)
    return sha(dump(dict(config=CONFIG, keywords=pairs)).encode())


def schema_sql():
    sql = (HERE / "schema.sql").read_text()
    for table in TABLES:
        for action in ("UPDATE", "DELETE"):
            sql += (f"\nCREATE TRIGGER {table}_no_{action.lower()} BEFORE {action} ON {table} "
                    "BEGIN SELECT RAISE(ABORT, 'append-only history'); END;")
    return sql


def connection(path=None, readonly=False):
    if path is None:
        db = sqlite3.connect(":memory:")
        db.executescript(schema_sql())
    elif readonly:
        db = sqlite3.connect(path.resolve().as_uri() + "?mode=ro", uri=True)
    else:
        exists = path.exists()
        path.parent.mkdir(parents=True, exist_ok=True)
        db = sqlite3.connect(path)
        if not exists:
            os.chmod(path, 0o600)
            db.executescript(schema_sql())
    db.row_factory = sqlite3.Row
    db.execute("PRAGMA foreign_keys=ON")
    db.execute("PRAGMA synchronous=FULL")
    return db


def validate_schema(db):
    expected = connection()
    try:
        def definitions(c):
            return {r[0]: r[1] for r in c.execute(
                "SELECT name,sql FROM sqlite_master WHERE type IN ('table','trigger','index') AND sql IS NOT NULL")}
        if db.execute("PRAGMA user_version").fetchone()[0] != 1 or definitions(db) != definitions(expected):
            raise TrackerError("Database schema differs from v1; refusing execution")
        if db.execute("PRAGMA integrity_check").fetchone()[0] != "ok" or db.execute("PRAGMA foreign_key_check").fetchone():
            raise TrackerError("SQLite integrity check failed")
    finally:
        expected.close()


def pilot_data(path):
    data = json.loads(path.read_text())
    if (data.get("keyword"), data.get("organic_rank"), data.get("config", {}).get("depth")) != ("hebrew alphabet app", 7, 10):
        raise TrackerError("Historic rank-7 pilot evidence is invalid")
    provider = data["provider_response"]
    parsed = parse_response(provider, data["keyword"], data["target_url"], depth=10)
    if parsed["organic_rank"] != 7 or parsed["actual_url"] != data["actual_url"]:
        raise TrackerError("Historic pilot response does not support the observation")
    return data


def import_pilot(db, path):
    p = pilot_data(path)
    key = p["source_sha256"]
    if db.execute("SELECT 1 FROM pilot_observations WHERE source_sha256=?", (key,)).fetchone():
        return
    with db:
        db.execute("INSERT INTO pilot_observations VALUES(?,?,?,?,?,?,?,?,?,?)", (
            key, p["keyword"], p["target_url"], p["actual_url"], p["organic_rank"],
            p["observed_at"], dump(p["config"]), p["api_task_id"], p["note"], dump(p["provider_response"])))


def budget_check(unit, n, cap):
    total = unit * n
    if total > cap:
        raise TrackerError(f"Estimated ${total} exceeds the ${cap} budget")
    return total


def offline_pricing(path):
    p = json.loads(path.read_text())
    if p.get("endpoint") != ENDPOINT or p.get("source_url") != PRICE_URL or p.get("depth_docs_url") != DOC_URL:
        raise TrackerError("Pricing evidence sources do not match the fixed endpoint")
    base = money(p.get("base_live_usd"))
    if base is None or base == 0 or p.get("results_per_page") != 10:
        raise TrackerError("Pricing evidence is incomplete")
    datetime.fromisoformat(p["verified_at"])
    return base * 2, p


def dry_run(args):
    rows, digest = read_keywords(args.keywords)
    pilot_data(args.pilot)
    db = connection(args.db, readonly=True) if args.db.exists() else connection()
    try:
        validate_schema(db)
    finally:
        db.close()
    unit, p = offline_pricing(args.pricing)
    total = budget_check(unit, len(rows), args.budget)
    # Check presence, JSON shape and permissions without reading values into output.
    load_credentials()
    return "\n".join((
        "HebrewEdu Rank Tracker v1 — OFFLINE DRY-RUN PASS",
        f"Keywords: {len(rows)}; approved CSV SHA256: {digest}",
        "Google / United States (2840) / English (en) / mobile Android / depth 20",
        "SQLite schema, append-only triggers, pilot provenance and credential storage: valid",
        f"Saved public pricing verified: {p['verified_at']} (offline evidence only)",
        f"Conservative cost per keyword: ${unit:.3f}; estimated run: ${total:.3f}; cap: ${args.budget:.2f}",
        "Network/API requests: 0; paid tasks: 0; actual spend: $0.00",
        "Paid execution requires fresh pricing verification and a new interactive confirmation.",
        "Historic pilot: hebrew alphabet app, rank 7, depth 10; excluded from baseline comparisons.",
    )) + "\n"


def load_credentials():
    try:
        if CREDENTIALS.stat().st_mode & 0o077:
            raise TrackerError("Existing DataForSEO credential file must have mode 600")
        d = json.loads(CREDENTIALS.read_text())
        login, password = d["DATAFORSEO_LOGIN"], d["DATAFORSEO_PASSWORD"]
        if not isinstance(login, str) or not isinstance(password, str) or not login or not password:
            raise ValueError
        return login, password
    except (OSError, ValueError, KeyError):
        raise TrackerError("Configured local DataForSEO credentials are missing or invalid") from None


class NoRedirect(HTTPRedirectHandler):
    # Never replay a paid POST or forward its Authorization header.
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def fetch(url, method="GET", body=None, auth=None):
    headers = {"User-Agent": "HebrewEduRankTracker/1.0", "Accept": "application/json,text/html"}
    if auth:
        headers["Authorization"] = "Basic " + base64.b64encode(f"{auth[0]}:{auth[1]}".encode()).decode()
    payload = dump(body).encode() if body is not None else None
    if payload is not None:
        headers["Content-Type"] = "application/json"
    try:
        with build_opener(NoRedirect()).open(Request(url, data=payload, headers=headers, method=method), timeout=90) as r:
            return r.status, r.read().decode("utf-8", errors="replace")
    except HTTPError as e:
        return e.code, e.read().decode("utf-8", errors="replace")
    except (URLError, OSError, TimeoutError):
        # Do not print exceptions that might embed headers or local credentials.
        raise TrackerError("Transport failure; no retry; provider charge may be unknown") from None


def account(auth):
    code, raw = fetch("https://api.dataforseo.com" + ACCOUNT_ENDPOINT, auth=auth)
    try:
        p = json.loads(raw)
        tasks = p["tasks"]
        if code != 200 or p["status_code"] != 20000 or len(tasks) != 1 or tasks[0]["status_code"] != 20000:
            raise ValueError
        result = tasks[0]["result"]
        if len(result) != 1 or money(p.get("cost")) != Decimal(0):
            raise ValueError
        return p, result[0]
    except (ValueError, KeyError, TypeError):
        raise TrackerError("Free account lookup unavailable or malformed; no retry") from None


def page_text(raw):
    raw = re.sub(r"<(script|style)\b[^>]*>.*?</\1>", " ", raw, flags=re.S | re.I)
    return " ".join(html.unescape(re.sub(r"<[^>]+>", " ", raw)).split())


def verify_pricing(auth):
    """Free account lookup plus fresh official pricing/depth documentation; fail closed."""
    provider, data = account(auth)
    try:
        tariff = data["price"]["serp"]["live"]["advanced"]["priority_normal"]
        if len(tariff) != 1 or tariff[0]["cost_type"] != "per_request":
            raise ValueError
        base = money(tariff[0]["cost"])
        if base is None or base <= 0:
            raise ValueError
    except (KeyError, TypeError, ValueError):
        raise TrackerError("Current account SERP Live Advanced pricing cannot be verified") from None
    pc, price_html = fetch(PRICE_URL)
    dc, depth_html = fetch(DOC_URL)
    text = page_text(price_html)
    match = re.search(r"Live Mode.{0,500}?Price per 1 SERP\s*\(10 search results\)\s*\$\s*([0-9.]+)", text)
    depth_text = page_text(depth_html).lower()
    if pc != 200 or dc != 200 or not match or money(match[1]) != base:
        raise TrackerError("Fresh published pricing is unavailable or differs from account pricing")
    if "billed per each serp containing up to 10 results" not in depth_text:
        raise TrackerError("Current depth pricing cannot be verified")
    p = dict(endpoint=ENDPOINT, source_url=PRICE_URL, depth_docs_url=DOC_URL,
             verified_at=now(), base_live_usd=cash(base), results_per_page=10,
             estimate_model="two full-price pages; excludes any discount/refund",
             price_page_sha256=sha(price_html.encode()), depth_page_sha256=sha(depth_html.encode()))
    return base * 2, p, provider, balance_value(data.get("money", {}).get("balance"))


def parse_response(provider, keyword, target, depth=20):
    out = dict(actual_url=None, organic_rank=None, status="missing_data", note="Incomplete provider data",
               returned_result_count=None, returned_organic_count=None, checked_organic_count=None,
               max_returned_organic_rank=None, pages_count=None, api_task_id=None,
               response_status_code=None, task_status_code=None,
               response_cost_usd=None, task_cost_usd=None, charged_cost_usd=None)
    if not isinstance(provider, dict):
        return out
    out["response_status_code"] = count(provider.get("status_code"))
    rc = money(provider.get("cost"))
    out["response_cost_usd"] = cash(rc)
    tasks = provider.get("tasks")
    task = tasks[0] if isinstance(tasks, list) and len(tasks) == 1 and isinstance(tasks[0], dict) else None
    tc = money(task.get("cost")) if task else None
    out["task_cost_usd"] = cash(tc)
    # Do not double-count task + envelope cost. Use the greater reported value for cap safety.
    known = [v for v in (rc, tc) if v is not None]
    out["charged_cost_usd"] = cash(max(known)) if known else None
    if task:
        out["api_task_id"] = task.get("id") if isinstance(task.get("id"), str) else None
        out["task_status_code"] = count(task.get("status_code"))
    if (out["response_status_code"] is not None and out["response_status_code"] != 20000) or (
            task and out["task_status_code"] is not None and out["task_status_code"] != 20000):
        out.update(status="api_failure", note="Provider returned failure status; no retry")
        return out
    if out["response_status_code"] != 20000 or not task or out["task_status_code"] != 20000:
        return out
    results = task.get("result")
    if not isinstance(results, list) or len(results) != 1 or not isinstance(results[0], dict):
        return out
    result = results[0]
    data = task.get("data")
    expected = {k: v for k, v in CONFIG.items() if k != "search_engine"}
    expected["depth"] = depth
    if not isinstance(data, dict) or any(data.get(k) != v for k, v in expected.items()) or data.get("keyword") != keyword:
        out["note"] = "Missing or mismatched task keyword/configuration"
        return out
    if result.get("keyword") != keyword or any(result.get(k) != CONFIG[k] for k in ("location_code", "language_code")):
        out["note"] = "Missing or mismatched SERP keyword/location/language"
        return out
    items = result.get("items")
    out["returned_result_count"] = count(result.get("items_count"))
    out["pages_count"] = count(result.get("pages_count"))
    if not isinstance(items, list):
        return out
    organic = [v for v in items if isinstance(v, dict) and v.get("type") == "organic"]
    out["returned_organic_count"] = len(organic)
    valid = [v for v in organic if positive_int(v.get("rank_group")) and own_or_external_url(v.get("url"))]
    checked = [v for v in valid if v["rank_group"] <= depth]
    out["checked_organic_count"] = len(checked)
    out["max_returned_organic_rank"] = max((v["rank_group"] for v in valid), default=None)
    exact = sorted((v for v in checked if normalized_url(v["url"]) == normalized_url(target)), key=lambda v: v["rank_group"])
    owned = sorted((v for v in checked if own_url(v["url"])), key=lambda v: v["rank_group"])
    match = exact[0] if exact else owned[0] if owned else None
    if match:
        out.update(status="exact_target" if exact else "other_hebrewedu_url",
                   actual_url=match["url"], organic_rank=match["rank_group"],
                   note="Exact target observed" if exact else "Another HebrewEdu URL observed; assigned target absent")
    elif not organic or len(valid) != len(organic) or out["returned_result_count"] != len(items) or any(not isinstance(v, dict) for v in items):
        out["note"] = "Empty or malformed SERP; absence cannot be established"
    else:
        out.update(status="not_found", note=f"Absent from {len(checked)} checked organic rows at requested depth {depth}; unobserved ranks remain unknown")
    return out


def own_or_external_url(value):
    try:
        normalized_url(value)
        return True
    except TrackerError:
        return False


def event(db, rid, kind, details):
    with db:
        db.execute("INSERT INTO run_events(run_id,recorded_at,kind,details_json) VALUES(?,?,?,?)", (rid, now(), kind, dump(details)))


def start_run(db, rid, rows, digest, budget, estimate, pricing):
    with db:
        db.execute("INSERT INTO runs VALUES(?,?,?,?,?,?,?,?)", (
            rid, now(), dump(CONFIG), comparable_key(rows), digest, cash(budget), cash(estimate), dump(pricing)))
        db.executemany("INSERT INTO run_keywords VALUES(?,?,?,?)", (
            (rid, i, row["keyword"], row["target_url"]) for i, row in enumerate(rows, 1)))


def save_observation(db, rid, keyword, parsed, attempted, raw=None, provider=None, http=None):
    values = dict(run_id=rid, keyword=keyword, observed_at=now(), attempted=int(attempted),
                  http_status=http, provider_response_json=dump(provider) if provider is not None else None,
                  raw_response_text=raw, **parsed)
    names = list(values)
    with db:
        db.execute(f"INSERT INTO observations({','.join(names)}) VALUES({','.join('?' for _ in names)})", list(values.values()))


def export_json(db, output):
    """Materialize complete provider JSON; SQLite also preserves the original response text."""
    for r in db.execute("SELECT run_id,keyword,provider_response_json FROM observations WHERE provider_response_json IS NOT NULL"):
        directory = output / r["run_id"]
        directory.mkdir(parents=True, exist_ok=True)
        path = directory / (sha(r["keyword"].encode()) + ".json")
        text = r["provider_response_json"] + "\n"
        if path.exists():
            if path.read_text() != text:
                raise TrackerError("Existing JSON archive differs from immutable history")
        else:
            with path.open("x") as f:
                f.write(text)
    for r in db.execute("SELECT id,run_id,phase,provider_response_json FROM account_snapshots"):
        directory = output / r["run_id"]
        directory.mkdir(parents=True, exist_ok=True)
        path = directory / f"account-{r['phase']}-{r['id']}.json"
        text = r["provider_response_json"] + "\n"
        if path.exists():
            if path.read_text() != text:
                raise TrackerError("Existing account archive differs from immutable history")
        else:
            with path.open("x") as f:
                f.write(text)


def snapshot(db, rid, phase, provider, balance):
    with db:
        db.execute("INSERT INTO account_snapshots(run_id,phase,recorded_at,balance_usd,provider_response_json) VALUES(?,?,?,?,?)",
                   (rid, phase, now(), cash(balance), dump(provider)))


@contextmanager
def lock(path):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("a") as f:
        try:
            fcntl.flock(f, fcntl.LOCK_EX | fcntl.LOCK_NB)
        except BlockingIOError:
            raise TrackerError("Another tracker process is active") from None
        try:
            yield
        finally:
            fcntl.flock(f, fcntl.LOCK_UN)


def execute_tasks(db, rid, rows, unit, cap, auth, api_fetch=fetch):
    """One POST per keyword; durable intent before sending; no retries or paid recovery."""
    total = Decimal(0)
    unknown = 0
    reason = "completed"
    try:
        for row in rows:
            if total >= cap or total + unit > cap:
                reason = "budget_stop"
                break
            keyword = row["keyword"]
            request = {k: v for k, v in CONFIG.items() if k != "search_engine"}
            request["keyword"] = keyword
            request.update(max_crawl_pages=2, load_async_ai_overview=False, calculate_rectangles=False)
            with db:
                db.execute("INSERT INTO requests VALUES(?,?,?,?)", (rid, keyword, now(), dump([request])))
            try:
                http, raw = api_fetch("https://api.dataforseo.com" + ENDPOINT, "POST", [request], auth)
            except TrackerError:
                parsed = parse_response(None, keyword, row["target_url"])
                parsed.update(status="api_failure", note="Transport failure; charge unknown; stopped without retry")
                save_observation(db, rid, keyword, parsed, True)
                unknown += 1
                reason = "transport_failure"
                break
            try:
                provider = json.loads(raw)
            except ValueError:
                provider = None
            parsed = parse_response(provider, keyword, row["target_url"])
            if http != 200:
                parsed.update(status="api_failure", organic_rank=None, actual_url=None,
                              note=f"HTTP {http}; stopped without retry")
            save_observation(db, rid, keyword, parsed, True, raw, provider, http)
            charged = money(parsed["charged_cost_usd"])
            if charged is None:
                unknown += 1
                reason = "unknown_cost"
                break
            total += charged
            if total >= cap:
                reason = "budget_stop"
                break
            if charged > unit:
                reason = "unexpected_cost"
                break
            if parsed["status"] == "api_failure":
                reason = "api_failure"
                break
            if parsed["response_cost_usd"] is not None and parsed["task_cost_usd"] is not None and money(parsed["response_cost_usd"]) != money(parsed["task_cost_usd"]):
                reason = "cost_mismatch"
                break
    except KeyboardInterrupt:
        reason = "interrupted"
    except Exception:
        reason = "local_failure"
        raise
    finally:
        # Fill all planned rows, including a request interrupted while in flight.
        for row in rows:
            keyword = row["keyword"]
            if db.execute("SELECT 1 FROM observations WHERE run_id=? AND keyword=?", (rid, keyword)).fetchone():
                continue
            attempted = bool(db.execute("SELECT 1 FROM requests WHERE run_id=? AND keyword=?", (rid, keyword)).fetchone())
            parsed = parse_response(None, keyword, row["target_url"])
            parsed["status"] = "api_failure" if attempted else "missing_data"
            parsed["note"] = "Request interrupted; charge unknown; no retry" if attempted else f"Not attempted: {reason}"
            unknown += int(attempted)
            save_observation(db, rid, keyword, parsed, attempted)
        attempts = db.execute("SELECT COUNT(*) FROM requests WHERE run_id=?", (rid,)).fetchone()[0]
        if reason == "completed" and attempts != len(rows):
            reason = "incomplete"
        event(db, rid, "finished", dict(reason=reason, attempted=attempts, planned=len(rows),
                                        reported_cost_usd=cash(total), unknown_cost_tasks=unknown))
    return total, unknown, reason


def run(args):
    rows, digest = read_keywords(args.keywords)
    pilot_data(args.pilot)
    if not sys.stdin.isatty():
        raise TrackerError("Paid runs require an interactive terminal and per-run confirmation")
    auth = load_credentials()
    with lock(args.db.with_suffix(".lock")):
        db = connection(args.db)
        try:
            validate_schema(db)
            # Never start new spend after an unfinished attempt without human review.
            unfinished = db.execute("SELECT id FROM runs WHERE NOT EXISTS (SELECT 1 FROM run_events WHERE run_id=runs.id AND kind='finished')").fetchone()
            if unfinished:
                raise TrackerError(f"Unfinished run {unfinished[0]}; inspect history before any further spend")
            import_pilot(db, args.pilot)
            unit, pricing, before, balance_before = verify_pricing(auth)
            estimate = budget_check(unit, len(rows), args.budget)
            if balance_before is not None and balance_before < estimate:
                raise TrackerError("Account balance is below the conservative estimate")
            rid = str(uuid.uuid4())
            phrase = f"RUN {rid} 36 ${estimate:.3f} CAP ${args.budget:.2f}"
            print(f"Fresh price verified. Conservative estimate ${estimate:.3f}; cap ${args.budget:.2f}.")
            print("Type exactly: " + phrase)
            if input("> ") != phrase:
                raise TrackerError("Execution not confirmed; no paid requests sent")
            # A long-open confirmation prompt must not use stale prices.
            age = (datetime.now(timezone.utc) - datetime.fromisoformat(pricing["verified_at"])).total_seconds()
            if age > 300:
                raise TrackerError("Pricing check expired; rerun and confirm again")
            start_run(db, rid, rows, digest, args.budget, estimate, pricing)
            event(db, rid, "confirmed", dict(confirmation=phrase))
            snapshot(db, rid, "before", before, balance_before)
            total, unknown, reason = execute_tasks(db, rid, rows, unit, args.budget, auth)
            reconciliation = dict(reported_cost_usd=cash(total), unknown_cost_tasks=unknown,
                                  balance_before_usd=cash(balance_before), balance_after_usd=None,
                                  balance_delta_usd=None, difference_usd=None, note="Balance lookup unavailable")
            try:
                after, data = account(auth)
                balance_after = balance_value(data.get("money", {}).get("balance"))
                snapshot(db, rid, "after", after, balance_after)
                reconciliation["balance_after_usd"] = cash(balance_after)
                if balance_before is not None and balance_after is not None:
                    delta = balance_before - balance_after
                    reconciliation.update(balance_delta_usd=cash(delta), difference_usd=cash(delta-total),
                                          note="Account delta may include concurrent activity, refunds or unreported charges")
            except TrackerError:
                pass
            event(db, rid, "reconciliation", reconciliation)
            export_json(db, args.db.parent / "responses")
            write_report(db, rows, args.output)
            print(f"Run {rid}: {reason}; reported cost ${total}; unknown-cost tasks {unknown}.")
            return 0 if reason == "completed" else 2
        finally:
            db.close()


def latest_rows(db, rows):
    latest = db.execute("SELECT * FROM runs ORDER BY rowid DESC LIMIT 1").fetchone()
    previous = None
    if latest:
        previous = db.execute("""SELECT * FROM runs r WHERE r.rowid < (SELECT rowid FROM runs WHERE id=?)
            AND comparable_key=? AND EXISTS (SELECT 1 FROM run_events e WHERE e.run_id=r.id
                AND e.kind='finished' AND json_extract(e.details_json,'$.reason')='completed')
            ORDER BY r.rowid DESC LIMIT 1""", (latest["id"], latest["comparable_key"])).fetchone()
        rows = [dict(r) for r in db.execute("SELECT keyword,target_url FROM run_keywords WHERE run_id=? ORDER BY ordinal", (latest["id"],))]
    result = []
    for row in rows:
        cur = db.execute("SELECT * FROM observations WHERE run_id=? AND keyword=?", (latest["id"], row["keyword"])).fetchone() if latest else None
        prior = db.execute("SELECT * FROM observations WHERE run_id=? AND keyword=?", (previous["id"], row["keyword"])).fetchone() if previous else None
        pending = bool(latest and not cur and db.execute("SELECT 1 FROM requests WHERE run_id=? AND keyword=?", (latest["id"], row["keyword"])).fetchone())
        entry = dict(run_id=latest["id"] if latest else "", run_started_at=latest["started_at"] if latest else "",
                     observed_at=cur["observed_at"] if cur else "", keyword=row["keyword"], target_url=row["target_url"],
                     actual_url=cur["actual_url"] if cur else None, organic_rank=cur["organic_rank"] if cur else None,
                     status=cur["status"] if cur else "api_failure" if pending else "missing_data", attempted=cur["attempted"] if cur else int(pending),
                     previous_run_id=previous["id"] if previous else "", previous_rank=prior["organic_rank"] if prior else None,
                     previous_status=prior["status"] if prior else "", change=None,
                     change_note="No previous comparable run", returned_result_count=cur["returned_result_count"] if cur else None,
                     returned_organic_count=cur["returned_organic_count"] if cur else None,
                     checked_organic_count=cur["checked_organic_count"] if cur else None,
                     api_task_id=cur["api_task_id"] if cur else None, reported_cost_usd=cur["charged_cost_usd"] if cur else None,
                     note=cur["note"] if cur else "Request started without a saved response; charge unknown" if pending else "Not observed in latest run" if latest else "Baseline has not been executed")
        if prior and cur:
            if cur["status"] in RANKED and prior["status"] in RANKED:
                entry["change"] = prior["organic_rank"] - cur["organic_rank"]
                entry["change_note"] = "Positive = improved organic position; URL changes are shown separately"
                if prior["actual_url"] != cur["actual_url"]:
                    entry["change_note"] += "; ranking URL changed"
            else:
                entry["change_note"] = f"{prior['status']} -> {cur['status']}; numerical change unobserved"
        result.append(entry)
    return result, latest, previous


def write_report(db, rows, output):
    entries, latest, previous = latest_rows(db, rows)
    output.mkdir(parents=True, exist_ok=True)
    stem = latest["id"] if latest else "pre-baseline"
    csv_path, md_path = output / f"{stem}.csv", output / f"{stem}.md"
    # Reports are derived views, not history. Run-id filenames keep different runs separate.
    with csv_path.open("w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=list(entries[0]))
        writer.writeheader()
        writer.writerows(entries)
    lines = ["# HebrewEdu Rank Tracker", "", "Google / US 2840 / English / mobile Android / requested depth 20.",
             f"Run: {latest['id'] if latest else 'No baseline yet'}.",
             f"Previous comparable complete run: {previous['id'] if previous else 'None'}.", "",
             "— means unobserved. Not found means absent from returned organic rows within requested depth; it does not prove rank >20.",
             "Change = previous rank minus latest rank; positive means improvement. Exact assigned target takes precedence over other HebrewEdu URLs.", ""]
    if latest:
        for e in db.execute("SELECT kind,details_json FROM run_events WHERE run_id=? AND kind IN ('finished','reconciliation') ORDER BY id", (latest["id"],)):
            lines.append(f"{e['kind']}: `{e['details_json']}`")
        lines.append("")
    lines += ["| Keyword | Position | Previous | Status | Change | Returned organic rows | Target URL | Actual URL |",
              "|---|---:|---:|---|---:|---:|---|---|"]
    for r in entries:
        def cell(v):
            return str(v).replace("|", "\\|").replace("\n", " ") if v is not None else "—"
        lines.append("| " + " | ".join(cell(r[k]) for k in ("keyword", "organic_rank", "previous_rank", "status", "change", "returned_organic_count", "target_url", "actual_url")) + " |")
    lines += ["", "Historic pilot (excluded from depth-20 history and comparisons):"]
    for p in db.execute("SELECT keyword,organic_rank,observed_at,actual_url FROM pilot_observations"):
        lines.append(f"- {p['keyword']}: organic rank {p['organic_rank']} on {p['observed_at']}, depth 10, {p['actual_url']}.")
    md_path.write_text("\n".join(lines) + "\n")
    print(f"Report: {md_path}\nCSV: {csv_path}")


def main(argv=None):
    os.umask(0o077)
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("command", choices=("dry-run", "init", "report", "export-json", "run"))
    parser.add_argument("--keywords", type=Path, default=HERE.parent / "rank-tracking-keywords.csv")
    parser.add_argument("--db", type=Path, default=HERE / "data/history.sqlite3")
    parser.add_argument("--pilot", type=Path, default=HERE / "historic-pilot.json")
    parser.add_argument("--pricing", type=Path, default=HERE / "pricing-evidence.json")
    parser.add_argument("--budget", type=Decimal, default=Decimal("0.20"))
    parser.add_argument("--output", type=Path, default=HERE / "reports")
    args = parser.parse_args(argv)
    try:
        if not args.budget.is_finite() or args.budget <= 0:
            raise TrackerError("Budget must be finite and positive")
        if args.command == "dry-run":
            print(dry_run(args), end="")
        elif args.command == "run":
            return run(args)
        else:
            rows, _ = read_keywords(args.keywords)
            if args.command == "init":
                with lock(args.db.with_suffix(".lock")):
                    db = connection(args.db)
                    try:
                        validate_schema(db)
                        import_pilot(db, args.pilot)
                    finally:
                        db.close()
                print(f"Initialized append-only history: {args.db}; imported pilot separately. No API calls.")
            else:
                db = connection(args.db, readonly=True)
                try:
                    validate_schema(db)
                    if args.command == "export-json":
                        export_json(db, args.output)
                        print(f"Provider JSON archived to {args.output}")
                    else:
                        write_report(db, rows, args.output)
                finally:
                    db.close()
        return 0
    except (TrackerError, OSError, ValueError, KeyError, TypeError, sqlite3.Error) as e:
        # Report our safe messages only; never expose credential JSON or HTTP request details.
        print(f"Stopped: {e}" if isinstance(e, TrackerError) else f"Stopped: {type(e).__name__}; inspect local inputs/history", file=sys.stderr)
        return 2
    except (KeyboardInterrupt, EOFError):
        print("Stopped by operator; no automatic retries.", file=sys.stderr)
        return 2


if __name__ == "__main__":
    sys.exit(main())
