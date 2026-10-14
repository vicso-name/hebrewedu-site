# HebrewEdu Rank Tracker v1

Python 3.10+ on macOS/Linux; standard library only. Install location:
`~/Developer/seo-research/hebrewedu/rank-tracker/`. The approved CSV remains
in the parent research directory. No website integration or dependencies.

## Commands

Run these offline commands from the tracker directory:

```sh
cd ~/Developer/seo-research/hebrewedu/rank-tracker
python3 -m unittest -v test_rank_tracker.py
python3 rank_tracker.py dry-run
python3 rank_tracker.py init
python3 rank_tracker.py report
```

`dry-run` validates the approved CSV checksum, 36 rows, fixed settings, target
URLs, saved pricing evidence, pilot evidence, local credential storage, and
SQLite schema/integrity. It checks the existing database read-only, or builds
the schema in memory if no history exists. It sends **zero network requests**
and does not create or change history. An excessive budget estimate exits 2:

```sh
python3 rank_tracker.py dry-run --budget 0.14
```

`init` creates `data/history.sqlite3` and imports the pilot into its separate
table; it is idempotent and sends no API requests. `report` writes a Markdown
report and CSV to `reports/`. Before the first baseline, the 36 positions are
unobserved (blank CSV values / em dashes), with no invented positions.

**Do not execute this paid command until the baseline is separately approved:**

```sh
python3 rank_tracker.py run --budget 0.20
```

Each invocation requires a real interactive terminal. It first checks current
pricing and balance through the free account endpoint and retrieves official
public pricing/depth documentation. Failure to verify pricing blocks execution.
It then displays a unique confirmation such as
`RUN <run-UUID> 36 $0.144 CAP $0.20`. The operator must type that exact phrase.
There is no `--yes` flag, saved authorization, scheduler, retry, or balance top-up.
Confirmation expires after five minutes. A process lock prevents overlapping
runs using the same database.

The existing credential store is read directly:
`~/.config/codex-seo/dataforseo/credentials.json`, mode 600, fields
`DATAFORSEO_LOGIN` and `DATAFORSEO_PASSWORD`. Credentials are never copied into
this project, printed, or included in history or reports. Authenticated
requests reject redirects to prevent request replay or credential forwarding.

## Settings and cost controls

- `POST /v3/serp/google/organic/live/advanced`, one keyword/task per POST.
- Google; United States `2840`; English `en`; mobile Android; depth `20`.
- `max_crawl_pages=2` bounds billable pages; async AI Overview and rectangle
  calculation are explicitly disabled. Keywords containing operators or
  encoded characters are rejected.
- Approved input checksum is pinned in `approved-keywords.sha256`; changing
  keywords or assigned targets requires reviewing and reapproving that file.
- Default maximum run budget: **$0.20**.
- Conservative estimate: **36 × 2 × $0.002 = $0.144**. Current published
  pricing charges the base price per page; budgeting excludes any refunds.
- Offline pricing evidence is dated planning evidence, never execution
  authorization. Every paid run checks the fresh account base tariff and
  matches it to the current official Google Organic Live pricing page, plus
  the current endpoint documentation's 10-results-per-page billing rule.
  Missing/unrecognized tariff data, changed depth rules, an unavailable
  official page, or inconsistent public/account prices block execution.
- Estimated total must fit the budget and available balance, when returned.
  Before each paid POST, accumulated reported cost plus the next conservative
  task estimate must fit the cap. Execution stops at the cap, on an unexpected
  task cost, a cost disagreement, a failure, or an unknown charge. The last
  received charge is always recorded, even if the provider unexpectedly
  charges more than estimated.
- Envelope and task costs are stored separately. The larger valid value is
  counted once for budget safety. Unknown cost stays NULL and is counted as
  an unknown-cost task; reported subtotal is never described as a complete
  actual total when charges are unknown.
- Before/after free account snapshots are stored. Reports show reported
  subtotal, unknown-charge count, balance decrease and reconciliation
  difference when available. Account movement may include concurrent API use
  or refunds and is not automatically attributed to a keyword. Failure of the
  after-run balance lookup is recorded as unavailable.

Published sources verified during implementation:
[Google Organic pricing](https://dataforseo.com/pricing/google-serp/google-organic-serp-api),
[Live Advanced documentation](https://docs.dataforseo.com/v3/serp/google/organic/live/advanced/),
[depth pricing FAQ](https://dataforseo.com/help-center/serp-api-pricing-depth-update-faq),
[free account endpoint](https://docs.dataforseo.com/v3/appendix/user_data/).

## History and ranking interpretation

All seven history tables reject UPDATE and DELETE with SQLite triggers.
Runs, planned keywords, request intents, observations, events, balance
snapshots and pilot observations are inserts only. SQLite uses foreign keys
and full synchronous durability. The initial database contains only the
historical pilot, with **zero depth-20 runs**. Dry-runs never count as runs.

Each request intent is committed **before** sending. Each received response
is committed with the normalized observation, complete JSON, original
response text, status codes, task ID and both reported cost fields. Transport
errors and non-JSON responses retain their failure status and any returned
body. Every planned keyword gets an observation, including unattempted
keywords after a stopped run (`missing_data`, attempted 0).

A hard process crash leaves the intent visible as a failure with unknown
charge in the report; further paid runs are blocked while an unfinished run
exists. Inspect the raw history and balance rather than replaying that
request. V1 deliberately has no automatic resume or retry operation. Use
`report` and `export-json` for inspection; any manual recovery must preserve
existing rows and add an audited event after reviewing the provider account.

Organic position uses the provider's **`rank_group`**, not mixed SERP element
`rank_absolute`. Only organic rows with rank 1–20 are checked. Exact target
ranking takes precedence if several HebrewEdu URLs appear; otherwise the
best observed HebrewEdu URL is recorded. Full JSON retains the other rows.

| Status | Meaning |
|---|---|
| `exact_target` | The assigned target URL is observed. |
| `other_hebrewedu_url` | Another HebrewEdu URL is observed, assigned target absent. |
| `not_found` | No HebrewEdu URL in the valid returned organic rows within depth 20. |
| `api_failure` | Provider, HTTP or transport failure; includes interrupted request intent. |
| `missing_data` | Missing/malformed SERP, mismatched task settings, or unattempted keyword. |

Not found is not evidence of rank greater than 20: providers can return fewer
rows than the requested depth. History stores returned item count, organic
count, checked organic count, maximum returned organic rank and pages count.
No unobserved position is represented by zero.

URL matching normalizes host/scheme casing, default ports, fragments and an
empty root path. It preserves queries, path case, non-root trailing slashes,
HTTP/HTTPS and www/non-www differences. Another subdomain still counts as
another HebrewEdu URL. There is no network canonical lookup.

Comparisons use the latest run and previous **complete** run with identical
settings and identical keyword-to-target assignments (order-independent).
Partial runs and the depth-10 pilot are excluded as comparison baselines.
Numeric change is computed only when both positions were observed:
`previous_rank - latest_rank`, positive for improvement. URL/status changes
and unobserved transitions remain explicit in the CSV.

The historic `hebrew alphabet app` rank-7 observation retains its original
provider response, task ID, source archive SHA256 and provider timestamp in
`historic-pilot.json` and `pilot_observations`; it is never imported into the
depth-20 baseline table.

## Data and exports

- `data/history.sqlite3`: immutable history and complete provider JSON.
- `data/responses/<run-id>/<keyword-sha256>.json`: full provider JSON archives,
  created after a paid run. Free account snapshots get separate JSON files.
- `reports/<run-id>.md` and `.csv`: derived per-run reports. Re-generating the
  same run's report is safe; separate runs have separate filenames.
- `reports/pre-baseline.md` and `.csv`: current unobserved positions and the
  separate historical pilot.

JSON files can be recovered from SQLite without making any API requests:

```sh
python3 rank_tracker.py export-json --output data/responses
```

Existing JSON archives are checked for equality and never replaced with
different content. SQLite remains the primary durable archive if the process
stops before file export. Local artifacts are created with private permissions.
No Git commands or website changes are part of this utility.
