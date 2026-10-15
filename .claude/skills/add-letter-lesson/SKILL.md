---
name: add-letter-lesson
description: Add and publish the next Hebrew alphabet letter lesson (or a named one, e.g. "add Gimel") end to end - normalize, holdouts, editorial review against the course rules, SEO, double check, publish after one owner confirmation. Use when the user says "add the next letter", "добавляем следующую букву", or names a letter to add.
---

# Add a letter lesson

Read first: docs/LESSON_PIPELINE.md, docs/hebrew-alphabet-editorial-rules.md,
CLAUDE.md, docs/LAYOUT.md, docs/BLOCKS.md, docs/seo/README.md.

Hard rules: no subagents; no paid API; no screenshots unless a check cannot
be verified otherwise; never edit raw snapshots (use contentOverrides in the
letter data file); never add check-layout allowlist entries; no brand suffix
in titles; other published lessons must not change.

## 1. Pick the letter
- Use the letter the user named; otherwise the lowest `order` in
  src/data/alphabet-course.json with published: false.
- Weekly limit: if publishing today would exceed 3 lessons in the ISO week,
  prepare everything, stop before publishing and name the first allowed date.
- Stop if the working tree is dirty. From an up-to-date main create
  branch feat/lesson-<slug>.

## 2. Build
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

## 3. Editorial review
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

## 4. SEO
- From docs/seo/core: primary keyword; title
  "<Letter> Hebrew Letter (<glyph>): <topic>" (<= 60 chars, no brand);
  meta description (<= 155 chars); H1; link from the alphabet guide
  (src/content/blog/hebrew-alphabet-complete-guide.md)'s mention of this
  letter (added at publish, see Bet's "Practice Bet/Vet" link). Check
  conflicts.
- Register the lesson in docs/seo/core: pages.csv row (url, primary keyword,
  status) and keyword mapping in keywords.csv; run npm run seo:build - must
  pass validation.

## 5. Double check (mandatory, as a reviewer, not as the author)
Build with HEBREWEDU_LOCAL_COURSE_PREVIEW=1 npm run build and re-read the
lesson JSON and rendered HTML:
- all applied corrections present; no TODO-EDITORIAL left; no vowel-length
  claims; no absolute always/never without the exception; >= 1 False in
  true/false; no duplicate examples; no source audio URLs;
- Hebrew has lang="he" dir="rtl"; nikud of unchanged items equals the raw
  source;
- MATCH_PAIRS order is a derangement, not a rotation; exercise count = data
  minus holdouts;
- prev/next links, title, H1, meta as decided; other lessons' content JSON
  unchanged;
- Rendered HTML of the new lesson contains no other letter's name or
  letter-specific phrases (grep for all other letter names).
- No heading may end a step without content; section headings must sit in
  the same step as their content.
- Built HTML: canonical = final URL; title/meta lengths OK; page present in
  sitemap; prev/next letter links resolve.
- Run: node --test tests/*.test.mjs, npm run check:layout, npm run build,
  npm run seo:build, git diff --check. Fix and re-run until clean.

## 6. Ask once
Report in <= 15 lines: letter, corrections applied, holdouts, owner decisions
needed (with recommendations), title/meta, check results. Ask:
"Publish <Letter>? (yes / changes)" together with any owner decisions.

## 7. Publish (only after the owner says yes)
- Apply owner decisions; add newly approved general decisions to
  hebrew-alphabet-editorial-rules.md.
- Flip editorialApproved, published, publishedAt (today); add the guide
  link; update keywords.csv/clusters.csv/pages.csv; npm run seo:build.
- Re-run tests and build. Commit on the branch, merge into main, push.
- Final message: commit hash, URL, and two reminders for the owner: check
  that GitHub Actions is green; GSC -> URL Inspection -> Request indexing
  for <url>.

## Note: raw snapshots
Raw lesson snapshots live in .local/ (not in git). If the snapshot for the
letter is missing (new machine, cleaned folder), run
node scripts/import-alphabet-course.mjs --fetch first, then --audit, as
described in docs/LESSON_PIPELINE.md, before step 2.
