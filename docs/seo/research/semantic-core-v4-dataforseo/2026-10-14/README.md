# DataForSEO batch — 2026-10-14

Owner-approved budget: **$0.28 cap** (balance verified before execution:
$0.31436 via the free `GET /v3/appendix/user_data` lookup, cost $0.00).
Credentials read from `~/.config/codex-seo/dataforseo/credentials.json`
(same store used by `research/rank-tracker/`); never printed or copied
into this repo.

## What ran, in order, with running-total checks after each

| # | Step | Endpoint | Keywords | Actual cost | Running total |
|---|---|---|---|---:|---:|
| 1 | Keyword difficulty, blank-`kd` rows | `POST /v3/dataforseo_labs/google/bulk_keyword_difficulty/live` | 319 | $0.05028 | $0.05028 |
| 2 | Volume, 41 blank-`volume` candidates | `POST /v3/keywords_data/google_ads/search_volume/live` | 41 | $0.09000 | $0.14028 |
| 3 | SERP validation (US/en, mobile Android, depth 10 = top 10 organic) | `POST /v3/serp/google/organic/live/advanced` | 52 (one Live call per keyword — the endpoint allows only one task per call) | $0.10400 | $0.24428 |

**Total actual spend: $0.24428** (cap $0.28; balance $0.31436 — $0.07008 of
balance left unspent beyond the cap, $0.03572 of the cap itself unused).
No call was skipped for budget reasons; every planned request completed
under the cap.

Location `2840` (United States), language `en` throughout. KD/volume used
`location_code`/`language_code`; SERP additionally fixed `device: mobile`,
`os: android`, `depth: 10` (top 10 organic only — cheaper than the
rank-tracker's depth-20 convention, matching the owner's "top 10" ask).

## Step 1 — keyword difficulty

One bulk call, all 319 blank-`kd` keywords. 66 returned a numeric
`keyword_difficulty`; 253 returned `null` (provider has no difficulty
data for that term — not an error). Both outcomes are now recorded in
`core/keywords.csv`: a value, or a "no data available" note so the row
isn't re-queried blind next time.

Files: `kd-raw-response.json` (full provider response), `kd-metadata.json`
(cost/status summary), `kd_blank.json` (the 319 keywords sent).

## Step 2 — search volume

One batch, the 41 `status=candidate` rows with blank `volume`. One
keyword — `is hebrew easy to learn?` — was rejected by the endpoint
("invalid characters", the `?`). Resent as `is hebrew easy to learn`
(trailing `?` stripped for the query only) and mapped the result back to
the original row; this is noted inline in `volume-metadata.json`. 34 of
41 returned a volume; 7 returned `null` (below Google Ads' reporting
threshold, not zero demand).

Files: `volume-raw-response.json`, `volume-metadata.json`, `vol_blank.json`.

## Step 3 — SERP validation

**Priority a) — the 4 cannibalization clusters.** For each, the primary
keyword of every cluster_id in the pairing (10 keywords total — App
discovery got both `hebrew learning app` and `hebrew alphabet app` since
the audit names both explicitly):

- Alphabet learning/reference: `hebrew alphabet chart`, `hebrew alphabet
  course`, `aleph hebrew letter`
- Reading progression: `how to read hebrew`, `hebrew vowel chart`, `how
  to read hebrew words`
- App discovery: `hebrew learning app`, `hebrew alphabet app`
- Vocabulary vs. verb reference: `hebrew words for beginners`, `hebrew
  verb conjugation chart`

**Priority b) — highest-priority clusters.** Remaining budget after (a)
covered every one of the other 42 `serp_validated=no` clusters (out of
75 total), each by its `primary_keyword`. See `serp_plan.json` for the
full 52-keyword list with `group: cannibalization|priority` and the
`cluster_id`/`target_url` each maps to, and `serp_raw/<idx>-<slug>.json`
for each call's complete provider response. `serp_parsed.json` has the
extracted organic URL list and HebrewEdu-URL matches per keyword.

### Cannibalization overlap (Jaccard over top-10 organic URLs)

| Cluster pair | Shared / union | Overlap |
|---|---:|---:|
| hebrew alphabet chart ↔ hebrew alphabet course | 1/13 | 8% |
| hebrew alphabet chart ↔ aleph hebrew letter | 0/13 | 0% |
| hebrew alphabet course ↔ aleph hebrew letter | 1/12 | 8% |
| how to read hebrew ↔ hebrew vowel chart | 1/14 | 7% |
| how to read hebrew ↔ how to read hebrew words | 1/11 | 9% |
| hebrew vowel chart ↔ how to read hebrew words | 1/14 | 7% |
| hebrew learning app ↔ hebrew alphabet app | 0/14 | 0% |
| hebrew words for beginners ↔ hebrew verb conjugation chart | 0/12 | 0% |

Every shared URL across every pair is a single generic `youtube.com/watch`
result, not a shared article/reference domain. **All 4 flagged
cannibalization topics are cleared**, not confirmed: each keyword pair
in every topic returns a materially distinct top-10 SERP, so Google
treats them as different search intents despite the text/topic overlap
that triggered the original flag. No evidence here says two HebrewEdu
pages are competing for the same result.

A side finding, not part of the cannibalization question: HebrewEdu's
own URL appeared in the fetched top-10 for only 1 of these 10 keywords
(`hebrew alphabet app` → homepage). That's a ranking-visibility gap, not
a cannibalization signal — see `serp_parsed.json` for exactly which
HebrewEdu URL (if any) showed for all 52 keywords checked.

## Known architecture gap found while applying these results

`scripts/seo/build-core.mjs` does **not** read `docs/seo/core/keywords.csv`
or `clusters.csv` as input — it *regenerates both files from scratch*
every run, sourced from `research/semantic-core-v2.csv`, the v3 addendum,
and the GSC exports. Confirmed by running `npm run seo:build` after a
first pass of hand-edits: the new `kd`/`volume`/`serp_validated` values
were silently wiped back to the pre-edit (committed) state, even though
`docs/seo/README.md` documents `core/keywords.csv` as hand-editable.

This batch's KD/volume/SERP results were therefore applied to
`core/keywords.csv`/`clusters.csv` **by hand, without rerunning
`npm run seo:build`** afterward — rerunning it now would erase this
update the same way. `semantic-core.xlsx` was intentionally left
un-rebuilt (still reflects the pre-batch data) rather than silently
regenerated stale-looking-fresh. This needs an owner decision: either
promote this batch's data into one of the legacy source CSVs the script
actually reads, or change the script to treat `core/` as input. Flagged
to the user in the task's final report; not fixed here.
