# Yod (lesson 10) — FR editorial review

Reviewed against the pinned FR raw snapshot
`.local/alphabet-course-imports/v1/2026-10-19T14-27-18-905Z-bdf614-fr/raw/lesson-10.raw.json`,
SHA-256 `9a0436242e461666606b37d13a82e8c0b444ae3cdd41f6ee62f6fdfa82c3b6ae`.
Checked against `docs/hebrew-alphabet-editorial-rules.fr.md` and the
language-neutral EN rules. Derived independently from this FR source's own
`sourceIndex` values; the structure matches the EN raw source block-for-block
(10 study blocks, 16 exercises).

| # | Original | Problem | Correction | Confidence | Decision |
| - | -------- | ------- | ---------- | ---------- | -------- |
| 1 | Block 0 (`MAIN_TITLE`): "Découvrir le Yod (י) et de nouveaux mots hébraïques" | FR SEO title pattern needed. | `contentOverrides.blocks["0"]` and `title` set to "Yod (י) : lettre hébraïque, son et exemples" (43 characters). | High | Applied (rule: FR title pattern) |
| 2 | Blocks 7 and 9; transcription of block 6 (`chay`); question 8's choices, answer key and tip, question 10's prompt and tip, question 16's tip (sourceIndex 7, 9, 15): `[chay]`, `chay`, `[cha]`, "Le ch est celui de l'allemand « Bach »" | The guttural sound of Het is transliterated "ch", which French readers read as [ʃ]. | `kh` throughout (`khay`, `[khay]`, `[kha]`) via `contentOverrides.blocks`, `.transcriptions`, `.choices` and `.exercises`; the answer key was patched together with its choices. Block 7's note now reads "kh représente le son du ch allemand de « Bach »"; question 8's tip "Le kh correspond au ch de l'allemand « Bach »". Matches the Yod entry already listed in `docs/lessons/fr-translit-fixes.md`. | High | Applied (rule: French transliteration) |
| 3 | Block 5 "Le Dalet final ajoute [d]", block 7 and question 16's tip "Le Yod final complète…" | "final" reads as a final letter form; Dalet and Yod have none. | "Le Dalet en fin de mot", "Le Yod en fin de mot". | High | Applied (rule: "final" means a final form; mirrors EN rows 2–4) |
| 4 | Questions 4 and 12's tips (sourceIndex 3, 11): "Le [d] final se prononce." | "final" next to a sound, by extension of row 3 (Tet precedent for "Le ch final"). | "Le [d] en fin de mot se prononce." | Medium | Applied (same rule, by extension) |
| 5 | Block 8 (`SUBTITLE`): "Conclusions" | English calque. | "À retenir". | High | Applied (rule: "Conclusions" heading) |
| 6 | Plain ASCII spaces before `:`/`;`/`?`/`!`/`»` and after `«` | French typography needs a non-breaking space. | Not patched: `src/lib/fr-typography.mjs` corrects it at render time (Zayin–Tet precedent). | High | Noted, no override needed |
| 7 | Stage map heuristic `theory: [0,1,2,3]` | Would end the theory step on the bare "Mots à pratiquer :" subtitle. | `theory: [0,1,2]`, `examples: [3..9]`; headings "Comment se prononce Yod" and "Les deux rôles du Yod". | High | Applied (mirrors EN) |

**Letter-name spelling:** SEO spelling "Yod" (`src/i18n/fr-letters.ts`) and
the app spelling "Yod" coincide, so no "(…)" double mention. Other letters
named inside the source (Beit, Het, Alef, Hé, Dalet) keep the app spelling.
Vowel-sign names in the hand-written copy follow this source's spelling:
"Kamats Gadol", "Patah".

**Vowel length (EN parity check):** EN made no vowel-length correction, and
the FR source makes no length claim either. Nothing to mirror.

**Absolute-claim check:** question 5 (sourceIndex 4) "Le Yod doit toujours se
prononcer [y]" is keyed Faux, with בִּי as the counterexample in its tip.
Fine.

**Register:** the source already uses "tu" ("Rapproche", "Prononce", "Tu
connais", "Passe aux exercices"); the hand-written `copy.*` fields use tu
forms ("Découvre", "Ce que tu vas apprendre"). No tip opens with "Exact !".

**No English leftovers:** the only non-French strings are the `TRUE_FALSE`
option IDs (not displayed) and the German "Bach", quoted as such.

No duplicate example blocks; no tokenized audio URLs; True/False set has
three Faux among four (questions 2, 5, 9). Every Hebrew item uses letters
already taught. Meta: title 43, description 148 characters.

## Owner decisions (resolved 2026-10-26)

1. **Yod et Vav** (mirror of EN decision 2). Recommended: yes, add to
   `copy.theory.intro`: « Il ressemble à un Vav (ו) raccourci, suspendu en
   haut de la ligne. »
2. **Nommer le Hiriq** (mirror of EN decision 3). Recommended: yes, « le
   point sous le Beit (Hiriq) et le Yod qui suit notent [i] » in block 2 and
   question 5's tip (sourceIndex 4); "Hiriq" is this source's own spelling
   in later lessons.
3. **"[gay]" distractor** in question 8 (mirror of EN decision 4).
   Recommended: leave as is.

Resolved: all three recommendations approved. (1) the Vav sentence is in
`copy.theory.intro`; (2) « le point sous le Beit (Hiriq) » via
`contentOverrides.blocks["2"]` and `contentOverrides.exercises["4"].tip`;
(3) left as is.
