# Chet (lesson 8) — FR editorial review

Reviewed against the pinned FR raw snapshot
`.local/alphabet-course-imports/v1/2026-10-19T14-27-18-905Z-bdf614-fr/raw/lesson-8.raw.json`,
SHA-256 `beaa0f3754d1795dc6146cc76e8e803615868e5c048bba561d8ad7533747ab5d`.
Checked against `docs/hebrew-alphabet-editorial-rules.fr.md` and the
language-neutral EN rules. Derived independently from this FR source's own
`sourceIndex` values; the structure matches the EN raw source block-for-block
(10 study blocks, 15 exercises).

| # | Original | Problem | Correction | Confidence | Decision |
| - | -------- | ------- | ---------- | ---------- | -------- |
| 1 | Block 0 (`MAIN_TITLE`): "Het et quelques nouveaux mots hébraïques" | FR SEO title pattern needed. | `contentOverrides.blocks["0"]` and `title` set to "Heth (ח) : lettre hébraïque, son et exemples" (SEO spelling Heth). | High | Applied (rule: FR title pattern) |
| 2 | Blocks 1, 5, 7; transcriptions of blocks 4 and 6 (`ach`, `chag`); exercises 1, 2, 6, 7, 12, 13, 15 (sourceIndex 0, 1, 5, 6, 11, 12, 14): `[ch]`, `[cha]`, `[ach]`, `[chag]`, `[ko-ach]` | The guttural sound of Het is transliterated "ch", which French readers read as [ʃ]. | `kh` throughout (`[akh]`, `[khag]`, `[kha]`, `[ko-akh]`) via `contentOverrides.blocks`, `.transcriptions`, `.choices` and `.exercises`; the answer keys were patched together with their choices. The admin-side fix is listed in `docs/lessons/fr-translit-fixes.md`. | High | Applied (rule: French transliteration) |
| 3 | Block 2 (`STRIPED_BLOCK`), the furtive-Patah explainer | Unsupported study block type (same as EN). | Held out; the concept is still taught in the tips of questions 2, 8 and 15. | High | Applied (holdout, mirrors EN) |
| 4 | Plain ASCII spaces before `:`/`?`/`»` and after `«` across the raw text and the title | French typography needs a non-breaking space. | Not patched: `src/lib/fr-typography.mjs` corrects it at render time for body copy, title and meta (Zayin/Vav precedent). | High | Noted, no override needed |
| 5 | Exercises 5, 6 and 15 (sourceIndex 4, 5, 14) distractors | Letters not yet introduced (Lamed, Noun, Samekh, Tav, Ayin). | Flagged `unintroduced-letters`. | High | Applied (flag only) |

**Letter-name spelling:** SEO spelling "Heth" differs from the app spelling
"Het", so the first mention in `copy.theory.intro` reads "Heth (Het)"; every
later mention and all raw-source text keep "Het". Title, H1 and meta use
"Heth" (`src/i18n/fr-letters.ts`).

**Vowel length (EN parity check):** EN made no vowel-length correction, and
the FR source makes no length claim either (Kamats Gadol and Patah give [a],
Ségol [e]). Nothing to mirror.

**Absolute-claim check:** no "toujours"/"jamais"; block 1 hedges the sound as
"dans la prononciation courante de l'hébreu moderne", as EN does.

**"Final Chet" (EN owner decision 1):** the FR override of block 5 already
reads "Het (ח) donne le son noté [kh]", with no "final" wording, so the EN
decision needs no FR mirror.

**Register:** the closing block already uses "Tu viens d'apprendre"; the
hand-written `copy.*` fields use tu forms ("Découvre", "Ce que tu vas
apprendre"). The closing heading is "Ce qu'on retient", not the
"Conclusions" calque, so it stays.

**No English leftovers:** the only English strings are the `TRUE_FALSE`
option IDs "True"/"False" (not displayed) and the deliberate example
« hat » ("le mot anglais « hat »"), which is quoted as English.

No duplicate example blocks; no tokenized audio URLs; True/False set has two
False among three (questions 3 and 12). Meta: title 44, description 147
characters.

## Owner decisions needed

None for FR beyond EN decision 2 (publish with the furtive-Patah explainer
held out), which applies to both locales.
