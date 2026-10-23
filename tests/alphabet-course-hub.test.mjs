import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { courseManifest, validatePublicationManifest, validateWeeklyReleaseLimit, courseSitemapEntries, curriculum, courseSchema, hubEnabled, lessonEnabled, localCoursePreview } from '../src/lib/alphabet-course.mjs';
const draft = () => {
  const value = structuredClone(courseManifest);
  for (const item of [value.hub, ...value.lessons]) Object.assign(item, { editorialApproved: false, published: false, publishedAt: null });
  // This file only exercises the EN-side manifest logic — reset each lesson's
  // locales.fr publication state too, so the real FR backfill state (aleph,
  // bet, gimel, dalet, he, vav all published in FR) doesn't trip the
  // FR-can't-publish-ahead-of-EN guard once this draft() resets EN back to
  // unpublished. FR-specific behavior has its own coverage in
  // alphabet-course-fr.test.mjs.
  for (const lesson of value.lessons) {
    if (lesson.locales?.fr) Object.assign(lesson.locales.fr, { editorialApproved: false, published: false, publishedAt: null });
  }
  return value;
};

test('explicit curriculum releases only owner-approved Aleph among 22 verified identities', async () => {
  const identities = JSON.parse(await readFile(new URL('./fixtures/alphabet-identities.json', import.meta.url)));
  assert.deepEqual(courseManifest.lessons.map(l => [l.sourceId,l.order,l.letter,l.slug]), identities);
  assert.equal(courseManifest.lessons.filter(l => l.sourceImported).length, 22);
  assert.equal(courseManifest.lessons.filter(l => l.published).length, 8);
  assert.equal(curriculum().filter(l => l.available).length, 8);
  assert.ok(courseManifest.lessons.slice(8).every(l => !l.published && !l.editorialApproved && l.publishedAt === null));
  assert.equal(courseManifest.hub.publishedAt, '2026-10-11');
  assert.equal(courseManifest.lessons[0].publishedAt, '2026-10-11');
  assert.equal(courseManifest.lessons[1].publishedAt, '2026-10-14');
  assert.equal(courseManifest.lessons[2].publishedAt, '2026-10-15');
  assert.equal(courseManifest.lessons[3].publishedAt, '2026-10-15');
  assert.equal(courseManifest.lessons[4].publishedAt, '2026-10-19');
  assert.equal(courseManifest.lessons[5].publishedAt, '2026-10-19');
  assert.equal(courseManifest.lessons[6].publishedAt, '2026-10-20');
  assert.equal(courseManifest.lessons[7].publishedAt, '2026-10-23');
  const preview = curriculum(true);
  assert.equal(preview.filter(l => l.available).length, 8);
  assert.equal(preview[0].href, '/learn/hebrew-alphabet/aleph/');
  assert.equal(preview[1].href, '/learn/hebrew-alphabet/bet/');
  assert.equal(preview[2].href, '/learn/hebrew-alphabet/gimel/');
  assert.equal(preview[3].href, '/learn/hebrew-alphabet/dalet/');
  assert.equal(preview[4].href, '/learn/hebrew-alphabet/he/');
  assert.equal(preview[5].href, '/learn/hebrew-alphabet/vav/');
  assert.equal(preview[6].href, '/learn/hebrew-alphabet/zayin/');
  assert.equal(preview[7].href, '/learn/hebrew-alphabet/chet/');
  assert.ok(preview.slice(8).every(l => l.href === null));
  assert.equal(hubEnabled(), true);
  assert.equal(hubEnabled(false, draft()), false);
  assert.equal(lessonEnabled('bet', true), true);
  assert.equal(lessonEnabled('bet', false), true);
  assert.equal(lessonEnabled('bogus', true), false);
});
test('no preview flag can create sitemap entries or public Course claims', () => {
  assert.equal(localCoursePreview(false, {}), false);
  assert.equal(localCoursePreview(false, { HEBREWEDU_LOCAL_COURSE_PREVIEW: '1' }), true);
  assert.equal(localCoursePreview(false, { HEBREWEDU_LOCAL_LESSON_POC: '1' }), true);
  assert.deepEqual(courseSitemapEntries(draft()), []);
  // aleph..chet are now published in FR too (the FR backfill plus zayin's and
  // chet's own same-cadence FR publishes), alongside their EN routes.
  assert.deepEqual(courseSitemapEntries().map(x => x.url), ['/learn/hebrew-alphabet/', '/learn/hebrew-alphabet/aleph/', '/learn/hebrew-alphabet/bet/', '/learn/hebrew-alphabet/gimel/', '/learn/hebrew-alphabet/dalet/', '/learn/hebrew-alphabet/he/', '/learn/hebrew-alphabet/vav/', '/learn/hebrew-alphabet/zayin/', '/learn/hebrew-alphabet/chet/', '/fr/apprendre/alphabet-hebreu/aleph/', '/fr/apprendre/alphabet-hebreu/bet/', '/fr/apprendre/alphabet-hebreu/gimel/', '/fr/apprendre/alphabet-hebreu/dalet/', '/fr/apprendre/alphabet-hebreu/he/', '/fr/apprendre/alphabet-hebreu/vav/', '/fr/apprendre/alphabet-hebreu/zayin/', '/fr/apprendre/alphabet-hebreu/chet/']);
  const schema = courseSchema(draft());
  assert.equal(schema['@type'], 'WebPage');
  assert.equal(schema.url, 'https://hebrewedu.com/learn/hebrew-alphabet/');
  assert.equal(schema['@graph'], undefined);
});
test('publication fails closed without independent editorial approval and implemented routes', () => {
  const value = draft();
  value.hub.published = true; value.hub.editorialApproved = true; value.hub.publishedAt = '2026-10-11';
  assert.throws(() => validatePublicationManifest(value), /separately approved/);
  value.lessons[0].published = true; value.lessons[0].publishedAt = '2026-10-11';
  assert.throws(() => validatePublicationManifest(value), /approval/);
  value.lessons[0].editorialApproved = true;
  assert.equal(validatePublicationManifest(value), value);
  assert.equal(lessonEnabled('aleph', false, value), true);
  assert.deepEqual(courseSitemapEntries(value).map(x => x.url), ['/learn/hebrew-alphabet/', '/learn/hebrew-alphabet/aleph/']);
  // lessons[1]/[2]/[3]/[4]/[5]/[6]/[7] (bet, gimel, dalet, he, vav, zayin,
  // chet) are themselves implemented and preview-available by this point
  // (see alphabet-course.json) — exercise the "no implemented route" case on
  // lessons[8] (tet), which still has no src/content/lessons/tet.json.
  value.lessons[8].editorialApproved = true; value.lessons[8].published = true; value.lessons[8].publishedAt = '2026-10-11';
  assert.throws(() => validatePublicationManifest(value), /implementation/);
  value.lessons[8].webImplemented = true;
  assert.throws(() => validatePublicationManifest(value), /No implemented route/);
});
test('later approved launch structured data describes only released modules', () => {
  const value = draft();
  Object.assign(value.hub, { editorialApproved: true, published: true, publishedAt: '2026-10-11' });
  Object.assign(value.lessons[0], { editorialApproved: true, published: true, publishedAt: '2026-10-11' });
  const graph = courseSchema(value)['@graph'];
  assert.equal(graph.find(x=>x['@type']==='Course').hasPart.length,1);
  const list = graph.find(x=>x['@type']==='ItemList');
  assert.equal(list.numberOfItems,1);
  assert.equal(list.itemListElement[0].item.url,'https://hebrewedu.com/learn/hebrew-alphabet/aleph/');
  assert.equal(/rating|certificate|duration|instructor|\/bet\//i.test(JSON.stringify(graph)),false);
});
test('five-new-lessons limit is enforced per Monday–Sunday week, including year boundaries', () => {
  assert.equal(courseManifest.maximumNewLessonsPerWeek, 5);
  assert.doesNotThrow(() => validateWeeklyReleaseLimit(['2026-10-05','2026-10-06','2026-10-07','2026-10-08','2026-10-11','2026-10-12']));
  assert.throws(() => validateWeeklyReleaseLimit(['2026-10-05','2026-10-06','2026-10-07','2026-10-08','2026-10-09','2026-10-11']), /Maximum five/);
  assert.throws(() => validateWeeklyReleaseLimit(['2026-12-28','2026-12-29','2026-12-30','2026-12-31','2027-01-01','2027-01-03']), /Maximum five/);
  assert.throws(() => validateWeeklyReleaseLimit(['2026-02-30']), /real publication date/);
});
