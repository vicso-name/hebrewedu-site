# Gimel (Lesson 3) — Editorial Review

Prepared 2026-10-15 against `src/data/lessons/gimel.json` and the raw
snapshot at `.local/alphabet-course-imports/v1/2026-10-11T12-04-00-552Z-a1dbcc/raw/lesson-3.raw.json`
(sha256 `0aec1f...4112d6`). No subagents used, no paid API calls, no raw
snapshot edits. Corrections below are rule-covered per
`docs/hebrew-alphabet-editorial-rules.md` and are already applied in
`src/data/lessons/gimel.json`.

Block/exercise numbers are 1-based (`B#`/`Q#`), matching raw
`studyMaterials`/`exercises` array positions; `sourceIndex` is `B#-1`/`Q#-1`.

## 1. Corrections applied

| # | original | problem | correction | confidence |
|---|---|---|---|---|
| Q4 (idx 3) | tip: "...it produces the long [ga:] sound, not [gu]." | vowel-length claim (Kamatz Gadol timed as "long") | tip → "...it produces the [ga] sound, not [gu]." | high — applied (rule: vowel length) |
| Q9 (idx 8) | tip: "Kamatz Gadol represents a long [a] sound..." | vowel-length claim | tip → "Kamatz Gadol represents the [a] sound..." | high — applied (rule: vowel length) |
| Q10 (idx 9) | tip: "...Kamatz Gadol, which produces the long [a] sound." | vowel-length claim | tip → "...Kamatz Gadol, which produces the [a] sound." | high — applied (rule: vowel length) |
| Q12 (idx 11, MATCH_PAIRS) | tip + pairs key "Short [a]" vs. "Long [a:]" for Patah/Kamatz Gadol | vowel-length claim baked into the graded answer data (`additionalData.pairs`), which `contentOverrides` cannot patch (only `content`/`tip`/`correctAnswer` are overridable per `docs/LESSON_PIPELINE.md`) | held out (`holdOuts.exercises`, sourceIndex 11) — no in-place fix is possible | high — applied (rule: vowel length; mechanism: holdout, no override path exists) |

No absolute always/never claims, no duplicate `WORD_EXAMPLE` blocks, no
tokenized audio URLs (both `audioUrl`s are plain `backblazeb2.com` links
with no query-string token), and True/False balance is already satisfied
without changes (Q2 True, Q4 False, Q9 True — not all-True).

## 2. Non-blocking flag (not a correction)

Three exercises use Hebrew-letter distractors not yet introduced at this
point in the course (Lamed/Nun/Pe-with-dagesh in Q1; Mem-with-marks in Q8;
Nun/final-Kaf-with-dagesh in Q11) — the same `unintroduced-letters` pattern
flagged (not reworded) for Aleph and Bet. Flagged via `exerciseFlags`
("1", "8", "11") and `editorialIssues`, matching the existing precedent of
leaving beginner-scaffolding refinement as optional follow-up work rather
than rewriting distractor sets here.

## 3. Owner decisions needed

None. Every applicable rule in `docs/hebrew-alphabet-editorial-rules.md`
either already passed (True/False balance, no duplicates, no absolute
claims, no tokenized audio) or had a mechanical fix (override for prose,
holdout where no override path exists) — no new pronunciation claim,
tradition question, or wording judgment call arose in this lesson's
source.

## 4. SEO

Per `docs/seo/core/clusters.csv` row `hebrew-letters-individual-lessons--gimel`
and `keywords.csv`: primary keyword **"gimel hebrew letter"** (volume 260,
KD 2), status `planned`, no conflicting `pages.csv` row for this URL.

- **Title tag:** `Gimel Hebrew Letter (ג): Sound & Words` (38 chars, no
  brand suffix per `CLAUDE.md`).
- **Meta description** (137 chars): `Learn the Hebrew letter Gimel (ג):
  its [g] sound, with example words like גַג (roof) and אַגַב
  (incidentally), plus interactive practice.`
- **H1** (`contentOverrides.blocks["0"]`): `Gimel Hebrew Letter (ג):
  Sound, Words & Practice`.
- At publish: link from `src/content/blog/hebrew-alphabet-complete-guide.md`'s
  Gimel mention to `/learn/hebrew-alphabet/gimel/`, and flip
  `keywords.csv`/`clusters.csv` rows for this cluster from `planned` to
  `published`, then re-run `npm run seo:build`.

## 5. Stage map and copy

`stageMap.theory: [0, 1, 2]` (B1 `MAIN_TITLE`, B2 `SIMPLE_TEXT` general [g]
intro, B3 `SUBTITLE` "Words to Practice"); `stageMap.examples: [3..8]` (the
two `WORD_EXAMPLE`/`BOLD_TEXT` pairs plus the closing `SUBTITLE`/
`SIMPLE_TEXT`). `copy` fields written directly in `gimel.json` (no
`TODO-EDITORIAL` placeholders), mirroring Aleph/Bet's tone.

## 6. Checks run

- `node scripts/normalize-lesson.mjs gimel` — validated 9 study blocks and
  11 exercises (12 minus the Q12 holdout); raw/media fields excluded.
- Full double-check (build, tests, `check:layout`, `seo:build`, HTML
  cross-letter grep) is step 5 of the publishing skill, run separately.
