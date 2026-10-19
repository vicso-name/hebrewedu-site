# Bet (Lesson 2) — FR editorial review

Prepared 2026-10-19 on branch `feat/fr-backfill`, as part of the FR backfill
(`/add-letter-lesson backfill fr`, Aleph/Beth/Guimel only). No subagents, no
paid API calls, minimal screenshots. Mirrors
`docs/hebrew-alphabet-lesson-2-editorial-review.md`'s structure for the EN
lesson; applies `docs/hebrew-alphabet-editorial-rules.fr.md` alongside the
EN course-wide rules it marks language-neutral.

Raw FR source: `.local/alphabet-course-imports/v1/2026-10-19T13-29-22-681Z-6a7123-fr/raw/lesson-2.raw.json`
(sha256 `12fff26...644a382`). 20 study blocks, 13 exercises — same counts and
block/exercise-type sequence as EN, including the same duplicate בָּא
`WORD_EXAMPLE` at sourceIndex 14.

## 1. Comparison against EN's flagged issues

EN's review (`docs/hebrew-alphabet-lesson-2-editorial-review.md` §1/§2)
flagged five things in the raw EN source: a vague "some letters" claim
(B4), a word-start "always has a dagesh" absolute claim (B8/Q7), a
Kamatz/Patach naming inconsistency between B7 and B16, a word-final "always
[v]" framing (Q9), and an all-True True/False set. Checked each against the
FR raw source at the same `sourceIndex` positions:

| Issue | FR source status | Action |
|---|---|---|
| Vague "some letters" generalization (block 3) | Not present — FR text is Bet-specific ("la lettre ב a deux prononciations"), no generalizing claim | No override needed |
| Word-start absolute claim (block 7) | Not present — FR already reads "porte **souvent** un Dagesh" (hedged) | No override needed |
| Kamatz/Patach naming inconsistency (blocks 13, 15) | Not present — FR uses "Kamats"/"Kamats Gadol" consistently in both | No override needed |
| Word-final "always [v]" (exercise 8, True) | Present in spirit — FR's own exercise 8 doesn't claim "always," but the True/False balance issue (below) still applies | Reworded + flipped to False (see §2) |
| All-True True/False set | Present — FR's four True/False exercises (sourceIndex 1, 3, 6, 8) are all True, same as EN | Exercise 8 reworded + flipped, mirroring EN's own Q9 resolution |

The FR editorial team's own raw copy is independently cleaner than EN's on
four of these five points — not a translation of EN's (corrected) text, a
genuinely separate FR source, per `docs/LESSON_PIPELINE.md`'s warning not to
assume structural/content parity.

## 2. True/False balance (exercise 8, 0-based sourceIndex)

**Problem:** `ONE_SIDED_TRUE_FALSE` — all four True/False exercises (1, 3,
6, 8) are keyed True in the raw FR source.

**Correction applied:** exercise 8 reworded and flipped, mirroring EN's own
Q9 resolution in French:
- content: "En fin de mot, Beit se prononce généralement [b]." (now False)
- tip: "En fin de mot, Beit se prononce presque toujours [v], comme dans
  לֵב [lev]. Dans un texte vocalisé, le Dagesh distingue בּ [b] de ב [v]."

**Confidence:** High — same resolution already owner-approved for EN's
parallel exercise; applied for consistency and to satisfy the course-wide
True/False-balance rule.

## 3. Unintroduced-letter distractor (exercise 12, 0-based)

Same category and same raw position as EN's Bet (`exerciseFlags["12"]`,
sourceIndex 11): choices include Tsadi/Mem, not yet taught. Flagged, not
reworded — matches EN's own treatment (optional refinement, not a blocker).

## 4. New FR-specific issue: English leftover in MATCH_PAIRS (exercise 12,
0-based — the final exercise)

**Problem:** the raw FR `MATCH_PAIRS` exercise's pair keys are literally
`"(א) w/ Patah"`, `"(ב) w/o Dagesh"`, `"(בּ) w/ Dagesh"` — English
abbreviations ("w/", "w/o") carried over unchanged from the EN source data,
displayed verbatim to the reader (`src/lib/lessons/normalize.mjs`'s
`pairs[].left` is the literal card text, not a translatable wrapper).
`contentOverrides.exercises` can only patch `content`/`tip`/`correctAnswer`,
never the `pairs` map, so there is no override path to translate or drop
just the "w/"/"w/o" tokens in place.

**Decision:** held out (`holdOuts.exercises`, sourceIndex 12), same
unfixable-pairs-data pattern EN's own Gimel review already established for
a different reason (vowel-length claim baked into pairs). Applied
automatically — a clear rule application (no English leftovers; no override
path exists), not a wording judgement call.

**Confidence:** High.

## 5. Duplicate block (block 14, 0-based) — unchanged decision

Same as EN: duplicates block 5's בָּא example (same word, transcription,
near-identical translation). FR's own audioUrl here is a plain (non-tokenized)
backblazeb2.com link, unlike EN's tokenized Firebase URL — so the "tokenized
URL" half of EN's rationale doesn't apply here, but the duplicate-content
half (course-wide "no duplicate example blocks" rule, language-neutral) does.
Held out for that reason alone.

## 6. FR-specific checks

- **Letter-name spelling**: SEO-facing fields use "Beth" (not "Bet"/"Beit"),
  per the rules file / `src/i18n/fr-letters.ts`. In-body copy keeps the raw
  source's own "Beit"/"Veit" spelling.
- **FR title pattern**: H1 and `<title>` both read "Beth (ב) : lettre
  hébraïque, son et exemples" (nbsp before `:`, 44 chars).
  `contentOverrides.blocks["0"]` applies it (raw `MAIN_TITLE` was "Beit et
  Veit (בּ/ב) : deux prononciations pour une lettre").
- **Transliteration conventions**: no guttural `kh`/`ch` cases in this
  lesson; not applicable.
- **Typography**: no plain-ASCII-space-before-punctuation or guillemet-
  spacing defects found in the FR raw source for Bet (unlike Aleph/Gimel) —
  the source is already correctly typeset.
- **No English leftovers**: beyond the MATCH_PAIRS issue above (held out),
  none found in the surviving content.

## 7. SEO

`docs/seo/core/clusters.csv`/`keywords.csv` already carry a `planned`
`fr-hebrew-letters-individual-lessons--bet` cluster row and a "beth hébreu"
primary-keyword row targeting
`https://hebrewedu.com/fr/apprendre/alphabet-hebreu/bet/` — no change
needed. `npm run seo:build` passes clean.

## 8. Owner decisions needed

None blocking. For visibility only:

- Exercise 12 (MATCH_PAIRS) held out for an English-leftover pairs defect —
  recommend: confirm the holdout rather than attempting a future renderer-
  level fix (translating `pairs` keys would need a schema/normalize change,
  out of scope here).
- Unintroduced-letter distractor (exercise 12 non-0-based numbering, i.e.
  sourceIndex 11) — recommend: keep, matches EN treatment.

## 9. Double-check results

`HEBREWEDU_LOCAL_COURSE_PREVIEW=1 npm run build` succeeds; normalized JSON
has 19 blocks / 12 exercises (one block + one exercise held out, matching
20−1 / 13−1); no dangling theory-stage heading (stageMap fixed to `theory:
[0, 1]`, matching EN's own Bet stage map exactly, after an initial attempt
at `[0, 1, 2]` failed normalization's dangling-heading check); `lang="he"
dir="rtl"` present on all Hebrew `<bdi>`; canonical and hreflang correct; no
TODO-EDITORIAL; no other letter's name leaks outside legitimate nav links /
the lesson's own word examples (Aleph, Lamed — both part of אֲבָל, a real
word this lesson teaches). `node --test tests/*.test.mjs` (after updating
`tests/alphabet-course-fr.test.mjs`'s stale "nothing FR-implemented yet"
fixtures to account for this backfill), `npm run check:layout`, `npm run
seo:build`, `git diff --check` all pass. Not yet in `dist/sitemap.xml`
(correct — not published).

**Publication status**: not published. `locales.fr.webImplemented` /
`previewAvailable` are `true`; `editorialApproved` / `published` /
`publishedAt` remain `false` / `false` / `null` pending owner sign-off.
