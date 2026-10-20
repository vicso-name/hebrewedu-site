# App-download modal

One CTA modal asking the reader to install the app, shown at most once per
session on content pages. Two store buttons, no form, no email capture.

Files:

| File | Owns |
|---|---|
| `src/components/ui/AppPromoModal.astro` | markup, styling, triggers, tracking |
| `src/lib/app-promo.mjs` | `appPromoEnabled(pathname)` + the `APP_PROMO` timing/frequency policy |
| `src/i18n/{en,fr}.ts` → `appPromo` | every visible string, in both locales |
| `tests/app-promo.test.mjs` | the route policy and the frequency bounds |

`Layout.astro` mounts it on every page `appPromoEnabled()` allows. A single
page can opt out with `<Layout appPromo={false}>`; a *category* of pages
belongs in `app-promo.mjs`, not in a page.

## Where it appears

Excluded, with the reason:

- **`/` and `/fr/`** — the home page already asks three times (hero, nav CTA,
  the `#download` section). Owner decision.
- **`/terms/`, `/privacy/`, `/website-privacy/`, `/fr/conditions/`,
  `/fr/confidentialite/`** — never interrupt someone reading the legal or
  privacy text.
- **`/play/<game>/game/`** — the fullscreen players make their own in-game
  store offer (`store_popup_shown`, `docs/ANALYTICS.md`) and don't render
  `Layout.astro` anyway.

Everywhere else — the alphabet hub and its lessons, the phrases page, the blog
listing and posts, `/play/` and the game landing pages, in both locales — it is
on.

## When it opens

Three triggers, whichever fires first, all of them gated on the visitor having
engaged with the page:

| Trigger | Condition |
|---|---|
| `scroll` | past `scrollFraction` (50%) of the scrollable height |
| `dwell` | `dwellMs` (30s) on the page |
| `exit_intent` | pointer leaves the viewport upwards (`hover: hover and pointer: fine` only) |

Nothing opens in the first `minDwellMs` (8s), even if the reader scrolls
straight to the bottom. Nothing opens while the analytics consent banner is
up — one overlay at a time, and consent asks first. Nothing opens on a
backgrounded tab; that trigger is held and retried on `visibilitychange`.

**Why engagement-gated and not on arrival:** Google treats an app-install
interstitial that covers the content right after a search click as an
*intrusive interstitial* and can demote the page for it. A modal that only
appears after real engagement, is dismissible four ways, and never blocks the
first view of the content stays on the right side of that line. Do not move the
trigger earlier without weighing that against the organic traffic this site
runs on.

## How often

| Gate | Key | Effect |
|---|---|---|
| Session | `sessionStorage['hebrewedu-app-promo-seen']` | at most one showing per session |
| Dismissal | `localStorage['hebrewedu-app-promo-snooze']` | `snoozeDaysDismissed` (14 days) after "Maybe later", Esc, backdrop or × |
| Store click | same key | `snoozeDaysStoreClick` (90 days) — assume the app is installed |

When storage throws (private mode, storage disabled) the modal **fails closed**
and never shows: a broken frequency cap would otherwise mean a popup on every
page view.

## Accessibility

A native `<dialog>` opened with `showModal()`, so focus trapping, `Esc`,
inert background content and the `::backdrop` come from the platform. It is
closed in the HTML, so with JavaScript off it renders nothing and announces
nothing. The dialog is labelled by its own `<h2>`; focus lands on the content
wrapper (`autofocus`, `tabindex="-1"`) rather than on the close button, and the
platform returns it on close. The entrance animation is dropped under
`prefers-reduced-motion`.

The page behind is inert but still scrollable — the dialog lives in the top
layer and stays put, and scroll-locking would mean a component reaching for
`html`/`body` (`docs/LAYOUT.md`).

## Events

`app_promo_shown` (`trigger`, `source_path`) and `app_promo_dismissed`
(`reason`, `source_path`); the store clicks themselves arrive as the usual
`google_play_click` / `app_store_click` with `cta_location:
"app_promo_modal"`, via the delegated `[data-store]` listener. Rows in
`docs/ANALYTICS.md`.

`reason` is one of `later`, `close`, `escape`, `backdrop`, `store_click`.
Dismissals per showing, split by reason, is the number that says whether the
copy or the timing needs work; `store_click ÷ shown` is the conversion.

## Testing it locally

`npm run dev`, open any page other than the home page, then in the console:

```js
// See it immediately, bypassing the triggers:
document.getElementById('app-promo').showModal();

// Re-arm after it has been shown or dismissed:
sessionStorage.removeItem('hebrewedu-app-promo-seen');
localStorage.removeItem('hebrewedu-app-promo-snooze');
```

To exercise the real triggers, reload, wait 8 seconds, then scroll past
halfway. GA is never loaded in `astro dev`, so `track()` is a no-op there
(`docs/ANALYTICS.md`).
