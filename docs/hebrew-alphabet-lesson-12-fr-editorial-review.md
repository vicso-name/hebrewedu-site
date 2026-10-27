# Lamed (lesson 12) — FR editorial review

Reviewed against the pinned FR raw snapshot
`.local/alphabet-course-imports/v1/2026-10-19T14-27-18-905Z-bdf614-fr/raw/lesson-12.raw.json`,
SHA-256 `006b880f0e0da4bc31d64ef3de4bd07b4b30513b282a090238684244812ae228`.
Checked against `docs/hebrew-alphabet-editorial-rules.fr.md` and the
language-neutral EN rules. Derived independently from this FR source's own
`sourceIndex` values; the structure matches the EN raw source block-for-block
(17 study blocks, 16 exercises).

| # | Original | Problem | Correction | Confidence | Decision |
| - | -------- | ------- | ---------- | ---------- | -------- |
| 1 | Block 0 (`MAIN_TITLE`): "Découvrir Lamed (ל) et de nouveaux mots hébraïques" | FR SEO title pattern needed. | `contentOverrides.blocks["0"]` and `title` set to "Lamed (ל) : lettre hébraïque, son et exemples" (45 characters). | High | Applied (rule: FR title pattern) |
| 2 | Block 2 (`STRIPED_BLOCK`): Lamed as a prefix ("à", "vers", "pour"), לְדָוִד | No renderer. | Held out. The meaning is restated in `copy.theory.intro`, because question 5 tests it. | High | Applied (holdout; mirrors EN row 2) |
| 3 | Block 9 (`SUBTITLE`): "…appuie sur le bouton lecture pour comparer ta prononciation…" | No audio on the web lesson, and the paragraph would render as a heading. | Held out. The "aides à la lecture, pas l'API" note moved to `copy.examples.intro`. Its u/ou note is moot after row 4. | High | Applied (mirrors EN row 3) |
| 4 | Block 10's transcription `lula'a`; question 12's choices, answer key and tip `[lu-la-a]`, "avec u comme « ou »"; question 4's distractor `[kub]`; question 15's choice `[u]` | The [u] sound is written "u", which French readers read as [y]. | `loula'a`, `[lou-la-a]` (choices and answer key patched together), `[koub]`, `[ou]`. Question 12's tip drops "avec u comme « ou »". | High | Applied (rule: French transliteration, `ou`) |
| 5 | Block 7 "Le [d] final termine…"; question 4's tip "le [v] final se prononce"; question 8's tip "le [d] final se prononce" | "final" next to a sound (FR Yod row 4 precedent). | "en fin de mot". | Medium | Applied (rule: "final" means a final form, by extension) |
| 6 | Question 2's tip (sourceIndex 1): "Oui, Lamed (ל) est bien la 12ᵉ lettre…" | Tip opens with a verdict. | "Lamed (ל) est bien la 12ᵉ lettre…" | High | Applied (rule: tips never open with "Correct!"; mirrors EN row 4) |
| 7 | Question 3 (`MATCH_PAIRS`): נ → [n] | Noun is not yet introduced. | Flagged `unintroduced-letters`, kept. | Medium | Applied (flag; mirrors EN row 5) |
| 8 | Plain ASCII spaces before `:`/`;`/`?`/`!`/`»` | French typography. | Not patched in source text: `src/lib/fr-typography.mjs` fixes it at render time. Hand-written fields use U+00A0. | High | Noted, no override needed |
| 9 | Stage map heuristic `theory: [0,1,3]` | Would end theory on "Mots à pratiquer :". | `theory: [0,1]`, `examples: [3..8, 10..16]`; heading "Comment se prononce Lamed". | High | Applied (mirrors EN) |

**Letter-name spelling:** the SEO spelling "Lamed" (`src/i18n/fr-letters.ts`,
primary keyword `lettre lamed`, 40) and the app spelling "Lamed" coincide, so
no "(…)" double mention. Other letters keep the app spelling (Beit, Yod,
Dalet, Noun, Alef). Vowel-sign names follow the source: "Tséré", "Ségol",
"Patah".

**Vowel length (EN parity check):** EN made no vowel-length correction.
Question 16's tip "L'hébreu moderne n'exige pas de voyelle brève ici" is a
disclaimer, so the rule allows it, but see decision 2.

**Closing heading:** "Ce qu'on retient" is a native French heading, not the
"Conclusions" calque, so it stays. **Transliteration:** `kh` in [lekhem]
is already correct (`docs/lessons/fr-translit-fixes.md` lists Lamed as not
affected). **True/False:** question 9 False, questions 2, 5 and 13 True. **No
English leftovers** in the rendered page. **Register:** "tu" throughout.

## Owner decisions needed

1. **Question 7's tip:** "Chaque mot hébreu désigne un concept courant." Recommended:
   mirror EN decision 2: "יֶלֶד signifie « garçon », לֶחֶם « pain » et
   לַיְלָה « nuit »."
2. **Question 16's tip:** "n'exige pas de voyelle brève". Ruling out "short"
   can read as a hint toward "long". Recommended: say the same thing as EN,
   "Aucune durée particulière n'est exigée pour la voyelle."

Resolved 2026-10-27: both recommendations approved. (1)
`contentOverrides.exercises["6"].tip` is "יֶלֶד signifie « garçon », לֶחֶם
« pain » et לַיְלָה « nuit »."; (2) `contentOverrides.exercises["15"].tip`
ends "Aucune durée particulière n’est exigée pour la voyelle.", added to
`docs/hebrew-alphabet-editorial-rules.fr.md` as a vowel-length note.
