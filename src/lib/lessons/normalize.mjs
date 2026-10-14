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

function applyContentOverride(item, overrideText, field) {
  return overrideText === undefined ? item : { ...item, [field]: overrideText };
}
// An exercise override may patch the prompt (`content`), the explanation (`tip`)
// and/or the TRUE_FALSE answer key (`correctAnswer`) together, since correcting an
// absolute claim often means changing the prompt and the answer in the same edit.
function applyExerciseOverride(item, override) {
  if (!override) return item;
  const { content, tip, correctAnswer } = override;
  return {
    ...item,
    ...(content !== undefined ? { content } : {}),
    ...(tip !== undefined ? { tip } : {}),
    ...(correctAnswer !== undefined ? { additionalData: { ...item.additionalData, correctAnswer } } : {}),
  };
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

  // A holdout always excludes its item, whether the reason is an unsupported
  // source type or an editorial decision on otherwise-rendered content (e.g. a
  // duplicate WORD_EXAMPLE) — see docs/LESSON_PIPELINE.md.
  const heldOutBlocks = new Set((overrides.holdOuts?.blocks ?? []).map(h => h.sourceIndex));
  const heldOutExercises = new Set((overrides.holdOuts?.exercises ?? []).map(h => h.sourceIndex));

  // Editorial text corrections, keyed by raw sourceIndex (0-based), applied as a
  // patch to the raw item's own text-bearing field before anything else reads it —
  // see docs/LESSON_PIPELINE.md. Never edit the pinned raw snapshot to fix wording.
  const blockTextField = type => type === 'MAIN_TITLE' ? 'title' : type === 'WORD_EXAMPLE' ? 'translation' : 'content';
  const blocks = raw.studyMaterials
    .map((rawItem, sourceIndex) => ({ item: applyContentOverride(rawItem, overrides.contentOverrides?.blocks?.[String(sourceIndex)], blockTextField(rawItem.type)), sourceIndex }))
    .filter(({ sourceIndex }) => !heldOutBlocks.has(sourceIndex))
    .map(({ item, sourceIndex }) => ({
      id: `${identity.slug}-block-${sourceIndex + 1}`, sourceIndex, type: item.type,
      text: nfc(item.type === 'MAIN_TITLE' ? item.title : item.type === 'WORD_EXAMPLE' ? item.translation : item.content),
      reviewFlags: overrides.blockFlags?.[String(sourceIndex)] ?? [],
      ...(item.type === 'WORD_EXAMPLE' ? { word: nfc(item.word), transcription: nfc(item.transcription) } : {}),
      ...(item.type === 'TEXT_IMAGE' ? { illustration: { ...overrides.illustrations[String(sourceIndex)], mediaStatus: 'withheld-pending-review' } } : {}),
    }));
  if (blocks.length !== raw.studyMaterials.length - heldOutBlocks.size) throw new Error('Normalized block count does not match the raw source');

  const exercises = raw.exercises
    .map((rawItem, sourceIndex) => ({ item: applyExerciseOverride(rawItem, overrides.contentOverrides?.exercises?.[String(sourceIndex)]), sourceIndex }))
    .filter(({ sourceIndex }) => !heldOutExercises.has(sourceIndex))
    .map(({ item, sourceIndex }) => {
      const id = `${identity.slug}-exercise-${sourceIndex + 1}`;
      const reviewFlags = overrides.exerciseFlags?.[String(sourceIndex + 1)] ?? [];
      if (item.type === 'MATCH_PAIRS') {
        const pairs = Object.entries(item.additionalData.pairs).map(([left, right], pairIndex) => ({
          id: `${id}-pair-${pairIndex + 1}`, left: nfc(left), right: nfc(right),
        }));
        return { id, sourceId: item.id, type: item.type, prompt: nfc(item.content), explanation: nfc(item.tip), pairs, reviewFlags };
      }
      const isBoolean = item.type === 'TRUE_FALSE';
      const labels = isBoolean ? ['True', 'False'] : item.additionalData.choices.map(nfc);
      const answerIndex = isBoolean ? (item.additionalData.correctAnswer === 'true' ? 0 : 1) : labels.indexOf(nfc(item.additionalData.correctAnswer));
      if (answerIndex < 0) throw new Error(`No answer match for ${item.id}`);
      return {
        id, sourceId: item.id, type: item.type, prompt: nfc(item.content), explanation: nfc(item.tip),
        options: labels.map((label, optionIndex) => ({ id: `${id}-option-${optionIndex + 1}`, label })),
        correctOptionId: `${id}-option-${answerIndex + 1}`, reviewFlags,
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
