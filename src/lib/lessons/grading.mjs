/** Ordinary self-assessment: keys are intentionally inspectable in local HTML. */
export function gradeAnswer(exercise, selectedOptionId) {
  if (!exercise.options.some(option => option.id === selectedOptionId)) {
    return { status: 'unanswered', correct: false };
  }
  const correct = selectedOptionId === exercise.correctOptionId;
  return { status: correct ? 'correct' : 'incorrect', correct };
}
export function hebrewRuns(text) {
  return text.normalize('NFC').split(/([\u0590-\u05FF]+)/u).filter(Boolean).map(value => ({
    text: value, hebrew: /[\u0590-\u05FF]/u.test(value),
  }));
}
