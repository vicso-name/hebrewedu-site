# Layout rules

One container, one section rhythm, one spacing scale — applied to every page's header, footer and sections.

## Container

- `.container` (`src/styles/global.css`) is the only layout container: `max-width: var(--w-content)` (1280px), with its own `padding-inline`.
- Header, footer and every section on every page use `.container`. No page may redefine `.container` or declare a second max-width container.
- A page that needs a narrower reading column (prose, a lesson body) uses an inner max-width with `--w-narrow` (720px) *inside* `.container` — it never replaces `.container` itself.

## Section rhythm

- `--section-y` (`src/styles/global.css`, `:root`) is the single vertical rhythm token: `clamp(4.5rem, 9vw, 8rem)`.
- `--home-section-y` is kept as an alias (`var(--section-y)`) for existing references (e.g. `play.css`); new code should reach for `--section-y` directly.
- `Section.astro` (`src/components/ui/Section.astro`) applies `padding-block: var(--section-y)` and renders the shared `.container` inside. Any section-shaped block on any page should render through `Section.astro` rather than a hand-rolled `<section>`.
- Two consecutive `Section`s with the same `surface` (`white`+`white` or `soft`+`soft`) don't stack their full padding — the second loses its top padding (`.home-section--white + .home-section--white`, `.home-section--soft + .home-section--soft` in `Section.astro`). This is the one shared rule for avoiding a doubled gap; pages must not reinvent it with a one-off `margin-top`/`padding-top` override.

## Spacing inside a section

- Heading-to-content spacing, card padding, and similar in-section spacing use the `--space-*` scale from `global.css` (`--space-xs` 0.5rem … `--space-2xl` 6rem) — never a bare `rem`/`px` value and never `!important`.

## What changed in this pass

### `/learn/hebrew-alphabet/` (hub)

- Removed `.course-hub .container { max-width: 1120px; }` and `.course-container` (own 1120px + hardcoded padding). The hub now uses the standard 1280px `.container` everywhere, same as every other page.
- Removed `.course-hub section { padding: 0; }`. Hero, Curriculum, "How lessons work", Resources and the App CTA all render through `Section.astro` and get the standard `--section-y` rhythm; the shared same-surface rule (all five are `white`) removes the doubled gap between them automatically.
- Removed `.course-section { margin-block-start: 3.5rem }` (and its 2.5rem mobile variant) — no longer needed now that `Section.astro` owns the rhythm.
- Removed `.course-app`'s `!important` paddings (1.75rem / 1.25rem). It now spans the same `.container` width as the other sections and takes its inner padding from `--space-lg` (desktop) / `--space-md` (mobile).
- `.course-section-heading`'s heading-to-content margin now uses `--space-md` instead of a bare `1.5rem`.
- `scroll-margin-top: 88px` for the in-page anchor (`#curriculum`) is preserved, now scoped to `.course-hub .home-section` instead of the removed padding-reset rule.

### `/play/`

- `.play-hero` now uses `padding-block: var(--section-y)` instead of its own `clamp(3rem, 6vw, 5.5rem)`.
- Removed `.play-hub-games { padding-top: var(--home-section-y); }` — `Section.astro`'s own `padding-block` (now `--section-y`, aliased from the same `--home-section-y` value) already supplies that padding; the override was redundant.

### Global

- Added `--section-y` to `global.css`'s `:root`; `--home-section-y` is now an alias for it rather than a second, independently-maintained value (previously redefined separately in `home.css` and `alphabet-course.css`).
- `Section.astro` gained a same-surface adjacent-sibling rule (see above) and now forwards unrecognized props (e.g. `aria-labelledby`) to the rendered `<section>`.

## Before / after (desktop)

| Page / spot | Before | After |
|---|---|---|
| `/learn/hebrew-alphabet/` container | `.course-hub .container` → 1120px | `.container` → 1280px (shared) |
| `/learn/hebrew-alphabet/` main wrapper | `.course-container` → 1120px, padding `2.5rem … 4rem` | removed; each `Section` supplies its own 1280px `.container` |
| `/learn/hebrew-alphabet/` section padding | `.course-hub section { padding: 0 }` + ad hoc `.course-section` margins (3.5rem / 2.5rem) | `Section.astro` `padding-block: var(--section-y)`, same-surface rule removes the doubled gap |
| `/learn/hebrew-alphabet/` App CTA padding | `1.75rem !important` (1.25rem mobile) | `var(--space-lg)` (`var(--space-md)` mobile), no `!important` |
| `/learn/hebrew-alphabet/` section heading margin | `1.5rem` (bare) | `var(--space-md)` |
| `/play/` hero padding | `clamp(3rem, 6vw, 5.5rem)` | `var(--section-y)` → `clamp(4.5rem, 9vw, 8rem)` |
| `/play/` games section top padding | one-off `padding-top: var(--home-section-y)` | removed (redundant with `Section.astro`'s own padding) |
| global `--section-y` | didn't exist; `--home-section-y` defined separately in `home.css` and `alphabet-course.css` | one `--section-y` in `global.css`; `--home-section-y` is an alias |

## Follow-up: lesson pages (not touched in this pass)

`[lesson].astro` and `lesson-poc.css` were left alone, per instruction. To bring them in line with these rules:

- `[lesson].astro` doesn't use `Layout.astro` at all (hand-rolled `<html>`/`<head>`) — it should adopt `Layout.astro` so it inherits the shared SEO/meta wiring and tokens like every other page.
- `.lesson-container` has its own third max-width (920px) and its own padding scale, independent of `.container`/`--w-content` and `--w-narrow`. Since a lesson body is a reading column, it should become an inner `--w-narrow`-based wrapper *inside* the shared `.container`, not a standalone container.
- `.lesson-page section { padding-block: 0 }` reimplements the same "stages shouldn't double their gap" problem the hub had. Once lesson stages render through `Section.astro` (or a lesson-specific equivalent that reuses the same same-surface rule), this reset and the various hardcoded `margin-block-start` values between stages (`.stage-panel + .stage-panel`, etc.) can go.
- Several hardcoded rem values for card/section spacing (`.learning-card` padding, `.stage-heading` margins, `.results-card` paddings) should move to `--space-*` tokens where they line up with an existing step in the scale.
