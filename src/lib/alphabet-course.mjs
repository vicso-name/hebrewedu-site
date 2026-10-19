import { readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import manifest from '../data/alphabet-course.json' with { type: 'json' };

export const coursePath = '/learn/hebrew-alphabet/';
export const courseTitle = 'Hebrew Alphabet Course for Beginners';
export const courseDescription = 'Learn the Hebrew alphabet step by step with beginner explanations, examples and practice. Start with Aleph and explore the 22-letter learning path.';
// A route exists once its content file exists — derived from disk, not a hardcoded list.
// Resolved from the project root (process.cwd(), set by `npm run build`/`npm test`/the
// Astro CLI), not import.meta.url: this module can end up bundled into a build chunk
// whose own URL no longer sits next to src/content/lessons/.
const lessonsContentDir = resolve(process.cwd(), 'src/content/lessons');
const supportedLessonRoutes = new Set(readdirSync(lessonsContentDir).filter(name => name.endsWith('.json')).map(name => name.slice(0, -'.json'.length)));
// FR lesson content (src/content/lessons/fr/<slug>.json) is independent of EN's —
// a slug counts as FR-route-supported only once its own FR content file exists.
const lessonsContentDirFr = resolve(process.cwd(), 'src/content/lessons/fr');
const supportedLessonRoutesFr = new Set(
  existsSync(lessonsContentDirFr)
    ? readdirSync(lessonsContentDirFr).filter(name => name.endsWith('.json')).map(name => name.slice(0, -'.json'.length))
    : [],
);

function weekKey(value) {
  const d = new Date(`${value}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(d.getTime()) || d.toISOString().slice(0, 10) !== value) throw new Error('A real publication date is required');
  // ISO weeks run Monday–Sunday; use the date of that week's Monday.
  d.setUTCDate(d.getUTCDate() - (d.getUTCDay() + 6) % 7);
  return d.toISOString().slice(0, 10);
}
export function validateWeeklyReleaseLimit(dates) {
  const weeks = new Map();
  for (const date of dates) {
    const week = weekKey(date);
    weeks.set(week, (weeks.get(week) ?? 0) + 1);
  }
  if ([...weeks.values()].some(count => count > 3)) throw new Error('Maximum three new lessons per ISO week');
}

const SUPPORTED_EXTRA_LOCALES = ['fr'];

export function validatePublicationManifest(value) {
  if (value.schemaVersion !== 1 || value.maximumNewLessonsPerWeek !== 3 || value.hub.path !== coursePath || value.lessons.length !== 22) throw new Error('Invalid course publication manifest');
  const glyphs = [...'אבגדהוזחטיכלמנסעפצקרשת'];
  const slugs = ['aleph','bet','gimel','dalet','he','vav','zayin','chet','tet','yod','kaf','lamed','mem','nun','samekh','ayin','pe','tsadi','qof','resh','shin','tav'];
  for (const [i, lesson] of value.lessons.entries()) {
    if (lesson.sourceId !== i + 1 || lesson.order !== i + 1 || lesson.letter !== glyphs[i] || lesson.slug !== slugs[i] || typeof lesson.name !== 'string' || !lesson.name) throw new Error(`Invalid verified identity at ${i + 1}`);
    for (const key of ['sourceImported','webImplemented','previewAvailable','editorialApproved','published']) if (typeof lesson[key] !== 'boolean') throw new Error(`Explicit ${key} required for ${lesson.slug}`);
    if ((lesson.webImplemented || lesson.previewAvailable) && !supportedLessonRoutes.has(lesson.slug)) throw new Error(`No implemented route for ${lesson.slug}`);
    if (lesson.previewAvailable && !lesson.webImplemented) throw new Error('Preview requires an implemented route');
    if (lesson.published) {
      if (!lesson.sourceImported || !lesson.webImplemented || !lesson.editorialApproved) throw new Error(`Publication approval/implementation missing: ${lesson.slug}`);
      weekKey(lesson.publishedAt);
    } else if (lesson.publishedAt !== null) throw new Error('Unpublished lessons must not claim a release date');

    // Per-locale publication state (e.g. `locales.fr`) is entirely optional — a
    // lesson with no `locales` key behaves exactly as before. FR publishes
    // independently of EN's own flags above, with one hard constraint: FR can
    // never get ahead of EN (see docs/I18N_AUDIT.md §7 and the FR localization brief).
    if (lesson.locales !== undefined) {
      if (typeof lesson.locales !== 'object' || lesson.locales === null || Object.keys(lesson.locales).some(key => !SUPPORTED_EXTRA_LOCALES.includes(key))) {
        throw new Error(`Invalid locales map for ${lesson.slug}`);
      }
      const fr = lesson.locales.fr;
      if (fr !== undefined) {
        for (const key of ['webImplemented','previewAvailable','editorialApproved','published','backfill']) {
          if (typeof fr[key] !== 'boolean') throw new Error(`Explicit fr.${key} required for ${lesson.slug}`);
        }
        if ((fr.webImplemented || fr.previewAvailable) && !supportedLessonRoutesFr.has(lesson.slug)) throw new Error(`No implemented FR route for ${lesson.slug}`);
        if (fr.previewAvailable && !fr.webImplemented) throw new Error('FR preview requires an implemented route');
        if (fr.published) {
          if (!fr.webImplemented || !fr.editorialApproved) throw new Error(`FR publication approval/implementation missing: ${lesson.slug}`);
          if (!lesson.published) throw new Error(`FR cannot publish ${lesson.slug} before its EN lesson is published`);
          weekKey(fr.publishedAt);
        } else if (fr.publishedAt !== null) throw new Error('Unpublished FR lessons must not claim a release date');
      }
    }
  }
  validateWeeklyReleaseLimit(value.lessons.filter(item => item.published).map(item => item.publishedAt));
  // FR's weekly cap is a separate, independent counter from EN's (own editorial
  // bottleneck, see docs/I18N_AUDIT.md §7) — except a backfill publication (an FR
  // lesson for a letter already published in EN) is exempt, so clearing the FR
  // backlog for already-published EN letters never gets artificially rate-limited.
  validateWeeklyReleaseLimit(
    value.lessons.filter(item => item.locales?.fr?.published && !item.locales.fr.backfill).map(item => item.locales.fr.publishedAt),
  );
  for (const key of ['editorialApproved','published']) if (typeof value.hub[key] !== 'boolean') throw new Error(`Explicit hub ${key} required`);
  if (value.hub.published) {
    if (!value.hub.editorialApproved || !value.lessons[0].published) throw new Error('Hub launch requires hub approval and a separately approved published Aleph route');
    weekKey(value.hub.publishedAt);
  } else if (value.hub.publishedAt !== null) throw new Error('Unpublished hub must not claim a release date');
  return value;
}

export const courseManifest = validatePublicationManifest(manifest);
export function localCoursePreview(dev = false, env = process.env) {
  return dev || env.HEBREWEDU_LOCAL_COURSE_PREVIEW === '1' || env.HEBREWEDU_LOCAL_LESSON_POC === '1';
}
export function hubEnabled(preview = false, config = courseManifest) { return preview || config.hub.published; }
// `locale` defaults to 'en' and reads the lesson's own top-level flags, exactly as
// before. Any other locale reads `locales.<locale>` instead — absent entirely
// (no `locales` key, or no entry for that locale) means not enabled, never a throw.
export function lessonEnabled(slug, preview = false, config = courseManifest, locale = 'en') {
  const lesson = config.lessons.find(item => item.slug === slug);
  if (!lesson) return false;
  const state = locale === 'en' ? lesson : lesson.locales?.[locale];
  return Boolean(state?.webImplemented && (state.published || (preview && state.previewAvailable)));
}
export function curriculum(preview = false, config = courseManifest) {
  return config.lessons.map(lesson => ({ order: lesson.order, letter: lesson.letter, name: lesson.name, available: lessonEnabled(lesson.slug, preview, config), href: lessonEnabled(lesson.slug, preview, config) ? `${coursePath}${lesson.slug}/` : null }));
}
export const coursePathFr = '/fr/apprendre/alphabet-hebreu/';
export function courseSitemapEntries(config = courseManifest) {
  validatePublicationManifest(config);
  if (!config.hub.published) return [];
  return [
    { url: coursePath, lastmod: config.hub.publishedAt, priority: '0.8', changefreq: 'weekly' },
    ...config.lessons.filter(item => item.published).map(item => ({ url: `${coursePath}${item.slug}/`, lastmod: item.publishedAt, priority: '0.7', changefreq: 'monthly' })),
    // FR lessons are only ever sitemapped once published for FR specifically — the
    // EN hub's own publication gate above does not control these (the FR hub page
    // is sitemapped as a static page; see src/pages/sitemap.xml.ts).
    ...config.lessons.filter(item => item.locales?.fr?.published).map(item => ({ url: `${coursePathFr}${item.slug}/`, lastmod: item.locales.fr.publishedAt, priority: '0.7', changefreq: 'monthly' })),
  ];
}
export function courseSchema(config = courseManifest) {
  validatePublicationManifest(config);
  const url = `https://hebrewedu.com${coursePath}`;
  const page = { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: courseTitle, description: courseDescription, inLanguage: 'en' };
  // Draft preview describes the page only. Never advertise 22 published modules.
  if (!config.hub.published) return { '@context': 'https://schema.org', ...page };
  validatePublicationManifest(config);
  const lessons = config.lessons.filter(item => item.published).map(item => ({ '@type': 'LearningResource', '@id': `${url}${item.slug}/#lesson`, url: `${url}${item.slug}/`, name: `${item.name} Hebrew letter lesson`, inLanguage: 'en', learningResourceType: 'Lesson' }));
  return { '@context': 'https://schema.org', '@graph': [
    { ...page, mainEntity: { '@id': `${url}#course` } },
    { '@type': 'Course', '@id': `${url}#course`, url, name: 'Hebrew Alphabet Course', description: courseDescription, inLanguage: 'en', educationalLevel: 'Beginner', provider: { '@type': 'Organization', name: 'HebrewEdu', url: 'https://hebrewedu.com/' }, hasPart: lessons },
    { '@type': 'ItemList', '@id': `${url}#lessons`, name: 'Available Hebrew alphabet lessons', numberOfItems: lessons.length, itemListElement: lessons.map((item, i) => ({ '@type': 'ListItem', position: i + 1, item })) },
  ] };
}
