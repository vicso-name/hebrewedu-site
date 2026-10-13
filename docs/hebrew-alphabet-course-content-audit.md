# HebrewEdu alphabet course — import, recovery and content audit

Completed 2026-10-11. All work is local and unpublished. This continues the existing Semantic Core v2 initiative; no keyword research or SEO dataset changes were made.

All 21 remaining details were recovered successfully. Together with the reused Aleph snapshot, the import contains **22 lessons, 362 study blocks and 319 exercises**. Identity/order and list/detail counts pass for every lesson. **Sixteen lessons pass the source schema; six retain 11 genuinely empty records and fail it.** Schema validity is separate from renderer compatibility and editorial approval. All 22 lessons require editorial review; no imported lesson is approved for publication.

## Recovery and integrity

The complete run is **`.local/alphabet-course-imports/v1/2026-10-11T12-04-00-552Z-a1dbcc/`**, fetched at 12:04:00–12:04:07 UTC on 2026-10-11. Its state is `complete-raw-import`: one anonymous list GET, 21 anonymous detail GETs (IDs 2–22), and ID 1 reused from `.local/lesson-snapshots/lesson-1.raw.json`. Recovery made **zero API requests** and did not overwrite any raw response or existing audit snapshot.

- All **23 response files** (list plus 22 details) match their SHA-256 provenance and byte counts, parse as valid UTF-8/JSON without duplicate object keys, and have no remaining temporary files.
- The explicit owner manifest matches SHA-256 `20521e78580146ee94bfafc4b391bb8bfcd5832943300852c8b446d4f547e3c8`. Every ID and order matches it. Lesson 4 is Dalet (ד); this is settled owner evidence, not an open identity issue.
- Latest audit: `audit-v1-595de65ea735/validation.json`. Its importer, validator, JSON parser, editorial registry and manifest hashes match the current tools.
- Complete private review envelope: `audit-v1-595de65ea735/course-import.snapshot.v1.json`. All 22 source arrays and mappings were revalidated against the saved raw responses. It contains 16 normalization candidates; malformed lessons retain their full normalized source and blocking issues with a null candidate.
- `snapshotEnvelopeValidated: true` means the container is valid. **`allLessonContentValid: false` remains mandatory.** A fully valid `course-content.snapshot.v1.json` was deliberately withheld, not lost or corrupted.
- The earlier run `2026-10-11T12-03-43-784Z-78d7b3` is a failed sandbox DNS preflight, with manifest/state only. It is incomplete, has no complete source snapshot, and was not reused. Earlier diagnostic audit versions remain retained; the latest pointer selects the corrected schema/classification audit.
- Human course-wide report and importer README were unfinished at interruption and have now been completed. No corrupt response files were found.

The new, non-overwriting recovery records are [recovery-validation.json](../.local/alphabet-course-imports/v1/2026-10-11T12-04-00-552Z-a1dbcc/recovery-2026-10-11T12-46-55-453Z/recovery-validation.json), [regression-validation.json](../.local/alphabet-course-imports/v1/2026-10-11T12-04-00-552Z-a1dbcc/recovery-2026-10-11T12-46-55-453Z/regression-validation.json) and [test-validation.tap](../.local/alphabet-course-imports/v1/2026-10-11T12-04-00-552Z-a1dbcc/recovery-2026-10-11T12-46-55-453Z/test-validation.tap). The first includes every checksum, complete media URL inventory, exact field references, source exercise IDs and readiness statuses. They remain private local assets.

## Source contract and count validation

The list is a top-level unpaginated array of 22 items; no pagination Link header was exposed. List fields are id, title, description, category, order, studyMaterialsCount and exercisesCount. Details expose id, title, description, category, order, studyMaterials and exercises. Titles are the generic “Lesson N”; letter/slug identity comes from the explicit owner manifest. No access-tier or user/account fields were exposed in these snapshots. Anonymous reachability does not establish redistribution rights.

All 22 IDs and all 22 order values are distinct, 1–22. Every detail matches its list item and both reported counts. All 319 exercise IDs are unique within their lessons (also distinct across this snapshot). Every exercise has a recognized shape and a structurally valid answer mapping. No unknown types or unreviewed extra fields remain in the current snapshots. None of these checks proves linguistic correctness.

### Full inventory and overlapping readiness

T = **Technically compatible** with the existing Aleph presentation; R = **Requires renderer development**; E = **Requires editorial review**; M = **Blocked by malformed source data**. Statuses overlap. T does not grant publication approval. All listed counts include withheld, ambiguous and empty source records.

| ID / order | Letter | Slug | Title | Study blocks | Exercises | Images / audio | Source schema | Readiness |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | א | `aleph` | Lesson 1 | 11 | 14 | 3 / 0 | Pass | T, E |
| 2 | ב | `bet` | Lesson 2 | 20 | 13 | 2 / 4 | Pass | R, E |
| 3 | ג | `gimel` | Lesson 3 | 9 | 12 | 0 / 2 | Pass | R, E |
| 4 | ד | `dalet` | Lesson 4 | 10 | 13 | 0 / 2 | Pass | R, E |
| 5 | ה | `he` | Lesson 5 | 18 | 14 | 0 / 3 | Fail | R, E, M |
| 6 | ו | `vav` | Lesson 6 | 16 | 13 | 0 / 3 | Fail | R, E, M |
| 7 | ז | `zayin` | Lesson 7 | 11 | 14 | 0 / 3 | Pass | R, E |
| 8 | ח | `chet` | Lesson 8 | 10 | 15 | 0 / 2 | Pass | R, E |
| 9 | ט | `tet` | Lesson 9 | 10 | 12 | 0 / 2 | Pass | R, E |
| 10 | י | `yod` | Lesson 10 | 10 | 16 | 0 / 2 | Pass | R, E |
| 11 | כ | `kaf` | Lesson 11 | 16 | 16 | 1 / 3 | Pass | R, E |
| 12 | ל | `lamed` | Lesson 12 | 17 | 16 | 0 / 7 | Pass | R, E |
| 13 | מ | `mem` | Lesson 13 | 14 | 16 | 1 / 3 | Pass | R, E |
| 14 | נ | `nun` | Lesson 14 | 26 | 15 | 1 / 8 | Fail | R, E, M |
| 15 | ס | `samekh` | Lesson 15 | 19 | 14 | 2 / 3 | Pass | R, E |
| 16 | ע | `ayin` | Lesson 16 | 19 | 16 | 0 / 8 | Pass | R, E |
| 17 | פ | `pe` | Lesson 17 | 23 | 16 | 2 / 3 | Fail | R, E, M |
| 18 | צ | `tsadi` | Lesson 18 | 21 | 15 | 0 / 8 | Fail | R, E, M |
| 19 | ק | `qof` | Lesson 19 | 19 | 13 | 0 / 8 | Pass | R, E |
| 20 | ר | `resh` | Lesson 20 | 19 | 16 | 0 / 8 | Pass | R, E |
| 21 | ש | `shin` | Lesson 21 | 24 | 15 | 2 / 8 | Pass | R, E |
| 22 | ת | `tav` | Lesson 22 | 20 | 15 | 0 / 4 | Fail | R, E, M |

Total: **362 / 319 / 14 images / 94 audio references**. Every lesson's two content counts match the list. Lessons 2–22 all contain WORD_EXAMPLE and need a web presentation beyond Aleph. Six failed schemas are He, Vav, Nun, Pe, Tsadi and Tav.

## Full type inventory and web compatibility

| Study type | Count | Observed fields | Renderer work |
| --- | --- | --- | --- |
| `MAIN_TITLE` | 22 | content: nonempty text | Existing heading mapping |
| `SIMPLE_TEXT` | 88 | content: nonempty text | Existing paragraph mapping |
| `TEXT_IMAGE` | 14 | content, imageUrl, description | Existing provisional Aleph glyph mapping is lesson-specific; nine caption/image-only blocks need explicit meaningful image/caption support after approval |
| `BOLD_TEXT` | 62 | content: nonempty text | Existing emphasis mapping |
| `SUBTITLE` | 60 | content: nonempty text | Existing subheading mapping |
| `WORD_EXAMPLE` | 94 | word, transcription, translation, audioUrl | New word/transcription/translation component; approved optional audio player |
| `TITLE_IMAGE` | 6 | content in these records; no image field exposed | All six are empty placeholders; no usable example from which to infer a populated image contract |
| `STRIPED_BLOCK` | 11 | content: nonempty text | New restrained instructional callout component |
| `ITEMS_LIST` | 5 | content in these records; no item array exposed | All five are empty placeholders; populated list contract needs a reviewed source example |

| Exercise type | Count | Observed answer structure | Renderer work |
| --- | --- | --- | --- |
| TRUE_FALSE | 90 | additionalData.correctAnswer is the literal string true or false | Existing component; parse explicitly, never Boolean("false") |
| MULTIPLE_CHOICE_COLUMN | 91 | 3 nonempty choices; correctAnswer identifies exactly one normalized choice | Existing component; preserve stable source option mapping |
| MULTIPLE_CHOICE_GRID | 92 | 81 four-choice and 11 three-choice records; key maps exactly once | Existing Aleph contract assumes four; generalize validated choice count without inventing a fourth choice |
| MATCH_PAIRS | 46 | additionalData.pairs object; all 46 contain three unique left/right pairs (138 pairs) | New keyboard-accessible pairing, feedback and approved per-question grading rubric |

No exercise source-schema errors were found. Correct keys and pair targets are retained unchanged. Structural uniqueness does not catch two semantically correct choices (Shin Q9). Every source score is zero, so it cannot be used as a weighting/maximum score. The current Aleph self-assessment behavior is unchanged; define a future matching-question scoring rubric explicitly before enabling that type.

The 11 valid three-choice GRID records are **L16 Q6; L17 Q14; L18 Q6/Q10; L19 Q5/Q10; L20 Q5/Q6/Q10/Q16; L22 Q9**. Exact paths and source IDs are in the editorial register. No padded choices were created.

## Empty records versus meaningful image/caption blocks

B and Q numbers below are one-based source positions. JSON paths are zero-based. Study blocks have no source IDs; lesson ID plus array index is their exact reference. Exercise references additionally include their original source IDs.

### Eleven genuinely empty placeholders

| Lesson | Block | Exact source field | Type | Classification |
| --- | --- | --- | --- | --- |
| 5 — he | B6 | `$.studyMaterials[5].content` | `TITLE_IMAGE` | Empty content; no usable image, caption, item list or other payload |
| 5 — he | B8 | `$.studyMaterials[7].content` | `TITLE_IMAGE` | Empty content; no usable image, caption, item list or other payload |
| 6 — vav | B3 | `$.studyMaterials[2].content` | `TITLE_IMAGE` | Empty content; no usable image, caption, item list or other payload |
| 6 — vav | B5 | `$.studyMaterials[4].content` | `TITLE_IMAGE` | Empty content; no usable image, caption, item list or other payload |
| 14 — nun | B6 | `$.studyMaterials[5].content` | `ITEMS_LIST` | Empty content; no usable image, caption, item list or other payload |
| 14 — nun | B10 | `$.studyMaterials[9].content` | `ITEMS_LIST` | Empty content; no usable image, caption, item list or other payload |
| 17 — pe | B13 | `$.studyMaterials[12].content` | `TITLE_IMAGE` | Empty content; no usable image, caption, item list or other payload |
| 18 — tsadi | B4 | `$.studyMaterials[3].content` | `TITLE_IMAGE` | Empty content; no usable image, caption, item list or other payload |
| 22 — tav | B8 | `$.studyMaterials[7].content` | `ITEMS_LIST` | Empty content; no usable image, caption, item list or other payload |
| 22 — tav | B12 | `$.studyMaterials[11].content` | `ITEMS_LIST` | Empty content; no usable image, caption, item list or other payload |
| 22 — tav | B16 | `$.studyMaterials[15].content` | `ITEMS_LIST` | Empty content; no usable image, caption, item list or other payload |

All 11 source records remain in both raw and review snapshots. They are classified as empty placeholders, rather than instructional text. A future learner normalization may omit these classified records with an explicit, versioned omission decision and source-index provenance; no rendering omission or source correction was performed in this recovery. Until that reviewed transformation exists, the strict source schema continues to block promotion of these six lessons. A missing TITLE_IMAGE payload must not be repaired by guessing an asset.

### Nine meaningful image/caption blocks

| Lesson | Block | Record path | Source caption | Treatment |
| --- | --- | --- | --- | --- |
| 11 — kaf | B4 | `$.studyMaterials[3]` | Kaf Sofit | Preserve caption + image URL; body alone is empty; media approval and renderer mapping pending |
| 13 — mem | B3 | `$.studyMaterials[2]` | Mem-sofit | Preserve caption + image URL; body alone is empty; media approval and renderer mapping pending |
| 14 — nun | B3 | `$.studyMaterials[2]` | Nun Sofit | Preserve caption + image URL; body alone is empty; media approval and renderer mapping pending |
| 15 — samekh | B5 | `$.studyMaterials[4]` | On this screen you see the letter Alef, decorated with Hiriq. Hiriq is represented by a dot underneath the letter. This is Hiriq Haser. | Preserve caption + image URL; body alone is empty; media approval and renderer mapping pending |
| 15 — samekh | B8 | `$.studyMaterials[7]` | When Hiriq is Male, it is followed by the letter Yud, which serves as the 'mother of reading' and does not produce its own sound. | Preserve caption + image URL; body alone is empty; media approval and renderer mapping pending |
| 17 — pe | B6 | `$.studyMaterials[5]` | Without the Dagesh, Pey is pronounced as [f]. This is the soft or fricative form of the letter. | Preserve caption + image URL; body alone is empty; media approval and renderer mapping pending |
| 17 — pe | B9 | `$.studyMaterials[8]` | When the Pey has a Dagesh inside it, it is pronounced as a hard [ p ] sound. | Preserve caption + image URL; body alone is empty; media approval and renderer mapping pending |
| 21 — shin | B3 | `$.studyMaterials[2]` | When Shin has a dot (dagesh) on its right branch, it represents the [sh] sound, similar to the English "sh" in "she" or "shoe." This sound is classified as a voiceless postalveolar fricative. | Preserve caption + image URL; body alone is empty; media approval and renderer mapping pending |
| 21 — shin | B6 | `$.studyMaterials[5]` | When a dot appears above the left branch of this letter, it represents the [s] sound, similar to the English "s" in "see" or "sun." This sound is classified as a voiceless alveolar fricative. | Preserve caption + image URL; body alone is empty; media approval and renderer mapping pending |

These nine TEXT_IMAGE records are structurally usable and **are not empty placeholders**. Their description and imageUrl are nonempty. They must become meaningful image/caption blocks after media accuracy/reuse approval, with reviewed textual equivalents. The private candidate preserves all fields; it does not manufacture body text from the caption or discard the block. None of their images has been published.

## Media inventory and publication safeguards

There are **108 distinct URLs: 14 image references (.png) and 94 WORD_EXAMPLE audio references (.mp3)**. All lessons 2–22 contain audio URLs; Aleph exposes no audio. Extensions are URL observations, not verified MIME types. Five images and 93 audio references are on Backblaze; nine images and one audio reference use Firebase. The ten Firebase URLs include token parameters and are access capabilities; full URLs are retained only in the private inventory, not this report or deployment output.

No image/audio file, HEAD response or playback was fetched during import or recovery. Reachability, missing/404 assets, pronunciation accuracy, duration, MIME, decoding, image dimensions and reuse rights therefore remain **unverified**, not “passed.” None supplies license/revision/dimension/duration metadata. Every lesson with media needs a reviewed media/text equivalence decision before publishing it. A word's transcription/translation provides supporting text, but does not itself certify the audio.

Image descriptions are missing at **L1 B3/B5/B7** and **L2 B3/B10**; exact field paths are in the automatic register. The six TITLE_IMAGE placeholders have no image URLs at all. Those missing payloads are separate from the 14 actual image references.

The private recovery media array lists each lesson, exact field path, original URL, host, inferred extension, caption presence, token flag and unverified metadata. Approval should yield controlled, rights-cleared public assets and reviewed equivalents. Do not publish raw capability URLs.

## English localization: Cyrillic phonetic labels

**30 pair-target fields in ten exercises across nine lessons** contain Cyrillic characters in the English API response. These are not translated or normalized into Latin notation. Each row below identifies the exact object key and original target. All are under the indicated exercise's additionalData.pairs object.

| Lesson | Question | Source exercise ID | Exact source field | Original value |
| --- | --- | --- | --- | --- |
| 10 — yod | Q3 | `1742226699537` | `$.exercises[2].additionalData.pairs.ב` | `[б]` |
| 10 — yod | Q3 | `1742226699537` | `$.exercises[2].additionalData.pairs.ד` | `[д]` |
| 10 — yod | Q3 | `1742226699537` | `$.exercises[2].additionalData.pairs.י` | `[й]` |
| 10 — yod | Q15 | `1742226699549` | `$.exercises[14].additionalData.pairs.(זָ) + Kamatz` | `[за]` |
| 10 — yod | Q15 | `1742226699549` | `$.exercises[14].additionalData.pairs.(יָ) + Kamatz` | `[йа]` |
| 10 — yod | Q15 | `1742226699549` | `$.exercises[14].additionalData.pairs.(בָּ) + Kamatz` | `[ба]` |
| 11 — kaf | Q16 | `1742226816230` | `$.exercises[15].additionalData.pairs.(יַ) + Segol` | `[йэ]` |
| 11 — kaf | Q16 | `1742226816230` | `$.exercises[15].additionalData.pairs.(בֶּ) + Segol` | `[бэ]` |
| 11 — kaf | Q16 | `1742226816230` | `$.exercises[15].additionalData.pairs.(כֶּ) + Segol` | `[кэ]` |
| 12 — lamed | Q16 | `1742226982605` | `$.exercises[15].additionalData.pairs.(גַ) + Patah` | `[га]` |
| 12 — lamed | Q16 | `1742226982605` | `$.exercises[15].additionalData.pairs.(טַ) + Patah` | `[та]` |
| 12 — lamed | Q16 | `1742226982605` | `$.exercises[15].additionalData.pairs.(יַ) + Patah` | `[йа]` |
| 13 — mem | Q16 | `1742227089049` | `$.exercises[15].additionalData.pairs.(זַ) + Patah` | `[за]` |
| 13 — mem | Q16 | `1742227089049` | `$.exercises[15].additionalData.pairs.(יַ) + Patah` | `[йа]` |
| 13 — mem | Q16 | `1742227089049` | `$.exercises[15].additionalData.pairs.(מַ) + Patah` | `[ма]` |
| 15 — samekh | Q3 | `1742227303445` | `$.exercises[2].additionalData.pairs.מ` | `[м]` |
| 15 — samekh | Q3 | `1742227303445` | `$.exercises[2].additionalData.pairs.ס` | `[с]` |
| 15 — samekh | Q3 | `1742227303445` | `$.exercises[2].additionalData.pairs.ת` | `[т]` |
| 16 — ayin | Q4 | `1742225632175` | `$.exercises[3].additionalData.pairs.עִ` | `[ и ]` |
| 16 — ayin | Q4 | `1742225632175` | `$.exercises[3].additionalData.pairs.עֶ` | `[ э ]` |
| 16 — ayin | Q4 | `1742225632175` | `$.exercises[3].additionalData.pairs.עַ` | `[ а ]` |
| 19 — qof | Q12 | `1742225924868` | `$.exercises[11].additionalData.pairs.ף` | `[ ф ]` |
| 19 — qof | Q12 | `1742225924868` | `$.exercises[11].additionalData.pairs.צ` | `[ ц ]` |
| 19 — qof | Q12 | `1742225924868` | `$.exercises[11].additionalData.pairs.ק` | `[ к ]` |
| 20 — resh | Q7 | `1742226024448` | `$.exercises[6].additionalData.pairs.רִ` | `[ ри ]` |
| 20 — resh | Q7 | `1742226024448` | `$.exercises[6].additionalData.pairs.רֶ` | `[ рэ ]` |
| 20 — resh | Q7 | `1742226024448` | `$.exercises[6].additionalData.pairs.רַ` | `[ ра ]` |
| 22 — tav | Q4 | `1742226369537` | `$.exercises[3].additionalData.pairs.פ` | `[ ф ]` |
| 22 — tav | Q4 | `1742226369537` | `$.exercises[3].additionalData.pairs.ת` | `[ т ]` |
| 22 — tav | Q4 | `1742226369537` | `$.exercises[3].additionalData.pairs.שׁ` | `[ ш ]` |

The affected lessons are **Yod (10), Kaf (11), Lamed (12), Mem (13), Samekh (15), Ayin (16), Qof (19), Resh (20) and Tav (22)**. The English phonetic notation and some letter/mark labels need an approved localization pass; automatically transliterating these answer targets would alter the exercise meaning and grading mappings.

## Ambiguous answers and exact publication blockers

### Definite Shin grading ambiguity

- Lesson **21 — Shin**, question **9**, source exercise ID **1742226179410**, `$.exercises[8]`, MULTIPLE_CHOICE_GRID.
- Original question: **“Which letter is NOT in the word (שֵׁם)?”**
- Original ordered choices: **Mem; Shin; Lamed; Alef**.
- Original key: **Lamed**. Original explanation: “The word (שֵׁם) consists of Shin (שׁ) and Mem (ם).”
- **Lamed and Alef are both absent**. The source single-answer key cannot validly distinguish them. Require an approved replacement question/choice set/key and revalidation before Shin publication. No choice was selected, removed or corrected during this import.

### Per-lesson editorial requirements

This table contains **23 manually triaged findings** with exact source record paths and exercise IDs. These are review requirements, not authorized corrections. All source excerpts remain unchanged in the checksum-bound private editorial registry. Broader pronunciation, analogy, metadata and pedagogical flags are retained in the [complete automatic review register](hebrew-alphabet-course-review-register.md). That register gives every automatic finding's lesson and exact record reference, rather than treating these summaries as the full issue list.

| Lesson | Issue | Exact source references |
| --- | --- | --- |
| 1 — aleph | The existing POC holds on Q4/Q11/Q14, vowel-length, silence and Hataf examples remain. Import adds no approval. | Q4 `$.exercises[3]` (ID `1742106507820`)<br>Q11 `$.exercises[10]` (ID `1742106507827`)<br>Q14 `$.exercises[13]` (ID `1742106507830`)<br>B6 `$.studyMaterials[5]`<br>B7 `$.studyMaterials[6]`<br>B9 `$.studyMaterials[8]` |
| 2 — bet | B7 calls the vowel in בָּא Kamatz, while B16 calls the same printed vowel Patah. The Bet-at-word-start/end absolute rules and Q7/Q9 need exception review. | B7 `$.studyMaterials[6]`<br>B8 `$.studyMaterials[7]`<br>B16 `$.studyMaterials[15]`<br>Q7 `$.exercises[6]` (ID `1742223546102`)<br>Q9 `$.exercises[8]` (ID `1742223546104`) |
| 3 — gimel | Q12 pairs Patah with short [a] and Kamatz Gadol with long [a:]; approve one course-wide pronunciation tradition and prerequisite scope. | Q12 `$.exercises[11]` (ID `1742223642489`) |
| 4 — dalet | B3 presents four-dimensional symbolism as Jewish tradition without attribution. B10 promises progress tracking; future web copy must not imply mobile/cloud synchronization. Identity is confirmed Dalet and is not re-investigated. | B3 `$.studyMaterials[2]`<br>B10 `$.studyMaterials[9]` |
| 5 — he | Tsere is compared with English they and described as longer/more emphasized than Segol; review dialect/notation scope. Q14 final-He silence needs qualification. | B7 `$.studyMaterials[6]`<br>B9 `$.studyMaterials[8]`<br>Q14 `$.exercises[13]` (ID `1742223805481`) |
| 6 — vav | Review the Vav-only Holam Male/Shuruk rule against the distinction from Holam Haser, the always-final-Bet-[v] key in Q4, the unmatched opening quote in B2 and word/audio variants. | B2 `$.studyMaterials[1]`<br>B4 `$.studyMaterials[3]`<br>B7 `$.studyMaterials[6]`<br>Q4 `$.exercises[3]` (ID `1742223897669`) |
| 7 — zayin | B2 claims ancient Zayin was closer to ts or dz and Q11 tests it as fact; require a source/reviewer decision. Word block B8 and Q14 spell father differently from the explanatory B9. | B2 `$.studyMaterials[1]`<br>B8 `$.studyMaterials[7]`<br>B9 `$.studyMaterials[8]`<br>Q11 `$.exercises[10]` (ID `1742223990049`)<br>Q14 `$.exercises[13]` (ID `1742223990052`) |
| 8 — chet | B3/Q2/Q15 teach final-Chet Patah reversal as a broad rule; approve phonetic notation, exceptions and teaching sequence. | B3 `$.studyMaterials[2]`<br>Q2 `$.exercises[1]` (ID `1742224241368`)<br>Q15 `$.exercises[14]` (ID `1742224241383`) |
| 9 — tet | Approve the Tet/tikkun-olam association, probably gloss for בֶּטַח and h/ch transcription consistency; Q10 includes an unpointed Tet label followed by + Kamatz. | B3 `$.studyMaterials[2]`<br>B7 `$.studyMaterials[6]`<br>B8 `$.studyMaterials[7]`<br>Q10 `$.exercises[9]` (ID `1742224380228`) |
| 10 — yod | B3 claims Yud is approximately 11% of all Hebrew texts without a corpus/source. Q3 has Cyrillic values and assigns unpointed Bet a b-like value, conflicting with prior teaching. Word חַי is glossed live but Q10 expects life; approve context. | B3 `$.studyMaterials[2]`<br>B7 `$.studyMaterials[6]`<br>Q3 `$.exercises[2]` (ID `1742226699537`)<br>Q10 `$.exercises[9]` (ID `1742226699544`)<br>Q15 `$.exercises[14]` (ID `1742226699549`) |
| 11 — kaf | B10 says כּוֹכָב has three letters and renders kohav, while Q4 selects ko-khav; count/spelling/transcription need reconciliation. Q16 labels pointed Yud with Patah as + Segol and uses Cyrillic targets. Review final-Kaf sound conditions. | B10 `$.studyMaterials[9]`<br>B12 `$.studyMaterials[11]`<br>B14 `$.studyMaterials[13]`<br>Q4 `$.exercises[3]` (ID `1742226816218`)<br>Q6 `$.exercises[5]` (ID `1742226816220`)<br>Q16 `$.exercises[15]` (ID `1742226816230`) |
| 12 — lamed | B6 says final Bet in לֵב makes [b], while the same paragraph and Q13 use [v]. Q6 calls the printed Tsere in לֵב Segol. Q12 selects lu-la for לוּלָאָה while the word block uses lula'a. Q3 assigns unpointed Bet [b]. | B6 `$.studyMaterials[5]`<br>B11 `$.studyMaterials[10]`<br>Q3 `$.exercises[2]` (ID `1742226982592`)<br>Q6 `$.exercises[5]` (ID `1742226982595`)<br>Q12 `$.exercises[11]` (ID `1742226982601`)<br>Q13 `$.exercises[12]` (ID `1742226982602`) |
| 13 — mem | Q3 assigns unpointed Bet [b], contrary to the prior Dagesh teaching. Q16 has Cyrillic phonetic values. Review the short/unstressed Hiriq explanation in B6 and progression of final forms. | B6 `$.studyMaterials[5]`<br>Q3 `$.exercises[2]` (ID `1742227089036`)<br>Q16 `$.exercises[15]` (ID `1742227089049`) |
| 14 — nun | B2 asks learners to avoid a strong nasal quality for Nun; require articulation review. The source varies between handsome and pleasant/beautiful for נָאֶה; approve an English gloss and transcription. | B2 `$.studyMaterials[1]`<br>B16 `$.studyMaterials[15]`<br>B17 `$.studyMaterials[16]`<br>Q8 `$.exercises[7]` (ID `1742227232532`) |
| 15 — samekh | B13 says final Bet in סָבִיב is [b] while its own transcription ends [v]. Q3 uses Cyrillic values. Review Hiriq Male/Haser terminology and depiction, especially what changes spelling versus sound. | B4 `$.studyMaterials[3]`<br>B13 `$.studyMaterials[12]`<br>Q3 `$.exercises[2]` (ID `1742227303445`) |
| 16 — ayin | Ayin is taught/tested as silent while Q14 recognizes guttural dialects; approve target tradition. B6 calls the mark on Ayin in כּוֹעֵס Segol but the printed mark is Tsere. Q4 uses Cyrillic vowel targets. | B2 `$.studyMaterials[1]`<br>B6 `$.studyMaterials[5]`<br>Q1 `$.exercises[0]` (ID `1742225632172`)<br>Q4 `$.exercises[3]` (ID `1742225632175`)<br>Q8 `$.exercises[7]` (ID `1742225632179`)<br>Q14 `$.exercises[13]` (ID `1742225632185`) |
| 17 — pe | The striped example B7 contains שָֹפָה, while B8 discusses שָׂפָה; marks differ and must not be silently replaced. B11 glosses פּוֹעַל as verb, while later lesson 18 B19/Q9 use worker. Approve regular/final Pey sound and Dagesh scope in Q2/Q16. | B7 `$.studyMaterials[6]`<br>B8 `$.studyMaterials[7]`<br>B11 `$.studyMaterials[10]`<br>Q2 `$.exercises[1]` (ID `1742225742308`)<br>Q16 `$.exercises[15]` (ID `1742225742322`) |
| 18 — tsadi | B19/Q9 call פּוֹעַל worker, but lesson 17 B11 calls the same form verb. Q6 offers tsa-yi-d and tza-yi-d: choose and explain the transliteration convention rather than grade equivalent spellings arbitrarily. Approve Tsadi historical/doubling claims. | B3 `$.studyMaterials[2]`<br>B19 `$.studyMaterials[18]`<br>Q6 `$.exercises[5]` (ID `1742225842274`)<br>Q9 `$.exercises[8]` (ID `1742225842277`)<br>Q15 `$.exercises[14]` (ID `1742225842283`) |
| 19 — qof | B8 spells the guinea-pig word differently from word block B7 and describes dageshed Bet as [b] while the result says ka-vya. Word block B15 has a stray apostrophe after הֶגֶה. Q13 tests speculative pictographic origin as fact. | B3 `$.studyMaterials[2]`<br>B7 `$.studyMaterials[6]`<br>B8 `$.studyMaterials[7]`<br>B15 `$.studyMaterials[14]`<br>Q13 `$.exercises[12]` (ID `1742225924869`) |
| 20 — resh | B2/B3 and Q12 present rolling/trilling and historical-versus-modern assertions; approve the pronunciation tradition and evidence. Q7 includes Cyrillic targets. | B2 `$.studyMaterials[1]`<br>B3 `$.studyMaterials[2]`<br>Q7 `$.exercises[6]` (ID `1742226024448`)<br>Q12 `$.exercises[11]` (ID `1742226024453`) |
| 21 — shin | Q9 asks which letter is NOT in שֵׁם. Both Lamed and Alef are absent; the single source key chooses Lamed. This is a definite source-internal grading ambiguity requiring an approved replacement. | Q9 `$.exercises[8]` (ID `1742226179410`) |
| 21 — shin | B2/B3/B5/B15 call the Shin/Sin placement dot dagesh. Unicode encodes Shin Dot/Sin Dot separately from Dagesh. Q12 repeats the always-final-Bet-[v] assertion; approve wording and exceptions. | B2 `$.studyMaterials[1]`<br>B3 `$.studyMaterials[2]`<br>B5 `$.studyMaterials[4]`<br>B15 `$.studyMaterials[14]`<br>Q12 `$.exercises[11]` (ID `1742226179413`) |
| 22 — tav | Q12 labels אִ Hiriq Male despite no following Yud, conflicting with prior course teaching. Q4 uses Cyrillic values; word תִיק omits the Dagesh present in B7. B20 promises Lesson 23 basic Hebrew, outside this 22-lesson course scope. | B7 `$.studyMaterials[6]`<br>B20 `$.studyMaterials[19]`<br>Q4 `$.exercises[3]` (ID `1742226369537`)<br>Q12 `$.exercises[11]` (ID `1742226369545`) |

The Shin/Sin terminology flag is supported by the distinct Unicode characters: U+05BC HEBREW POINT DAGESH OR MAPIQ, U+05C1 HEBREW POINT SHIN DOT, and U+05C2 HEBREW POINT SIN DOT. This confirms a terminology distinction; it does not authorize rewriting the lesson. [Unicode Hebrew chart](https://www.unicode.org/charts/PDF/U0590.pdf).

### Additional quality and normalization findings

The latest validator records **11 structural errors and 551 automatic review flags**, plus the 23 manual findings above. The 551 include renderer, media and generic approval flags; they are not 551 confirmed linguistic errors. Pronunciation heuristics identify review candidates, not authoritative corrections.

- Approve a consistent pronunciation tradition, vowel-length notation, English analogies, consonant articulation and final-form exceptions. Exact affected fields for every automatic pronunciation flag appear in the register, alongside manual cross-record contradictions above. No uncertain claim was silently rewritten.
- All TRUE_FALSE keys are true in lessons **1, 2, 13, 15, 20, 21, 22**. This is a pedagogical imbalance, not proof each key is wrong. No strong answer-position bias was detected under the validator's threshold.
- Nine duplicate-study-text flags include eight repeated empty bodies/placeholders plus **Bet B6/B15**, repeated בָּא word examples with differing English glosses. They are preserved. **Ayin Q2/Q7** reuse the same matching prompt for different pair sets; this is not a duplicate exercise ID. The register contains exact flags and IDs.
- **190 string/key paths** would change under normalization; **121** contain Hebrew presentation forms. The raw bytes are unchanged. The candidate normalizer decomposes Hebrew presentation forms selectively, then uses NFC for text values; it does not change vowel identities or spelling. No replacement-character/unpaired-surrogate or embedded-bidi-control issues were found in this snapshot. NFC and compatibility normalization have different semantics. [Unicode normalization standard](https://www.unicode.org/reports/tr15/).
- Source object keys remain intact so normalized pair-label collisions cannot erase a record. Candidate pair arrays use stable IDs; collision detection rejects ambiguous normalized mappings. Niqqud is retained. Existing Aleph Rubik and RTL behavior were not changed or reinterpreted by this import.

## Completed tooling and safeguards

[Importer usage and recovery instructions](../scripts/alphabet-course/README.md) describe the explicit commands and contracts. New tooling is isolated from website code:

| File | Purpose |
| --- | --- |
| scripts/import-alphabet-course.mjs | Fixed anonymous GET allowlist, immutable new raw run, provenance, offline versioned audit, fail-closed content promotion |
| scripts/alphabet-course/owner-letter-map.v2.json | Preserved explicit owner identity/slug manifest copied from existing Semantic Core v2 |
| scripts/alphabet-course/json.mjs | Strict UTF-8/JSON parser rejecting duplicate keys before parsing can erase source fields |
| scripts/alphabet-course/validate.mjs | Full observed source contracts; identities/counts/answers/Unicode/media/editorial heuristics; private candidate/review-envelope validation |
| scripts/alphabet-course/editorial-findings.v1.json | Unchanged source excerpts and checksum-bound manual review flags |
| scripts/alphabet-course/recover.mjs | Non-overwriting offline checkpoint integrity and saved-validation replay; timestamped private recovery report |
| scripts/alphabet-course/README.md | Repeatable import/audit/recovery instructions and publication boundaries |
| tests/alphabet-course-import.test.mjs | Ten source-integrity, schema, answer-mapping, classification and private-envelope tests |
| docs/hebrew-alphabet-course-content-audit.md | This completed recovery/content audit |
| docs/hebrew-alphabet-course-review-register.md | Every automatic issue with exact lesson/path/exercise reference |

Private files created include 23 raw responses and 23 provenance files, run state and manifest, retained audit versions, the complete latest review snapshot and recovery/regression/test records. No raw data, answer-key object or editorial report was placed in public/. The existing .local ignore and development filesystem-denial rules remain intact.

## Validation results

- **17 tests passed, zero failures**: ten importer/source-validation tests and seven existing Aleph tests. Coverage includes invalid/unknown structures, strict JSON, identity/count mismatch, explicit boolean parsing, normalized choices/pairs, preserving three-option grids, Unicode, empty versus caption/image classification, malformed-record preservation and rejecting publication in the review envelope. Recovery separately replayed every saved lesson audit and validated all candidates against raw sources.
- The **normal production build passed** (28 Astro pages; 31 HTML files including game assets) and **opt-in local POC build passed** (29 Astro pages). Both ran with a lesson-API request guard installed; neither invoked the importer/API. Existing build logs remain in /private/tmp/alphabet-course-normal-build.log and /private/tmp/alphabet-course-local-build.log.
- Existing artifact regression check passed: **215 original production artifacts are byte-identical**. Existing Aleph-only JS/CSS/Rubik assets remain additional normal-build assets from the pre-import POC; there is no newly generated course route. Homepage, blog, games, sitemap and existing public links are unchanged.
- Additional recovery output scanning found **no imported media URL, raw/review snapshot, hub route, or lesson 2–22 route/link** in either output. The ordinary production output also excludes Aleph; the local output retains noindex and the 11-block/14-record POC with three held questions.
- **184 pre-import local file checksums and 139 research-workspace file checksums matched**. The approved Aleph source, visual design, flow, grading, editorial holds and Semantic Core v1/v2 deliverables are unchanged. No repeat layout/browser tests were necessary for this script/document-only recovery; the existing POC regression tests and output checks passed.

Raw authenticity is verified against locally recorded provenance, not a server signature. Aleph is the earlier approved snapshot, while IDs 2–22 and the list were fetched later; mixed-age provenance is explicit. Media and comprehensive expert linguistic correctness remain unverified. Structural approval must never be inferred from anonymous access, hashes, test success or a valid review envelope.

## Release scope and safe scaling recommendation

Today's intended scope remains **/learn/hebrew-alphabet/** and **/learn/hebrew-alphabet/aleph/**, subject to separate editorial/release approval. The hub is deliberately **not implemented**. No new lesson has been published or enabled for a normal production build. Aleph retains Q4 (1742106507820), Q11 (1742106507827), Q14 (1742106507830) editorial holds, disputed source wording remains withheld, and source images remain unapproved. Its existing 11 graded questions and three held slots are unchanged. Approve replacement wording or explicitly approve a release with documented holds before proceeding; this audit supplies no such approval. See the [existing Aleph editorial report](hebrew-alphabet-lesson-1-editorial-review.md).

For a later authorized implementation:

1. Resolve the exact source/editorial issues in the tables and register; record corrections/replacements as reviewed, versioned decisions without altering raw evidence. Use explicit omission decisions for classified empty placeholders; preserve meaningful caption/image blocks.
2. Extend the existing lesson schema/components for WORD_EXAMPLE, STRIPED_BLOCK, accessible MATCH_PAIRS and variable choice counts. Do not create a parallel lesson system or infer populated TITLE_IMAGE/ITEMS_LIST contracts from empty examples. Map stages using retained source indexes, and retain approved Aleph typography, restrained palette and four-stage behavior.
3. Validate reviewed asset MIME/availability, Hebrew depiction/audio accuracy, text equivalents, licenses and hosting before exposing media. Require editorial and component tests per lesson, including normalized marks and keyboard/mobile pairing behavior.
4. Promote only reviewed web-normalized content through a separate explicit route/publication allowlist. Keep imports independent from builds; lessons 2–22 stay excluded from routes, sitemap, navigation and indexing until individually approved. Reuse existing Semantic Core v2 URL/intent research for future metadata; do not regenerate it.
5. Release at most **three new lessons per week**. Enforce that ceiling against a separate approved release record, not import timestamps. The remaining 21 imports grant no permission to publish, redirect, create placeholders or deploy.

**Unresolved:** linguistic/editorial sign-off for all lessons; six placeholder-normalization/source blockers; Shin Q9 ambiguity; English localization of Cyrillic fields; component support beyond Aleph; media accuracy/rights/availability; separate hub/Aleph publication approval. There are no unresolved transport or snapshot-integrity blockers. Import and audit are complete; implementation and publication await the next instruction.
