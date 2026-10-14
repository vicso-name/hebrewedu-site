import { createLessonSchema, renderedBlockTypes, renderedExerciseTypes } from './schema.mjs';

// Items whose source type the renderers (StudyBlock.astro / Practice.astro) can't
// present. Each must be explicitly held out (with a reason) in the letter's data
// file, or normalization fails closed rather than silently dropping content.
export function findUnsupportedItems(raw, overrides = {}) {
  const heldOutBlocks = new Map((overrides.holdOuts?.blocks ?? []).map(h => [h.sourceIndex, h.reason]));
  const heldOutExercises = new Map((overrides.holdOuts?.exercises ?? []).map(h => [h.sourceIndex, h.reason]));
  const unsupportedBlocks = raw.studyMaterials
    .map((item, sourceIndex) => ({ sourceIndex, type: item.type }))
    .filter(({ type }) => !renderedBlockTypes.includes(type));
  const unsupportedExercises = raw.exercises
    .map((item, sourceIndex) => ({ sourceIndex, type: item.type }))
    .filter(({ type }) => !renderedExerciseTypes.includes(type));
  return {
    blocks: unsupportedBlocks.map(item => ({ ...item, heldOut: heldOutBlocks.has(item.sourceIndex), reason: heldOutBlocks.get(item.sourceIndex) ?? null })),
    exercises: unsupportedExercises.map(item => ({ ...item, heldOut: heldOutExercises.has(item.sourceIndex), reason: heldOutExercises.get(item.sourceIndex) ?? null })),
  };
}

function describeUnsupported(kind, items) {
  return items.filter(item => !item.heldOut).map(item => `${kind} #${item.sourceIndex} (${item.type})`);
}

// A heuristic, non-binding proposal for which supported blocks read as theory vs.
// examples — the first run of non-illustrative blocks is "theory", everything from
// the first illustrative (TEXT_IMAGE/WORD_EXAMPLE) block onward is "examples".
// This is a starting point for editorial review, not an approved stage map.
export function proposeStageMap(raw, overrides = {}) {
  const heldOut = new Set((overrides.holdOuts?.blocks ?? []).map(h => h.sourceIndex));
  const illustrative = new Set(['TEXT_IMAGE', 'WORD_EXAMPLE']);
  let sawIllustrative = false;
  const theory = [], examples = [];
  raw.studyMaterials.forEach((item, sourceIndex) => {
    if (heldOut.has(sourceIndex) || !renderedBlockTypes.includes(item.type)) return;
    if (illustrative.has(item.type)) sawIllustrative = true;
    (sawIllustrative ? examples : theory).push(sourceIndex);
  });
  return { theory, examples };
}

export function normalizeLesson(rawInput, identity, overrides) {
  const { rawLessonSchema, lessonSchema } = createLessonSchema(identity);
  const raw = rawLessonSchema.parse(rawInput);
  const nfc = value => value.normalize('NFC');

  const unsupported = findUnsupportedItems(raw, overrides);
  const unresolved = [...describeUnsupported('block', unsupported.blocks), ...describeUnsupported('exercise', unsupported.exercises)];
  if (unresolved.length) {
    throw new Error(`Unsupported content without a holdout reason:\n  ${unresolved.join('\n  ')}`);
  }

  const heldOutBlocks = new Set(unsupported.blocks.map(item => item.sourceIndex));
  const heldOutExercises = new Set(unsupported.exercises.map(item => item.sourceIndex));

  const blocks = raw.studyMaterials
    .map((item, sourceIndex) => ({ item, sourceIndex }))
    .filter(({ sourceIndex }) => !heldOutBlocks.has(sourceIndex))
    .map(({ item, sourceIndex }) => ({
      id: `${identity.slug}-block-${sourceIndex + 1}`, sourceIndex, type: item.type,
      text: nfc(item.type === 'MAIN_TITLE' ? item.title : item.content),
      reviewFlags: overrides.blockFlags?.[String(sourceIndex)] ?? [],
      ...(item.type === 'TEXT_IMAGE' ? { illustration: { ...overrides.illustrations[String(sourceIndex)], mediaStatus: 'withheld-pending-review' } } : {}),
    }));
  if (blocks.length !== raw.studyMaterials.length - heldOutBlocks.size) throw new Error('Normalized block count does not match the raw source');

  const exercises = raw.exercises
    .map((item, sourceIndex) => ({ item, sourceIndex }))
    .filter(({ sourceIndex }) => !heldOutExercises.has(sourceIndex))
    .map(({ item, sourceIndex }) => {
      const id = `${identity.slug}-exercise-${sourceIndex + 1}`;
      const isBoolean = item.type === 'TRUE_FALSE';
      const labels = isBoolean ? ['True', 'False'] : item.additionalData.choices.map(nfc);
      const answerIndex = isBoolean ? (item.additionalData.correctAnswer === 'true' ? 0 : 1) : labels.indexOf(nfc(item.additionalData.correctAnswer));
      if (answerIndex < 0) throw new Error(`No answer match for ${item.id}`);
      return {
        id, sourceId: item.id, type: item.type, prompt: nfc(item.content), explanation: nfc(item.tip),
        options: labels.map((label, optionIndex) => ({ id: `${id}-option-${optionIndex + 1}`, label })),
        correctOptionId: `${id}-option-${answerIndex + 1}`, reviewFlags: overrides.exerciseFlags?.[String(sourceIndex + 1)] ?? [],
      };
    });
  if (exercises.length !== raw.exercises.length - heldOutExercises.size) throw new Error('Normalized exercise count does not match the raw source');

  return lessonSchema.parse({
    id: identity.slug, sourceId: identity.sourceId, order: identity.order, glyph: identity.glyph,
    title: overrides.title, description: nfc(overrides.description ?? raw.description),
    status: 'local-review-only', normalizationVersion: 1,
    provenance: { source: identity.sourceUrl, responseDate: overrides.source.responseDate, sha256: overrides.source.sha256 },
    editorialIssues: overrides.editorialIssues ?? [],
    blocks, exercises,
  });
}
