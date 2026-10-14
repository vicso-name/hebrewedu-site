# HebrewEdu SEO — authoritative files

**Start here for any SEO task.** This replaces ad-hoc references to
individual research files scattered across `docs/seo/research/`.

## Current authority

| File | What it is |
|---|---|
| [`core/keywords.csv`](core/keywords.csv) | **The semantic core.** One row per keyword: volume, KD, intent, cluster, target URL, status, GSC/rank evidence, priority score. Edit this by hand when a keyword's status, target, or cluster changes. |
| [`core/pages.csv`](core/pages.csv) | One row per indexable live URL (read from `dist/` at build time): title, H1, meta description, primary/secondary keywords, GSC stats, status. |
| [`core/clusters.csv`](core/clusters.csv) | One row per cluster: primary keyword, total volume, median KD, target URL, status, SERP-validated flag. |
| [`semantic-core.xlsx`](semantic-core.xlsx) | **Generated, read-only.** Tabs: README, Clusters, Keywords, Pages, Content plan, Cannibalization, Gaps. Produced by `npm run seo:build` from the three CSVs above plus the live build — never hand-edit it. |
| [`AUDIT-2026-10-14.md`](AUDIT-2026-10-14.md) | The audit that this core was consolidated from. Historical snapshot of the pre-consolidation state (file inventory, conflicts, live site table, GSC evidence, cannibalization hypotheses). |

## How to update the core

1. Edit `docs/seo/core/keywords.csv` / `pages.csv` directly for anything
   that changes keyword-by-keyword or page-by-page (new keyword, status
   change, new target URL, corrected volume/KD once measured).
2. Run `npm run build` first if a page's title/H1/meta description
   changed (so `pages.csv` picks it up from the live `dist/` output),
   then `npm run seo:build` to regenerate `clusters.csv` and
   `semantic-core.xlsx`.
3. Before creating or retargeting a page, check `docs/seo/core/`:
   assign it to an existing cluster or create a new one, and check the
   Cannibalization tab so you don't silently create a second URL for a
   cluster that already has a target.
4. Never call DataForSEO or any paid SEO API without the user's
   explicit approval. `npm run seo:build` never does — it only reads
   files already on disk.

## One cluster → one target URL

`cluster_id` is built as `<topic-slug>` or, when one editorial topic
legitimately spans more than one page (e.g. "Hebrew Letters —
Individual Lessons" has 22 target URLs, one per letter),
`<topic-slug>--<url-slug>` — so a `cluster_id` always maps to exactly
one `target_url` by construction. Semantic overlap *across* different
`cluster_id`s (the same search intent split over two pages) is tracked
separately in the Cannibalization tab, not auto-merged.

## priority_score formula

```
volume_component = min(volume, 2000) / 2000 * 50   (0 pts if volume unknown)
intent_component  = 15 commercial/transactional investigation
                    10 navigational
                     8 informational
                     5 other/unknown
quick_win_bonus   = +15 if gsc_pos_3m is 8–20 AND gsc_impr_3m > 0
kd_penalty        = (kd / 100) * 20                (0 pts if KD unknown)

priority_score = volume_component + intent_component + quick_win_bonus - kd_penalty
```

A row with no volume, no intent, and no quick-win signal gets an
**empty** `priority_score`, not `0` — missing data lowers confidence,
it is never treated as zero demand. The `notes` column on that row
says `priority_score confidence: none/low/partial`.

## Superseded (kept for provenance, not authoritative)

| File | Superseded by |
|---|---|
| `research/semantic-core-v1.csv` | `core/keywords.csv` (v1's 136 rows are the `semantic-core-v1.csv (via semantic-core-v2.csv)` rows) |
| `research/semantic-core-v2.csv` | `core/keywords.csv` (all 309 rows carried forward) |
| `research/semantic-core-v2-alphabet-expansion-candidates.csv` | `core/keywords.csv` — 173 of its 197 rows became `alphabet_extension` rows in v2; the other 24 matched an existing v1 keyword and were merged into that v1 row rather than duplicated (see Gaps tab — this resolves the audit's "24 rows missing from v2" open question: they were never dropped) |
| `research/semantic-core-v3-blog-candidates/2026-10-13/candidate-addendum.csv` | `core/keywords.csv` (5 rows, carried forward with `status=candidate` — v3 is explicitly not yet owner-approved) |
| `research/keyword-candidates.csv` → `-with-volume.csv` → `-qualified.csv` | `semantic-core-v1.csv`, now `core/keywords.csv` |
| `research/course-letter-map-v2.json` | `src/data/alphabet-course.json` for publication status — the map's `publication_status` field is stale (says every letter unpublished; Hub + Aleph are live). The map's letter→slug→URL assignment is still useful reference. |
| `research/keyword-to-url-map.md` | `core/keywords.csv` / `core/clusters.csv` `target_url` columns |
| `research/keyword-opportunities.csv`, `research/rank-tracking-keywords.csv` | `core/keywords.csv` (same 36-keyword shortlist is identifiable via `priority_score` + `rank_baseline_pos`) |

Everything else under `docs/seo/research/` remains **read-only raw
evidence** (provider responses, SERP pilots, GSC exports, methodology
notes) — do not edit it; link to it from `core/keywords.csv`'s
`source_file` column or from new dated research instead.

## Known gaps

See the **Gaps** tab in `semantic-core.xlsx` (and the console output of
`npm run seo:build`) for the current list — it is regenerated on every
build rather than duplicated here so it can't go stale.
