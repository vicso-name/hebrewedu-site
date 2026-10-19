import type { Locale } from '../i18n';

export interface Store {
  /** Stable key, exposed as data-store on store links (hook for future analytics). */
  id: 'google_play' | 'app_store';
  url: string | null;
  label: string;
  badge: string;
  width: number;
  height: number;
}

const googlePlay: Store = {
  id: 'google_play',
  url: 'https://play.google.com/store/apps/details?id=com.vicsothemes.hebrewforbeginners',
  label: 'Get it on Google Play',
  badge: '/googleplay-badge.svg',
  width: 189,
  height: 56,
};

const appStore: Store = {
  id: 'app_store',
  url: 'https://apps.apple.com/app/learn-hebrew-read-speak/id6813120842',
  label: 'Download on the App Store',
  badge: '/appstore-badge.svg',
  width: 168,
  height: 56,
};

// Locale-aware store link. Google Play honors an &hl= UI-language param;
// the App Store has no such param — it redirects to the viewer's own
// storefront from a bare (no two-letter country segment) URL, so a
// hardcoded country segment is stripped defensively rather than added.
export function storeHref(store: Store, locale: Locale = 'en'): string | null {
  if (!store.url) return null;
  if (store.id === 'app_store') {
    return store.url.replace(/^(https:\/\/apps\.apple\.com)\/[a-z]{2}(\/app\/)/, '$1$2');
  }
  return locale === 'en' ? store.url : `${store.url}&hl=${locale}`;
}

export const site = {
  name: 'HebrewEdu',
  url: 'https://hebrewedu.com',
  // Default <title> / meta description, and the homepage's own.
  title: 'Learn the Hebrew Alphabet & Read Hebrew | HebrewEdu',
  description: 'Learn the Hebrew alphabet step by step, practise vocabulary and verbs, and start reading beginner Hebrew with audio and translation.',
  // Public GA4 Web Measurement ID. See src/lib/analytics-consent.ts for when it loads.
  analyticsId: 'G-P7MLCPECXE',
  stores: { googlePlay, appStore },
  // Let visitors choose the store for their device.
  appDownloadUrl: '/#download',
};
