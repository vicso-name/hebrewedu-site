# Zayin (lesson 7) — FR editorial review

Reviewed against the pinned FR raw snapshot
`.local/alphabet-course-imports/v1/2026-10-19T14-27-18-905Z-bdf614-fr/raw/lesson-7.raw.json`,
SHA-256 `fa2003b50b09891d1f738456083cc2d6ca6d378ddb021564e60d3fa9ac84d469`.
Checked against `docs/hebrew-alphabet-editorial-rules.fr.md` and the
language-neutral EN rules. Derived independently from this FR source's own
`sourceIndex` values; the block/exercise structure matches the EN raw
source block-for-block (11 study blocks, 14 exercises, nothing unsupported,
nothing held out).

| # | Original | Problem | Correction | Confidence | Decision |
| - | -------- | ------- | ---------- | ---------- | -------- |
| 1 | Block 9 (`SUBTITLE`): "Conclusions" | Literal English calque, per the FR-specific rule. | `contentOverrides.blocks["9"]` set to "À retenir". | High | Applied (rule: "Conclusions" heading) |
| 2 | Block 0 / lesson title | FR SEO title pattern needed. | `contentOverrides.blocks["0"]` and `title` set to "Zayin (ז) : lettre hébraïque, son et exemples" (nbsp before `:`). | High | Applied (rule: FR title pattern) |
| 3 | Many blocks/exercises (e.g. tips quoting « mouche », « zvouv », « zé »; prompts with `Dagesh : Comment`) | Plain ASCII spaces around guillemets and before `:`/`;`/`?` in places, instead of a non-breaking space. | Not patched via `contentOverrides` — `StudyBlock.astro`/`Practice.astro` already correct this at render time via `src/lib/fr-typography.mjs` (idempotent, locale-gated; EN output is untouched), matching the note in Vav's FR review (`docs/hebrew-alphabet-lesson-6-fr-editorial-review.md`). The raw text is republished byte-for-byte and left for the render-time filter rather than hand-edited. | High | Noted, no override needed |
| 4 | Exercise 0 choices (ז, ר, נ, וֹ) for "find Zayin" | Distractors include letters not yet introduced (Resh, Noun). | Flagged `unintroduced-letters` (sourceIndex 0 → key "1"). | High | Applied (flag only) |

**Vowel length (EN parity check):** EN's `zayin.json` made no vowel-length
correction (none was needed). The FR source's equivalent tips (Ségol,
Kamats Gadol, Patah, Holam Male) never claim a length/duration distinction
either — nothing to mirror.

**Absolute-claim check (EN parity):** EN made no absolute-claim correction.
The FR source makes none either (no "toujours"/"jamais").

**Letter-name spelling:** app body spelling and SEO spelling coincide
("Zayin") — no dual-spelling first mention needed. "Beit", "Hé" and
"Guimel" appear only in in-body explanations (not SEO-facing fields), so
they stay as the raw source's own spelling per
`docs/hebrew-alphabet-editorial-rules.fr.md`'s in-body-copy carve-out.

**Register:** closing `SIMPLE_TEXT` (block 10) already uses "tu"/"Tu as
découvert" — no vous-register leftovers found in the raw source or in the
hand-authored `copy.*` fields added here.

No duplicate example blocks (זְבוּב "mouche", זֶה "ceci", זֶה אַבָּא "c'est
papa" are three distinct words/phrases); no tokenized source audio URLs;
True/False set has two False among four (exercise 8, Vav+Holam Male→[vi],
answer false; exercise 10, Zayin→[ts], answer false) — balance satisfied.
No `MATCH_PAIRS` exercises in this lesson.

## Owner decisions needed

None. All corrections above are rule-covered, high-confidence fixes applied
in `src/data/lessons/fr/zayin.json`.
