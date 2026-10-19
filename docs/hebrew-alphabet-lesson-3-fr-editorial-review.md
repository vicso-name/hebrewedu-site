# Gimel (Lesson 3) — FR editorial review

Prepared 2026-10-19 on branch `feat/fr-backfill`, as part of the FR backfill
(`/add-letter-lesson backfill fr`, Aleph/Beth/Guimel only). No subagents, no
paid API calls, minimal screenshots. Mirrors
`docs/hebrew-alphabet-lesson-3-editorial-review.md`'s structure if one
exists, and `docs/hebrew-alphabet-lesson-1/2-editorial-review.md`'s general
shape otherwise; applies `docs/hebrew-alphabet-editorial-rules.fr.md`
alongside the EN course-wide rules it marks language-neutral.

Raw FR source: `.local/alphabet-course-imports/v1/2026-10-19T13-29-22-681Z-6a7123-fr/raw/lesson-3.raw.json`
(sha256 `c978416...37fa75ea`). 9 study blocks, 12 exercises — same block
count and type sequence as EN; one exercise fewer surviving than EN's 9
exercises + 1 holdout (both lessons end with the same 12-exercise raw
count, see §2).

## 1. Vowel-length claims (exercises 3, 8, 9 — 0-based)

EN's Gimel review flagged a vowel-length/naming issue in its raw exercises
at the same positions and applied `contentOverrides.exercises` corrections
(`"it produces [ga], not [gu]"`, etc. — see `src/data/lessons/gimel.json`).

Checked the FR raw source at sourceIndex 3, 8, 9: all three already read
correctly and consistently —
- ex 3 (True/False, answer False): "...produit-il le son [gu] ?" / "Faux.
  Le Kamats Gadol représente [a] ici. Avec Guimel (גָ), il donne [ga]."
- ex 8 (True/False, answer True): "...produit-il le son [ga] ?" / "...il
  donne bien [ga]."
- ex 9 (choice): "...son vocalique...גָ...Kamats Gadol...représente [a]
  ici."

No vowel-length or naming defect found — no `contentOverrides` correction
needed for these three (unlike EN, whose raw source needed the tip
rewording). The FR source already independently applies the course's "all
pronounced [a] in Modern Hebrew" rule.

## 2. New FR-specific issue: typography defect in MATCH_PAIRS, no override
path (exercise 11, 0-based — the final exercise)

**Problem:** the raw FR `MATCH_PAIRS` pairs values are:
```
"Patah": "Produit [a] ; trait horizontal"
"Segol": "Produit [e]"
"Kamatz Gadol": "Produit [a] ; forme de petit « T »"
```
Two of the three use a plain ASCII space before `;` and around the `«`/`»`
guillemets (`docs/hebrew-alphabet-editorial-rules.fr.md`'s French-typography
rule — not a stylistic choice). `contentOverrides.exercises` can only patch
`content`/`tip`/`correctAnswer`, never `pairs`, so there is no override path
to insert the missing non-breaking spaces in place.

**Note, importantly:** unlike EN's own Gimel MATCH_PAIRS (held out for a
*different* reason — a "Short [a]"/"Long [a:]" vowel-length claim baked into
its pairs), the FR raw source's pairs data has **no vowel-length claim** at
all (both Patah and Kamats Gadol read "Produit [a]"). Had the typography
been clean, this exercise would not have needed a holdout — the FR source
independently avoids the specific defect EN's version has.

**Decision:** held out anyway, for the unrelated typography defect
(`holdOuts.exercises`, sourceIndex 11), following the same "no override path
for pairs data" precedent EN/Bet's own holdouts establish. This is a
judgement call flagged for owner visibility (§4) rather than an open-and-
shut rule application: holding out an entire exercise for two missing
non-breaking spaces is a stricter bar than most of this lesson's other,
more clearly meaning-affecting holdouts.

**Confidence:** Medium-high on the typography finding itself (mechanical);
the holdout-vs-keep call is the part worth a second look.

## 3. Unintroduced-letter distractors (exercises 1, 8, 11 — 1-based; sourceIndex
0, 7, 10)

Same category and same raw positions as EN's Gimel (`exerciseFlags["1"]`,
`["8"]`, `["11"]`): choice sets include Lamed/Noun/Pé (ex. 1), Mem (ex. 8),
and Noun/Kaf (ex. 11), none taught yet. Flagged, not reworded — matches
EN's treatment.

## 4. Owner decisions needed

- **MATCH_PAIRS holdout for a typography-only defect (§2)** — recommend:
  keep the holdout (consistency with the "pairs data has no correction
  path" rule already applied to Bet's and EN-Gimel's own MATCH_PAIRS), but
  this is the one call in this batch an owner might reasonably reverse —
  losing a full practice exercise over two missing nbsp characters is a
  judgement call, not a forced correctness issue. If the owner would rather
  keep the exercise with the minor typography left uncorrected, say so and
  it can be un-held-out.

Nothing else blocking.

## 5. FR-specific checks

- **Letter-name spelling**: SEO-facing fields use "Guimel" (not "Gimel"),
  per the rules file / `src/i18n/fr-letters.ts`. In-body copy keeps the raw
  source's own "Guimel" spelling (already matches, no app-vs-SEO split
  needed for this letter).
- **FR title pattern**: H1 and `<title>` both read "Guimel (ג) : lettre
  hébraïque, son et exemples" (nbsp before `:`, 46 chars).
  `contentOverrides.blocks["0"]` applies it (raw `MAIN_TITLE` was "La lettre
  Guimel (ג) et de nouveaux mots").
- **Transliteration conventions**: no guttural `kh`/`ch` cases in this
  lesson; not applicable.
- **Typography**: three blocks (1, 4, 6 — 0-based) and six exercises (1, 4,
  5, 9, 10, 11 — 0-based `tip`/`content`) had the same plain-space-before-
  guillemet/punctuation defect as Aleph; corrected via `contentOverrides`.
- **No English leftovers**: none found in the surviving content.

## 6. SEO

`docs/seo/core/clusters.csv`/`keywords.csv` already carry a `planned`
`fr-hebrew-letters-individual-lessons--gimel` cluster row and a "gimel
hébreu" primary-keyword row targeting
`https://hebrewedu.com/fr/apprendre/alphabet-hebreu/gimel/` — no change
needed. `npm run seo:build` passes clean.

## 7. Double-check results

`HEBREWEDU_LOCAL_COURSE_PREVIEW=1 npm run build` succeeds; normalized JSON
has 9 blocks / 11 exercises (one exercise held out, matching 12−1); `lang=
"he" dir="rtl"` present on all Hebrew `<bdi>`; canonical and hreflang
correct; no TODO-EDITORIAL; no other letter's name leaks outside legitimate
nav links / the lesson's own word examples (Aleph, Beit — both part of
אַגַּב, a real word this lesson teaches). `node --test tests/*.test.mjs`,
`npm run check:layout`, `npm run seo:build`, `git diff --check` all pass.
Not yet in `dist/sitemap.xml` (correct — not published).

**Publication status**: not published. `locales.fr.webImplemented` /
`previewAvailable` are `true`; `editorialApproved` / `published` /
`publishedAt` remain `false` / `false` / `null` pending owner sign-off.
