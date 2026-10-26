# Yod (lesson 10) editorial review

Reviewed against the pinned raw snapshot
`.local/alphabet-course-imports/v1/2026-10-19T14-27-01-990Z-cc446f/raw/lesson-10.raw.json`,
SHA-256 `33ef4ff050d4c9cbc1d0a01fd5c975155e596b240b8167d14d6e3dd53c3fa29b`. Checked
against `docs/hebrew-alphabet-editorial-rules.md`.

| # | Original | Problem | Correction | Confidence | Decision |
| - | -------- | ------- | ---------- | ---------- | -------- |
| 1 | Block 0 (`MAIN_TITLE`): "Exploring Yud (י) and Learning New Hebrew Words" | Title pattern needed for H1/title. | `title` "Yod Hebrew Letter (י): Sound & Words" (36); H1 via `contentOverrides.blocks["0"]` "Yod Hebrew Letter (י): Sound, Words & Practice". | High | Applied (rule: title pattern) |
| 2 | Block 5: "Final Dalet adds [d]." | "Final Dalet" reads as a final letter form; Dalet has none. | "Dalet at the end of the word adds [d]." | High | Applied (rule: "final" means a final form) |
| 3 | Block 7: "Final Yud adds the [y] glide…" | Same: Yud has no final form. | "Yud at the end of the word adds the [y] glide…" | High | Applied (rule: "final" means a final form) |
| 4 | Exercise 16's tip (sourceIndex 15): "final Yud completes חַי [chay]" | Same. | "Yud at the end of the word completes חַי [chay]" | High | Applied (rule: "final" means a final form) |
| 5 | Stage map heuristic `theory: [0,1,2,3]` | Would end the theory step on the bare "Words to Practice:" subtitle (heading with no content). | `theory: [0,1,2]`, `examples: [3..9]`; section headings "How Yod sounds" (block 1) and "Two jobs for Yod" (block 2). | High | Applied |
| 6 | Letter name: the source says "Yud" throughout; slug, hub, alphabet guide and the primary keyword (`yod hebrew letter`, 480) say "Yod" (`yud hebrew letter` is also 480). | Two spellings for one letter. | Title, H1, meta and hand-written copy use "Yod"; the intro's first mention says "Yod, also spelled Yud (the spelling used in this lesson)"; source blocks and exercises keep "Yud". | Medium | Applied, owner to confirm (decision 1) |

No vowel-length claims (Kamatz Gadol and Patah give [a]; Hiriq + Yud give
[i]; nothing says long/short). Block 2's "like ee in English 'see'" is a
sound-quality analogy, not a length claim. No uncaveated absolute claims:
exercise 5 (sourceIndex 4) "Yud must be pronounced [y] in every Hebrew word"
is keyed False, with בִּי as the counterexample. No dagesh-prefix claim (בּ in
exercise 3 is "Bet with Dagesh", not a word-initial rule). No duplicate
example blocks (יָד "hand" and חַי "alive" are distinct). No tokenized audio
URLs (normalization drops raw media). No `TEXT_IMAGE` blocks. True/False set
has three False among four (exercises 2, 5, 9). No tip opens with
"Correct!". The closing "Conclusions" heading is correct English and stays
(Zayin–Tet precedent). No holdouts: every block and exercise type has a
renderer. Every Hebrew item in the exercises uses letters already taught
(Aleph–Yod), so no `unintroduced-letters` flag.

Exercise 2's claim "Yud is one of the smallest letters" is accurate (Yod is
traditionally the smallest letter). Exercises 13 and 15 (sourceIndex 12, 14)
review Hey and Zayin with Kamatz Gadol; review items from earlier letters are
a course pattern, so they stay.

## Owner decisions (resolved 2026-10-26)

1. **Yod vs Yud.** Recommended: keep row 6 as applied — "Yod" in every
   SEO field and in the hand-written copy (matches the slug, hub, guide and
   primary keyword), with "also spelled Yud" once in the intro so the
   "Yud" in the lesson body doesn't look like a different letter. The
   alternative (overriding every "Yud" in 8 source blocks/exercises to
   "Yod") diverges from the app for no gain.
2. **Yod vs Vav shape.** `yod vs vav hebrew letters` is mapped to this page,
   but the lesson never compares the two. Recommended: yes, add to
   `copy.theory.intro`: "It looks like a short Vav (ו) that stops halfway,
   hanging near the top of the line."
3. **Name the Hiriq.** Block 2 and exercise 5's tip say "the dot under Bet
   and the following Yud represent [i]" without naming the mark
   (`yod with hiriq` is mapped here; the source spells it "Hiriq" in later
   lessons). Recommended: yes, "the dot under Bet (Hiriq) and the following
   Yud represent [i]" via `contentOverrides` (blocks 2, exercise sourceIndex
   4).
4. **"[gay]" distractor** in exercise 8 (sourceIndex 7). A plausible
   Gimel-for-Chet confusion, but it also reads as an English word.
   Recommended: leave as is (phonetic distractor in brackets; changing it
   needs a `choices` override of source text).

Resolved: all four recommendations approved. (1) kept as applied, and added
to `docs/hebrew-alphabet-editorial-rules.md` as "App spelling vs SEO
spelling of a letter name"; (2) the Vav sentence is in `copy.theory.intro`,
and the alphabet guide's new Yod paragraph says the same; (3) "the dot under
Bet (Hiriq)" via `contentOverrides.blocks["2"]` and
`contentOverrides.exercises["4"].tip`; (4) left as is.
