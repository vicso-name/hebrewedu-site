export interface Store {
  /** Analytics key; drives the `<id>_click` event (see AnalyticsConsent.astro). */
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

// The iOS app is awaiting approval. Once it is live, set `url` and add the
// official badge to public/ — StoreButtons will pick it up automatically.
const appStore: Store = {
  id: 'app_store',
  url: null,
  label: 'Download on the App Store',
  badge: '/appstore-badge.svg',
  width: 168,
  height: 56,
};

export const site = {
  name: 'HebrewEdu',
  url: 'https://hebrewedu.com',
  // Default <title> / meta description, and the homepage's own.
  title: 'Learn the Hebrew Alphabet & Read Hebrew | HebrewEdu',
  description: 'Learn the Hebrew alphabet step by step, practise vocabulary and verbs, and start reading beginner Hebrew with audio and translation.',
  // Public GA4 Web Measurement ID. GA only loads after analytics consent.
  analyticsId: 'G-2TFK0Y3W2W',
  stores: { googlePlay, appStore },
  // Where single-button CTAs (e.g. the nav) send people.
  primaryStoreUrl: googlePlay.url as string,
};
