/** Ordinary self-assessment: keys are intentionally inspectable in local HTML. */
export function gradeAnswer(exercise, selectedOptionId) {
  if (!exercise.options.some(option => option.id === selectedOptionId)) {
    return { status: 'unanswered', correct: false };
  }
  const correct = selectedOptionId === exercise.correctOptionId;
  return { status: correct ? 'correct' : 'incorrect', correct };
}
/**
 * Grades one tap/click attempt: a left-side pair ID against a right-side pair ID.
 * A pair's left and right items share the same `pairs[].id`, so a correct match is
 * simply the two tapped IDs being equal — the key is intentionally inspectable, same
 * as gradeAnswer. Either argument not belonging to this exercise is "unanswered".
 */
export function gradeMatchPair(exercise, leftId, rightId) {
  const ids = new Set(exercise.pairs.map(pair => pair.id));
  if (!ids.has(leftId) || !ids.has(rightId)) return { status: 'unanswered', correct: false };
  const correct = leftId === rightId;
  return { status: correct ? 'correct' : 'incorrect', correct };
}
/** Overall completion of a MATCH_PAIRS exercise given the pair IDs matched so far. */
export function gradeMatchPairs(exercise, matchedPairIds) {
  const total = exercise.pairs.length;
  const matched = new Set(matchedPairIds).size;
  const status = matched === 0 ? 'unanswered' : matched === total ? 'correct' : 'partial';
  return { status, matched, total };
}
export function hebrewRuns(text) {
  return text.normalize('NFC').split(/([\u0590-\u05FF]+)/u).filter(Boolean).map(value => ({
    text: value, hebrew: /[\u0590-\u05FF]/u.test(value),
  }));
}
