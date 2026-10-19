// GA4 bootstrap: Consent Mode v2 defaults, region-gated gtag.js loading, and
// consent storage/withdrawal. Used only by AnalyticsHead.astro (every
// GA-enabled page) and ConsentBanner.astro (Layout pages only). Feature code
// never imports this — it calls `track()` in ./analytics.ts.
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type Choice = 'granted' | 'denied';

const CONSENT_KEY = 'hebrewedu-analytics-consent';

// Google's consent `region` parameter: EEA (all 30, incl. Iceland, Liechtenstein,
// Norway) plus the UK and Switzerland. Evaluated by Google using the request's
// own geo-IP lookup when gtag.js runs — independent of the client-side timezone
// heuristic in inConsentRegion() below, which instead decides whether we load
// gtag.js at all.
const CONSENT_DEFAULT_REGION = [
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU',
  'IS', 'IE', 'IT', 'LV', 'LI', 'LT', 'LU', 'MT', 'NL', 'NO', 'PL', 'PT', 'RO',
  'SK', 'SI', 'ES', 'SE', 'GB', 'CH',
];

// Timezones outside "Europe/*" that still sit in EEA/UK/CH territory.
const EXTRA_CONSENT_REGION_TIMEZONES = [
  'Atlantic/Reykjavik', 'Atlantic/Canary', 'Atlantic/Madeira', 'Atlantic/Azores', 'Atlantic/Faroe',
];

function gtagStub(): (...args: unknown[]) => void {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function () { window.dataLayer!.push(arguments); };
  }
  return window.gtag;
}

/** Consent Mode v2 defaults. Must run before gtag.js is ever requested. */
export function pushConsentDefaults(): void {
  const gtag = gtagStub();
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'granted',
  });
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    region: CONSENT_DEFAULT_REGION,
  });
}

/** Pure for testing — real callers use inConsentRegion(). */
export function isConsentRegionTimeZone(tz: string): boolean {
  return tz.startsWith('Europe/') || EXTRA_CONSENT_REGION_TIMEZONES.includes(tz);
}

export function inConsentRegion(): boolean {
  try {
    return isConsentRegionTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  } catch {
    return true; // Unknown timezone: fail closed (ask for consent).
  }
}

export function getStoredChoice(): Choice | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

function setStoredChoice(choice: Choice): void {
  try { localStorage.setItem(CONSENT_KEY, choice); } catch { /* choice just won't persist */ }
}

let gaScriptInjected = false;

/** Queues gtag's `js`/`config` and, once ever, injects the real gtag.js script.
 *  `locale` is set once here as a GA4 config parameter (page_locale), not
 *  threaded through every track() call in ./analytics.ts. */
export function loadGtag(gaId: string, locale: string = 'en'): void {
  const gtag = gtagStub();
  gtag('js', new Date());
  gtag('config', gaId, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    page_locale: locale,
  });
  if (gaScriptInjected) return;
  gaScriptInjected = true;
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script);
}

/** gtag.js can't be unloaded, so withdrawal best-effort clears its cookies too. */
function deleteGaCookies(): void {
  const parts = location.hostname.split('.');
  const domains = ['', location.hostname];
  for (let i = 1; i < parts.length - 1; i++) domains.push('.' + parts.slice(i).join('.'));
  for (const name of document.cookie.split(';').map(c => c.split('=')[0].trim())) {
    if (name === '_ga' || name.startsWith('_ga_')) {
      for (const domain of domains) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/` + (domain ? `; domain=${domain}` : '');
      }
    }
  }
}

/** Called by AnalyticsHead.astro on every GA-enabled page. */
export function bootstrap(gaId: string, locale: string = 'en'): void {
  pushConsentDefaults();
  if (!inConsentRegion()) { loadGtag(gaId, locale); return; }
  const choice = getStoredChoice();
  if (choice === 'granted') {
    window.gtag!('consent', 'update', { analytics_storage: 'granted' });
    loadGtag(gaId, locale);
  } else if (choice === 'denied') {
    window.gtag!('consent', 'update', { analytics_storage: 'denied' });
  }
  // No stored choice yet: leave the region default (denied) in place and let
  // ConsentBanner.astro ask.
}

/** Called by ConsentBanner.astro's Accept/Decline buttons. */
export function applyChoice(gaId: string, choice: Choice): void {
  setStoredChoice(choice);
  const gtag = gtagStub();
  if (choice === 'granted') {
    gtag('consent', 'update', { analytics_storage: 'granted' });
    loadGtag(gaId, document.documentElement.lang || 'en');
  } else {
    gtag('consent', 'update', { analytics_storage: 'denied' });
    deleteGaCookies();
  }
}
