# Aleph (Lesson 1) — FR editorial review

Prepared 2026-10-19 on branch `feat/fr-backfill`, as part of the FR backfill
(`/add-letter-lesson backfill fr`, Aleph/Beth/Guimel only). No subagents, no
paid API calls, minimal screenshots. Mirrors
`docs/hebrew-alphabet-lesson-1-editorial-review.md`'s structure for the EN
lesson; applies `docs/hebrew-alphabet-editorial-rules.fr.md` alongside the
EN course-wide rules it marks language-neutral.

Raw FR source: `.local/alphabet-course-imports/v1/2026-10-19T13-29-22-681Z-6a7123-fr/raw/lesson-1.raw.json`
(sha256 `301d702...1782bc`, fetched fresh for this backfill — Aleph has no
pinned/reused FR snapshot the way EN does). 11 study blocks, 14 exercises,
same counts as EN — the FR source mirrors the EN lesson's structure and
block/exercise-type sequence almost exactly (see per-item notes below).

## 1. Flagged blocks and exercises

| sourceIndex | Original (FR) | Problem | Correction | Confidence | Decision |
|---|---|---|---|---|---|
| block 5 | "...comme le « a » dans « sac » : c'est le même son..." | `FR_TYPOGRAPHY` — plain ASCII space before `:` instead of a non-breaking space | nbsp inserted before `:` | High — mechanical, rule-covered | Applied (rule: FR typography) |
| block 10 | "...utilisés avec Alef (א) : Patah..." | `FR_TYPOGRAPHY` — plain space before `:` | nbsp inserted | High | Applied (rule) |
| blocks 3, 8 | "...comme le « a » dans « sac »." | `FR_TYPOGRAPHY` — plain space around `«`/`»` | nbsp inserted on both sides of both guillemets | High | Applied (rule) |
| exercises 2–10 (various `content`/`tip` fields) | same guillemet/`:`/`;`/`!`/`?` spacing pattern | `FR_TYPOGRAPHY` | nbsp inserted; see `contentOverrides.exercises` in `src/data/lessons/fr/aleph.json` for the full list (sourceIndex 2, 3, 4, 6, 7, 8, 9, 10) | High | Applied (rule) |

No vowel-length, absolute-claim, or naming-inconsistency defects found in the
FR source — block 8/9 (the Hataf-Patah passage) already reads "tu n'as pas
besoin de distinguer ce son... par sa durée," equivalent to EN's own
corrected wording, so no `contentOverrides` block correction was needed
there (unlike EN, which had to rewrite its block 8 from an uncorrected
length claim).

## 2. True/False exercises (1, 4, 7, 9, 13 — 1-based)

All five are keyed Vrai, same `ONE_SIDED_TRUE_FALSE`-shaped imbalance EN's
Aleph has. EN's owner decision
(`docs/hebrew-alphabet-lesson-1-owner-override-review.md`) explicitly
retained this (Q4 True kept). Mirrored here, not re-litigated: flagged
(`true-false-balance`), not reworded.

## 3. Unintroduced-letter distractors (exercises 3, 8, 12 — 1-based)

Same category and same raw positions as EN's Aleph (`exerciseFlags` keys
"3", "8", "12" — sourceIndex 2, 7, 11): choice sets include Tsadi/Guimel/Mem
(ex. 3), Pé (ex. 8), and Heth/Hé/Ayin (ex. 12), none taught yet at this point
in the course. Flagged, not reworded — optional beginner-scaffolding
refinement, matching EN's own treatment.

## 4. Provisional media (blocks 3, 5, 7 — 1-based)

Same three `TEXT_IMAGE` blocks as EN (Patah, Kamatz Gadol, Hataf-Patah
illustrations), same "withheld pending approval" status; `illustrations`
equivalents re-authored in French (not translated from EN's English
strings) in `src/data/lessons/fr/aleph.json`.

## 5. FR-specific checks

- **Letter-name spelling**: SEO-facing fields (title, H1, meta description)
  use "Aleph" (not "Alef"), per `docs/hebrew-alphabet-editorial-rules.fr.md`
  / `src/i18n/fr-letters.ts`. In-body copy keeps the raw source's own "Alef"
  spelling, matching the EN/FR app-vs-SEO split the rules document
  describes.
- **FR title pattern**: H1 and `<title>` both read "Aleph (א) : lettre
  hébraïque, son et exemples" (nbsp before `:`, 45 chars, no brand suffix).
  `contentOverrides.blocks["0"]` applies it to the rendered H1 (the raw
  `MAIN_TITLE` was "Alef (א) et les signes vocaliques").
- **Transliteration conventions**: no guttural `kh`/`ch` transcriptions
  appear in this lesson (Aleph takes no guttural digraph); not applicable.
- **No English leftovers**: grepped the normalized JSON and built HTML —
  none found beyond the expected `TRUE_FALSE` option-label literals
  (`"True"`/`"False"`, rendered-option IDs, not displayed text, per the FR
  rules file's own carve-out).

## 6. SEO

`docs/seo/core/clusters.csv`/`keywords.csv` already carry a `planned`
`fr-hebrew-letters-individual-lessons--aleph` cluster row and an "aleph
hébreu" primary-keyword row targeting
`https://hebrewedu.com/fr/apprendre/alphabet-hebreu/aleph/` (added in an
earlier FR-infra pass, before this backfill run) — no change needed; status
stays `planned` until FR actually publishes. `npm run seo:build` passes
clean. No `pages.csv` row yet (mirrors EN's own convention: added only at
publish).

## 7. Owner decisions needed

None blocking. For visibility only:

- True/False imbalance (Q1/4/7/9/13 all True) — recommend: keep, consistent
  with the EN owner decision already on file for this same lesson.
- Unintroduced-letter distractors (Q3/8/12) — recommend: keep, optional
  future scaffolding work, not a publish blocker (matches EN treatment).
- Three provisional illustrations — recommend: keep withheld until media
  rights/accuracy are confirmed, same status as EN's Aleph.

## 8. Double-check results

`HEBREWEDU_LOCAL_COURSE_PREVIEW=1 npm run build` succeeds; normalized JSON
has 11 blocks / 14 exercises (no holdouts); rendered HTML: `lang="he"
dir="rtl"` on every Hebrew `<bdi>`; canonical = `https://hebrewedu.com/fr/apprendre/alphabet-hebreu/aleph/`;
hreflang alternates point at the published EN Aleph lesson; no TODO-EDITORIAL
left; no other letter's name leaks outside legitimate nav links / the
lesson's own Hataf-Patah passage (Het/Hé/Ayin, part of the source's own
guttural-letter list, same as EN) / the Pé word example (already flagged
`unintroduced-letters`). `node --test tests/*.test.mjs`, `npm run
check:layout`, `npm run seo:build`, `git diff --check` all pass. FR page not
yet in `dist/sitemap.xml` (correct — not published).

**Publication status**: not published. `locales.fr.webImplemented` /
`previewAvailable` are `true` (route built and preview-visible);
`editorialApproved` / `published` / `publishedAt` remain `false` / `false` /
`null` pending owner sign-off.
