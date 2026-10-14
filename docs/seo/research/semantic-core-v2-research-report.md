# HebrewEdu Semantic Core v2 — Alphabet Expansion Research

Prepared 2026-10-11, Europe/Tallinn. This is a research edition extending the existing Semantic Core v1. It does not authorize or claim a published course.

## Decisions

- **Lesson 4 is confirmed Dalet (ד) by the product owner**, as communicated by the user on 2026-10-11. Use API ID 4 → `/learn/hebrew-alphabet/dalet/`. Its earlier description is dated metadata evidence; the owner will correct it. No further mismatch investigation or lesson-detail request was made.
- Preserve the existing Alphabet Guide, homepage, blog and `/play/` responsibilities. New course and letter targets remain conditional on useful, reviewed web teaching content.
- Maintain the original 136 v1 rows and all original fields. The v2 research edition has **309 distinct keywords**: 136 preserved v1 rows plus 173 extension candidates. Of those extension candidates, 171 received a volume request and two additional Hebrew-qualified ambiguity probes received SERP/difficulty requests only.
- Website work is **planning only**, following the user's clarification: “Run research and update the roadmap; keep website code unchanged.” No POC, full lesson export, pages, redirects, deployment, commits or pushes were performed.

## Research scope and cost

| Work | Requests / keywords | Outcome | Actual provider cost |
|---|---|---|---:|
| Google Ads US English volume | One request / 171 new phrases | 171 rows; 55 positive estimates, 116 provider-null, zero explicit-zero annual-average values | $0.0900 |
| Google US English mobile Android SERP pilot | 32 requests, depth 10 | 30 successful, two provider errors | $0.0640 |
| Sound variations and five final-form groups | Nine requests, same settings | Nine successful | $0.0180 |
| Two Hebrew-qualified ambiguity probes | Two requests, same settings | Both provider errors; no intent conclusion | $0.0040 |
| Google Labs organic difficulty | One request / 35 selected phrases | 35 rows; 26 numeric values, nine provider-null | $0.0162 |
| **Total** | **45 paid requests** | **43 SERP requests: 39 successful, four failed** | **$0.1922** |

Maximum spend used for this run: **$0.25**. Every request was checked against the configured guard before execution; each actual charge was recorded in the existing local cost ledger. The permanent [cost ledger](semantic-core-v2-alphabet-research/cost-ledger.csv) reconciles to raw provider costs, including charges for failed SERPs. No paid retries were performed, and no account top-up was made.

Current published tariffs differ from the skill's older estimates: volume Live is $0.09 per task; Google Organic Live is $0.002 per ten-result SERP; Google Labs' applicable table is $0.012/task plus $0.00012/item. Conservative guard checks covered the higher observed volume/difficulty costs without changing the user's guard configuration. [Google Ads pricing](https://dataforseo.com/pricing/keywords-data/google-ads), [Google Organic SERP pricing](https://dataforseo.com/pricing/google-serp/google-organic-serp-api), [Google Labs pricing](https://dataforseo.com/pricing/dataforseo-labs/dataforseo-google-api).

Volume request settings: United States `2840`, English `en`, `search_partners: false`. SERP settings: Google Organic Live Advanced, `2840`, `en`, `device: mobile`, `os: android`, depth 10, no paid extras. Difficulty: Google Labs, US/English; this metric is not mobile-specific. No site-wide SEO data, backlinks, account balances, app entitlement records, or credentials were queried.

## Demand findings

All 22 primary letter-identification phrases received positive volume estimates. This establishes demand for letter-related information, not a guarantee that a standalone interactive lesson will match all of it. High-volume letter names still lead to historical, symbolic, religious, video, graphic and discussion content in the observed results.

| Letter / planned URL suffix | US monthly volume* | Difficulty** | SERP organic rows | Readiness |
|---|---:|---:|---:|---|
| `aleph` | 390 | 15 | 7 | Unique content / public-use review pending |
| `bet` | 720 | 1 | 7 | Unique content / public-use review pending |
| `gimel` | 260 | 5 | 7 | Unique content / public-use review pending |
| `dalet` | 320 | 0 | 7 | Identity confirmed by owner; content review pending |
| `he` | 140 | 3 | 7 | Unique content / public-use review pending |
| `vav` | 590 | 5 | 7 | Unique content / public-use review pending |
| `zayin` | 210 | 0 | 7 | Unique content / public-use review pending |
| `chet` | 260 | 3 | 7 | Unique content / public-use review pending |
| `tet` | 390 | 2 | 7 | Unique content / public-use review pending |
| `yod` | 480 | 7 | 7 | Unique content / public-use review pending |
| `kaf` | 170 | 3 | 7 | Unique content / public-use review pending |
| `lamed` | 260 | 3 | 7 | Unique content / public-use review pending |
| `mem` | 390 | 0 | 7 | Unique content / public-use review pending |
| `nun` | 1300 | 0 | 7 | Unique content / public-use review pending |
| `samekh` | 320 | 0 | 7 | Unique content / public-use review pending |
| `ayin` | 260 | 3 | 7 | Unique content / public-use review pending |
| `pe` | 480 | 1 | 7 | Unique content / public-use review pending |
| `tsadi` | 10 | Provider-null | 7 | Unique content / public-use review pending |
| `qof` | 50 | 9 | 8 | Unique content / public-use review pending |
| `resh` | 2400 | 6 | 7 | Unique content / public-use review pending |
| `shin` | 2400 | 2 | 6 | Unique content / public-use review pending |
| `tav` | 590 | 2 | 7 | Unique content / public-use review pending |

\* Google Ads US average monthly volume, not organic visits, mobile-only demand or a forecast. The returned monthly histories span September 2025–August 2026; some individual history months are zero even when the average is positive.

\** DataForSEO's organic difficulty estimate. Numeric zero is retained as a provider value, distinct from provider-null; it does not imply guaranteed ranking, zero competition, or no editorial effort. Primary Tsadi's difficulty was provider-null.

Notable exact-query observations:

- `resh hebrew letter` and `shin hebrew letter`: 2,400 each; `nun hebrew letter`: 1,300. Their result meanings require careful scope rather than a traffic forecast.
- `dalet hebrew letter`: volume 320, difficulty 0, seven returned organic rows. The identity decision comes from the owner, **not** this SERP; content review remains separate.
- `hebrew alphabet course`: volume 20, difficulty provider-null. The hub has a real course-navigation role, but this phrase alone is not a large acquisition forecast.
- Final-form exact phrases: `kaf sofit` 40; `mem sofit` 110; `nun sofit` 70; `pe sofit` 10; `tsadi sofit` 10. Teach them within the five appropriate base-letter lessons; no five extra URLs are warranted by this sample.
- `hey hebrew letter` returned 390 versus `he hebrew letter` 140. Preserve the planned stable `he` slug and explain Hey/He aliases in readable copy. Similarly, transliteration variants should share a page rather than generate duplicate routes.
- No exercise-template phrase of the form `{letter} hebrew letter exercises` received a non-null volume estimate in this batch. Treat those phrases as pedagogical supporting language, not measured traffic targets.
- The three verified Aleph vowel combinations returned provider-null volume, while all three SERPs succeeded. They remain useful applied teaching candidates; do not label their demand zero.

Do not total variant volumes into a “course market size.” Several aliases share identical monthly series; even distinct estimates can overlap in intent. Keyword-volume rows are not additive users or traffic. Retain provider spell/grouping fields and original provenance. [Volume results](semantic-core-v2-alphabet-research/volume-results.csv), [raw volume response](semantic-core-v2-alphabet-research/volume-raw.json).

## SERP findings and query qualification

The 39 successful responses contain **279 returned organic rows**, with **6–9 organic URLs per query**. Requested depth 10 did not guarantee ten organic rows. SERP feature positions and organic-group ranks are stored separately. Titles and URLs support page-format inferences; linked pages were not independently crawled or reviewed for their teaching accuracy, licensing, accessibility or interactivity.

### Course versus reference versus games

`hebrew alphabet course` returned beginner tutorials, video lessons and learning-resource/course homepages. `hebrew alphabet course for beginners` returned alphabet references and tutorials, including videos and a chart page. These are compatible with a course hub, provided it leads into an actual curriculum.

`learn hebrew alphabet` returned alphabet-reading guides, a university alphabet resource and a learning-provider alphabet resource. `hebrew alphabet chart` returned visual/chart references and a PDF. Keep the existing guide's v1 ownership of these broad queries. Do not move `learn hebrew alphabet` automatically onto the hub.

`hebrew alphabet quiz` returned browser quiz/game resources and a printable practice quiz. Retain the existing `/play/alef-bet-rush/` assignment for the browser quiz experience; course-specific practice belongs in the lesson flow rather than competing as a second generic quiz landing page.

### Primary letter queries

The Hebrew-qualified identification terms substantially reduce bare English-word ambiguity, but still mix practical instruction with letter symbolism, Biblical/history topics, videos, pictures and discussions. Examples include symbolic Aleph imagery, a modern alphabet pronunciation guide, religious Vav resources, Resh history, and Shin language/reference discussions. This supports a clear Modern Hebrew beginner-learning scope; it does not support importing symbolic or Biblical claims as course teaching objectives.

Each planned letter page must add a useful static explanation, actually taught examples/forms, reviewed pronunciation, and practice. A name, glyph and sentence copied from the existing guide are insufficient. Search volume or a low difficulty value alone does not pass the lesson indexing gate.

### Sound-variation and ambiguity decisions

| Query | Observed result interpretation | V2 action |
|---|---|---|
| `bet vs vet pronunciation` | Hebrew letter explanations, instructional video and language discussions | Retain v1's guide target; Bet lesson may offer deeper applied practice after content review. |
| `kaf vs chaf pronunciation` | Letter instruction, pronunciation audio, related sound/shape discussions and reading material | Retain v1's guide target; Kaf lesson is a plausible deeper practice destination. Audio is a meaningful content expectation. |
| `pe vs fe pronunciation` | Returned sample strongly favors FE/PE engineering exams and English pronunciation, rather than Hebrew letter learning | Hold as an ambiguous historical v1 control. Do not count unrelated demand as course opportunity or prioritize its existing assignment. |
| `shin vs sin pronunciation` | Hebrew references mixed with Arabic pronunciation and English pronunciation material | Conditional scope; use explicit Hebrew framing and retain v1 target until a verified reassignment is justified. |
| Five `sofit` terms | Letter references, diagrams/graphics, discussion and some instruction | Teach each final form on its base-letter lesson. Keep the broad “Hebrew final letters” reference assignment unchanged. |

The two additional candidate hypotheses are `hebrew pe vs fe pronunciation` and `hebrew shin vs sin pronunciation`. Both received a provider SERP error and provider-null difficulty. Neither received a volume request. They are **unverified**, rather than evidence that qualification fixes the ambiguity. They remain research holds in the v2 candidate file; no second volume batch or paid retry was run.

### Provider errors

| Query | Provider status | Meaning |
|---|---|---|
| `hebrew alphabet lessons online` | 40101 — Internal SE Server Error | SERP intent unknown; not a zero-result query. |
| `interactive hebrew alphabet course` | 40101 — Internal SE Server Error | SERP intent unknown; not a zero-result query. |
| `hebrew pe vs fe pronunciation` | 40101 — Internal SE Server Error | Qualified pronunciation intent unverified. |
| `hebrew shin vs sin pronunciation` | 40101 — Internal SE Server Error | Qualified pronunciation intent unverified. |

All four charged $0.002. Raw failure responses and status fields are preserved. Retry work belongs in a future bounded refresh if these decisions still require it. Do not assume competitor absence or HebrewEdu ranking from failed results. [Query validation](semantic-core-v2-alphabet-research/serp-target-validation.csv), [organic results](semantic-core-v2-alphabet-research/serp-organic-results.csv).

## Overlap and cannibalization

Exact-URL overlap was computed only for successful comparable snapshots with at least six returned URLs each. There is zero exact returned-URL overlap between `hebrew alphabet course` and the broad `learn hebrew alphabet` control, between the course and chart control, and between `hebrew alphabet course for beginners` and `learn hebrew alphabet`. This supports preserving distinct course/reference responsibilities as a working hypothesis. Sparse samples and variable SERPs do not prove permanent separation or remove the need for content differentiation.

Three positive comparison examples: Kaf pronunciation variation versus Kaf identification shares one URL (1/7 = 0.1429 overlap coefficient); `kaf sofit` versus Kaf identification shares two (2/7 = 0.2857); `tsadi sofit` versus Tsadi identification shares one (1/6 = 0.1667). These observations fit teaching sound/final variants on their base-letter page. They do not justify separate variant URLs or automatic consolidation of existing guide targets. [Exact-URL overlap table](semantic-core-v2-alphabet-research/serp-overlap.csv).

The intended page responsibilities stay:

| Destination | Responsibility | Mapping decision |
|---|---|---|
| `/blog/hebrew-alphabet-complete-guide/` | Whole alphabet, chart, names, count, broad final forms and sound reference | Existing v1 ownership retained. |
| `/learn/hebrew-alphabet/` | Course outcomes, ordered syllabus, learning progression and start/resume | Proposed course-specific targets; no competing chart/reference promise. |
| `/learn/hebrew-alphabet/{letter}/` | Distinct letter teaching, forms and combinations actually taught, feedback and contextual practice | Conditional on content quality and public-use decisions. |
| `/blog/how-to-read-hebrew-nikud/` | General vowel system/mark explanations | Existing v1 ownership retained; link to Aleph for applied practice later. |
| `/play/` and game landing pages | Browser games, recognition/matching and generic quiz | Existing v1 ownership retained. |
| `/` | Mobile-app discovery and store conversion | Existing v1 ownership retained. |

All course destinations remain proposals, not existing crawlable URLs. Use self-canonicals for independently useful future pages. Do not use cross-canonicals to obscure overlap, generate aliases as pages, or add unbuilt lesson routes to the sitemap.

## Dataset interpretation and preservation

`semantic-core-v2.csv` is a **research edition**, not a declaration that 309 phrases are qualified primary targets. It includes supporting long-tail hypotheses and explicit holds. The first 136 rows preserve every original v1 field value; appended `v2_*` fields carry follow-up evidence without rewriting historical source metrics or targets. Existing v1 queries also appear in the candidate companion as controls, not additions counted twice.

`semantic-core-v2-alphabet-expansion-candidates.csv` now contains **197 rows**: 173 new candidates and 24 v1 controls. New candidates divide into 167 letter-related phrases and six hub phrases. Volume distinguishes `provider_positive`, `provider_null`, `provider_zero`, `not_requested`, and `v1_historical_not_refreshed`. Difficulty and SERP status likewise distinguish current measured values, nulls, errors and unrequested/historical data. A blank cell is never automatically zero.

No search-volume request refreshed the 24 v1 controls. Their original volume observations remain explicitly historical where displayed. Current SERP/difficulty checks on some controls do not silently overwrite the originals. The unqualified Pe/Fe control's old target is retained as a historical assignment while the new query-fit field flags its ambiguity.

The source v1 CSV, keyword-to-URL map, content audit, rank-tracking file and other 23 pre-existing foundation files were fingerprinted before work and verified unchanged afterward. The updated investigation report and expansion companion were intentionally excluded from the preservation manifest because the user requested their progression. Website `git status --short` remained empty. No rank-tracking baseline is claimed for unbuilt lesson URLs.

Additional artifacts:

- [Owner-aware course mapping](course-letter-map-v2.json): 22 planned IDs/slugs; Dalet owner confirmation recorded; no claim of a full content export.
- [Implementation roadmap](hebrew-alphabet-course-implementation-roadmap.md): future content/public-use checks, static pipeline and POC acceptance criteria.
- `semantic-core-v2-alphabet-research/`: raw responses, requests, timestamps, row-level summaries, overlap and costs. No API credentials or mobile-app answer-key export is included.

## Next implementation decisions

Proceed with the **roadmap**, not website execution. A later implementation should start with a local Lesson 1 POC using the already-inspected snapshot. It should prove normalization, the five study-block renderers, the three observed exercise types, RTL/niqqud accessibility, and the deliberate public self-assessment model. Rights, wording corrections and media policy remain ordinary content decisions; the Dalet description mismatch is not a dependency.

After an explicitly authorized full read export, prioritize richer letter content such as Bet's sound variation, Kaf's sound/final-form instruction and Shin's dot distinction if actually taught. Preserve verified pedagogical order for the course even if acquisition priorities differ. Resh/Shin/Nun's larger identification estimates can guide content quality review, but do not bypass source verification or dictate the first lesson a beginner should take.

Before public rollout, review every lesson's unique static teaching value and indexability, media/answer exposure policy, canonical/sitemap consistency and the guide/course/game link network. Publish only ready pages and truthful course capabilities. The current data supports continued curriculum development and a carefully scoped future POC; it does not warrant automatic publication of all 23 proposed URLs or a traffic/install forecast.
