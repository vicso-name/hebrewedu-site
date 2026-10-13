# HebrewEdu: eight-article semantic ownership audit

**Date:** 2026-10-13. **Decision:** preserve eight distinct page outcomes; narrow unsuitable assignments rather than consolidate pages. The clearest problems are broad grammar assigned to Binyanim and web-reference queries assigned to an app-feature announcement. Neither is evidence of confirmed Google cannibalization.

## Evidence and limits

Used only the [project index](PROJECT-KNOWLEDGE-INDEX.md), [Phase 1 report](seo-eight-articles-technical-audit.md), research [README](/Users/kasutaja/Developer/seo-research/hebrewedu/README.md), [v2 CSV](/Users/kasutaja/Developer/seo-research/hebrewedu/semantic-core-v2.csv), [keyword map](/Users/kasutaja/Developer/seo-research/hebrewedu/keyword-to-url-map.md), [v2 interpretation](/Users/kasutaja/Developer/seo-research/hebrewedu/semantic-core-v2-research-report.md), and the eight article sources. Phase 1 findings were reused; no technical checks were repeated. Neighbor-page boundaries come from those research documents, not newly reviewed neighbor sources.

V2 contains **309 unique keyword rows**, including proposals/holds. All populated URL-assignment fields agree within each row; there are no duplicate exact-keyword rows assigning one query to multiple pages. A populated `validated_or_proposed_target_url_editorial` is not automatically an approved primary target: action notes and fit gates still apply. The map sometimes uses `.md` paths; those denote sources, not different public pages.

Coverage below includes all **27 rows assigned to these eight pages**, plus 43 materially related secondary/boundary rows. Passing mentions of individual letters, app shopping or historical vocabulary do not confer ownership of every associated query. No query-by-page GSC evidence was supplied or inspected, so cannibalization remains a risk assessment, not a ranking diagnosis. No new search, provider call or ranking measurement was made.

## Eight-page ownership matrix

Codes resolve to exact URLs here and in the neighbor legend below. Article sources are `src/content/blog/<URL-slug>.md`.

| Code / URL | Primary intent and intended user outcome | Ownership recommendation |
|---|---|---|
| L — `/blog/best-hebrew-listening-practice/` | Instructional: choose suitable input and an active listening method for A1–B1. | **Keep + refine.** Own beginner listening methods; validate broader/intermediate coverage. A resource guide, not an on-page audio exercise library. |
| B — `/blog/hebrew-binyanim-explained/` | Explanatory/reference: understand seven verb patterns and their relation to roots. | **Keep + narrow.** Own Binyanim overview/chart and introductory examples; withhold broad beginner grammar. |
| W — `/blog/how-many-words-are-in-the-modern-hebrew-language/` | Quantitative explainer: distinguish language vocabulary size from learner vocabulary goals. | **Keep + refine.** Own word-count questions; leave memorization methods and frequency lists elsewhere. |
| M — `/blog/how-not-to-learn-hebrew-a-complete-guide-to-failing-efficiently/` | Diagnostic advice: recognize counterproductive study habits and change them. | **Narrow.** Own learning mistakes; daily consistency is supporting. Do not promise a comprehensive self-study course. |
| R — `/blog/how-the-hebrew-root-system-works/` | Structural explainer: recognize shared consonantal roots and related word families. | **Keep + refine.** Strengthen the existing root-identification outcome; leave Binyanim overview and vocabulary-study methods with their owners. |
| V — `/blog/meet-the-new-verb-directory/` | Product-feature discovery: understand the app's verb directory and decide whether to use it. | **Narrow.** Prefer branded feature intent; generic conjugation-app intent remains conditional support. Withhold web-chart/list/tense-reference ownership. |
| H — `/blog/why-hebrew-handwriting-looks-completely-different-from-printed-hebrew/` | Explanatory comparison: understand printed/cursive differences and approach recognition calmly. | **Keep + refine.** Explanation fits; visual comparison/reading instruction needs actual paired forms. No current chart, stroke-order or handwriting-course promise. |
| F — `/blog/why-hebrew-sounds-so-fast/` | Diagnostic explainer: understand perceived speech speed, compression and processing difficulty. | **Keep + narrow.** Own the “why fast” question; direct practical level-by-level training to L. |

**No consolidation recommended now.** L/F and R/B are related but solve different questions; W/M likewise differ from the vocabulary-method article. Consider a merge only if later intent validation and query-by-page evidence show the same task and competing URLs, with no useful independent outcome.

## Existing keyword coverage

**Metrics:** US/English Google Ads average monthly volume, not visits; organic KD is the recorded DataForSEO estimate. Preserved-v1 measurements are historical **2026-10-10** observations; Hub extension observations are **2026-10-11**. `null` = explicit provider-null; `—` = blank/unrecorded field; `NR` = explicitly not requested. Numeric **0** is a provider value. No blank is treated as zero, and no variant volumes are added together.

**Intent:** I informational; CI commercial investigation; N navigational; T transactional; IE informational/educational. **Ownership confidence:** H strong editorial fit; M partial/supporting/provisional fit; L mismatch or hold. Confidence assesses fit to the recorded owner, not measured Google preference. Most direct assignments have no pilot SERP; high confidence does not imply SERP validation.

### All rows currently assigned to the eight pages

| Exact v2 keyword | Volume | KD | Current owner | Intent | Confidence |
|---|---:|---:|---|---|---|
| hebrew verb conjugation app | null | — | V | CI | M |
| how to learn hebrew on your own | 10 | — | M | I | L |
| how to study hebrew every day | null | — | M | I | M |
| common mistakes when learning hebrew | null | — | M | I | H |
| hebrew listening practice for beginners | null | — | L | I | H |
| why does hebrew sound so fast | null | — | F | I | H |
| hebrew printed vs handwritten letters | null | — | H | I | M |
| how many words are in modern hebrew | null | — | W | I | H |
| how many hebrew words do beginners need | null | — | W | I | H |
| hebrew grammar for beginners | 10 | — | B | I | L |
| hebrew root system | 10 | — | R | I | H |
| what is a shoresh in hebrew | null | — | R | I | H |
| how to find the root of a hebrew word | null | — | R | I | M |
| hebrew three letter roots examples | null | — | R | I | H |
| hebrew roots and binyanim difference | null | — | B | I | H |
| what are hebrew binyanim | null | — | B | I | H |
| seven hebrew binyanim chart | null | — | B | I | H |
| paal verbs for beginners | null | — | B | I | M |
| piel verbs examples | null | — | B | I | H |
| hifil verbs examples | null | — | B | I | M |
| hitpael verbs examples | null | — | B | I | M |
| nifal verbs meaning | null | — | B | I | M |
| hebrew verb conjugation chart | 260 | — | V | I | L |
| hebrew present past and future verbs | null | — | V | I | L |
| hebrew verbs with nikud | null | — | V | I | L |
| common hebrew verbs for beginners | null | — | V | I | L |
| hebrew verb infinitives | null | — | V | I | L |

Confidence differs from older CSV labels where the current source warrants it: M's mistakes coverage is direct despite a generic qualification note referring to “the homepage”; R illustrates root families but lacks a full root-extraction procedure; H repeats the same encoded glyphs as “printed” and “handwritten” examples without showing distinct cursive forms. B's narrower Hif'il/Hitpa'el/Nif'al coverage is introductory. These are observations for review, not edits to the core.

### Relevant supporting queries and protected neighboring ownership

“Related pages” shows where a term intersects these eight sources; it does **not** assign that term to those pages. Direct-table terms also cross over naturally: L↔F listening/speed; B↔R roots/patterns; W's vocabulary-goal questions recur in L/B/M/R/V/F; M's habits recur in L/B/H/F; V's verbs recur in B/R/W/M. Keep the owner recorded above.

Neighbor URLs:

- **Home** = `/`
- **Guide** = `/blog/hebrew-alphabet-complete-guide/`
- **Plan** = `/blog/learn-hebrew-alphabet-7-days/`
- **Nikud** = `/blog/how-to-read-hebrew-nikud/`
- **Unpointed** = `/blog/why-hebrew-without-vowels-looks-impossible-until-your-brain-adapts/`
- **Comprehension** = `/blog/why-you-can-read-hebrew-but-still-understand-absolutely-nothing/`
- **Vocab** = `/blog/how-to-learn-hebrew-vocabulary/`
- **Difficulty** = `/blog/how-hard-is-hebrew-to-learn/`
- **Story** = `/blog/story-behind-learn-hebrew-read-speak/`
- **Hub** = `/learn/hebrew-alphabet/`
- **Mahjong** = `/play/hebrew-mahjong/`
- **Rush** = `/play/alef-bet-rush/`
- **Play** = `/play/`

| Exact v2 keyword | Volume | KD | Current owner | Related pages | Intent | Confidence |
|---|---:|---:|---|---|---|---|
| how to learn hebrew vocabulary | null | — | Vocab | L,B,W,M,R,F | I | M |
| learning hebrew words through roots | null | — | Vocab | B,W,R | I | H |
| hebrew words for beginners | 50 | — | Vocab | W,M | I | L |
| most common hebrew words | 40 | — | Vocab | L,W,M,F | I | L |
| how to remember hebrew words | null | — | Vocab | M,R | I | M |
| how many hebrew words should i learn per day | null | — | Vocab | W,M | I | M |
| hebrew vocabulary review routine | null | — | Vocab | L,M | I | M |
| hebrew vocabulary for reading | null | — | Comprehension | W,R,V | I | L |
| hebrew reading comprehension for beginners | null | — | Comprehension | L,W,R,V,F | I | M |
| why can i read hebrew but not understand it | null | — | Comprehension | L,W,R,V,F | I | H |
| how to read hebrew without vowels | 30 | — | Unpointed | W,R,H,F | I | H |
| hebrew roots for reading without vowels | null | — | Unpointed | W,R | I | H |
| does hebrew have vowels | 260 | 0 | Unpointed | W,R,H,F | I | H |
| hebrew with and without vowels | 90 | — | Unpointed | W,R,H,F | I | H |
| why does modern hebrew omit vowels | null | — | Unpointed | W,R,H,F | I | H |
| learn hebrew for beginners | 320 | — | Home | L,B,M | I | L |
| is hebrew hard to learn | 880 | — | Difficulty | M,F | I | H |
| how long does it take to learn hebrew | 210 | — | Difficulty | L,M,F | I | H |
| where to start learning hebrew | null | — | Plan | M,H | I | M |
| what to learn after the hebrew alphabet | null | — | Plan | M,H,V | I | M |
| how to learn hebrew alphabet in a week | null | — | Plan | M,H | I | H |
| hebrew alphabet study plan | null | — | Plan | M,H | I | H |
| how to memorize the hebrew alphabet | null | — | Plan | M,H | I | H |
| learn hebrew alphabet | 590 | 9 | Guide | M,H | I | H |
| hebrew alphabet chart | 3600 | 9 | Guide | H | I | M |
| hebrew alphabet letter names | 210 | — | Guide | H | I | H |
| how to read hebrew | 720 | 0 | Guide | W,R,H,F | I | M |
| how to read hebrew words | 720 | — | Nikud | W,R | I | M |
| what is nikud | null | — | Nikud | W,R,V | I | H |
| how to read hebrew nikud | null | — | Nikud | W,V | I | H |
| hebrew reading with audio | null | — | Home | L | I | L |
| hebrew learning app | 320 | 0 | Home | V | CI | M |
| hebrew alphabet app | 30 | 4 | Home | V | CI | H |
| alef bet tutor app | null | — | Story | V | N | M |
| learn hebrew read and speak app | null | — | Story | V | N | M |
| hebrew verb practice | null | — | Home | B,V | I | L |
| hebrew letters that look alike | null | — | Mahjong | H | I | H |
| hebrew similar letters practice | null | — | Mahjong | H | T | H |
| hebrew letter recognition practice | null | — | Rush | H | T | H |
| hebrew alphabet course | 20 | null | Hub | M,H | IE | M |
| hebrew alphabet lessons with exercises | null | NR | Hub | M | IE | M |
| hebrew alphabet games online | 10 | 0 | Play | M,H | T | H |
| hebrew alphabet quiz | 70 | — | Rush | M,H | T | H |

Individual-letter extension phrases remain with their specified lesson owners; H's mentions of Mem/Ayin/Shin are not letter-identification or pronunciation lessons. The project index records Hub/Aleph as published and lessons 2–22 as unpublished; the October 11 report's planning-only language is historical. Existing course/letter holds are not automatically cleared by that later release.

## Conflicts and overlap: evidence and decisions

1. **Recorded URL versus endorsed ownership — broad grammar.** CSV row `hebrew grammar for beginners` retains B, while the map recommends no current target. The CSV action note reconciles this as a hold: “Do not target with the binyanim article as a complete answer.” This is not a duplicate-owner conflict. B teaches one system (`hebrew-binyanim-explained.md:30`, `:61`), not an entire grammar curriculum. Do not promote the retained proposal to primary ownership or transfer it to Homepage, the alphabet Hub or letter lessons.
2. **Assignment-to-format mismatch — verb resources.** V retains `hebrew verb conjugation chart` and four other informational reference/list queries, but the source describes in-app cards/forms/search (`meet-the-new-verb-directory.md:103`, `:117`, `:133`, `:173`). The CSV flags App-only/Weak or Requires SERP validation, and the map explicitly questions a usable web chart. Withhold primary targeting on V. B's seven-pattern overview is not a complete conjugation resource either. `hebrew verb practice` on Home is likewise app-only, not browser exercises; do not move it to Play's alphabet games.
3. **Potential same-query competition among these eight — manageable boundaries.** R's “Roots Inside Verbs” (`:128`) repeats B's root/pattern example (`:42`); B should own `hebrew roots and binyanim difference`, R root structure. L has A1/A2/B1 methods (`:60`, `:82`, `:103`); F explains perceived speed (`:43`, `:72`) and gives broad advice (`:187`). L owns listening practice; F owns why speech feels fast. These are natural overlaps without duplicate assignments. Preserve different titles/outcomes and cross-links; no merge is justified.
4. **Other blogs — goals versus methods versus comprehension.** W's milestones (`:85`, `:108`, `:128`) and R's vocabulary discussion (`:49`) overlap Vocab's assigned learning-method terms. W should answer “how many,” R “how roots work,” Vocab “how to learn.” M's daily-habit sections (`:116`, `:191`) support mistakes advice, not Plan's alphabet schedule or Difficulty's learning-time estimate. `how to learn hebrew on your own` is already flagged Weak/Partial on M: narrow the promise instead of treating that broad guide as owned. List queries remain conditional on Vocab; W is not a frequency list. Reading comprehension stays with Comprehension, not F/L merely because both mention understanding.
5. **Homepage/Hub/lessons/Nikud/Play — protect format and modifier.** Home owns app discovery; V may explain the verb feature but should not absorb generic app-selection or app-brand queries assigned to Home/Story. H explains print/cursive differences; Guide retains whole-alphabet reference/chart queries, Hub structured progression, and letter lessons their individual teaching outcomes. No broad alphabet reassignment is warranted. Nikud owns pointed reading/vowel-mark instruction; Unpointed owns absent-vowel reading, even where W/R/F/H discuss it. Mahjong/Rush retain playable recognition/quiz tasks. H has no playable handwriting practice, and neither Home nor the alphabet Hub establishes a handwriting curriculum.

There is **no confirmed Google cannibalization**, no evidence here of pages alternating for the same query, and no causal link established to the discovered/not-indexed status. Existing headings and overlapping sections indicate where future targeting could collide; they do not prove a search-performance problem.

## Missing-keyword validation shortlist

Deduplicated against all 309 exact rows, recorded `gsc_queries` aliases, normalized case/spacing/punctuation and known equivalents in the allowed sources. Excluded simple equivalents such as `hebrew shorashim` / `hebrew word roots` (root system/Shoresh), `hebrew binyanim chart` (seven-pattern chart), printed/cursive comparison rewordings, `hebrew learning mistakes`, and the title-length variant of Modern Hebrew word count. Pa'al/Pi'el punctuation variants count as one candidate. “Missing” means absent wording/qualifier worth testing, not proven additional demand or a proven new cluster.

All candidates have **unmeasured volume and KD**. URL codes below resolve to the exact existing routes in the ownership matrix; all are proposals to validate on those routes, not approved assignments or new pages. P1 tests core ownership/clear topic coverage; P2 tests narrower or more conditional outcomes.

| Priority | Proposed exact keyword | Intended URL | Search intent / source support | Why existing v2 does not already cover it |
|---|---|---|---|---|
| P1 | hebrew listening practice | L | Instructional selection across A1–B1; L:60–121. | Only the beginner-qualified phrase exists; test whether broader results fit the existing multi-level guide. |
| P1 | hebrew comprehensible input | L | Explain/select suitably understandable input; L:46. | No method-specific input query exists; beginner practice is broader. |
| P1 | paal vs piel | B | Compare two verb patterns; B:99–112. | Existing beginner Pa'al and Pi'el-example queries do not explicitly cover the comparison task. |
| P1 | how many hebrew words do you need to be fluent | W | Proficiency vocabulary goals; W:108, :128, :219. | Existing rows cover language size and beginner needs, not conversational/advanced goals. Validate claims before later editorial expansion. |
| P1 | alef bet tutor verb directory | V | Navigational/product-feature discovery; V:49, :103–142. | Generic app-brand terms belong to Story; generic conjugation-app intent does not identify this feature. |
| P2 | hebrew listening practice with transcripts | L | Transcript-assisted listening method; L:75, :115, :148. | No transcript qualifier exists. Hold if results require an actual browsable audio/transcript library. |
| P2 | hebrew listening practice for intermediate learners | L | Choose A2/B1 input; L:82, :103. | Only beginner practice exists; different learner stage. Test after the broad L control, not as assumed additive demand. |
| P2 | how to understand fast spoken hebrew | F | Diagnose speech compression and begin coping; F:43, :72, :187. | Existing query asks why speech sounds fast. Test the action-versus-explanation distinction; route to L instead if training/resource intent dominates. |
| P2 | how to read hebrew handwriting | H | Recognition/decoding task; H:177. | Existing query compares forms, not reading them. Current source lacks paired visual examples; hold until format fit and teaching support are established. |
| P2 | how to stay motivated learning hebrew | M | Sustain practice despite lost motivation; M:191, :248. | Existing rows cover mistakes, daily study and broad self-study, not this specific motivation problem. Could remain supporting rather than a distinct cluster. |

R needs **no forced new alias**: its four existing queries already cover explanation, definition, identification and examples. Improve fit for `how to find the root of a hebrew word` before adding generic root synonyms. Similarly, existing B example queries and V's chart query are validation/fit work, not new keyword gaps.

## Controlled DataForSEO expansion recommendation

- **First, review ownership holds:** broad grammar on B, self-study on M, and reference/list queries on V. Preserve existing rows and their provenance; this report proposes decisions without changing the core.
- **Later authorized batch 1:** the five P1 candidates only, US/English, with an agreed spend cap. Measure volume and selected KD; validate intent/page format before approving ownership. Existing near-neighbor phrases can be controls, explicitly labelled existing-core validation, not new candidates. No automatic retries or blanket autocomplete expansion.
- **Batch 2 only after batch 1 review:** the five P2 candidates whose outcomes still appear distinct and supportable. Keep same-intent aliases under one owner; do not sum their volumes or create a URL per variation. Hold resource/visual queries if the current article cannot deliver their expected format.
- Record exact request settings/dates and positive/zero/null/error/unrequested states. Compare later SERP evidence before any merge proposal; use query-by-page GSC evidence separately to assess actual cannibalization. Provider volume/KD alone cannot prove it.

**Review boundary:** only `docs/seo-eight-articles-semantic-audit.md` was created. No technical rerun, paid call, Rank Tracker run, article/code edit, Semantic Core change, commit, push or deployment. Stop for owner review before research execution or implementation.
