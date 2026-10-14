import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { normalizeLesson } from '../src/lib/lessons/normalize.mjs';
import { lessonSchema, rawLessonSchema } from '../src/lib/lessons/schema.mjs';
import { identityForSlug } from '../src/lib/lessons/identity.mjs';
import { gradeMatchPair, gradeMatchPairs } from '../src/lib/lessons/grading.mjs';
import { derangedPairOrder } from '../src/lib/lessons/presentation.mjs';

const identity = identityForSlug('aleph');
const overrides = {
  title: 'Fixture', editorialIssues: [], blockFlags: {}, exerciseFlags: {}, holdOuts: { blocks: [], exercises: [] },
  source: { responseDate: '2026-01-01T00:00:00.000Z', sha256: '0'.repeat(64) },
};
function rawWithPairs(pairs) {
  return {
    id: identity.sourceId, title: 'Fixture', description: 'Fixture description', category: 'alphabet-lc', order: identity.order,
    studyMaterials: [{ type: 'MAIN_TITLE', title: 'Fixture' }],
    exercises: [{ id: 'fixture-pairs-1', type: 'MATCH_PAIRS', content: 'Match each item with its pair.', tip: 'Explanation.', score: 0, additionalData: { pairs } }],
  };
}
const copy = value => structuredClone(value);

test('normalizing a MATCH_PAIRS exercise produces one pair per raw entry with stable, position-keyed IDs', () => {
  const raw = rawWithPairs({ 'א': 'a', 'ב': 'b', 'ג': 'g' });
  const lesson = normalizeLesson(raw, identity, overrides);
  assert.equal(lesson.exercises.length, 1);
  const exercise = lesson.exercises[0];
  assert.equal(exercise.type, 'MATCH_PAIRS');
  assert.equal(exercise.id, 'aleph-exercise-1');
  assert.equal(exercise.sourceId, 'fixture-pairs-1');
  assert.deepEqual(exercise.pairs, [
    { id: 'aleph-exercise-1-pair-1', left: 'א', right: 'a' },
    { id: 'aleph-exercise-1-pair-2', left: 'ב', right: 'b' },
    { id: 'aleph-exercise-1-pair-3', left: 'ג', right: 'g' },
  ]);
  assert.equal('correctOptionId' in exercise, false);
  assert.equal('options' in exercise, false);
});

test('a raw MATCH_PAIRS exercise needs at least two pairs', () => {
  const raw = rawWithPairs({ 'א': 'a' });
  assert.equal(rawLessonSchema.safeParse(raw).success, false);
});

test('duplicate pair IDs or equivalent normalized left/right labels fail the normalized schema closed', () => {
  const lesson = normalizeLesson(rawWithPairs({ 'א': 'a', 'ב': 'b', 'ג': 'g' }), identity, overrides);
  const duplicateId = copy(lesson); duplicateId.exercises[0].pairs[1].id = duplicateId.exercises[0].pairs[0].id;
  assert.equal(lessonSchema.safeParse(duplicateId).success, false);
  const duplicateLeft = copy(lesson); duplicateLeft.exercises[0].pairs[1].left = duplicateLeft.exercises[0].pairs[0].left;
  assert.equal(lessonSchema.safeParse(duplicateLeft).success, false);
  const duplicateRight = copy(lesson); duplicateRight.exercises[0].pairs[1].right = duplicateRight.exercises[0].pairs[0].right;
  assert.equal(lessonSchema.safeParse(duplicateRight).success, false);
  const tooFew = copy(lesson); tooFew.exercises[0].pairs = [tooFew.exercises[0].pairs[0]];
  assert.equal(lessonSchema.safeParse(tooFew).success, false);
});

test('gradeMatchPair grades a correct tap, a wrong tap, and an unknown ID as unanswered', () => {
  const exercise = { pairs: [{ id: 'ex-pair-1' }, { id: 'ex-pair-2' }, { id: 'ex-pair-3' }] };
  assert.deepEqual(gradeMatchPair(exercise, 'ex-pair-1', 'ex-pair-1'), { status: 'correct', correct: true });
  assert.deepEqual(gradeMatchPair(exercise, 'ex-pair-1', 'ex-pair-2'), { status: 'incorrect', correct: false });
  assert.deepEqual(gradeMatchPair(exercise, 'ex-pair-1', 'not-a-real-id'), { status: 'unanswered', correct: false });
  assert.deepEqual(gradeMatchPair(exercise, 'not-a-real-id', 'ex-pair-1'), { status: 'unanswered', correct: false });
});

test('gradeMatchPairs reports unanswered, partial and fully correct completion', () => {
  const exercise = { pairs: [{ id: 'ex-pair-1' }, { id: 'ex-pair-2' }, { id: 'ex-pair-3' }] };
  assert.deepEqual(gradeMatchPairs(exercise, []), { status: 'unanswered', matched: 0, total: 3 });
  assert.deepEqual(gradeMatchPairs(exercise, ['ex-pair-1']), { status: 'partial', matched: 1, total: 3 });
  assert.deepEqual(gradeMatchPairs(exercise, ['ex-pair-1', 'ex-pair-2']), { status: 'partial', matched: 2, total: 3 });
  assert.deepEqual(gradeMatchPairs(exercise, ['ex-pair-1', 'ex-pair-2', 'ex-pair-3']), { status: 'correct', matched: 3, total: 3 });
  // Duplicate IDs in the matched list don't inflate the count.
  assert.deepEqual(gradeMatchPairs(exercise, ['ex-pair-1', 'ex-pair-1']), { status: 'partial', matched: 1, total: 3 });
});

test('derangedPairOrder never places a pair opposite itself and is not a constant-offset rotation', () => {
  const pairs = [{ id: 'p1' }, { id: 'p2' }, { id: 'p3' }, { id: 'p4' }, { id: 'p5' }];
  const order = derangedPairOrder(pairs, 'some-exercise-id');
  const ids = order.map(p => p.id);
  assert.deepEqual([...ids].sort(), pairs.map(p => p.id).sort(), 'must still be a permutation of the same pairs');
  order.forEach((pair, i) => assert.notEqual(pair.id, pairs[i].id, `pair at row ${i} must not match its own left item`));
  const indices = order.map(pair => pairs.findIndex(p => p.id === pair.id));
  const offsets = new Set(indices.map((value, i) => (value - i + pairs.length) % pairs.length));
  assert.notEqual(offsets.size, 1, 'result must not be a pure constant-offset rotation');
  // Stable across repeated calls (deterministic seed), and a 2-pair exercise
  // (whose only derangement is the swap) still has no self-matched row.
  assert.deepEqual(derangedPairOrder(pairs, 'some-exercise-id'), order);
  const two = [{ id: 'a' }, { id: 'b' }];
  const twoOrder = derangedPairOrder(two, 'two-pairs');
  twoOrder.forEach((pair, i) => assert.notEqual(pair.id, two[i].id));
});

test('Bet exercise 13 (sourceIndex 12) is a normalized MATCH_PAIRS exercise, no longer held out', () => {
  const lesson = JSON.parse(readFileSync(new URL('../src/content/lessons/bet.json', import.meta.url)));
  assert.equal(lesson.exercises.length, 13);
  const exercise = lesson.exercises.find(item => item.sourceId === '1742223546108');
  assert.ok(exercise, 'exercise 13 must be present once its holdout is removed');
  assert.equal(exercise.type, 'MATCH_PAIRS');
  assert.equal(exercise.pairs.length, 3);
  assert.equal(lessonSchema.safeParse(lesson).success, true);
});
