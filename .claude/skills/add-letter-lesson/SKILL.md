---
name: add-letter-lesson
description: Add and publish the next Hebrew alphabet letter lesson (or a named one, e.g. "add Gimel") end to end, in EN and FR together by default - normalize, holdouts, editorial review against the course rules (EN + FR), SEO, double check, publish after one owner confirmation. "... en" or "... fr" restricts to one locale; "backfill fr" prepares FR for every letter already published in EN. Use when the user says "add the next letter", "добавляем следующую букву", or names a letter to add.
---

# Add a letter lesson

Read first: docs/LESSON_PIPELINE.md, docs/hebrew-alphabet-editorial-rules.md,
docs/hebrew-alphabet-editorial-rules.fr.md, docs/I18N_AUDIT.md §7, CLAUDE.md,
docs/LAYOUT.md, docs/BLOCKS.md, docs/seo/README.md.

Hard rules: no subagents; no paid API; no screenshots unless a check cannot
be verified otherwise; never edit raw snapshots (use contentOverrides in the
letter data file); never add check-layout allowlist entries; no brand suffix
in titles; other published lessons (either locale) must not change; **FR may
never get ahead of EN** — an FR lesson can only publish once its EN lesson
is published (enforced by `validatePublicationManifest` in
`src/lib/alphabet-course.mjs` — it throws if violated).

## 0. Parse the invocation

- No locale named → **both locales**: prepare/publish EN and FR together for
  the target letter (EN first, since FR can't get ahead of it).
- `... en` or `... fr` → that locale only.
- `backfill fr` (or `backfill en`, symmetrically) → see "Backfill mode"
  below instead of steps 1–7.
- Weekly limit bookkeeping counts **letters**, not locale-flips: preparing
  and publishing one letter in both EN and FR today uses one slot in EN's
  5/week cap and one slot in FR's 5/week cap (the two caps are independent,
  `validateWeeklyReleaseLimit` is called once per locale) — it is not "2
  lessons" against either cap.

## 1. Pick the letter

- Use the letter the user named; otherwise the lowest `order` in
  src/data/alphabet-course.json with `published: false` (EN gates which
  letter is "next" even in an FR-only run, since FR can't get ahead of EN).
- Weekly limit: check each locale being built against its own counter in
  src/data/alphabet-course.json (EN: top-level `publishedAt`; FR:
  `locales.fr.publishedAt`, excluding any `locales.fr.backfill: true`
  entries). If publishing today would exceed 5 in either locale's ISO week,
  prepare everything for that locale, stop before publishing it, and name
  the first allowed date. The other locale may still publish on schedule.
- Stop if the working tree is dirty. From an up-to-date main create branch
  feat/lesson-<slug> (one branch covers both locales when doing both).

## 2. Build

### EN
- node scripts/normalize-lesson.mjs <slug> --dry-run. The raw snapshot is
  already fetched for all 22 letters (owner-letter-map.v2.json,
  .local/alphabet-course-imports/) — no import step needed.
- Unsupported block/exercise types: hold out with a reason in
  src/data/lessons/<slug>.json. Do not build new renderers here; if the type
  appears in 3+ unpublished lessons, report it as a recommended separate task.
- Create the data file (stage map with theory first, copy fields, pinned
  snapshot + SHA), then node scripts/normalize-lesson.mjs <slug> (write mode)
  to produce src/content/lessons/<slug>.json.
- Flip that letter's webImplemented and previewAvailable to true in
  src/data/alphabet-course.json so the route renders under preview — this is
  required for step 5's build and is not a publish (published/publishedAt/
  editorialApproved stay false/null until step 7).

### FR
- If no FR raw snapshot run exists yet (`.local/alphabet-course-imports/v1/*-fr/`),
  run `node scripts/import-alphabet-course.mjs --fetch --lang fr` once (fetches
  all 22 FR details fresh — FR has no pinned/reused Aleph snapshot like EN
  does); it never touches the EN run directories.
- node scripts/normalize-lesson.mjs <slug> --locale fr --dry-run. Holdouts,
  stage map and overrides are derived **independently from the FR raw
  snapshot's own `sourceIndex` values** — never copy EN's
  `src/data/lessons/<slug>.json` verbatim, even when the structure looks
  similar; the FR source lesson can have a different block/exercise count
  or order.
- Create src/data/lessons/fr/<slug>.json (own `copy`, re-authored in French,
  not machine-translated from EN — same editorial bar as EN's own copy).
  Then node scripts/normalize-lesson.mjs <slug> --locale fr (write mode) to
  produce src/content/lessons/fr/<slug>.json.
- Flip that letter's `locales.fr.webImplemented` and
  `locales.fr.previewAvailable` to true in src/data/alphabet-course.json.

## 3. Editorial review

### EN
- Write docs/hebrew-alphabet-lesson-<N>-editorial-review.md:
  original | problem | correction | confidence | decision.
- Apply automatically every correction covered by a rule in
  hebrew-alphabet-editorial-rules.md, and clear factual fixes with high
  confidence (wrong mark name, contradiction inside the lesson, missing image
  description, one-sided true/false, duplicate example). Mark each
  "applied (rule …)".
- Everything else (new pronunciation claims, tradition questions, wording
  judgement): do not guess. List as "owner decisions needed", each with a
  recommended answer.

### FR
- Write docs/hebrew-alphabet-lesson-<N>-fr-editorial-review.md, same
  original | problem | correction | confidence | decision shape.
- Apply `docs/hebrew-alphabet-editorial-rules.fr.md`: the EN rules it marks
  language-neutral, plus its FR-specific rules (register — "tu," never
  "vous," including in `src/i18n/fr.ts` and FR home/hub copy; letter-name
  spelling, with both spellings on the first mention when the app and SEO
  spellings differ; vowel-sign names following the app spelling, with the
  hub's one "niqqoud (nikoud)" cross-reference; no em dash in meta;
  "Conclusions" → "À retenir"; vowel-length statements mirroring whatever
  the approved EN `contentOverrides` did for the same `sourceIndex`;
  transliteration conventions; French typography/nbsp; no English
  leftovers). Do not apply the EN file's English-wording-specific rules
  (e.g. its literal title-pattern string) to FR content.
- Owner decisions needed list follows the same bar as EN's.

## 4. SEO

### EN
- From docs/seo/core: primary keyword; title
  "<Letter> Hebrew Letter (<glyph>): <topic>" (<= 60 chars, no brand);
  meta description (<= 155 chars); H1; link from the alphabet guide
  (src/content/blog/hebrew-alphabet-complete-guide.md)'s mention of this
  letter (added at publish, see Bet's "Practice Bet/Vet" link). Check
  conflicts.
- Register the lesson in docs/seo/core: pages.csv row (url, primary keyword,
  status) and keyword mapping in keywords.csv; run npm run seo:build - must
  pass validation.

### FR
- Title pattern "<Lettre> (<glyph>) : lettre hébraïque, son et exemples"
  (<= 60 chars, no brand), using the FR search spelling from
  `src/i18n/fr-letters.ts` / `docs/seo/research/fr/FR_RESEARCH.md`'s
  per-letter table — never the EN spelling, never the app's in-body
  spelling if they differ (see docs/hebrew-alphabet-editorial-rules.fr.md).
- Register in docs/seo/core with `locale=fr`: a `fr-hebrew-letters-individual-lessons--<slug>`
  cluster row (status `planned` until FR publish, then `published`) and its
  keyword row(s) in keywords.csv, `target_url`
  `https://hebrewedu.com/fr/apprendre/alphabet-hebreu/<slug>/`; add a pages.csv
  row only once the FR lesson is actually published (mirrors EN's own
  convention: pages.csv only carries published pages). Run npm run seo:build.

## 5. Double check (mandatory, as a reviewer, not as the author)

Build with HEBREWEDU_LOCAL_COURSE_PREVIEW=1 npm run build and re-read each
built locale's lesson JSON and rendered HTML:

- all applied corrections present; no TODO-EDITORIAL left; no vowel-length
  claims; no absolute always/never without the exception; >= 1 False in
  true/false; no duplicate examples; no source audio URLs;
- Hebrew has lang="he" dir="rtl"; nikud of unchanged items equals the raw
  source;
- MATCH_PAIRS order is a derangement, not a rotation; exercise count = data
  minus holdouts;
- prev/next links, title, H1, meta as decided; other lessons' content JSON
  unchanged (check both src/content/lessons/ and src/content/lessons/fr/);
- Rendered HTML of the new lesson contains no other letter's name or
  letter-specific phrases — grep EN output against the EN letter names, and
  FR output against `src/i18n/fr-letters.ts`'s French names (not the EN
  list — "Pe" is a substring of nothing French-specific, but "Hé"/"Noun"/
  etc. are the names that matter there).
- No heading may end a step without content; section headings must sit in
  the same step as their content.
- Built HTML: canonical = final URL; title/meta lengths OK; page present in
  sitemap (`src/lib/alphabet-course.mjs`'s `courseSitemapEntries` for the
  locale(s) actually published); prev/next letter links resolve within that
  locale's published lessons only; a lesson's hreflang/lang-switch points at
  its counterpart only when that counterpart is itself published.
- If this run touched EN: build dist and diff every other EN lesson/hub
  page against main — must be byte-identical. FR-only runs skip this (EN
  routes/content are untouched by construction when no EN file changes).
- Run: node --test tests/*.test.mjs, npm run check:layout, npm run build,
  npm run seo:build, git diff --check. Fix and re-run until clean.

## 6. Ask once

Report in <= 20 lines (per locale touched): letter, corrections applied,
holdouts, owner decisions needed (with recommendations), title/meta, check
results. Ask: "Publish <Letter> (EN / FR / both)? (yes / changes)" together
with any owner decisions. If one locale is weekly-limited, say so and ask
only about the other.

## 7. Publish (only after the owner says yes)

- Apply owner decisions; add newly approved general decisions to
  hebrew-alphabet-editorial-rules.md (EN) or
  hebrew-alphabet-editorial-rules.fr.md (FR-specific ones).
- EN: flip editorialApproved, published, publishedAt (today); add the guide
  link; update keywords.csv/clusters.csv/pages.csv; npm run seo:build.
- FR (only once EN is published, same run or already published earlier):
  flip `locales.fr.editorialApproved`, `locales.fr.published`,
  `locales.fr.publishedAt` (today); set `locales.fr.backfill` explicitly
  (`false` for an ordinary same-cadence publish); update
  keywords.csv/clusters.csv/pages.csv with `locale=fr`; npm run seo:build.
- Re-run tests and build. Commit on the branch, merge into main, push.
- Final message: commit hash, URL(s) for each locale published, and two
  reminders for the owner: check that GitHub Actions is green; GSC -> URL
  Inspection -> Request indexing for each published URL.

## Backfill mode: "/add-letter-lesson backfill fr"

Prepares FR for every letter where EN is `published: true` but
`locales.fr.published` is not yet true — in course `order`, one at a time,
same steps 2–5 as above (FR side only; EN is already published and must not
change). Differences from the normal flow:

- Not subject to steps 1's per-locale weekly limit — mark
  `locales.fr.backfill: true` when flipping `locales.fr.published` in step 7
  (`validateWeeklyReleaseLimit` for FR explicitly excludes
  `backfill: true` entries, see src/lib/alphabet-course.mjs).
- Step 6's report covers the whole batch (all letters prepared this run),
  then one owner confirmation publishes all of them together.
- Still never gets ahead of EN by definition (only touches letters already
  EN-published) and still requires `locales.fr.webImplemented`/
  `editorialApproved` true before `published` — no shortcut on the
  per-letter editorial bar just because it's a backfill.

## Note: raw snapshots

Raw lesson snapshots live in .local/ (not in git), one import run per
locale (EN run directories are unsuffixed; FR run directories end in
`-fr` — see scripts/import-alphabet-course.mjs). If the snapshot for the
letter/locale is missing (new machine, cleaned folder), run
node scripts/import-alphabet-course.mjs --fetch [--lang fr] first, then
--audit, as described in docs/LESSON_PIPELINE.md, before step 2.
