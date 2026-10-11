// Run after npm run build. Optional pre-release baseline stays private and outside Git.
import assert from 'node:assert/strict';
import { readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { resolve, relative, join } from 'node:path';
import { createHash } from 'node:crypto';
import { courseManifest, courseSitemapEntries, courseTitle, courseDescription } from '../src/lib/alphabet-course.mjs';
import { lessonSchema } from '../src/lib/lessons/schema.mjs';
import { gradeAnswer } from '../src/lib/lessons/grading.mjs';
import { unavailableQuestions } from '../src/lib/lessons/presentation.mjs';

const root = resolve(new URL('..', import.meta.url).pathname);
const dist = resolve(process.env.COURSE_RELEASE_DIST ?? join(root, 'dist'));
const expected = ['https://hebrewedu.com/learn/hebrew-alphabet/', 'https://hebrewedu.com/learn/hebrew-alphabet/aleph/'];
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const htmlSeo = html => [...html.matchAll(/<title\b[^>]*>[\s\S]*?<\/title>|<meta\b[^>]*>|<link\b[^>]*rel="canonical"[^>]*>|<script\b[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g)].map(match => match[0]);
const main = html => html.match(/<main\b[\s\S]*?<\/main>/)?.[0];
async function files(folder) {
  const paths = [];
  for (const entry of await readdir(folder, { withFileTypes: true })) {
    const path = join(folder, entry.name);
    paths.push(...(entry.isDirectory() ? await files(path) : [path]));
  }
  return paths;
}
assert.equal(courseManifest.hub.published && courseManifest.hub.editorialApproved, true);
assert.equal(courseManifest.lessons.filter(item => item.published).length, 1);
assert.ok(courseManifest.lessons.slice(1).every(item => !item.published && !item.editorialApproved && item.publishedAt === null));
assert.deepEqual(courseSitemapEntries().map(item => `https://hebrewedu.com${item.url}`), expected);
const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8');
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
assert.equal(new Set(locations).size, locations.length);
assert.deepEqual(locations.filter(url => url.includes('/learn/hebrew-alphabet/')), expected);
const pages = [];
for (const url of expected) {
  const path = join(dist, new URL(url).pathname, 'index.html');
  const html = await readFile(path, 'utf8');
  assert.ok(html.includes(`<link rel="canonical" href="${url}"`));
  assert.ok(html.includes('<meta name="robots" content="index, follow"'));
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.ok(html.includes('/learn/hebrew-alphabet/'));
  pages.push({ url, html });
}
const hub = pages[0].html;
assert.ok(hub.includes(`<title>${courseTitle}</title>`) && hub.includes(courseDescription));
assert.ok(hub.includes('Learn the Hebrew Alphabet Step by Step'));
assert.equal((hub.match(/data-course-order=/g) ?? []).length, 22);
assert.equal((hub.match(/>Coming Soon</g) ?? []).length, 21);
const lesson = lessonSchema.parse(JSON.parse(await readFile(join(root, 'src/content/lessons/aleph.json'))));
assert.equal(lesson.blocks.length, 11);
assert.equal(lesson.exercises.length, 14);
assert.equal(unavailableQuestions.size, 0);
const keys = JSON.parse(pages[1].html.match(/<script type="application\/json" id="lesson-grading">([\s\S]*?)<\/script>/)[1]);
assert.equal(keys.length, 14);
for (const exercise of lesson.exercises) {
  assert.equal(keys.find(item => item.id === exercise.id).correctOptionId, exercise.correctOptionId);
  assert.equal(gradeAnswer(exercise, exercise.correctOptionId).status, 'correct');
  for (const option of exercise.options.filter(item => item.id !== exercise.correctOptionId)) assert.equal(gradeAnswer(exercise, option.id).status, 'incorrect');
}
const q4 = lesson.exercises.find(item => item.sourceId === '1742106507820');
assert.equal(q4.options.find(item => item.id === q4.correctOptionId).label, 'True');
assert.ok(pages[1].html.includes('max="14"') && pages[1].html.includes('Exploring Aleph'));
const all = await files(dist);
assert.deepEqual(all.filter(path => path.endsWith('.html') && relative(dist, path).startsWith('learn/')).map(path => relative(dist, path)).sort(), ['learn/hebrew-alphabet/aleph/index.html', 'learn/hebrew-alphabet/index.html']);
for (const item of courseManifest.lessons.slice(1)) assert.equal(await stat(join(dist, 'learn/hebrew-alphabet', item.slug)).then(() => true).catch(() => false), false);
for (const path of all) {
  assert.equal(/\.raw\.json|\.local\/|lesson-snapshots|course-import\.snapshot|alphabet-course-imports|editorial-findings/.test(relative(dist, path)), false, path);
  if (/\.(html|js|json|xml|css)$/.test(path)) {
    const content = await readFile(path, 'utf8');
    assert.equal(/"correctAnswer"|"additionalData"|api\.hebrewedu\.com\/api\/lessons\/|firebasestorage\.googleapis\.com|backblazeb2\.com\/file\/alef-bet-media\/lessons\/|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,}/.test(content), false, `Private/raw/unapproved content: ${path}`);
    for (const item of courseManifest.lessons.slice(1)) assert.equal(content.includes(`/learn/hebrew-alphabet/${item.slug}/`), false, `Unpublished link: ${path}`);
  }
}
const license = await readFile(join(root, 'src/assets/fonts/Rubik-OFL.txt'));
assert.ok(license.toString().includes('Copyright 2015 The Rubik Project Authors'));
assert.equal(hash(await readFile(join(dist, 'licenses/Rubik-OFL.txt'))), hash(license));
let compared = 0;
if (process.env.COURSE_BASELINE) {
  const baseline = JSON.parse(await readFile(process.env.COURSE_BASELINE));
  for (const [path, old] of Object.entries(baseline)) {
    const current = await readFile(join(dist, path)).catch(error => {
      if (path.startsWith('_astro/') && error.code === 'ENOENT') return null;
      throw error;
    });
    if (old.html) {
      assert.deepEqual(htmlSeo(current.toString()), htmlSeo(old.html), `Existing SEO changed: ${path}`);
      if (main(old.html)) assert.equal(main(current.toString()), main(old.html), `Existing page content changed: ${path}`);
      else assert.equal(hash(current), old.sha256, `Existing game HTML changed: ${path}`);
    } else if (!path.startsWith('_astro/') && path !== 'sitemap.xml') assert.equal(hash(current), old.sha256, `Existing public asset changed: ${path}`);
    if (!path.startsWith('_astro/')) compared++;
  }
  const allowedNew = path => path.startsWith('_astro/') || path === 'licenses/Rubik-OFL.txt' || path === 'learn/hebrew-alphabet/index.html' || path === 'learn/hebrew-alphabet/aleph/index.html';
  for (const path of all.map(path => relative(dist, path))) if (!(path in baseline)) assert.ok(allowedNew(path), `Unexpected new production artifact: ${path}`);
}
if (process.env.COURSE_BASELINE_SITEMAP) {
  const previous = await readFile(process.env.COURSE_BASELINE_SITEMAP, 'utf8');
  const entries = xml => [...xml.matchAll(/<url>[\s\S]*?<\/url>/g)].map(match => match[0]);
  assert.deepEqual(entries(sitemap).filter(entry => !entry.includes('/learn/hebrew-alphabet/')), entries(previous), 'Unrelated sitemap entries changed');
}
const result = { urls: expected, generatedOtherLessons: 0, blocks: 11, activeExercises: 14, q4: 'True', scoringDenominator: 14, originalArtifactsCompared: compared, rawOrUnapprovedMediaExposed: false, rubikCopyrightAndLicenseRetained: true, htmlFiles: all.filter(path => path.endsWith('.html')).length };
if (process.env.COURSE_RELEASE_REPORT) await writeFile(process.env.COURSE_RELEASE_REPORT, `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify(result, null, 2));
