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
  route or new lesson-specific CSS file.
- Reuse an existing component before creating a new one.
- Run `npm run check:layout` before reporting any UI task done. It also
  runs in `prebuild` and in the deploy workflow.

Never add or widen a check-layout ALLOWLIST entry yourself. Fix the code.
If you believe an exception is truly needed, stop and ask the user first.

If this file or `AGENTS.md` already has other rules when you go to edit
either one, merge with those rules — don't drop them.
