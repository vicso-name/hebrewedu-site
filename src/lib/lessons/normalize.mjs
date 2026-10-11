import { rawLessonSchema, lessonSchema } from './schema.mjs';

const issues = [
  { id: 'provisional-media', summary: 'Illustration pending approval', detail: 'The original image is withheld until accuracy and reuse are approved. The Unicode form and written description provide a provisional textual equivalent.' },
  { id: 'unintroduced-letters', summary: 'Optional practice refinement', detail: 'Some mark-recognition distractors use letters not introduced in this lesson. Beginner scaffolding can be improved separately from the approved source synchronization.' },
  { id: 'true-false-balance', summary: 'Optional question balance refinement', detail: 'All five source true/false statements are marked true. The owner explicitly retains Q4 True; this is not an answer-integrity or release failure.' },
];
const illustrations = {
  2: { glyph: 'אַ', label: 'Patah', equivalent: 'Aleph with a single horizontal vowel mark beneath it.' },
  4: { glyph: 'אָ', label: 'Kamatz Gadol', equivalent: 'Aleph with a small T-shaped vowel mark beneath it.' },
  6: { glyph: 'אֲ', label: 'Hataf Patah', equivalent: 'Aleph with a horizontal vowel mark and two vertical dots beneath it.' },
};
const blockFlags = { 2: ['provisional-media'], 4: ['provisional-media'], 6: ['provisional-media'] };
const exerciseFlags = {
  1: ['true-false-balance'], 3: ['unintroduced-letters'], 4: ['true-false-balance'],
  7: ['true-false-balance'], 8: ['unintroduced-letters'], 9: ['true-false-balance'],
  12: ['unintroduced-letters'], 13: ['true-false-balance'],
};
export function normalizeLesson(rawInput, provenance) {
  const raw = rawLessonSchema.parse(rawInput);
  const nfc = value => value.normalize('NFC');
  return lessonSchema.parse({
    id: 'aleph', sourceId: 1, order: 1, glyph: 'א', title: 'Aleph: three vowel marks',
    description: nfc(raw.description), status: 'local-review-only', normalizationVersion: 1, provenance,
    editorialIssues: issues,
    blocks: raw.studyMaterials.map((item, index) => ({
      id: `aleph-block-${index + 1}`, sourceIndex: index, type: item.type,
      text: nfc(item.type === 'MAIN_TITLE' ? item.title : item.content), reviewFlags: blockFlags[index] ?? [],
      ...(item.type === 'TEXT_IMAGE' ? { illustration: { ...illustrations[index], mediaStatus: 'withheld-pending-review' } } : {}),
    })),
    exercises: raw.exercises.map((item, index) => {
      const id = `aleph-exercise-${index + 1}`;
      const isBoolean = item.type === 'TRUE_FALSE';
      const labels = isBoolean ? ['True', 'False'] : item.additionalData.choices.map(nfc);
      const answerIndex = isBoolean ? (item.additionalData.correctAnswer === 'true' ? 0 : 1) : labels.indexOf(nfc(item.additionalData.correctAnswer));
      if (answerIndex < 0) throw new Error(`No answer match for ${item.id}`);
      return {
        id, sourceId: item.id, type: item.type, prompt: nfc(item.content), explanation: nfc(item.tip),
        options: labels.map((label, optionIndex) => ({ id: `${id}-option-${optionIndex + 1}`, label })),
        correctOptionId: `${id}-option-${answerIndex + 1}`, reviewFlags: exerciseFlags[index + 1] ?? [],
      };
    }),
  });
}
