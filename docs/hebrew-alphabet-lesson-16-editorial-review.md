# Ayin (lesson 16) editorial review

Reviewed against the pinned raw snapshot
`.local/alphabet-course-imports/v1/2026-10-19T14-27-01-990Z-cc446f/raw/lesson-16.raw.json`,
SHA-256 `1aabe9e486abc62d4327038eb0c117343ae97467578d349ec1068893b2783401`. Checked
against `docs/hebrew-alphabet-editorial-rules.md`.

| # | Original | Problem | Correction | Confidence | Decision |
| - | -------- | ------- | ---------- | ---------- | -------- |
| 1 | Block 0 (`MAIN_TITLE`): "Exploring Ayin (ע) and Some New Hebrew Words" | The H1 and title need the title pattern. | `title` "Ayin Hebrew Letter (ע): Sound, Pronunciation & Words" (52 characters), covering "ayin hebrew letter", "hebrew letter ayin sound" and "hebrew ayin pronunciation". H1 via `contentOverrides.blocks["0"]` "Ayin Hebrew Letter (ע): Sound, Words & Practice". The meta description (152 characters) names Aleph for "ayin vs aleph pronunciation". | High | Applied (rule: title pattern) |
| 2 | Block 9: "The final Hey has no separate [h] sound in this word." | He has no final form. | "Hey (ה) at the end of the word has no separate [h] sound here." | High | Applied (rule: "final" means a final form) |
| 3 | Block 11: "Read each word aloud, then press play to compare your pronunciation with the recording." | The web lesson has no audio. | "Read each word aloud." The rest of the block is unchanged. | High | Applied (rule: no audio instructions) |
| 4 | Exercise 5's tip (sourceIndex 4): "Yes, עַיִן is the Hebrew word for 'eye'." | Tip opens with a verdict, shown after a wrong answer too. | "עַיִן is the Hebrew word for 'eye'." | High | Applied (rule: tips never open with "Correct!", Lamed precedent) |
| 5 | Exercise 6 (`MULTIPLE_CHOICE_GRID`, sourceIndex 5): three choices (cake, bread, pie) | The schema required exactly four choices for a grid, and the raw parse runs before holdouts, so the lesson could not build. The same shape is in lessons 16–20 and 22 (11 exercises per locale). | Owner decision 2026-11-04: the schema accepts 3 or 4 grid choices, and `Practice.astro` lays a 3-choice grid out as a single column, like `MULTIPLE_CHOICE_COLUMN`. The audit no longer flags a 3-choice grid. No published lesson has a 3-choice grid, so none changes. | High | Applied (owner decision) |
| 6 | Stage map heuristic `theory: [0,1,2,3]` | Block 3 is the "Words to Practice:" subtitle; it would end the theory step with no content under it. | `theory: [0,1,2]` with section headings "How Ayin sounds" (block 1) and "Ayin and the word for “eye”" (block 2, which opens with עַיִן and the transcription key). `examples: [3..18]`: the subtitle opens the examples step with its words. | High | Applied |

No vowel-length claims: block 2's "Vowel length does not distinguish the vowels
taught here" and exercise 10's "does not require a short-versus-long vowel
distinction" rule out both sides, so they stay. Block 1's "a brief catch in
the throat" describes the glottal stop, not a vowel. No uncaveated always/never:
block 1 and exercise 1 say "usually", and exercise 8's "always adds a consonant
sound of its own" keys False, with a tip that names the other pronunciation.
No dagesh-prefix claim (Ayin is not a Bet/Kaf/Pe letter). True/False: exercise
8 keys False (5, 13 and 14 key True). No duplicate example blocks: eight
distinct `WORD_EXAMPLE`s; block 2 and block 7 both explain עַיִן, but block 2
is the theory text, not a second example card. סִיבוּב also appears in the
Samekh lesson (a different lesson; "rotation" stays per the Samekh decision).
No tokenized audio URLs. No app-screen references, no images.

The lesson doesn't name Chet, so the [ch]/[kh] bridge rule doesn't apply;
block 11 explains kh on its own (Nun precedent). "Samekh gives the final [s]"
(block 5) and "the final n" (block 7) name a sound at the end of the word, not
a "final <Letter>" form, so they stay. "Yud", "Hey" and "Kamatz Gadol" are app
spellings and stay. "Conclusions" stays (EN precedent). Exercise 8's tip opens
"False." and exercise 14's "True.": these state the answer key and never
contradict a learner, so they stay (owner decision 1). The five reading-practice
words (גַּן, אָבַד, סִיבוּב, יָד, טוֹב) contain no Ayin; the examples intro says
"five more words for reading practice", not "Ayin words". Every letter used is
introduced by lesson 16. Stress checked: [ko-ES], [A-yin], [u-GA], [NA-khal].

The intro's "just like Aleph" is the Aleph lesson's own claim (Aleph is usually
silent in everyday Modern Hebrew), not a new one, and links to that lesson.

All four `MATCH_PAIRS` have three pairs, and `derangedPairOrder` leaves no
item in its own row.

## Owner decisions needed

1. **"True." / "False." openers.** Make the "Tips never open with
   'Correct!'" rule explicit: a tip may open with "True." or "False." (FR
   "Vrai." / "Faux."), because it states the answer, not a verdict on the
   learner; "Yes," / "Oui," is dropped (Lamed precedent). Recommended: yes.

Resolved 2026-11-04: approved. Decision 1 is added to the "Tips never open
with 'Correct!'" rule in `docs/hebrew-alphabet-editorial-rules.md` (and its FR
bullet).
