# HebrewEdu Phase 3B: five-keyword candidate measurements

Executed 2026-10-13, Google US (2840), English (en), Google Ads search partners disabled. These metrics are not mobile-specific. Exactly two named Live calls were submitted once each; no retries, substitutions, balance queries, top-ups, SERP calls, Rank Tracker calls or P2 batch.

## Results

| Exact keyword | US average monthly volume | Organic KD | Proposed owner |
|---|---:|---|---|
| hebrew listening practice | 10 | Provider-null | /blog/best-hebrew-listening-practice/ |
| hebrew comprehensible input | 10 | Provider-null | /blog/best-hebrew-listening-practice/ |
| paal vs piel | Provider-null | Provider-null | /blog/hebrew-binyanim-explained/ |
| how many hebrew words do you need to be fluent | Provider-null | Provider-null | /blog/how-many-words-are-in-the-modern-hebrew-language/ |
| alef bet tutor verb directory | Provider-null | Provider-null | /blog/meet-the-new-verb-directory/ |

Both API envelopes and tasks succeeded (20000); each endpoint returned all five requested keyword records. Provider-null is an explicit unknown metric, not zero, a missing item or a failed request. No numeric organic KD was returned, so competitiveness cannot be assessed from this batch.

The two positive volume estimates are Google Ads average monthly search volumes, not organic visits or traffic forecasts. Their monthly histories cover September 2025–August 2026. Listening Practice has an explicit zero for August 2026 despite its positive average; Comprehensible Input has 10 in every returned month. Do not add overlapping keyword estimates into audience size. Histories for the other three keywords are provider-null, not twelve fabricated zeros.

## Costs and guards

- Volume task: `10131042-2762-0367-0000-fcfc261cbbad`; actual charge **$0.09000**.
- KD task: `10131043-2762-0392-0000-da857e125d7c`; actual charge **$0.01260**.
- Actual total: **$0.10260** against the owner's **$0.11** cap; unused cap **$0.00740**.

The local helper was loaded with corrected prices in memory ($0.09 and $0.01260). Its installed price table and configuration were not edited. Both corrected helper checks returned approved. The local ledger was checked strictly; before volume, daily spend was $0 with a $10 default daily limit; before KD, it was $0.09. Both actual charges were logged exactly once and reconciled with the batch ledger. Envelope and task costs represent the same charge and were not added twice.

An offline preparation check initially referenced the helper's wrong output key and was corrected before any API submission. No provider call or charge occurred during that correction. The guard snapshots capture the successful corrected checks.

## Preservation and staging

`volume-request.json` and `difficulty-request.json` retain the exact payloads. `*-raw.json` retain the complete JSON text returned by the API tool with `noAiMode: true`, without reformatting or metric changes; `*-tool-response.json` preserve the tool envelopes. Metadata files retain task IDs, response/task statuses, hashes and UTC markers. `request-timing.json` explains pre-call arming versus response-preservation timestamps and the separately captured exact KD tool timestamps; exact volume tool dispatch/receipt times were not captured.

`candidate-addendum.csv` contains five rows with separate provider status/value fields, full proposed URLs, intent, endpoint/task provenance and original monthly-history JSON. `monthly-volume-history.csv` contains the 24 returned month records, including the genuine zero. Blank metric cells are interpreted through the explicit status fields, never as numeric zero. SERP/ranking states remain not_requested.

`fingerprints-before.json` and `fingerprints-after.json` verify that all 86 pre-existing research-root foundation files and v2 measurement artifacts remained byte-identical, including both Semantic Core CSVs. This is a separate v3 candidate addendum, not a replacement or a merged semantic core. The website, article sources, unrelated files and existing research datasets were not edited. Only new execution artifacts and the ordinary local cost-ledger entries were written; no commits, pushes or deployment.

## Recommended next step

Review the two listening phrases as modest measured supporting candidates for the existing Listening Practice article. Preserve the other three as unverified-demand candidates, with provisional comparison/proficiency/brand-feature roles; provider-null alone does not justify dropping them or merging articles. All five URL assignments remain proposals: volume/KD measurements do not establish page-format fit, confirmed Google ownership, cannibalization or the cause of absent crawl.

Before promoting any candidate into a future semantic edition, obtain owner-approved intent validation and editorial review. No additional research is authorized by this result. Stop for owner review; do not launch P2 automatically.
