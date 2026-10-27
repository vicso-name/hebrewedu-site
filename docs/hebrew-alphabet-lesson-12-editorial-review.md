# Lamed (lesson 12) editorial review

Reviewed against the pinned raw snapshot
`.local/alphabet-course-imports/v1/2026-10-19T14-27-01-990Z-cc446f/raw/lesson-12.raw.json`,
SHA-256 `239f767aed61efa3a3b7fc17ad7a3bd9c1206f0138c2ba342b2388586cb147be`. Checked
against `docs/hebrew-alphabet-editorial-rules.md`.

| # | Original | Problem | Correction | Confidence | Decision |
| - | -------- | ------- | ---------- | ---------- | -------- |
| 1 | Block 0 (`MAIN_TITLE`): "Exploring Lamed (ל) and Learning New Hebrew Words" | Title pattern needed for H1/title. | `title` "Lamed Hebrew Letter (ל): Sound & Words" (38); H1 via `contentOverrides.blocks["0"]` "Lamed Hebrew Letter (ל): Sound, Words & Practice". | High | Applied (rule: title pattern) |
| 2 | Block 2 (`STRIPED_BLOCK`): Lamed as the prefix "to"/"for", לְדָוִד [le-da-vid] | Unsupported block type: `StudyBlock.astro` has no `STRIPED_BLOCK` renderer. | Held out (Chet precedent). Exercise 5 tests the prefix, so `copy.theory.intro` restates the source's own point: "At the start of a word, Lamed can also be a prefix meaning “to” or “for,” as in לְדָוִד [le-da-vid], “to David.”" | High | Applied (holdout; intro owner to confirm, decision 1) |
| 3 | Block 9 (`SUBTITLE`): "Pronounce these words yourself, then hit the play button to compare your pronunciation with the speaker's. The Latin transcriptions are reading aids, not IPA. …" | The web lesson has no audio, because source audio is never carried through, so the play-button instruction is false here. This instruction paragraph is also a `SUBTITLE`, so the sentence would render as an `h2`. | Held out. Its "reading aids, not IPA" note moved to `copy.examples.intro` ("Read each one aloud; the Latin transcriptions are reading aids, not IPA."). | High | Applied (contradiction with the rendered page) |
| 4 | Exercise 2's tip (sourceIndex 1): "Yes, Lamed (ל) is the 12th letter…" | Tip opens with a verdict, shown after a wrong answer too. | "Lamed (ל) is the 12th letter in the Hebrew alphabet." | High | Applied (rule: tips never open with "Correct!") |
| 5 | Exercise 3 (`MATCH_PAIRS`, sourceIndex 2): נ → [n] | Nun is not introduced until lesson 14. Pairs data can't be patched. | Kept and flagged `unintroduced-letters` (Tet precedent). It can be matched by elimination, and the tip names Nun. | Medium | Applied (flag) |
| 6 | Stage map heuristic `theory: [0,1,3]` | Would end the theory step on the bare "Words to Practice:" subtitle. | `theory: [0,1]`, `examples: [3..8, 10..16]` (2 and 9 held out); section heading "How Lamed sounds" (block 1). | High | Applied |

No vowel-length claims. Exercise 16's tip "no special vowel length is
required" rules length out, so it stays. No uncaveated always/never. The held-out block 2
already said "it is not always pronounced [le]". No dagesh-prefix claim:
לֵב's Bet is [v] because it has no dagesh, which is stated correctly. True/False:
exercise 9 is False ("four letters"), exercises 2, 5 and 13 are True. No duplicate
example blocks (seven distinct words). No tokenized audio URLs. "Yud"
(blocks 7, exercise 9) is the app spelling and stays, per the "App spelling
vs SEO spelling" rule. Block 7's "The final [d]" names a sound, not a
letter, so the "final" rule doesn't apply. Block 7 and exercise 11 write
לֶחֶם as [lekhem]. The lesson never names Chet, so the new "one sound, two
transcriptions" rule has no place to bridge, and Kaf already bridged it.
The closing "Conclusions" heading stays (EN precedent). The intro's "tallest
Hebrew letter" matches the alphabet guide's own Lamed row.

All four `MATCH_PAIRS` have three pairs, and `derangedPairOrder` leaves no item in its own row.

**Recommended separate task:** `STRIPED_BLOCK` (the highlighted note block)
appears in 6 unpublished lessons: 12, 13, 15, 17, 18 and 21, eight blocks
in total. Each one is held out until a renderer exists. Building that renderer now would
stop us from dropping key teaching notes from those lessons.

## Owner decisions needed

1. **Prefix note in the intro** (row 2). Recommended: keep it as applied. The source
   teaches it, and exercise 5 tests it. Without the note, exercise 5 would test something the page never taught.
2. **Exercise 7's tip** (sourceIndex 6): "Each Hebrew word represents a common
   concept." This explains nothing after a wrong match. Recommended: "יֶלֶד
   means 'boy', לֶחֶם means 'bread', and לַיְלָה means 'night'."

Resolved 2026-10-27: both recommendations approved. (1) the prefix sentence
stays in `copy.theory.intro`, and the alphabet guide's new Lamed paragraph
says the same; (2) `contentOverrides.exercises["6"].tip` is "יֶלֶד means
'boy', לֶחֶם means 'bread', and לַיְלָה means 'night'."
