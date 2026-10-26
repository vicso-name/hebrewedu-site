# FR snapshot fix: "ch" → "kh" for the guttural ח/כ sound

Source of truth is the admin (hebrewedu.com API), not this repo. FR app
users see the same wrong transliteration we found in Chet's FR snapshot —
this is an admin content bug, not a per-lesson editorial judgment call.
This doc lists every occurrence found across all 22 FR snapshot files
(`.local/alphabet-course-imports/v1/2026-10-19T14-27-18-905Z-bdf614-fr/raw/
lesson-<N>.raw.json`) so the admin can be corrected directly.

Rule (`docs/hebrew-alphabet-editorial-rules.fr.md`): French transliteration
uses `kh` for the guttural/uvular sound of Het (ח) and Khaf without dagesh
(כ/ך) — never `ch`, which reads as [ʃ] in French. `ch` stays correct only
for the French [ʃ] sound (Shin) and for literal foreign words quoted as
such ("Bach", "loch" — German/Scottish, left alone below).

Kaf's own lesson (lesson 11, slug `kaf`) already gets this right — every
occurrence below is in a *different* letter's lesson, where a review
word or a letter's own vocabulary word happens to contain Het or Khaf.

Chet (lesson 8) and Tet (lesson 9) already have local, lesson-specific
fixes in `src/data/lessons/fr/chet.json` and `src/data/lessons/fr/tet.json`
(via two new `contentOverrides` paths — see `docs/LESSON_PIPELINE.md`) so
they can publish without waiting on an admin fix. Once the admin source is
corrected, re-run
`node scripts/normalize-lesson.mjs <slug> --locale fr --dry-run` — any
override whose value now equals the source will emit a "redundant
override" warning (see below); remove those entries.

## Chet (lesson 8, slug `chet`)

| Where | Field | Current | Proposed |
|---|---|---|---|
| block#2 (STRIPED_BLOCK, furtive-Patah explainer) | content | `[cha]`, `[chag]`, `[ko-ach]`, `[ach]` | `[kha]`, `[khag]`, `[ko-akh]`, `[akh]` |
| block#4 (WORD_EXAMPLE אָח) | transcription | `ach` | `akh` |
| block#5 (BOLD_TEXT, explains אָח) | content | `[ach]`, `[ch]` | `[akh]`, `[kh]` |
| block#6 (WORD_EXAMPLE חַג) | transcription | `chag` | `khag` |
| block#7 (BOLD_TEXT, explains חַג) | content | `[chag]`, `[cha]` | `[khag]`, `[kha]` |
| exercise#1742224241367 (Q1) | tip, choices[0], correctAnswer | `[ch]` | `[kh]` |
| exercise#1742224241368 (Q2) | tip, choices[0..3], correctAnswer | `[cha]`, `[ach]`, `[chah]`, `[hcha]`, `[ko-ach]` | `[kha]`, `[akh]`, `[khah]`, `[hkha]`, `[ko-akh]` |
| exercise#1742224241374 (Q6) | choices[1], correctAnswer | `[ch]` | `[kh]` |
| exercise#1742224241375 (Q7) | content, tip | `[ch]`, `[ach]` | `[kh]`, `[akh]` |
| exercise#1742224241376 (Q8) | tip | `[chag]`, `[cha]`, `[ach]` | `[khag]`, `[kha]`, `[akh]` |
| exercise#1742224241380 (Q12) | tip | `[ch]` | `[kh]` |
| exercise#1742224241381 (Q13) | content | `[ach]` | `[akh]` |
| exercise#1742224241383 (Q15) | tip, choices[0], choices[2], correctAnswer | `[ko-ach]`, `[ach]`, `[ch]`, `[cha]` | `[ko-akh]`, `[akh]`, `[kh]`, `[kha]` |

## He (lesson 5, slug `he`) — word חֶבֶל (corde/rope)

| Where | Field | Current | Proposed |
|---|---|---|---|
| block#12 (WORD_EXAMPLE חֶבֶל) | transcription | `chevel` | `khevel` |
| block#13 (BOLD_TEXT, explains חֶבֶל) | content | `chevel`, `che-vel` | `khevel`, `khe-vel` |

## Tet (lesson 9, slug `tet`) — word בֶּטַח (bien sûr/certainly)

| Where | Field | Current | Proposed |
|---|---|---|---|
| block#6 (WORD_EXAMPLE בֶּטַח) | transcription | `betach` | `betakh` |
| block#7 (BOLD_TEXT, explains בֶּטַח) | content | `bé-tach`, `BÉ-tach`, `[tach]`, `betach`, "ch désigne" | `bé-takh`, `BÉ-takh`, `[takh]`, `betakh`, "kh désigne" |
| block#9 (SIMPLE_TEXT, closing recap) | content | `[bé-tach]` | `[bé-takh]` |
| exercise#1742224380222 | content | `[bé-tach]` | `[bé-takh]` |
| exercise#1742224380227 | choices[0..3], correctAnswer, tip | `[ba-tach]`, `[bé-tach]`, `[bi-tach]`, `BÉ-tach`, "Le ch final" | `[ba-takh]`, `[bé-takh]`, `[bi-takh]`, `BÉ-takh`, "Le kh à la fin" |

## Yod (lesson 10, slug `yod`) — word חַי (vivant/alive)

| Where | Field | Current | Proposed |
|---|---|---|---|
| block#6 (WORD_EXAMPLE חַי) | transcription | `chay` | `khay` |
| block#7 (BOLD_TEXT, explains חַי) | content | `chay` (×2) | `khay` |
| block#9 (SIMPLE_TEXT, closing recap) | content | `chay` | `khay` |
| exercise#1742226699542 | tip, choices[1], correctAnswer | `chay` / `[chay]` | `khay` / `[khay]` |
| exercise#1742226699544 | content, tip | `chay` | `khay` |
| exercise#1742226699550 | tip | `cha`, `chay` | `kha`, `khay` |

## Tsadi (lesson 18, slug `tsadi`) — words חֵפֶץ (objet), חֶבֶל (corde), בִּטָּחוֹן (confiance)

| Where | Field | Current | Proposed |
|---|---|---|---|
| block#10 (WORD_EXAMPLE חֵפֶץ) | transcription | `chefets` | `khefets` |
| block#11 (BOLD_TEXT, explains חֵפֶץ) | content | `che-fets`, `che` | `khe-fets`, `khe` |
| block#13 (SIMPLE_TEXT, pronunciation practice) | content | `bi-ta-chon`, `che-vel` | `bi-ta-khon`, `khe-vel` |
| block#15 (WORD_EXAMPLE בִּטָּחוֹן) | transcription | `bitachon` | `bitakhon` |
| exercise#1742225842271 | tip | `che-fets` | `khe-fets` |
| exercise#1742225842278 | tip | `che-fets` | `khe-fets` |
| exercise#1742225842281 | tip | `che-vel` | `khe-vel` |

## Qof (lesson 19, slug `qof`) — words לֶחֶם (pain), בֶּטַח (bien sûr)

| Where | Field | Current | Proposed |
|---|---|---|---|
| block#11 (SIMPLE_TEXT, pronunciation practice) | content | `lechem`, `betach` | `lekhem`, `betakh` |
| block#12 (WORD_EXAMPLE לֶחֶם) | transcription | `lechem` | `lekhem` |
| block#16 (WORD_EXAMPLE בֶּטַח) | transcription | `betach` | `betakh` |
| exercise#1742225924866 | tip | `le-chem` | `le-khem` |

## Resh (lesson 20, slug `resh`) — word חָלָב (lait/milk)

| Where | Field | Current | Proposed |
|---|---|---|---|
| block#14 (WORD_EXAMPLE חָלָב) | transcription | `chalav` | `khalav` |

## Shin (lesson 21, slug `shin`) — word שָׂמֵחַ (heureux/happy, final Het)

| Where | Field | Current | Proposed |
|---|---|---|---|
| block#7 (BOLD_TEXT, explains שָׂמֵחַ) | content | `sa-me-ach` | `sa-me-akh` |

## Not affected

Aleph, Bet, Gimel, Dalet, Vav, Zayin, Kaf (already correct), Lamed, Mem,
Nun, Samekh, Ayin, Pe, Tav: no guttural-ח/כ "ch" transliteration found in
their current FR snapshots (checked against the same 2026-10-19 FR
import run used for Chet).
