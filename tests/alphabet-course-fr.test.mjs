// Per-locale (FR) tests for src/lib/alphabet-course.mjs — see docs/I18N_AUDIT.md §3/§7
// and the FR localization infra brief. `supportedLessonRoutesFr` is computed once,
// at module-load time, from the real contents of src/content/lessons/fr/ — which
// holds real aleph/bet/gimel/dalet/he/vav fixtures as of the FR backfill in
// progress (prepared, not yet published) plus this file's own placeholders for
// the rest. To integration-test the "FR route exists" gate itself (not just the
// locale-agnostic `validateWeeklyReleaseLimit` function), this file writes a
// handful of empty placeholder files there *before* importing the module (so its
// module-scope readdirSync sees them) for any fixture slug lacking a real file
// already, then removes only the ones it created once every test in this file
// has run — nothing is left behind, and the module cache for this file's own
// process is the only thing that ever observes the placeholders (`node --test`
// runs each test file in its own process).
import { writeFileSync, rmSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import test, { after } from 'node:test';
import assert from 'node:assert/strict';

const FR_CONTENT_DIR = fileURLToPath(new URL('../src/content/lessons/fr/', import.meta.url));
// 'nun' has no real FR fixture — kept only as a placeholder slug for the
// "has a route but no webImplemented flag" case below; 'samekh' is deliberately
// left out of this list so it stays the "no FR route at all" baseline. 'chet',
// 'tet', 'yod', 'kaf', 'lamed' and 'mem' are no longer placeholders here — they have
// real FR fixtures and are implemented in both locales, like aleph..zayin above.
const FIXTURE_SLUGS = ['aleph', 'bet', 'gimel', 'dalet', 'he', 'vav', 'zayin', 'chet', 'tet', 'yod', 'kaf', 'lamed', 'mem', 'nun'];
mkdirSync(FR_CONTENT_DIR, { recursive: true });
const createdFixtures = FIXTURE_SLUGS
  .map(slug => `${FR_CONTENT_DIR}${slug}.json`)
  .filter(path => !existsSync(path));
for (const path of createdFixtures) writeFileSync(path, '{}\n');
after(() => { for (const path of createdFixtures) rmSync(path, { force: true }); });

const { courseManifest, validatePublicationManifest, validateWeeklyReleaseLimit, courseSitemapEntries, lessonEnabled, coursePathFr } = await import('../src/lib/alphabet-course.mjs');

const draft = () => {
  const value = structuredClone(courseManifest);
  for (const item of [value.hub, ...value.lessons]) Object.assign(item, { editorialApproved: false, published: false, publishedAt: null });
  // aleph/bet/gimel/dalet/he/vav are now actually published in FR (the FR
  // backfill) — reset locales.fr publication state too, so each test below
  // starts from a clean slate and sets up exactly the FR state it needs.
  for (const lesson of value.lessons) {
    if (lesson.locales?.fr) Object.assign(lesson.locales.fr, { editorialApproved: false, published: false, publishedAt: null });
  }
  return value;
};

test('a lesson with no locales map, or an all-false locales.fr, behaves exactly as before for non-en locales', () => {
  // aleph..mem all have real FR fixtures and webImplemented/previewAvailable
  // flipped as of this checkout — use a still-untouched lesson (samekh) for the
  // "nothing implemented yet" baseline instead.
  assert.equal(lessonEnabled('samekh', false, courseManifest, 'fr'), false);
  assert.equal(lessonEnabled('samekh', true, courseManifest, 'fr'), false);
  // Scaffolded locales.fr (all false) on every not-yet-backfilled lesson in
  // src/data/alphabet-course.json must behave the same as no locales map at all.
  const notYetBackfilled = courseManifest.lessons.filter(l => !['aleph', 'bet', 'gimel', 'dalet', 'he', 'vav', 'zayin', 'chet', 'tet', 'yod', 'kaf', 'lamed', 'mem'].includes(l.slug));
  assert.ok(notYetBackfilled.every(l => l.locales?.fr && Object.values(l.locales.fr).every(v => v === false || v === null)));
  assert.doesNotThrow(() => validatePublicationManifest(courseManifest));
});

test('FR cannot publish ahead of its EN lesson, even with a real FR route and full FR approval', () => {
  const value = draft();
  Object.assign(value.lessons[0].locales.fr, { webImplemented: true, editorialApproved: true, published: true, publishedAt: '2026-10-19' });
  assert.throws(() => validatePublicationManifest(value), /FR cannot publish aleph before its EN lesson is published/);
  // Once EN itself is published, the identical FR flags are accepted.
  Object.assign(value.lessons[0], { editorialApproved: true, published: true, publishedAt: '2026-10-11' });
  assert.equal(validatePublicationManifest(value), value);
  assert.equal(lessonEnabled('aleph', false, value, 'fr'), true);
  assert.equal(lessonEnabled('aleph', false, value, 'en'), true);
});

test('FR publication needs its own implemented route, independent of whether EN has one', () => {
  const value = draft();
  Object.assign(value.lessons[0], { editorialApproved: true, published: true, publishedAt: '2026-10-11' });
  // samekh (lessons[14]) has no FR fixture at all (not in this file's
  // FIXTURE_SLUGS) — flipping FR webImplemented for it must fail closed on the
  // route check.
  const samekh = value.lessons.find(l => l.slug === 'samekh');
  samekh.locales.fr.webImplemented = true;
  assert.throws(() => validatePublicationManifest(value), /No implemented FR route for samekh/);
  samekh.locales.fr.webImplemented = false;
  // nun *does* have an FR fixture route here (this file's placeholder) but no
  // webImplemented flag of its own — previewAvailable without webImplemented is
  // still rejected, same rule as EN's own. (aleph..mem are excluded from this
  // check since they already have webImplemented: true in the real manifest.)
  const nun = value.lessons.find(l => l.slug === 'nun');
  nun.locales.fr.previewAvailable = true;
  assert.throws(() => validatePublicationManifest(value), /FR preview requires an implemented route/);
});

test('FR and EN weekly-release caps are independent counters', () => {
  const value = draft();
  const enDates = { aleph: '2026-10-11', bet: '2026-10-14', gimel: '2026-10-15', dalet: '2026-10-15', he: '2026-10-19', vav: '2026-10-19' };
  for (const lesson of value.lessons) {
    if (!(lesson.slug in enDates)) continue;
    Object.assign(lesson, { editorialApproved: true, published: true, publishedAt: enDates[lesson.slug] });
  }
  // All five FR publications land in the same ISO week (2026-10-05..10-11) — that
  // alone is fine, since EN's own dates above are spread across different
  // weeks (none exceeding 5) and FR's cap is counted completely separately.
  const frDates = { aleph: '2026-10-05', bet: '2026-10-06', gimel: '2026-10-07', dalet: '2026-10-08', he: '2026-10-09' };
  for (const lesson of value.lessons) {
    if (!(lesson.slug in frDates)) continue;
    Object.assign(lesson.locales.fr, { webImplemented: true, editorialApproved: true, published: true, publishedAt: frDates[lesson.slug], backfill: false });
  }
  assert.doesNotThrow(() => validatePublicationManifest(value));
  // A 6th FR publication in that same ISO week exceeds FR's cap, while EN's own
  // cap (untouched here) stays satisfied.
  Object.assign(value.lessons.find(l => l.slug === 'vav').locales.fr, { webImplemented: true, editorialApproved: true, published: true, publishedAt: '2026-10-10', backfill: false });
  assert.throws(() => validatePublicationManifest(value), /Maximum five new lessons per ISO week/);
});

test('a backfill FR publication is exempt from the FR weekly-release cap', () => {
  const dates = ['2026-10-05', '2026-10-06', '2026-10-07', '2026-10-08', '2026-10-09', '2026-10-10'];
  assert.throws(() => validateWeeklyReleaseLimit(dates), /Maximum five/);
  const value = draft();
  const enDates = { aleph: '2026-10-11', bet: '2026-10-14', gimel: '2026-10-15', dalet: '2026-10-15', he: '2026-10-19', vav: '2026-10-19' };
  for (const lesson of value.lessons) {
    if (!(lesson.slug in enDates)) continue;
    Object.assign(lesson, { editorialApproved: true, published: true, publishedAt: enDates[lesson.slug] });
  }
  // Same 6-in-one-week FR shape as `dates` above, marked non-backfill: must fail.
  const slugs = Object.keys(enDates);
  slugs.forEach((slug, i) => {
    Object.assign(value.lessons.find(l => l.slug === slug).locales.fr, { webImplemented: true, editorialApproved: true, published: true, publishedAt: dates[i], backfill: false });
  });
  assert.throws(() => validatePublicationManifest(value), /Maximum five new lessons per ISO week/);
  // Marked as backfill (clearing an FR backlog for letters already published in
  // EN), the same 6-in-one-week shape is exempt from the FR cap.
  slugs.forEach(slug => { value.lessons.find(l => l.slug === slug).locales.fr.backfill = true; });
  assert.doesNotThrow(() => validatePublicationManifest(value));
});

test('courseSitemapEntries lists a published FR lesson under the FR course path once it has a real FR route', () => {
  assert.equal(coursePathFr, '/fr/apprendre/alphabet-hebreu/');
  const value = draft();
  Object.assign(value.hub, { editorialApproved: true, published: true, publishedAt: '2026-10-11' });
  Object.assign(value.lessons[0], { editorialApproved: true, published: true, publishedAt: '2026-10-11' });
  assert.deepEqual(courseSitemapEntries(value).map(x => x.url), ['/learn/hebrew-alphabet/', '/learn/hebrew-alphabet/aleph/']);
  Object.assign(value.lessons[0].locales.fr, { webImplemented: true, editorialApproved: true, published: true, publishedAt: '2026-10-12' });
  const entries = courseSitemapEntries(value);
  assert.deepEqual(entries.map(x => x.url), ['/learn/hebrew-alphabet/', '/learn/hebrew-alphabet/aleph/', '/fr/apprendre/alphabet-hebreu/aleph/']);
  assert.equal(entries.at(-1).lastmod, '2026-10-12');
});
