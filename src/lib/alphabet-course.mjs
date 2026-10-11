import manifest from '../data/alphabet-course.json' with { type: 'json' };

export const coursePath = '/learn/hebrew-alphabet/';
export const courseTitle = 'Hebrew Alphabet Course for Beginners | HebrewEdu';
export const courseDescription = 'Learn the Hebrew alphabet step by step with beginner explanations, examples and interactive practice. Start with Aleph and explore the 22-letter learning path.';
const supportedLessonRoutes = new Set(['aleph']);

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
  }
  validateWeeklyReleaseLimit(value.lessons.filter(item => item.published).map(item => item.publishedAt));
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
export function lessonEnabled(slug, preview = false, config = courseManifest) {
  const lesson = config.lessons.find(item => item.slug === slug);
  return Boolean(lesson?.webImplemented && (lesson.published || (preview && lesson.previewAvailable)));
}
export function curriculum(preview = false, config = courseManifest) {
  return config.lessons.map(lesson => ({ order: lesson.order, letter: lesson.letter, name: lesson.name, available: lessonEnabled(lesson.slug, preview, config), href: lessonEnabled(lesson.slug, preview, config) ? `${coursePath}${lesson.slug}/` : null }));
}
export function courseSitemapEntries(config = courseManifest) {
  validatePublicationManifest(config);
  if (!config.hub.published) return [];
  return [
    { url: coursePath, lastmod: config.hub.publishedAt, priority: '0.8', changefreq: 'weekly' },
    ...config.lessons.filter(item => item.published).map(item => ({ url: `${coursePath}${item.slug}/`, lastmod: item.publishedAt, priority: '0.7', changefreq: 'monthly' })),
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
