# Aleph synchronization and release readiness

Reviewed 2026-10-11. Aleph is synchronized with the final owner-approved source. **All 14 questions are active and results score out of 14.** Publication remains disabled in the project. This report supersedes earlier correction gates; Q4 True, unchanged B2 without a glottal-stop addition, and unchanged B6 are accepted owner decisions.

## Source and provenance

An anonymous read-only GET of `https://api.hebrewedu.com/api/lessons/1/?lang=en` returned HTTP 200. Exact response bytes were saved before validation as `.local/lesson-snapshots/lesson-1.20261011T193043064573Z.raw.json` (8,400 bytes). Fetch time: 2026-10-11 22:30:43 Europe/Tallinn / 19:30:43 UTC.

| Record | SHA-256 |
| --- | --- |
| Original `lesson-1.raw.json`, preserved | `0306e249dc168efd7d49e886553f7aa61733cb6ca26307c7cc0a07215b5999a7` |
| Previous candidate `lesson-1.20261011T161534695940Z.raw.json`, preserved | `5755df728c0c8d9b6e900385857c50787e869ad4a1ed19f7153f60d74534ac79` |
| Final accepted source snapshot | `97351799e0a4bc45718cf082486c6584b7acb55bc412aeaea43b81e3cab7bb6a` |
| Updated normalized `src/content/lessons/aleph.json` | `a47eebcba713730570f394299c67c3a59af33732f68c0e96132da967259a844d` |

Compared with the latest previous snapshot, **only B7 content changed**. It now says: “Its shape combines a horizontal line with two vertically arranged dots beside it, as shown in אֲ.” The incorrect left-position sentence is removed. The surrounding source text is retained, including repetition; no silent editorial rewrite was made.

Q4's approved question and explanation are unchanged, and its source key remains `"true"`. B2 and B6 are unchanged. Q11, Q14, B9 and Q3/Q10 tips are unchanged from the previously validated candidate. No declined explanation or optional B6 revision was added.

Strict UTF-8/duplicate-key JSON parsing, the raw/normalized schemas and structural auditing pass. Identity is ID 1, category `alphabet-lc`, order 1. All 11 study blocks and 14 exercises, original exercise IDs, ordering, supported types, choice arrays and answer keys are retained. Each answer matches its actual prompt; offline checks validate 14 correct selections and all 29 incorrect options. Q4 True is correct and False is incorrect.

Required fields are nonempty and valid; original optional image descriptions remain empty and original images remain withheld. Valid NFC normalization preserves Hebrew letters, niqqud, dagesh and sin/shin dots, including Q8's presentation forms. No invalid UTF-8, unpaired surrogates, replacement characters or embedded bidi controls were found. The API and source media were not mutated; original media was not fetched.

`scripts/normalize-lesson-1.mjs` now reads the final timestamped snapshot offline and pins its reviewed SHA-256 and fetch timestamp. It uses strict JSON parsing and writes only the normalized allowlist. The original snapshot path is preserved as historical evidence, not overwritten as a current alias.

## Learner behavior

Q4/Q11/Q14 are enabled. All 14 prompts and explanations now use their accepted source wording. The temporary Q3/Q10 explanation substitutions and B6/B7/B9 presentation holds are removed. Obsolete resolved editorial flags are removed; optional question-design annotations are not publication blockers. Source images still render only the approved Unicode/text equivalents.

The existing available-question denominator resolves to 14. Complete practice yields 14/14, 100%; one correct out of 14 yields 7%, even if other questions are skipped. Results no longer display an empty “Unavailable” message. All three exercise types retain feedback, locked submissions, retry, mistake/unanswered review, reset and stage/selection state preservation.

Theory → Examples → Practice → Results, Rubik Hebrew and the restrained palette are retained. Enlarged-text checks uncovered lesson-header and Results-button overflow at 320 px. Scoped lesson CSS now lets the header reflow and bounds gutters/buttons; Results keeps two statistic columns at normal mobile text and can use one column with enlarged text. No shared homepage/blog/game styling was edited.

## URL and Semantic Core v2 review

The existing local `/Users/kasutaja/Developer/seo-research/hebrewedu/semantic-core-v2.csv` and related alphabet candidates/research were read without modification or new paid research. The Hub retains course-progression intent (“hebrew alphabet course”, “hebrew alphabet course for beginners”). Aleph retains the distinct letter lesson and specific niqqud/practice intent (“aleph hebrew letter”, “aleph with patah”, “aleph with kamatz”, “aleph with hataf patah”). Existing alphabet/nikud reference guides and games retain their existing intents and URLs. No audio capability is claimed.

| Production element | Course Hub | Aleph |
| --- | --- | --- |
| URL | `/learn/hebrew-alphabet/` | `/learn/hebrew-alphabet/aleph/` |
| Title | Hebrew Alphabet Course for Beginners \| HebrewEdu | Aleph Hebrew Letter Lesson \| HebrewEdu |
| Description | Learn the Hebrew alphabet step by step with beginner explanations, examples and interactive practice. Start with Aleph and explore the 22-letter learning path. | Learn the Hebrew letter Aleph (א) with Patah, Kamatz Gadol and Hataf Patah through beginner explanations, examples and 14 interactive practice questions. |
| H1 | Learn the Hebrew Alphabet Step by Step | Exploring Aleph (א) and Hebrew Diacritical Marks |
| Canonical | `https://hebrewedu.com/learn/hebrew-alphabet/` | `https://hebrewedu.com/learn/hebrew-alphabet/aleph/` |

These are production-mode values verified in an isolated build. Current previews remain `noindex, nofollow, noarchive`; Aleph's public title/canonical are gated until publication. Each page has one H1. Hub Start Learning and the sole available curriculum card link to Aleph. The other 21 records show Coming Soon with no lesson links, controls or routes. Desktop/mobile header navigation, active states and internal destinations pass.

## Validation evidence

New evidence is kept separately under `.local/aleph-release-readiness/20261011T193043Z/`; earlier snapshots, reports, correction packages and browser/build records were preserved.

| Check | Result |
| --- | --- |
| `node --test tests/*.test.mjs` | **23/23 pass**: source fidelity, IDs, explicit True/False parsing, grading, Unicode, invalid-data rejection and publication guards. |
| Source validation | **Pass**: 11 blocks / 14 exercises, all IDs/keys retained, 14 correct and 29 incorrect selections. `source-validation.json`. |
| Ordinary production build | **Pass**: 28 Astro pages / 31 HTML files including games. Hub and Aleph absent from routes, navigation and sitemap. |
| Opt-in course preview build | **Pass**: 30 Astro pages / 33 HTML files. Exactly Hub and Aleph under `/learn/`; both excluded from sitemap. |
| Isolated publication fixture | **Pass**: 30 Astro pages / 33 HTML files, production titles/canonicals/robots, exactly two course sitemap URLs. Course/ItemList structured data contains only Aleph. Workspace flags remain unchanged. |
| Aleph browser suites | **Pass** in preview and isolated publication mode: 14 active questions, each incorrect answer/retry/correct answer, Q4 False rejected/True accepted, locking, stage and draft/submitted state preservation, mistake/unanswered review, reset, 14-question results. |
| Accessibility/layout | **Pass**: Chromium 320/375/390/1440, all four lesson stages, 200% text at all four widths, 200% zoom-equivalent reflow, keyboard Tab/Space/arrows/Enter, focus/live regions, no-JS fallback, RTL isolation and readable pointed Hebrew. Mobile WebKit passes at 390. |
| Hub regression | **Pass** in Chromium and WebKit: 22 ordered cards, one linked lesson, 21 Coming Soon, Rubik font loading, all requested widths and 200% text, keyboard/mobile/tablet menu and desktop reset, working internal/resource links. A test now waits for the resize event before asserting menu reset. |
| Existing pages/assets | **Pass**: 98 current production HTML/public artifacts byte-identical to the task baseline; original page metadata/main content and game/public assets also pass the retained pre-Hub regression baseline. Only generic lesson JS/CSS bundles change. |
| Build exposure | **Pass**: no raw snapshots/API objects/credentials or unapproved lesson media in draft, preview or isolated release assets; no lessons 2–22 routes/links. Private snapshot URLs return 404 in compiled browser tests. |

Evidence includes `unit-tests.log`, build logs, `artifact-validation.json`, `build-and-metadata-validation.json`, `source-validation.json`, `lesson-browser/validation.json`, `hub-browser/validation.json`, `release-fixture-browser/validation.json`, screenshots, before hashes and git status records. Preview output is `/private/tmp/hebrewedu-aleph-final-preview-20261011T193043Z`; the simulated release project is `/private/tmp/hebrewedu-aleph-release-fixture-20261011T193043Z`. Neither is deployed.

## Exact future publication changes

No production publication switch was changed in the project. The isolated fixture proves the existing gates work. For a separately authorized release, edit only these fields in `src/data/alphabet-course.json`:

| Record / field | Current | Required at release |
| --- | --- | --- |
| `hub.editorialApproved` | false | true |
| `hub.published` | false | true |
| `hub.publishedAt` | null | actual release date, `YYYY-MM-DD` |
| `lessons[0].editorialApproved` | false | true |
| `lessons[0].published` | false | true |
| `lessons[0].publishedAt` | null | actual release date, `YYYY-MM-DD` |

Use the approved actual release date for both pages (the fixture uses `2026-10-11`). Keep `lessons[1..21].published` false and their `publishedAt` null. Their route implementation and preview flags remain false. SourceImported/webImplemented/previewAvailable are already true for Aleph; no additional flag is needed. The Hub must be released with the approved Aleph route, and only one new lesson counts against the three-per-week rule.

Then run an ordinary `npm run build` without preview flags. Existing gates emit both pages, index/follow metadata, the Aleph canonical, the header entry, and exactly their two sitemap entries. No route, navigation or sitemap code changes are required. Deployment remains a separate action.

**No remaining technical release blocker was found.** Outstanding work is the explicit release-manifest change and deployment authorization. Optional B6 wording, True/False balance and the declined Theory addition are not blockers. Unapproved source images continue to be withheld.

## Files changed and git state

Application files changed by this task:

- `src/content/lessons/aleph.json`
- `src/lib/lessons/normalize.mjs`
- `src/lib/lessons/presentation.mjs`
- `src/lib/lessons/practice-client.ts`
- `src/pages/learn/hebrew-alphabet/[lesson].astro`
- `src/styles/lesson-poc.css`

Normalization/validation files changed:

- `scripts/normalize-lesson-1.mjs`
- `scripts/check-lesson-1-browser.mjs`
- `scripts/check-lesson-1-artifacts.mjs`
- `scripts/check-alphabet-course-hub.mjs`
- `tests/lesson-1.test.mjs`

Added: this report, the timestamped private raw snapshot and the separate ignored evidence directory. Other lesson content, the publication manifest, shared components/layouts, homepage/blog/game source, Semantic Core v2 and prior review evidence are unchanged.

The workspace already had six tracked modifications (`.gitignore`, `astro.config.mjs`, `src/components/Nav.astro`, `src/content.config.ts`, `src/layouts/Layout.astro`, `src/pages/sitemap.xml.ts`) and untracked course/lesson work before this task. Those existing tracked modifications were not edited here. Most task files are inside those already-untracked directories, so `git diff --stat` alone does not show this task's scope. `before-hashes.json`, `changed-files.json`, `git-status-before.txt` and `git-status-after.txt` distinguish the task's edits from pre-existing work.

No deployment, source API write, other lesson import, paid SEO request, commit or push was performed. Stop here for release review.
