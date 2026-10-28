# Mem (lesson 13) — FR editorial review

Reviewed against the pinned FR raw snapshot
`.local/alphabet-course-imports/v1/2026-10-19T14-27-18-905Z-bdf614-fr/raw/lesson-13.raw.json`,
SHA-256 `61ee1dd2e38d444f9257a25212fa7176ac5ed03cbfdbc169c74a66652b565f00`.
Checked against `docs/hebrew-alphabet-editorial-rules.fr.md` and the
language-neutral EN rules. Derived independently from this FR source's own
`sourceIndex` values. The structure matches the EN raw source block-for-block
(15 study blocks, 16 exercises).

| # | Original | Problem | Correction | Confidence | Decision |
| - | -------- | ------- | ---------- | ---------- | -------- |
| 1 | Block 0 (`MAIN_TITLE`): "Découvrir Mem (מ) et de nouveaux mots" | The FR SEO title pattern is needed. | `contentOverrides.blocks["0"]` and `title` are both "Mem (מ) : lettre hébraïque, son et exemples" (43 characters). | High | Applied (rule: FR title pattern) |
| 2 | Block 2 (`TEXT_IMAGE`, caption "Mem Sofit (ם)") has an empty body | Same as EN row 2. | The body is block 3's own first three sentences. Illustration: ם, "Mem Sofit", "Mem final : un Mem fermé en bas, de forme carrée, employé en fin de mot." | High | Applied (mirrors EN row 2) |
| 3 | Block 3 (`STRIPED_BLOCK`): Mem Sofit plus transcription conventions (y/i/e/u) | No renderer exists for this block type. | Held out. Its Mem Sofit sentences move to block 2. The "aides à la lecture, pas l'API ; traits d'union" note moves to `copy.examples.intro`. The y/i/e hints are already in blocks 6 and 12, and the u/ou hint is moot after row 5. | High | Applied (mirrors EN row 3) |
| 4 | "la Mem Sofit", "la première Mem", "La Mem finale", "la Mem" (blocks 1, 6, 12, 14; question 5) | Feminine "la Mem" conflicts with this lesson's own "le Yod" and "le Hé", with "le Kaf" in the Kaf lesson, and with French dictionary usage (letter names are masculine). | Masculine everywhere: "le Mem Sofit", "le premier Mem", "Le Mem final". "Mem final" stays, because Mem Sofit is a real final form. | High | Applied (contradiction inside the lesson) |
| 5 | Question 11's choice `[u-val]` | French readers read "u" as [y]. | `[ou-val]` (`contentOverrides.choices["10"]`; the answer key `[a-vad]` is unchanged). | High | Applied (rule: French transliteration, `ou`) |
| 6 | Blocks 8 and 10, and question 6's tip: "le Hé final n'a pas de son [h] distinct" | He has no final form. | "le Hé, à la fin (du mot), n'a pas de son [h] distinct". | High | Applied (rule: "final" means a final form; mirrors EN row 5) |
| 7 | Blocks 6 and 12: "Le [m] final ne constitue pas une syllabe"; question 11's tip: "Le [d] final termine…" | "final" next to a sound (FR Yod/Lamed precedent). | "en fin de mot". | Medium | Applied (rule: "final", by extension) |
| 8 | True/False: questions 2, 5 and 12 all key True | No False answer in the set. | Question 5: "Le Mem Sofit (ם) n'a pas le même son que le Mem (מ)." keys False. Tip: "Le Mem Sofit (ם) change de forme, mais garde le même son [m] que le Mem (מ)." | High | Applied (mirrors EN row 7) |
| 9 | Question 7's tip: "Chaque mot correspond à un concept courant." | This tip explains nothing after a wrong match. | "לֶחֶם signifie « pain », מַיִם « eau » et לַמָּה « pourquoi »." | High | Applied (Lamed FR decision 1 precedent) |
| 10 | Question 3 (`MATCH_PAIRS`): נ → [n] | Noun is not yet introduced. | Flagged `unintroduced-letters` and kept. | Medium | Applied (flag; mirrors EN row 9) |
| 11 | Plain ASCII spaces before `:`/`;`/`?`/`!`/`»` | French typography. | Not patched in source text, because `src/lib/fr-typography.mjs` fixes it at render time. Hand-written fields (title, meta, `copy`, illustration) use U+00A0. | High | Noted, no override needed |
| 12 | Stage map | Same as EN. | `theory: [0,1,2]` with headings "Comment se prononce Mem" and "La forme finale de Mem"; `examples: [4..14]`. | High | Applied (mirrors EN) |

**Letter-name spelling:** the SEO spelling "Mem" (`src/i18n/fr-letters.ts`,
primary keyword `lettre hébraïque mem`, 90) and the app spelling coincide, so
there is no "(…)" double mention. Other letters keep the app spelling (Yod, Hé, Het,
Lamed, Bet, Noun). Vowel-sign names follow the source: "Patah", "Hiriq",
"Kamats", "Ségol", "Dagesh".

**Vowel length (EN parity check):** EN row 4 removed "without requiring a
long vowel". The FR source already says "sans imposer une durée
particulière", which rules out both sides, so there is nothing to mirror. Question 12's
"ni raccourcir ni allonger" and question 16's "aucune durée particulière"
also rule out both sides.

**Closing heading:** "Ce qu'on a vu" is a native French heading, not the
"Conclusions" calque, so it stays. **Transliteration:** `kh` in [lekhem] is
already correct. **No English leftovers** appear in the rendered page. **Register:**
"tu" throughout.

## Owner decisions needed

None blocking. Please confirm row 4 (FR "Mem" made masculine throughout the
lesson).

Resolved 2026-10-28: approved. It is added to
`docs/hebrew-alphabet-editorial-rules.fr.md` as "Letter names are masculine".
