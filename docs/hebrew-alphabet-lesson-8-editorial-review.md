# Chet (lesson 8) editorial review

Reviewed against the pinned raw snapshot
`.local/alphabet-course-imports/v1/2026-10-19T14-27-01-990Z-cc446f/raw/lesson-8.raw.json`,
SHA-256 `065bf7a4a925a386204620959285b0ff41c7ac3928b60a15b7bcfee64dc841d0`. Checked
against `docs/hebrew-alphabet-editorial-rules.md`.

| # | Original | Problem | Correction | Confidence | Decision |
| - | -------- | ------- | ---------- | ---------- | -------- |
| 1 | Block 2 (`STRIPED_BLOCK`): the furtive-Patah explainer ("Usually, a vowel is read after its consonant… The ending is [ach].") | Unsupported study block type: `StudyBlock.astro` has no `STRIPED_BLOCK` renderer. | Held out (`holdOuts.blocks`, sourceIndex 2). The concept is still taught self-contained in the tips of exercises 2 and 15 (sourceIndex 1 and 14) and exercise 8's tip. | High | Applied (holdout) |
| 2 | Exercises 5, 6 and 15 (sourceIndex 4, 5, 14): distractors חול, חן, סַ, ת, עֲ | Distractors use letters not yet introduced (Lamed, Nun, Samekh, Tav, Ayin). | Flagged `unintroduced-letters`, not blocking (Aleph–Zayin precedent). | High | Applied (flag only, no text change) |
| 3 | Meta description, 159 characters including niqqud | Over the 155-character meta limit. | "example words like" → "words like" (151). | High | Applied (rule: SEO meta length) |
| 4 | Block 5: "Final Chet (ח) supplies [ch]." | "Final" here means word-final, but this course also teaches the five final letter forms (ך ם ן ף ץ); Chet has no final form, so "Final Chet" can read as one. | "Chet at the end of the word (ח) supplies [ch]." | Medium | Applied (owner decision 2026-10-23; now rule "Final means a final form") |

No vowel-length claims (Kamatz Gadol and Patah are both "[a]", Segol "[e]";
nothing says long/short/brief). No absolute always/never claims: block 1
already hedges the sound as "in common modern Hebrew pronunciation". No
dagesh-prefix claim (Chet never takes a dagesh). No duplicate example blocks
(אָח "brother" and חַג "holiday" are distinct). No tokenized audio URLs (plain
Backblaze links, and normalization drops raw media regardless). True/False set
has two False among three (exercise 3, "same sound as the h in 'hat'?";
exercise 12, "sound like [k] in 'kite'?"). No `TEXT_IMAGE` blocks. The raw
source's closing "Conclusions" heading is correct English and stays, as in
Zayin.

Exercises 2 and 15 ask the same furtive-Patah question with different
distractors; that's two practice items on one concept, not a duplicate
example block, so both stay.

`STRIPED_BLOCK` also appears in the unpublished raw lessons 12, 13, 15, 17, 18
and 21 (7 lessons including this one). Recommended separate task: a
`STRIPED_BLOCK` renderer, after which Chet's block 2 can be restored by
dropping the holdout and re-normalizing.

## Owner decisions (resolved 2026-10-23)

1. **"Final Chet"** (row 4): approved; applied via `contentOverrides.blocks["5"]`
   and added to `docs/hebrew-alphabet-editorial-rules.md`.
2. **Publish with the furtive-Patah explainer held out** (row 1): approved;
   the block returns with the `STRIPED_BLOCK` renderer task.
