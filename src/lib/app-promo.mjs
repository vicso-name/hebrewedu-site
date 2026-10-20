// Where and how often the app-download modal (AppPromoModal.astro) is allowed
// to appear. One module so the policy is reviewable in one place and testable
// without a DOM — see docs/APP_PROMO.md for the reasoning behind each number.

/** Timing and frequency policy, read by AppPromoModal.astro's client script. */
export const APP_PROMO = {
  /** Shown at most once per browsing session. */
  sessionKey: 'hebrewedu-app-promo-seen',
  /** Timestamp (ms) until which the modal stays suppressed across sessions. */
  snoozeKey: 'hebrewedu-app-promo-snooze',
  /** Nothing is shown before the visitor has had this long with the content. */
  minDwellMs: 8_000,
  /** Dwell trigger: shown this long into the visit even without a scroll. */
  dwellMs: 30_000,
  /** Scroll trigger: fraction of the scrollable height that counts as engaged. */
  scrollFraction: 0.5,
  /** Dismissed ("Maybe later", Esc, backdrop, close) — don't ask again for 14 days. */
  snoozeDaysDismissed: 14,
  /** Went to a store — assume they have the app; don't ask again for 90 days. */
  snoozeDaysStoreClick: 90,
};

/** Pages that already close with their own app CTA, or where interrupting is wrong. */
const EXCLUDED_PAGES = new Set([
  '/', // home: hero, download section and nav CTA already ask three times
  '/fr/',
]);

const EXCLUDED_PREFIXES = [
  '/terms/', // legal and privacy: never interrupt someone reading the terms
  '/privacy/',
  '/website-privacy/',
  '/fr/conditions/',
  '/fr/confidentialite/',
];

// The fullscreen game players make their own in-game store offer
// (`store_popup_shown`, docs/ANALYTICS.md) and don't render Layout.astro today;
// the rule is here so the policy stays complete if they ever do.
const GAME_PLAYER = /^\/play\/[^/]+\/game\//;

/**
 * Whether the app-download modal may be mounted on this route.
 * `pathname` is expected with a trailing slash (astro.config.mjs: `trailingSlash: 'always'`).
 */
export function appPromoEnabled(pathname) {
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
  if (EXCLUDED_PAGES.has(path)) return false;
  if (GAME_PLAYER.test(path)) return false;
  return !EXCLUDED_PREFIXES.some((prefix) => path.startsWith(prefix));
}
