# Kaf (lesson 11) — FR editorial review

Reviewed against the pinned FR raw snapshot
`.local/alphabet-course-imports/v1/2026-10-19T14-27-18-905Z-bdf614-fr/raw/lesson-11.raw.json`,
SHA-256 `582e896742943a152bb26870904712a8b3064f627e028000a16411ce416321a9`.
Checked against `docs/hebrew-alphabet-editorial-rules.fr.md` and the
language-neutral EN rules. Derived independently from this FR source's own
`sourceIndex` values; the structure matches the EN raw source block-for-block
(17 study blocks, 16 exercises, same exercise ids).

| # | Original | Problem | Correction | Confidence | Decision |
| - | -------- | ------- | ---------- | ---------- | -------- |
| 1 | Block 0 (`MAIN_TITLE`): "Kaf et Khaf (כּ/כ) : une lettre, deux prononciations" | FR SEO title pattern needed. | `contentOverrides.blocks["0"]` and `title` set to "Kaf (כ) : lettre hébraïque, son et exemples" (43 characters). | High | Applied (rule: FR title pattern) |
| 2 | Blocks 3 and 6: "Sans daguech", "s'appelle le daguech", "sans daguech" | Two spellings in one lesson: everywhere else this source (and the FR course: Beit, Bet illustrations) writes "dagesh". | "dagesh" in both blocks. | High | Applied (contradiction inside the lesson; app spelling) |
| 3 | Block 12: "Le patah sous le Het final se prononce avant la consonne" | "final" reads as a final letter form; Het has none. | "Le patah sous le Het en fin de mot…" | High | Applied (rule: "final" means a final form; mirrors EN row 2) |
| 4 | Question 13's tip (sourceIndex 12): "Oui. כָּךְ se lit [kakh]…" | Tip opens with a verdict, shown after a wrong answer too. | "Oui. " dropped. | High | Applied (rule: tips never open with "Correct!"; mirrors EN row 3) |
| 5 | Blocks 3 and 6 (`TEXT_IMAGE`): description "Kaf Sofit" / empty | Missing image description; without an `illustrations` entry the block renders nothing. | `illustrations["3"]`: ך, "Kaf Sofit", "Kaf final : Kaf dont le trait descend sous la ligne, écrit uniquement en fin de mot." `illustrations["6"]`: כּ, "Kaf avec Dagesh", "Kaf avec un point (dagesh) au centre, prononcé [k]. Sans ce point, le Kaf se prononce [kh]." (FR Bet precedent.) | High | Applied (missing image description; mirrors EN row 4) |
| 6 | Block 13 (`WORD_EXAMPLE` כָּךְ): translation "Ainsi" | Capitalized, unlike the other translations; block 14 and question 7's tip give "ainsi" or "de cette façon". | "ainsi ; de cette façon". | High | Applied (mirrors EN row 5) |
| 7 | Plain ASCII spaces before `:`/`;`/`?`/`!`/`»` and after `«` | French typography needs a non-breaking space. | Not patched in source text: `src/lib/fr-typography.mjs` corrects it at render time (Zayin–Yod precedent). Hand-written title, meta, copy and overrides use U+00A0 directly. | High | Noted, no override needed |
| 8 | Stage map heuristic `theory: [0,1,2]` | Checked: theory ends on content; the `SUBTITLE`s (5, 8, 15) sit with their content in the examples step. | Kept; headings "Comment se prononce Kaf" and "Cinq lettres à forme finale". | High | Applied (mirrors EN) |

**Letter-name spelling:** the SEO spelling "Kaf" (`src/i18n/fr-letters.ts`,
primary keyword `lettre kaf`, 210) and the app spelling "Kaf" coincide, so
no "(…)" double mention. Other letters named inside the source (Beit, Het,
Vav) keep the app spelling. Vowel-sign names in the hand-written copy follow
this source: "Ségol".

**Vowel length (EN parity check):** EN made no vowel-length correction. The
FR source only rules length out ("il n'est pas nécessaire d'allonger cette
voyelle" in block 14, "L'hébreu moderne n'exige pas de voyelle longue ici"
in question 10). Nothing to mirror.

**Absolute-claim check:** no "toujours/jamais". "s'écrit uniquement à la fin
d'un mot" (block 3) is accurate for ך.

**Transliteration:** `kh` is used throughout for the Kaf and Het sounds
(`kokhav`, `koakh`, `kakh`, `[khe]`). "ch" appears only in the
German "Bach" comparison and in the explicit contrast with French "chat",
which the rule allows. `[ou]` in question 15's choices follows the `ou` rule.
This matches `docs/lessons/fr-translit-fixes.md` ("Kaf's own lesson already
gets this right").

**True/False:** question 2 False, questions 5, 9 and 13 True. **No English
leftovers** in the rendered page (the `True`/`False` option ids are
expected). **Register:** the source and the hand-written copy use "tu".

## Owner decisions needed

1. **Question 9's tip** (sourceIndex 8): "Il n'indique pas qu'il faut
   appuyer ou accentuer la consonne." This is the same point as EN decision 3. Recommended:
   if EN changes, mirror it: "Dans un texte avec des signes de
   prononciation, le dagesh distingue כּ [k] de כ [kh]."
2. **Het [kh].** EN decision 2 doesn't apply to FR, because the FR Het lesson already writes
   [kh] (`docs/hebrew-alphabet-lesson-8-fr-editorial-review.md`). Nothing to
   do.

Resolved 2026-10-27: (1) mirrored — `contentOverrides.exercises["8"].tip`
is "Dans un texte avec des signes de prononciation, le dagesh distingue כּ
[k] de כ [kh]."; (2) nothing to do.
