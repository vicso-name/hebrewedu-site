// Offline recovery only: never fetch, alter source bytes, or promote lesson content.
import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import assert from 'node:assert/strict';
import { parseJSONBytes } from './json.mjs';
import { validateManifest, validateList, auditLesson, validateReviewSnapshot, normalizeSourceText, privateNormalizedLesson } from './validate.mjs';

const name = process.argv[2];
assert.equal(process.argv.length, 3, 'Usage: node scripts/alphabet-course/recover.mjs <run-name>');
assert.match(name ?? '', /^[a-zA-Z0-9-]+$/);
const root = fileURLToPath(new URL('../..', import.meta.url));
const run = join(root, '.local/alphabet-course-imports/v1', name);
const bytes = path => readFile(path);
const json = async path => parseJSONBytes(await bytes(path));
const hash = data => createHash('sha256').update(data).digest('hex');
const state = await json(join(run, 'import-state.json'));
assert.equal(state.status, 'complete-raw-import');
assert.equal(state.listGets, 1);
assert.deepEqual(state.detailGets, Array.from({ length: 21 }, (_, i) => i + 2));
assert.deepEqual(state.reusedIds, [1]);
const manifestBytes = await bytes(join(run, 'owner-letter-map.v2.json'));
const manifest = parseJSONBytes(manifestBytes);
const identities = validateManifest(manifest);
assert.equal(hash(manifestBytes), state.manifestSha256);
assert.equal(hash(await bytes(new URL('./owner-letter-map.v2.json', import.meta.url))), state.manifestSha256);
const pointer = await json(join(run, 'audit-result.json'));
assert.match(pointer.auditVersion, /^audit-v\d+-[a-f0-9]{12}$/);
assert.equal(pointer.reviewSnapshot, `${pointer.auditVersion}/course-import.snapshot.v1.json`);
const auditDir = join(run, pointer.auditVersion);
const report = await json(join(auditDir, 'validation.json'));
for (const [key, path] of Object.entries({ validatorSha256: './validate.mjs', parserSha256: './json.mjs', importerSha256: '../import-alphabet-course.mjs', editorialFindingsSha256: './editorial-findings.v1.json', manifestSha256: './owner-letter-map.v2.json' })) {
  assert.equal(hash(await bytes(new URL(path, import.meta.url))), report[key], `Audit code/provenance changed: ${key}`);
}
const snapshotBytes = await bytes(join(run, pointer.reviewSnapshot));
const snapshot = validateReviewSnapshot(parseJSONBytes(snapshotBytes), manifest);
const rawChecksums = [];
async function raw(file) {
  const path = join(run, 'raw', file);
  const data = await bytes(path);
  const provenance = await json(`${path}.provenance.json`);
  assert.equal(hash(data), provenance.sha256, `Checksum mismatch: ${file}`);
  assert.equal(data.length, provenance.bytes);
  rawChecksums.push({ file, bytes: data.length, sha256: hash(data), matchesProvenance: true });
  return { data: parseJSONBytes(data), provenance };
}
const list = validateList((await raw('list.raw.json')).data, manifest);
const inventory = [], emptyPlaceholders = [], imageCaptionBlocks = [], cyrillicFields = [], media = [], manualFindings = [];
for (const identity of identities) {
  const id = identity.source_lesson_id;
  const { data, provenance } = await raw(`lesson-${id}.raw.json`);
  const current = auditLesson(data, list.find(item => item.id === id), identity);
  const saved = report.lessons.find(item => item.id === id);
  assert.ok(saved);
  for (const key of Object.keys(current)) assert.deepEqual(current[key], saved[key], `Saved validation mismatch: lesson ${id} ${key}`);
  const record = snapshot.lessons.find(item => item.identity.source_lesson_id === id);
  assert.deepEqual(record.sourceNormalized, normalizeSourceText(data), `Review snapshot lost source data: ${id}`);
  assert.deepEqual(record.provenance, provenance);
  assert.deepEqual(record.normalizationCandidate, current.structurallyValid ? privateNormalizedLesson(data, identity, provenance) : null);
  const refs = saved.issues.map(issue => {
    const match = issue.path.match(/\$\.(studyMaterials|exercises)\[(\d+)\]/);
    const index = match ? Number(match[2]) : null;
    return { lessonId: id, slug: identity.slug, sourceExerciseId: match?.[1] === 'exercises' ? data.exercises[index].id : null, position: match ? `${match[1] === 'exercises' ? 'Q' : 'B'}${index + 1}` : null, ...issue };
  });
  emptyPlaceholders.push(...refs.filter(issue => issue.code === 'EMPTY_REQUIRED_TEXT'));
  imageCaptionBlocks.push(...refs.filter(issue => issue.code === 'EMPTY_IMAGE_BODY_WITH_CAPTION'));
  cyrillicFields.push(...refs.filter(issue => issue.code === 'NON_ENGLISH_SCRIPT'));
  media.push(...saved.media.map(item => ({ lessonId: id, ...item })));
  manualFindings.push(...saved.manualFindings.map(item => ({ ...item, evidence: item.evidence.map(e => ({ ...e, sourceExerciseId: e.position.startsWith('Q') ? data.exercises[Number(e.position.slice(1)) - 1].id : null })) })));
  inventory.push({ id, order: identity.order, letter: identity.letter, slug: identity.slug, title: data.title, studyCount: current.studyCount, exerciseCount: current.exerciseCount, countsMatchList: true, structurallyValid: current.structurallyValid, readiness: [current.rendererCompatible ? 'Technically compatible' : 'Requires renderer development', 'Requires editorial review', ...(!current.structurallyValid ? ['Blocked by malformed source data'] : [])] });
}
assert.equal(inventory.length, 22);
assert.equal(inventory.filter(x => x.structurallyValid).length, 16);
assert.equal(emptyPlaceholders.length, 11);
assert.equal(imageCaptionBlocks.length, 9);
assert.equal(cyrillicFields.length, 30);
assert.equal(inventory.reduce((n,x) => n + x.studyCount, 0), report.studyCount);
assert.equal(inventory.reduce((n,x) => n + x.exerciseCount, 0), report.exerciseCount);
assert.equal(snapshot.allLessonContentValid, report.allStructurallyValid);
assert.equal(pointer.validatedSnapshot, null);
assert.equal((await readdir(auditDir)).includes('course-content.snapshot.v1.json'), false);
async function temporaryFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await temporaryFiles(path));
    else if (entry.name.endsWith('.tmp')) out.push(path);
  }
  return out;
}
assert.deepEqual(await temporaryFiles(run), []);
process.umask(0o077);
const checkedAt = new Date().toISOString();
const destination = join(run, `recovery-${checkedAt.replace(/[:.]/g, '-')}`);
await mkdir(destination, { mode: 0o700 });
const result = { checkedAt, runName: name, auditVersion: pointer.auditVersion, additionalApiRequests: 0, sourceFilesModified: false, rawFilesVerified: rawChecksums.length, rawChecksums, reviewSnapshotSha256: hash(snapshotBytes), snapshotEnvelopeValidated: true, allLessonContentValid: false, normalizationCandidates: 16, temporaryFiles: [], structuralErrors: report.structuralErrors, automaticReviewFlags: report.editorialFlags, studyCount: report.studyCount, exerciseCount: report.exerciseCount, studyTypes: report.studyTypes, exerciseTypes: report.exerciseTypes, inventory, emptyPlaceholders, imageCaptionBlocks, cyrillicFields, media, manualFindings };
await writeFile(join(destination, 'recovery-validation.json'), `${JSON.stringify(result, null, 2)}\n`, { flag: 'wx', mode: 0o600 });
console.log(JSON.stringify({ recoveryReport: join(destination, 'recovery-validation.json'), verifiedRawFiles: rawChecksums.length, preservedLessons: inventory.length, structurallyValid: 16, emptyPlaceholders: 11, meaningfulImageCaptionBlocks: 9, cyrillicFields: 30, additionalApiRequests: 0 }, null, 2));
