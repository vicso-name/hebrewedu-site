export interface Store {
  url: string | null;
  label: string;
  badge: string;
  width: number;
  height: number;
}

const googlePlay: Store = {
  url: 'https://play.google.com/store/apps/details?id=com.vicsothemes.hebrewforbeginners',
  label: 'Get it on Google Play',
  badge: '/googleplay-badge.svg',
  width: 189,
  height: 56,
};

// The iOS app is awaiting approval. Once it is live, set `url` and add the
// official badge to public/ — StoreButtons will pick it up automatically.
const appStore: Store = {
  url: null,
  label: 'Download on the App Store',
  badge: '/appstore-badge.svg',
  width: 168,
  height: 56,
};

export const site = {
  name: 'HebrewEdu',
  stores: { googlePlay, appStore },
  // Where single-button CTAs (e.g. the nav) send people.
  primaryStoreUrl: googlePlay.url as string,
};
