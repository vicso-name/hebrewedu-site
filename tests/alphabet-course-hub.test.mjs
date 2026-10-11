import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { courseManifest, validatePublicationManifest, validateWeeklyReleaseLimit, courseSitemapEntries, curriculum, courseSchema, hubEnabled, lessonEnabled, localCoursePreview } from '../src/lib/alphabet-course.mjs';
const draft = () => {
  const value = structuredClone(courseManifest);
  for (const item of [value.hub, ...value.lessons]) Object.assign(item, { editorialApproved: false, published: false, publishedAt: null });
  return value;
};

test('explicit curriculum releases only owner-approved Aleph among 22 verified identities', async () => {
  const identities = JSON.parse(await readFile(new URL('./fixtures/alphabet-identities.json', import.meta.url)));
  assert.deepEqual(courseManifest.lessons.map(l => [l.sourceId,l.order,l.letter,l.slug]), identities);
  assert.equal(courseManifest.lessons.filter(l => l.sourceImported).length, 22);
  assert.equal(courseManifest.lessons.filter(l => l.published).length, 1);
  assert.equal(curriculum().filter(l => l.available).length, 1);
  assert.ok(courseManifest.lessons.slice(1).every(l => !l.published && !l.editorialApproved && l.publishedAt === null));
  assert.equal(courseManifest.hub.publishedAt, '2026-10-11');
  assert.equal(courseManifest.lessons[0].publishedAt, '2026-10-11');
  const preview = curriculum(true);
  assert.equal(preview.filter(l => l.available).length, 1);
  assert.equal(preview[0].href, '/learn/hebrew-alphabet/aleph/');
  assert.ok(preview.slice(1).every(l => l.href === null));
  assert.equal(hubEnabled(), true);
  assert.equal(hubEnabled(false, draft()), false);
  assert.equal(lessonEnabled('bet', true), false);
  assert.equal(lessonEnabled('bogus', true), false);
});
test('no preview flag can create sitemap entries or public Course claims', () => {
  assert.equal(localCoursePreview(false, {}), false);
  assert.equal(localCoursePreview(false, { HEBREWEDU_LOCAL_COURSE_PREVIEW: '1' }), true);
  assert.equal(localCoursePreview(false, { HEBREWEDU_LOCAL_LESSON_POC: '1' }), true);
  assert.deepEqual(courseSitemapEntries(draft()), []);
  assert.deepEqual(courseSitemapEntries().map(x => x.url), ['/learn/hebrew-alphabet/', '/learn/hebrew-alphabet/aleph/']);
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
  value.lessons[1].editorialApproved = true; value.lessons[1].published = true; value.lessons[1].publishedAt = '2026-10-11';
  assert.throws(() => validatePublicationManifest(value), /implementation/);
  value.lessons[1].webImplemented = true;
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
test('three-new-lessons limit is enforced per Monday–Sunday week, including year boundaries', () => {
  assert.doesNotThrow(() => validateWeeklyReleaseLimit(['2026-10-05','2026-10-07','2026-10-11','2026-10-12']));
  assert.throws(() => validateWeeklyReleaseLimit(['2026-10-05','2026-10-06','2026-10-07','2026-10-11']), /Maximum three/);
  assert.throws(() => validateWeeklyReleaseLimit(['2026-12-28','2026-12-29','2026-12-31','2027-01-03']), /Maximum three/);
  assert.throws(() => validateWeeklyReleaseLimit(['2026-02-30']), /real publication date/);
});
