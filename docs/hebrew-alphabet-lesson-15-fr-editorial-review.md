# Samekh (lesson 15) — FR editorial review

Reviewed against the pinned FR raw snapshot
`.local/alphabet-course-imports/v1/2026-10-19T14-27-18-905Z-bdf614-fr/raw/lesson-15.raw.json`,
SHA-256 `45e35b9f09a77c5d562271b9ad9830b0cb83dca79097c0906fa0f9afc15166cb`.
Checked against `docs/hebrew-alphabet-editorial-rules.fr.md` and the
language-neutral EN rules. Derived independently from this FR source's own
`sourceIndex` values. The structure matches the EN raw source block-for-block
(19 study blocks, 14 exercises).

| # | Original | Problem | Correction | Confidence | Decision |
| - | -------- | ------- | ---------- | ---------- | -------- |
| 1 | Block 0 (`MAIN_TITLE`): "Découvrir Samekh (ס) et de nouveaux mots hébraïques" | Title/H1 need the FR pattern. | `title` and H1 "Samekh (ס) : lettre hébraïque, son et exemples" (46 characters). Meta: "Apprends la lettre hébraïque Samekh (ס) : son son [s], la différence avec Sin (שׂ), la voyelle Hiriq, des mots comme סוֹד (secret) et des exercices." (148 characters, no em dash). | High | Applied (rule: FR title pattern) |
| 2 | Blocks 3 and 16, `WORD_EXAMPLE` 15, question 14's tip: [si-vuv], sivuv, vuv, "la voyelle [u]", plus block 3's note "u se lit comme le ou de « roue »… Dans certains choix des exercices, ce même son est écrit ou" | French transcription writes [u] as "ou"; the source mixes both and needs a note to explain it. Choices already use "ou" ([soud], [sou-biv], [ou]). | [si-vouv], sivouv, vouv, "la voyelle [ou]"; the two note sentences in block 3 and block 16's "Ici, u se prononce comme le ou de « roue »" are dropped, since nothing writes "u" any more. | High | Applied (rule: `ou` for [u], Lamed precedent) |
| 3 | Question 12's tip (sourceIndex 11): "En hébreu moderne, il n'impose pas une voyelle brève." | One-sided length disclaimer. | "Aucune durée particulière n'est exigée pour la voyelle." Mirrors EN row 3. | High | Applied (rule: disclaimers rule out both sides) |
| 4 | Blocks 6 and 9: "Le Hé (ה) final est muet (dans ce mot)." | He has no final form. | "En fin de mot, le Hé (ה) est muet." Mirrors EN row 7. | High | Applied (rule: "final" means a final form) |
| 5 | Block 17 (`SUBTITLE`): "Conclusions" | English calque. "À retenir" is not used elsewhere in the lesson. | "À retenir". | High | Applied (rule: "Conclusions" heading) |
| 6 | Block 4 (`TEXT_IMAGE`): "Sur l'image, Alef porte un point…" | The web lesson withholds the image. | "Ici, Alef porte un point…" Illustration: אִ, "Hiriq Haser". Mirrors EN row 5. | High | Applied (clear fix; EN owner decision 2) |
| 7 | Block 7 (`TEXT_IMAGE`, Hiriq Male) | Missing web illustration. | Illustration: שִׂי, "Hiriq Male", "Hiriq suivi d'un Yod muet qui note la voyelle, ici après Sin, qui se lit [si] : c'est un Hiriq Male (« avec Yod »)." No Hebrew in the caption line, which is not wrapped in `lang="he"`. | High | Applied (missing image description) |
| 8 | Blocks 5 and 8 (`STRIPED_BLOCK`): אִשָּׁה, שִׂיחָה | No renderer. | Held out; blocks 6 and 9 open with the same words. | High | Applied (holdout) |
| 9 | Questions 2, 5, 9 and 13 (`TRUE_FALSE`) all key True | One-sided set. | Question 9 (sourceIndex 8): "Dans « סִיבוּב », la lettre Yod (י) se prononce comme une consonne [y] distincte." → Faux; tip "Dans סִיבוּב, Yod (י) fait partie du Hiriq Male : il aide à noter [i] et n'ajoute pas de son de consonne distinct." Mirrors EN row 10. | High | Applied (rule: at least one False) |
| 10 | Question 3 (`MATCH_PAIRS`): ת → [t] | Tav comes in lesson 22. | Kept and flagged `unintroduced-letters`. | Medium | Applied (flag) |
| 11 | Stage map | Same doubled-heading problem as EN. | `theory: [0,1]`, `examples: [2,3,4,6,7,9..18]`, as EN. | High | Applied |

**Letter-name spelling:** the SEO spelling "Samekh" (`src/i18n/fr-letters.ts`,
primary keyword `lettre hébraïque samekh`) and the app spelling coincide, so
there is no "(…)" double mention. Other letters keep the app spelling (Alef,
Beit, Yod, Het, Hé, Pé, Resh, Tav). "le Samekh" is masculine where the source
uses an article. Vowel-sign names follow the source: "Hiriq", "Kamats Gadol",
"Holam Male", "Shourouk", "Tséré", "Ségol", "Patah"; "niqqoud" in block 2.

**Vowel length (EN parity check):** EN changed block 3's "without requiring a
long vowel". The FR block 3 never made that claim ("il n'est pas nécessaire de
les distinguer par la durée de la voyelle" rules out both sides), so there is
nothing to mirror there. Question 12 is mirrored (row 3).

**Transliteration:** `kh` in [si-kha] is already correct and explained.
**Typography:** French nbsp before high punctuation in the hand-written copy;
the source text is corrected at render. **No English leftovers** in the
rendered page. **Register:** "tu" throughout.

## Owner decisions needed

1. **Shin written "sh".** Block 6 writes אִשָּׁה as [i-sha] and explains "sh
   note ici le son du ch français de « chat »". The FR rule reserves "ch" for
   [ʃ] without requiring it, and the FR blog writes Shin "sh". Recommended:
   keep "sh" (explained in the block, matches the blog), and settle it for
   the Shin lesson (21).
2. **סִיבוּב = « rotation ».** The more natural French is « tour ».
   « Rotation » is also in question 7's pairs, which can't be patched.
   Recommended: keep (same as EN decision 1).

Resolved 2026-11-03: approved. Decision 1: "sh" stays here; the Shin
lesson (21) settles the Shin transcription. Decision 2: « rotation »
stays. The "No app-screen references" rule (EN decision 2) is listed among
the language-neutral rules in `docs/hebrew-alphabet-editorial-rules.fr.md`.
