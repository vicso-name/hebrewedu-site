# Dalet (lesson 4) editorial review

Reviewed against the pinned raw snapshot
`.local/alphabet-course-imports/v1/2026-10-11T12-04-00-552Z-a1dbcc/raw/lesson-4.raw.json`,
SHA-256 `dbf0b37de9f41a16684da47296963451f0d9fef590df6a8832339a049edbb7cf`. Checked
against `docs/hebrew-alphabet-editorial-rules.md`.

| # | Original | Problem | Correction | Confidence | Decision |
| - | -------- | ------- | ---------- | ---------- | -------- |
| 1 | Exercise 2 tip (0-indexed): "Patah represents a short [a] sound. When combined with Dalet (דַ), it produces [da], like in 'dance.'" | Vowel-length claim ("short [a]") — rule: remove length/duration claims, Patah is [a] in Modern Hebrew. | Removed "short": "Patah represents the [a] sound. …" | High | Applied (rule: vowel length) |
| 2 | Exercise 4 tip: "Patah represents a short [a] sound. When combined with Dalet (דַ), it produces [da]." | Same vowel-length claim. | Same fix. | High | Applied (rule: vowel length) |
| 3 | Exercise 8 tip: "Patah represents a short [a] sound. When combined with Dalet (דַ), it produces [da]." | Same vowel-length claim. | Same fix. | High | Applied (rule: vowel length) |
| 4 | Exercise 12 tip: "The vowel under the letter דַ is Patah, which produces a short [a] sound." | Same vowel-length claim. | Removed "short": "…which produces the [a] sound." | High | Applied (rule: vowel length) |
| 5 | Exercise 0 choices (ד, צ, נ, פּ) for "find the letter Dalet" | Distractors include letters not yet introduced (Tzadi, Nun, Pe with dagesh). | Flagged `unintroduced-letters`, not blocking (matches Aleph/Bet/Gimel precedent). | High | Applied (rule: unintroduced-letters flag, no text change) |
| 6 | Exercise 7 choices (עֲ, פֶּ, מֻ, גַ) for "which letter is marked with Hataf Patah" | Distractors/answer include letters not yet introduced (Ayin, Pe, Mem). | Flagged `unintroduced-letters`. | High | Applied (rule: unintroduced-letters flag, no text change) |
| 7 | Exercise 10 choices (ד, בּ, נ) for "which letter represents [d]" | Distractor includes a letter not yet introduced (Nun). | Flagged `unintroduced-letters`. | High | Applied (rule: unintroduced-letters flag, no text change) |

No absolute always/never claims found; no duplicate example blocks; no
tokenized source audio URLs (both `WORD_EXAMPLE` URLs are plain, untokenized
Backblaze links, and normalization drops all raw media fields regardless);
True/False set already includes one False (exercise 11, Gimel+Patah→[du],
answer false) alongside the two True statements — balance rule satisfied
without changes needed.

All study block and exercise types (`MAIN_TITLE`, `SIMPLE_TEXT`, `SUBTITLE`,
`WORD_EXAMPLE`, `BOLD_TEXT`; `MULTIPLE_CHOICE_GRID`, `TRUE_FALSE`,
`MULTIPLE_CHOICE_COLUMN`, `MATCH_PAIRS`) are supported by the existing
renderers — no holdouts needed.

## Owner decisions needed

None. All corrections above are rule-covered, high-confidence fixes already
applied in `src/data/lessons/dalet.json`.
