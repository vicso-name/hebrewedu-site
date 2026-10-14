# HebrewEdu Alphabet Course — Implementation Roadmap

Updated 2026-10-11, Europe/Tallinn. **Planning only: website code remains unchanged.** This roadmap extends the existing Astro site and Semantic Core v1/v2. It creates no pages, redirects, publication, commits, or full export authorization.

Lesson 4 is **Dalet (ד), confirmed by the product owner**. Use source ID 4 and planned slug `dalet`; the owner will correct the API description. Do not add an identity investigation, refetch, or source-description fix as a prerequisite. A later approved full-content import may read Lesson 4 for ordinary content/type validation alongside other lessons.

## Intended architecture

| Page | Learning/search responsibility |
|---|---|
| Existing Alphabet Guide | Complete reference chart, names, letter count, broad sound/final-form questions; retain v1 targets. |
| Proposed `/learn/hebrew-alphabet/` | Outcomes, ordered 22-letter syllabus, prerequisites, access/media facts, actual start/resume navigation. |
| Up to 22 `/learn/hebrew-alphabet/{letter}/` pages | Distinct letter instruction and actually taught sound/forms/niqqud; optional feedback exercises. |
| Existing Nikud guide | Explain the vowel system across letters; link to applied Aleph practice. |
| Existing `/play/` games | Recognition/matching and generic browser-game/quiz intent; optional course review destinations. |
| Existing homepage | Mobile-app product discovery and store conversion. |

The 22 planned identities/routes are recorded in [course-letter-map-v2.json](course-letter-map-v2.json). Aliases and five final forms stay on base-letter pages. No separate Vet, Chaf, Fe, Sin or final-form URLs are planned. Keep stable ASCII slugs and the site's trailing-slash convention.

## Implementation sequence and acceptance

| Stage | Responsibility | Concrete deliverable | Acceptance before advancing |
|---|---|---|---|
| 1. Public-use and editorial decisions | Product owner + Hebrew content reviewer | Confirm permitted web content/media, access policy, pronunciation tradition and ordinary public self-assessment versus confidential grading | Clear decisions for copy, images, audio, keys/tips; Aleph length/silence/English-vowel examples reconciled. Dalet identity already settled. |
| 2. Local Lesson 1 content contract | Future implementation owner | Separate raw schema, normalized public JSON schema, source/slug map and reviewed Aleph snapshot | Source counts 11/14 checked; all five blocks and three exercise types recognized; missing metadata stays unknown. |
| 3. Local unpublished POC | Future frontend owner | Static Aleph teaching page plus small native exercise renderer | Tests below pass; useful HTML available without JavaScript/client API requests; no public deployment or sitemap inclusion. |
| 4. Explicitly authorized content expansion | Product/content owner + importer owner | Full read-only snapshot and type/media/access audit, followed by reviewed normalization | Correct intended letters; per-lesson objectives, unsupported types and media gaps addressed. No silent skipping or automatic publication. |
| 5. Prepare hub and eligible lesson pages | Frontend + content/SEO owners | Reviewed static hub, qualifying lessons, links, self-canonicals, JSON-LD and sitemap candidates | Readable initial HTML; no thin placeholders or broken navigation; no false course/audio/free-access claims; existing site regressions pass. |
| 6. Separately authorized public pilot | Publication owner | Small eligible cohort or reviewed complete course, according to readiness | Explicit launch authorization, deployable artifact verified, rollback snapshot ready. |
| 7. Observe and expand | SEO/content/product owners | Query-to-page GSC review and actual learning/navigation/store-click evidence | Reference/course/game intent separation holds; content and indexing issues resolved before adding pages. |

These are responsibility categories, not assignments to named people or invented staffing commitments. Implementation dates and duration remain unset because source review, access/media policy and launch authorization are not yet established. The current user instruction authorizes research and this plan only.

## Static content pipeline

```text
Read-only API list + approved lesson details
  → staged raw JSON outside deployable/public assets
  → versioned raw validation + explicit ID/letter/slug mapping
  → reviewed public-field allowlist + normalized Unicode/answer mapping
  → approved local JSON and stable media manifest
  → separate Astro lesson collection and static routes
  → optional client practice, local progress and accessible feedback
```

Fetching should be an explicit future synchronization step. Ordinary `astro build` consumes the last reviewed snapshot and makes no implicit 22-detail API request. Validate all required content before an atomic replacement; retain the previous snapshot for rollback. No credentials are needed for the sampled public API. Stop on access changes rather than adding administrator credentials.

Keep the blog collection, Markdown routes, homepage, game-runtime/landing separation, store links and current schema responsibilities intact. Future additions should use a separate lesson collection, `/learn/hebrew-alphabet/` routes and scoped course components/styles. Any later shared-layout robots override, navigation links or sitemap additions should be minimal and tested. None of these changes is made now.

## Lesson 1 proof-of-concept contract

Proposed local route: `/learn/hebrew-alphabet/aleph/`. Proposed H1: “Aleph (א): Patah, Kamatz Gadol and Hataf Patah.” Outcome: recognize Aleph and distinguish the three taught pointed forms in the chosen pronunciation tradition.

Use only the already inspected Lesson 1 material for this POC. Its observed renderers are `MAIN_TITLE`, `SIMPLE_TEXT`, `TEXT_IMAGE`, `BOLD_TEXT`, `SUBTITLE`; exercises are `TRUE_FALSE`, `MULTIPLE_CHOICE_COLUMN`, `MULTIPLE_CHOICE_GRID`. Every type must have an explicit renderer and schema. Preserve array order and source provenance; document editorial corrections separately from raw content.

There is no Lesson 1 audio field. Existing game files provide letter-name recordings, which may be reused after review through a stable course media manifest. They do not prove audio for אַ / אָ / אֲ. Either obtain reviewed permitted pointed-form recordings or describe a visual reading/practice POC accurately. Do not market audio capability from missing source fields.

Required acceptance checks for a future POC:

- Correct and incorrect responses work for each exercise type; true/false strings parse explicitly, including `"false"`, rather than using truthiness. All-zero source `score` values are not treated as a scoring rule.
- NFC normalization handles the observed Hebrew presentation forms and combining marks; niqqud and shin/sin dots remain intact. Map answers to stable option IDs before any shuffle and detect duplicate equivalent choices.
- English copy remains LTR; Hebrew runs have `lang="he"`, RTL direction and directional isolation. A suitable font keeps vowel points visible at 320/375/390-pixel widths and zoom.
- Native forms, legends, labelled choices, keyboard/focus support and announced feedback work. Correctness is not color-only. Static explanations and practice prompts remain useful without JavaScript.
- Image explanations have real Hebrew text/alt equivalents; dimensions/media responses are verified after approved asset use. Audio is user-triggered, labelled and has a text/failure fallback where included.
- Raw exports, secrets and any confidential key/tip material stay out of client/public artifacts. Deliberately public self-assessment can expose grading logic; browser secrecy must never be claimed. Protected assessment requires a separately scoped server component.
- Course context/navigation works without creating links to unbuilt lessons. Local progress is resettable and versioned, with no promised app synchronization or lesson-transfer deep link.
- Existing homepage/blog/game routes and canonicals remain unchanged; the candidate sitemap excludes drafts and `noindex` pages. A local POC is not submitted for indexing or deployed.

## Rollout content and indexing gates

After a later full content audit, a complete curriculum may contain all 22 letter lessons while fewer than 22 qualify for independent indexing. A detail page should have a distinct objective, accurate teaching, useful examples/forms, accessible practice context and meaningful initial HTML. Short teaching material can remain a course section or nonindexable lesson rather than produce a thin page for a numerical URL target.

Indexable guide/hub/lesson pages receive self-canonicals. Include only public, canonical, ready pages in the existing sitemap, with real editorial modification dates. Keep progress/exercise/reveal state local or fragment-based; do not create indexed state permutations. Structured data may describe one `Course`, lesson `LearningResource` entities and real breadcrumbs; 22 modules are not 22 standalone courses for rich-result eligibility.

Link the guide to the course as a learning path; link lessons back to the chart and Nikud reference where helpful; offer games for optional recognition review. Keep ordered lesson anchors and accessible previous/next labels. App CTAs should follow useful learning content, use existing store destinations and accurately explain the app continuation. Do not promise app installation attribution from store-click events.

## SEO priorities and measurement limits

The [v2 research report](semantic-core-v2-research-report.md) records 55 positive volume estimates, 116 provider-null observations, 39 successful SERP checks and four provider errors. Those failures are open research items, not launch blockers for an otherwise useful local POC and not evidence of no demand. No automatic retries are queued.

Keep the guide's broad v1 keywords and game targets. Start technical feasibility with Aleph because its structure is verified. After content import/review, Bet, Kaf and Shin are useful candidates for richer sound/form lessons; acquisition review can also prioritize larger Resh/Shin/Nun identification demand. Preserve learning order independently of SEO review priority. Do not change the `he` slug solely because “Hey” has more measured volume, or sum spelling variants into a traffic forecast.

Public rollout readiness remains conditional on the normal content, rights/access, media, grading, accessibility, indexing and deployment checks. **Dalet identity is closed. Website execution is not authorized in this continuation.**
