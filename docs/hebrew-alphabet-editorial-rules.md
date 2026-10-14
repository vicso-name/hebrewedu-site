# Hebrew alphabet course — editorial rules

Course-wide rules, derived from the Aleph and Bet editorial reviews
(`docs/hebrew-alphabet-lesson-1-editorial-review.md`,
`docs/hebrew-alphabet-lesson-1-owner-override-review.md`,
`docs/hebrew-alphabet-lesson-2-editorial-review.md`). Apply these when
reviewing any future letter lesson's raw source, and when writing its
`src/data/lessons/<slug>.json` editorial overrides
(`docs/LESSON_PIPELINE.md`).

## Vowel length

Keep the traditional mark names (Kamatz/Kamatz Gadol, Patah, Hataf
Patah, etc.) — they're how learners will see the marks named elsewhere.
Remove claims about vowel **length** or **duration** ("long," "short,"
"brief," "a much shorter [a]"): in Modern Hebrew all of these marks are
pronounced [a]. "Reduced [a] vowel/sound" is acceptable as a
category label (Hataf Patah is a reduced vowel sign), since it names a
quality distinction, not a timing one. A sentence that explicitly
*disclaims* a length distinction ("Modern Hebrew does not require a
long-versus-short contrast here") is fine — it isn't asserting length,
it's ruling it out.

## No absolute "always/never" pronunciation rules without the known exception

Don't state a pronunciation rule as universal ("always," "never") if a
known exception exists — "always written with a dagesh at the start of
a word" is false the moment a vowel-prefix (ו, etc.) changes the
letter's sound. Prefer "usually"/"almost always" and name (or at least
gesture at) the exception, or state the opposite rule as the one that's
actually True/False. A True/False statement and its explanation must
agree on the strength of the claim — an explanation that names
exceptions can't sit under a prompt that says "always."

## Prefix effect on dagesh letters

Bet, Kaf and Pe (the letters that can take a dagesh and alternate
[b]/[v], [k]/[kh], [p]/[f]) lose the word-initial dagesh when a
vowel-final prefix (e.g. ו "and") attaches directly before them — the
sound shifts accordingly (e.g. בָּנִים [banim] → וּבָנִים
[u-vanim]). Note this near any "dagesh at the start of a word" claim
instead of treating word-initial position as dagesh-guaranteeing.

## True/false sets must include at least one False answer

A lesson's True/False exercises must not all key True. At least one
should be False — either because the natural statement is false, or
by rephrasing a statement so its accurate form reads as False (see
Bet's Q9: "At the end of a word, Bet usually sounds like [b]" is
False; word-final Bet is almost always [v]).

## No duplicate example blocks

Don't republish the same example word/phrase (same word, same
transcription, near-identical translation) as two separate blocks.
Hold out the duplicate (`holdOuts.blocks`) with a reason, rather than
normalizing both.

## Never use tokenized source audio URLs

Source audio URLs that embed a Firebase/Backblaze access token must
never be carried through to the published lesson — normalization
already drops all raw media fields, but a `WORD_EXAMPLE` block whose
only point is to attach that audio should be held out rather than
republished without it.

## Title pattern

Lesson title tags follow `<Letter> Hebrew Letter (<glyph>): <topic>` —
keyword-first, no brand suffix (see `CLAUDE.md`'s SEO section: title
tags never include the brand suffix; the site name is carried by
`og:site_name`/the `WebSite` schema). The H1 may extend the title with
", & Practice" or similar; it's a separate field
(`contentOverrides.blocks["0"]` in the lesson's editorial data file),
not the lesson-level `title`.

## Using this checklist

Run through this list — alongside the automatic flags in
`docs/hebrew-alphabet-course-content-audit.md`/
`docs/hebrew-alphabet-course-review-register.md`
(`ARTICULATION_TRADITION`, `ENGLISH_SOUND_ANALOGY`,
`SILENCE_OR_ABSOLUTE_CLAIM`, `ONE_SIDED_TRUE_FALSE`, missing image
descriptions) — for every future letter's editorial review, before
writing its `copy`/`contentOverrides` and before requesting owner
approval to publish.
