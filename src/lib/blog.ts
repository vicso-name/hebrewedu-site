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

/** One locale's posts, newest first. */
export async function getSortedPosts(locale: Locale = 'en'): Promise<BlogPost[]> {
  const posts = await getCollection(COLLECTION[locale]);
  return (posts as BlogPost[]).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
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

const DATE_LOCALE: Record<Locale, string> = { en: 'en-US', fr: 'fr-FR' };

export function formatPostDate(date: Date, locale: Locale = 'en'): string {
  return date.toLocaleDateString(DATE_LOCALE[locale], {
    year: 'numeric', month: 'long', day: 'numeric'
  });
}
