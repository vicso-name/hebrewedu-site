# Pe (lesson 17) FR editorial review

Reviewed against the pinned FR raw snapshot
`.local/alphabet-course-imports/v1/2026-10-19T14-27-18-905Z-bdf614-fr/raw/lesson-17.raw.json`,
SHA-256 `292e636941984232aefa1305558beb160372183cdbfea7875fbec0739c649093`. Checked
against `docs/hebrew-alphabet-editorial-rules.fr.md` and the language-neutral
rules of `docs/hebrew-alphabet-editorial-rules.md`. Same block/exercise count
and order as EN (23 blocks, 16 exercises), derived from this snapshot's own
`sourceIndex` values.

| # | Original | Problem | Correction | Confidence | Decision |
| - | -------- | ------- | ---------- | ---------- | -------- |
| 1 | Block 0 (`MAIN_TITLE`): "Pé (פּ) et Fé (פ) : sons et premiers mots" | FR title pattern. | `title` and H1 "Pé (פ) : lettre hébraïque, son et exemples" (42 characters). Meta (147, no em dash): "Apprends la lettre hébraïque Pé (פ) : le son [p] avec un dagesh, le son [f] (Fé), la forme finale ף, des mots comme פֶּה (bouche) et des exercices." SEO and app spellings are both "Pé", so no double first mention. | High | Applied (rule: FR title pattern) |
| 2 | Blocks 6 and 9 (`STRIPED_BLOCK`) | Same as EN row 2. | Held out; blocks 7 and 10 open with the same words. | High | Applied (holdout) |
| 3 | Blocks 5, 8 and 12 (`TEXT_IMAGE`) | Missing image description. | Mark cards: פ "Fé (Pé sans dagesh)", פּ "Pé avec dagesh", ף "Fé Sofit" (FR Kaf caption pattern). | High | Applied (missing image description; mirrors EN row 3) |
| 4 | Blocks 7, 16 and 18: "Le hé final est muet dans ce mot." / "Le Hé final est muet ici."; question 11's tip: "le Hé final ne se prononce pas" | Hé has no final form. | "En fin de mot, le Hé est muet ici." / "En fin de mot, le Hé est muet." / "le Hé en fin de mot ne se prononce pas". | High | Applied (rule: "final" means a final form; mirrors EN row 4) |
| 5 | Block 18: "Pé n’a pas de dagesh : elle se prononce [f]"; question 2: "se prononcent toutes deux [f]", tips of questions 2 and 16: "Toutes deux…" | Letter names are masculine (Fé, Fé Sofit). | "il se prononce [f]"; "tous deux". Block 12's "elle apparaît" stays: its subject is "la forme finale". | High | Applied (rule: letter names are masculine; Nun precedent "tous les deux") |
| 6 | Tips of questions 2, 5, 8 and 11 open "Oui." / "Oui,"; question 16's opens "Non." | Verdict openers. | Dropped (EN owner decision 1 for "Non."). | High | Applied (mirrors EN row 6) |
| 7 | Stage map heuristic `theory: [0,1,2,3,4]` | Same as EN row 8. | `theory: [0,1,2]` ("Comment se prononce Pé", "Pé et le mot « bouche »"); `examples: [3,4,5,7,8,10..22]`. | High | Applied |

**Vowel length mirrors EN:** EN rewrote question 10's one-sided "does not
require a long [a]". The FR tip says "aucune différence de longueur n’est
obligatoire", which already rules out both sides, so there is nothing to
mirror. **Always/never:** none. **True/False:** question 16 keys Faux.
**Closing heading** is "Pour conclure" (not "Conclusions"), so it stays.
**Transliteration:** no [u] or kh sound in this lesson; "y" for Yod is the
FR course convention. **Register:** "tu" throughout. **Typography:** the copy
carries U+00A0 nbsp; body nbsp is added at render time. **No English leftovers**
(checked in the normalized JSON and built HTML). "Kamats", "holam malé",
"patah", "ségol", "Alef" are app spellings and stay; the source mixes
lowercase "kamats" (blocks 7, 18) with "Kamats Gadol" (question 10), which is
left as written. Same "keep both" question as EN decision 2 for blocks 12 and 13.

## Owner decisions needed

None beyond EN decisions 1 and 2, mirrored here.

Resolved 2026-11-04: approved, together with EN.
