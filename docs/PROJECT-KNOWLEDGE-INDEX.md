# HebrewEdu project knowledge index

**Start here for every HebrewEdu task.** This is the authoritative navigation and current-work register; the linked sources retain authority for their own categories. Verified against local source, release records and owner decisions on **2026-10-12**. Earlier deployments were verified live in this session; this documentation pass makes no new live-state claim.

HebrewEdu is an Astro static website for **Learn Hebrew – Read & Speak**, with app discovery, a learning blog, browser games and a Hebrew alphabet course.

- Website: `/Users/kasutaja/Developer/web/hebrewedu-site/`
- SEO research: `/Users/kasutaja/Developer/seo-research/hebrewedu/` — [research entry point](/Users/kasutaja/Developer/seo-research/hebrewedu/README.md)
- Documentation organization: [October 12 inventory](knowledge-inventory-2026-10-12.md) and [structure proposal](knowledge-structure-proposal.md). They are Phase 1 snapshots; this index implements Phase 2A navigation, Phase 2B preservation of original October 10 GSC evidence and Phase 2C clarification of current versus historical publication instructions.

## Current verified state

| Item | Current state | Evidence |
|---|---|---|
| Homepage title | **Hebrew Alphabet App & Reading Practice**, without a brand suffix | [Homepage source](../src/pages/index.astro); release **579ef938** |
| Homepage SEO audit | Completed **October 12, 2026**, before the title update | [Homepage audit](seo-homepage-semantic-core-v2-audit.md); its old-title observation remains historical |
| Course Hub and Aleph | Released in **b7e360c** | [Release note](hebrew-alphabet-release.md), [publication manifest](../src/data/alphabet-course.json) |
| Aleph | **14 active exercises; Q4 True**; 11 study blocks | [Approved normalized model](../src/content/lessons/aleph.json), [presentation rules](../src/lib/lessons/presentation.mjs) |
| Lessons 2–22 | **Unpublished**; Coming Soon, without implemented public lesson routes | [Publication manifest](../src/data/alphabet-course.json), [course gates](../src/lib/alphabet-course.mjs) |
| Semantic Core | **Consolidated 2026-10-14: 352 keyword rows, 75 clusters, 30 indexable pages** in `docs/seo/core/` | [Consolidated core](/Users/kasutaja/Developer/web/hebrewedu-site/docs/seo/README.md) (`keywords.csv`, `pages.csv`, `clusters.csv`, generated `semantic-core.xlsx`); v1/v2/v3 CSVs under `research/` are superseded inputs, not the thing to edit |

## Authority and precedence

| Category | Authority | Boundary |
|---|---|---|
| SEO research and measurements | Research root: dated datasets, original provider responses, requests, methodology and measurement history | Interpretations do not overwrite source observations; preserve date, settings and provider gaps |
| Current website implementation | Astro source, [shared layout](../src/layouts/Layout.astro), [release manifest](../src/data/alphabet-course.json) and Git release commits | Code/manifest control current metadata, routes, indexability and publication |
| Approved learner content | [Normalized Aleph model](../src/content/lessons/aleph.json), [presentation rules](../src/lib/lessons/presentation.mjs), [release decisions](hebrew-alphabet-release.md) | Imported raw content is not automatically approved learner content |
| Original source and QA evidence | Protected private snapshots/import runs and dated QA bundles listed below | Original bytes are authoritative for their acquisition; historical acceptance gates do not override later owner approval |

Keep roles distinct: homepage → **mobile-app discovery/store conversion**; complete guide → **whole-alphabet reference**; course hub → **structured progression**; Play/game pages → **browser practice**. The [keyword map](/Users/kasutaja/Developer/seo-research/hebrewedu/keyword-to-url-map.md) retains v1 roles; v2 adds course/letter assignments. Some map prose uses `.md` source filenames where public URLs are extensionless trailing-slash routes; use Astro routes for actual links, preserving original research fields.

## Find the right source

| Task | Read first | Supporting evidence / usage |
|---|---|---|
| Semantic Core and intent ownership | [Consolidated core README](/Users/kasutaja/Developer/web/hebrewedu-site/docs/seo/README.md), [keywords.csv](/Users/kasutaja/Developer/web/hebrewedu-site/docs/seo/core/keywords.csv), [clusters.csv](/Users/kasutaja/Developer/web/hebrewedu-site/docs/seo/core/clusters.csv), [pages.csv](/Users/kasutaja/Developer/web/hebrewedu-site/docs/seo/core/pages.csv) | v1/v2/v3 research CSVs and the [v2 interpretation](/Users/kasutaja/Developer/seo-research/hebrewedu/semantic-core-v2-research-report.md) are superseded inputs now folded into the core — read them for provenance, edit the core CSVs instead |
| SEO methodology and metrics | [Candidate methodology](/Users/kasutaja/Developer/seo-research/hebrewedu/candidate-methodology.md), [demand analysis](/Users/kasutaja/Developer/seo-research/hebrewedu/demand-analysis.md), [difficulty analysis](/Users/kasutaja/Developer/seo-research/hebrewedu/keyword-difficulty-analysis.md) | [Pilot interpretation](/Users/kasutaja/Developer/seo-research/hebrewedu/serp-interpretation.md), [v2 measurement directory](/Users/kasutaja/Developer/seo-research/hebrewedu/semantic-core-v2-alphabet-research/) |
| Search Console observations | [Homepage audit](seo-homepage-semantic-core-v2-audit.md), [original page baseline](/Users/kasutaja/Developer/seo-research/hebrewedu/search-console/exports/2026-10-10/page-baseline.csv) | [Original three-month export](/Users/kasutaja/Developer/seo-research/hebrewedu/search-console/exports/2026-10-10/gsc-performance-last-3-months.xlsx), [28-day comparison export](/Users/kasutaja/Developer/seo-research/hebrewedu/search-console/exports/2026-10-10/gsc-performance-28-day-comparison.xlsx); [preservation manifest](/Users/kasutaja/Developer/seo-research/hebrewedu/search-console/exports/2026-10-10/manifest.md), [page-indexing export](/Users/kasutaja/Developer/seo-research/hebrewedu/search-console/exports/2026-10-10/gsc-page-indexing.xlsx) and [audit handoff](/Users/kasutaja/Developer/seo-research/hebrewedu/search-console/exports/2026-10-10/SEO_AGENT_HANDOFF.md); filters/limitations below |
| Rank Tracker | [Tracker instructions](/Users/kasutaja/Developer/seo-research/hebrewedu/rank-tracker/README.md), [approved keyword queue](/Users/kasutaja/Developer/seo-research/hebrewedu/rank-tracking-keywords.csv) | [First complete run](/Users/kasutaja/Developer/seo-research/hebrewedu/rank-tracker/reports/337cdd21-2385-43df-aafb-5b086da27385.md), [SQLite history](/Users/kasutaja/Developer/seo-research/hebrewedu/rank-tracker/data/history.sqlite3). Paid execution requires separate authorization; do not rerun for documentation |
| SEO planning and completion | [90-day roadmap](/Users/kasutaja/Developer/seo-research/hebrewedu/seo-roadmap-90-days.md), [content audit](/Users/kasutaja/Developer/seo-research/hebrewedu/content-audit-v1.md), current-work register below | Roadmap remains strategy authority; dated planned tasks may already be complete. Homepage audit verifies the implemented scope |
| Course architecture/publication | [Current release procedure](hebrew-alphabet-release.md), [course library](../src/lib/alphabet-course.mjs), [publication manifest](../src/data/alphabet-course.json) | [Current release checker](../scripts/check-alphabet-release.mjs), [hub checker](../scripts/check-alphabet-course-hub.mjs), [portable publication tests](../tests/alphabet-course-hub.test.mjs). Historical hub/POC architecture pointers below |
| Lesson import/editorial workflow | [Import/recovery README](../scripts/alphabet-course/README.md), [course content audit](hebrew-alphabet-course-content-audit.md), [automatic review register](hebrew-alphabet-course-review-register.md) | These describe the dated 22-source import, not current Aleph holds. [Offline normalizer](../scripts/normalize-lesson-1.mjs) pins accepted Aleph provenance; imports/normalization/recovery can write state and need task authorization |
| Game publishing | [Game Publishing Runbook](GAME_PUBLISHING_RUNBOOK.md) | Website consumes synced web artifacts; game source/build authority lives in the separate playables project |
| Next intended SEO audit | [Hebrew Alphabet Complete Guide source](../src/content/blog/hebrew-alphabet-complete-guide.md), [content audit](/Users/kasutaja/Developer/seo-research/hebrewedu/content-audit-v1.md), v2/map above | Audit `/blog/hebrew-alphabet-complete-guide/` against its reference intent when authorized; do not recreate the semantic core or shift ownership without evidence |

## Current-work register

| Work | Status | Scope / next step |
|---|---|---|
| Homepage SEO improvements | **Completed** | Earlier discovery/positioning work in **bd26f07**; October 12 audit verifies alphabet-first app copy, both store links, resource links and metadata/schema fundamentals. Exact approved title deployed in **579ef938**; no further experiment approved |
| Course Hub and Aleph | **Published** | **b7e360c**; only these two course routes released. Preserve 14 active exercises and Q4 True |
| Knowledge navigation and GSC preservation | **Phases 2A and 2B implemented** | This index and research README; eight October 10 evidence files copied with matching source/destination SHA-256 and a preservation manifest. Archive moves, broader consolidation and deletion remain separate proposed work |
| Current publication instructions | **Phase 2C approved and implemented** | Main README and import workflow point to the current release checker; historical POC checker and reports are reference-only. Scripts, tests, lesson content and dated reports remain unchanged |
| Hebrew Alphabet Complete Guide SEO audit | **Next intended audit; not started** | Read existing research and current page; evaluate reference/chart/pronunciation intent and internal linking before recommending changes |
| Lessons 2–22 publication | **Remaining** | Follow current release gates: source/schema review, editorial/renderer/media readiness, independently approved normalization and explicit manifest/route changes; maximum three new lessons per ISO week. Imported or structurally valid does not mean publishable |
| Semantic core consolidation | **Completed 2026-10-14** | Built from `AUDIT-2026-10-14.md` into `docs/seo/core/` (352 keywords, 75 clusters, 30 pages) + generated `docs/seo/semantic-core.xlsx` via `npm run seo:build`. No paid API calls; missing volume/KD stays empty and is flagged, never invented. Next step (proposed, not started): targeted DataForSEO volume/KD lookups for the flagged gaps — needs owner approval before spending |
| Measurement and durability | **Gaps remain** | Preserve filtered homepage GSC export, observe comparable post-title performance/recrawl, verify selected canonical/index state when available; store-click/install attribution and ongoing comparable rank history are not established. October 10 originals are now preserved with verified hashes; the separate October 12 filtered observation still lacks a matching original export |

Remaining article/game roadmap work is not automatically completed by homepage or course releases. Use each task's existing evidence and authorization.

## Measurement provenance

**Separate October 12 owner-supplied pre-title baseline:** exact homepage page filter `https://hebrewedu.com/`, **Web, last 28 days — 17 clicks, 356 impressions, 4.8% CTR, average position 8.8**. This is observational, not a guarantee of improvement. No matching original filtered export or exact calendar window was located locally. The [preservation manifest](/Users/kasutaja/Developer/seo-research/hebrewedu/search-console/exports/2026-10-10/manifest.md) records this as a separate owner-supplied observation, not as an original export.

The linked October 10 GSC workbooks are **older, aggregate Web/all-country/all-device exports**. Keep their observations separate; independent Queries/Pages/Countries/Devices tabs cannot establish page × query × US/mobile attribution. Three original workbooks and five accompanying audit/provenance files were copied unchanged into private research storage on October 12; all eight source/destination hashes matched the inventory (and the existing methodology manifest where applicable). The [preservation manifest](/Users/kasutaja/Developer/seo-research/hebrewedu/search-console/exports/2026-10-10/manifest.md) records original/preserved paths, hashes, source date and filters, distinguishing exported dates from the prior audit’s inferred comparison windows. Temporary originals remain intact at `/private/tmp/hebrewedu-seo-audit-2026-10-10/`; historical reports retain their original provenance references.

Rank run `337cdd21-2385-43df-aafb-5b086da27385` is the first complete **October 10 US/English/mobile Android, depth-20** baseline. The separate historical depth-10 pilot is not a comparable prior run. Blank, provider-null, not requested, error, numeric zero and absent returned result are different states; preserve them rather than inventing rankings or demand.

## Historical documents and superseded gates

**Obsolete for current publication validation: [scripts/check-lesson-1-artifacts.mjs](../scripts/check-lesson-1-artifacts.mjs).** It checks the old unpublished POC, including Aleph's absence from production, no course sitemap entries or incoming public Aleph links, and a noindex preview. The script and its evidence remain unchanged. The [main README](../README.md) and [import workflow](../scripts/alphabet-course/README.md) now direct current publication validation to [current release documentation](hebrew-alphabet-release.md) and [scripts/check-alphabet-release.mjs](../scripts/check-alphabet-release.mjs).

The current checker reads `dist` (or `COURSE_RELEASE_DIST`) and enforces the Hub/Aleph first release, 14 active exercise keys, Q4 True and no lessons 2–22 routes/links. Its optional baseline comparisons require preserved evidence appropriate to the change under review; the approved homepage title update differs from a pre-title baseline. Browser checks use the release document's explicit `COURSE_PUBLISHED=1` and `LESSON_POC_PUBLISHED=1` modes. A POC-named browser script with published-mode support is distinct from the obsolete POC artifact checker. Checker behavior was verified by reading its implementation in Phase 2C; no build, checker or browser run was performed for this documentation pass.

**All reports in the table below are reference-only for current publication validation.** Their dated commands, unpublished/11-available claims and earlier Q4 False gates remain historical evidence, not current workflow instructions. The release procedure, publication manifest and later owner-approved state control current acceptance.

| Historical source | Retained value | Current precedence |
|---|---|---|
| [Homepage UI audit](homepage-ui-audit.md) | October 2 pre-redesign findings | Current Astro source; old component tree and Android-only claims are historical |
| [Homepage SEO audit](seo-homepage-semantic-core-v2-audit.md) | October 12 pre-title observations, keyword ownership and recommendations | Title task completed with the owner's exact no-suffix string in **579ef938**, not the audit's example title |
| [Hub implementation report](hebrew-alphabet-course-hub.md), [guided POC report](hebrew-alphabet-lesson-1-poc.md) | Architecture/UX and preview QA | [Released-state procedure](hebrew-alphabet-release.md); unpublished/11-available claims are historical |
| [Editorial review](hebrew-alphabet-lesson-1-editorial-review.md), [source-edit checklist](hebrew-alphabet-lesson-1-source-edit-checklist.md), [blocked source-sync review](hebrew-alphabet-lesson-1-source-sync-review.md) | Earlier decisions and candidate-source evidence | Later owner approval/final source supersede holds and Q4 False requirements |
| [Owner override](hebrew-alphabet-lesson-1-owner-override-review.md), [final readiness](hebrew-alphabet-aleph-release-readiness.md) | Q4 True decision and accepted-source QA chronology | Final release also accepts unchanged Blocks 2 and 6; do not reinstate earlier remaining gates or wording substitutions |
| [Course investigation](/Users/kasutaja/Developer/seo-research/hebrewedu/hebrew-alphabet-course-investigation.md), [implementation roadmap](/Users/kasutaja/Developer/seo-research/hebrewedu/hebrew-alphabet-course-implementation-roadmap.md) | Original scope, constraints and remaining course gates | V2 is 309 rows; complete import and Hub/Aleph release supersede planning-only availability claims |
| [Original Rush release](alef-bet-rush-release.md) | Original release/player migration | [Game Publishing Runbook](GAME_PUBLISHING_RUNBOOK.md) governs current updates |

**Preserve Aleph owner decisions:** Q4 stays **True**; all 14 exercises remain active; unchanged Blocks 2 and 6 were accepted. Do not revive the old Q4 False package, excluded questions or declined wording as acceptance requirements. The [release note](hebrew-alphabet-release.md) and normalized provenance identify the accepted source; a dated original-import flag is not a new release blocker.

## Protected evidence and document maintenance

Private evidence stays under website `.local/lesson-snapshots/`, `.local/alphabet-course-imports/v1/`, `.local/source-corrections/`, dated `.local/` QA/release bundles and `artifacts/lesson-1-poc/`. Keep source/provenance pairs, hashes, baselines and frozen before-copies intact. Directory locations are navigation context; this pass did not open or change private snapshots. Never place research/raw imports or internal evidence into `public/` or deployable collections. Approved normalized lesson content is the separate reviewed exception.

Before adding a document, search this index and [inventory](knowledge-inventory-2026-10-12.md) for the existing owner. Add current procedure details to the existing canonical document only when authorized; create a dated report for a distinct investigation/release, linking its source edition, observation date/settings and predecessor/successor. Add one pointer here and, for research, in the research README; do not create a second editable keyword map or copy full datasets/reports into navigation files.

Keep this current-work register updated with verified state and commit evidence. Preserve historical measurements and reports unchanged; link a new observation rather than overwriting an old value. Protected/private and untracked files need retention, not automatic cleanup. The [structure proposal](knowledge-structure-proposal.md) describes further migration work; archive moves, broader consolidation and deletion remain outside Phases 2A–2C.

Deployment follows [the Pages workflow](../.github/workflows/deploy.yml): pushing `main` publishes production. Navigation work does not authorize publication, imports, paid research, tracker execution or lesson release. No commit, push or deployment was performed for Phases 2A–2C.
