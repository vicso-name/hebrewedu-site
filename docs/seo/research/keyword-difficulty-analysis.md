# HebrewEdu Stage 2H — Organic Keyword Difficulty Measurement

Retrieved 2026-10-10 for Google US (`location_code=2840`), English (`language_code=en`). One DataForSEO Labs live request, one task, seven keywords. API task and request status: `20000 / Ok.`; reported task and total cost: **$0.01284**. No retries or other API endpoints were used.

## Method and limits

The returned `keyword_difficulty` is DataForSEO’s provider metric: a 0–100 logarithmic estimate of the chance of entering Google’s top 10 organic results, based in part on the link profiles of the top 10 pages. It is not a Google-defined metric, a ranking, or a guarantee. Numeric `0` is preserved as a provider-returned score, not converted to missing.

Official documentation says Bulk Keyword Difficulty accepts up to 1,000 keywords per request, and Live requests contain one task. Published Labs pricing lists “All Other Endpoints” at $0.012 per task plus $0.00012 per item. Seven results therefore cost $0.012 + (7 × $0.00012) = $0.01284, matching the API-reported cost.

## Keyword interpretation

| Keyword | KD | US avg. monthly volume | Existing target | Evidence and interpretation |
|---|---:|---:|---|---|
| hebrew alphabet app | 4 | 30 | https://hebrewedu.com/ | Low provider score aligns with product-specific query; dated SERP snapshot observed HebrewEdu at rank 7. Google Ads competition MEDIUM is a separate paid-search metric. GSC: hebrew alphabet app; app to learn hebrew alphabet; learn hebrew alphabet app |
| learn hebrew alphabet | 9 | 590 | https://hebrewedu.com/blog/hebrew-alphabet-complete-guide/ | Low provider score despite Google Ads competition HIGH; guide has relevant GSC query evidence and alphabet-guide SERP format fit. Ads competition is not organic difficulty. GSC: learn hebrew alphabet; learning hebrew alphabet; learning the hebrew alphabet; how to learn hebrew alphabet; learn hebrew letters; learning hebrew letters; how to learn hebrew letters; learn hebrew script; hebrew alphabet learn; learn hebrew aleph bet; learn hebrew alef bet; learn aleph bet |
| hebrew alphabet chart | 9 | 3600 | https://hebrewedu.com/blog/hebrew-alphabet-complete-guide/ | Low provider score despite chart-format SERP and visual expectation; chart/printable format validation remains relevant. Ads competition HIGH is separate. GSC: hebrew aleph bet; hebrew alef bet; aleph bet hebrew; aleph bet; alephbet |
| how to read hebrew | 0 | 720 | https://hebrewedu.com/blog/hebrew-alphabet-complete-guide/ | Provider score is 0; despite meaningful volume, SERP formats mix instruction, reference and video. Low metric is not a ranking guarantee; GSC query evidence exists. GSC: how to read hebrew |
| hebrew alphabet games online | 0 | 10 | https://hebrewedu.com/play/ | Provider score is 0; browser-game intent and /play/ format align, but no HebrewEdu listing appeared in returned snapshot. No candidate-level GSC phrase evidence. GSC: hebrew alphabet games online; learn hebrew alphabet game; aleph bet games online |
| hebrew learning app | 0 | 320 | https://hebrewedu.com/ | Provider score is 0; commercial SERP and partial homepage coverage remain the key constraints. Score does not resolve app-selection intent; no candidate-level GSC phrase evidence. GSC: No candidate-level GSC query listed; not proof of no impressions |
| does hebrew have vowels | 0 | 260 | https://hebrewedu.com/blog/why-hebrew-without-vowels-looks-impossible-until-your-brain-adapts/ | Provider score is 0; existing article and GSC wording support topic, while SERP requires modern written-vowel scope clarification. No keyword-level US/mobile GSC proof. GSC: does hebrew have vowels; no vowels in hebrew |

## Cross-metric reading

The two product queries, **hebrew alphabet app** (KD 4; volume 30) and **hebrew learning app** (KD 0; volume 320), have low provider scores, but the broader app-selection SERP remains only partially served by the homepage. The dated SERP snapshot for “hebrew alphabet app” observed HebrewEdu at position 7; this remains a single 2026-10-10 US Mobile Android observation, not a durable ranking claim.

**Learn hebrew alphabet** (KD 9; volume 590) and **hebrew alphabet chart** (KD 9; volume 3,600) have the highest scores in this set, still low on a 0–100 scale. The guide is topically relevant; the chart query needs visual/printable-format validation. The higher Google Ads competition labels for these terms are paid-ad metrics and do not contradict or replace organic KD.

**How to read hebrew** (KD 0; volume 720) aligns with existing alphabet/reading resources and GSC wording, but the SERP mixes instructional formats. **Hebrew alphabet games online** (KD 0; volume 10) maps well to `/play/`; no HebrewEdu result was present in the returned SERP rows. **Does hebrew have vowels** (KD 0; volume 260) has relevant article/GSC evidence, subject to clearly distinguishing spoken vowels from written vowel points and maintaining modern-Hebrew scope.

Volume values are the prior Google Ads US average monthly volumes, not organic clicks; they are not added across overlapping queries. GSC evidence is from saved aggregate Web exports and does not establish query-level US/mobile performance or target-page attribution. SERP observations are dated snapshots and absence from returned top rows does not prove no rankings outside those rows.

## Files and reconciliation

- `keyword-difficulty-raw.json` preserves the full response returned by the API, including task metadata, all seven items and reported cost.
- `keyword-difficulty.csv` retains exactly the seven requested keywords, their returned values and joined context. No result was missing; no metrics were imputed.
- `keyword-difficulty-analysis.md` records the interpretation and measurement limitations.
- Total Stage 2H spend: **$0.01284** (one request/task).

Sources: [Bulk Keyword Difficulty endpoint documentation](https://docs.dataforseo.com/v3/dataforseo_labs/google/bulk_keyword_difficulty/live/) and [DataForSEO Labs Google pricing](https://dataforseo.com/pricing/dataforseo-labs/dataforseo-google-api).
