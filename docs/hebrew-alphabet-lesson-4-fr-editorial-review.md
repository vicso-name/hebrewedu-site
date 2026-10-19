# Daleth (lesson 4) — FR editorial review

Reviewed against the pinned FR raw snapshot
`.local/alphabet-course-imports/v1/2026-10-19T14-27-18-905Z-bdf614-fr/raw/lesson-4.raw.json`,
SHA-256 `e8aa2ff8c44818719a900c66d25b1dacf7f07d41bd229d8aa46723fa41cab8d1`.
Checked against `docs/hebrew-alphabet-editorial-rules.fr.md` and the
language-neutral EN rules it carries over. Derived independently from this
FR source's own `sourceIndex` values (not copied from `dalet.json`), though
the structure turns out to match the EN raw source block-for-block.

| # | Original | Problem | Correction | Confidence | Decision |
| - | -------- | ------- | ---------- | ---------- | -------- |
| 1 | Blocks 1, 5, 7 (`signifie « porte »`, `« poisson »`, `« il s'est perdu » / « il a disparu »`; also `: l'ensemble se lit`, `[v] ; avec`, `syllabes : [a-vad]`) | Plain ASCII spaces around guillemets and before `:`/`;` instead of a non-breaking space (French typography rule). | Non-breaking spaces inserted via `contentOverrides.blocks`. | High | Applied (rule: FR typography) |
| 2 | Block 0 / lesson title | Needs the FR SEO title pattern, not the raw source's own `MAIN_TITLE` wording. | `contentOverrides.blocks["0"]` and `title` set to "Daleth (ד) : lettre hébraïque, son et exemples" (nbsp before `:`). | High | Applied (rule: FR title pattern) |
| 3 | Exercise 0 choices (ד, צ, נ, פּ) for "find Dalet" | Distractors include letters not yet introduced (Tsadi, Noun, Pe with dagesh). | Flagged `unintroduced-letters` (sourceIndex 0 → key "1"), matches EN precedent. | High | Applied (flag only, no text change) |
| 4 | Exercise 7 choices (עֲ, פֶּ, מֻ, גַ) for "which letter has Hataf-Patah" | Distractors include letters not yet introduced (Ayin, Pe, Mem). | Flagged `unintroduced-letters` (sourceIndex 7 → key "8"). | High | Applied (flag only) |
| 5 | Exercise 10 choices (ד, בּ, נ) for "which letter is [d]" | Distractor includes a letter not yet introduced (Noun). | Flagged `unintroduced-letters` (sourceIndex 10 → key "11"). | High | Applied (flag only) |

**Vowel length (EN parity check):** the approved EN `dalet.json` removed
"short"/"long" claims at exercises 2, 4, 8 and 12. The FR source's
equivalent tips at those same `sourceIndex` values ("Le Patah donne le son
[a]…") never made a length claim in the first place — nothing to mirror.

**No "Conclusions" calque**: the closing `SUBTITLE` (block 8) already reads
"Ce qu'on retient" — no rename needed.

**Letter-name spelling**: app body spelling is "Dalet" (matches raw
source); SEO spelling is "Daleth" (`src/i18n/fr-letters.ts`). First mention
in `copy.theory.intro` shows both: "Daleth (Dalet)." All other mentions
(objectives, raw blocks/exercises) keep "Dalet," per rule.

No absolute always/never claims found; no duplicate example blocks; no
tokenized source audio URLs; True/False set has one False (exercise 11,
Guimel+Patah→[du], answer false) alongside two True statements — balance
rule satisfied without changes. All study block and exercise types
(`MAIN_TITLE`, `SIMPLE_TEXT`, `SUBTITLE`, `WORD_EXAMPLE`, `BOLD_TEXT`;
`MULTIPLE_CHOICE_GRID`, `TRUE_FALSE`, `MULTIPLE_CHOICE_COLUMN`,
`MATCH_PAIRS`) are supported — no holdouts needed. `MATCH_PAIRS` pairs
(Bet/Dalet/Guimel → glyph) are already language-neutral, unchanged.

## Owner decisions needed

None. All corrections above are rule-covered, high-confidence fixes applied
in `src/data/lessons/fr/dalet.json`.
