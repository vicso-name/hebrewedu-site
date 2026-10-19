# Vav (lesson 6) editorial review

Reviewed against the pinned raw snapshot
`.local/alphabet-course-imports/v1/2026-10-11T12-04-00-552Z-a1dbcc/raw/lesson-6.raw.json`,
SHA-256 `db69b04a2407039a503d599b2301f8d417a7c62ec92694fac1b64d0f4694b68f`. Checked
against `docs/hebrew-alphabet-editorial-rules.md`.

| # | Original | Problem | Correction | Confidence | Decision |
| - | -------- | ------- | ---------- | ---------- | -------- |
| 1 | Exercise 1 tip: "Holam Male is a dot placed above Vav, indicating a **long** [o] sound, similar to the [o] in the English word 'goat.'" | Vowel-length claim; also drifts from the lesson's own 'no' analogy (block 3/exercise 1 content both use 'no'). | Removed "long" and aligned the analogy: "Holam Male represents the [o] sound, similar to the [o] in the English word 'no.'" | High | Applied (rule: vowel length) |
| 2 | Exercise 5 tip: "Shuruk (וּ) is a vowel mark that produces the **long** [u] sound, similar to the English word 'moon.'" | Vowel-length claim. | Removed "long": "Shuruk (וּ) is a vowel mark that produces the [u] sound, similar to the English word 'moon.'" | High | Applied (rule: vowel length) |
| 3 | Exercise 8 tip: "Patah represents the **short** [a] sound. When combined with Vav (וַ), it produces [va]." | Vowel-length claim. | Removed "short": "Patah represents the [a] sound. When combined with Vav (וַ), it produces [va]." | High | Applied (rule: vowel length) |
| 4 | Exercise 3 content: "The letter Bet (ב) at the end of a word is **always** pronounced as [v]...." | Absolute "always" claim on word-final Bet, which the course already treats as "usually"/"almost always" elsewhere (Bet's own lesson 2, exercise 8: "Word-final Bet is almost always pronounced [v]"). The exercise's own tip here already hedges with "usually," so content and tip disagreed. | Changed "always" to "usually": "The letter Bet (ב) at the end of a word is usually pronounced as [v], like in the English word 'vase.'" | High | Applied (rule: no absolute always/never; matches Bet lesson 2 precedent) |
| 5 | Block 12 (`WORD_EXAMPLE`, 'hook') and block 13 (`BOLD_TEXT`) both describe the first Vav with a **Patach** (וַו, [va]). Exercise 7 content/tip instead describe the same word as **וָו** with a **Kamatz**. | Contradiction inside the lesson: the exercise names a different vowel sign under the first Vav than the word-example and its breakdown already established (and `contentOverrides.blocks` for `WORD_EXAMPLE` can only patch `translation`, not the word/transcription text, so the word+breakdown pair is the fixed anchor). | Rewrote the exercise to match the established Patach spelling: content "How do you pronounce the Hebrew word for 'hook' (וַו)?"; tip "The Hebrew word 'וַו' (vav) consists of two Vav letters. The first Vav has a Patach (ַ), producing the [va] sound, while the second Vav is pronounced [v]." | High | Applied (rule: contradiction inside the lesson) |
| 6 | Exercise 0 choices (נ, ס, ו, ר) for "find the letter Vav" | Distractors include letters not yet introduced (Nun, Samekh, Resh). | Flagged `unintroduced-letters`, not blocking (matches Aleph/Bet/Gimel/Dalet/He precedent). | High | Applied (rule: unintroduced-letters flag, no text change) |
| 7 | Exercise 9 choices (ת, וּ, ה, ן) for "which letter makes the [u] sound" | Distractors include letters not yet introduced (Tav, final Nun). | Flagged `unintroduced-letters`. | High | Applied (rule: unintroduced-letters flag, no text change) |
| 8 | Study blocks 2 and 4: `TITLE_IMAGE`, both with empty `content` and no title/image URL. | Unsupported block type — `StudyBlock.astro` has no `TITLE_IMAGE` renderer — and both are empty regardless. | Held out (`holdOuts.blocks`, sourceIndex 2 and 4). | High | Applied — holdout, no renderer needed for this content |
| 9 | Study block 6: `STRIPED_BLOCK`, "Listen up! Shuruk and Holam Male are unique..." | Unsupported block type — `StudyBlock.astro` has no `STRIPED_BLOCK` renderer. | Held out (`holdOuts.blocks`, sourceIndex 6). | High | Applied — holdout, no renderer exists |

No other vowel-length or absolute-rule violations found; no duplicate example
blocks (דוֹב "bear", דוּד "boiler", וַו "hook" are three distinct words); no
tokenized source audio URLs (all three `WORD_EXAMPLE` URLs are plain
Backblaze links with no access-token query string, and normalization drops
raw media fields regardless); True/False set already has one False among
four (exercise 11, "Does Vav with Shuruk produce the [o] sound?", answer
false) — balance rule satisfied without changes.

## Unsupported block types: recommend separate tasks

`TITLE_IMAGE` appears (always empty) in He, Vav, Pe and Tsadi's raw sources —
already tracked as a recommended follow-up in He's editorial review
(`docs/hebrew-alphabet-lesson-5-editorial-review.md`); no new note needed
beyond adding Vav's two instances to that count.

`STRIPED_BLOCK` appears in 8 raw lessons total — Vav plus 7 unpublished
letters (Chet, Lamed, Mem, Samekh, Pe, Tsadi, Shin) — meeting the
3+-lessons threshold for a recommended follow-up task. Vav's instance is a
short "did you know" callout ("Shuruk and Holam Male are unique... they do
not appear with any other letter") with no other content lost by holding it
out; recommend a task to review the other 7 instances' actual content
before deciding whether a callout/highlight-box renderer is worth building,
the same way He's review deferred on `TITLE_IMAGE`.

## Owner decisions needed

None. All corrections above are rule-covered, high-confidence fixes already
applied in `src/data/lessons/vav.json`.
