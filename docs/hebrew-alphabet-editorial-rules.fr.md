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

### Letter-name spellings

Use the French search-preferred spellings from
`docs/seo/research/fr/FR_RESEARCH.md`'s per-letter table for every
SEO-facing field (title, meta description, H1, `pages.csv`/`keywords.csv`
rows, breadcrumb label) — **Aleph** (not Alef), **Beth** (not Bet),
**Guimel** (not Gimel), **Daleth** (not Dalet), **Hé**, **Vav**, **Zayin**,
**Heth** (not Het), **Teth** (not Tet), **Yod**, **Kaf**, **Lamed**,
**Mem**, **Noun** (not Nun), **Samekh**, **Ayin**, **Pé** (not Pe),
**Tsadi**, **Qof**, **Resh**, **Shin**, **Tav**. The shared display-name
map is `src/i18n/fr-letters.ts` — read SEO-facing letter names from there,
never hardcode a spelling inline in a page or editorial file. In-lesson body
copy (the `copy.*` fields, exercise prompts) stays whatever the FR raw
snapshot's own editorial text uses, same app-vs-SEO spelling split EN
already has for other letters (see `docs/hebrew-alphabet-editorial-rules.md`'s
own letter-name decisions).

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
