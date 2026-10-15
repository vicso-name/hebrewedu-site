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
| `game_start`, `round_start`, `round_complete`, `game_over`, `store_popup_shown` | `game_id`, plus whatever scalar params the game sent | Game iframe message, relayed by `attachGameMessageListener` |
| `google_play_click` / `app_store_click` (from a game) | `source: "game"`, `game_id`, plus other scalar params | Game iframe `store_click` message, remapped by `attachGameMessageListener` to the existing store CTA events |

`letter` is the lesson's content-collection slug (`lesson.id`, e.g.
`"aleph"`), not its display name. No event carries free text or PII.

## Game events

A game running inside a `/play/<game>/game/` player's iframe can report
gameplay events to the parent page via `window.parent.postMessage`. The
parent page validates and forwards them through `track()` — the game
never calls `gtag`/`track()` itself, and never gets a reference to
either.

**Wire format** sent by the game:

```js
window.parent.postMessage(
  {
    source: 'hebrewedu-game', // required, exact match
    v: 1, // required, exact match (GAME_MESSAGE_VERSION)
    event: 'round_complete', // required, must be in the allowlist below
    params: { score: 10, won: true }, // optional, scalars only
  },
  window.location.origin,
);
```

**Receiver** (`src/lib/game-messages-listener.ts`, wired up once per
player page by `attachGameMessageListener(iframe, gameId)`): a message is
only processed if the browser `MessageEvent.origin` equals the page's own
origin **and** `MessageEvent.source` is that exact iframe's
`contentWindow` — a message from any other frame, same-origin or not, is
ignored before the payload is even inspected.

Validation/normalization itself (`src/lib/game-messages.mjs`, pure and
unit-tested by `scripts/test-game-messages.mjs` /
`npm run test:game-messages`) then requires `source`/`v` to match exactly
and `event` to be one of the allowlisted names:

- `game_start`, `round_start`, `round_complete`, `game_over`,
  `store_popup_shown` — forwarded to `track()` under the same name, with
  `game_id` added.
- `store_click` — requires `params.store` to be `"google_play"` or
  `"app_store"` (otherwise the whole message is dropped); forwarded as
  the existing `google_play_click` / `app_store_click` event with
  `source: "game"` and `game_id` added, `store` itself removed from
  `params`.

Any other `event` name, a missing/wrong `source` or `v`, or a non-object
payload is dropped silently.

`params` is sanitized before forwarding: only `string`/`number`/`boolean`
values survive (objects, arrays, functions, `null`, `undefined` are
dropped), capped at 10 keys. A game must not send free text or PII in
`params`.

Adding a new game: wire up `attachGameMessageListener` in its player page
(see docs/GAME_PUBLISHING_RUNBOOK.md Phase 3) — no new receiver code
needed. Adding a new *event type* the game side can send: add it to
`ALLOWED_EVENTS` in `src/lib/game-messages.mjs`, extend
`scripts/test-game-messages.mjs`, and add a row to the events table
above.

## Adding a new event

Add a `track('your_event', { ... })` call at the point in app code where
it happens, and a row to the table above. Don't add a new tracker or
script to carry it — everything goes through `gtag`/`track()`.
