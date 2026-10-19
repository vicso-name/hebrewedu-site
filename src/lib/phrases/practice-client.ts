import { gradeAnswer } from '../lessons/grading.mjs';
import { track } from '../analytics';

interface Key { id: string; correctOptionId: string; options: { id: string }[]; explanation: string }

export function initPhrasePractice(root: HTMLElement) {
  if (root.dataset.enhanced === 'true') return;
  const payload = root.querySelector('[data-phrase-keys]');
  const progress = root.querySelector<HTMLElement>('[data-phrase-progress]');
  if (!payload || !progress) return;
  let keys: Key[];
  try { keys = JSON.parse(payload.textContent ?? ''); } catch { return; }
  if (!Array.isArray(keys) || !keys.length) return;
  // Locale-overridable strings (data-phrase-*), defaulting to the original English copy
  // so a root with none of these attributes behaves exactly as before.
  const strings = {
    progressTemplate: root.dataset.phraseProgressTemplate ?? '{correct} of {total} answers checked correctly',
    chooseFirst: root.dataset.phraseChooseFirst ?? 'Choose an answer first, then check it.',
    correctWord: root.dataset.phraseCorrectWord ?? 'Correct.',
    incorrectWord: root.dataset.phraseIncorrectWord ?? 'Not quite.',
    chooseAgain: root.dataset.phraseChooseAgain ?? 'Choose an answer and check it again.',
  };
  const forms = Array.from(root.querySelectorAll<HTMLFormElement>('[data-phrase-question]'));
  if (forms.length !== keys.length) return;

  // Validate every card before enhancing any. On failure the SSR answers remain usable.
  const cards = forms.map(form => ({
    form, key: keys.find(key => key.id === form.dataset.phraseQuestion),
    inputs: Array.from(form.querySelectorAll<HTMLInputElement>('input[type="radio"]')),
    actions: form.querySelector<HTMLElement>('[data-phrase-actions]'),
    submit: form.querySelector<HTMLButtonElement>('button[type="submit"]'),
    retry: form.querySelector<HTMLButtonElement>('[data-phrase-retry]'),
    feedback: form.querySelector<HTMLElement>('[data-phrase-feedback]'),
  }));
  if (cards.some(card => !card.key || !card.actions || !card.submit || !card.retry || !card.feedback || !card.inputs.length || !card.inputs.some(input => input.value === card.key?.correctOptionId))) return;
  const answers = new Map<string, boolean>();
  let completeFired = false;
  function updateProgress() {
    const correct = [...answers.values()].filter(Boolean).length;
    progress!.textContent = strings.progressTemplate.replace('{correct}', String(correct)).replace('{total}', String(keys.length));
    if (!completeFired && answers.size === keys.length) {
      completeFired = true;
      track('phrases_practice_complete', { score: correct });
    }
  }
  for (const { form, key, inputs, actions, submit, retry, feedback } of cards) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (answers.has(key!.id)) return;
      const result = gradeAnswer(key, inputs.find(input => input.checked)?.value);
      if (result.status === 'unanswered') {
        feedback!.dataset.result = 'unanswered';
        feedback!.textContent = strings.chooseFirst;
        inputs[0].focus();
        return;
      }
      answers.set(key!.id, result.correct);
      feedback!.dataset.result = result.status;
      feedback!.textContent = `${result.correct ? strings.correctWord : strings.incorrectWord} ${key!.explanation}`;
      inputs.forEach(input => { input.disabled = true; });
      submit!.hidden = true;
      retry!.hidden = false;
      updateProgress();
      feedback!.focus({ preventScroll: true });
    });
    retry!.addEventListener('click', () => {
      answers.delete(key!.id);
      form.reset();
      inputs.forEach(input => { input.disabled = false; });
      submit!.hidden = false;
      retry!.hidden = true;
      delete feedback!.dataset.result;
      feedback!.textContent = strings.chooseAgain;
      updateProgress();
      inputs[0].focus();
    });
    actions!.hidden = false;
  }
  // Native answer disclosures also remain available after enhancement.
  // This is self-assessment, not an exam with a hidden answer key.
  progress.hidden = false;
  root.dataset.enhanced = 'true';
}
