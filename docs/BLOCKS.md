# Shared blocks

Registry of reusable, self-contained components. Before building any
section, check this list and reuse — never create a page-specific copy
of a shared block.

## Layout

- **`src/components/ui/Section.astro`** — the one section wrapper. Renders
  `.container` inside a `<section>` with the shared `--section-y` rhythm.
  Props: `surface?: 'white' | 'soft'` (default `'white'`), `id?`, `class?`.
- **`src/components/ui/CtaPanel.astro`** — soft rounded callout panel for a
  closing CTA, wraps `Section`. Props: `compact?: boolean`, `id?`. Content
  via default slot (heading, lead, `StoreButtons`, …).
- **`src/components/ui/SectionHeading.astro`** — stacked eyebrow-less
  heading + optional lede, used above a section's body content. Props:
  `title: string`, `lede?: string`.

## Content blocks

- **`src/components/Faq.astro`** — the shared Q&A accordion (native
  `<details>`/`<summary>`), renders through `Section`. Props: `eyebrow?`,
  `title: string`, `intro?`, `items: { q: string; a: string }[]` (`a` may
  contain inline HTML, e.g. a link), `surface?: 'white' | 'soft'` (default
  `'soft'`), `id?`, `schema?: boolean` (default `true`, emits one
  `FAQPage` JSON-LD block — set to `false` only if the page already emits
  its own). **Q&A always uses this component** — never a page-specific
  FAQ markup/CSS. A blog post (`src/content/blog/*.md`) opts in via an
  optional `faq: { q: string; a: string }[]` frontmatter field — the
  template (`src/pages/blog/[slug].astro`) renders `Faq` automatically
  for any post that has it, before the closing app-store CTA; a post
  without the field renders no FAQ section and no `FAQPage` block.
- **`src/components/play/LearningMosaic.astro`** — 4-item asymmetric
  mosaic of topic cards with optional inline links in the description.
  Props: `items: [LearningItem, LearningItem, LearningItem, LearningItem]`
  where `LearningItem = { title: string; description: (string | { text, href })[] }`.
- **`src/components/ui/FeatureGrid.astro`** — icon + title + description
  grid ("how it works" steps). Props: `items: FeatureItem[]` where
  `FeatureItem = { icon: 'layers'|'target'|'repeat'|'book'|'bolt'; title; description }`,
  `headingLevel?: 'h2'..'h6'` (default `'h3'`).

## Phrases / lessons

- **`src/components/phrases/PhraseCard.astro`** — one phrase card (Hebrew,
  transliteration, meaning, optional speaker/addressee variant). Props:
  `phrase: Phrase` (from `src/data/hebrew-phrases`); `id?` (article id —
  omit where the same phrase's card repeats elsewhere on the page, e.g. a
  hero deck or an anatomy illustration, to avoid a duplicate id);
  `meaningTag?: 'h3' | 'p'` (default `'h3'` — use `'p'` where an `h3`
  would duplicate the page's heading outline); `idPrefix?` (prefix for the
  "Said by/to" label id, so it stays unique when a phrase's card appears
  more than once on the page, e.g. `"anatomy-"`).
- **`src/components/phrases/SituationTiles.astro`** — grid of situation
  tiles linking to each phrase group, with phrase counts computed from
  the data. Props: `groups: PhraseGroup[]`, `ariaLabel: string` (nav
  label, used when `label` is omitted), `label?: string` (visible label
  above the tiles — omit when a heading above the tiles already names
  them).
- **`src/components/phrases/Transliteration.astro`** — shared
  `[bracketed]` transliteration rendering used by cards, dialogues and
  practice. Props: `text: string`.
- **`src/components/lessons/HebrewText.astro`** — renders Hebrew text with
  correct `bdi`/`dir="rtl"` run handling. Props: `text: string`.
- **`src/components/phrases/PhrasePractice.astro`** — self-contained
  practice exercise block for the phrases page (no props; reads from
  `src/data/hebrew-phrases`).
- **`src/components/lessons/Practice.astro`** / **`StudyBlock.astro`** —
  lesson practice/exercise rendering for `src/content/lessons/*.json`.
  `StudyBlock.astro` renders a `WORD_EXAMPLE` block through `PhraseCard`
  (`meaningTag="p"`, no `id`, a single `"same"` variant — i.e. no gender
  switch): the block's `word` (with nikud) → the Hebrew panel, its
  `transcription` → `Transliteration`, and its `text` (the normalized
  block's copy of the source `translation`) → the English meaning. Source
  `audioUrl` is never read by the normalizer (see `normalize.mjs`) — audio
  is out of scope for this renderer. No `WORD_EXAMPLE` block in the
  22-lesson import carries an image/description field, so there is no
  image path today; one would need a real schema/normalize addition, not
  a speculative prop, once a source actually has one.

## Product / marketing

- **`src/components/ui/StoreButtons.astro`** — App Store / Google Play
  badges. Props: `location: string` (click-tracking label), `trackAlso?`,
  `height?` (default `56`).
- **`src/components/ui/DeviceFrame.astro`** — device bezel shell around a
  screenshot. Props: `variant?: 'primary' | 'secondary'`.
- **`src/components/ui/ProductScreenshot.astro`** — real app screenshot
  through Astro's image pipeline. Props: `src: ImageMetadata`, `alt`,
  `sizes`, `loading?`.
- **`src/components/ui/ProductPlaceholder.astro`** — temporary decorative
  stand-in for a screenshot. Props: `label`, `variant?`, `class?`.
- **`src/components/play/KeyArt.astro`** — Alef Bet Rush key art image.
  Props: `sizes`, `alt?`, `loading?`, `fit?`.

## Other shared components

- **`src/components/Nav.astro`** / **`src/components/Footer.astro`** —
  rendered as-is on every page by `Layout.astro`; never overridden
  per-page (see `docs/LAYOUT.md`).
