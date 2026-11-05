# Tsadi (lesson 18) editorial review

Reviewed against the pinned raw snapshot
`.local/alphabet-course-imports/v1/2026-10-19T14-27-01-990Z-cc446f/raw/lesson-18.raw.json`,
SHA-256 `cb4d2d0de661f3c47dbee3567b806595ad93f6489e553d078c5ec7eab9319974`. Checked
against `docs/hebrew-alphabet-editorial-rules.md`.

| # | Original | Problem | Correction | Confidence | Decision |
| - | -------- | ------- | ---------- | ---------- | -------- |
| 1 | Block 0 (`MAIN_TITLE`): "Exploring Tsadi (צ) and Some New Hebrew Words" | The H1 and title need the title pattern. | `title` "Tsadi Hebrew Letter (צ): Tzaddi, Sound & Final Tsadi" (52 characters); "Tzaddi" is the cluster's primary keyword (40/month, against tsade 30, tzadi 20, tsadi 10). Meta (147): "Learn the Hebrew letter Tsadi (צ), also spelled Tzaddi or Tsade: its [ts] sound, final Tsadi (ץ), words like צֵל (shadow) and interactive practice." H1 via `contentOverrides.blocks["0"]` "Tsadi Hebrew Letter (צ): Sound, Final Tsadi & Practice". The intro names "also spelled Tzaddi, Tzadi or Tsade" once (owner decision 1). App and SEO spellings are both "Tsadi". | High | Applied (rule: title pattern) |
| 2 | Block 2 (`STRIPED_BLOCK`): the lesson's pronunciation key | No `STRIPED_BLOCK` renderer. | Held out. The one note the lesson relies on, ch as the throaty sound in "loch", is repeated in block 11 and in question 13's tip; ts as in "cats" is in blocks 1, 3 and 20. | High | Applied (holdout, unsupported type) |
| 3 | Block 3 (`TEXT_IMAGE`) has no web illustration | Missing image description. | Mark card ץ "Tsadi Sofit": "Final Tsadi: Tsadi with its stem extended straight down below the line, written at the end of a word and pronounced [ts]." (Kaf/Mem/Nun caption pattern.) | High | Applied (missing image description) |
| 4 | Block 9: "Tsere does not require a long vowel in modern Hebrew." | A one-sided length disclaimer. | "Say tsel as one syllable, with a steady e; no special vowel length is required." | High | Applied (rule: vowel length, Mem decision) |
| 5 | Block 13: "Read each word aloud, then use its play button to compare your reading with the recording." | No audio on the web. | "Read each word aloud." The rest of the block is unchanged. | High | Applied (rule: no audio instructions) |
| 6 | Tips of questions 2, 12 and 15 open "Yes."; questions 5 and 8 open "No." | Verdict openers, shown after a wrong answer too. | Dropped; each explanation is otherwise unchanged. | High | Applied (rule: tips never open with "Correct!", Pe decision) |
| 7 | Stage map heuristic `theory: [0,1]` | The Tsadi Sofit card (block 3) would open the examples step without a heading. | `theory: [0,1,3]` ("How Tsadi sounds", "Tsadi’s final form" over the ץ card); `examples: [4..20]`: the paragraph on where each form goes opens the examples step, before "Words to Practice:". | High | Applied |

No other vowel-length claims: block 11's "do not require a difference in
length" rules out both sides. Always/never: question 12 says Tsadi Sofit is used
"only at the end of a word", but the prompt and block 4 both limit it to
"ordinary Hebrew words", so the exception is gestured at. Tsadi takes no
[b]/[v]-type alternation, so the prefix-effect rule has nothing to attach to;
block 4 and question 15 already say a dagesh in Tsadi doesn't require doubling.
True/False: questions 5 and 8 key False (2, 12 and 15 key True). No duplicate
example blocks: three Tsadi `WORD_EXAMPLE`s (צַיִד, צֵל, חֵפֶץ) and five
reading-practice words (גַּן, בִּטָּחוֹן, מְהֵרָה, אָבַד, פּוֹעַל); block 13's prose
introduces them and adds חֶבֶל, which only appears in questions 9 and 13. No
tokenized audio URLs, no app-screen references. "Final" stays where it names
the real final form (Tsadi Sofit, "the final [ts]", question 14's
"[ ts ] final" pair); "the final d" (block 7, question 6) names the last sound
of the transcription, not a letter form (Ayin precedent "the final n").
Block 20's "the last of the five letters with a final form in alphabetical
order" is correct (Kaf, Mem, Nun, Pe, Tsadi). "Yud", "Pey", "Tsere" are app
spellings and stay. Chet is written [ch] here, as in the Chet lesson, so the
Kaf bridging rule doesn't apply. "Conclusions" and "Words to Practice:" stay
(EN precedent). Stress checked: [TSA-yid], [tsel], [CHE-fets], [gan],
[bi-ta-CHON], [me-he-RA], [a-VAD], [PO-al], [CHE-vel].

Question 1 is a 4-choice grid; questions 6 and 10 are 3-choice grids and render
as one column (Ayin decision). All three `MATCH_PAIRS` have three pairs, and
`derangedPairOrder` leaves no item in its own row.

## Owner decisions needed

1. **Other spellings in title, meta and intro.** The lesson and course spell
   the letter Tsadi; searchers more often type Tzaddi (40), Tsade (30) or
   Tzadi (20, the spelling the alphabet guide uses). Recommended: keep
   "Tzaddi" in the title, "also spelled Tzaddi or Tsade" in the meta and
   "also spelled Tzaddi, Tzadi or Tsade" in the intro, as drafted.

Resolved 2026-11-05: approved. Decision 1 stays as drafted. The FR decision
(moving a held-out block's own sentence where the lesson relies on it) is added
to `docs/hebrew-alphabet-editorial-rules.md` as "Held-out block that the lesson
points back to".
