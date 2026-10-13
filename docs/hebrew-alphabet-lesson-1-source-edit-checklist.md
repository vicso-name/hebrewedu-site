# Aleph — approved source-edit checklist

Prepared 2026-10-11. Status: **content approved; source changes not applied; website unchanged; lesson not published by this task.**

This package records the owner's approval of the preceding Modern Hebrew proposal and the two timing-free tips plus Theory clarification requested in the approval. The original [editorial review](./hebrew-alphabet-lesson-1-editorial-review.md) remains historical evidence of the source holds; its earlier approval status is superseded by this package. The website's current holds remain intact until a separately authorized source refresh and implementation.

## Package and preservation

- Source: Lesson 1, English, category alphabet-lc, 11 study blocks and 14 exercises.
- Original source file: [lesson-1.raw.json](/Users/kasutaja/Developer/web/hebrewedu-site/.local/lesson-snapshots/lesson-1.raw.json).
- Preserved original: [lesson-1.original.raw.json](/Users/kasutaja/Developer/web/hebrewedu-site/.local/source-corrections/aleph/v1/lesson-1.original.raw.json), byte-for-byte copy, read-only with the macOS user-immutable flag; no import snapshot is overwritten.
- SHA-256 of both originals: `0306e249dc168efd7d49e886553f7aa61733cb6ca26307c7cc0a07215b5999a7`.
- Machine-readable changes: [lesson-1.approved-changes.v1.json](/Users/kasutaja/Developer/web/hebrewedu-site/.local/source-corrections/aleph/v1/lesson-1.approved-changes.v1.json). Contains exact before/after values and dependencies; **not an editor Import JSON file or API write payload**.
- Offline verification: [verify-package.mjs](/Users/kasutaja/Developer/web/hebrewedu-site/.local/source-corrections/aleph/v1/verify-package.mjs). Run `node .local/source-corrections/aleph/v1/verify-package.mjs` from the website root. It simulates edits only in memory and performs no API calls or source writes.

## Existing editor: how to apply

These steps are verified against the local existing React lesson-editor implementation, not an authenticated inspection of the deployed UI. The deployed editor URL/version and current source values have not been checked. Use the owner's existing editor address; no write endpoint is guessed or called.

1. Open **Hebrew Learning Admin**, choose **EN**, open **Lessons**, and click **Edit** for Lesson 1. Confirm ID 1, Aleph description, category alphabet-lc and counts **11 materials / 14 exercises**. Do not create or import a lesson.
2. Compare every target's current content with the **Original** below before changing anything. If it differs, stop that edit and reconcile the newer source; do not overwrite it blindly. Study blocks have no IDs in this snapshot: locate them by the original source position, type and exact text. The editor does not number material rows, so count the ordered rows including title/subtitle blocks and confirm the text. Positions here are 1-based source positions, not guessed database IDs or display-order numbers.
3. **Before Q4:** inspect its existing language variants through the editor. Its key is shared across languages. Coordinate approved translated prompts/tips expressing the same False statement wherever variants exist. This package supplies only approved English text; it does not guess translations or confirm which variants exist. Do not flip a shared key while leaving old True statements in another language.
4. Apply **Study Materials** block 2, then blocks 6, 7 and 9: click the row's **Edit**, replace only **Content (en)** with the full replacement below, then click that row's **Update**. Keep its type, order, other text fields and Image URL unchanged. Preserve the paragraph break in block 2. Do not drag, add or delete rows.
5. In **Exercises**, use each numbered row's **Edit** and match its full prompt to the Original below. Confirm the source ID through the existing editor data if needed; the current row UI does not print exercise IDs. Change **Question (en)** and/or **Tip / Hint (en)** as listed. **For Q4 select “✗ False” and save question, tip and key together using Update.** For Q3/Q10/Q11/Q14 retain all existing option strings/order and selected answers; the editor re-sends choices and answer selection even for a tip-only edit, so check them before saving.
6. Save each edited row using **Update**, wait for it to close/refetch successfully, reopen it and check all edited fields and its answer selection. The top-level **Save** is for Basic Info translations; it does not save an open material/exercise edit form. Do not change Basic Info, category, order, publication toggle, audio generation or media. Do not use **Import JSON**: it is an exercise import workflow, not this correction manifest.
7. Confirm final counts **11 / 14**, all original exercise IDs and types, unchanged choices and every retained key. Only Q4 changes from string `"true"` to string `"false"`; Q11 stays `Hataf Patah`, Q14 stays `[a]`, Q3 stays `אָ` and Q10 stays `[a]`.
8. Record who applied the changes and when. On a later authorized source verification, obtain a new versioned Lesson 1 snapshot and compare it with this manifest; keep all original snapshots and receipts. Do not overwrite the approved POC JSON, relax source checksum guards, remove holds or publish in this step.

**Save behavior and release dependency:** each row Update saves source data immediately; there is no single whole-lesson Save or atomic draft staging in this editor flow. If the source is already published to the mobile/API audience, saving affects that audience even without an Astro deployment. Coordinate the owner's staging/maintenance process and the Q4 language transition before applying. Leave all publication controls unchanged. The English-only package does not resolve a coordinated multilingual Q4 update by itself.

## Exact edits

There are **13 field replacements across 9 existing records**. All choices, IDs, types, scores, media URLs and ordering are retained. All unlisted fields remain unchanged. Original text is copied exactly from the raw snapshot. Replacements preserve pointed Hebrew as NFC Unicode.

### Study block 2 — aleph-block-2

- Type: `SIMPLE_TEXT`.
- Answer key changes: **No**; this is a study block.

- [ ] Replace **Content (en)** — source pointer `/studyMaterials/1/content`.

**Original:**

> Hebrew uses a unique system of vowel markings to complement its consonants. Unlike languages where alphabet letters represent both consonants and vowels, Hebrew utilizes symbols called niqqud to indicate vowel sounds. These marks are placed above, below, or inside the consonants.

**Approved replacement:**

> Hebrew uses a unique system of vowel markings to complement its consonants. Unlike languages where alphabet letters represent both consonants and vowels, Hebrew utilizes symbols called niqqud to indicate vowel sounds. These marks are placed above, below, or inside the consonants.
> 
> This course teaches beginner Modern Hebrew pronunciation. Aleph (א) can represent a glottal stop—a brief catch in the throat—but it is often not pronounced in everyday Modern Hebrew. In this lesson, the vowel marks in אַ, אָ and אֲ indicate an ‘a’ vowel; you do not need to distinguish long, short or ‘ultra-short’ vowel timing.

**Theory/practice dependencies:** Retain the existing niqqud introduction and append this pronunciation scope within block 2; do not add a twelfth block. Teach this before Q4. It establishes the scope used by blocks 6/9 and Q3/Q10/Q11/Q14.

### Study block 6 — aleph-block-6

- Type: `BOLD_TEXT`.
- Answer key changes: **No**; this is a study block.

- [ ] Replace **Content (en)** — source pointer `/studyMaterials/5/content`.

**Original:**

> When Aleph is paired with a Kamatz Gadol, it shares the exact same [a] sound—like the "a" in "father."

**Approved replacement:**

> In the Modern Hebrew pronunciation taught here, Kamatz Gadol in אָ indicates an ‘a’ vowel, like Patah in אַ. This lesson does not distinguish long and short ‘a’ vowels.

**Theory/practice dependencies:** Depends on the Modern Hebrew scope in block 2; keep Q3 tip consistent.

### Study block 7 — aleph-block-7

- Type: `TEXT_IMAGE`.
- Answer key changes: **No**; this is a study block.

- [ ] Replace **Content (en)** — source pointer `/studyMaterials/6/content`.

**Original:**

> The Hataf Patah is a combination of the Patah and a Sheva (two vertical dots). It appears as two vertical dots placed to the left of the horizontal line. Like other niqqud marks, it sits directly beneath a consonant.

**Approved replacement:**

> Hataf Patah appears below the letter. Its shape combines a horizontal line with two vertically arranged dots beside it, as shown in אֲ.

**Theory/practice dependencies:** Teach the shape before Q11; image URLs and media approvals remain unchanged.

### Study block 9 — aleph-block-9

- Type: `BOLD_TEXT`.
- Answer key changes: **No**; this is a study block.

- [ ] Replace **Content (en)** — source pointer `/studyMaterials/8/content`.

**Original:**

> When Aleph is paired with a Hataf Patah, it is pronounced with a short [a] sound—just like the "a" in the English word "sofa."

**Approved replacement:**

> In the Modern Hebrew pronunciation taught here, Hataf Patah in אֲ indicates an ‘a’ vowel, like Patah in אַ. No special short-vowel timing is required in this lesson.

**Theory/practice dependencies:** Depends on block 2 scope; keep Q11/Q14 explanations consistent.

### Question 3 — ID 1742106507819

- Type: `MULTIPLE_CHOICE_GRID`.
- Answer key changes: **No**; retained key: `אָ`.
- Key storage: English: ExerciseTranslation.i18n_data.correct_answer.
- Retained choices: `צֵ`, `גַ`, `מֻ`, `אָ`.

- [ ] Replace **Tip / Hint (en)** — source pointer `/exercises/2/tip`.

**Original:**

> Kamatz Gadol appears as a small 'T'-like symbol. When applied to the letter Alef (אָ), it produces the long [a:] sound, like in the English word 'father.'

**Approved replacement:**

> Kamatz Gadol appears as a small 'T'-like symbol. In the Modern Hebrew pronunciation taught here, the vowel in אָ is ‘a’, like Patah in אַ. No long-vowel timing is required in this lesson.

**Theory/practice dependencies:** Depends on block 6; question, choices and correct answer אָ remain unchanged.

### Question 4 — ID 1742106507820

- Type: `TRUE_FALSE`.
- Answer key changes: **Yes — "true" → "false"**; replacement key: `false`.
- Key storage: shared-across-languages: Exercise.static_data.correct_answer.
- Retained choices: True / False; no choices array in the source.

- [ ] Replace **Question (en)** — source pointer `/exercises/3/content`.

**Original:**

> The letter Alef has no inherent sound of its own; its pronunciation depends entirely on the surrounding niqqud marks.

**Approved replacement:**

> Aleph (א) is always silent in Modern Hebrew.

- [ ] Replace **Tip / Hint (en)** — source pointer `/exercises/3/tip`.

**Original:**

> That's true! Alef is completely silent on its own. Its actual sound comes from the vowel marks, though it can sometimes vary depending on the dialect or its position within a word.

**Approved replacement:**

> Aleph can represent a glottal stop—a brief catch in the throat—but it is often not pronounced in everyday Modern Hebrew. The vowel marks in אַ, אָ and אֲ indicate an ‘a’ vowel in the examples taught here.

- [ ] Replace **Correct answer selection** — source pointer `/exercises/3/additionalData/correctAnswer`.

**Original:**

> true

**Approved replacement:**

> false

**Theory/practice dependencies:** Teach block 2 before this question. Save prompt, tip and False selection together through the same Update action. The true/false key is shared across languages. Review and coordinate any existing translations before changing it; old affirmative statements must not be left graded False.

### Question 10 — ID 1742106507826

- Type: `MULTIPLE_CHOICE_GRID`.
- Answer key changes: **No**; retained key: `[a]`.
- Key storage: English: ExerciseTranslation.i18n_data.correct_answer.
- Retained choices: `[e]`, `[o]`, `[u]`, `[a]`.

- [ ] Replace **Tip / Hint (en)** — source pointer `/exercises/9/tip`.

**Original:**

> It makes a short [a] sound, just like the "a" in the English word "father" or "spa."

**Approved replacement:**

> Patah in אַ indicates an ‘a’ vowel in the Modern Hebrew pronunciation taught here. No short-vowel timing is required in this lesson.

**Theory/practice dependencies:** Depends on block 2 and the Patah example in block 4; question, choices and correct answer [a] remain unchanged.

### Question 11 — ID 1742106507827

- Type: `MULTIPLE_CHOICE_COLUMN`.
- Answer key changes: **No**; retained key: `Hataf Patah`.
- Key storage: English: ExerciseTranslation.i18n_data.correct_answer.
- Retained choices: `Holam Male`, `Suruk`, `Hataf Patah`.

- [ ] Replace **Question (en)** — source pointer `/exercises/10/content`.

**Original:**

> What is the name of the niqqud mark that makes an ultra-short [a] sound and looks like a horizontal line with two vertical dots beside it?

**Approved replacement:**

> Which vowel mark appears under Aleph in אֲ?

- [ ] Replace **Tip / Hint (en)** — source pointer `/exercises/10/tip`.

**Original:**

> That's the Hataf Patah! Think of it as a combination of a Patah (the line) and a Sheva (the two dots). It creates a super-quick, reduced [a] sound.

**Approved replacement:**

> Hataf Patah combines a horizontal Patah line with the two vertically arranged dots of Sheva. In the Modern Hebrew pronunciation taught here, אֲ has an ‘a’ vowel, like אַ. You do not need to pronounce it ‘ultra-short’.

**Theory/practice dependencies:** Teach blocks 7/9 before this question; retain all three choices and Hataf Patah as the selected answer. Holam Male and Suruk are retained verbatim; prerequisite/distractor review remains separate from this approved correction.

### Question 14 — ID 1742106507830

- Type: `MULTIPLE_CHOICE_GRID`.
- Answer key changes: **No**; retained key: `[a]`.
- Key storage: English: ExerciseTranslation.i18n_data.correct_answer.
- Retained choices: `[a]`, `[o]`, `[u]`, `[e]`.

- [ ] Replace **Question (en)** — source pointer `/exercises/13/content`.

**Original:**

> What sound does the letter Alef (אֲ) make when paired with a Hataf Patah?

**Approved replacement:**

> In the Modern Hebrew pronunciation taught here, which vowel sound is indicated in אֲ?

- [ ] Replace **Tip / Hint (en)** — source pointer `/exercises/13/tip`.

**Original:**

> It makes an ultra-short [a] sound. This is a "reduced" vowel, meaning it's pronounced much quicker than a regular Patah.

**Approved replacement:**

> Hataf Patah indicates an ‘a’ vowel here, like Patah in אַ. Recognize the different written mark; no special short-vowel timing is required in this lesson.

**Theory/practice dependencies:** Depends on block 9 and block 2 scope; retain all four choices and [a] as the selected answer.

## Owner completion checks

- [ ] Block 2 teaches Modern Hebrew scope and the possible glottal stop before Q4.
- [ ] Blocks 6/9 and Q3/Q10/Q11/Q14 consistently avoid required long/short/ultra-short vowel timing; block 7 no longer claims the dots are on the left.
- [ ] Q4 is selected False, and each existing translation agrees with that shared key.
- [ ] All 11 study blocks and 14 exercises remain; only 13 listed fields changed in English plus separately approved coordinated Q4 translations if needed.
- [ ] Q11 choices remain Holam Male / Suruk / Hataf Patah; Q14 choices remain [a] / [o] / [u] / [e].
- [ ] Original images remain outside the approved web media set; no source-image approval or new audio is implied.
- [ ] A future new snapshot is saved separately and source changes are verified before any website normalization/publication task.

## Remaining publication considerations

The owner approved the listed linguistic changes; they are not applied yet. Q4 cross-language coordination remains unresolved because no authenticated language inventory was obtained. Media accuracy/reuse and beginner suitability of unintroduced distractors remain separate review items. Block 4's “father” comparison is retained under the approved scope as an approximate English aid; no unrequested copy changes are included. Existing Aleph presentation holds, route gating and course publication flags remain unchanged.

## Editor evidence

- [Lessons list / Edit action](/Users/kasutaja/Developer/dashboards/hebrew-learning-admin/admin-panel/src/pages/Lessons.jsx:83) and [EN language selection](/Users/kasutaja/Developer/dashboards/hebrew-learning-admin/admin-panel/src/App.jsx:97).
- [Material Content (en) field](/Users/kasutaja/Developer/dashboards/hebrew-learning-admin/admin-panel/src/pages/LessonEdit.jsx:201); [material Update action](/Users/kasutaja/Developer/dashboards/hebrew-learning-admin/admin-panel/src/pages/LessonEdit.jsx:311).
- [Exercise Question / Tip / answer selectors](/Users/kasutaja/Developer/dashboards/hebrew-learning-admin/admin-panel/src/pages/LessonEdit.jsx:399); [exercise Update action](/Users/kasutaja/Developer/dashboards/hebrew-learning-admin/admin-panel/src/pages/LessonEdit.jsx:515).
- [Study Materials / Exercises rows](/Users/kasutaja/Developer/dashboards/hebrew-learning-admin/admin-panel/src/pages/LessonEdit.jsx:1003) and [Basic Info Save behavior](/Users/kasutaja/Developer/dashboards/hebrew-learning-admin/admin-panel/src/pages/LessonEdit.jsx:962).
- [Shared true/false key update; localized multiple-choice data](/Users/kasutaja/Developer/dashboards/hebrew-learning-admin/api/views.py:1737) and [public serialization of the shared key](/Users/kasutaja/Developer/dashboards/hebrew-learning-admin/api/serializers.py:119).

## Offline preparation validation

The package verifier checks the original checksum and read-only backup, unique identities, exact original values for all 13 replacements, 11/14 count retention, NFC replacement text, unchanged choices/keys except Q4, and preservation of every unlisted field through an in-memory simulation. Preparation also compares checksums of all pre-existing website source/public assets/scripts/tests/docs and local artifacts. Results are stored in the private package validation.json. No API calls, website normalization, production build, deployment, commits or pushes are performed by this preparation.
