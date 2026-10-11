import { z } from 'astro/zod';

const text = z.string().min(1);
const nfcText = text.refine(value => value === value.normalize('NFC'), 'Text must be NFC normalized');
const blockTypes = ['MAIN_TITLE', 'SIMPLE_TEXT', 'TEXT_IMAGE', 'BOLD_TEXT', 'SUBTITLE'];
const exerciseTypes = ['TRUE_FALSE', 'MULTIPLE_CHOICE_COLUMN', 'MULTIPLE_CHOICE_GRID'];
const rawBlock = z.discriminatedUnion('type', blockTypes.map(type => z.object({
  type: z.literal(type),
  ...(type === 'MAIN_TITLE' ? { title: text } : { content: text }),
  ...(type === 'TEXT_IMAGE' ? { description: z.string(), imageUrl: z.string().url() } : {}),
}).strict()));
const rawExercise = z.discriminatedUnion('type', exerciseTypes.map(type => z.object({
  id: text, type: z.literal(type), content: text, tip: text, score: z.number(),
  additionalData: type === 'TRUE_FALSE'
    ? z.object({ correctAnswer: z.enum(['true', 'false']) }).strict()
    : z.object({ choices: z.array(text).length(type === 'MULTIPLE_CHOICE_COLUMN' ? 3 : 4), correctAnswer: text }).strict(),
}).strict()));
export const rawLessonSchema = z.object({
  id: z.literal(1), title: text, description: text, category: z.literal('alphabet-lc'), order: z.literal(1),
  studyMaterials: z.array(rawBlock).length(11), exercises: z.array(rawExercise).length(14),
}).strict();

const blockBase = { id: text, sourceIndex: z.number().int().min(0), text: nfcText, reviewFlags: z.array(text) };
const block = z.discriminatedUnion('type', blockTypes.map(type => z.object({
  ...blockBase, type: z.literal(type),
  ...(type === 'TEXT_IMAGE' ? {
    illustration: z.object({ glyph: nfcText, label: nfcText, equivalent: nfcText, mediaStatus: z.literal('withheld-pending-review') }).strict(),
  } : {}),
}).strict()));
const exercise = z.object({
  id: text, sourceId: text, type: z.enum(exerciseTypes), prompt: nfcText, explanation: nfcText,
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

export const lessonSchema = z.object({
  id: z.literal('aleph'), sourceId: z.literal(1), order: z.literal(1), glyph: z.literal('א'),
  title: nfcText, description: nfcText, status: z.literal('local-review-only'), normalizationVersion: z.literal(1),
  provenance: z.object({ source: z.literal('https://api.hebrewedu.com/api/lessons/1/?lang=en'), responseDate: text, sha256: z.string().regex(/^[a-f0-9]{64}$/) }).strict(),
  editorialIssues: z.array(z.object({ id: text, summary: nfcText, detail: nfcText }).strict()),
  blocks: z.array(block).length(11), exercises: z.array(exercise).length(14),
}).strict().superRefine((lesson, ctx) => {
  for (const [label, values] of [['blocks', lesson.blocks.map(b => b.id)], ['exercises', lesson.exercises.map(e => e.id)], ['source exercises', lesson.exercises.map(e => e.sourceId)], ['editorial issues', lesson.editorialIssues.map(i => i.id)]]) {
    if (new Set(values).size !== values.length) ctx.addIssue({ code: 'custom', message: `Duplicate ${label} IDs` });
  }
  const issues = new Set(lesson.editorialIssues.map(issue => issue.id));
  for (const item of [...lesson.blocks, ...lesson.exercises]) {
    if (item.reviewFlags.some(flag => !issues.has(flag))) ctx.addIssue({ code: 'custom', message: 'Unknown editorial flag' });
  }
  if (lesson.blocks.some((b, index) => b.sourceIndex !== index || b.id !== `aleph-block-${index + 1}`)) {
    ctx.addIssue({ code: 'custom', message: 'Study block order or positional IDs changed' });
  }
  for (const type of blockTypes) if (!lesson.blocks.some(b => b.type === type)) ctx.addIssue({ code: 'custom', message: `Missing ${type} block` });
  for (const type of exerciseTypes) if (!lesson.exercises.some(e => e.type === type)) ctx.addIssue({ code: 'custom', message: `Missing ${type} exercise` });
  if (lesson.blocks[0].type !== 'MAIN_TITLE') ctx.addIssue({ code: 'custom', message: 'First block must be the lesson title' });
});
