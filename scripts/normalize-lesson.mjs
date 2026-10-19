// Offline, explicit normalization for any letter. Never fetches content during builds.
// Usage:
//   node scripts/normalize-lesson.mjs <slug>                          write src/content/lessons/<slug>.json
//   node scripts/normalize-lesson.mjs <slug> --dry-run                 report only; never writes
//   node scripts/normalize-lesson.mjs <slug> --raw <path>               use this raw snapshot instead of the pinned one
//   node scripts/normalize-lesson.mjs <slug> --locale fr                normalize the FR snapshot/overrides (default: en)
import { readFile, writeFile, rename, readdir, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { normalizeLesson, findUnsupportedItems, proposeStageMap } from '../src/lib/lessons/normalize.mjs';
import { identityForSlug } from '../src/lib/lessons/identity.mjs';
import { hasLessonOverrides, loadLessonOverrides } from '../src/lib/lessons/editorial.mjs';
import { parseJSONBytes } from './alphabet-course/json.mjs';

const root = new URL('../', import.meta.url);
const [slug, ...rest] = process.argv.slice(2);
const dryRun = rest.includes('--dry-run');
const rawFlagIndex = rest.indexOf('--raw');
const rawPathArg = rawFlagIndex >= 0 ? rest[rawFlagIndex + 1] : null;
const localeFlagIndex = rest.indexOf('--locale');
const locale = localeFlagIndex >= 0 ? rest[localeFlagIndex + 1] : 'en';

if (!slug) throw new Error('Usage: node scripts/normalize-lesson.mjs <slug> [--dry-run] [--raw <path>] [--locale en|fr]');
if (!['en', 'fr'].includes(locale)) throw new Error('Supported --locale values: en, fr');
const identity = identityForSlug(slug, locale);
if (!identity) throw new Error(`Unknown letter slug: ${slug}`);

// FR raw snapshots live under their own `-fr`-suffixed import run directories
// (see scripts/import-alphabet-course.mjs), never mixed with EN runs — this keeps
// a locale's "newest raw snapshot" search from ever picking up the other locale's.
async function newestRawSnapshot(sourceId, forLocale) {
  const importsRoot = resolve(new URL('../.local/alphabet-course-imports/v1/', import.meta.url).pathname);
  const runs = (await readdir(importsRoot, { withFileTypes: true }))
    .filter(e => e.isDirectory())
    .map(e => e.name)
    .filter(name => (forLocale === 'en' ? !name.endsWith('-fr') : name.endsWith('-fr')))
    .sort();
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

// EN content stays at src/content/lessons/<slug>.json (unchanged path, unchanged
// behavior); a non-EN locale gets its own locale-suffixed directory.
const contentDestination = new URL(
  locale === 'en' ? `../src/content/lessons/${slug}.json` : `../src/content/lessons/${locale}/${slug}.json`,
  import.meta.url,
);

if (hasLessonOverrides(slug, locale)) {
  const overrides = loadLessonOverrides(slug, locale);
  const rawPath = rawPathArg ?? resolve(root.pathname, overrides.source.rawSnapshotPath);
  const bytes = await readFile(rawPath);
  const sha256 = createHash('sha256').update(bytes).digest('hex');
  if (!dryRun && sha256 !== overrides.source.sha256) {
    throw new Error(`${slug} (${locale}): source differs from the inspected snapshot (expected ${overrides.source.sha256}, got ${sha256}); review before normalizing.`);
  }
  const raw = parseJSONBytes(bytes);
  const unsupported = findUnsupportedItems(raw, overrides);

  if (dryRun) {
    report(`${slug} (${locale}): unsupported study blocks`, unsupported.blocks.map(item => `#${item.sourceIndex} (${item.type})${item.heldOut ? ` — held out: ${item.reason}` : ' — NOT held out, write mode would fail'}`));
    report(`${slug} (${locale}): unsupported exercises`, unsupported.exercises.map(item => `#${item.sourceIndex} (${item.type})${item.heldOut ? ` — held out: ${item.reason}` : ' — NOT held out, write mode would fail'}`));
    const configured = overrides.stageMap ?? { theory: [], examples: [] };
    report(`${slug} (${locale}): configured stage map`, [`theory: [${configured.theory.join(', ')}]`, `examples: [${configured.examples.join(', ')}]`]);
    process.exit(0);
  }

  const lesson = normalizeLesson(raw, identity, overrides);
  await mkdir(dirname(contentDestination.pathname), { recursive: true });
  const staged = new URL(`${contentDestination.href}.tmp`);
  await writeFile(staged, `${JSON.stringify(lesson, null, 2)}\n`);
  await rename(staged, contentDestination);
  console.log(`Validated ${lesson.blocks.length} study blocks and ${lesson.exercises.length} exercises; raw/media fields excluded.`);
} else {
  if (!dryRun) throw new Error(`${slug} (${locale}): no editorial data file — write mode needs editorial overrides. Run with --dry-run to explore the raw source first.`);
  const rawPath = rawPathArg ?? await newestRawSnapshot(identity.sourceId, locale);
  if (!rawPath) throw new Error(`${slug} (${locale}): no raw snapshot found under .local/alphabet-course-imports/ for source id ${identity.sourceId}; pass --raw <path>.`);
  const bytes = await readFile(rawPath);
  const sha256 = createHash('sha256').update(bytes).digest('hex');
  const raw = parseJSONBytes(bytes);
  const unsupported = findUnsupportedItems(raw, {});
  const proposed = proposeStageMap(raw, {});

  console.log(`${slug} (${locale}): no editorial data file yet; dry run only (nothing written, letter not enabled).`);
  console.log(`  raw snapshot: ${rawPath}`);
  console.log(`  sha256: ${sha256}`);
  console.log(`  study blocks: ${raw.studyMaterials.length}, exercises: ${raw.exercises.length}`);
  report(`${slug} (${locale}): unsupported study blocks (recognized by source contract, no web renderer yet)`, unsupported.blocks.map(item => `#${item.sourceIndex} (${item.type})`));
  report(`${slug} (${locale}): unsupported exercises (recognized by source contract, no web renderer yet)`, unsupported.exercises.map(item => `#${item.sourceIndex} (${item.type})`));
  report(`${slug} (${locale}): proposed stage map (heuristic — needs editorial confirmation)`, [`theory: [${proposed.theory.join(', ')}]`, `examples: [${proposed.examples.join(', ')}]`]);
}
