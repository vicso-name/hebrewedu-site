// Letter identity, derived once from the owner-approved 22-letter manifest.
// Nothing here is letter-specific; schema/normalize/route code looks identity up by slug or sourceId.
import manifest from '../../../scripts/alphabet-course/owner-letter-map.v2.json' with { type: 'json' };
import { validateManifest } from '../../../scripts/alphabet-course/validate.mjs';

const SUPPORTED_LOCALES = ['en', 'fr'];

// The API's `?lang=` query param is the only locale signal in the whole pipeline
// (see docs/I18N_AUDIT.md §3) — same source_lesson_id, same JSON shape, confirmed
// for both locales. Everything else about a letter's identity is locale-agnostic.
function toIdentity(item, locale) {
  if (!SUPPORTED_LOCALES.includes(locale)) throw new Error(`Unsupported locale: ${locale}`);
  return {
    slug: item.slug,
    sourceId: item.source_lesson_id,
    order: item.order,
    glyph: item.letter,
    locale,
    sourceUrl: `https://api.hebrewedu.com/api/lessons/${item.source_lesson_id}/?lang=${locale}`,
  };
}

const letters = validateManifest(manifest);
const bySlug = new Map(letters.map(item => [item.slug, item]));
const bySourceId = new Map(letters.map(item => [item.source_lesson_id, item]));

export function identityForSlug(slug, locale = 'en') {
  const item = bySlug.get(slug);
  return item ? toIdentity(item, locale) : null;
}
export function identityForSourceId(sourceId, locale = 'en') {
  const item = bySourceId.get(sourceId);
  return item ? toIdentity(item, locale) : null;
}
export function allIdentities(locale = 'en') {
  return letters.map(item => toIdentity(item, locale));
}
