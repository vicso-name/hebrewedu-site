// Data for the Hebrew cursive tool (/learn/hebrew-cursive/ and
// /fr/apprendre/hebreu-cursif/). Letter shapes come from the cursive font
// (--font-hebrew-cursive in global.css); everything here is the alphabet
// itself, so it carries no copy: names and tips live in src/i18n.
import { courseManifest, coursePath, coursePathFr, lessonEnabled } from './alphabet-course.mjs';

export const cursivePath = '/learn/hebrew-cursive/';
export const cursivePathFr = '/fr/apprendre/hebreu-cursif/';
export const cursivePublishedAt = '2026-11-03';

/** The 22 letters and 5 final forms in alphabet order. `slug` is the
 *  alphabet-course lesson slug; a final form shares its letter's slug. */
export const cursiveLetters = [
  ['aleph', 'א'], ['bet', 'ב'], ['gimel', 'ג'], ['dalet', 'ד'], ['he', 'ה'], ['vav', 'ו'],
  ['zayin', 'ז'], ['chet', 'ח'], ['tet', 'ט'], ['yod', 'י'], ['kaf', 'כ'], ['kaf', 'ך', true],
  ['lamed', 'ל'], ['mem', 'מ'], ['mem', 'ם', true], ['nun', 'נ'], ['nun', 'ן', true],
  ['samekh', 'ס'], ['ayin', 'ע'], ['pe', 'פ'], ['pe', 'ף', true], ['tsadi', 'צ'],
  ['tsadi', 'ץ', true], ['qof', 'ק'], ['resh', 'ר'], ['shin', 'ש'], ['tav', 'ת'],
].map(([slug, he, final = false]) => ({ id: final ? `${slug}-final` : slug, slug, he, final }));

/** EN letter names by slug (the FR ones are src/i18n/fr-letters.ts). */
export const enLetterNames = Object.fromEntries(courseManifest.lessons.map(l => [l.slug, l.name]));

/** Display name, e.g. "Kaf" / "Final Kaf" (en), "Kaf" / "Kaf final" (fr). */
export function letterName(letter, names, finalTemplate) {
  return letter.final ? finalTemplate.replace('{name}', names[letter.slug]) : names[letter.slug];
}

/** The letter's alphabet-course lesson, once it is published in that locale. */
export function lessonHref(letter, locale) {
  if (!lessonEnabled(letter.slug, false, courseManifest, locale)) return null;
  return `${locale === 'fr' ? coursePathFr : coursePath}${letter.slug}/`;
}

/** Pairs that look alike in cursive (checked against the font's glyphs).
 *  Order matches `cursive.pairTips` in the dictionaries. */
export const lookAlikePairs = [
  ['he', 'chet'], ['vav', 'nun-final'], ['resh', 'kaf-final'], ['kaf', 'bet'],
  ['samekh', 'mem-final'], ['pe-final', 'tsadi-final'], ['dalet', 'resh'], ['yod', 'vav'],
].map(ids => ids.map(id => cursiveLetters.find(l => l.id === id)));

/** Converter shortcuts. Glosses live in `cursive.examples` (same order). */
export const cursiveExamples = ['שלום', 'מזל טוב', 'תודה', 'אהבה', 'לחיים', 'ירושלים'];
export const cursiveDefault = cursiveExamples[0];

export function cursiveSitemapEntries() {
  return [
    { url: cursivePath, lastmod: cursivePublishedAt, priority: '0.8', changefreq: 'monthly' },
    { url: cursivePathFr, lastmod: cursivePublishedAt, priority: '0.8', changefreq: 'monthly' },
  ];
}

export function cursiveSchema(locale, { title, description, home, page, appName }) {
  const url = `https://hebrewedu.com${locale === 'fr' ? cursivePathFr : cursivePath}`;
  return { '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: title, description, inLanguage: [locale, 'he'] },
    { '@type': 'WebApplication', '@id': `${url}#app`, name: appName, url, applicationCategory: 'EducationalApplication',
      operatingSystem: 'Any', inLanguage: [locale, 'he'], isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: home, item: `https://hebrewedu.com${locale === 'fr' ? '/fr/' : '/'}` },
      { '@type': 'ListItem', position: 2, name: page, item: url },
    ] },
  ] };
}
