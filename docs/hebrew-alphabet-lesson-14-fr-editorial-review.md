# Nun (lesson 14) — FR editorial review

Reviewed against the pinned FR raw snapshot
`.local/alphabet-course-imports/v1/2026-10-19T14-27-18-905Z-bdf614-fr/raw/lesson-14.raw.json`,
SHA-256 `df077b1257214d13abeaa5fcb296193c0c1eca41fe3e93aa2ad68cbe37a0df60`.
Checked against `docs/hebrew-alphabet-editorial-rules.fr.md` and the
language-neutral EN rules. Derived independently from this FR source's own
`sourceIndex` values. The structure matches the EN raw source block-for-block
(22 study blocks, 15 exercises).

| # | Original | Problem | Correction | Confidence | Decision |
| - | -------- | ------- | ---------- | ---------- | -------- |
| 1 | Block 0 (`MAIN_TITLE`): "La lettre Noun (נ) et quelques mots courants" | The FR SEO title pattern is needed. | `contentOverrides.blocks["0"]` and `title` are both "Noun (נ) : lettre hébraïque, son et exemples" (44 characters). Meta: 154 characters. | High | Applied (rule: FR title pattern) |
| 2 | Block 2 (`TEXT_IMAGE`, caption "Noun Sofit") has an empty body | Same as EN row 2. | The body is block 3's own two sentences, verbatim. Illustration: ן, "Noun Sofit", "Noun final : un Noun allongé en un long trait droit qui descend sous la ligne, employé en fin de mot." | High | Applied (mirrors EN row 2) |
| 3 | Block 3 (`SIMPLE_TEXT`): the same two sentences | Same as EN row 3. | Held out ("texte déplacé, pas supprimé"). | High | Applied (mirrors EN row 3) |
| 4 | "la Noun ordinaire" (block 5), "La Noun Sofit" (question 2's tip), "La Noun Sofit… la Noun ordinaire… toutes les deux" (question 5) | Letter names are masculine. | "du Noun ordinaire", "le Noun Sofit", "Le Noun Sofit… du Noun ordinaire", "Le Noun Sofit et le Noun… tous les deux". | High | Applied (rule: letter names are masculine) |
| 5 | Block 12: "le Hé final ne produit pas de son [h] distinct" | He has no final form. | "le Hé, à la fin, ne produit pas de son [h] distinct". | High | Applied (rule: "final"; mirrors EN row 4) |
| 6 | Block 14 "prononce le n final", question 4's tip "un n final audible", question 12's tip "le n final se prononce" | "final" next to a sound (FR Mem/Yod/Lamed precedent). | "le n en fin de mot" / "un n audible en fin de mot". | Medium | Applied (rule: "final", by extension) |
| 7 | Block 14: "puis appuie sur le bouton lecture pour comparer ta prononciation avec celle du locuteur" | No audio on the web lesson. | "Lis chaque mot à voix haute." The rest is unchanged. | High | Applied (mirrors EN row 5) |
| 8 | Question 2's tip: "…n'apparaît qu'en fin de mot." | The prompt is limited to "l'écriture hébraïque moderne courante"; the tip isn't. | "Dans l'écriture hébraïque moderne courante, le Noun Sofit (ן), forme finale du Noun (נ), n'apparaît qu'en fin de mot." | High | Applied (mirrors EN row 6) |
| 9 | Block 20 (`SUBTITLE`): "Conclusions" | English calque. The rule's "À retenir" is already block 4's heading in the same (examples) step, so the step would show two identical headings. | "En résumé". | Medium | Applied (owner decision 2026-11-02) |
| 10 | Question 3 (`MATCH_PAIRS`): ת → [t] | Tav is not yet introduced. | Flagged `unintroduced-letters` and kept. | Medium | Applied (flag; mirrors EN row 7) |
| 11 | Plain ASCII spaces before `:`/`;`/`?`/`!`/`»` | French typography. | Not patched in untouched source text, because `src/lib/fr-typography.mjs` fixes it at render time. Hand-written fields and overrides use U+00A0. | High | Noted |
| 12 | Stage map | Same as EN. | `theory: [0,1,2]` with headings "Comment se prononce Noun" and "La forme finale de Noun"; `examples: [4..21]`. | High | Applied (mirrors EN) |

**Letter-name spelling:** the SEO spelling "Noun" (`src/i18n/fr-letters.ts`,
primary keyword `lettre hébraïque noun`) and the app spelling coincide, so
there is no "(…)" double mention. Other letters keep the app spelling
(Guimel, Alef, Hé, Mem, Tav). Vowel-sign names follow the source: "Patah",
"Kamats Gadol", "Ségol".

**Vowel length (EN parity check):** EN made no length override. Block 5's
"il n'est pas nécessaire d'allonger l'un par rapport à l'autre" rules out
both sides, like the EN sentence, so it stays.

**Transliteration:** `kh` in [na-khal] and `ou` in the `[ou-men]`/`[ou]`
choices are already correct. **No English leftovers** in the rendered page.
**Register:** "tu" throughout ("s'il vous plaît" in block 10 is a
translation of נָא, not an address to the reader). Question 10's "en hébreu"
stays (EN precedent).

## Owner decisions needed

1. **Block 20 closing heading.** The rule says "Conclusions" → "À retenir",
   but block 4 already says "À retenir" in the same step. Recommended:
   "En résumé" (already in the build), and add to the FR rules: "if 'À
   retenir' is already used in the lesson, use 'En résumé'".

Resolved 2026-11-02: approved. Row 9 stays "En résumé", and the fallback is
added to the "Conclusions" rule in `docs/hebrew-alphabet-editorial-rules.fr.md`.
