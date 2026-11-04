# Pe (lesson 17) editorial review

Reviewed against the pinned raw snapshot
`.local/alphabet-course-imports/v1/2026-10-19T14-27-01-990Z-cc446f/raw/lesson-17.raw.json`,
SHA-256 `076922f39fa8e8eb7ce8d84c55f64ccbda9835bf2101172f1538bff0ba01cd28`. Checked
against `docs/hebrew-alphabet-editorial-rules.md`.

| # | Original | Problem | Correction | Confidence | Decision |
| - | -------- | ------- | ---------- | ---------- | -------- |
| 1 | Block 0 (`MAIN_TITLE`): "Mastering Pey and Fey (פ/פּ): Learning Their Sounds and Common Hebrew Words" | The H1 and title need the title pattern; the lesson spells the letter Pey, the course and primary keyword spell it Pe. | `title` "Pe Hebrew Letter (פ): Pe, Fe & Final Pe" (39 characters, Kaf pattern), covering "pe hebrew letter", "fe hebrew letter" and "final pe". Meta (150) adds "also spelled Pey". H1 via `contentOverrides.blocks["0"]` "Pe Hebrew Letter (פ): Pe, Fe, Final Pe & Practice". The intro's first mention reads "Pe, also spelled Pey (the spelling used in this lesson)"; source blocks keep Pey/Fey. | High | Applied (rules: title pattern; app vs SEO spelling) |
| 2 | Blocks 6 and 9 (`STRIPED_BLOCK`): the words שָׂפָה and פּוֹעַל on their own | No `STRIPED_BLOCK` renderer. | Held out. Nothing is lost: blocks 7 and 10 open with the same word and its transcription. | High | Applied (holdout, unsupported type; Samekh precedent) |
| 3 | Blocks 5, 8 and 12 (`TEXT_IMAGE`) have no web illustration | Missing image description. | Mark cards from each block's own text: פ "Fey (Pey without Dagesh)", פּ "Pey with Dagesh", ף "Fey Sofit" (Bet/Kaf caption pattern). | High | Applied (missing image description) |
| 4 | Blocks 7, 16 and 18: "The final Hey (ה) is silent here." / "The final Hey is silent here." | He has no final form. | "Hey (ה) at the end of the word is silent here." / "Hey at the end of the word is silent here." | High | Applied (rule: "final" means a final form) |
| 5 | Exercise 10's tip (sourceIndex 9): "Modern Hebrew does not require a long [a] here." | A one-sided length disclaimer. | "…it makes [pa]; no special vowel length is required." | High | Applied (rule: vowel length, Mem decision) |
| 6 | Tips of exercises 2, 5, 8 and 11 open "Yes." / "Yes,"; exercise 16's opens "No." | Verdict openers, shown after a wrong answer too. | Dropped; each explanation is otherwise unchanged. "No." is treated like "Yes," (owner decision 1). | High | Applied (rule: tips never open with "Correct!", Ayin decision) |
| 7 | Exercise 6 (sourceIndex 5): "Fey-Sofit" in the prompt and tip | The rest of the lesson writes "Fey Sofit". | "Fey Sofit" (Nun precedent for "Nun-Sofit"). | High | Applied (contradiction inside the lesson) |
| 8 | Stage map heuristic `theory: [0,1,2,3,4]` | Every theory section after the first gets the copy's third heading, so blocks 3 and 4 would repeat it. | `theory: [0,1,2]` ("How Pe sounds", "Pe and the word for “mouth”"); `examples: [3,4,5,7,8,10..22]`: the "One Letter, Two Sounds" subtitle opens the examples step with its text. | High | Applied |

No other vowel-length claims: exercise 13's "without a required difference in
length" rules out both sides. No uncaveated always/never; the intro says final
Pe is "usually pronounced [f]", and blocks 12 and 13 already limit it to "the
words in this lesson". No word-initial-dagesh claim, so the prefix-effect rule
has nothing to attach to; block 4 names Bet, Kaf and Pey as the three
two-sound letters. True/False: exercise 16 keys False (2, 5, 8 and 11 key
True). No duplicate example blocks: three `WORD_EXAMPLE`s (פֶּה, יָפָה, אַף),
plus שָׂפָה and פּוֹעַל in prose. No tokenized audio URLs, no audio
instructions, no app-screen references. "Final" stays where it names the real
final form (Fey Sofit, "final form ף", exercise 3's "[ f ] final" pair).
"Alef", "Yud", "Hey" and "Kamatz Gadol" are app spellings and stay. Sin (שׂ)
is introduced in lesson 21 but explained where it appears (Samekh precedent).
"Conclusions" stays (EN precedent). Stress checked: [sa-FA], [PO-al], [ya-FA],
[pe], [af].

Exercise 14 is a 3-choice `MULTIPLE_CHOICE_GRID` and renders as one column
(Ayin decision). All three `MATCH_PAIRS` have three pairs, and
`derangedPairOrder` leaves no item in its own row.

## Owner decisions needed

1. **"No." opener.** Add to the rule: "No," / "No." (FR "Non.") is a verdict
   like "Yes," and is dropped; "True." / "False." still stay. Applied in
   row 6 already. Recommended: yes.
2. **Blocks 12 and 13 overlap.** The Fey Sofit card's sentence ("…the final
   form of Pey. In the words in this lesson, it appears at the end and
   represents [f].") is followed by a paragraph that repeats it and adds אַף
   and "Sofit means final". Recommended: keep both (the card names the form,
   the paragraph teaches it), rather than holding block 13 out.

Resolved 2026-11-04: approved. Decision 1 is added to the "Tips never open
with 'Correct!'" rule in `docs/hebrew-alphabet-editorial-rules.md` (and its FR
bullet). Decision 2: both blocks stay.
