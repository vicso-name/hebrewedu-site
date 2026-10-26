# Tet (lesson 9) editorial review

Reviewed against the pinned raw snapshot
`.local/alphabet-course-imports/v1/2026-10-19T14-27-01-990Z-cc446f/raw/lesson-9.raw.json`,
SHA-256 `2fba3be74b09890b299fcd696cc511c3404bc1f5293011f11f8e8fd0410b9899`. Checked
against `docs/hebrew-alphabet-editorial-rules.md`.

| # | Original | Problem | Correction | Confidence | Decision |
| - | -------- | ------- | ---------- | ---------- | -------- |
| 1 | Block 0 (`MAIN_TITLE`): "Exploring Tet (ט) and Learning New Hebrew Words" | Title pattern needed for H1/title. | `title` "Tet Hebrew Letter (ט): Sound & Words" (36); H1 via `contentOverrides.blocks["0"]` "Tet Hebrew Letter (ט): Sound, Words & Practice". | High | Applied (rule: title pattern) |
| 2 | Block 5: "The final Bet has no Dagesh (ב), so it gives [v]." | "Final Bet" reads as a final letter form; Bet has none. | "Bet at the end of the word has no Dagesh (ב), so it gives [v]." | High | Applied (rule: "final" means a final form) |
| 3 | Block 7: "Final Chet (ח) adds [ch]…" | Same: Chet has no final form. | "Chet at the end of the word (ח) adds [ch]…" | High | Applied (rule: "final" means a final form) |
| 4 | Block 9 and exercise 6's tip (sourceIndex 5): "the final Bet without Dagesh provides/gives [v]" | Same. | "Bet at the end of the word, without Dagesh, provides/gives [v]" | High | Applied (rule: "final" means a final form) |
| 5 | Exercise 9's tip (sourceIndex 8): "The final ch represents the Chet sound" | "final" next to the Chet sound invites the same misreading, though it names the transcription letters. | "The ch at the end represents the Chet sound" | Medium | Applied (same rule, by extension) |
| 6 | Exercise 11's tip (sourceIndex 10): "Correct! Tet (ט) is the 9th letter…" | The explanation is shown after a wrong answer too (`Practice.astro`), so "Correct!" contradicts a learner who chose False. | "Tet (ט) is the 9th letter in the Hebrew alphabet." | High | Applied (contradiction inside the lesson) |
| 7 | Exercise 12 (sourceIndex 11) distractor שלוֹם | Uses letters not yet introduced (Shin, Lamed, final Mem). | Flagged `unintroduced-letters`, not blocking (Aleph–Chet precedent). | High | Applied (flag only) |
| 8 | Stage map heuristic `theory: [0,1,2,3]` | Would end the theory step on the bare "Words to Practice:" subtitle (heading with no content). | `theory: [0,1,2]`, `examples: [3..9]`; section headings "How Tet sounds" (block 1) and "Tet and the word for “good”" (block 2). | High | Applied |

No vowel-length claims (Kamatz Gadol and Patah give [a], Segol [e], Holam
[o]; nothing says long/short). No absolute always/never claims. No
dagesh-prefix claim (the word-initial בּ in בֶּטַח is described for this word
only). No duplicate example blocks (טוֹב "good" and בֶּטַח "sure" are
distinct). No tokenized audio URLs (normalization drops raw media). No
`TEXT_IMAGE` blocks. True/False set has one False among four (exercise 2,
"Does טוֹב mean 'bad'?"). The closing "Conclusions" heading is correct
English and stays, as in Zayin and Chet. No holdouts: every block and
exercise type has a renderer.

Block 2's Talmud reference checks out: Bava Kamma 55a ties Tet to "good"
because its first occurrence in the Torah is טוֹב (Genesis 1:4, "that it was
good"). The block presents it as a traditional interpretation, not as
etymology, so it stays as written.

Exercise 8 (sourceIndex 7) is a Dalet review question; review items from
earlier letters are a course pattern, so it stays.

## Owner decisions (resolved 2026-10-26)

1. **Tet and Tav sound the same.** The lesson never says that in Modern
   Hebrew Tet (ט) and Tav (ת) are both [t] — the main spelling trap for this
   letter, and `tet vs tav hebrew pronunciation` is mapped to this page in
   `docs/seo/core/keywords.csv`. Recommended: yes, add one sentence to
   `copy.theory.intro`: "In Modern Hebrew, Tet sounds exactly like Tav (ת),
   a later letter, so you learn which one a word uses by its spelling."
2. **Unpointed distractors in exercise 12** (sourceIndex 11): חג has no
   niqqud and שלוֹם only a Holam, while טוֹב and בֶּטַח are fully pointed.
   Recommended: leave as is (the answer isn't given away, since בֶּטַח is
   pointed too, and the `choices` override would change source Hebrew).
3. **New general rule** from row 6: an exercise tip never opens with
   "Correct!"/"Right!", since it also shows after a wrong answer.
   Recommended: yes, add to `docs/hebrew-alphabet-editorial-rules.md`.

Resolved: (1) approved, the sentence is in `copy.theory.intro` (final
wording: "…so you have to learn which of the two each word is spelled
with"), and the alphabet guide's new Tet paragraph says the same; (2) left as
is; (3) approved, added as "Tips never open with “Correct!”" to the EN rules
and to the FR file's language-neutral list.
