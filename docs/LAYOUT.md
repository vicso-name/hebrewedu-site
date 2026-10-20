# Layout rules

One container, one section rhythm, one spacing scale — applied to every page's header, footer and sections.

## Container

- `.container` (`src/styles/global.css`) is the only layout container: `max-width: var(--w-content)` (1280px), with its own `padding-inline`.
- Header, footer and every section on every page use `.container`. No page may redefine `.container` or declare a second max-width container.
- A page that needs a narrower reading column (prose) uses an inner max-width with `--w-narrow` (720px) *inside* `.container` — it never replaces `.container` itself.
- `--w-medium` (920px) is the interactive reading column: wider than `--w-narrow`, for content that mixes prose with interactive UI (stage tabs, cards, forms) rather than plain text — e.g. the alphabet lesson body (`.lesson-container` in `lesson-poc.css`). Like `--w-narrow`, it's an inner wrapper *inside* `.container`, never a replacement for it.

## Section rhythm

- `--section-y` (`src/styles/global.css`, `:root`) is the single vertical rhythm token: `clamp(4.5rem, 9vw, 8rem)`.
- `--home-section-y` is kept as an alias (`var(--section-y)`) for existing references (e.g. `play.css`); new code should reach for `--section-y` directly.
- `Section.astro` (`src/components/ui/Section.astro`) applies `padding-block: var(--section-y)` and renders the shared `.container` inside. Any section-shaped block on any page should render through `Section.astro` rather than a hand-rolled `<section>`.
- Two consecutive `Section`s with the same `surface` (`white`+`white` or `soft`+`soft`) don't stack their full padding — the second loses its top padding (`.home-section--white + .home-section--white`, `.home-section--soft + .home-section--soft` in `Section.astro`). This is the one shared rule for avoiding a doubled gap; pages must not reinvent it with a one-off `margin-top`/`padding-top` override.

## Spacing inside a section

- Heading-to-content spacing, card padding, and similar in-section spacing use the `--space-*` scale from `global.css` (`--space-xs` 0.5rem … `--space-2xl` 6rem) — never a bare `rem`/`px` value and never `!important`. Three finer steps fill gaps in that scale: `--space-2xs` (0.25rem), `--space-xs-plus` (0.75rem) and `--space-sm-plus` (1.25rem) — added for PhraseCard's panel/padding rhythm, reusable wherever a step between the named sizes is needed.

## Shared header, footer and page background

- `Nav.astro` and `Footer.astro` are rendered as-is on every page. A page may set the documented theming hooks (`--nav-bg`, `--nav-border`, `--nav-link-hover-bg`) to the site's standard values — `--nav-bg: rgba(255, 255, 255, 0.9)` and `--nav-border` pointing at that page's border token — the same way `home.css`, `blog.css`, `legal.css` and `alphabet-course.css` already do. A page must never redeclare `Nav`'s own selectors (`.nav-inner`, `.nav-links`, `.nav-logo`, …) to change their background, border, height or padding — that makes one page's header a different shape from every other page's.
- `Layout.astro` also owns the two page-level overlays — the consent banner
  (`ConsentBanner.astro`, `docs/ANALYTICS.md`) and the app-download modal
  (`AppPromoModal.astro`, `docs/APP_PROMO.md`). A page never renders its own
  popup, lightbox or install banner; it opts out of the modal with
  `appPromo={false}`, or the route policy in `src/lib/app-promo.mjs` is
  changed. Both are in the top layer / fixed, so neither needs a page to
  manage `z-index`, and neither may scroll-lock `html`/`body`.
- The page background is the one white surface shared by every page (e.g. `background: var(--white)` on the page's root class). A page must not leave its root background unset and rely on `body`'s `--bg` token, and must not pick a different background color than the rest of the site.

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

## Automated guardrails

`npm run check:layout` (`scripts/check-layout.mjs`) enforces the rules above on
every commit — it runs in `prebuild` and as its own step before `Build` in
`.github/workflows/deploy.yml`. It checks:

1. Every page in `src/pages` imports `Layout.astro`, directly or through a
   documented wrapper (`LegalPage.astro`). Non-HTML routes and pages that
   legitimately need their own shell are named in a `PAGE_ALLOWLIST` in the
   script, each with a reason.
2. `.container` is never redeclared outside `global.css`.
3. No literal `max-width` in px/rem at page-container scale (>= 900px / 56rem)
   outside `global.css` — use `var(--w-content|--w-medium|--w-narrow)`.
   Smaller, component-internal sizes (cards, panels, stage art) are not
   flagged.
4. No `padding`/`padding-block: 0` on a selector containing the word
   `section` — that resets the shared section rhythm.
5. No `!important` anywhere in `src/`.
6. No file outside `Nav.astro`/`Footer.astro`/`global.css` redeclares a
   Nav/Footer selector (`.nav-inner`, `.nav-links`, …), and no `html`/`body`
   rule outside `global.css` sets a `background`.
7. Font tokens (`--font-*`) and `@font-face` are only defined in
   `global.css` (or the shared font file it imports) — never redefined or
   redeclared in a page- or component-level stylesheet.

**Allowlist policy:** each rule has its own `ALLOWLIST` (a `Set`/`Map`) at the
top of its section in `scripts/check-layout.mjs`. Never add or widen a
check-layout ALLOWLIST entry yourself. Fix the code. If you believe an
exception is truly needed, stop and ask the user first.

Known, intentional exceptions already allowlisted: the `course-hub`'s mobile
`.nav-inner` height/gutter adjustments and the `hebrew-phrases` page's
`.nav-inner` wrapping (both pages add nav content that needs more room, and
neither touches background/border/link styling) — tracked as debt to fold
into `Nav.astro`'s own responsive rules rather than per-page overrides; the
`legal.css` and `lesson-poc.css` `section`-padding resets (prose subsections
inside one `Section.astro` block, not page-rhythm sections of their own);
and the `[hidden]`/`prefers-reduced-motion` `!important` blocks (functional,
not layout, overrides).

## Lesson pages

`/learn/hebrew-alphabet/[lesson]` (`[lesson].astro`, `lesson-poc.css`) now follows these rules too:

- The page uses `Layout.astro` (no more hand-rolled `<html>`/`<head>`). Title and description come from the lesson's own content-collection data (`lesson.title`, `lesson.description`); `robots` still switches on the publication flag (`index, follow` once published, `noindex, nofollow, noarchive` in local preview); OG uses `Layout`'s default image; a `LearningResource` JSON-LD block is passed via `schema`.
- The whole lesson body renders as one `Section.astro`, so it gets the shared `.container` (1280px) and the standard `--section-y` rhythm. `.lesson-container` is now an inner `--w-medium` (920px) reading column *inside* that `.container`, with no max-width or padding of its own.
- `.lesson-page section { padding-block: 0 }` is gone. The remaining nested `<section>`s (the four stage panels) get a scoped `.stage-panel { padding-block: 0 }` instead, so they don't pick up the global `section` default; the gap between them comes from the `.stage-panel + .stage-panel` margin, now expressed as a `--space-*` multiple.
- All inner spacing (header, stage tabs, stage panels, cards, objectives, question cards, results) is expressed as `--space-*` tokens, usually via `calc(var(--space-xs) * n)` so the exact original values are preserved while removing every bare `rem` spacing literal. The one surviving `!important` is `.lesson-page [hidden] { display: none !important }`, which is a functional override (not spacing) that `practice-client.ts` depends on for showing/hiding already-classed elements; the reduced-motion `!important` block is unchanged for the same reason it exists elsewhere in the site.
- `.lesson-page` no longer redeclares `.nav-inner`/`.nav-links`/`.nav-logo` background, border, height or padding — those were making the lesson header a different height/shape from every other page's. It now only sets the standard `--nav-bg`/`--nav-border` theming hooks and a `background: var(--white)` page background, same as `home.css`/`blog.css`/`legal.css`/`alphabet-course.css`. The only rule `lesson-poc.css` keeps for anything outside its own `.lesson-*`/stage/practice classes is the skip-link (`.lesson-skip`).
