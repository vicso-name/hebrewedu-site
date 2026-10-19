import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n';

/** A post in either locale. The two collections share one schema
 *  (src/content.config.ts), so every consumer can treat them uniformly. */
export type BlogPost = CollectionEntry<'blog'> | CollectionEntry<'blogFr'>;

const COLLECTION = { en: 'blog', fr: 'blogFr' } as const;

/** Route prefix for a locale's blog (docs/I18N.md §1). */
export const blogPath = (locale: Locale = 'en'): string =>
  locale === 'fr' ? '/fr/blog/' : '/blog/';

/** Absolute URL of a post, used for hreflang and JSON-LD. */
export const postUrl = (locale: Locale, id: string): string =>
  `https://hebrewedu.com${blogPath(locale)}${id}/`;

/**
 * EN post ids in the value-rank order of the numbered table in
 * `docs/seo/research/fr/BLOG_FR_PLAN.md` ("EN post → FR slug, primary
 * keyword, title draft") — highest-value first. An FR post carries its EN
 * counterpart's id as `translationKey`, so this same list ranks both
 * locales. Used only to break a `pubDate` tie deterministically (several FR
 * posts from the same publish batch share one `pubDate`); update this list
 * in the same change as that table if its order ever changes.
 */
const BLOG_VALUE_ORDER: readonly string[] = [
  'hebrew-alphabet-complete-guide',
  'why-hebrew-handwriting-looks-completely-different-from-printed-hebrew',
  'how-to-read-hebrew-nikud',
  'meet-the-new-verb-directory',
  'how-to-learn-hebrew-vocabulary',
  'why-hebrew-without-vowels-looks-impossible-until-your-brain-adapts',
  'hebrew-binyanim-explained',
  'how-the-hebrew-root-system-works',
  'learn-hebrew-alphabet-7-days',
  'how-hard-is-hebrew-to-learn',
  'how-not-to-learn-hebrew-a-complete-guide-to-failing-efficiently',
  'story-behind-learn-hebrew-read-speak',
  'what-makes-a-language-learning-game-educational',
  'how-many-words-are-in-the-modern-hebrew-language',
  'why-hebrew-sounds-so-fast',
  'best-hebrew-listening-practice',
  'why-you-can-read-hebrew-but-still-understand-absolutely-nothing',
];

const DATE_LOCALE: Record<Locale, string> = { en: 'en-US', fr: 'fr-FR' };

/** This post's position in `BLOG_VALUE_ORDER`, or `+Infinity` if it isn't in
 *  the table (e.g. the out-of-scope `porting-android-app-to-ios-with-ai`
 *  post) — sorts untracked posts after every ranked one. */
function valueRank(post: BlogPost): number {
  const key = post.data.translationKey ?? post.id;
  const index = BLOG_VALUE_ORDER.indexOf(key);
  return index === -1 ? Infinity : index;
}

/**
 * One locale's posts, newest first. Equal `pubDate`s (every post in one
 * publish batch shares its ship date) break the tie first by
 * `BLOG_VALUE_ORDER`, then by title, so the listing order is deterministic
 * rather than dependent on filesystem/glob enumeration order.
 */
export async function getSortedPosts(locale: Locale = 'en'): Promise<BlogPost[]> {
  const posts = await getCollection(COLLECTION[locale]);
  return (posts as BlogPost[]).sort((a, b) => {
    const dateDiff = b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
    if (dateDiff !== 0) return dateDiff;
    const rankDiff = valueRank(a) - valueRank(b);
    if (rankDiff !== 0) return rankDiff;
    return a.data.title.localeCompare(b.data.title, DATE_LOCALE[locale]);
  });
}

/**
 * The counterpart of `post` in the other locale, paired by `translationKey`
 * (docs/I18N.md §3): hreflang is reciprocal or absent, so a post only declares
 * alternates when this returns one.
 */
export async function getTranslation(
  locale: Locale,
  post: BlogPost
): Promise<BlogPost | undefined> {
  const key = post.data.translationKey;
  if (!key) return undefined;
  const other: Locale = locale === 'en' ? 'fr' : 'en';
  return (await getSortedPosts(other)).find((p) => p.data.translationKey === key);
}

export function formatPostDate(date: Date, locale: Locale = 'en'): string {
  return date.toLocaleDateString(DATE_LOCALE[locale], {
    year: 'numeric', month: 'long', day: 'numeric'
  });
}
