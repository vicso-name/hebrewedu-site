# Analytics

GA4 (`G-P7MLCPECXE`, `src/data/site.ts`), region-scoped consent,
production-only. History: `feat/website-analytics` added a banner for
everyone; `hotfix/remove-ga-consent` removed it entirely; this is the
rebuild, scoped to the EEA/UK/CH only.

## How it's wired

- **`src/lib/analytics.ts`** — `track(event, params)`. The only function
  feature code calls to send an event. No-op whenever `window.gtag` is
  undefined (always true in dev/preview, since nothing below ever runs
  there).
- **`src/lib/analytics-consent.ts`** — the GA4 bootstrap: Consent Mode v2
  defaults, the EEA/UK/CH timezone check, gtag.js loading, and consent
  storage/withdrawal. Not imported by feature code — only by the two
  components below.
- **`src/components/AnalyticsHead.astro`** — renders the Consent Mode v2
  default script in `<head>`. Included on every GA-enabled page: via
  `Layout.astro` for normal pages, and directly on the three standalone
  game-player pages (`src/pages/play/*/game/index.astro`), which don't
  use `Layout`.
- **`src/components/ConsentBanner.astro`** — the consent banner UI, plus
  the delegated click listener for store-button and CTA events. Only
  rendered by `Layout.astro` (normal pages have a footer to host
  "Privacy choices"; the fullscreen game pages don't get a banner).

`Layout.astro` and the three game pages all gate both components behind
`!import.meta.env.DEV` — GA is never loaded in `astro dev`, only in a
built (`astro build`) page. There is one build pipeline in this repo
(`.github/workflows/deploy.yml`, production only), so "production
build" and "dev server" are the only two states that matter here; if a
second, non-production build pipeline is ever added, it needs its own
opt-out.

## Consent model

Two independent layers:

1. **Consent Mode v2 defaults** (`pushConsentDefaults()`): always pushed
   in `<head>` before gtag.js can be requested, regardless of visitor
   region. `ad_storage`/`ad_user_data`/`ad_personalization` are denied
   everywhere; `analytics_storage` defaults to granted, except for a
   `region`-scoped override (the 30 EEA countries + GB + CH) where it's
   denied by default. That `region` match is evaluated by Google itself
   via geo-IP when gtag.js runs — independent of #2.
2. **Our own load gate** (`inConsentRegion()`, `bootstrap()`): decides
   whether to inject the gtag.js `<script>` tag at all, using
   `Intl.DateTimeFormat().resolvedOptions().timeZone` — `Europe/*`, plus
   `Atlantic/Reykjavik|Canary|Madeira|Azores|Faroe` — as a free, no-geo-IP
   proxy for the same EEA/UK/CH region. Outside that region, gtag.js
   loads immediately. Inside it, gtag.js is withheld until
   `ConsentBanner.astro`'s Accept button calls `applyChoice(id,
   'granted')`; Decline (or an unknown timezone, which fails closed)
   leaves it withheld.

The choice is stored in `localStorage` (`hebrewedu-analytics-consent`,
`'granted' | 'denied'`) and re-applied via `gtag('consent', 'update',
...)` on the next page load. Withdrawing (Decline, or reopening via
"Privacy choices" and declining again) calls `gtag('consent', 'update',
{ analytics_storage: 'denied' })` and best-effort deletes `_ga`/`_ga_*`
cookies — gtag.js itself can't be unloaded once injected.

`allow_google_signals` and `allow_ad_personalization_signals` are set to
`false` in every `gtag('config', ...)` call (`loadGtag()`); there is no
code path that enables them.

## Events

All go through `track(event, params)`:

| Event | Params | Fired from |
|---|---|---|
| `google_play_click` / `app_store_click` | `cta_location`, `source_path` | Delegated `[data-store]` listener in `ConsentBanner.astro`, reading attributes `StoreButtons.astro`/`Nav.astro`/the blog CTA already set |
| `lesson_start` | `letter` | `practice-client.ts`, once per lesson page load |
| `practice_start` | `letter` | `practice-client.ts`, first time the Practice stage is shown |
| `lesson_complete` | `letter`, `score`, `total` | `practice-client.ts`, first time the Results stage is shown (`score`/`total` = correct / available questions) |
| `phrases_practice_complete` | `score` | `phrases/practice-client.ts`, once every phrase question has been checked |
| `game_open` | `game` | Inline script on each `/play/<game>/game/` player page |

`letter` is the lesson's content-collection slug (`lesson.id`, e.g.
`"aleph"`), not its display name. No event carries free text or PII.

## Adding a new event

Add a `track('your_event', { ... })` call at the point in app code where
it happens, and a row to the table above. Don't add a new tracker or
script to carry it — everything goes through `gtag`/`track()`.
