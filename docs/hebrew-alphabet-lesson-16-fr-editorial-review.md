# Ayin (lesson 16) FR editorial review

Reviewed against the pinned FR raw snapshot
`.local/alphabet-course-imports/v1/2026-10-19T14-27-18-905Z-bdf614-fr/raw/lesson-16.raw.json`,
SHA-256 `03f129be73e3a6b319a2ac9d19f75e8f8e0750de9c58328681f0ddca6a696d80`. Checked
against `docs/hebrew-alphabet-editorial-rules.fr.md` and the language-neutral
rules of `docs/hebrew-alphabet-editorial-rules.md`. Same block/exercise count
and order as EN (19 blocks, 16 exercises), derived from this snapshot's own
`sourceIndex` values.

| # | Original | Problem | Correction | Confidence | Decision |
| - | -------- | ------- | ---------- | ---------- | -------- |
| 1 | Block 0 (`MAIN_TITLE`): "Découvrir la lettre Ayin (ע) et de nouveaux mots hébreux" | FR title pattern. | `title` and H1 "Ayin (ע) : lettre hébraïque, son et exemples" (44 characters). Meta (137 characters, no em dash): "Apprends la lettre hébraïque Ayin (ע) : sa prononciation, souvent sans consonne comme Aleph, des mots comme עַיִן (œil) et des exercices." SEO and app spellings are both "Ayin", so no double first mention. | High | Applied (rule: FR title pattern) |
| 2 | [u] written "u": block 2's key "u du ou de « roue »", block 8's transcription "uga", block 9's "[u-ga]" and "représente [u]", block 14's "sivuv", question 6's tip "[u-ga] … u se prononce comme le ou de « roue »", question 13's "[u]", choices "[ u ]" in questions 10 and 15 | FR uses "ou" for [u]. | "ou" throughout: block 2 "et ou du ou de « roue »"; transcriptions "ouga", "sivouv" (Samekh precedent); "[ou-ga]", "[ou]"; question 6's tip drops the now-redundant "u se prononce comme…"; choices "[ ou ]" (`contentOverrides.choices`). No `MATCH_PAIRS` pair contains [u]. | High | Applied (rule: FR transliteration "ou") |
| 3 | Block 9: "Le Hé final ne se prononce pas dans ce mot." | Hé has no final form. | "En fin de mot, le Hé ne se prononce pas ici." | High | Applied (rule: "final" means a final form; mirrors EN row 2) |
| 4 | Block 11: "…, puis appuie sur le bouton de lecture pour comparer ta prononciation à celle de l’enregistrement." | No audio on the web. | "Prononce chaque mot à voix haute." The rest of the block is unchanged. | High | Applied (rule: no audio instructions; mirrors EN row 3) |
| 5 | Question 5's tip (sourceIndex 4): "Oui, עַיִן est le mot hébreu pour « œil »." | Verdict opener. | "עַיִן est le mot hébreu pour « œil »." | High | Applied (rule: tips never open with "Correct!"; mirrors EN row 4) |
| 6 | Question 1 (sourceIndex 0): choices "Elle se prononce toujours…", "Elle n’a pas de son consonantique propre", "Elle se prononce [a]"; block 1: "…présentée ici, elle n’ajoute pas…" | Letter names are masculine; the prompt asks "comment se prononce Ayin", so "Elle" contradicts "le Ayin" elsewhere. | "Il se prononce toujours…", "Il n’a pas de son consonantique propre" (answer key patched with it), "Il se prononce [a]"; block 1 "il n’ajoute pas". | High | Applied (rule: letter names are masculine) |
| 7 | Question 6 (`MULTIPLE_CHOICE_GRID`): three choices (gâteau, pain, tarte) | Same as EN row 5. | Same owner decision: a 3-choice grid renders as one column. | High | Applied (owner decision 2026-11-04) |
| 8 | Stage map heuristic `theory: [0,1,2,3]` | Same as EN row 6. | `theory: [0,1,2]` ("Comment se prononce Ayin", "Ayin et le mot « œil »"); `examples: [3..18]`. | High | Applied |

**Vowel length mirrors EN:** EN needed no length override. The FR source rules
out both sides itself ("il n’est pas nécessaire d’opposer des voyelles brèves
et longues", block 2; "aucune durée particulière n’est requise", question 10),
so nothing to mirror. "Une petite interruption de la voix" (block 1) is the
glottal stop, not a vowel. **Always/never:** "toujours" appears only in
question 1's distractor and question 8's prompt, both false. **True/False:**
question 8 keys Faux (5, 13 and 14 key Vrai). "Faux." and "Vrai." openers stay
(EN owner decision 1). **kh:** already "kh" (block 11), and Het isn't named, so
no bridge. **"En résumé"** is the source's closing heading (not "Conclusions"),
so it stays. **Register:** "tu" throughout; the copy uses "tu prononces".
**Typography:** French nbsp is added at render time (`localizeTypography`).
**No English leftovers** (checked in the normalized JSON and built HTML).
"Kamats Gadol", "Tséré", "Ségol", "Shourouk", "Noun Sofit" are app spellings and
stay; the intro's "Aleph" (linking the FR Aleph lesson) is the SEO spelling.

Kept, can't patch: question 11's `MATCH_PAIRS` writes "Segol" while the rest of
the lesson writes "Ségol" (pairs data has no override; holding the exercise out
for an accent isn't worth it), and question 2's pair "s'il te plaît" uses a
straight apostrophe.

## Owner decisions needed

None beyond EN decision 1 ("Vrai." / "Faux." openers, mirrored here).

Resolved 2026-11-04: approved, together with EN.
