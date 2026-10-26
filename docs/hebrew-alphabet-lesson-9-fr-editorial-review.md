# Tet (lesson 9) — FR editorial review

Reviewed against the pinned FR raw snapshot
`.local/alphabet-course-imports/v1/2026-10-19T14-27-18-905Z-bdf614-fr/raw/lesson-9.raw.json`,
SHA-256 `fc1ea0aef0197eff9bf497a3af3170768e505c78089b6c0d31d6691831c0e567`.
Checked against `docs/hebrew-alphabet-editorial-rules.fr.md` and the
language-neutral EN rules. Derived independently from this FR source's own
`sourceIndex` values; the structure matches the EN raw source block-for-block
(10 study blocks, 12 exercises).

| # | Original | Problem | Correction | Confidence | Decision |
| - | -------- | ------- | ---------- | ---------- | -------- |
| 1 | Block 0 (`MAIN_TITLE`): "Découvrir Tet (ט) et quelques nouveaux mots" | FR SEO title pattern needed. | `contentOverrides.blocks["0"]` and `title` set to "Teth (ט) : lettre hébraïque, son et exemples" (SEO spelling Teth, 44 characters). | High | Applied (rule: FR title pattern) |
| 2 | Blocks 7 and 9; transcription of block 6 (`betach`); question 4's prompt and question 9's choices, answer key and tip (sourceIndex 3, 8): `[bé-tach]`, `BÉ-tach`, `[tach]`, `[ba-tach]`, `[bi-tach]`, "Le ch final" | The guttural sound of Het is transliterated "ch", which French readers read as [ʃ]. | `kh` throughout (`betakh`, `[bé-takh]`, `[takh]`, `[ba-takh]`, `[bi-takh]`) via `contentOverrides.blocks`, `.transcriptions`, `.choices` and `.exercises`; the answer key was patched together with its choices. Block 7's note now reads "kh désigne le son du ch allemand de « Bach »". Admin-side fix updated in `docs/lessons/fr-translit-fixes.md`. | High | Applied (rule: French transliteration) |
| 3 | Blocks 5, 7, 9 and question 6's tip (sourceIndex 5): "le Beit final sans Dagesh", "Le Het final (ח)" | "final" reads as a final letter form; Beit and Het have none. | "le Beit en fin de mot, sans Dagesh", "Le Het en fin de mot (ח)"; question 9's "Le ch final" becomes "Le kh à la fin". | High | Applied (rule: "final" means a final form, language-neutral; mirrors EN rows 2–5) |
| 4 | Question 11's tip (sourceIndex 10): "Exact ! Tet (ט) est bien la 9e lettre…" | The explanation also shows after a wrong answer, so "Exact !" contradicts a learner who chose Faux. | "Tet (ט) est bien la 9e lettre de l'alphabet hébreu." | High | Applied (contradiction; mirrors EN row 6) |
| 5 | Plain ASCII spaces before `:`/`;`/`?`/`!`/`»` and after `«` | French typography needs a non-breaking space. | Not patched: `src/lib/fr-typography.mjs` corrects it at render time (Zayin/Chet precedent). | High | Noted, no override needed |
| 6 | Question 12 (sourceIndex 11) distractor שלוֹם | Letters not yet introduced (Shin, Lamed, Mem final). | Flagged `unintroduced-letters`. | High | Applied (flag only) |
| 7 | Stage map heuristic `theory: [0,1,2,3]` | Would end the theory step on the bare "Mots à pratiquer :" subtitle. | `theory: [0,1,2]`, `examples: [3..9]`; headings "Comment se prononce Tet" and "Tet et le mot « bon »". | High | Applied (mirrors EN) |

**Letter-name spelling:** SEO spelling "Teth" differs from the app spelling
"Tet", so the first mention in `copy.theory.intro` reads "Teth (Tet)"; every
later mention and all raw-source text keep "Tet". Title, H1 and meta use
"Teth" (`src/i18n/fr-letters.ts`). Vowel-sign names in the hand-written copy
follow this source's spelling: "Holam Malé", "Ségol", "Patah".

**Vowel length (EN parity check):** EN made no vowel-length correction, and
the FR source makes no length claim either. Nothing to mirror.

**Absolute-claim check:** no "toujours"/"jamais".

**Register:** the source already addresses the reader with "tu" ("Tu as
découvert", "Lis ces sons", "t'aider"); the hand-written `copy.*` fields use
tu forms ("Découvre", "Ce que tu vas apprendre", "tu entendras"). The closing
heading is "Ce qu'on retient", not the "Conclusions" calque, so it stays.

**No English leftovers:** the only non-French strings are the `TRUE_FALSE`
option IDs (not displayed) and the Hebrew greeting "boker tov", quoted as a
transliteration.

No duplicate example blocks; no tokenized audio URLs; True/False set has one
False among four (question 2, "טוֹב signifie-t-il « mauvais » ?"). Block 2's
Talmud reference (Bava Kamma 55a) is accurate, as in EN. Meta: title 44,
description 147 characters.

## Owner decisions (resolved 2026-10-26)

1. **Tet et Tav** (mirror of EN decision 1). Recommended: yes, add to
   `copy.theory.intro`: « En hébreu moderne, Tet se prononce exactement comme
   Tav (ת), une lettre que tu verras plus tard : c'est l'orthographe du mot
   qui indique laquelle utiliser. »
2. **Unpointed distractors in question 12** (mirror of EN decision 2).
   Recommended: leave as is.

Resolved: (1) approved, final wording « …c'est l'orthographe de chaque mot
qui indique laquelle des deux on écrit. »; (2) left as is.
