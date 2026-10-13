import { readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, relative } from 'node:path';
import assert from 'node:assert/strict';
const root = resolve(new URL('..', import.meta.url).pathname);
const normalDir = resolve(root, 'dist');
const localDir = process.env.LESSON_POC_DIST ?? '/private/tmp/hebrewedu-lesson-1-poc-dist';
const baselineFile = process.env.LESSON_POC_BASELINE ?? resolve(root, '.local/lesson-1-production-baseline.json');
const route = 'learn/hebrew-alphabet/aleph/index.html';
const hubRoute = 'learn/hebrew-alphabet/index.html';
async function files(dir) {
  const result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = resolve(dir, entry.name);
    if (entry.isDirectory()) result.push(...await files(path));
    else result.push(path);
  }
  return result;
}
const baseline = JSON.parse(await readFile(baselineFile));
const current = {};
for (const path of await files(normalDir)) current[relative(normalDir, path)] = createHash('sha256').update(await readFile(path)).digest('hex');
// Lesson JS/CSS hashes change when approved practice behavior changes.
// Existing page HTML and public assets must remain identical to the supplied baseline.
const changed = Object.keys(baseline).filter(path => !path.startsWith('_astro/') && baseline[path] !== current[path]);
assert.deepEqual(changed, [], 'Existing production artifacts changed or disappeared');
assert.equal(await stat(resolve(normalDir, route)).then(() => true).catch(() => false), false, 'POC must be excluded from normal production build');
for (const dir of [normalDir, localDir]) {
  for (const path of await files(dir)) {
    assert.equal(/lesson-1\.raw|\.local\/|lesson-snapshots/.test(relative(dir, path)), false, `Private snapshot file deployed: ${path}`);
    if (/\.(html|js|json|xml|css)$/.test(path)) {
      const content = await readFile(path, 'utf8');
      assert.equal(/api\.hebrewedu\.com\/api\/lessons\/1\/|lessons\/lesson_one\/(?:alef_patah|kamatz_gadol|hataf_patah)\.png|"additionalData"|"correctAnswer"/.test(content), false, `Raw lesson fields or media URL deployed: ${path}`);
    }
  }
  const sitemap = await readFile(resolve(dir, 'sitemap.xml'), 'utf8');
  assert.equal(sitemap.includes('/learn/'), false);
}
const html = await readFile(resolve(localDir, route), 'utf8');
assert.ok(html.includes('noindex, nofollow, noarchive'));
assert.equal((html.match(/data-study-type=/g) ?? []).length, 11);
assert.equal((html.match(/data-exercise-id=/g) ?? []).length, 14);
assert.equal((html.match(/data-unavailable="true"/g) ?? []).length, 0);
for (const passage of ['sofa', 'long [a:]', 'completely silent', 'depends entirely', 'placed to the left', 'Content review ·']) {
  assert.equal(html.includes(passage), false, `Withheld learner copy exposed: ${passage}`);
}
assert.ok(html.includes('How vowel marks work') && html.includes('Kamatz Gadol') && html.includes('Hataf Patah'), 'Theory and examples must be in initial static HTML');
for (const dir of [normalDir, localDir]) {
  const paths = await files(dir);
  for (const path of paths.filter(p => p.endsWith('.html') && relative(dir, p) !== route && !(dir === localDir && relative(dir, p) === hubRoute))) {
    assert.equal((await readFile(path, 'utf8')).includes('/learn/hebrew-alphabet/aleph/'), false, `Incoming public link introduced: ${path}`);
  }
}
const result = { originalPageAndPublicArtifactsUnchanged: Object.keys(baseline).filter(path => !path.startsWith('_astro/')).length, changed: [], normalBuildHtmlFiles: Object.keys(current).filter(p => p.endsWith('.html')).length, additionalNormalAssets: Object.keys(current).filter(path => !(path in baseline)), localBuildLesson: '11 blocks / 14 active exercises; noindex', rawOrUnapprovedMediaExposed: false, publicLinksOrSitemapEntriesAdded: false };
await writeFile(process.env.LESSON_POC_ARTIFACT_FILE ?? resolve(root, 'artifacts/lesson-1-poc/build-validation.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify(result, null, 2));
