// Explicit import only. Astro/build scripts never call this module.
import { readFile, writeFile, mkdir, rename, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { resolve, join } from 'node:path';
import { auditLesson, validateList, validateManifest, privateNormalizedLesson, normalizeSourceText, validateReviewSnapshot, schemaVersion } from './alphabet-course/validate.mjs';
import { parseJSONBytes } from './alphabet-course/json.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const imports = join(root, '.local/alphabet-course-imports/v1');
const manifestPath = new URL('./alphabet-course/owner-letter-map.v2.json', import.meta.url);
const manifestBytes = await readFile(manifestPath);
const manifest = JSON.parse(manifestBytes);
const identities = validateManifest(manifest);
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const api = 'https://api.hebrewedu.com/api/lessons/';
const alephHash = '0306e249dc168efd7d49e886553f7aa61733cb6ca26307c7cc0a07215b5999a7';
const args = process.argv.slice(2);
const langFlagIndex = args.indexOf('--lang');
const lang = langFlagIndex >= 0 ? args[langFlagIndex + 1] : 'en';
if (!['en', 'fr'].includes(lang)) throw new Error('Supported --lang values: en, fr');
const rest = langFlagIndex >= 0 ? [...args.slice(0, langFlagIndex), ...args.slice(langFlagIndex + 2)] : args;
const mode = rest[0];
if (!['--fetch','--audit'].includes(mode) || (mode === '--fetch' && rest.length !== 1) || (mode === '--audit' && rest.length !== 2)) throw new Error('Usage: node scripts/import-alphabet-course.mjs --fetch | --audit <run-name> [--lang en|fr]');
process.umask(0o077);
await mkdir(imports, { recursive: true, mode: 0o700 });
async function save(path, bytes) { await writeFile(`${path}.tmp`, bytes, { mode: 0o600 }); await rename(`${path}.tmp`, path); }
async function json(path, value) { await save(path, `${JSON.stringify(value, null, 2)}\n`); }
const parse = parseJSONBytes;
// EN keeps detail ids 2–22 only (id 1/Aleph is the separately pinned, reused
// snapshot below, never refetched). FR has no pinned snapshot to reuse, so all
// 22 ids are fetched fresh — see docs/I18N_AUDIT.md §3 (API confirmed to serve
// the same ids/shape under ?lang=fr).
const detailIdPattern = lang === 'en' ? '(?:[2-9]|1[0-9]|2[0-2])' : '(?:[1-9]|1[0-9]|2[0-2])';
const detailAllowlist = new RegExp(`^https:\\/\\/api\\.hebrewedu\\.com\\/api\\/lessons\\/${detailIdPattern}\\/\\?lang=${lang}$`);
async function get(url, destination) {
  if (!(url === `${api}?category=alphabet-lc&lang=${lang}` || detailAllowlist.test(url))) throw new Error('Request outside read-only alphabet allowlist');
  const startedAt = new Date().toISOString();
  const response = await fetch(url, { method: 'GET', credentials: 'omit', redirect: 'error', signal: AbortSignal.timeout(20_000), headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`Anonymous GET failed: ${response.status} ${url}; stop without credentials or retries`);
  if (!/\bapplication\/json\b/i.test(response.headers.get('content-type') ?? '')) throw new Error(`Unexpected content type at ${url}`);
  const chunks = []; let size = 0;
  for await (const chunk of response.body) {
    size += chunk.length;
    if (size > 2_000_000) { await response.body.cancel().catch(() => {}); throw new Error(`Response exceeds 2 MB at ${url}`); }
    chunks.push(chunk);
  }
  const bytes = Buffer.concat(chunks);
  await save(destination, bytes); // Keep exact response bytes; parse/validate separately.
  const metadata = { url, method: 'GET', anonymous: true, retrievedAt: startedAt, completedAt: new Date().toISOString(), status: response.status, contentType: response.headers.get('content-type'), link: response.headers.get('link'), etag: response.headers.get('etag'), lastModified: response.headers.get('last-modified'), sha256: digest(bytes), bytes: bytes.length };
  await json(`${destination}.provenance.json`, metadata);
  return { value: parse(bytes), metadata };
}

let run;
if (mode === '--fetch') {
  // FR (and any future non-EN locale) gets its own `-fr`-suffixed run directory —
  // never the EN-shaped name — so newestRawSnapshot()-style lookups and manual
  // inspection can never mistake one locale's raw snapshots for the other's.
  const name = new Date().toISOString().replace(/[:.]/g, '-') + '-' + Math.random().toString(16).slice(2, 8) + (lang === 'en' ? '' : `-${lang}`);
  run = join(imports, name);
  await mkdir(join(run, 'raw'), { recursive: true, mode: 0o700 });
  await save(join(run, 'owner-letter-map.v2.json'), manifestBytes);
  const state = { schemaVersion, status: 'fetching', runName: name, lang, manifestSha256: digest(manifestBytes), listGets: 0, detailGets: [], reusedIds: [], startedAt: new Date().toISOString(), productionPublicationAuthorized: false };
  await json(join(run, 'import-state.json'), state);
  try {
    state.listGets++;
    const { value: list, metadata } = await get(`${api}?category=alphabet-lc&lang=${lang}`, join(run, 'raw/list.raw.json'));
    if (metadata.link) throw new Error('Pagination Link header exposed; importer must be reviewed before following it');
    const sorted = validateList(list, manifest);
    console.log(`List inspected: unpaginated array, ${sorted.length} unique IDs/orders, ${sorted.reduce((n,x) => n+x.studyMaterialsCount,0)} study blocks / ${sorted.reduce((n,x) => n+x.exercisesCount,0)} exercises reported.`);
    // Only the EN import reuses the separately pinned, owner-approved Aleph snapshot;
    // every other locale has no such pin and fetches id 1 like any other detail.
    let pending = sorted;
    if (lang === 'en') {
      const bytes = await readFile(join(root, '.local/lesson-snapshots/lesson-1.raw.json'));
      if (digest(bytes) !== alephHash) throw new Error('Approved Aleph snapshot changed; stop without replacing or refetching it');
      parse(bytes);
      await save(join(run, 'raw/lesson-1.raw.json'), bytes);
      await json(join(run, 'raw/lesson-1.raw.json.provenance.json'), { url: `${api}1/?lang=en`, method: 'GET', anonymous: true, retrievedAt: '2026-10-11T05:02:58Z', reusedAt: new Date().toISOString(), reusedFrom: '.local/lesson-snapshots/lesson-1.raw.json', sha256: alephHash, bytes: bytes.length, freshness: 'existing-approved-snapshot' });
      state.reusedIds.push(1);
      pending = sorted.filter(item => item.id !== 1);
    }
    for (const item of pending) {
      state.detailGets.push(item.id);
      await json(join(run, 'import-state.json'), state);
      const { value } = await get(`${api}${item.id}/?lang=${lang}`, join(run, `raw/lesson-${item.id}.raw.json`));
      if (value?.id !== item.id) throw new Error(`Detail identity mismatch at ${item.id}; raw retained, stop`);
      console.log(`Saved anonymous detail ${item.id}/22 (${identities[item.id - 1].slug}); not published.`);
    }
    state.status = 'complete-raw-import'; state.completedAt = new Date().toISOString();
    await json(join(run, 'import-state.json'), state);
  } catch (error) {
    state.status = 'failed-partial-import'; state.failure = error.message;
    await json(join(run, 'import-state.json'), state);
    console.error(`Partial snapshots retained at ${run}; no validated snapshot promoted.`);
    throw error;
  }
} else {
  const name = rest[1];
  if (!/^[a-zA-Z0-9-]+$/.test(name)) throw new Error('Audit accepts only a run name under .local/alphabet-course-imports/v1');
  run = resolve(imports, name);
  if (!(await stat(run)).isDirectory()) throw new Error('Run directory missing');
}

const state = parse(await readFile(join(run, 'import-state.json')));
const findingsBytes = await readFile(new URL('./alphabet-course/editorial-findings.v1.json', import.meta.url));
const findings = parse(findingsBytes);
if (state.status !== 'complete-raw-import') throw new Error('Complete list and 22 snapshots required before audit');
if (state.manifestSha256 !== digest(manifestBytes) || digest(await readFile(join(run, 'owner-letter-map.v2.json'))) !== digest(manifestBytes)) throw new Error('Run manifest changed; audit cannot silently remap identities');
const listBytes = await readFile(join(run, 'raw/list.raw.json'));
const listMetadata = parse(await readFile(join(run, 'raw/list.raw.json.provenance.json')));
if (digest(listBytes) !== listMetadata.sha256) throw new Error('Raw list checksum mismatch');
const list = validateList(parse(listBytes), manifest);
const audits = [], lessons = [], reviewRecords = [];
for (const identity of identities) {
  const bytes = await readFile(join(run, `raw/lesson-${identity.source_lesson_id}.raw.json`));
  const source = parse(await readFile(join(run, `raw/lesson-${identity.source_lesson_id}.raw.json.provenance.json`)));
  if (digest(bytes) !== source.sha256) throw new Error(`Raw detail checksum mismatch: ${identity.source_lesson_id}`);
  const raw = parse(bytes);
  const audit = auditLesson(raw, list.find(item => item.id === identity.source_lesson_id), identity);
  audit.manualFindings = findings.findings.filter(item => item.lessonId === identity.source_lesson_id && item.sourceSha256 === source.sha256);
  audit.manualReviewMatchesSnapshot = audit.manualFindings.length > 0;
  audits.push(audit);
  reviewRecords.push({ identity, provenance: source, publicationStatus: 'unpublished-import', structurallyValid: audit.structurallyValid, blockingIssues: audit.issues.filter(item => item.severity === 'error'), sourceNormalized: normalizeSourceText(raw), normalizationCandidate: audit.structurallyValid ? privateNormalizedLesson(raw, identity, source) : null });
  // No partial content snapshot: malformed lessons remain in raw and audit; all 22 must pass.
  if (audit.structurallyValid) lessons.push(privateNormalizedLesson(raw, identity, source));
}
const validationBytes = await readFile(new URL('./alphabet-course/validate.mjs', import.meta.url));
const importerBytes = await readFile(new URL(import.meta.url));
const parserBytes = await readFile(new URL('./alphabet-course/json.mjs', import.meta.url));
const auditVersion = `audit-v${schemaVersion}-${digest(Buffer.concat([validationBytes, importerBytes, parserBytes, findingsBytes])).slice(0, 12)}`;
const destination = join(run, auditVersion);
await mkdir(destination, { recursive: true, mode: 0o700 });
const mergeTypes = key => audits.reduce((out, audit) => { for (const [type,count] of Object.entries(audit[key])) out[type] = (out[type] ?? 0) + count; return out; }, {});
const report = {
  schemaVersion, validatorSha256: digest(validationBytes), parserSha256: digest(parserBytes), importerSha256: digest(importerBytes), editorialFindingsSha256: digest(findingsBytes), manifestSha256: digest(manifestBytes), runName: state.runName,
  mixedAgeSources: true, lesson1Reused: true, anonymousListGets: state.listGets, anonymousDetailGets: state.detailGets.length,
  uniqueIds: new Set(audits.map(item => item.id)).size, uniqueOrders: new Set(audits.map(item => item.identity.order)).size,
  studyCount: audits.reduce((n,item) => n+item.studyCount,0), exerciseCount: audits.reduce((n,item) => n+item.exerciseCount,0),
  studyTypes: mergeTypes('studyTypes'), exerciseTypes: mergeTypes('exerciseTypes'),
  structuralErrors: audits.reduce((n,item) => n+item.issues.filter(issue => issue.severity === 'error').length,0),
  editorialFlags: audits.reduce((n,item) => n+item.issues.filter(issue => issue.severity === 'review').length,0),
  manualFindings: audits.reduce((n,item) => n+item.manualFindings.length,0),
  allStructurallyValid: audits.every(item => item.structurallyValid), publicApproval: false, lessons: audits,
};
await json(join(destination, 'validation.json'), report);
// The versioned review envelope retains ALL 22 lessons, including malformed source blocks.
// Its content-validity flag must be checked; it is never an approved Astro content collection.
await json(join(destination, 'course-import.snapshot.v1.json'), validateReviewSnapshot({
  schemaVersion, normalizationVersion: 1, snapshotEnvelopeValidated: true,
  allLessonContentValid: report.allStructurallyValid, contentStatus: 'private-source-review-not-publication-ready',
  runName: state.runName, validatorSha256: report.validatorSha256, manifestSha256: report.manifestSha256,
  mixedAgeSources: true, publishedLessonIds: [], courseHubImplemented: false, lessons: reviewRecords,
}, manifest));
if (report.allStructurallyValid) await json(join(destination, 'course-content.snapshot.v1.json'), {
  schemaVersion, normalizationVersion: 1, contentStatus: 'validated-source-not-approved-for-publication', runName: state.runName,
  validatorSha256: report.validatorSha256, manifestSha256: report.manifestSha256, mixedAgeSources: true,
  publishedLessonIds: [], courseHubImplemented: false, lessons,
});
await json(join(run, 'audit-result.json'), { auditVersion, allStructurallyValid: report.allStructurallyValid, reviewSnapshot: `${auditVersion}/course-import.snapshot.v1.json`, validatedSnapshot: report.allStructurallyValid ? `${auditVersion}/course-content.snapshot.v1.json` : null });
console.log(JSON.stringify({ run, auditVersion, lessons: audits.length, studyCount: report.studyCount, exerciseCount: report.exerciseCount, studyTypes: report.studyTypes, exerciseTypes: report.exerciseTypes, structuralErrors: report.structuralErrors, editorialFlags: report.editorialFlags, validatedSnapshotWritten: report.allStructurallyValid }, null, 2));
if (!report.allStructurallyValid) process.exitCode = 2;
