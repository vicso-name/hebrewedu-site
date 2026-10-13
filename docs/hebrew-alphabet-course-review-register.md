# Alphabet course — complete automatic review register

Generated 2026-10-11 from the recovered audit `audit-v1-595de65ea735`. This is an internal report, outside deployment assets. No source wording, answer or media URL is rewritten. See [the course audit](hebrew-alphabet-course-content-audit.md) for classification, manual findings and release boundaries.

There are 11 structural errors and 551 automatic review flags. A flag is a review requirement, not proof of a content error. B/Q positions are one-based; JSON paths are zero-based. Each exercise reference includes its exact original ID. Whole-lesson metadata/approval flags use the root path; raw media URLs and capability tokens are omitted here and retained in the private inventory.

## Lesson 1 — aleph (א)

| Severity / code | Record / source ID | Exact source path | Review requirement |
| --- | --- | --- | --- |
| review / `MISSING_IMAGE_DESCRIPTION` | B3 | `$.studyMaterials[2].description` | Image has no source textual description |
| review / `MISSING_IMAGE_DESCRIPTION` | B5 | `$.studyMaterials[4].description` | Image has no source textual description |
| review / `MISSING_IMAGE_DESCRIPTION` | B7 | `$.studyMaterials[6].description` | Image has no source textual description |
| review / `ONE_SIDED_TRUE_FALSE` | Whole lesson | `$.exercises` | All true/false answers have the same key; review learning quality, not a proof of wrong answers |
| review / `ENGLISH_SOUND_ANALOGY` | B4 | `$.studyMaterials[3].content` | Review English vowel/consonant analogies and dialect scope |
| review / `ENGLISH_SOUND_ANALOGY` | B6 | `$.studyMaterials[5].content` | Review English vowel/consonant analogies and dialect scope |
| review / `MARK_PLACEMENT` | B7 | `$.studyMaterials[6].content` | Verify mark-placement descriptions against pointed Hebrew |
| review / `VOWEL_LENGTH_OR_REDUCTION` | B9 | `$.studyMaterials[8].content` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `ENGLISH_SOUND_ANALOGY` | B9 | `$.studyMaterials[8].content` | Review English vowel/consonant analogies and dialect scope |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q3, ID 1742106507819 | `$.exercises[2].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `ENGLISH_SOUND_ANALOGY` | Q3, ID 1742106507819 | `$.exercises[2].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | Q4, ID 1742106507820 | `$.exercises[3].content` | Review absolute sound/silence rules and exceptions |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | Q4, ID 1742106507820 | `$.exercises[3].tip` | Review absolute sound/silence rules and exceptions |
| review / `ENGLISH_SOUND_ANALOGY` | Q5, ID 1742106507821 | `$.exercises[4].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `ENGLISH_SOUND_ANALOGY` | Q7, ID 1742106507823 | `$.exercises[6].content` | Review English vowel/consonant analogies and dialect scope |
| review / `ENGLISH_SOUND_ANALOGY` | Q7, ID 1742106507823 | `$.exercises[6].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `ENGLISH_SOUND_ANALOGY` | Q8, ID 1742106507824 | `$.exercises[7].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `ENGLISH_SOUND_ANALOGY` | Q9, ID 1742106507825 | `$.exercises[8].content` | Review English vowel/consonant analogies and dialect scope |
| review / `ENGLISH_SOUND_ANALOGY` | Q9, ID 1742106507825 | `$.exercises[8].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q10, ID 1742106507826 | `$.exercises[9].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `ENGLISH_SOUND_ANALOGY` | Q10, ID 1742106507826 | `$.exercises[9].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q11, ID 1742106507827 | `$.exercises[10].content` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q11, ID 1742106507827 | `$.exercises[10].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `ARTICULATION_TRADITION` | Q12, ID 1742106507828 | `$.exercises[11].tip` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ARTICULATION_TRADITION` | Q13, ID 1742106507829 | `$.exercises[12].content` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | Q13, ID 1742106507829 | `$.exercises[12].tip` | Review absolute sound/silence rules and exceptions |
| review / `ARTICULATION_TRADITION` | Q13, ID 1742106507829 | `$.exercises[12].tip` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q14, ID 1742106507830 | `$.exercises[13].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `MEDIA_APPROVAL_AND_METADATA` | Whole lesson | `$.studyMaterials` | Image/audio accuracy/reuse, metadata and delivery need approval; no assets fetched |
| review / `EDITORIAL_APPROVAL_PENDING` | Whole lesson | `$` | Source import is not linguistic, pedagogical or public-reuse approval |

## Lesson 2 — bet (ב)

| Severity / code | Record / source ID | Exact source path | Review requirement |
| --- | --- | --- | --- |
| review / `MISSING_IMAGE_DESCRIPTION` | B5 | `$.studyMaterials[4].description` | Image has no source textual description |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B6 | `$.studyMaterials[5]` | Recognized source type is not implemented in the Aleph renderer |
| review / `MISSING_IMAGE_DESCRIPTION` | B9 | `$.studyMaterials[8].description` | Image has no source textual description |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B13 | `$.studyMaterials[12]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B15 | `$.studyMaterials[14]` | Recognized source type is not implemented in the Aleph renderer |
| review / `DUPLICATE_STUDY_TEXT` | B15 | `$.studyMaterials[14]` | Exact normalized study text repeated within lesson |
| review / `TOKENIZED_MEDIA_URL` | B15 | `$.studyMaterials[14].audioUrl` | Treat download tokens as access capabilities; do not copy directly into public assets |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B17 | `$.studyMaterials[16]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q13, ID 1742223546108 | `$.exercises[12]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `ONE_SIDED_TRUE_FALSE` | Whole lesson | `$.exercises` | All true/false answers have the same key; review learning quality, not a proof of wrong answers |
| review / `ENGLISH_SOUND_ANALOGY` | B2 | `$.studyMaterials[1].content` | Review English vowel/consonant analogies and dialect scope |
| review / `ARTICULATION_TRADITION` | B4 | `$.studyMaterials[3].content` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ENGLISH_SOUND_ANALOGY` | B5 | `$.studyMaterials[4].content` | Review English vowel/consonant analogies and dialect scope |
| review / `ARTICULATION_TRADITION` | B5 | `$.studyMaterials[4].content` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | B7 | `$.studyMaterials[6].content` | Review absolute sound/silence rules and exceptions |
| review / `ARTICULATION_TRADITION` | B7 | `$.studyMaterials[6].content` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | B8 | `$.studyMaterials[7].content` | Review absolute sound/silence rules and exceptions |
| review / `ARTICULATION_TRADITION` | B8 | `$.studyMaterials[7].content` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ENGLISH_SOUND_ANALOGY` | B9 | `$.studyMaterials[8].content` | Review English vowel/consonant analogies and dialect scope |
| review / `ARTICULATION_TRADITION` | B9 | `$.studyMaterials[8].content` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ARTICULATION_TRADITION` | B11 | `$.studyMaterials[10].content` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ENGLISH_SOUND_ANALOGY` | B13 | `$.studyMaterials[12].translation` | Review English vowel/consonant analogies and dialect scope |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | B14 | `$.studyMaterials[13].content` | Review absolute sound/silence rules and exceptions |
| review / `ENGLISH_SOUND_ANALOGY` | B14 | `$.studyMaterials[13].content` | Review English vowel/consonant analogies and dialect scope |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | B16 | `$.studyMaterials[15].content` | Review absolute sound/silence rules and exceptions |
| review / `ARTICULATION_TRADITION` | B16 | `$.studyMaterials[15].content` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ENGLISH_SOUND_ANALOGY` | B17 | `$.studyMaterials[16].translation` | Review English vowel/consonant analogies and dialect scope |
| review / `ENGLISH_SOUND_ANALOGY` | B18 | `$.studyMaterials[17].content` | Review English vowel/consonant analogies and dialect scope |
| review / `ENGLISH_SOUND_ANALOGY` | Q2, ID 1742223546097 | `$.exercises[1].content` | Review English vowel/consonant analogies and dialect scope |
| review / `ARTICULATION_TRADITION` | Q2, ID 1742223546097 | `$.exercises[1].content` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ENGLISH_SOUND_ANALOGY` | Q2, ID 1742223546097 | `$.exercises[1].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `ARTICULATION_TRADITION` | Q2, ID 1742223546097 | `$.exercises[1].tip` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ENGLISH_SOUND_ANALOGY` | Q3, ID 1742223546098 | `$.exercises[2].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `ENGLISH_SOUND_ANALOGY` | Q4, ID 1742223546099 | `$.exercises[3].content` | Review English vowel/consonant analogies and dialect scope |
| review / `ARTICULATION_TRADITION` | Q4, ID 1742223546099 | `$.exercises[3].content` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ARTICULATION_TRADITION` | Q4, ID 1742223546099 | `$.exercises[3].tip` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ENGLISH_SOUND_ANALOGY` | Q5, ID 1742223546100 | `$.exercises[4].content` | Review English vowel/consonant analogies and dialect scope |
| review / `ENGLISH_SOUND_ANALOGY` | Q5, ID 1742223546100 | `$.exercises[4].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | Q7, ID 1742223546102 | `$.exercises[6].content` | Review absolute sound/silence rules and exceptions |
| review / `ARTICULATION_TRADITION` | Q7, ID 1742223546102 | `$.exercises[6].content` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ARTICULATION_TRADITION` | Q7, ID 1742223546102 | `$.exercises[6].tip` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ENGLISH_SOUND_ANALOGY` | Q8, ID 1742223546103 | `$.exercises[7].content` | Review English vowel/consonant analogies and dialect scope |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | Q8, ID 1742223546103 | `$.exercises[7].tip` | Review absolute sound/silence rules and exceptions |
| review / `ARTICULATION_TRADITION` | Q8, ID 1742223546103 | `$.exercises[7].tip` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ENGLISH_SOUND_ANALOGY` | Q9, ID 1742223546104 | `$.exercises[8].content` | Review English vowel/consonant analogies and dialect scope |
| review / `ARTICULATION_TRADITION` | Q9, ID 1742223546104 | `$.exercises[8].content` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ARTICULATION_TRADITION` | Q9, ID 1742223546104 | `$.exercises[8].tip` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ARTICULATION_TRADITION` | Q10, ID 1742223546105 | `$.exercises[9].content` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ARTICULATION_TRADITION` | Q10, ID 1742223546105 | `$.exercises[9].tip` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q11, ID 1742223546106 | `$.exercises[10].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `ARTICULATION_TRADITION` | Q13, ID 1742223546108 | `$.exercises[12].tip` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `MEDIA_APPROVAL_AND_METADATA` | Whole lesson | `$.studyMaterials` | Image/audio accuracy/reuse, metadata and delivery need approval; no assets fetched |
| review / `EDITORIAL_APPROVAL_PENDING` | Whole lesson | `$` | Source import is not linguistic, pedagogical or public-reuse approval |

## Lesson 3 — gimel (ג)

| Severity / code | Record / source ID | Exact source path | Review requirement |
| --- | --- | --- | --- |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B4 | `$.studyMaterials[3]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B6 | `$.studyMaterials[5]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q12, ID 1742223642489 | `$.exercises[11]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `ENGLISH_SOUND_ANALOGY` | B2 | `$.studyMaterials[1].content` | Review English vowel/consonant analogies and dialect scope |
| review / `ENGLISH_SOUND_ANALOGY` | B5 | `$.studyMaterials[4].content` | Review English vowel/consonant analogies and dialect scope |
| review / `ARTICULATION_TRADITION` | B7 | `$.studyMaterials[6].content` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ENGLISH_SOUND_ANALOGY` | Q1, ID 1742223642478 | `$.exercises[0].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `ENGLISH_SOUND_ANALOGY` | Q2, ID 1742223642479 | `$.exercises[1].content` | Review English vowel/consonant analogies and dialect scope |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q4, ID 1742223642481 | `$.exercises[3].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q9, ID 1742223642486 | `$.exercises[8].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q10, ID 1742223642487 | `$.exercises[9].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `ENGLISH_SOUND_ANALOGY` | Q11, ID 1742223642488 | `$.exercises[10].content` | Review English vowel/consonant analogies and dialect scope |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q12, ID 1742223642489 | `$.exercises[11].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `MEDIA_APPROVAL_AND_METADATA` | Whole lesson | `$.studyMaterials` | Image/audio accuracy/reuse, metadata and delivery need approval; no assets fetched |
| review / `EDITORIAL_APPROVAL_PENDING` | Whole lesson | `$` | Source import is not linguistic, pedagogical or public-reuse approval |

## Lesson 4 — dalet (ד)

| Severity / code | Record / source ID | Exact source path | Review requirement |
| --- | --- | --- | --- |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B5 | `$.studyMaterials[4]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B7 | `$.studyMaterials[6]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q6, ID 1742494470564 | `$.exercises[5]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `ENGLISH_SOUND_ANALOGY` | B2 | `$.studyMaterials[1].content` | Review English vowel/consonant analogies and dialect scope |
| review / `ENGLISH_SOUND_ANALOGY` | Q1, ID 1742494470559 | `$.exercises[0].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `ENGLISH_SOUND_ANALOGY` | Q2, ID 1742494470560 | `$.exercises[1].content` | Review English vowel/consonant analogies and dialect scope |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q3, ID 1742494470561 | `$.exercises[2].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `ENGLISH_SOUND_ANALOGY` | Q3, ID 1742494470561 | `$.exercises[2].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q5, ID 1742494470563 | `$.exercises[4].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q9, ID 1742494470567 | `$.exercises[8].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `ENGLISH_SOUND_ANALOGY` | Q11, ID 1742494470569 | `$.exercises[10].content` | Review English vowel/consonant analogies and dialect scope |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q13, ID 1742494470571 | `$.exercises[12].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `MEDIA_APPROVAL_AND_METADATA` | Whole lesson | `$.studyMaterials` | Image/audio accuracy/reuse, metadata and delivery need approval; no assets fetched |
| review / `EDITORIAL_APPROVAL_PENDING` | Whole lesson | `$` | Source import is not linguistic, pedagogical or public-reuse approval |

## Lesson 5 — he (ה)

| Severity / code | Record / source ID | Exact source path | Review requirement |
| --- | --- | --- | --- |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B6 | `$.studyMaterials[5]` | Recognized source type is not implemented in the Aleph renderer |
| error / `EMPTY_REQUIRED_TEXT` | B6 | `$.studyMaterials[5].content` | Required nonempty text is missing |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B8 | `$.studyMaterials[7]` | Recognized source type is not implemented in the Aleph renderer |
| error / `EMPTY_REQUIRED_TEXT` | B8 | `$.studyMaterials[7].content` | Required nonempty text is missing |
| review / `DUPLICATE_STUDY_TEXT` | B8 | `$.studyMaterials[7]` | Exact normalized study text repeated within lesson |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B11 | `$.studyMaterials[10]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B13 | `$.studyMaterials[12]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B15 | `$.studyMaterials[14]` | Recognized source type is not implemented in the Aleph renderer |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | B2 | `$.studyMaterials[1].content` | Review absolute sound/silence rules and exceptions |
| review / `ENGLISH_SOUND_ANALOGY` | B2 | `$.studyMaterials[1].content` | Review English vowel/consonant analogies and dialect scope |
| review / `ENGLISH_SOUND_ANALOGY` | Q1, ID 1742223805468 | `$.exercises[0].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `ENGLISH_SOUND_ANALOGY` | Q3, ID 1742223805470 | `$.exercises[2].content` | Review English vowel/consonant analogies and dialect scope |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | Q3, ID 1742223805470 | `$.exercises[2].tip` | Review absolute sound/silence rules and exceptions |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q4, ID 1742223805471 | `$.exercises[3].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `ENGLISH_SOUND_ANALOGY` | Q4, ID 1742223805471 | `$.exercises[3].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | Q5, ID 1742223805472 | `$.exercises[4].tip` | Review absolute sound/silence rules and exceptions |
| review / `ENGLISH_SOUND_ANALOGY` | Q7, ID 1742223805474 | `$.exercises[6].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q13, ID 1742223805480 | `$.exercises[12].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | Q14, ID 1742223805481 | `$.exercises[13].content` | Review absolute sound/silence rules and exceptions |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | Q14, ID 1742223805481 | `$.exercises[13].tip` | Review absolute sound/silence rules and exceptions |
| review / `MEDIA_APPROVAL_AND_METADATA` | Whole lesson | `$.studyMaterials` | Image/audio accuracy/reuse, metadata and delivery need approval; no assets fetched |
| review / `EDITORIAL_APPROVAL_PENDING` | Whole lesson | `$` | Source import is not linguistic, pedagogical or public-reuse approval |

## Lesson 6 — vav (ו)

| Severity / code | Record / source ID | Exact source path | Review requirement |
| --- | --- | --- | --- |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B3 | `$.studyMaterials[2]` | Recognized source type is not implemented in the Aleph renderer |
| error / `EMPTY_REQUIRED_TEXT` | B3 | `$.studyMaterials[2].content` | Required nonempty text is missing |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B5 | `$.studyMaterials[4]` | Recognized source type is not implemented in the Aleph renderer |
| error / `EMPTY_REQUIRED_TEXT` | B5 | `$.studyMaterials[4].content` | Required nonempty text is missing |
| review / `DUPLICATE_STUDY_TEXT` | B5 | `$.studyMaterials[4]` | Exact normalized study text repeated within lesson |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B7 | `$.studyMaterials[6]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B9 | `$.studyMaterials[8]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B11 | `$.studyMaterials[10]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B13 | `$.studyMaterials[12]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q7, ID 1742223897672 | `$.exercises[6]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `ENGLISH_SOUND_ANALOGY` | B2 | `$.studyMaterials[1].content` | Review English vowel/consonant analogies and dialect scope |
| review / `ENGLISH_SOUND_ANALOGY` | B4 | `$.studyMaterials[3].content` | Review English vowel/consonant analogies and dialect scope |
| review / `ENGLISH_SOUND_ANALOGY` | B6 | `$.studyMaterials[5].content` | Review English vowel/consonant analogies and dialect scope |
| review / `ENGLISH_SOUND_ANALOGY` | Q2, ID 1742223897667 | `$.exercises[1].content` | Review English vowel/consonant analogies and dialect scope |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q2, ID 1742223897667 | `$.exercises[1].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `ENGLISH_SOUND_ANALOGY` | Q2, ID 1742223897667 | `$.exercises[1].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | Q4, ID 1742223897669 | `$.exercises[3].content` | Review absolute sound/silence rules and exceptions |
| review / `ENGLISH_SOUND_ANALOGY` | Q4, ID 1742223897669 | `$.exercises[3].content` | Review English vowel/consonant analogies and dialect scope |
| review / `ARTICULATION_TRADITION` | Q4, ID 1742223897669 | `$.exercises[3].tip` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ENGLISH_SOUND_ANALOGY` | Q6, ID 1742223897671 | `$.exercises[5].content` | Review English vowel/consonant analogies and dialect scope |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q6, ID 1742223897671 | `$.exercises[5].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `ENGLISH_SOUND_ANALOGY` | Q6, ID 1742223897671 | `$.exercises[5].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q9, ID 1742223897674 | `$.exercises[8].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `ENGLISH_SOUND_ANALOGY` | Q10, ID 1742223897675 | `$.exercises[9].content` | Review English vowel/consonant analogies and dialect scope |
| review / `ENGLISH_SOUND_ANALOGY` | Q11, ID 1742223897676 | `$.exercises[10].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `ENGLISH_SOUND_ANALOGY` | Q12, ID 1742223897677 | `$.exercises[11].content` | Review English vowel/consonant analogies and dialect scope |
| review / `ENGLISH_SOUND_ANALOGY` | Q12, ID 1742223897677 | `$.exercises[11].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `MEDIA_APPROVAL_AND_METADATA` | Whole lesson | `$.studyMaterials` | Image/audio accuracy/reuse, metadata and delivery need approval; no assets fetched |
| review / `EDITORIAL_APPROVAL_PENDING` | Whole lesson | `$` | Source import is not linguistic, pedagogical or public-reuse approval |

## Lesson 7 — zayin (ז)

| Severity / code | Record / source ID | Exact source path | Review requirement |
| --- | --- | --- | --- |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B4 | `$.studyMaterials[3]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B6 | `$.studyMaterials[5]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B8 | `$.studyMaterials[7]` | Recognized source type is not implemented in the Aleph renderer |
| review / `ENGLISH_SOUND_ANALOGY` | B2 | `$.studyMaterials[1].content` | Review English vowel/consonant analogies and dialect scope |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | B7 | `$.studyMaterials[6].content` | Review absolute sound/silence rules and exceptions |
| review / `ENGLISH_SOUND_ANALOGY` | B8 | `$.studyMaterials[7].translation` | Review English vowel/consonant analogies and dialect scope |
| review / `ENGLISH_SOUND_ANALOGY` | B9 | `$.studyMaterials[8].content` | Review English vowel/consonant analogies and dialect scope |
| review / `ENGLISH_SOUND_ANALOGY` | Q1, ID 1742223990039 | `$.exercises[0].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | Q3, ID 1742223990041 | `$.exercises[2].tip` | Review absolute sound/silence rules and exceptions |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q4, ID 1742223990042 | `$.exercises[3].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `ARTICULATION_TRADITION` | Q8, ID 1742223990046 | `$.exercises[7].content` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q8, ID 1742223990046 | `$.exercises[7].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `ARTICULATION_TRADITION` | Q8, ID 1742223990046 | `$.exercises[7].tip` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q9, ID 1742223990047 | `$.exercises[8].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `ENGLISH_SOUND_ANALOGY` | Q9, ID 1742223990047 | `$.exercises[8].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `ENGLISH_SOUND_ANALOGY` | Q14, ID 1742223990052 | `$.exercises[13].content` | Review English vowel/consonant analogies and dialect scope |
| review / `ENGLISH_SOUND_ANALOGY` | Q14, ID 1742223990052 | `$.exercises[13].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `MEDIA_APPROVAL_AND_METADATA` | Whole lesson | `$.studyMaterials` | Image/audio accuracy/reuse, metadata and delivery need approval; no assets fetched |
| review / `EDITORIAL_APPROVAL_PENDING` | Whole lesson | `$` | Source import is not linguistic, pedagogical or public-reuse approval |

## Lesson 8 — chet (ח)

| Severity / code | Record / source ID | Exact source path | Review requirement |
| --- | --- | --- | --- |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B3 | `$.studyMaterials[2]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B5 | `$.studyMaterials[4]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B7 | `$.studyMaterials[6]` | Recognized source type is not implemented in the Aleph renderer |
| review / `ENGLISH_SOUND_ANALOGY` | B2 | `$.studyMaterials[1].content` | Review English vowel/consonant analogies and dialect scope |
| review / `ARTICULATION_TRADITION` | B2 | `$.studyMaterials[1].content` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ARTICULATION_TRADITION` | B6 | `$.studyMaterials[5].content` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ARTICULATION_TRADITION` | Q1, ID 1742224241367 | `$.exercises[0].tip` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ENGLISH_SOUND_ANALOGY` | Q2, ID 1742224241368 | `$.exercises[1].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `ENGLISH_SOUND_ANALOGY` | Q3, ID 1742224241369 | `$.exercises[2].content` | Review English vowel/consonant analogies and dialect scope |
| review / `ARTICULATION_TRADITION` | Q3, ID 1742224241369 | `$.exercises[2].tip` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ENGLISH_SOUND_ANALOGY` | Q6, ID 1742224241374 | `$.exercises[5].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `ARTICULATION_TRADITION` | Q6, ID 1742224241374 | `$.exercises[5].tip` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ARTICULATION_TRADITION` | Q7, ID 1742224241375 | `$.exercises[6].content` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ARTICULATION_TRADITION` | Q7, ID 1742224241375 | `$.exercises[6].tip` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q8, ID 1742224241376 | `$.exercises[7].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `ENGLISH_SOUND_ANALOGY` | Q10, ID 1742224241378 | `$.exercises[9].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `ENGLISH_SOUND_ANALOGY` | Q11, ID 1742224241379 | `$.exercises[10].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `ENGLISH_SOUND_ANALOGY` | Q12, ID 1742224241380 | `$.exercises[11].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `ARTICULATION_TRADITION` | Q12, ID 1742224241380 | `$.exercises[11].tip` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q14, ID 1742224241382 | `$.exercises[13].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `ENGLISH_SOUND_ANALOGY` | Q15, ID 1742224241383 | `$.exercises[14].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `MEDIA_APPROVAL_AND_METADATA` | Whole lesson | `$.studyMaterials` | Image/audio accuracy/reuse, metadata and delivery need approval; no assets fetched |
| review / `EDITORIAL_APPROVAL_PENDING` | Whole lesson | `$` | Source import is not linguistic, pedagogical or public-reuse approval |

## Lesson 9 — tet (ט)

| Severity / code | Record / source ID | Exact source path | Review requirement |
| --- | --- | --- | --- |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B5 | `$.studyMaterials[4]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B7 | `$.studyMaterials[6]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q10, ID 1742224380228 | `$.exercises[9]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `ENGLISH_SOUND_ANALOGY` | B2 | `$.studyMaterials[1].content` | Review English vowel/consonant analogies and dialect scope |
| review / `ARTICULATION_TRADITION` | B8 | `$.studyMaterials[7].content` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q5, ID 1742224380223 | `$.exercises[4].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `ENGLISH_SOUND_ANALOGY` | Q5, ID 1742224380223 | `$.exercises[4].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `MEDIA_APPROVAL_AND_METADATA` | Whole lesson | `$.studyMaterials` | Image/audio accuracy/reuse, metadata and delivery need approval; no assets fetched |
| review / `EDITORIAL_APPROVAL_PENDING` | Whole lesson | `$` | Source import is not linguistic, pedagogical or public-reuse approval |

## Lesson 10 — yod (י)

| Severity / code | Record / source ID | Exact source path | Review requirement |
| --- | --- | --- | --- |
| review / `NON_ENGLISH_SCRIPT` | Q3, ID 1742226699537 | `$.exercises[2].additionalData.pairs.ב` | English API content includes Cyrillic text/transcription; editorial localization review required |
| review / `NON_ENGLISH_SCRIPT` | Q3, ID 1742226699537 | `$.exercises[2].additionalData.pairs.ד` | English API content includes Cyrillic text/transcription; editorial localization review required |
| review / `NON_ENGLISH_SCRIPT` | Q3, ID 1742226699537 | `$.exercises[2].additionalData.pairs.י` | English API content includes Cyrillic text/transcription; editorial localization review required |
| review / `NON_ENGLISH_SCRIPT` | Q15, ID 1742226699549 | `$.exercises[14].additionalData.pairs.(זָ) + Kamatz` | English API content includes Cyrillic text/transcription; editorial localization review required |
| review / `NON_ENGLISH_SCRIPT` | Q15, ID 1742226699549 | `$.exercises[14].additionalData.pairs.(יָ) + Kamatz` | English API content includes Cyrillic text/transcription; editorial localization review required |
| review / `NON_ENGLISH_SCRIPT` | Q15, ID 1742226699549 | `$.exercises[14].additionalData.pairs.(בָּ) + Kamatz` | English API content includes Cyrillic text/transcription; editorial localization review required |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B5 | `$.studyMaterials[4]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B7 | `$.studyMaterials[6]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q3, ID 1742226699537 | `$.exercises[2]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q7, ID 1742226699541 | `$.exercises[6]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q11, ID 1742226699545 | `$.exercises[10]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q15, ID 1742226699549 | `$.exercises[14]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `ENGLISH_SOUND_ANALOGY` | B2 | `$.studyMaterials[1].content` | Review English vowel/consonant analogies and dialect scope |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q6, ID 1742226699540 | `$.exercises[5].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q13, ID 1742226699547 | `$.exercises[12].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q15, ID 1742226699549 | `$.exercises[14].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q16, ID 1742226699550 | `$.exercises[15].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `MEDIA_APPROVAL_AND_METADATA` | Whole lesson | `$.studyMaterials` | Image/audio accuracy/reuse, metadata and delivery need approval; no assets fetched |
| review / `EDITORIAL_APPROVAL_PENDING` | Whole lesson | `$` | Source import is not linguistic, pedagogical or public-reuse approval |

## Lesson 11 — kaf (כ)

| Severity / code | Record / source ID | Exact source path | Review requirement |
| --- | --- | --- | --- |
| review / `NON_ENGLISH_SCRIPT` | Q16, ID 1742226816230 | `$.exercises[15].additionalData.pairs.(יַ) + Segol` | English API content includes Cyrillic text/transcription; editorial localization review required |
| review / `NON_ENGLISH_SCRIPT` | Q16, ID 1742226816230 | `$.exercises[15].additionalData.pairs.(בֶּ) + Segol` | English API content includes Cyrillic text/transcription; editorial localization review required |
| review / `NON_ENGLISH_SCRIPT` | Q16, ID 1742226816230 | `$.exercises[15].additionalData.pairs.(כֶּ) + Segol` | English API content includes Cyrillic text/transcription; editorial localization review required |
| review / `EMPTY_IMAGE_BODY_WITH_CAPTION` | B4 | `$.studyMaterials[3].content` | Caption/media are present but body is empty; explicitly review the presentation mapping; no fallback or deletion applied |
| review / `TOKENIZED_MEDIA_URL` | B4 | `$.studyMaterials[3].imageUrl` | Treat download tokens as access capabilities; do not copy directly into public assets |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B9 | `$.studyMaterials[8]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B11 | `$.studyMaterials[10]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B13 | `$.studyMaterials[12]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q3, ID 1742226816217 | `$.exercises[2]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q7, ID 1742226816221 | `$.exercises[6]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q11, ID 1742226816225 | `$.exercises[10]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q16, ID 1742226816230 | `$.exercises[15]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `ENGLISH_SOUND_ANALOGY` | B2 | `$.studyMaterials[1].content` | Review English vowel/consonant analogies and dialect scope |
| review / `ARTICULATION_TRADITION` | B2 | `$.studyMaterials[1].content` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ENGLISH_SOUND_ANALOGY` | B7 | `$.studyMaterials[6].content` | Review English vowel/consonant analogies and dialect scope |
| review / `ARTICULATION_TRADITION` | B7 | `$.studyMaterials[6].content` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ARTICULATION_TRADITION` | Q1, ID 1742226816215 | `$.exercises[0].content` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ENGLISH_SOUND_ANALOGY` | Q1, ID 1742226816215 | `$.exercises[0].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `ARTICULATION_TRADITION` | Q1, ID 1742226816215 | `$.exercises[0].tip` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ARTICULATION_TRADITION` | Q9, ID 1742226816223 | `$.exercises[8].content` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ARTICULATION_TRADITION` | Q9, ID 1742226816223 | `$.exercises[8].tip` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q10, ID 1742226816224 | `$.exercises[9].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `ENGLISH_SOUND_ANALOGY` | Q10, ID 1742226816224 | `$.exercises[9].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `ENGLISH_SOUND_ANALOGY` | Q15, ID 1742226816229 | `$.exercises[14].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `MEDIA_APPROVAL_AND_METADATA` | Whole lesson | `$.studyMaterials` | Image/audio accuracy/reuse, metadata and delivery need approval; no assets fetched |
| review / `EDITORIAL_APPROVAL_PENDING` | Whole lesson | `$` | Source import is not linguistic, pedagogical or public-reuse approval |

## Lesson 12 — lamed (ל)

| Severity / code | Record / source ID | Exact source path | Review requirement |
| --- | --- | --- | --- |
| review / `NON_ENGLISH_SCRIPT` | Q16, ID 1742226982605 | `$.exercises[15].additionalData.pairs.(גַ) + Patah` | English API content includes Cyrillic text/transcription; editorial localization review required |
| review / `NON_ENGLISH_SCRIPT` | Q16, ID 1742226982605 | `$.exercises[15].additionalData.pairs.(טַ) + Patah` | English API content includes Cyrillic text/transcription; editorial localization review required |
| review / `NON_ENGLISH_SCRIPT` | Q16, ID 1742226982605 | `$.exercises[15].additionalData.pairs.(יַ) + Patah` | English API content includes Cyrillic text/transcription; editorial localization review required |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B3 | `$.studyMaterials[2]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B5 | `$.studyMaterials[4]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B7 | `$.studyMaterials[6]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B11 | `$.studyMaterials[10]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B12 | `$.studyMaterials[11]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B13 | `$.studyMaterials[12]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B14 | `$.studyMaterials[13]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B15 | `$.studyMaterials[14]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q3, ID 1742226982592 | `$.exercises[2]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q7, ID 1742226982596 | `$.exercises[6]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q11, ID 1742226982600 | `$.exercises[10]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q16, ID 1742226982605 | `$.exercises[15]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `ENGLISH_SOUND_ANALOGY` | Q1, ID 1742226982590 | `$.exercises[0].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `ARTICULATION_TRADITION` | Q13, ID 1742226982602 | `$.exercises[12].tip` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q16, ID 1742226982605 | `$.exercises[15].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `MEDIA_APPROVAL_AND_METADATA` | Whole lesson | `$.studyMaterials` | Image/audio accuracy/reuse, metadata and delivery need approval; no assets fetched |
| review / `EDITORIAL_APPROVAL_PENDING` | Whole lesson | `$` | Source import is not linguistic, pedagogical or public-reuse approval |

## Lesson 13 — mem (מ)

| Severity / code | Record / source ID | Exact source path | Review requirement |
| --- | --- | --- | --- |
| review / `NON_ENGLISH_SCRIPT` | Q16, ID 1742227089049 | `$.exercises[15].additionalData.pairs.(זַ) + Patah` | English API content includes Cyrillic text/transcription; editorial localization review required |
| review / `NON_ENGLISH_SCRIPT` | Q16, ID 1742227089049 | `$.exercises[15].additionalData.pairs.(יַ) + Patah` | English API content includes Cyrillic text/transcription; editorial localization review required |
| review / `NON_ENGLISH_SCRIPT` | Q16, ID 1742227089049 | `$.exercises[15].additionalData.pairs.(מַ) + Patah` | English API content includes Cyrillic text/transcription; editorial localization review required |
| review / `EMPTY_IMAGE_BODY_WITH_CAPTION` | B3 | `$.studyMaterials[2].content` | Caption/media are present but body is empty; explicitly review the presentation mapping; no fallback or deletion applied |
| review / `TOKENIZED_MEDIA_URL` | B3 | `$.studyMaterials[2].imageUrl` | Treat download tokens as access capabilities; do not copy directly into public assets |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B4 | `$.studyMaterials[3]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B7 | `$.studyMaterials[6]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B9 | `$.studyMaterials[8]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B11 | `$.studyMaterials[10]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q3, ID 1742227089036 | `$.exercises[2]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q7, ID 1742227089040 | `$.exercises[6]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q10, ID 1742227089043 | `$.exercises[9]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q16, ID 1742227089049 | `$.exercises[15]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `ONE_SIDED_TRUE_FALSE` | Whole lesson | `$.exercises` | All true/false answers have the same key; review learning quality, not a proof of wrong answers |
| review / `ENGLISH_SOUND_ANALOGY` | B2 | `$.studyMaterials[1].content` | Review English vowel/consonant analogies and dialect scope |
| review / `VOWEL_LENGTH_OR_REDUCTION` | B6 | `$.studyMaterials[5].content` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | B8 | `$.studyMaterials[7].content` | Review absolute sound/silence rules and exceptions |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | B10 | `$.studyMaterials[9].content` | Review absolute sound/silence rules and exceptions |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | B14 | `$.studyMaterials[13].content` | Review absolute sound/silence rules and exceptions |
| review / `ENGLISH_SOUND_ANALOGY` | Q1, ID 1742227089034 | `$.exercises[0].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q12, ID 1742227089045 | `$.exercises[11].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q14, ID 1742227089047 | `$.exercises[13].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q16, ID 1742227089049 | `$.exercises[15].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `MEDIA_APPROVAL_AND_METADATA` | Whole lesson | `$.studyMaterials` | Image/audio accuracy/reuse, metadata and delivery need approval; no assets fetched |
| review / `EDITORIAL_APPROVAL_PENDING` | Whole lesson | `$` | Source import is not linguistic, pedagogical or public-reuse approval |

## Lesson 14 — nun (נ)

| Severity / code | Record / source ID | Exact source path | Review requirement |
| --- | --- | --- | --- |
| review / `EMPTY_IMAGE_BODY_WITH_CAPTION` | B3 | `$.studyMaterials[2].content` | Caption/media are present but body is empty; explicitly review the presentation mapping; no fallback or deletion applied |
| review / `TOKENIZED_MEDIA_URL` | B3 | `$.studyMaterials[2].imageUrl` | Treat download tokens as access capabilities; do not copy directly into public assets |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B6 | `$.studyMaterials[5]` | Recognized source type is not implemented in the Aleph renderer |
| error / `EMPTY_REQUIRED_TEXT` | B6 | `$.studyMaterials[5].content` | Required nonempty text is missing |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B10 | `$.studyMaterials[9]` | Recognized source type is not implemented in the Aleph renderer |
| error / `EMPTY_REQUIRED_TEXT` | B10 | `$.studyMaterials[9].content` | Required nonempty text is missing |
| review / `DUPLICATE_STUDY_TEXT` | B10 | `$.studyMaterials[9]` | Exact normalized study text repeated within lesson |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B12 | `$.studyMaterials[11]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B14 | `$.studyMaterials[13]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B16 | `$.studyMaterials[15]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B20 | `$.studyMaterials[19]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B21 | `$.studyMaterials[20]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B22 | `$.studyMaterials[21]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B23 | `$.studyMaterials[22]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B24 | `$.studyMaterials[23]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q3, ID 1742227232527 | `$.exercises[2]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q7, ID 1742227232531 | `$.exercises[6]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q11, ID 1742227232535 | `$.exercises[10]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | B2 | `$.studyMaterials[1].content` | Review absolute sound/silence rules and exceptions |
| review / `ENGLISH_SOUND_ANALOGY` | B2 | `$.studyMaterials[1].content` | Review English vowel/consonant analogies and dialect scope |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | B4 | `$.studyMaterials[3].content` | Review absolute sound/silence rules and exceptions |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | B15 | `$.studyMaterials[14].content` | Review absolute sound/silence rules and exceptions |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | B17 | `$.studyMaterials[16].content` | Review absolute sound/silence rules and exceptions |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | Q1, ID 1742227232525 | `$.exercises[0].tip` | Review absolute sound/silence rules and exceptions |
| review / `ENGLISH_SOUND_ANALOGY` | Q1, ID 1742227232525 | `$.exercises[0].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | Q9, ID 1742227232533 | `$.exercises[8].content` | Review absolute sound/silence rules and exceptions |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q13, ID 1742227232537 | `$.exercises[12].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q15, ID 1742227232539 | `$.exercises[14].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `MEDIA_APPROVAL_AND_METADATA` | Whole lesson | `$.studyMaterials` | Image/audio accuracy/reuse, metadata and delivery need approval; no assets fetched |
| review / `EDITORIAL_APPROVAL_PENDING` | Whole lesson | `$` | Source import is not linguistic, pedagogical or public-reuse approval |

## Lesson 15 — samekh (ס)

| Severity / code | Record / source ID | Exact source path | Review requirement |
| --- | --- | --- | --- |
| review / `NON_ENGLISH_SCRIPT` | Q3, ID 1742227303445 | `$.exercises[2].additionalData.pairs.מ` | English API content includes Cyrillic text/transcription; editorial localization review required |
| review / `NON_ENGLISH_SCRIPT` | Q3, ID 1742227303445 | `$.exercises[2].additionalData.pairs.ס` | English API content includes Cyrillic text/transcription; editorial localization review required |
| review / `NON_ENGLISH_SCRIPT` | Q3, ID 1742227303445 | `$.exercises[2].additionalData.pairs.ת` | English API content includes Cyrillic text/transcription; editorial localization review required |
| review / `EMPTY_IMAGE_BODY_WITH_CAPTION` | B5 | `$.studyMaterials[4].content` | Caption/media are present but body is empty; explicitly review the presentation mapping; no fallback or deletion applied |
| review / `TOKENIZED_MEDIA_URL` | B5 | `$.studyMaterials[4].imageUrl` | Treat download tokens as access capabilities; do not copy directly into public assets |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B6 | `$.studyMaterials[5]` | Recognized source type is not implemented in the Aleph renderer |
| review / `EMPTY_IMAGE_BODY_WITH_CAPTION` | B8 | `$.studyMaterials[7].content` | Caption/media are present but body is empty; explicitly review the presentation mapping; no fallback or deletion applied |
| review / `DUPLICATE_STUDY_TEXT` | B8 | `$.studyMaterials[7]` | Exact normalized study text repeated within lesson |
| review / `TOKENIZED_MEDIA_URL` | B8 | `$.studyMaterials[7].imageUrl` | Treat download tokens as access capabilities; do not copy directly into public assets |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B9 | `$.studyMaterials[8]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B12 | `$.studyMaterials[11]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B14 | `$.studyMaterials[13]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B16 | `$.studyMaterials[15]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q3, ID 1742227303445 | `$.exercises[2]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q7, ID 1742227303449 | `$.exercises[6]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `ONE_SIDED_TRUE_FALSE` | Whole lesson | `$.exercises` | All true/false answers have the same key; review learning quality, not a proof of wrong answers |
| review / `ENGLISH_SOUND_ANALOGY` | B2 | `$.studyMaterials[1].content` | Review English vowel/consonant analogies and dialect scope |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | B7 | `$.studyMaterials[6].content` | Review absolute sound/silence rules and exceptions |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | B10 | `$.studyMaterials[9].content` | Review absolute sound/silence rules and exceptions |
| review / `ARTICULATION_TRADITION` | B17 | `$.studyMaterials[16].content` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ENGLISH_SOUND_ANALOGY` | B19 | `$.studyMaterials[18].content` | Review English vowel/consonant analogies and dialect scope |
| review / `ENGLISH_SOUND_ANALOGY` | Q1, ID 1742227303443 | `$.exercises[0].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | Q5, ID 1742227303447 | `$.exercises[4].tip` | Review absolute sound/silence rules and exceptions |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q12, ID 1742227303454 | `$.exercises[11].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `MEDIA_APPROVAL_AND_METADATA` | Whole lesson | `$.studyMaterials` | Image/audio accuracy/reuse, metadata and delivery need approval; no assets fetched |
| review / `EDITORIAL_APPROVAL_PENDING` | Whole lesson | `$` | Source import is not linguistic, pedagogical or public-reuse approval |

## Lesson 16 — ayin (ע)

| Severity / code | Record / source ID | Exact source path | Review requirement |
| --- | --- | --- | --- |
| review / `NON_ENGLISH_SCRIPT` | Q4, ID 1742225632175 | `$.exercises[3].additionalData.pairs.עִ` | English API content includes Cyrillic text/transcription; editorial localization review required |
| review / `NON_ENGLISH_SCRIPT` | Q4, ID 1742225632175 | `$.exercises[3].additionalData.pairs.עֶ` | English API content includes Cyrillic text/transcription; editorial localization review required |
| review / `NON_ENGLISH_SCRIPT` | Q4, ID 1742225632175 | `$.exercises[3].additionalData.pairs.עַ` | English API content includes Cyrillic text/transcription; editorial localization review required |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B5 | `$.studyMaterials[4]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B7 | `$.studyMaterials[6]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B9 | `$.studyMaterials[8]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B13 | `$.studyMaterials[12]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B14 | `$.studyMaterials[13]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B15 | `$.studyMaterials[14]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B16 | `$.studyMaterials[15]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B17 | `$.studyMaterials[16]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q2, ID 1742225632173 | `$.exercises[1]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q4, ID 1742225632175 | `$.exercises[3]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `NON_POC_CHOICE_COUNT` | Q6, ID 1742225632177 | `$.exercises[5]` | Valid source choice count needs generalization beyond the fixed Aleph contract |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q7, ID 1742225632178 | `$.exercises[6]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `DUPLICATE_EXERCISE_PROMPT` | Q7, ID 1742225632178 | `$.exercises[6].content` | Repeated normalized exercise prompt |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q11, ID 1742225632182 | `$.exercises[10]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | Whole lesson | `$.description` | Review absolute sound/silence rules and exceptions |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | B2 | `$.studyMaterials[1].content` | Review absolute sound/silence rules and exceptions |
| review / `ARTICULATION_TRADITION` | B2 | `$.studyMaterials[1].content` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | B10 | `$.studyMaterials[9].content` | Review absolute sound/silence rules and exceptions |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | Q1, ID 1742225632172 | `$.exercises[0].tip` | Review absolute sound/silence rules and exceptions |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | Q8, ID 1742225632179 | `$.exercises[7].tip` | Review absolute sound/silence rules and exceptions |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q10, ID 1742225632181 | `$.exercises[9].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `ARTICULATION_TRADITION` | Q14, ID 1742225632185 | `$.exercises[13].content` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ARTICULATION_TRADITION` | Q14, ID 1742225632185 | `$.exercises[13].tip` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q15, ID 1742225632186 | `$.exercises[14].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `MEDIA_APPROVAL_AND_METADATA` | Whole lesson | `$.studyMaterials` | Image/audio accuracy/reuse, metadata and delivery need approval; no assets fetched |
| review / `EDITORIAL_APPROVAL_PENDING` | Whole lesson | `$` | Source import is not linguistic, pedagogical or public-reuse approval |

## Lesson 17 — pe (פ)

| Severity / code | Record / source ID | Exact source path | Review requirement |
| --- | --- | --- | --- |
| review / `EMPTY_IMAGE_BODY_WITH_CAPTION` | B6 | `$.studyMaterials[5].content` | Caption/media are present but body is empty; explicitly review the presentation mapping; no fallback or deletion applied |
| review / `TOKENIZED_MEDIA_URL` | B6 | `$.studyMaterials[5].imageUrl` | Treat download tokens as access capabilities; do not copy directly into public assets |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B7 | `$.studyMaterials[6]` | Recognized source type is not implemented in the Aleph renderer |
| review / `EMPTY_IMAGE_BODY_WITH_CAPTION` | B9 | `$.studyMaterials[8].content` | Caption/media are present but body is empty; explicitly review the presentation mapping; no fallback or deletion applied |
| review / `DUPLICATE_STUDY_TEXT` | B9 | `$.studyMaterials[8]` | Exact normalized study text repeated within lesson |
| review / `TOKENIZED_MEDIA_URL` | B9 | `$.studyMaterials[8].imageUrl` | Treat download tokens as access capabilities; do not copy directly into public assets |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B10 | `$.studyMaterials[9]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B13 | `$.studyMaterials[12]` | Recognized source type is not implemented in the Aleph renderer |
| error / `EMPTY_REQUIRED_TEXT` | B13 | `$.studyMaterials[12].content` | Required nonempty text is missing |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B16 | `$.studyMaterials[15]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B18 | `$.studyMaterials[17]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B20 | `$.studyMaterials[19]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q3, ID 1742225742309 | `$.exercises[2]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q7, ID 1742225742313 | `$.exercises[6]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `NON_POC_CHOICE_COUNT` | Q14, ID 1742225742320 | `$.exercises[13]` | Valid source choice count needs generalization beyond the fixed Aleph contract |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q15, ID 1742225742321 | `$.exercises[14]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `ENGLISH_SOUND_ANALOGY` | B2 | `$.studyMaterials[1].content` | Review English vowel/consonant analogies and dialect scope |
| review / `ARTICULATION_TRADITION` | B5 | `$.studyMaterials[4].content` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ARTICULATION_TRADITION` | B6 | `$.studyMaterials[5].description` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | B8 | `$.studyMaterials[7].content` | Review absolute sound/silence rules and exceptions |
| review / `ARTICULATION_TRADITION` | B8 | `$.studyMaterials[7].content` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ARTICULATION_TRADITION` | B9 | `$.studyMaterials[8].description` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ARTICULATION_TRADITION` | B11 | `$.studyMaterials[10].content` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | B12 | `$.studyMaterials[11].content` | Review absolute sound/silence rules and exceptions |
| review / `ARTICULATION_TRADITION` | B12 | `$.studyMaterials[11].content` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | B17 | `$.studyMaterials[16].content` | Review absolute sound/silence rules and exceptions |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | B19 | `$.studyMaterials[18].content` | Review absolute sound/silence rules and exceptions |
| review / `ARTICULATION_TRADITION` | B23 | `$.studyMaterials[22].content` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ARTICULATION_TRADITION` | Q1, ID 1742225742307 | `$.exercises[0].tip` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ENGLISH_SOUND_ANALOGY` | Q8, ID 1742225742314 | `$.exercises[7].content` | Review English vowel/consonant analogies and dialect scope |
| review / `ARTICULATION_TRADITION` | Q8, ID 1742225742314 | `$.exercises[7].content` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ARTICULATION_TRADITION` | Q8, ID 1742225742314 | `$.exercises[7].tip` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q10, ID 1742225742316 | `$.exercises[9].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `ENGLISH_SOUND_ANALOGY` | Q10, ID 1742225742316 | `$.exercises[9].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | Q11, ID 1742225742317 | `$.exercises[10].content` | Review absolute sound/silence rules and exceptions |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | Q11, ID 1742225742317 | `$.exercises[10].tip` | Review absolute sound/silence rules and exceptions |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q13, ID 1742225742319 | `$.exercises[12].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `MEDIA_APPROVAL_AND_METADATA` | Whole lesson | `$.studyMaterials` | Image/audio accuracy/reuse, metadata and delivery need approval; no assets fetched |
| review / `EDITORIAL_APPROVAL_PENDING` | Whole lesson | `$` | Source import is not linguistic, pedagogical or public-reuse approval |

## Lesson 18 — tsadi (צ)

| Severity / code | Record / source ID | Exact source path | Review requirement |
| --- | --- | --- | --- |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B3 | `$.studyMaterials[2]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B4 | `$.studyMaterials[3]` | Recognized source type is not implemented in the Aleph renderer |
| error / `EMPTY_REQUIRED_TEXT` | B4 | `$.studyMaterials[3].content` | Required nonempty text is missing |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B7 | `$.studyMaterials[6]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B9 | `$.studyMaterials[8]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B11 | `$.studyMaterials[10]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B15 | `$.studyMaterials[14]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B16 | `$.studyMaterials[15]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B17 | `$.studyMaterials[16]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B18 | `$.studyMaterials[17]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B19 | `$.studyMaterials[18]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q3, ID 1742225842271 | `$.exercises[2]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `NON_POC_CHOICE_COUNT` | Q6, ID 1742225842274 | `$.exercises[5]` | Valid source choice count needs generalization beyond the fixed Aleph contract |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q9, ID 1742225842277 | `$.exercises[8]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `NON_POC_CHOICE_COUNT` | Q10, ID 1742225842278 | `$.exercises[9]` | Valid source choice count needs generalization beyond the fixed Aleph contract |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q14, ID 1742225842282 | `$.exercises[13]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `ENGLISH_SOUND_ANALOGY` | B2 | `$.studyMaterials[1].content` | Review English vowel/consonant analogies and dialect scope |
| review / `ARTICULATION_TRADITION` | B12 | `$.studyMaterials[11].content` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ENGLISH_SOUND_ANALOGY` | Q9, ID 1742225842277 | `$.exercises[8].content` | Review English vowel/consonant analogies and dialect scope |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | Q12, ID 1742225842280 | `$.exercises[11].content` | Review absolute sound/silence rules and exceptions |
| review / `MEDIA_APPROVAL_AND_METADATA` | Whole lesson | `$.studyMaterials` | Image/audio accuracy/reuse, metadata and delivery need approval; no assets fetched |
| review / `EDITORIAL_APPROVAL_PENDING` | Whole lesson | `$` | Source import is not linguistic, pedagogical or public-reuse approval |

## Lesson 19 — qof (ק)

| Severity / code | Record / source ID | Exact source path | Review requirement |
| --- | --- | --- | --- |
| review / `NON_ENGLISH_SCRIPT` | Q12, ID 1742225924868 | `$.exercises[11].additionalData.pairs.ף` | English API content includes Cyrillic text/transcription; editorial localization review required |
| review / `NON_ENGLISH_SCRIPT` | Q12, ID 1742225924868 | `$.exercises[11].additionalData.pairs.צ` | English API content includes Cyrillic text/transcription; editorial localization review required |
| review / `NON_ENGLISH_SCRIPT` | Q12, ID 1742225924868 | `$.exercises[11].additionalData.pairs.ק` | English API content includes Cyrillic text/transcription; editorial localization review required |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B5 | `$.studyMaterials[4]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B7 | `$.studyMaterials[6]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B9 | `$.studyMaterials[8]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B13 | `$.studyMaterials[12]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B14 | `$.studyMaterials[13]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B15 | `$.studyMaterials[14]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B16 | `$.studyMaterials[15]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B17 | `$.studyMaterials[16]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q3, ID 1742225924859 | `$.exercises[2]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `NON_POC_CHOICE_COUNT` | Q5, ID 1742225924861 | `$.exercises[4]` | Valid source choice count needs generalization beyond the fixed Aleph contract |
| review / `NON_POC_CHOICE_COUNT` | Q10, ID 1742225924866 | `$.exercises[9]` | Valid source choice count needs generalization beyond the fixed Aleph contract |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q12, ID 1742225924868 | `$.exercises[11]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `ENGLISH_SOUND_ANALOGY` | B2 | `$.studyMaterials[1].content` | Review English vowel/consonant analogies and dialect scope |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | B8 | `$.studyMaterials[7].content` | Review absolute sound/silence rules and exceptions |
| review / `ARTICULATION_TRADITION` | B8 | `$.studyMaterials[7].content` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ENGLISH_SOUND_ANALOGY` | B14 | `$.studyMaterials[13].translation` | Review English vowel/consonant analogies and dialect scope |
| review / `MEDIA_APPROVAL_AND_METADATA` | Whole lesson | `$.studyMaterials` | Image/audio accuracy/reuse, metadata and delivery need approval; no assets fetched |
| review / `EDITORIAL_APPROVAL_PENDING` | Whole lesson | `$` | Source import is not linguistic, pedagogical or public-reuse approval |

## Lesson 20 — resh (ר)

| Severity / code | Record / source ID | Exact source path | Review requirement |
| --- | --- | --- | --- |
| review / `NON_ENGLISH_SCRIPT` | Q7, ID 1742226024448 | `$.exercises[6].additionalData.pairs.רִ` | English API content includes Cyrillic text/transcription; editorial localization review required |
| review / `NON_ENGLISH_SCRIPT` | Q7, ID 1742226024448 | `$.exercises[6].additionalData.pairs.רֶ` | English API content includes Cyrillic text/transcription; editorial localization review required |
| review / `NON_ENGLISH_SCRIPT` | Q7, ID 1742226024448 | `$.exercises[6].additionalData.pairs.רַ` | English API content includes Cyrillic text/transcription; editorial localization review required |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B5 | `$.studyMaterials[4]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B7 | `$.studyMaterials[6]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B9 | `$.studyMaterials[8]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B13 | `$.studyMaterials[12]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B14 | `$.studyMaterials[13]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B15 | `$.studyMaterials[14]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B16 | `$.studyMaterials[15]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B17 | `$.studyMaterials[16]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q2, ID 1742226024443 | `$.exercises[1]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `NON_POC_CHOICE_COUNT` | Q5, ID 1742226024446 | `$.exercises[4]` | Valid source choice count needs generalization beyond the fixed Aleph contract |
| review / `NON_POC_CHOICE_COUNT` | Q6, ID 1742226024447 | `$.exercises[5]` | Valid source choice count needs generalization beyond the fixed Aleph contract |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q7, ID 1742226024448 | `$.exercises[6]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `NON_POC_CHOICE_COUNT` | Q10, ID 1742226024451 | `$.exercises[9]` | Valid source choice count needs generalization beyond the fixed Aleph contract |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q14, ID 1742226024455 | `$.exercises[13]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `NON_POC_CHOICE_COUNT` | Q16, ID 1742226024457 | `$.exercises[15]` | Valid source choice count needs generalization beyond the fixed Aleph contract |
| review / `ONE_SIDED_TRUE_FALSE` | Whole lesson | `$.exercises` | All true/false answers have the same key; review learning quality, not a proof of wrong answers |
| review / `ARTICULATION_TRADITION` | Whole lesson | `$.description` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ARTICULATION_TRADITION` | B2 | `$.studyMaterials[1].content` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ARTICULATION_TRADITION` | B3 | `$.studyMaterials[2].content` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | B8 | `$.studyMaterials[7].content` | Review absolute sound/silence rules and exceptions |
| review / `ARTICULATION_TRADITION` | B19 | `$.studyMaterials[18].content` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ENGLISH_SOUND_ANALOGY` | Q1, ID 1742226024442 | `$.exercises[0].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `ARTICULATION_TRADITION` | Q1, ID 1742226024442 | `$.exercises[0].tip` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | Q9, ID 1742226024450 | `$.exercises[8].content` | Review absolute sound/silence rules and exceptions |
| review / `ARTICULATION_TRADITION` | Q12, ID 1742226024453 | `$.exercises[11].tip` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `MEDIA_APPROVAL_AND_METADATA` | Whole lesson | `$.studyMaterials` | Image/audio accuracy/reuse, metadata and delivery need approval; no assets fetched |
| review / `EDITORIAL_APPROVAL_PENDING` | Whole lesson | `$` | Source import is not linguistic, pedagogical or public-reuse approval |

## Lesson 21 — shin (ש)

| Severity / code | Record / source ID | Exact source path | Review requirement |
| --- | --- | --- | --- |
| review / `EMPTY_IMAGE_BODY_WITH_CAPTION` | B3 | `$.studyMaterials[2].content` | Caption/media are present but body is empty; explicitly review the presentation mapping; no fallback or deletion applied |
| review / `TOKENIZED_MEDIA_URL` | B3 | `$.studyMaterials[2].imageUrl` | Treat download tokens as access capabilities; do not copy directly into public assets |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B4 | `$.studyMaterials[3]` | Recognized source type is not implemented in the Aleph renderer |
| review / `EMPTY_IMAGE_BODY_WITH_CAPTION` | B6 | `$.studyMaterials[5].content` | Caption/media are present but body is empty; explicitly review the presentation mapping; no fallback or deletion applied |
| review / `DUPLICATE_STUDY_TEXT` | B6 | `$.studyMaterials[5]` | Exact normalized study text repeated within lesson |
| review / `TOKENIZED_MEDIA_URL` | B6 | `$.studyMaterials[5].imageUrl` | Treat download tokens as access capabilities; do not copy directly into public assets |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B7 | `$.studyMaterials[6]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B10 | `$.studyMaterials[9]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B12 | `$.studyMaterials[11]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B14 | `$.studyMaterials[13]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B18 | `$.studyMaterials[17]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B19 | `$.studyMaterials[18]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B20 | `$.studyMaterials[19]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B21 | `$.studyMaterials[20]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B22 | `$.studyMaterials[21]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q4, ID 1742226179405 | `$.exercises[3]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q11, ID 1742226179412 | `$.exercises[10]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `ONE_SIDED_TRUE_FALSE` | Whole lesson | `$.exercises` | All true/false answers have the same key; review learning quality, not a proof of wrong answers |
| review / `ENGLISH_SOUND_ANALOGY` | Whole lesson | `$.description` | Review English vowel/consonant analogies and dialect scope |
| review / `ARTICULATION_TRADITION` | B2 | `$.studyMaterials[1].content` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ARTICULATION_TRADITION` | B3 | `$.studyMaterials[2].description` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ARTICULATION_TRADITION` | B5 | `$.studyMaterials[4].content` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ARTICULATION_TRADITION` | B15 | `$.studyMaterials[14].content` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `ENGLISH_SOUND_ANALOGY` | Q1, ID 1742226179402 | `$.exercises[0].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | Q5, ID 1742226179406 | `$.exercises[4].content` | Review absolute sound/silence rules and exceptions |
| review / `ENGLISH_SOUND_ANALOGY` | Q5, ID 1742226179406 | `$.exercises[4].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `ENGLISH_SOUND_ANALOGY` | Q6, ID 1742226179407 | `$.exercises[5].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | Q12, ID 1742226179413 | `$.exercises[11].content` | Review absolute sound/silence rules and exceptions |
| review / `ARTICULATION_TRADITION` | Q12, ID 1742226179413 | `$.exercises[11].tip` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q14, ID 1742226179415 | `$.exercises[13].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `MEDIA_APPROVAL_AND_METADATA` | Whole lesson | `$.studyMaterials` | Image/audio accuracy/reuse, metadata and delivery need approval; no assets fetched |
| review / `EDITORIAL_APPROVAL_PENDING` | Whole lesson | `$` | Source import is not linguistic, pedagogical or public-reuse approval |

## Lesson 22 — tav (ת)

| Severity / code | Record / source ID | Exact source path | Review requirement |
| --- | --- | --- | --- |
| review / `NON_ENGLISH_SCRIPT` | Q4, ID 1742226369537 | `$.exercises[3].additionalData.pairs.פ` | English API content includes Cyrillic text/transcription; editorial localization review required |
| review / `NON_ENGLISH_SCRIPT` | Q4, ID 1742226369537 | `$.exercises[3].additionalData.pairs.ת` | English API content includes Cyrillic text/transcription; editorial localization review required |
| review / `NON_ENGLISH_SCRIPT` | Q4, ID 1742226369537 | `$.exercises[3].additionalData.pairs.שׁ` | English API content includes Cyrillic text/transcription; editorial localization review required |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B4 | `$.studyMaterials[3]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B6 | `$.studyMaterials[5]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B8 | `$.studyMaterials[7]` | Recognized source type is not implemented in the Aleph renderer |
| error / `EMPTY_REQUIRED_TEXT` | B8 | `$.studyMaterials[7].content` | Required nonempty text is missing |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B10 | `$.studyMaterials[9]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B12 | `$.studyMaterials[11]` | Recognized source type is not implemented in the Aleph renderer |
| error / `EMPTY_REQUIRED_TEXT` | B12 | `$.studyMaterials[11].content` | Required nonempty text is missing |
| review / `DUPLICATE_STUDY_TEXT` | B12 | `$.studyMaterials[11]` | Exact normalized study text repeated within lesson |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B14 | `$.studyMaterials[13]` | Recognized source type is not implemented in the Aleph renderer |
| review / `RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` | B16 | `$.studyMaterials[15]` | Recognized source type is not implemented in the Aleph renderer |
| error / `EMPTY_REQUIRED_TEXT` | B16 | `$.studyMaterials[15].content` | Required nonempty text is missing |
| review / `DUPLICATE_STUDY_TEXT` | B16 | `$.studyMaterials[15]` | Exact normalized study text repeated within lesson |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q4, ID 1742226369537 | `$.exercises[3]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q8, ID 1742226369541 | `$.exercises[7]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `NON_POC_CHOICE_COUNT` | Q9, ID 1742226369542 | `$.exercises[8]` | Valid source choice count needs generalization beyond the fixed Aleph contract |
| review / `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED` | Q12, ID 1742226369545 | `$.exercises[11]` | Recognized matching-pairs structure needs an accessible interaction and explicit grading model |
| review / `ONE_SIDED_TRUE_FALSE` | Whole lesson | `$.exercises` | All true/false answers have the same key; review learning quality, not a proof of wrong answers |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | B5 | `$.studyMaterials[4].content` | Review absolute sound/silence rules and exceptions |
| review / `ARTICULATION_TRADITION` | B5 | `$.studyMaterials[4].content` | Approve articulation/dagesh rules and modern versus traditional pronunciation scope |
| review / `VOWEL_LENGTH_OR_REDUCTION` | Q6, ID 1742226369539 | `$.exercises[5].tip` | Approve vowel length/reduction claims and the pronunciation tradition |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | Q10, ID 1742226369543 | `$.exercises[9].content` | Review absolute sound/silence rules and exceptions |
| review / `SILENCE_OR_ABSOLUTE_CLAIM` | Q10, ID 1742226369543 | `$.exercises[9].tip` | Review absolute sound/silence rules and exceptions |
| review / `ENGLISH_SOUND_ANALOGY` | Q11, ID 1742226369544 | `$.exercises[10].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `ENGLISH_SOUND_ANALOGY` | Q14, ID 1742226369547 | `$.exercises[13].tip` | Review English vowel/consonant analogies and dialect scope |
| review / `MEDIA_APPROVAL_AND_METADATA` | Whole lesson | `$.studyMaterials` | Image/audio accuracy/reuse, metadata and delivery need approval; no assets fetched |
| review / `EDITORIAL_APPROVAL_PENDING` | Whole lesson | `$` | Source import is not linguistic, pedagogical or public-reuse approval |

