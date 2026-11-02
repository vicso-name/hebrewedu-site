# Nun (lesson 14) editorial review

Reviewed against the pinned raw snapshot
`.local/alphabet-course-imports/v1/2026-10-19T14-27-01-990Z-cc446f/raw/lesson-14.raw.json`,
SHA-256 `f4c8027b2bceefeb3e207083c0d49aa3bada0223ed4610f7181bbc563bf18581`. Checked
against `docs/hebrew-alphabet-editorial-rules.md`.

| # | Original | Problem | Correction | Confidence | Decision |
| - | -------- | ------- | ---------- | ---------- | -------- |
| 1 | Block 0 (`MAIN_TITLE`): "Mastering Nun (נ) and Building Your Hebrew Vocabulary" | The H1 and title need the title pattern. | `title` "Nun Hebrew Letter (נ): Sound & Final Nun (Nun Sofit)" (52 characters), which covers "nun sofit" (70) and "final nun hebrew letter". H1 via `contentOverrides.blocks["0"]` "Nun Hebrew Letter (נ): Sound, Final Nun & Practice". | High | Applied (rule: title pattern) |
| 2 | Block 2 (`TEXT_IMAGE`, caption "Nun Sofit") has an empty body | The normalized block fails closed without text. | The body is block 3's own two sentences, verbatim (`contentOverrides.blocks["2"]`). Illustration: ן, "Nun Sofit", "Final Nun: Nun stretched into a long straight stroke that drops below the line, used at the end of a word." | High | Applied (rule: empty image body) |
| 3 | Block 3 (`SIMPLE_TEXT`): the same two Nun Sofit sentences | With row 2, keeping it prints the same text twice in the theory step. | Held out, with the reason "text moved, not dropped". | High | Applied (rule: empty image body; no duplicate blocks) |
| 4 | Block 12: "the final Hey has no separate [h] sound here" | He has no final form. | "Hey at the end of the word has no separate [h] sound here." | High | Applied (rule: "final" means a final form) |
| 5 | Block 14: "Read each word aloud, then press play to compare your pronunciation with the recording." | The web lesson has no audio (source audio is never carried through), so there is no play button. | "Read each word aloud." The rest of the block is unchanged. | High | Applied (Lamed precedent: its "hit the play button" block was held out for the same reason) |
| 6 | Exercise 2's tip (sourceIndex 1): "Nun-Sofit (ן) is the final form of Nun (נ) and appears only at the end of words." | The prompt limits the claim to "ordinary modern Hebrew writing"; the tip drops that limit, so prompt and tip don't agree on the claim's strength. "Nun-Sofit" is also spelled differently from the rest of the lesson. | "In ordinary modern Hebrew writing, Nun Sofit (ן), the final form of Nun (נ), appears only at the end of a word." | High | Applied (rule: always/never, prompt and tip agree) |
| 7 | Exercise 3 (`MATCH_PAIRS`, sourceIndex 2): ת → [t] | Tav is not introduced until lesson 22. The pairs data can't be patched. | Kept and flagged `unintroduced-letters` (Mem precedent). The learner can match it by elimination, and the tip names Tav. | Medium | Applied (flag) |
| 8 | Stage map heuristic `theory: [0,1]`, `examples: [2..21]` | This would open the examples step on the Nun Sofit figure. | `theory: [0,1,2]` with section headings "How Nun sounds" (block 1) and "Nun’s final form" (block 2's figure). `examples: [4..21]` (3 is held out): the "Key Takeaway" subtitle and its text open the examples step, so each heading stays in the same step as its content. | High | Applied |

No vowel-length claims. Block 5's "Patah and Kamatz Gadol both represent
[a]…; you do not need to make one longer than the other" rules out a length
contrast in both directions, so it stays. No uncaveated always/never:
"Only five Hebrew letters have a special final form" is a plain fact, and
exercise 2 is limited to ordinary modern Hebrew writing. No dagesh-prefix
claim (Nun is not a Bet/Kaf/Pe letter). True/False: exercise 5 already keys
False (exercises 2, 9 and 13 key True). No duplicate example blocks: eight
distinct words (גַּן, נָא, נָאֶה and five reading-practice words); מַיִם also
appears in the Mem lesson, which is a different lesson. No tokenized audio
URLs. Block 1's articulation note (tongue tip on the ridge behind the upper
teeth, air through the nose) accurately describes [n] and is not a tradition
claim, so it stays. "Alef" and "Hey" are app spellings and stay. The lesson
doesn't name Chet, so the [ch]/[kh] bridge rule doesn't apply; block 14
explains kh on its own. "Nun Sofit adds the final [n]" (block 8) stays: Nun
Sofit is a real final form (Mem precedent kept "the final [m]"). The closing
"Conclusions" heading stays (EN precedent). Exercises 10 and 14's "means
'…' in Hebrew/English" stay (Mem precedent).

All three `MATCH_PAIRS` have three pairs, and `derangedPairOrder` leaves no
item in its own row.

**Recommended separate task:** the "press play / compare with the recording"
instruction is also in the raw sources of lessons 16, 18, 19, 20, 21 and 22.
A course rule would let each of them drop it the same way (owner decision 1).

## Owner decisions needed

1. **New course rule: no audio instructions.** Add to
   `docs/hebrew-alphabet-editorial-rules.md`: "The web lesson has no audio.
   Drop source instructions to press play or compare with a recording, and
   hold the block out if that is all it says." Recommended: yes.

Resolved 2026-11-02: approved. The "No audio instructions" rule is added to
`docs/hebrew-alphabet-editorial-rules.md`.
