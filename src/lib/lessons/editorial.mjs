// Per-letter editorial overrides (title/description override, editorial issues,
// illustrations, block/exercise flags, the theory/examples stage map, holdouts for
// unsupported source content, and the pinned raw snapshot + SHA-256). One JSON file
// per enabled (or in-progress) letter in src/data/lessons/<slug>.json.
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

// Resolved from the project root, not import.meta.url: this module is reached from
// an Astro page component, so a production build can bundle it into a chunk whose
// own URL no longer sits next to src/data/lessons/.
function overridesPath(slug) {
  return resolve(process.cwd(), 'src/data/lessons', `${slug}.json`);
}
export function hasLessonOverrides(slug) {
  return existsSync(overridesPath(slug));
}
export function loadLessonOverrides(slug) {
  const path = overridesPath(slug);
  if (!existsSync(path)) throw new Error(`No editorial data file for "${slug}" at src/data/lessons/${slug}.json`);
  return JSON.parse(readFileSync(path, 'utf8'));
}
