// The one entry point for sending analytics events. GA is only ever wired up
// by AnalyticsHead.astro/ConsentBanner.astro (production builds, consent-gated
// region loading — see analytics-consent.ts); everywhere else, including every
// dev/preview build, `window.gtag` is never defined, so this is a plain no-op.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', event, params);
}
