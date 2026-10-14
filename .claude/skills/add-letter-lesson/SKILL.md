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
- node scripts/normalize-lesson.mjs <slug> --dry-run.
- Unsupported block/exercise types: hold out with a reason in
  src/data/lessons/<slug>.json. Do not build new renderers here; if the type
  appears in 3+ unpublished lessons, report it as a recommended separate task.
- Create the data file (stage map with theory first, copy fields, pinned
  snapshot + SHA), then normalize. Preview only until step 7.

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
  meta description (<= 155 chars); H1; link from the alphabet guide's
  mention of this letter (added at publish). Check conflicts.

## 5. Double check (mandatory, as a reviewer, not as the author)
Build with HEBREWEDU_LOCAL_COURSE_PREVIEW=1 and re-read the lesson JSON and
rendered HTML:
- all applied corrections present; no TODO-EDITORIAL left; no vowel-length
  claims; no absolute always/never without the exception; >= 1 False in
  true/false; no duplicate examples; no source audio URLs;
- Hebrew has lang="he" dir="rtl"; nikud of unchanged items equals the raw
  source;
- MATCH_PAIRS order is a derangement, not a rotation; exercise count = data
  minus holdouts;
- prev/next links, title, H1, meta as decided; other lessons' content JSON
  unchanged.
- Run: tests, npm run check:layout, npm run build, npm run seo:build,
  git diff --check. Fix and re-run until clean.

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
  that GitHub Actions is green; request indexing in Search Console.
