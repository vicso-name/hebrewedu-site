# Aleph POC — Editorial Review

Updated 2026-10-11. This report is outside the learner interface and deployment assets.

The owner selected withholding disputed wording. The validated JSON and raw snapshot remain unchanged. No pronunciation corrections, replacement prompts, audio or source-image use have been approved.

## Learner presentation decisions

| Item | Learner presentation |
|---|---|
| Study block 6 | Displays “אָ — Aleph with Kamatz Gadol.”; original sound comparison withheld. |
| Study block 7 | Original description minus its disputed dot-position sentence; glyph/caption retained. |
| Study block 9 | Displays “אֲ — Aleph with Hataf Patah.”; original sofa/short-vowel claim withheld. |
| Question 3 explanation | Reuses the exact original study block 5 description of the T-shaped mark; original long-vowel explanation withheld. |
| Question 10 explanation | Reuses exact original study block 4 about Patah and [a], without introducing a short-vowel claim. |
| Questions 4, 11, 14 | Unavailable learner slots until replacement prompts/explanations are approved. Source records, option mapping and keys retained; keys excluded from learner grading payload. |

The 14-question inventory is retained, with 11 available questions. Unavailable questions are excluded from the percentage denominator and reported separately from learner skips. All five block types still render across Theory and Examples, with 11 source block IDs. Reorganization moves blocks 1/2/8 to Theory and 3/4/5/6/7/9/10/11 to Examples; the source array order is unchanged.

## Unchanged original wording withheld from learner copy

### Study block 6 — aleph-block-6

When Aleph is paired with a Kamatz Gadol, it shares the exact same [a] sound—like the "a" in "father."

Review flags: vowel-length

### Study block 7 — aleph-block-7

The Hataf Patah is a combination of the Patah and a Sheva (two vertical dots). It appears as two vertical dots placed to the left of the horizontal line. Like other niqqud marks, it sits directly beneath a consonant.

Review flags: provisional-media, hataf-position

### Study block 9 — aleph-block-9

When Aleph is paired with a Hataf Patah, it is pronounced with a short [a] sound—just like the "a" in the English word "sofa."

Review flags: hataf-sound

### Question 3 — source ID 1742106507819

Original prompt:

Which of the following Hebrew letters is marked with Kamatz Gadol?

Original explanation:

Kamatz Gadol appears as a small 'T'-like symbol. When applied to the letter Alef (אָ), it produces the long [a:] sound, like in the English word 'father.'

Original options: צֵ, גַ, מֻ, אָ

Original source answer: אָ

Review flags: vowel-length, unintroduced-letters

### Question 4 — source ID 1742106507820

Original prompt:

The letter Alef has no inherent sound of its own; its pronunciation depends entirely on the surrounding niqqud marks.

Original explanation:

That's true! Alef is completely silent on its own. Its actual sound comes from the vowel marks, though it can sometimes vary depending on the dialect or its position within a word.

Original options: True, False

Original source answer: True

Review flags: aleph-silence, true-false-balance

### Question 10 — source ID 1742106507826

Original prompt:

What sound does the letter Alef (אַ) make when paired with a Patah?

Original explanation:

It makes a short [a] sound, just like the "a" in the English word "father" or "spa."

Original options: [e], [o], [u], [a]

Original source answer: [a]

Review flags: vowel-length

### Question 11 — source ID 1742106507827

Original prompt:

What is the name of the niqqud mark that makes an ultra-short [a] sound and looks like a horizontal line with two vertical dots beside it?

Original explanation:

That's the Hataf Patah! Think of it as a combination of a Patah (the line) and a Sheva (the two dots). It creates a super-quick, reduced [a] sound.

Original options: Holam Male, Suruk, Hataf Patah

Original source answer: Hataf Patah

Review flags: hataf-sound

### Question 14 — source ID 1742106507830

Original prompt:

What sound does the letter Alef (אֲ) make when paired with a Hataf Patah?

Original explanation:

It makes an ultra-short [a] sound. This is a "reduced" vowel, meaning it's pronounced much quicker than a regular Patah.

Original options: [a], [o], [u], [e]

Original source answer: [a]

Review flags: hataf-sound

## Outstanding decisions

- **Vowel length needs review:** The source describes Kamatz Gadol as the same [a] as Patah, but a practice explanation calls it long [a:]. Confirm the pronunciation tradition and consistent vowel-length wording.
- **Hataf Patah sound needs review:** The source compares short [a] with the final vowel in “sofa” and elsewhere calls it ultra-short or reduced. A Hebrew reviewer should approve the English example and dialect scope.
- **Aleph explanation needs review:** The source says Aleph is completely silent and depends entirely on niqqud, then mentions dialect and word-position variation. Review this absolute claim before public use.
- **Mark placement needs review:** The source says the two dots are to the left of the horizontal line. Verify that description against the rendered Hataf Patah and an approved teaching diagram.
- **Illustration pending approval:** The original image is withheld until accuracy and reuse are approved. The Unicode form and written description provide a provisional textual equivalent.
- **Practice prerequisites need review:** Some choices use letters and marks not introduced in this lesson. The task is mark recognition, but those distractors need a beginner-teaching review.
- **Question balance needs review:** All five source true/false statements are marked true. Their original keys are preserved; review the balance before a public course.

Approve replacement wording for questions 4, 11 and 14, the pronunciation tradition, vowel-length explanations and the Hataf Patah example/diagram before restoring those passages. Original images remain withheld. No Lesson 1 audio exists in the source; no new audio capability is claimed.

## Preservation

- Raw snapshot SHA-256: `0306e249dc168efd7d49e886553f7aa61733cb6ca26307c7cc0a07215b5999a7`.
- Normalized JSON SHA-256: `3cda76ed4fff40a211f59b029b6076d4d19bf11f95526ceb66c087bf55078ec3`.
- Presentation changes live in `src/lib/lessons/presentation.mjs`; they do not replace the source or mutate keys.
- All 14 original keys continue to pass the source-contract grading tests. Three unavailable questions are intentionally not presented as approved teaching or graded learner content.
