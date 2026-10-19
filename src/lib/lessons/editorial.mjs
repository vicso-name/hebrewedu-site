// Per-letter editorial overrides (title/description override, editorial issues,
// illustrations, block/exercise flags, the theory/examples stage map, holdouts for
// unsupported source content, and the pinned raw snapshot + SHA-256). One JSON file
// per enabled (or in-progress) letter in src/data/lessons/<slug>.json.
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

// Resolved from the project root, not import.meta.url: this module is reached from
// an Astro page component, so a production build can bundle it into a chunk whose
// own URL no longer sits next to src/data/lessons/.
// EN stays at src/data/lessons/<slug>.json (unchanged path, unchanged behavior); a
// non-EN locale gets its own editorial data file, derived from that locale's own raw
// snapshot indices, never copied from EN — see docs/LESSON_PIPELINE.md.
function overridesPath(slug, locale = 'en') {
  const dir = locale === 'en' ? 'src/data/lessons' : `src/data/lessons/${locale}`;
  return resolve(process.cwd(), dir, `${slug}.json`);
}
export function hasLessonOverrides(slug, locale = 'en') {
  return existsSync(overridesPath(slug, locale));
}
export function loadLessonOverrides(slug, locale = 'en') {
  const path = overridesPath(slug, locale);
  if (!existsSync(path)) throw new Error(`No editorial data file for "${slug}" (locale=${locale}) at ${path}`);
  return JSON.parse(readFileSync(path, 'utf8'));
}
