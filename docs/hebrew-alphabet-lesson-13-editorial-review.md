# Mem (lesson 13) editorial review

Reviewed against the pinned raw snapshot
`.local/alphabet-course-imports/v1/2026-10-19T14-27-01-990Z-cc446f/raw/lesson-13.raw.json`,
SHA-256 `2c9ab22c639be7d708dacad1c2bbd4549aad9c1a70953dcb2ab7be9ba545bd38`. Checked
against `docs/hebrew-alphabet-editorial-rules.md`.

| # | Original | Problem | Correction | Confidence | Decision |
| - | -------- | ------- | ---------- | ---------- | -------- |
| 1 | Block 0 (`MAIN_TITLE`): "Exploring Mem (מ) and Learning New Hebrew Words" | The H1 and title need the title pattern. | `title` "Mem Hebrew Letter (מ): Sound & Final Mem (Mem Sofit)" (52 characters), which covers "mem sofit" (110) and "final mem hebrew letter" (110). H1 via `contentOverrides.blocks["0"]` "Mem Hebrew Letter (מ): Sound, Final Mem & Practice". | High | Applied (rule: title pattern) |
| 2 | Block 2 (`TEXT_IMAGE`, caption "Mem Sofit (ם)") has an empty body | The audit flags `EMPTY_IMAGE_BODY_WITH_CAPTION`, and the raw schema rejected the whole lesson, even with the block held out. | Schema: a raw `TEXT_IMAGE` may now have an empty body. The normalized block still requires text, so it still fails closed without an override (new test in `tests/lesson-1.test.mjs`). The body is block 3's own Mem Sofit sentences (`contentOverrides.blocks["2"]`). The illustration is ם, "Mem Sofit", with the text "Final Mem: Mem closed at the bottom into a square shape, used at the end of a word." | High | Applied (missing image description; Nun has the same empty block) |
| 3 | Block 3 (`STRIPED_BLOCK`): Mem Sofit is the final form, has the same [m] sound, and the transcriptions are reading aids, not IPA | No renderer exists for this block type. | Held out. Its Mem Sofit sentences move to block 2 (row 2), so the theory step still teaches what exercises 2 and 5 test. The "reading aids, not IPA; hyphens separate syllables" note moves to `copy.examples.intro`. | High | Applied (holdout, Lamed precedent) |
| 4 | Block 6: "the hirik beneath it represents [i], like the vowel in English 'see', without requiring a long vowel" | This disclaimer rules out only "long", which can read as a hint that the vowel is short. | "…like the vowel in English 'see'; no special vowel length is required." This matches exercises 12 and 16 and the FR Lamed rule. | High | Applied (rule: vowel length) |
| 5 | Blocks 8 and 10, and exercise 6's tip: "Final Hey has no separate [h] sound" | He has no final form. | "Hey at the end of the word has no separate [h] sound." "Final Mem" in blocks 6 and 12 stays, because Mem Sofit is a real final form. | High | Applied (rule: "final" means a final form) |
| 6 | Block 12: "Chet gives the sound written kh here" | The Chet lesson writes this sound [ch]. | "Chet, written [ch] in the Chet lesson, gives the sound written kh here…" | High | Applied (rule: one sound, two transcriptions) |
| 7 | True/False: exercises 2, 5 and 12 all key True | No False answer in the set. | Exercise 5 (sourceIndex 4) now reads "Mem Sofit (ם) has a different sound from Mem (מ)." and keys False. Tip: "Mem Sofit (ם) changes shape, but it keeps the same [m] sound as Mem (מ)." This also fixes the source's inconsistent "Mem-sofit" spelling. | High | Applied (rule: ≥1 False, Bet Q9 pattern) |
| 8 | Exercise 7's tip (sourceIndex 6): "Each Hebrew word represents a common concept." | This tip explains nothing after a wrong match. | "לֶחֶם means 'bread', מַיִם means 'water', and לַמָּה means 'why'." | High | Applied (Lamed decision 2 precedent) |
| 9 | Exercise 3 (`MATCH_PAIRS`, sourceIndex 2): נ → [n] | Nun is not introduced until lesson 14. The pairs data can't be patched. | Kept and flagged `unintroduced-letters` (Lamed precedent). The learner can match it by elimination, and the tip names Nun. | Medium | Applied (flag) |
| 10 | Stage map heuristic `theory: [0,1]`, `examples: [2,4..14]` | This would open the examples step on the Mem Sofit figure. | `theory: [0,1,2]` with section headings "How Mem sounds" (block 1) and "Mem’s final form" (block 2's figure). `examples: [4..14]` (3 is held out). | High | Applied |

No other vowel-length claims. Exercise 12's tip and exercise 16's tip both say
"no special vowel length is required", which rules length out, so they stay. Block 10's "Kamatz…
also represents [a]" makes no length claim. No uncaveated always/never.
Exercise 2's "used only at the end of a word" is limited to "ordinary modern
Hebrew writing". No dagesh-prefix claim. Block 10 correctly says the dagesh
in לַמָּה's Mem does not require a doubled [m]. No duplicate example blocks:
there are four distinct words. No tokenized audio URLs. "Yud" (block 6) and "Hey"
(blocks 8, 10) are app spellings and stay, per the "App spelling vs SEO
spelling" rule. The closing "Conclusions" heading stays (EN precedent). Exercises 9 and 15's
"means '…' in Hebrew" is normal English and stays. Exercise 11 (אָבַד, a
review word with no Mem) is introduced by block 14 ("also review אָבַד") and
stays.

All four `MATCH_PAIRS` have three pairs, and `derangedPairOrder` leaves no
item in its own row.

**Recommended separate task (unchanged since Lamed):** `STRIPED_BLOCK` now
remains in lessons 15, 17, 18 and 21. Nun (lesson 14) has the same empty
Sofit `TEXT_IMAGE` as Mem. Row 2's schema change already covers it.

## Owner decisions needed

None blocking. Please confirm row 2 (the small raw-schema change, needed for
any lesson with an empty-body image block) and row 7 (exercise 5 flipped to
False).

Resolved 2026-10-28: both approved. Row 2's empty-image-body handling and
row 4's "rule out both sides" wording are added to
`docs/hebrew-alphabet-editorial-rules.md`.
