# Hé (lesson 5) — FR editorial review

Reviewed against the pinned FR raw snapshot
`.local/alphabet-course-imports/v1/2026-10-19T14-27-18-905Z-bdf614-fr/raw/lesson-5.raw.json`,
SHA-256 `c165385fe990aeca2ce8926116bf400841038fe86e08a6398d6dc27046b79ee9`.
Checked against `docs/hebrew-alphabet-editorial-rules.fr.md` and the
language-neutral EN rules. Derived independently from this FR source's own
`sourceIndex` values; the block/exercise structure matches the EN raw
source block-for-block, including both `TITLE_IMAGE` holdouts.

| # | Original | Problem | Correction | Confidence | Decision |
| - | -------- | ------- | ---------- | ---------- | -------- |
| 1 | Blocks 1, 2, 6, 8, 11, 13, 15 and exercises 0, 2 (guillemets around "h"/"hello"/"le"/"la"/"les"/"terre"/"la terre"/"é"/"été"/"drapeau"/"corde"/"volant"; also `[v] ; avec`, `: [de-gel]`, `: [che-vel]`, `: [he-ge]`) | Plain ASCII spaces around guillemets and before `;`/`:` instead of a non-breaking space. | Non-breaking spaces inserted via `contentOverrides`. | High | Applied (rule: FR typography) |
| 2 | Block 0 / lesson title | FR SEO title pattern needed. | `contentOverrides.blocks["0"]` and `title` set to "Hé (ה) : lettre hébraïque, son et exemples" (nbsp before `:`). | High | Applied (rule: FR title pattern) |
| 3 | Study blocks 5 and 7: `TITLE_IMAGE`, both empty (`content: ''`, no title/image URL) | Unsupported block type, no renderer, and empty regardless. | Held out (`holdOuts.blocks`, sourceIndex 5 and 7) — matches EN's He holdout exactly. | High | Applied — holdout |
| 4 | Exercise 0 choices (נ, פּ, ק, ה) for "find Hé" | Distractors include letters not yet introduced (Noun, Pe with dagesh, Qof). | Flagged `unintroduced-letters` (sourceIndex 0 → key "1"). | High | Applied (flag only) |
| 5 | Exercise 8 choices (הֶ, בִ, קָ, עֲ) for "which letter has a Ségol" | Distractors include letters not yet introduced (Qof, Ayin). | Flagged `unintroduced-letters` (sourceIndex 8 → key "9"). | High | Applied (flag only) |

**Vowel length (EN parity check):** the approved EN `he.json` removed a
length/emphasis comparison from block 6 (Tsere vs. Segol) and "long" from
exercises 3 and 12. The FR source's equivalent passages (block 6: "le même
son [e], proche du « é » français…"; exercise 3 tip: "Le Tséré représente
le son [e]…"; exercise 12 tip: "Le Kamats Gadol représente [a] ici…") never
made a length or duration claim — nothing to mirror.

**No "Conclusions" calque**: the closing `SUBTITLE` (block 16) already
reads "Ce que tu as appris" — no rename needed.

**Letter-name spelling**: app body spelling and SEO spelling coincide
("Hé") — no dual-spelling first mention needed.

**Word-breakdown letters beyond the lesson** (blocks 11, 13, 15 name Dalet,
Guimel, Lamed, Chet while spelling out דֶּגֶל/חֶבֶל/הֶגֶה) — matches the
established EN precedent (He's own EN review, Bet's lesson 2): this applies
only to exercise distractors, not word-breakdown narration. No change.

No absolute always/never claims found; no duplicate example blocks (drapeau
"flag", corde "rope", volant "steering wheel" are three distinct words); no
tokenized source audio URLs; True/False set has one False (exercise 9,
Hé+Ségol→[ha], answer false) among six — balance satisfied. All other
block/exercise types are supported.

## Owner decisions needed

None. All corrections above are rule-covered, high-confidence fixes applied
in `src/data/lessons/fr/he.json`.
