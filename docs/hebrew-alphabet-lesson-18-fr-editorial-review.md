# Tsadi (lesson 18) FR editorial review

Reviewed against the pinned FR raw snapshot
`.local/alphabet-course-imports/v1/2026-10-19T14-27-18-905Z-bdf614-fr/raw/lesson-18.raw.json`,
SHA-256 `8e8fb17430b49187881f992217a27eb130e5eb458e8be4abbf53b546add0c5d9`. Checked
against `docs/hebrew-alphabet-editorial-rules.fr.md` and the language-neutral
rules of `docs/hebrew-alphabet-editorial-rules.md`. Same block/exercise count
and order as EN (21 blocks, 15 exercises), derived from this snapshot's own
`sourceIndex` values.

| # | Original | Problem | Correction | Confidence | Decision |
| - | -------- | ------- | ---------- | ---------- | -------- |
| 1 | Block 0 (`MAIN_TITLE`): "Découvrir Tsadi (צ) et de nouveaux mots" | FR title pattern. | `title` and H1 "Tsadi (צ) : lettre hébraïque, son et exemples" (45 characters). Meta (132, no em dash): "Apprends la lettre hébraïque Tsadi (צ) : son son [ts], sa forme finale ץ (Tsadi Sofit), des mots comme צֵל (ombre) et des exercices." SEO and app spellings are both "Tsadi", so no double first mention. | High | Applied (rule: FR title pattern) |
| 2 | Block 2 (`STRIPED_BLOCK`): the pronunciation key | Same as EN row 2; blocks 11 and question 13's tip point back to it ("le ch guttural expliqué plus haut", "le son guttural expliqué dans la leçon"). | Held out. Block 11 now explains kh itself, with block 2's own sentence ("un frottement au fond de la bouche, comme le ch du mot écossais « loch » ; ce n’est pas le ch français de « chat »"); question 13's tip says "Le kh représente un son guttural, produit au fond de la bouche." Block 2's French-only note "Devant n, garde les voyelles a et o orales et prononce aussi le n, notamment dans gan et khon" moves into block 13 after בִּטָּחוֹן (owner decision 1). | High | Applied (holdout; Mem "fill from the held-out block's own sentences" precedent) |
| 3 | Guttural sound written "ch": transcriptions "chefets", "bitachon"; "[che-fets]", "[che]", "[bi-ta-chon]", "chon", "[che-vel]", "che" in blocks 11 and 13 and the tips of questions 3, 10 and 13; question 13's choices "[ cha-val ]", "[ che-vel ]" | FR uses "kh" for this sound, never "ch". | "kh" throughout: transcriptions "khefets", "bitakhon" (`contentOverrides.transcriptions`); "[khe-fets]", "[khe]", "[bi-ta-khon]", "[khe-vel]"; choices "[ kha-val ]", "[ ho-val ]", "[ khe-vel ]" with the answer key patched to match (`contentOverrides.choices`). No `MATCH_PAIRS` pair contains the sound. | High | Applied (rule: FR transliteration "kh") |
| 3b | Question 11 (sourceIndex 10): distractor "[ fu-al ]" | FR uses "ou" for [u]. | "[ fou-al ]" (`contentOverrides.choices`); the answer "[ po-al ]" is unchanged. | High | Applied (rule: FR transliteration "ou"; Ayin precedent) |
| 4 | Block 3 (`TEXT_IMAGE`) | Missing image description. | Mark card ץ "Tsadi Sofit": "Tsadi final : Tsadi dont le trait descend tout droit sous la ligne, écrit en fin de mot et prononcé [ts]." (FR Pe caption pattern.) | High | Applied (mirrors EN row 3) |
| 5 | Block 9: "Le tséré n’impose pas une voyelle longue en hébreu moderne." | One-sided length disclaimer. | "Aucune durée particulière n’est exigée pour la voyelle." | High | Applied (rule: disclaimers rule out both sides; mirrors EN row 4) |
| 6 | Block 13: "…, puis appuie sur son bouton de lecture pour comparer ta prononciation avec l’enregistrement." | No audio on the web. | "Lis chaque mot à voix haute." | High | Applied (rule: no audio instructions; mirrors EN row 5) |
| 7 | Block 1: "elle se prononce [ts]… Elle possède deux formes écrites" | Letter names are masculine; the subject is Tsadi. | "il se prononce [ts]… Il possède deux formes écrites". Block 3's "Elle représente" stays: its subject is "la forme finale" (Pe precedent). | High | Applied (rule: letter names are masculine; Ayin precedent) |
| 8 | Tips of questions 2, 12 and 15 open "Oui."; questions 5 and 8 open "Non." | Verdict openers. | Dropped. | High | Applied (mirrors EN row 6) |
| 9 | Block 19 (`SUBTITLE`): "Conclusions" | English calque. | "À retenir" (not used elsewhere in the lesson). | High | Applied (rule: "Conclusions" heading) |
| 10 | Stage map heuristic `theory: [0,1]` | Same as EN row 7. | `theory: [0,1,3]` ("Comment se prononce Tsadi", "La forme finale de Tsadi"); `examples: [4..20]`. | High | Applied |

**Vowel length mirrors EN:** EN rewrote block 9; FR row 5 does the same.
Block 11's "n’imposent pas de différence de longueur" rules out both sides,
as in EN. **Always/never:** question 12's "uniquement en fin de mot" is limited
to "les mots hébreux ordinaires", as in EN. **True/False:** questions 5 and 8
key Faux. **Transliteration:** "[ sh ]" (question 1's distractor) and "sheva"
follow the course's FR "sh" for Shin (Samekh precedent), not the guttural
rule. **Register:** "tu" throughout. **Typography:** the copy
carries U+00A0 nbsp; body nbsp is added at render time. **No English
leftovers** (checked in the normalized JSON and built HTML). "Het", "Yod",
"patah", "hiriq", "tséré", "ségol" are app spellings and stay; "le d final"
names the last sound, as in EN.

## Owner decisions needed

1. **Moved sentence on oral vowels.** Block 2's French-only note on keeping a
   and o oral before n (so gan isn't read as the nasal French "gant") would be
   lost with the held-out block. Recommended: keep it in block 13, as drafted.
2. EN decision 1 (other spellings) has no FR counterpart: the FR research
   chose "Tsadi" and no alternate spelling is added.

Resolved 2026-11-05: approved, together with EN. Decision 1: the sentence stays
in block 13; the general rule is added to both rule files.
