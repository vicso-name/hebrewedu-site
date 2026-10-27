# Kaf (lesson 11) editorial review

Reviewed against the pinned raw snapshot
`.local/alphabet-course-imports/v1/2026-10-19T14-27-01-990Z-cc446f/raw/lesson-11.raw.json`,
SHA-256 `2307a9b005846c8f4bdc271796c109f60f5ad0f81334a2836da7a4cade9412dc`. Checked
against `docs/hebrew-alphabet-editorial-rules.md`.

| # | Original | Problem | Correction | Confidence | Decision |
| - | -------- | ------- | ---------- | ---------- | -------- |
| 1 | Block 0 (`MAIN_TITLE`): "Mastering Kaf and Khaf (כּ/כ): Understanding Their Two Pronunciations" | Title pattern needed for H1/title. | `title` "Kaf Hebrew Letter (כ): Kaf, Khaf & Final Kaf" (44); H1 via `contentOverrides.blocks["0"]` "Kaf Hebrew Letter (כ): Kaf, Khaf, Final Kaf & Practice". | High | Applied (rule: title pattern) |
| 2 | Block 12: "The patah under the final Chet is pronounced before the consonant" | "final Chet" reads as a final letter form; Chet has none. | "The patah under the Chet at the end of the word is pronounced before the consonant". | High | Applied (rule: "final" means a final form) |
| 3 | Exercise 13's tip (sourceIndex 12): "Yes. כָּךְ is [kakh]: …" | Tip opens with a verdict, shown after a wrong answer too. | "Yes. " dropped; the explanation stays as is. | High | Applied (rule: tips never open with "Correct!") |
| 4 | Block 6 (`TEXT_IMAGE`, dagesh): `description` is empty; block 3 (`TEXT_IMAGE`, Kaf Sofit) has only "Kaf Sofit" | Missing image description. Source images are withheld, and a `TEXT_IMAGE` with no `illustrations` entry renders nothing, so both blocks' text would be dropped. | `illustrations["3"]`: ך, "Kaf Sofit", "Final Kaf: Kaf with its stroke extended below the line, written only at the end of a word." `illustrations["6"]`: כּ, "Kaf with Dagesh", "Kaf with a dot (dagesh) in its center, pronounced [k]. Without the dot, Kaf is pronounced [kh]." (Bet precedent.) | High | Applied (missing image description) |
| 5 | Block 13 (`WORD_EXAMPLE` כָּךְ): translation "In this way" | Capitalized, unlike the other two words' translations; block 14 and exercise 7 also teach "so". | "in this way; so" (same format as block 11's "force; power; strength"). | High | Applied (contradiction inside the lesson) |
| 6 | Stage map heuristic `theory: [0,1,2]`, `examples: [3..16]` | Checked: theory ends on block 2's content, not a heading; every source `SUBTITLE` (5, 8, 15) sits in the examples step with its content. | Kept; section headings "How Kaf sounds" (block 1) and "Five letters with final forms" (block 2). | High | Applied |
| 7 | Cluster primary keyword `chaf hebrew letter` (170, KD 0); `kaf hebrew letter` (170, KD 3) is secondary. | The slug, hub, guide and title pattern all say "Kaf". | `kaf hebrew letter` is now the cluster primary and `chaf hebrew letter` is secondary; the meta and the intro name "Khaf (also spelled Chaf)" once. | Medium | Applied, owner to confirm (decision 1) |

No uncorrected vowel-length claims. Block 14's "you do not need to make this vowel
long in modern Hebrew" and exercise 10's tip "Modern Hebrew does not require a
long [a] here" rule length out, which the rule allows. Block 1's "briefly
block the airflow" is about how the consonant is made, not vowel length. No
"always/never" claims. Block 3's "written only at the end of a word" is
accurate for ך. Dagesh-prefix rule: nothing says that Kaf has a dagesh because it starts a
word. Every [k]/[kh] statement is tied to the dagesh itself "in text with
pronunciation marks", so there is nothing to qualify. True/False set:
exercise 2 is False ("twelfth letter"), exercises 5, 9 and 13 are True. No duplicate
example blocks (כּוֹכָב, כּוֹחַ and כָּךְ are different words). No tokenized audio URLs
(normalization drops raw media). No holdouts: every block and exercise type
has a renderer. Exercises use only letters already taught (Bet, Gimel, Vav,
Chet, Yod, Kaf). Block 2 lists the other four final pairs only as a preview.
The closing "Conclusions" heading is correct English and stays (Zayin–Yod
precedent). "Final Kaf" in blocks 4 and 14 and exercises 6 and 13 is
correct: Kaf has a real final form.

Exercises 12 and 14 (sourceIndex 11, 13) both ask for a translation of כּוֹחַ, but they
have different correct options ("force", "power") and different distractors. Together they
teach that the word has several meanings, so they are not duplicates and both stay.
All four `MATCH_PAIRS` have three pairs, and for three items every derangement
is a rotation. `derangedPairOrder` leaves no item in its own row.

## Owner decisions needed

1. **Primary keyword: Kaf vs Chaf.** Both have 170 searches a month. Recommended: keep row 7 as applied.
   `kaf hebrew letter` becomes the primary keyword because it matches the slug, hub, title pattern and guide.
   Keep `chaf hebrew letter` as a secondary keyword, covered by "Khaf (also spelled Chaf)" in the
   meta and intro. The source's own spelling, "Khaf" (block 0, and kh in
   every transcription), stays everywhere else.
2. **Chet written [kh] here, [ch] in the Chet lesson.** Block 7 says "Chet (ח)
   also has this [kh] sound", and block 12 transcribes כּוֹחַ as [koakh]. The
   Chet, Tet and Yod lessons write the same sound as [ch]. Recommended: yes,
   override block 7 to "…Chet (ח), written [ch] in the Chet lesson, also
   has this [kh] sound." Leave the transcriptions themselves unchanged, because they
   are consistent inside this lesson.
3. **Exercise 9's tip** (sourceIndex 8): "…it does not mean that you must
   stress the sound." This tip warns against a mistake the lesson never
   suggested, and readers may take "stress" to mean syllable stress. Recommended: replace it with
   "In text with pronunciation marks, the dagesh tells כּ [k] apart from כ
   [kh]."

Resolved 2026-10-27: all three recommendations approved. (1) kept as
applied; (2) `contentOverrides.blocks["7"]` now reads "Chet (ח), written
[ch] in the Chet lesson, also has this [kh] sound", added to
`docs/hebrew-alphabet-editorial-rules.md` as "One sound, two transcriptions
across lessons"; (3) `contentOverrides.exercises["8"].tip` is "In text with
pronunciation marks, the dagesh tells כּ [k] apart from כ [kh]." The
alphabet guide links the lesson from a new Kaf paragraph.
