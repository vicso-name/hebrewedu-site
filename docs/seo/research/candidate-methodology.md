# HebrewEdu Semantic Core Stage 2A: candidate methodology

Prepared 2026-10-10. Status: offline candidate discovery for review. Market: United States; search engine: Google; language: English; future rank-tracking device: Mobile. These are project settings, not measured attributes of every source row.

## Deliverables and scope

`keyword-candidates.csv` contains **136 candidates** across all seven requested topics. `candidate-methodology.md` documents evidence, existing coverage, exclusions and limitations. Files live in `/private/tmp/hebrewedu-semantic-core-stage-2a-2026-10-10`, outside the Astro repository. This is a temporary local research workspace; preserve it elsewhere if long-term storage is needed.

No network calls, paid or free API calls, live crawling, SERP checks, keyword metrics requests, site builds, website edits, configuration edits, commits or pushes were performed in this stage. Stage 2A API spending: **$0.00**. The earlier $0.09 verification is a separate stage. Its metrics were deliberately not copied into this offline candidate file.

## Method

1. Read the local page routes, content collection and sitemap generator before expanding candidates. Read article text and tables for alphabet, Nikud, roots, binyanim, vocabulary, listening and study-plan coverage; review titles, descriptions and headings across the complete blog inventory. Read homepage feature copy and both game landing pages.
2. Consult the saved SEO audit, data handoff, keyword map and page baseline. Treat their target assignments as editorial proposals, not measured query-to-page relationships. Prefer the actual current article slugs; avoid the old 404 paths noted by the audit.
3. Parse both original GSC XLSX exports offline with the Python standard library, reading Queries and Filters. The union contains 80 disclosed query strings. The saved 80-row keyword map corroborates this inventory but is not the primary authority for query wording.
4. Verify feature boundaries with the founder/product story, iOS project documentation and existing Android English vowel/deck assets. Inspect the beginner demonstrative-pronoun, hine, possessive-sheli and food decks directly. Code/assets and port plans demonstrate documented implementation, not a new live app-store availability check or complete platform parity audit.
5. Keep distinct learner tasks, product-selection needs and explanations. Use one representative for word-order, spelling and trivial phrasing variants. Preserve exact observed alternatives in `supporting_gsc_queries` instead of giving each variant another row. For example, the three previously tested alphabet-app strings occupy one candidate row here. Distinct letter-sound contrasts and vowel-mark questions remain because they require different explanations, not merely alternate spellings.
6. Assign a provisional thematic cluster and one potential existing target per row. Clusters are editorial and based on topics and intent; no SERP-overlap clustering or organic ranking validation occurred. No articles were drafted or publishing roadmap created.
7. Validate unique normalized keywords, required fields, approved source labels, evidence-backed GSC strings, existing target routes and topic totals. Validate the final CSV using a fresh read; compare repository status before and after.

## Source meanings and CSV fields

- `GSC`: the candidate or a listed equivalent consolidated alias appears exactly in an original Queries sheet. It does not mean the query has proven US demand, mobile demand or a known ranking URL. Exact source wording is retained, including the observed easy-to-learn question consolidated under the existing difficulty article's hard-to-learn wording. The chart candidate is labeled existing site topic because its supporting broad alphabet queries do not prove chart-specific intent.
- `existing site topic`: the existing page explicitly covers the subject. Keyword phrasing is editorial; actual search behavior is not verified.
- `hypothesis`: an unobserved product-selection or feature-specific search formulation supported by actual product evidence. It is not a measured demand claim.
- `source_reference`: repository-relative evidence paths; app evidence uses absolute paths. GSC workbook names resolve to `/private/tmp/hebrewedu-seo-audit-2026-10-10`. For a GSC row, check `supporting_gsc_queries` against the relevant workbook rather than assuming presence in both periods.
- `search_intent`: informational (learn/understand/practice), commercial investigation (evaluate app fit), navigational (find a named brand/product/game), or transactional (start a browser activity). These labels are provisional offline judgments; informational versus interactive intent may overlap.
- `potential_target_url`: proposed destination, not an observed ranking URL. Every assigned URL is existing; none is a new article proposal. Homepage routes for app drills are provisional when the site lacks a focused resource.
- `coverage_note`: limitations, partial answer coverage, app-only resources and unsupported extrapolations. Source confidence and page suitability are different: a GSC query can still have poor target-page coverage.
- `relevance_to_actual_product`: the specific supported feature or learner problem. Educational articles can cover an adjacent question without establishing that the app teaches that skill.

No search-volume, CPC, organic-difficulty, competition or ranking-position columns are present. No estimates of those metrics were fabricated.

Source distribution: **hypothesis: 17; GSC: 14; existing site topic: 105**. Consolidation preserves **37 exact GSC query strings** across candidate and alias cells. The 43 other disclosed strings are deferred or excluded below; omission is not evidence that a query has no traffic.

## GSC and audit limitations

Original export filters:
- `gsc-performance-28-day-comparison.xlsx`: Search type = Web; Date = Last 28 days
- `gsc-performance-last-3-months.xlsx`: Search type = Web; Date = Last 3 months

The exports contain aggregate Web search data with no US-only or mobile-only filter listed. Country and device tabs are independent aggregates; do not join them to the query table to fabricate a US/mobile query segment. The saved audit dates the three-month chart to 2026-07-07 through 2026-10-06 and reconstructs the comparison windows as 2026-09-09 through 2026-10-06 versus 2026-08-12 through 2026-09-08. The comparison's calendar dates are inferred by the prior audit, not explicitly exported Filters values.

The audit reports a substantial disclosure gap between the query table and property totals. Candidates from GSC represent only disclosed wording, not the entire search market. Independently exported Queries and Pages cannot establish which page ranks for an individual query. The audit also notes that sitemap inclusion and HTTP 200 are not proof of indexing. Its saved Hebrew Mahjong inspection records an indexing request, not confirmed indexing.

The previous audit identifies the homepage/alphabet-app direction as the clearest existing discovery signal. It also finds impressions for the existing difficulty, unpointed-reading and comprehension articles. These observations justify reviewing existing coverage first, not ranking these candidates by invented volume or promising a traffic increase.

## Coverage summary

| Requested topic | Candidates |
|---|---:|
| Hebrew learning apps | 18 |
| Learning Hebrew for beginners | 14 |
| Hebrew alphabet and pronunciation | 22 |
| Hebrew reading and Nikud | 25 |
| Hebrew vocabulary | 16 |
| Beginner Hebrew grammar | 24 |
| Interactive Hebrew alphabet games | 17 |
| **Total** | **136** |

- **Apps:** existing homepage plus product story and verb-directory feature article. Platform, audio, review and reading candidates reflect documented capabilities. The two observed best-app queries remain comparison intents, with explicit coverage caveats and no superiority claim.
- **Beginners:** current difficulty, study-habits, alphabet study-plan and listening articles provide a learning sequence. The broad beginner query has partial coverage on the homepage.
- **Alphabet and pronunciation:** the complete guide supplies the letter table, final forms and sound contrasts; the handwriting article explains script differences only. Game letter-name audio is distinguished from contextual letter/word sounds. Detailed articulation is not implied by a brief table entry.
- **Reading/Nikud:** retain separate targets for vowel marks, the transition to unpointed text and reading comprehension. Story/audio queries fit the app Reading Trainer; the website currently describes those tools rather than hosting a beginner story library.
- **Vocabulary:** existing retention and word-count articles plus app review and verified First Words decks. Frequency and beginner-word-list queries have advisory coverage rather than an exhaustive downloadable list.
- **Grammar:** existing roots, binyanim and verb-directory articles cover patterns and reference tools. The verb feature page describes app conjugations rather than supplying a comprehensive browser tool. Specific pronoun, sheli, hine and sentence-building candidates are hypotheses supported by Android decks and explicitly marked as having weak web coverage; no new article plan was generated.
- **Games:** existing Play, Alef Bet Rush and Hebrew Mahjong landing pages, with the educational-game article for method and comparison. Rush supports guided recognition and audio; Mahjong supports pairing and calm practice. Both games focus on standard letters and letter names; neither is presented as a Nikud, full reading or grammar game.

## Existing page inventory and targeting decisions

The current repository contains **18 blog articles** and 8 sitemap-declared static pages: `/`, `/blog/`, `/play/`, the two game landing pages, `/privacy/`, `/website-privacy/` and `/terms/`, for 26 sitemap URLs implied by current source. The saved sitemap XML also contains 26 URLs. The earlier handoff text says 24, so its narrative count is inconsistent with the saved XML; use the actual XML and current source for inventory, and do not infer indexing from either. Two `/play/.../game/` wrapper routes and built game asset URLs also exist; inspectable game landing pages are used as targets rather than asset/wrapper URLs.

| Existing blog URL | Current title |
|---|---|
| https://hebrewedu.com/blog/best-hebrew-listening-practice/ | The Best Hebrew Listening Practice for Every Level |
| https://hebrewedu.com/blog/hebrew-alphabet-complete-guide/ | The Hebrew Alphabet: A Complete Guide to All 22 Letters |
| https://hebrewedu.com/blog/hebrew-binyanim-explained/ | What Are Hebrew Binyanim? A Practical Beginner's Guide |
| https://hebrewedu.com/blog/how-hard-is-hebrew-to-learn/ | Is Hebrew Hard to Learn? A Realistic Guide for Beginners |
| https://hebrewedu.com/blog/how-many-words-are-in-the-modern-hebrew-language/ | How Many Words Are in the Modern Hebrew Language? |
| https://hebrewedu.com/blog/how-not-to-learn-hebrew-a-complete-guide-to-failing-efficiently/ | How Not to Learn Hebrew: A Complete Guide to Failing |
| https://hebrewedu.com/blog/how-the-hebrew-root-system-works/ | How the Hebrew Root System Works: Shorashim Explained |
| https://hebrewedu.com/blog/how-to-learn-hebrew-vocabulary/ | How to Learn Hebrew Vocabulary That Actually Sticks |
| https://hebrewedu.com/blog/how-to-read-hebrew-nikud/ | How to Read Hebrew Nikud: A Complete Beginner's Guide |
| https://hebrewedu.com/blog/learn-hebrew-alphabet-7-days/ | Learn the Hebrew Alphabet in 7 Days: A Realistic Plan |
| https://hebrewedu.com/blog/meet-the-new-verb-directory/ | Alef-Bet Tutor Verb Directory: 334 Essential Hebrew Verbs |
| https://hebrewedu.com/blog/porting-android-app-to-ios-with-ai/ | What It Took to Bring a Mature Android App to iOS |
| https://hebrewedu.com/blog/story-behind-learn-hebrew-read-speak/ | From Letters to Understanding: The Story Behind Learn Hebrew – Read & Speak |
| https://hebrewedu.com/blog/what-makes-a-language-learning-game-educational/ | What Makes a Language-Learning Game Educational? |
| https://hebrewedu.com/blog/why-hebrew-handwriting-looks-completely-different-from-printed-hebrew/ | Why Hebrew Handwriting Looks Different From Printed Hebrew |
| https://hebrewedu.com/blog/why-hebrew-sounds-so-fast/ | Why Hebrew Sounds So Fast (And What to Do About It) |
| https://hebrewedu.com/blog/why-hebrew-without-vowels-looks-impossible-until-your-brain-adapts/ | How to Read Hebrew Without Vowels (and Why It Gets Easier) |
| https://hebrewedu.com/blog/why-you-can-read-hebrew-but-still-understand-absolutely-nothing/ | Why You Can Read Hebrew but Still Not Understand It |

The Android-to-iOS engineering story is inventoried but excluded from learner keyword targeting. Brand/product and educational-game stories are used only where they fit product identity or teaching approach. Blog index and legal pages are not assigned as learning targets. Handwriting is an educational adjacent topic only: HebrewEdu does not teach handwriting, touchscreen tracing or calligraphy. No handwriting-app candidate is included.

## Exclusions and consolidation

No Biblical, Torah, prayer-reading, liturgical pronunciation, ancient-Hebrew, ulpan-location, classroom-booking, exam-certification, advanced academic grammar, generic translation-service, AI tutor, speech-scoring, fluency-guarantee or guaranteed A2 candidate was added. Religious references inside educational articles are not evidence that the product teaches Biblical Hebrew.

Do not describe the whole app as free because browser games are free. Do not infer iPad/tablet support from iPhone availability; the iOS README places iPad outside v1 scope. Offline applies to documented core learning, not every network-backed tool. Do not infer all Android content is already identical on iOS.

`hebrew patterns` and `pattern in hebrew` are deferred because their intent could be unrelated to grammar. `learn hebrew writing` is deferred because the desired activity may be handwriting instruction absent from the app. `hebrew articles`, `hebrew articles for beginners` and `hebrew newspaper for beginners` are deferred because neither a Hebrew web article library nor a news product is documented. Comparison with Arabic is peripheral to the seven requested topics. Wrong-language strings, obvious alphabet typos and disconnected generic words are not expanded into candidate pages.

Complete deferred/excluded disclosed-query inventory (variants absorbed into candidate aliases are not listed here):
- `ahabet`
- `ahlabet`
- `alahbet`
- `alfaphet`
- `alferbet`
- `alhapbet`
- `alifbet`
- `alohebet`
- `alpevet`
- `alphabet`
- `alrabet`
- `android?`
- `aphelbet`
- `app`
- `appelbet`
- `aulabet`
- `bhebrew`
- `elabete`
- `elfebet`
- `elphabet`
- `free`
- `hebreeuws alfabet leren`
- `hebrew articles`
- `hebrew articles for beginners`
- `hebrew classes for beginners`
- `hebrew newspaper for beginners`
- `hebrew notes`
- `hebrew patterns`
- `hebrew tips for elementary students`
- `helphabet`
- `homework in hebrew`
- `how to teach hebrew`
- `i know the alphabet`
- `israel in hebrew`
- `learn hebrew writing`
- `leer hebreeuws`
- `lhbet`
- `pattern in hebrew`
- `plataforma`
- `what is israel in hebrew`
- `why is hebrew easier than arabic`
- `yes`
- `yes.`

## Evidence manifest

These local prior-audit sources were read; hashes make the reviewed snapshots identifiable. No remote sources were fetched in Stage 2A.

- `/private/tmp/hebrewedu-seo-audit-2026-10-10/SEO_AUDIT_RU.md` — SHA-256 `eda9e5e17f0509dd7d3f1a868cc7eb2fc1861d1cd86982f8a6e33e111226a585`
- `/private/tmp/hebrewedu-seo-audit-2026-10-10/SEO_AGENT_HANDOFF.md` — SHA-256 `6075e3d0e4b097116948ba768b6a6a5fc695b7e9f144edd1c5fbd77c0c075f66`
- `/private/tmp/hebrewedu-seo-audit-2026-10-10/keyword-map.csv` — SHA-256 `1ede728d7eccc869660763748e59e71f2f65c1cab261e529eb79b3d785aced6b`
- `/private/tmp/hebrewedu-seo-audit-2026-10-10/page-baseline.csv` — SHA-256 `d93db7bcf55699f4b7c5b9ee43710d70c0a5ad9c1a2c44d09a91a3b35ed9c4de`
- `/private/tmp/hebrewedu-seo-audit-2026-10-10/sitemap.xml` — SHA-256 `8528bb5120e5f25555e33777dbc58557d5b2b1d86b516c4b2e8863c2b29dfca7`
- `/private/tmp/hebrewedu-seo-audit-2026-10-10/gsc-performance-28-day-comparison.xlsx` — SHA-256 `2d9a6dcda474edc3190d37e2e1a1f247c42f5b527cae3f9f281eacc5ce57c23f`
- `/private/tmp/hebrewedu-seo-audit-2026-10-10/gsc-performance-last-3-months.xlsx` — SHA-256 `7d7a6e700f49400d3e5f89983af5cc122ba703c70e507058e11bd29735813e5f`

Additional primary evidence: `/Users/kasutaja/Developer/web/hebrewedu-site/src/content/blog/*.md`, `src/content.config.ts`, `src/pages/blog/[slug].astro`, `src/pages/sitemap.xml.ts`, homepage component copy, `src/data/site.ts`, `src/data/faq.ts`, game landing pages; `/Users/kasutaja/Developer/ios/AlefBetTutor/README.md`; Android `data_verbs/VERB_EXPLORER_README.md`, `assets/vowels/VOWEL_CONTENT_GUIDE.md`, English vowel JSON files and the ten English beginner deck assets. Per-row references identify the most relevant website/asset evidence.

## Review boundary

This dataset is ready for a relevance and target-fit review. It is not a final semantic core, a verified US mobile ranking list or a paid measurement queue. Demand, final intent, SERP page types, keyword difficulty and ranking ownership remain unvalidated. No further research, paid calls, article generation or implementation is authorized by this deliverable; stop here for review.


## Stage 2B: candidate qualification

Qualified 2026-10-10 in `keyword-candidates-qualified.csv`. The qualification pass preserves all **136** Stage 2A keywords in their original order and retains every original evidence and target column. It appends four classifications and one short rationale; the Stage 2A file remains unchanged. The pass uses the above inventory, evidence and caveats; it adds no new candidates, keyword metrics, website audit, network calls or paid requests.

### Classification counts

| Field | Value | Count |
|---|---|---:|
| Priority | Core | 7 |
| Priority | Supporting | 92 |
| Priority | Explore | 37 |
| Priority | Exclude | 0 |
| Coverage | Full | 73 |
| Coverage | Partial | 43 |
| Coverage | App-only | 20 |
| Coverage | None | 0 |
| Target fit | Good | 74 |
| Target fit | Weak | 35 |
| Target fit | Requires SERP validation | 27 |

### Classification rules

- **Priority:** `Core` means close to an existing HebrewEdu proposition with a suitable current target; it does not assert demand. `Supporting` means a useful adjacent or narrower candidate with meaningful coverage. `Explore` retains unresolved intent, product-only, broad-to-narrow and page-type cases for research. `Exclude` is reserved for an unsupported or clearly irrelevant intent; no candidates reached that bar in this relevance-only pass. Unknown volume is never grounds for exclusion.
- **Coverage:** `Full` means the proposed page or browser game substantially answers the query. `Partial` means it covers a related subject but leaves a meaningful scope, format or audience gap. `App-only` means the relevant usable feature is in the mobile app and the proposed web destination does not provide that queried tool or lesson. `None` means neither the target nor verified product evidence supports the requested intent; none of these pre-screened candidates was classified `None`.
- **Target fit:** `Good` is a close match to an existing destination and intent. `Weak` means a visible scope or delivery mismatch, often a homepage overview standing in for an app-only feature. `Requires SERP validation` means relevance is plausible but query wording, competing intent, comparison format or broad-versus-specific page type is unresolved.
- **Reason:** each concise rationale names the direct evidence or mismatch that determines the row's classifications. GSC presence supports observation only; it does not raise priority by an invented volume or imply query-page attribution.

### Target-mapping issues identified

1. **Commercial discovery versus comparison:** the homepage is a reasonable target for app-selection queries, and the GSC-observed alphabet-app wording supports that fit. However, the observed `best app` queries ask for a comparison the homepage does not provide. They remain `Explore`, with partial coverage and SERP validation required; no claim that HebrewEdu is best is added.
2. **Homepage as a placeholder for app functionality:** mobile-only alphabet-vowel exercises, Reading Trainer practice/audio stories, vocabulary pronunciation, food-word drills, verb practice/reference, sentence-building and selected grammar decks have no equivalent usable website tool/page. Their homepage-mapped candidates are marked `App-only` and `Weak` where the feature is verified. Android-deck evidence is not treated as proof of iOS parity.
3. **Broad grammar and vocabulary wording:** `/blog/hebrew-binyanim-explained/` covers verb patterns, not beginner Hebrew grammar as a whole. `/blog/how-to-learn-hebrew-vocabulary/` offers learning advice, not a ranked common-word list, complete beginner dictionary or downloadable flashcards. Those broader candidates remain partial/exploratory or require SERP validation.
4. **A feature article is not the in-app tool:** `/blog/meet-the-new-verb-directory/` describes the directory, but does not provide the app's full conjugation reference on the web. Chart, tense, Nikud and infinitive tool queries therefore receive `App-only` coverage and weak web target fit.
5. **Capitalization and educational scope:** Hebrew has no uppercase/lowercase letter case, as the alphabet guide explains. The capitalization query remains `Explore` because typography-related result intent needs checking; it is not treated as a product feature. Handwriting comparison is covered by the existing article, while HebrewEdu does not teach handwriting.
6. **Two browser games, separate from the app:** `/play/` and the Alef Bet Rush/Hebrew Mahjong landing pages genuinely support free browser alphabet play, matching and letter-name audio. Those can be `Full` web coverage. Mobile-app lessons, reading and grammar functions are not attributed to the browser games.
7. **No early exclusions:** candidates with uncertain or partial relevance remain `Explore`; this stage does not interpret missing volume as zero or as irrelevance. The classifications do not invent search metrics, ranking positions or page-ranking assignments.

Stage 2B artifact count: 136 original candidates; no paid API calls; no site changes.
## Stage 2C: US search-volume enrichment

Retrieved 2026-10-10T12:50:31Z via exactly one DataForSEO Google Ads Search Volume Live request: one task, 136 submitted keywords, 136 results, zero task errors. Request settings: location_code 2840 (United States), language_code en, Google Ads search partners disabled by the endpoint default. Response and task status: 20000 (Ok). Each reported cost is $0.09 USD. Total Stage 2C paid API spend: $0.09; the only endpoint used was search_volume/live. Stage 2A/2B had $0 API spend. No recurring requests were enabled. The current published Live price is listed on [DataForSEO’s Google Ads pricing page](https://dataforseo.com/pricing/keywords-data/google-ads); the task array, 1000-keyword limit, per-request billing and response fields are documented in the [Live endpoint reference](https://docs.dataforseo.com/v3/keywords_data/google_ads/search_volume/live/).

The complete API JSON is `dataforseo-volume-raw.json`. `keyword-candidates-with-volume.csv` preserves the qualified CSV's original columns, row order, all 136 keyword spellings, priorities, coverage, target fit and qualification reasons, then adds provider/location/language/time/status/cost metadata, matched provider keyword and spell correction, US average monthly volume, CPC, Google Ads competition and index, separate metric-presence fields, and a JSON monthly-search-history array.

### Volume distribution by topic

Numeric volumes are DataForSEO's reported monthly averages. The five numeric bands below are candidate counts (1–10 / 11–50 / 51–100 / 101–500 / 501+). The final column is where the provider returned `null` for average volume; null is missing data, not zero.

| Topic | Volume bands, candidate count | Volume missing |
|---|---:|---:|
| Hebrew learning apps | 2 / 2 / 0 / 2 / 0 | 12 |
| Learning Hebrew for beginners | 1 / 0 / 0 / 2 / 1 | 10 |
| Hebrew alphabet and pronunciation | 3 / 1 / 0 / 2 / 4 | 12 |
| Hebrew reading and Nikud | 3 / 1 / 1 / 1 / 3 | 16 |
| Hebrew vocabulary | 0 / 2 / 0 / 0 / 0 | 14 |
| Beginner Hebrew grammar | 3 / 0 / 0 / 1 / 0 | 20 |
| Interactive Hebrew alphabet games | 1 / 0 / 1 / 0 / 0 | 15 |
| **Total** | **13 / 6 / 2 / 8 / 8** | **99** |

There were 37 results with numeric average search volume and 99 provider-null search-volume results; none returned a numeric zero. CPC was numeric for 21 keywords and provider-null for 115; competition/CPC nulls remain blank with status columns. The API returned all 136 query records, so no candidate is silently dropped. Competition fields are Google's **paid-advertiser competition** metrics, not organic SEO difficulty. No keyword-difficulty endpoint or SERP endpoint was queried.

### High-relevance candidates with numeric volume and strong target fit

| Keyword | Topic | Avg. US monthly searches | CPC (USD) | Google Ads competition |
|---|---|---:|---:|---|
| Hebrew alphabet chart | Alphabet and pronunciation | 3,600 | 0.09 | High |
| How many letters are in the Hebrew alphabet | Alphabet and pronunciation | 1,900 | 1.48 | Low |
| Is Hebrew hard to learn | Learning Hebrew for beginners | 880 | — | Low |
| How to read Hebrew | Reading and Nikud | 720 | 3.95 | Low |
| How to read Hebrew words | Reading and Nikud | 720 | 3.95 | Low |
| Learn Hebrew alphabet | Alphabet and pronunciation | 590 | 2.77 | High |
| Does Hebrew have vowels | Reading and Nikud | 260 | — | Low |
| Hebrew alphabet letter names | Alphabet and pronunciation | 210 | 0.05 | High |
| Hebrew final letters | Alphabet and pronunciation | 170 | 0.01 | Medium |
| Hebrew with and without vowels | Reading and Nikud | 90 | — | Low |
| Hebrew alphabet quiz | Interactive alphabet games | 70 | 2.19 | Low |
| How to read Hebrew without vowels | Reading and Nikud | 30 | 2.52 | Low |

“High-relevance” here means Stage 2B priority Core/Supporting, Full website coverage, and Good target fit; it does not imply organic ranking or guaranteed traffic. Queries with the same reported volume/CPC may share a Google Ads grouped value; these figures must not be summed as if each were independent demand.

### Matching, grouping and limitations

Provider keywords were matched back to source candidates using trimmed, case-insensitive text (casefold) only; punctuation and word order were otherwise unchanged. DataForSEO lowercases submitted keywords. The response contained one row per submitted keyword, with no missing or unexpected terms and no spell corrections. Thus the enriched file has one row for each original candidate.

DataForSEO documents that Google Ads may combine average search volume for similar keyword groups and does not return a grouping identifier with each result. Equal values can indicate grouped Google Ads data; this response does not establish which terms share a group. No extra requests were made to split keywords. Monthly history is preserved exactly as returned in the structured CSV field; provider-null histories are blank and metric status remains explicit.

This is United States Google Ads keyword data in English, not a US-mobile organic forecast. It includes neither organic keyword difficulty nor rank position. CPC and paid competition describe advertising metrics only. Search volume does not establish actual fit beyond the Stage 2B classification.
