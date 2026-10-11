import { gradeAnswer } from './grading.mjs';

interface Key { id: string; correctOptionId: string; options: { id: string }[] }
export function initPractice() {
  const container = document.querySelector<HTMLElement>('[data-practice]');
  const payload = document.getElementById('lesson-grading');
  if (!container || !payload) return;
  const keys: Key[] = JSON.parse(payload.textContent ?? '[]');
  const forms = Array.from(container.querySelectorAll<HTMLFormElement>('form'));
  const panels = Array.from(document.querySelectorAll<HTMLElement>('[data-stage]'));
  const stageButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-stage-target]'));
  const results = new Map<string, boolean>();
  const availableCount = forms.filter(form => !form.dataset.unavailable).length;
  const progress = document.querySelector<HTMLElement>('[data-progress]')!;
  const meter = document.querySelector<HTMLProgressElement>('[data-practice-progress]')!;
  const previous = document.querySelector<HTMLButtonElement>('[data-previous]')!;
  const next = document.querySelector<HTMLButtonElement>('[data-next]')!;
  const position = document.querySelector<HTMLElement>('[data-question-position]')!;
  const announcement = document.querySelector<HTMLElement>('[data-stage-announcement]')!;
  let current = 0;
  let reviewQueue: number[] | null = null;
  let stage = 'theory';

  function updateResults() {
    const correct = [...results.values()].filter(Boolean).length;
    const attempted = results.size;
    const unanswered = forms.map((form, index) => results.has(form.dataset.exerciseId!) ? null : index + 1).filter(value => value !== null);
    const skippedCount = availableCount - attempted;
    document.querySelector<HTMLElement>('[data-result-percentage]')!.textContent = `${Math.round(correct / availableCount * 100)}%`;
    document.querySelector<HTMLElement>('[data-percentage-label]')!.textContent = `Overall score · correct answers out of ${availableCount} available questions`;
    for (const [field, count] of Object.entries({ correct, attempted, incorrect: attempted - correct, unanswered: skippedCount })) {
      document.querySelector<HTMLElement>(`[data-result-${field}]`)!.textContent = String(count);
    }
    document.querySelector<HTMLElement>('[data-results-summary]')!.textContent = `${correct} correct out of ${availableCount} available questions. ${attempted} attempted; ${skippedCount} unanswered.`;
    const unavailable = forms.map((form, index) => form.dataset.unavailable ? index + 1 : null).filter(value => value !== null);
    const skipped = unanswered.filter(index => !unavailable.includes(index));
    document.querySelector<HTMLElement>('[data-unanswered-list]')!.textContent = `${skipped.length ? `Skipped questions: ${skipped.join(', ')}.` : 'No questions were skipped.'}${unavailable.length ? ` Unavailable in this preview: ${unavailable.join(', ')}. These ${unavailable.length} questions are not scored.` : ''}`;
    document.querySelector<HTMLButtonElement>('[data-review-mistakes]')!.disabled = attempted === correct;
    document.querySelector<HTMLButtonElement>('[data-answer-unanswered]')!.hidden = skipped.length === 0;
    progress.textContent = `${attempted} of ${availableCount} available questions answered · ${correct} correct`;
    meter.max = availableCount;
    meter.value = attempted;
    meter.textContent = `${attempted} of ${availableCount} available questions answered`;
  }
  function updateNavigation() {
    const index = reviewQueue ? reviewQueue.indexOf(current) : current;
    const total = reviewQueue?.length ?? forms.length;
    const last = index === total - 1;
    const submitted = results.has(forms[current].dataset.exerciseId!);
    previous.textContent = index === 0 ? (reviewQueue ? 'Back: Results' : 'Back: Examples') : 'Previous question';
    const unavailable = !!forms[current].dataset.unavailable;
    next.textContent = last ? ((submitted || unavailable) ? 'View results →' : 'Skip & view results →') : ((submitted || unavailable) ? (reviewQueue ? 'Next review question →' : 'Next question →') : 'Skip question →');
    next.classList.toggle('lesson-primary', submitted || unavailable);
    next.classList.toggle('lesson-secondary', !submitted && !unavailable);
    position.textContent = `${reviewQueue ? `Review ${index + 1} of ${total} · ` : ''}Question ${current + 1} of ${forms.length}`;
  }
  function showQuestion(index: number, focus = true) {
    current = index;
    forms.forEach((form, i) => { form.hidden = i !== index; });
    updateNavigation();
    if (focus) {
      const legend = forms[index].querySelector<HTMLElement>('legend, .unavailable-question')!;
      legend.tabIndex = -1;
      legend.focus();
    }
  }
  function showStage(target: string, focus = true) {
    const panel = panels.find(item => item.dataset.stage === target);
    if (!panel) return;
    stage = target;
    updateResults();
    panels.forEach(item => { item.hidden = item !== panel; });
    document.querySelectorAll<HTMLButtonElement>('.stage-navigation button').forEach(button => {
      if (button.dataset.stageTarget === target) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
    announcement.textContent = `Step ${panels.indexOf(panel) + 1} of 4: ${target[0].toUpperCase() + target.slice(1)}`;
    if (focus) {
      const heading = panel.querySelector<HTMLElement>('[data-stage-heading]')!;
      heading.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }
  function clearForm(form: HTMLFormElement) {
    if (form.dataset.unavailable) return;
    form.reset();
    form.querySelectorAll<HTMLInputElement>('input').forEach(input => { input.disabled = false; });
    const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
    submit.hidden = false;
    submit.disabled = false;
    form.querySelector<HTMLElement>('[data-retry]')!.hidden = true;
    const explanation = form.querySelector<HTMLElement>('[data-explanation]');
    if (explanation) explanation.hidden = true;
    const feedback = form.querySelector<HTMLElement>('[role="status"]')!;
    feedback.textContent = '';
    delete feedback.dataset.result;
  }
  forms.forEach(form => {
    if (form.dataset.unavailable) return;
    form.querySelector<HTMLElement>('[data-fallback-answer]')!.hidden = true;
    const key = keys.find(item => item.id === form.dataset.exerciseId)!;
    const feedback = form.querySelector<HTMLElement>('[role="status"]')!;
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (results.has(key.id)) return;
      const selected = form.querySelector<HTMLInputElement>('input:checked')?.value;
      const result = gradeAnswer(key, selected);
      if (result.status === 'unanswered') {
        feedback.textContent = 'Choose an answer first.';
        form.querySelector<HTMLInputElement>('input')!.focus();
        return;
      }
      results.set(key.id, result.correct);
      feedback.dataset.result = result.status;
      const explanation = form.querySelector<HTMLElement>('[data-explanation]');
      feedback.textContent = result.correct ? 'Correct. Well done!' : (explanation ? 'Not quite. Read the explanation, then retry or continue.' : 'Not quite. Retry this question or continue.');
      if (explanation) explanation.hidden = false;
      form.querySelector<HTMLElement>('[data-retry]')!.hidden = result.correct;
      form.querySelector<HTMLButtonElement>('button[type="submit"]')!.hidden = true;
      form.querySelectorAll<HTMLInputElement>('input').forEach(input => { input.disabled = true; });
      updateResults();
      updateNavigation();
      // A submitted choice is locked; hand focus to readable feedback before navigation.
      feedback.focus({ preventScroll: true });
    });
    form.querySelector<HTMLElement>('[data-retry]')!.addEventListener('click', () => {
      results.delete(key.id);
      clearForm(form);
      updateResults();
      updateNavigation();
      feedback.textContent = 'Choose an answer and check it again.';
      form.querySelector<HTMLInputElement>('input')!.focus();
    });
  });
  stageButtons.forEach(button => {
    button.disabled = false;
    button.addEventListener('click', () => showStage(button.dataset.stageTarget!));
  });
  previous.addEventListener('click', () => {
    const index = reviewQueue ? reviewQueue.indexOf(current) : current;
    if (index === 0) showStage(reviewQueue ? 'results' : 'examples');
    else showQuestion(reviewQueue ? reviewQueue[index - 1] : current - 1);
  });
  next.addEventListener('click', () => {
    const index = reviewQueue ? reviewQueue.indexOf(current) : current;
    const total = reviewQueue?.length ?? forms.length;
    if (index === total - 1) { reviewQueue = null; showStage('results'); }
    else showQuestion(reviewQueue ? reviewQueue[index + 1] : current + 1);
  });
  function startReview(wrongOnly: boolean) {
    reviewQueue = forms.map((form, index) => !form.dataset.unavailable && (wrongOnly ? results.get(form.dataset.exerciseId!) === false : !results.has(form.dataset.exerciseId!)) ? index : -1).filter(index => index >= 0);
    if (!reviewQueue.length) { reviewQueue = null; return; }
    showQuestion(reviewQueue[0], false);
    showStage('practice');
  }
  document.querySelector<HTMLElement>('[data-review-mistakes]')!.addEventListener('click', () => startReview(true));
  document.querySelector<HTMLElement>('[data-answer-unanswered]')!.addEventListener('click', () => startReview(false));
  document.querySelector<HTMLElement>('[data-retry-practice]')!.addEventListener('click', () => {
    forms.forEach(clearForm);
    results.clear();
    reviewQueue = null;
    showQuestion(0, false);
    showStage('practice');
  });
  document.querySelectorAll<HTMLElement>('[data-enhanced]').forEach(item => { item.hidden = false; });
  showQuestion(0, false);
  // Submit/retry visibility was initialized by SSR; leave it intact.
  forms.forEach(form => { const retry = form.querySelector<HTMLElement>('[data-retry]'); if (retry) retry.hidden = true; });
  showStage(stage, false);
}
