# Samekh (lesson 15) editorial review

Reviewed against the pinned raw snapshot
`.local/alphabet-course-imports/v1/2026-10-19T14-27-01-990Z-cc446f/raw/lesson-15.raw.json`,
SHA-256 `2ed9a95791826910d13cc9dca35323eadde338be9798fc162be462f95c25b5d6`. Checked
against `docs/hebrew-alphabet-editorial-rules.md`.

| # | Original | Problem | Correction | Confidence | Decision |
| - | -------- | ------- | ---------- | ---------- | -------- |
| 1 | Block 0 (`MAIN_TITLE`): "Exploring Samekh (ס) and Some New Hebrew Words" | The H1 and title need the title pattern. | `title` "Samekh Hebrew Letter (ס): Sound, Sin & Hiriq" (44 characters), covering "samekh hebrew letter" and "samekh vs sin hebrew letters"; the meta description adds "also spelled Samech" for the cluster's primary keyword. H1 via `contentOverrides.blocks["0"]` "Samekh Hebrew Letter (ס): Sound, Hiriq & Practice". | High | Applied (rule: title pattern) |
| 2 | Block 3: "It represents [i], like the vowel in English 'see', without requiring a long vowel." | A one-sided length disclaimer reads as a hint that the vowel is short. | "…like the vowel in English 'see'; no special vowel length is required." The block's later "not a required difference in vowel length" rules out both sides and stays. | High | Applied (rule: vowel length, Mem decision) |
| 3 | Exercise 12's tip (sourceIndex 11): "giving [sa], without requiring a short vowel in Modern Hebrew." | Same one-sided disclaimer, about Patah. | "giving [sa]; no special vowel length is required." | High | Applied (rule: vowel length) |
| 4 | Blocks 5 and 8 (`STRIPED_BLOCK`): the words אִשָּׁה and שִׂיחָה on their own | No `STRIPED_BLOCK` renderer. | Held out. Nothing is lost: blocks 6 and 9 open with the same word and its transcription. | High | Applied (holdout, unsupported type) |
| 5 | Block 4 (`TEXT_IMAGE`): "On this screen you see the letter Alef, decorated with Hiriq. Hiriq is represented by a dot underneath the letter. This is Hiriq Haser." | "On this screen" refers to the app's image, which the web lesson withholds; the page shows a mark card instead. | "Here the letter Alef carries Hiriq, a single dot underneath the letter. This is Hiriq Haser." Illustration: אִ, "Hiriq Haser", built from the source's own image description. | High | Applied (clear fix; owner decision 2 asks whether to make it a rule) |
| 6 | Block 7 (`TEXT_IMAGE`, Hiriq Male) has no web illustration | Missing image description. | Illustration: שִׂי, "Hiriq Male", "Hiriq followed by Yud as a silent vowel-letter, here after Sin, read [si]. It is called Hiriq Male ('with Yud')." This is the source's own image description, without the Hebrew: the caption line is not wrapped in `lang="he"`. | High | Applied (missing image description) |
| 7 | Blocks 6 and 9: "The final Hey (ה) is silent." / "the final Hey (ה) is silent" | He has no final form. | "Hey (ה) at the end of the word is silent." | High | Applied (rule: "final" means a final form) |
| 8 | Block 16: "the first Bet, Shuruk, and final Bet form the syllable [vuv]" | Bet has no final form. | "the first Bet, Shuruk, and second Bet form…" | High | Applied (rule: "final" means a final form) |
| 9 | Block 9: "Chet (ח) has Kamatz Gadol, giving [kha]" | The lesson names Chet and writes its sound kh; the Chet lesson writes it ch. | "Chet (ח), written [ch] in the Chet lesson, has Kamatz Gadol, giving [kha]…" (Mem wording). The block's own kh explanation stays. | High | Applied (rule: one sound, two transcriptions) |
| 10 | Exercises 2, 5, 9 and 13 (`TRUE_FALSE`) all key True | One-sided true/false set. | Exercise 9 (sourceIndex 8) becomes "The letter Yud (י) in 'סִיבוּב' is pronounced as a separate [y] consonant." → False; tip "Yud (י) in סִיבוּב is part of Hiriq Male: it helps represent [i] and has no separate consonant sound." | High | Applied (rule: at least one False) |
| 11 | Exercise 3 (`MATCH_PAIRS`, sourceIndex 2): ת → [t] | Tav is not introduced until lesson 22. The pairs data can't be patched. | Kept and flagged `unintroduced-letters` (Mem/Nun precedent). The learner can match it by elimination, and the tip names Tav. | Medium | Applied (flag) |
| 12 | Stage map heuristic `theory: [0,1,2,3]` | Every theory section after the first gets the copy's third heading, so block 3 would sit under a copy heading directly beneath the "Hiriq Nikkud" subtitle (a doubled heading). | `theory: [0,1]` (section "How Samekh sounds" = block 1); `examples: [2,3,4,6,7,9..18]`: the "Hiriq Nikkud" subtitle opens the examples step with its own text, and "Conclusions" stays with block 18. Lamed precedent for a one-section theory step. | High | Applied |

No other vowel-length claims. No uncaveated always/never. No dagesh-prefix
claim (Samekh is not a Bet/Kaf/Pe letter; "Both Bet letters lack a dagesh"
in blocks 12 and 16 describes these spellings, not a rule). No duplicate
example blocks: three distinct `WORD_EXAMPLE`s (סָבִיב, סוֹד, סִיבוּב), plus
אִשָּׁה, שִׂיחָה and סֵפֶר in prose. No tokenized audio URLs, no audio
instructions, no tip opens with "Correct!". "Yud", "Alef", "Hey" and "Chet"
are app spellings and stay; the copy names neither Yod nor Yud. The source
also uses Shin, Sin, Pe, Resh, Tzere and Holam, which later lessons
introduce; each is explained where it appears. The closing "Conclusions"
heading stays (EN precedent). Stress checked: [i-SHA], [si-KHA], [sa-VIV],
[si-VUV], [SE-fer], [sod].

Both `MATCH_PAIRS` have three pairs, and `derangedPairOrder` (2,0,1) leaves
no item in its own row.

## Owner decisions needed

1. **סִיבוּב = "rotation".** The more common English gloss is "round" or
   "turn" (a lap, a tour). "Rotation" is a correct dictionary sense, and it
   is also in exercise 7's `MATCH_PAIRS` data, which can't be patched: changing
   it would mean holding that exercise out. Recommended: keep "rotation".
2. **New course rule: no app-screen references.** Add to the rules: "The
   web lesson withholds source images. Rewrite 'on this screen' / 'in the
   picture' to point at the mark card ('Here…')." Applied in row 5 already.
   Recommended: yes.

Resolved 2026-11-03: approved. Decision 1: "rotation" stays. Decision 2:
the "No app-screen references" rule is added to
`docs/hebrew-alphabet-editorial-rules.md`.
