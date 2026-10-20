# Zayin (lesson 7) editorial review

Reviewed against the pinned raw snapshot
`.local/alphabet-course-imports/v1/2026-10-19T14-27-01-990Z-cc446f/raw/lesson-7.raw.json`,
SHA-256 `3d5c6d89505da34302a33b4effe86bd95e178651fdeb3627761d5849cf474b2a`. Checked
against `docs/hebrew-alphabet-editorial-rules.md`.

| # | Original | Problem | Correction | Confidence | Decision |
| - | -------- | ------- | ---------- | ---------- | -------- |
| 1 | Exercise 0 choices (ז, ר, נ, וֹ) for "find the letter Zayin" | Distractors include letters not yet introduced (Resh, Nun). | Flagged `unintroduced-letters` (sourceIndex 0 → key "1"), not blocking (matches Aleph/Bet/Gimel/Dalet/He/Vav precedent). | High | Applied (flag only, no text change) |

No vowel-length claims (Segol, Kamatz Gadol, Patah and Holam Male are all
named without "long"/"short"/"brief"); no absolute always/never
pronunciation claims; no dagesh-prefix-effect claim to check (Zayin itself
never takes a dagesh, and the lesson's two dagesh-less Bet references don't
assert a universal rule); no duplicate example blocks (זְבוּב "fly", זֶה
"this" and זֶה אַבָּא "This is Dad." are three distinct words/phrases); no
tokenized source audio URLs (all three `WORD_EXAMPLE` URLs are plain
Backblaze links with no access-token query string, and normalization drops
raw media fields regardless). True/False set has two False among four
(exercise 8, "Does Vav with Holam Male produce [vi]?"; exercise 10, "Does
Zayin represent [ts]?") — balance rule satisfied without changes. No
`TEXT_IMAGE` blocks, so no illustration descriptions needed. All 11 study
blocks and 14 exercises are supported types; nothing held out.

EN keeps the raw source's closing `SUBTITLE` text "Conclusions" as written
— it's correct English, not a calque; only the FR raw source's literal
"Conclusions" needed renaming (see the FR review).

## Owner decisions needed

None. The one flag above is cosmetic and matches the established
unintroduced-letters pattern; no text, answer-key or structural change is
needed anywhere in this lesson.
