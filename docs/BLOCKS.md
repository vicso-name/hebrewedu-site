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
  FAQ markup/CSS.
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
  `phrase: Phrase` (from `src/data/hebrew-phrases`).
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
