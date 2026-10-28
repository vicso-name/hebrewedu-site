import { z } from 'astro/zod';
import { pocStudyTypes, pocExerciseTypes, studyTypes, exerciseTypes } from '../../../scripts/alphabet-course/validate.mjs';
import { identityForSlug, identityForSourceId } from './identity.mjs';

const text = z.string().min(1);
const nfcText = text.refine(value => value === value.normalize('NFC'), 'Text must be NFC normalized');

// Types the renderers (StudyBlock.astro / Practice.astro) can actually present.
export const renderedBlockTypes = pocStudyTypes;
export const renderedExerciseTypes = pocExerciseTypes;
// Types the source contract recognizes at all (superset of rendered types).
// Anything recognized-but-not-rendered must be explicitly held out with a reason
// in that letter's data file (src/data/lessons/<slug>.json) — see normalize.mjs.
export const recognizedBlockTypes = studyTypes;
export const recognizedExerciseTypes = exerciseTypes;

const strictRenderedBlock = type => z.object({
  type: z.literal(type),
  ...(type === 'MAIN_TITLE' ? { title: text } : {}),
  ...(['SIMPLE_TEXT', 'BOLD_TEXT', 'SUBTITLE'].includes(type) ? { content: text } : {}),
  // A TEXT_IMAGE may arrive with an empty body and only a caption (the audit's
  // EMPTY_IMAGE_BODY_WITH_CAPTION, e.g. Mem/Nun Sofit). The raw shape accepts it;
  // the normalized block's non-empty `text` still fails closed unless the letter's
  // data file supplies contentOverrides.blocks text or holds the block out.
  ...(type === 'TEXT_IMAGE' ? { content: z.string() } : {}),
  ...(type === 'TEXT_IMAGE' ? { description: z.string(), imageUrl: z.string().url() } : {}),
  ...(type === 'WORD_EXAMPLE' ? { word: text, transcription: text, translation: text, audioUrl: z.string().url() } : {}),
}).strict();
// Recognized-but-unrendered types are never read beyond their `type` discriminator
// (they are only ever held out, not normalized), so their field shape is passthrough.
const passthroughRecognizedBlock = type => z.object({ type: z.literal(type) }).passthrough();
const rawBlock = z.discriminatedUnion('type', [
  ...renderedBlockTypes.map(strictRenderedBlock),
  ...recognizedBlockTypes.filter(type => !renderedBlockTypes.includes(type)).map(passthroughRecognizedBlock),
]);

const strictRenderedExercise = type => z.object({
  id: text, type: z.literal(type), content: text, tip: text, score: z.number(),
  additionalData: type === 'TRUE_FALSE'
    ? z.object({ correctAnswer: z.enum(['true', 'false']) }).strict()
    : type === 'MATCH_PAIRS'
    ? z.object({ pairs: z.record(text, text).refine(pairs => Object.keys(pairs).length >= 2, 'At least two pairs are required') }).strict()
    : z.object({ choices: z.array(text).length(type === 'MULTIPLE_CHOICE_COLUMN' ? 3 : 4), correctAnswer: text }).strict(),
}).strict();
const passthroughRecognizedExercise = type => z.object({ id: text, type: z.literal(type) }).passthrough();
const rawExercise = z.discriminatedUnion('type', [
  ...renderedExerciseTypes.map(strictRenderedExercise),
  ...recognizedExerciseTypes.filter(type => !renderedExerciseTypes.includes(type)).map(passthroughRecognizedExercise),
]);

// No fixed block/exercise counts: a letter's raw source may have any number of
// study materials/exercises. The normalizer checks the normalized count against
// the raw count (minus explicit holdouts), rather than this schema pinning a length.
export const rawLessonSchema = z.object({
  id: z.number().int().positive(), title: text, description: text, category: z.literal('alphabet-lc'),
  order: z.number().int().positive(), studyMaterials: z.array(rawBlock).min(1), exercises: z.array(rawExercise).min(1),
}).strict().superRefine((raw, ctx) => {
  const identity = identityForSourceId(raw.id);
  if (!identity) { ctx.addIssue({ code: 'custom', message: `No owner-letter-map identity for source lesson id ${raw.id}` }); return; }
  if (raw.order !== identity.order) ctx.addIssue({ code: 'custom', message: 'Raw lesson order does not match the owner letter map' });
});

const blockBase = { id: text, sourceIndex: z.number().int().min(0), text: nfcText, reviewFlags: z.array(text) };
const block = z.discriminatedUnion('type', renderedBlockTypes.map(type => z.object({
  ...blockBase, type: z.literal(type),
  ...(type === 'TEXT_IMAGE' ? {
    illustration: z.object({ glyph: nfcText, label: nfcText, equivalent: nfcText, mediaStatus: z.literal('withheld-pending-review') }).strict(),
  } : {}),
  // Source audio is never carried through (see normalize.mjs); `text` (blockBase)
  // holds the English translation so generic text consumers (e.g. studyText) still work.
  ...(type === 'WORD_EXAMPLE' ? { word: nfcText, transcription: nfcText } : {}),
}).strict()));
// MATCH_PAIRS has a fundamentally different shape (pairs, not options/correctOptionId),
// so the exercise schema is a discriminated union rather than one shape for every type.
const choiceExerciseTypes = renderedExerciseTypes.filter(type => type !== 'MATCH_PAIRS');
const choiceExercise = z.object({
  id: text, sourceId: text, type: z.enum(choiceExerciseTypes), prompt: nfcText, explanation: nfcText,
  options: z.array(z.object({ id: text, label: nfcText }).strict()).min(2).max(4),
  correctOptionId: text, reviewFlags: z.array(text),
}).strict().superRefine((item, ctx) => {
  const ids = item.options.map(option => option.id);
  if (new Set(ids).size !== ids.length) ctx.addIssue({ code: 'custom', message: 'Duplicate option IDs' });
  if (new Set(item.options.map(option => option.label)).size !== ids.length) ctx.addIssue({ code: 'custom', message: 'Equivalent normalized choices' });
  if (!ids.includes(item.correctOptionId)) ctx.addIssue({ code: 'custom', message: 'Answer must map to an option ID' });
  const expected = item.type === 'TRUE_FALSE' ? 2 : item.type === 'MULTIPLE_CHOICE_COLUMN' ? 3 : 4;
  if (ids.length !== expected) ctx.addIssue({ code: 'custom', message: 'Incorrect option count for exercise type' });
  if (item.type === 'TRUE_FALSE' && (item.options[0].label !== 'True' || item.options[1].label !== 'False')) {
    ctx.addIssue({ code: 'custom', message: 'True/false options must be explicit' });
  }
});
const matchPairsExercise = z.object({
  id: text, sourceId: text, type: z.literal('MATCH_PAIRS'), prompt: nfcText, explanation: nfcText,
  pairs: z.array(z.object({ id: text, left: nfcText, right: nfcText }).strict()).min(2),
  reviewFlags: z.array(text),
}).strict().superRefine((item, ctx) => {
  const ids = item.pairs.map(pair => pair.id);
  if (new Set(ids).size !== ids.length) ctx.addIssue({ code: 'custom', message: 'Duplicate pair IDs' });
  if (new Set(item.pairs.map(pair => pair.left)).size !== ids.length) ctx.addIssue({ code: 'custom', message: 'Equivalent normalized left labels' });
  if (new Set(item.pairs.map(pair => pair.right)).size !== ids.length) ctx.addIssue({ code: 'custom', message: 'Equivalent normalized right labels' });
});
const exercise = z.discriminatedUnion('type', [choiceExercise, matchPairsExercise]);

// Identity fields are validated generically (not as per-letter literals) so one
// schema can cover every lesson in the content collection; the cross-check against
// the owner-letter-map below is what actually pins a lesson to its one correct letter.
export const lessonSchema = z.object({
  id: text, sourceId: z.number().int().positive(), order: z.number().int().positive(), glyph: nfcText,
  // Optional with a default so every EN content file already on disk (written before
  // locale support existed) still parses unchanged; a locale-suffixed content file
  // (src/content/lessons/fr/<slug>.json) sets this explicitly via normalizeLesson.
  locale: z.enum(['en', 'fr']).default('en'),
  title: nfcText, description: nfcText, status: z.literal('local-review-only'), normalizationVersion: z.literal(1),
  provenance: z.object({ source: z.string().url(), responseDate: text, sha256: z.string().regex(/^[a-f0-9]{64}$/) }).strict(),
  editorialIssues: z.array(z.object({ id: text, summary: nfcText, detail: nfcText }).strict()),
  blocks: z.array(block).min(1), exercises: z.array(exercise).min(1),
}).strict().superRefine((lesson, ctx) => {
  for (const [label, values] of [['blocks', lesson.blocks.map(b => b.id)], ['exercises', lesson.exercises.map(e => e.id)], ['source exercises', lesson.exercises.map(e => e.sourceId)], ['editorial issues', lesson.editorialIssues.map(i => i.id)]]) {
    if (new Set(values).size !== values.length) ctx.addIssue({ code: 'custom', message: `Duplicate ${label} IDs` });
  }
  const issues = new Set(lesson.editorialIssues.map(issue => issue.id));
  for (const item of [...lesson.blocks, ...lesson.exercises]) {
    if (item.reviewFlags.some(flag => !issues.has(flag))) ctx.addIssue({ code: 'custom', message: 'Unknown editorial flag' });
  }
  // Block IDs/positions key off sourceIndex (not array position), so holding out an
  // unsupported block leaves a sparse-but-still-ordered sourceIndex sequence.
  let lastSourceIndex = -1;
  for (const b of lesson.blocks) {
    if (b.sourceIndex <= lastSourceIndex) ctx.addIssue({ code: 'custom', message: 'Study blocks must be strictly ordered by source index' });
    lastSourceIndex = b.sourceIndex;
    if (b.id !== `${lesson.id}-block-${b.sourceIndex + 1}`) ctx.addIssue({ code: 'custom', message: 'Study block ID must match its source position' });
  }
  if (lesson.blocks[0]?.type !== 'MAIN_TITLE') ctx.addIssue({ code: 'custom', message: 'First block must be the lesson title' });
  // Identity is looked up per the lesson's own `locale` field (not a fixed default)
  // so the same generic schema validates both an EN content file and its FR
  // counterpart — each cross-checked against the matching `?lang=` source URL.
  const identity = identityForSlug(lesson.id, lesson.locale);
  if (!identity) { ctx.addIssue({ code: 'custom', message: `Unknown lesson slug: ${lesson.id}` }); return; }
  if (lesson.sourceId !== identity.sourceId || lesson.order !== identity.order || lesson.glyph !== identity.glyph || lesson.provenance.source !== identity.sourceUrl) {
    ctx.addIssue({ code: 'custom', message: 'Lesson identity does not match the owner letter map' });
  }
});

// A schema factory pinned to one letter's identity. The generic schemas above
// already cross-check identity against the owner-letter-map; this adds a second,
// explicit guard so a script invoked for one letter can't silently accept another
// letter's raw/normalized data (e.g. running `normalize-lesson.mjs bet` against an
// Aleph snapshot).
export function createLessonSchema(identity) {
  return {
    rawLessonSchema: rawLessonSchema.refine(raw => raw.id === identity.sourceId, { message: `Raw lesson id must be ${identity.sourceId} for ${identity.slug}` }),
    lessonSchema: lessonSchema.refine(lesson => lesson.id === identity.slug && lesson.sourceId === identity.sourceId, { message: `Lesson identity must be ${identity.slug}` }),
  };
}
