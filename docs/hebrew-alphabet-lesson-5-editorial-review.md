# Hey (lesson 5) editorial review

Reviewed against the pinned raw snapshot
`.local/alphabet-course-imports/v1/2026-10-11T12-04-00-552Z-a1dbcc/raw/lesson-5.raw.json`,
SHA-256 `3ccd553dde38c225dd7c476bc0f6489910e219902656de62aba72ca5933240db`. Checked
against `docs/hebrew-alphabet-editorial-rules.md`.

| # | Original | Problem | Correction | Confidence | Decision |
| - | -------- | ------- | ---------- | ---------- | -------- |
| 1 | Block 6: "Tsere consists of two horizontal dots (צֵ) placed beneath a letter. It produces an [e] sound, **often slightly longer or more emphasized than Segol**. Its pronunciation is similar to the [e] in 'they.'" | Vowel-length claim comparing Tsere's duration to Segol's — rule: remove length/duration claims, both are [e] in Modern Hebrew. | Removed the comparison: "…It produces an [e] sound, similar to the [e] in 'they.'" | High | Applied (rule: vowel length) |
| 2 | Exercise 3 tip: "Tsere represents the **long** [e] sound. When combined with Hey (הֵ), it produces [he], like in 'hey.'" | Vowel-length claim. | Removed "long": "Tsere represents the [e] sound. …" | High | Applied (rule: vowel length) |
| 3 | Exercise 12 tip: "Kamatz Gadol represents the **long** [a] sound. When the letter Hey (הָ) is marked with Kamatz Gadol, it produces [ha]." | Vowel-length claim. | Removed "long": "Kamatz Gadol represents the [a] sound. …" | High | Applied (rule: vowel length) |
| 4 | Exercise 0 choices (נ, פּ, ק, ה) for "find the letter Hey" | Distractors include letters not yet introduced (Nun, Pe with dagesh, Qof). | Flagged `unintroduced-letters`, not blocking (matches Aleph/Bet/Gimel/Dalet precedent). | High | Applied (rule: unintroduced-letters flag, no text change) |
| 5 | Exercise 8 choices (הֶ, בִ, קָ, עֲ) for "which letter is marked with a Segol" | Distractors include letters not yet introduced (Qof, Ayin). | Flagged `unintroduced-letters`. | High | Applied (rule: unintroduced-letters flag, no text change) |
| 6 | Study blocks 5 and 7: `TITLE_IMAGE`, both with empty `content` and no title/image URL. | Unsupported block type — `StudyBlock.astro` has no `TITLE_IMAGE` renderer — and the fields are empty regardless, so nothing is lost by holding them out. | Held out (`holdOuts.blocks`, sourceIndex 5 and 7). | High | Applied — holdout, no renderer needed for this content |

No absolute always/never claims found; no duplicate example blocks (דֶגֶל
"flag", חֶבֶל "rope", הֶגֶה "steering wheel" are three distinct words); no
tokenized source audio URLs (all three `WORD_EXAMPLE` URLs are plain
Backblaze links, and normalization drops raw media fields regardless);
True/False set already has one False among six (exercise 9, Hey+Segol→[ha],
answer false) — balance rule satisfied without changes.

Word-breakdown content (blocks 11 and 13) names Lamed and Chet — letters not
yet taught by lesson 5 — while spelling out דֶגֶל and חֶבֶל. This matches
existing precedent (e.g. Bet's lesson 2 names Lamed while spelling out
אֲבָל): the `unintroduced-letters` issue in this course has, by established
convention, applied only to exercise distractors, not to word-breakdown
narration — real Hebrew vocabulary unavoidably includes letters beyond
whatever has been formally taught so far. No change applied, consistent
with prior lessons.

## Unsupported block type: recommend a separate task

`TITLE_IMAGE` appears (always with empty content) in four unpublished
raw lessons: He (2), Vav (2), Pe (1), Tsadi (1) — meeting the 3+-lessons
threshold for a recommended follow-up. Since every instance found so far is
empty, the task should first confirm whether the source API ever actually
populates this type (title/image) before investing in a renderer; if it
never does, these holdouts can simply stay in place letter after letter.

## Owner decisions needed

None. All corrections above are rule-covered, high-confidence fixes already
applied in `src/data/lessons/he.json`.
