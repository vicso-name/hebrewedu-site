// Offline, explicit normalization for any letter. Never fetches content during builds.
// Usage:
//   node scripts/normalize-lesson.mjs <slug>              write src/content/lessons/<slug>.json
//   node scripts/normalize-lesson.mjs <slug> --dry-run     report only; never writes
//   node scripts/normalize-lesson.mjs <slug> --raw <path>  use this raw snapshot instead of the pinned one
import { readFile, writeFile, rename, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { normalizeLesson, findUnsupportedItems, proposeStageMap } from '../src/lib/lessons/normalize.mjs';
import { identityForSlug } from '../src/lib/lessons/identity.mjs';
import { hasLessonOverrides, loadLessonOverrides } from '../src/lib/lessons/editorial.mjs';
import { parseJSONBytes } from './alphabet-course/json.mjs';

const root = new URL('../', import.meta.url);
const [slug, ...rest] = process.argv.slice(2);
const dryRun = rest.includes('--dry-run');
const rawFlagIndex = rest.indexOf('--raw');
const rawPathArg = rawFlagIndex >= 0 ? rest[rawFlagIndex + 1] : null;

if (!slug) throw new Error('Usage: node scripts/normalize-lesson.mjs <slug> [--dry-run] [--raw <path>]');
const identity = identityForSlug(slug);
if (!identity) throw new Error(`Unknown letter slug: ${slug}`);

async function newestRawSnapshot(sourceId) {
  const importsRoot = resolve(new URL('../.local/alphabet-course-imports/v1/', import.meta.url).pathname);
  const runs = (await readdir(importsRoot, { withFileTypes: true })).filter(e => e.isDirectory()).map(e => e.name).sort();
  for (const run of runs.reverse()) {
    const candidate = resolve(importsRoot, run, 'raw', `lesson-${sourceId}.raw.json`);
    try { await readFile(candidate); return candidate; } catch { /* try an earlier run */ }
  }
  return null;
}

function report(title, lines) {
  console.log(`\n${title}`);
  for (const line of lines) console.log(`  ${line}`);
  if (!lines.length) console.log('  (none)');
}

if (hasLessonOverrides(slug)) {
  const overrides = loadLessonOverrides(slug);
  const rawPath = rawPathArg ?? resolve(root.pathname, overrides.source.rawSnapshotPath);
  const bytes = await readFile(rawPath);
  const sha256 = createHash('sha256').update(bytes).digest('hex');
  if (!dryRun && sha256 !== overrides.source.sha256) {
    throw new Error(`${slug}: source differs from the inspected snapshot (expected ${overrides.source.sha256}, got ${sha256}); review before normalizing.`);
  }
  const raw = parseJSONBytes(bytes);
  const unsupported = findUnsupportedItems(raw, overrides);

  if (dryRun) {
    report(`${slug}: unsupported study blocks`, unsupported.blocks.map(item => `#${item.sourceIndex} (${item.type})${item.heldOut ? ` — held out: ${item.reason}` : ' — NOT held out, write mode would fail'}`));
    report(`${slug}: unsupported exercises`, unsupported.exercises.map(item => `#${item.sourceIndex} (${item.type})${item.heldOut ? ` — held out: ${item.reason}` : ' — NOT held out, write mode would fail'}`));
    const configured = overrides.stageMap ?? { theory: [], examples: [] };
    report(`${slug}: configured stage map`, [`theory: [${configured.theory.join(', ')}]`, `examples: [${configured.examples.join(', ')}]`]);
    process.exit(0);
  }

  const lesson = normalizeLesson(raw, identity, overrides);
  const destination = new URL(`../src/content/lessons/${slug}.json`, import.meta.url);
  const staged = new URL(`${destination.href}.tmp`);
  await writeFile(staged, `${JSON.stringify(lesson, null, 2)}\n`);
  await rename(staged, destination);
  console.log(`Validated ${lesson.blocks.length} study blocks and ${lesson.exercises.length} exercises; raw/media fields excluded.`);
} else {
  if (!dryRun) throw new Error(`${slug}: no editorial data file at src/data/lessons/${slug}.json — write mode needs editorial overrides. Run with --dry-run to explore the raw source first.`);
  const rawPath = rawPathArg ?? await newestRawSnapshot(identity.sourceId);
  if (!rawPath) throw new Error(`${slug}: no raw snapshot found under .local/alphabet-course-imports/ for source id ${identity.sourceId}; pass --raw <path>.`);
  const bytes = await readFile(rawPath);
  const sha256 = createHash('sha256').update(bytes).digest('hex');
  const raw = parseJSONBytes(bytes);
  const unsupported = findUnsupportedItems(raw, {});
  const proposed = proposeStageMap(raw, {});

  console.log(`${slug}: no editorial data file yet; dry run only (nothing written, letter not enabled).`);
  console.log(`  raw snapshot: ${rawPath}`);
  console.log(`  sha256: ${sha256}`);
  console.log(`  study blocks: ${raw.studyMaterials.length}, exercises: ${raw.exercises.length}`);
  report(`${slug}: unsupported study blocks (recognized by source contract, no web renderer yet)`, unsupported.blocks.map(item => `#${item.sourceIndex} (${item.type})`));
  report(`${slug}: unsupported exercises (recognized by source contract, no web renderer yet)`, unsupported.exercises.map(item => `#${item.sourceIndex} (${item.type})`));
  report(`${slug}: proposed stage map (heuristic — needs editorial confirmation)`, [`theory: [${proposed.theory.join(', ')}]`, `examples: [${proposed.examples.join(', ')}]`]);
}
