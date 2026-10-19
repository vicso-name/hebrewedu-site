# Hebrew alphabet course — FR editorial rules

Companion to `docs/hebrew-alphabet-editorial-rules.md` (the EN rules), per
`docs/I18N_AUDIT.md` §7. Apply this file alongside the EN one when reviewing
an FR letter's raw source and writing its `src/data/lessons/fr/<slug>.json`
editorial overrides (`docs/LESSON_PIPELINE.md`) — it does not replace the EN
file, it annotates which of its rules carry over as-is and adds the rules
that are specific to French.

## EN rules — language-neutral, apply as-is

These describe the Hebrew content itself (the letter, its sound, the
source's pedagogical claims), not the English wording, so they apply to the
FR raw source and FR copy exactly as written in the EN file:

- **Vowel length** — the claim being corrected ("long/short/brief") is about
  Hebrew pronunciation, not an English word choice. A French sentence can
  make the same mistake ("une voyelle longue/brève") and must be corrected
  the same way; "voyelle réduite" is an acceptable category label for a
  Hataf vowel, mirroring "reduced vowel" in EN.
- **No absolute "always/never" pronunciation rules without the known
  exception** — applies verbatim; French absolute words ("toujours",
  "jamais") get the same treatment as EN's "always"/"never".
- **Prefix effect on dagesh letters** — a fact about Hebrew phonology,
  unaffected by the review's language.
- **True/false sets must include at least one False answer** — a structural
  rule about the exercise set, not about wording in any one language.
- **No duplicate example blocks** — a structural/content rule, independent
  of language.
- **Never use tokenized source audio URLs** — a source-media rule,
  independent of language.
- **`contentOverrides.exercises` cannot patch `MATCH_PAIRS` pairs data** —
  a pipeline/schema constraint (`docs/LESSON_PIPELINE.md`), not a wording
  rule; a French `MATCH_PAIRS` violation needs the same holdout treatment.

## EN rules — do not apply as-is

- **Title pattern** — the *reason* for the rule (keyword-first, no brand
  suffix, per `CLAUDE.md`) carries over, but the EN pattern string
  (`<Letter> Hebrew Letter (<glyph>): <topic>`) is English-specific. See
  "FR title pattern" below for the FR replacement, and
  `docs/I18N_AUDIT.md` §6 for the FR SEO title/keyword source.

## FR-specific rules

### Register: "tu," never "vous"

All agent-written FR copy — the dictionary (`src/i18n/fr.ts`), FR home/hub
page copy, lesson `copy.*` fields, and any future FR-only page — uses the
informal "tu" register throughout: "tu," "ton/ta/tes," "tu apprends," tu-form
imperatives ("Télécharge," "Reconnais," "Commence"), never "vous"/"votre"/
"vos" or vous-conjugated verbs (watch for the "-ez" ending, not just the
literal word "vous"). Lesson body copy already uses "tu" by convention
(carried over from the raw source); this rule makes that the same register
everywhere else the site writes to the reader directly. Short, register-
neutral UI labels (button captions like "Commencer," "Réessayer," "Retour
au cours") are unaffected — they're infinitives/nouns with no grammatical
person, not sentences addressing the reader. Official app-store badge text
(`storeLabels.*`) stays as published by Apple/Google, not run through this
rule.

### Letter-name spellings

Use the search-validated French spellings from
`docs/seo/research/fr/LETTER_SPELLINGS_FR.md` for every SEO-facing field
(title, meta description, H1, `pages.csv`/`keywords.csv` rows, breadcrumb
label) — **Aleph** (not Alef), **Beth** (not Bet/Beit), **Guimel** (not Gimel/Ghimel), **Dalet** (not Daleth), **Hé** (not He), **Vav** (not Waw), **Zayin** (not Zain), **Heth** (not Het/Hhet), **Teth** (not Tet), **Yod** (not Youd), **Kaf** (not Kaph/Khaf), **Lamed** (not Lamedh), **Mem**, **Noun** (not Nun), **Samekh** (not Samech), **Ayin** (not Aïn), **Pe** (not Pé/Fé), **Tsadi** (not Tsadé/Tsadik), **Qof** (not Kof/Koph), **Resh** (not Rech), **Shin** (not Sin/Chin), **Tav** (not Tau/Thav). Each one was decided from French volume and SERP data, with
the per-letter reason in that doc; do not substitute a different spelling
without redoing that research. The shared display-name
map is `src/i18n/fr-letters.ts` — read SEO-facing letter names from there,
never hardcode a spelling inline in a page or editorial file. In-lesson body
copy (the `copy.*` fields, exercise prompts) stays whatever the FR raw
snapshot's own editorial text uses, same app-vs-SEO spelling split EN
already has for other letters (see `docs/hebrew-alphabet-editorial-rules.md`'s
own letter-name decisions). The FR hub's letter table
(`src/i18n/fr-letters.ts` via
`src/pages/fr/apprendre/alphabet-hebreu/index.astro`) always shows the
SEO/search spelling, same as the per-lesson title/H1/meta.

**First mention, both spellings.** When a lesson's app-body spelling differs
from its SEO spelling (Aleph/Alef, Beth/Beit, Heth/Het, etc.),
the *first* mention of the letter's name in that lesson's
`copy.theory.intro` shows both, SEO-name first: "Aleph (Alef)," "Heth
(Het)." Every mention after that first one, and every mention inside the
raw source's own blocks/exercises (`contentOverrides` doesn't touch them for
this reason alone), keeps the app spelling only. Skip this when the two
spellings already coincide (e.g. Guimel, Dalet) — there is nothing to
disambiguate.

**Vowel-sign names.** Any vowel-sign name that appears in agent-written
copy or meta (not the raw source's own text) follows the app spelling used
elsewhere in that lesson's raw source — "Kamats Gadol" (not "Kamatz
Gadol"), "niqqoud" (not "nikoud"), "Hataf-Patah." The FR hub mentions the
word "niqqoud (nikoud)" once, cross-referencing the alternate spelling
readers may search for or recognize from `/blog/how-to-read-hebrew-nikud/`
— nowhere else needs the parenthetical; use the app spelling alone
everywhere else.

**No em dashes in meta.** Title, H1, and meta description never use an em
dash ("—"); use a colon or a comma-joined list instead. (Made explicit for
Aleph's meta description; applies to every FR lesson's SEO fields.)

**"Conclusions" heading.** If a lesson's raw FR source titles its closing
`SUBTITLE` block literally "Conclusions" (an English calque), override it to
"À retenir" via `contentOverrides.blocks`. Leave other French closing
headings a letter's own source already uses (e.g. "Ce qu'il faut retenir,"
"Ce qu'on a appris") exactly as they are — only the literal "Conclusions"
calque gets renamed.

**Vowel length mirrors the EN decision.** Whenever a length/duration
statement about a vowel mark was removed or rewritten in the approved EN
`contentOverrides` for the same lesson (`src/data/lessons/<slug>.json`),
apply the same removal/rewrite to the FR source's equivalent passage if it
makes the same claim — check the EN file's overrides for that `sourceIndex`
before signing off on FR. If the FR raw source never made the claim in the
first place (a different source text can simply avoid the problem EN had to
fix), there is nothing to mirror; note that in the FR review doc rather
than inventing a correction with no underlying defect.

### FR title pattern

`<Lettre> (<glyph>) : lettre hébraïque, son et exemples` — keyword-first
using the FR search spelling above, ≤60 chars, no brand suffix (same
`CLAUDE.md` rule as EN). Example: `Aleph (א) : lettre hébraïque, son et
exemples`. The H1 may extend this the same way EN's does, via
`contentOverrides.blocks["0"]`, not the lesson-level `title`.

### French transliteration conventions

Hebrew transcription in FR copy follows French phonetic spelling, not
English:

- `kh` for the Hebrew guttural/uvular sound (Khet/Khaf), matching French
  readers' expectation (not the EN "ch" digraph, which reads as [tʃ] in
  French).
- `ch` is reserved for the French [ʃ] sound (as in "chat") — use it only
  where the Hebrew sound is actually [ʃ] (e.g. Shin), never for the
  guttural sound above.
- `ou` for the [u] vowel sound (not EN's "u" or "oo") — e.g. a Vav-as-vowel
  transcription reads "ou", not "u".
- Keep the traditional Hebrew mark names in their established French forms
  where the FR source/editorial tradition already has one (e.g. "Kamatz",
  "Patah" are typically left untranslated, as proper names of the marks,
  the same way EN does) — don't invent a French calque for a mark name.

### French typography

- Insert a non-breaking space (` `) before `:`, `;`, `?`, `!`, and
  before the closing `»` (and after the opening `«`) — standard French
  typographic convention. Plain ASCII spaces before these punctuation marks
  are an editorial issue to fix, not a stylistic choice.
- Use `« … »` (French guillemets with nbsp) for quotations in FR
  body copy, not English `"…"` smart quotes.

### No English leftovers

Before sign-off, grep the normalized FR lesson JSON and rendered HTML for
English words/phrases that should have been translated (stray "True"/
"False" option labels, an un-translated `tip`/`content` field, an English
illustration caption, an English stage heading). The EN exercise schema's
`TRUE_FALSE` option labels are the literal strings `"True"`/`"False"`
(`src/lib/lessons/schema.mjs`) by design — they are rendered-option IDs, not
displayed text, so their presence in the data file is expected and is not
an English leftover; only an actually-displayed English string is a defect.

## Using this checklist

Run through both this file and the EN checklist's automatic-flag section
for every FR letter's editorial review, before writing its `copy`/
`contentOverrides` (`src/data/lessons/fr/<slug>.json`) and before
requesting owner approval to publish that locale.
