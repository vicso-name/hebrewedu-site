# Layout guardrails

Read `docs/LAYOUT.md` before any UI work.

- Every page uses `Layout.astro` (directly, or via a documented wrapper
  like `LegalPage.astro`) — it owns `<html>`/`<head>`, Nav and Footer.
- Widths only via `.container` and the `--w-content` / `--w-medium` /
  `--w-narrow` tokens. Never redefine `.container` or add a second
  max-width page wrapper.
- Spacing only via `--section-y` and the `--space-*` scale. Never a bare
  `rem`/`px` value for section rhythm or heading-to-content spacing.
- Section-shaped blocks render through `Section.astro`, not a hand-rolled
  `<section>`.
- Never override `Nav.astro`/`Footer.astro`'s own selectors, and never
  override the shared header, footer, or page background from another
  file.
- No `!important`, except a documented functional override (e.g.
  `[hidden]`, `prefers-reduced-motion`).
- Font tokens (`--font-*`) and `@font-face` are only defined in
  `global.css` (or the shared font file it imports) — never in a page- or
  component-level stylesheet.
- A new lesson is a new JSON file in `src/content/lessons/` — never a new
  route or new lesson-specific CSS file. Read `docs/LESSON_PIPELINE.md` for
  how to add a letter (identity, dry run, editorial data file, normalize,
  enable).
- Reuse an existing component before creating a new one. Before building
  any section, check `docs/BLOCKS.md` and reuse; Q&A always uses
  `Faq.astro`; never create a page-specific copy of a shared block.
- Run `npm run check:layout` before reporting any UI task done. It also
  runs in `prebuild` and in the deploy workflow.

Never add or widen a check-layout ALLOWLIST entry yourself. Fix the code.
If you believe an exception is truly needed, stop and ask the user first.

If this file or `AGENTS.md` already has other rules when you go to edit
either one, merge with those rules — don't drop them.

# SEO semantic core

`docs/seo/core/*.csv` (`keywords.csv`, `pages.csv`, `clusters.csv`) is
the single source of truth. `npm run seo:build` only reads those three
files and only writes `docs/seo/semantic-core.xlsx` — it never writes
to `core/`, and never reads `docs/seo/research/`. Edit `core/*.csv`
directly, by hand or with an import script for a new provider batch,
then run `npm run seo:build` to validate and regenerate the xlsx.
Never regenerate `core/` from `research/` — that is a one-time,
not-npm-scripted conversion (`scripts/seo/migrate-legacy.mjs --force`,
never run casually, see `docs/seo/README.md`).

Before creating or retargeting a page, check `docs/seo/core/`: assign
its cluster, avoid cannibalization; after publishing, update
`keywords.csv`/`pages.csv` and run `npm run seo:build`. Never call paid
SEO APIs (DataForSEO or similar) without the user's explicit approval.

# Package manager

Package manager is npm (Node 26, npm 11; CI uses the same). Never use
pnpm or yarn here. After adding or removing a dependency, run
`npm install` and commit `package.json` and `package-lock.json`
together.
