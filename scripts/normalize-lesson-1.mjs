// Offline, explicit normalization. Never fetches content during builds.
import { readFile, writeFile, rename } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { normalizeLesson } from '../src/lib/lessons/normalize.mjs';
import { parseJSONBytes } from './alphabet-course/json.mjs';
const rawUrl = new URL('../.local/lesson-snapshots/lesson-1.20261011T193043064573Z.raw.json', import.meta.url);
const destination = new URL('../src/content/lessons/aleph.json', import.meta.url);
const bytes = await readFile(rawUrl);
const sha256 = createHash('sha256').update(bytes).digest('hex');
// Changing the snapshot requires a deliberate provenance/editorial update.
if (sha256 !== '97351799e0a4bc45718cf082486c6584b7acb55bc412aeaea43b81e3cab7bb6a') {
  throw new Error('Lesson 1 source differs from the inspected snapshot; review before normalizing.');
}
const lesson = normalizeLesson(parseJSONBytes(bytes), {
  source: 'https://api.hebrewedu.com/api/lessons/1/?lang=en',
  responseDate: '2026-10-11T19:30:43.064573Z', sha256,
});
const staged = new URL(`${destination.href}.tmp`);
await writeFile(staged, `${JSON.stringify(lesson, null, 2)}\n`);
await rename(staged, destination);
console.log(`Validated ${lesson.blocks.length} study blocks and ${lesson.exercises.length} exercises; raw/media fields excluded.`);
