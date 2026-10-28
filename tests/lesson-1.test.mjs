import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { normalizeLesson } from '../src/lib/lessons/normalize.mjs';
import { lessonSchema, rawLessonSchema } from '../src/lib/lessons/schema.mjs';
import { identityForSlug } from '../src/lib/lessons/identity.mjs';
import { loadLessonOverrides } from '../src/lib/lessons/editorial.mjs';
import { gradeAnswer, hebrewRuns } from '../src/lib/lessons/grading.mjs';
const lesson = JSON.parse(readFileSync(new URL('../src/content/lessons/aleph.json', import.meta.url)));
const alephIdentity = identityForSlug('aleph');
const alephOverrides = loadLessonOverrides('aleph');
const sourceFile = new URL('../.local/lesson-snapshots/lesson-1.20261011T193043064573Z.raw.json', import.meta.url);
const hasPrivateSource = existsSync(sourceFile);
// A synthetic adapter fixture keeps grading/schema tests portable without redistributing
// private snapshots or original media URLs. Source-fidelity assertions require local evidence.
const raw = hasPrivateSource ? JSON.parse(readFileSync(sourceFile)) : {
  id: 1, category: 'alphabet-lc', order: 1, title: 'Fixture', description: lesson.description,
  studyMaterials: lesson.blocks.map(block => ({ type: block.type,
    ...(block.type === 'MAIN_TITLE' ? { title: block.text } : { content: block.text }),
    ...(block.type === 'TEXT_IMAGE' ? { description: '', imageUrl: 'https://example.test/withheld.png' } : {}),
  })),
  exercises: lesson.exercises.map(q => ({ id: q.sourceId, type: q.type, content: q.prompt, tip: q.explanation, score: 0,
    additionalData: q.type === 'TRUE_FALSE'
      ? { correctAnswer: q.options.find(o => o.id === q.correctOptionId).label.toLowerCase() }
      : { choices: q.options.map(o => o.label), correctAnswer: q.options.find(o => o.id === q.correctOptionId).label },
  })),
};
const copy = value => structuredClone(value);

test('offline normalization preserves all original blocks, questions, explanations and order', { skip: !hasPrivateSource && 'Private source-fidelity evidence is intentionally excluded from Git' }, () => {
  assert.deepEqual(normalizeLesson(raw, alephIdentity, alephOverrides), lesson);
  lesson.blocks.forEach((block, i) => {
    const override = alephOverrides.contentOverrides?.blocks?.[String(i)];
    const expected = override ?? (raw.studyMaterials[i].title ?? raw.studyMaterials[i].content);
    assert.equal(block.text, expected.normalize('NFC'));
  });
  lesson.exercises.forEach((exercise, i) => {
    assert.equal(exercise.sourceId, raw.exercises[i].id);
    assert.equal(exercise.prompt, raw.exercises[i].content.normalize('NFC'));
    assert.equal(exercise.explanation, raw.exercises[i].tip.normalize('NFC'));
  });
});
test('all 14 questions grade both correct and wrong IDs and retain grading after option reorder', () => {
  for (const exercise of lesson.exercises) {
    assert.equal(gradeAnswer(exercise, exercise.correctOptionId).status, 'correct');
    assert.equal(gradeAnswer(exercise, exercise.options.find(o => o.id !== exercise.correctOptionId).id).status, 'incorrect');
    assert.equal(gradeAnswer(exercise, '').status, 'unanswered');
    assert.equal(gradeAnswer({ ...exercise, options: [...exercise.options].reverse() }, exercise.correctOptionId).status, 'correct');
  }
});
test('false is parsed explicitly, never by string truthiness', () => {
  const input = copy(raw);
  input.exercises[0].additionalData.correctAnswer = 'false';
  const result = normalizeLesson(input, alephIdentity, alephOverrides);
  assert.equal(result.exercises[0].options.find(o => o.id === result.exercises[0].correctOptionId).label, 'False');
});
test('presentation forms normalize while vowel marks and shin/sin dots remain', () => {
  assert.equal('פַּ'.normalize('NFC'), 'פַּ');
  assert.equal('שׂ'.normalize('NFC'), 'שׂ');
  assert.deepEqual(hebrewRuns('Aleph (אֲ) and אַ.'), [
    { text: 'Aleph (', hebrew: false }, { text: 'אֲ', hebrew: true }, { text: ') and ', hebrew: false },
    { text: 'אַ', hebrew: true }, { text: '.', hebrew: false },
  ]);
});
test('invalid, unknown, duplicate and unmapped data fails closed', () => {
  const edits = [
    value => { value.blocks[0].type = 'UNKNOWN'; },
    // Block/exercise counts are no longer a fixed schema length (letters have
    // different source counts); shortening the array alone no longer fails here —
    // the normalizer checks counts against that letter's raw source instead.
    value => { value.blocks[3].id = 'aleph-block-11'; },
    value => { value.blocks[2].imageUrl = 'https://example.com/unapproved.png'; },
    value => { value.blocks[2].illustration.mediaStatus = 'approved'; },
    value => { value.blocks[3].sourceIndex = 0; },
    value => { value.exercises[0].reviewFlags.push('missing'); },
    value => { value.exercises[1].correctOptionId = 'not-an-option'; },
    value => { value.exercises[1].options[1].label = value.exercises[1].options[0].label; },
    value => { value.exercises[1].id = value.exercises[0].id; },
    value => { value.exercises[7].options[0].label = 'פַּ'; },
    value => { value.adminToken = 'private'; },
  ];
  for (const edit of edits) { const input = copy(lesson); edit(input); assert.equal(lessonSchema.safeParse(input).success, false); }
  const unexpected = copy(raw); unexpected.secret = 'private';
  assert.equal(rawLessonSchema.safeParse(unexpected).success, false);
  const unmapped = copy(raw); unmapped.exercises[1].additionalData.correctAnswer = 'missing';
  assert.throws(() => normalizeLesson(unmapped, alephIdentity, alephOverrides), /No answer match/);
  const duplicate = copy(raw); duplicate.exercises[7].additionalData.choices[1] = 'פַּ';
  assert.throws(() => normalizeLesson(duplicate, alephIdentity, alephOverrides), /Equivalent normalized choices/);
});
test('an empty TEXT_IMAGE body parses but fails closed until an override supplies its text', () => {
  const index = raw.studyMaterials.findIndex(block => block.type === 'TEXT_IMAGE');
  const input = copy(raw); input.studyMaterials[index].content = '';
  assert.doesNotThrow(() => rawLessonSchema.parse(input));
  assert.throws(() => normalizeLesson(input, alephIdentity, alephOverrides));
  const overrides = copy(alephOverrides);
  overrides.contentOverrides = { ...overrides.contentOverrides, blocks: { ...overrides.contentOverrides?.blocks, [index]: 'Override text' } };
  assert.equal(normalizeLesson(input, alephIdentity, overrides).blocks.find(block => block.sourceIndex === index).text, 'Override text');
});
test('normalized model contains no raw image URL, source scoring or raw answer field', () => {
  const serialized = JSON.stringify(lesson);
  for (const key of ['imageUrl', 'additionalData', 'correctAnswer', 'backblazeb2.com', 'score']) assert.equal(serialized.includes(key), false);
});

test('final owner-approved source is presented without question or explanation holds', async () => {
  const { studyText, unavailableQuestions, withheldExplanations, exerciseExplanation } = await import('../src/lib/lessons/presentation.mjs');
  assert.equal(unavailableQuestions.size, 0);
  assert.equal(withheldExplanations.size, 0);
  for (const block of lesson.blocks) assert.equal(studyText(block), block.text);
  for (const exercise of lesson.exercises) assert.equal(exerciseExplanation(exercise), exercise.explanation);
  assert.equal(lesson.exercises.length, 14);
  const q4 = lesson.exercises.find(q => q.sourceId === '1742106507820');
  assert.equal(q4.options.find(o => o.id === q4.correctOptionId).label, 'True');
  assert.equal(gradeAnswer(q4, q4.options.find(o => o.label === 'False').id).status, 'incorrect');
  assert.ok(lesson.blocks.filter(b => b.illustration).every(b => b.illustration.mediaStatus === 'withheld-pending-review'));
  assert.deepEqual(normalizeLesson(raw, alephIdentity, alephOverrides), lesson);
});
test('final synchronization retains all original IDs and the owner-approved unchanged blocks', { skip: !hasPrivateSource && 'Private historical snapshots are intentionally excluded from Git' }, () => {
  const original = JSON.parse(readFileSync(new URL('../.local/lesson-snapshots/lesson-1.raw.json', import.meta.url)));
  const previous = JSON.parse(readFileSync(new URL('../.local/lesson-snapshots/lesson-1.20261011T161534695940Z.raw.json', import.meta.url)));
  assert.deepEqual(raw.exercises.map(q => q.id), original.exercises.map(q => q.id));
  assert.deepEqual(raw.studyMaterials[1], previous.studyMaterials[1]);
  assert.deepEqual(raw.studyMaterials[5], previous.studyMaterials[5]);
  assert.notEqual(raw.studyMaterials[6].content, previous.studyMaterials[6].content);
  assert.equal(raw.exercises[3].additionalData.correctAnswer, 'true');
});
