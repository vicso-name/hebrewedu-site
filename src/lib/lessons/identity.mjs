// Letter identity, derived once from the owner-approved 22-letter manifest.
// Nothing here is letter-specific; schema/normalize/route code looks identity up by slug or sourceId.
import manifest from '../../../scripts/alphabet-course/owner-letter-map.v2.json' with { type: 'json' };
import { validateManifest } from '../../../scripts/alphabet-course/validate.mjs';

function toIdentity(item) {
  return {
    slug: item.slug,
    sourceId: item.source_lesson_id,
    order: item.order,
    glyph: item.letter,
    sourceUrl: `https://api.hebrewedu.com/api/lessons/${item.source_lesson_id}/?lang=en`,
  };
}

const letters = validateManifest(manifest).map(toIdentity);
const bySlug = new Map(letters.map(item => [item.slug, item]));
const bySourceId = new Map(letters.map(item => [item.sourceId, item]));

export function identityForSlug(slug) {
  return bySlug.get(slug) ?? null;
}
export function identityForSourceId(sourceId) {
  return bySourceId.get(sourceId) ?? null;
}
export function allIdentities() {
  return letters;
}
