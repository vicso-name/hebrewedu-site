# Vav (lesson 6) — FR editorial review

Reviewed against the pinned FR raw snapshot
`.local/alphabet-course-imports/v1/2026-10-19T14-27-18-905Z-bdf614-fr/raw/lesson-6.raw.json`,
SHA-256 `6d4a9a989093c6fa22b6e8b7a35dee2182b39dc187da57326943d691ec3134a0`.
Checked against `docs/hebrew-alphabet-editorial-rules.fr.md` and the
language-neutral EN rules. Derived independently from this FR source's own
`sourceIndex` values; the block/exercise structure matches the EN raw
source block-for-block, including both `TITLE_IMAGE` holdouts and the
`STRIPED_BLOCK` holdout.

| # | Original | Problem | Correction | Confidence | Decision |
| - | -------- | ------- | ---------- | ---------- | -------- |
| 1 | Blocks 1, 11, 13 and exercises 1, 4, 5, 6, 10, 12 (guillemets around "ou"/"loup"/"doud"/"mot"/"dos"/"fou"/"vase"; also `lettres : Dalet`, `français : lis`, `syllabe : [vav]`, `[o] ; avec`) | Plain ASCII spaces around guillemets and before `:`/`;`/`?` instead of a non-breaking space. | Non-breaking spaces inserted via `contentOverrides`. | High | Applied (rule: FR typography) |
| 2 | Block 0 / lesson title | FR SEO title pattern needed. | `contentOverrides.blocks["0"]` and `title` set to "Vav (ו) : lettre hébraïque, son et exemples" (nbsp before `:`). | High | Applied (rule: FR title pattern) |
| 3 | Study blocks 2 and 4: `TITLE_IMAGE`, both empty | Unsupported block type, no renderer, empty regardless. | Held out (sourceIndex 2 and 4) — matches EN's Vav holdout. | High | Applied — holdout |
| 4 | Study block 6: `STRIPED_BLOCK` ("À retenir : le Shourouk et le Holam Male…") | Unsupported block type, no renderer in `StudyBlock.astro`. | Held out (sourceIndex 6) — matches EN's Vav holdout. | High | Applied — holdout |
| 5 | Exercise 0 choices (נ, ס, ו, ר) for "find Vav" | Distractors include letters not yet introduced (Noun, Samekh, Resh). | Flagged `unintroduced-letters` (sourceIndex 0 → key "1"). | High | Applied (flag only) |
| 6 | Exercise 9 choices (ת, וּ, ה, ן) for "which letter makes [ou]" | Distractors include letters not yet introduced (Tav, final Noun); Hé was already taught (lesson 5). | Flagged `unintroduced-letters` (sourceIndex 9 → key "10"). | High | Applied (flag only) |
| 7 | `additionalData.choices` on exercises 10 and 12 (e.g. "[o] comme dans « dos »") still use a plain space in two entries while other choice strings on the same exercises already use nbsp | Same typography issue, but `choices` is not one of the fields `contentOverrides.exercises` can patch (only `content`, `tip`, `correctAnswer` — `src/lib/lessons/normalize.mjs`). | Noted, left as-is; cosmetic only, no accuracy impact. | High | Not applied — no override path available |

**Vowel length (EN parity check):** EN's `vav.json` removed "long" from
exercises 1 and 5, and "short" from exercise 8. The FR source's equivalent
tips (exercise 1: "Le Holam Male (וֹ) représente [o]…"; exercise 5: "Le
Shourouk (וּ) représente [u]…"; exercise 8: "Le Patah représente [a]…")
never made a length claim — nothing to mirror.

**Absolute-claim check (EN parity):** EN changed exercise 3's "always" to
"usually" for word-final Bet → [v]. The FR exercise 3 content ("Dans le mot
דּוֹב [dov], le Beit final (ב), sans Dagesh, se prononce [v].") makes no
absolute claim, and its tip already hedges ("Sa position en fin de mot ne
suffit pas, à elle seule, à déterminer le son.") — nothing to mirror.

**Contradiction check (EN parity):** EN rewrote exercise 7 because the raw
source's word-example block described the first Vav with a Patach while
the exercise described it with a Kamats. The FR source doesn't have this
problem: block 13 ("Le premier porte un Kamats Gadol (ָ)…") and exercise 7's
tip ("Le premier porte un Kamats (ָ)…") already agree — nothing to fix.

**No "Conclusions" calque**: the closing `SUBTITLE` (block 14) already
reads "Ce qu'on retient" — no rename needed.

**Letter-name spelling**: app body spelling and SEO spelling coincide
("Vav") — no dual-spelling first mention needed.

No duplicate example blocks (ours "bear", chauffe-eau "boiler", crochet
"hook" are three distinct words); no tokenized source audio URLs;
True/False set has one False (exercise 11, Vav+Shourouk→[o], answer false)
among four — balance satisfied. `MATCH_PAIRS` (exercise 6) pairs are
glyph→sound (ו/וֹ/וּ → [v]/[o]/[u]), already language-neutral, unchanged.

## Owner decisions needed

None. All corrections above are rule-covered, high-confidence fixes applied
in `src/data/lessons/fr/vav.json`.
