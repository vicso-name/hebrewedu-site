import { gradeAnswer, gradeMatchPair, gradeMatchPairs } from './grading.mjs';

interface ChoiceKey { id: string; correctOptionId: string; options: { id: string }[] }
interface MatchPairsKey { id: string; type: 'MATCH_PAIRS'; pairs: { id: string }[] }
type Key = ChoiceKey | MatchPairsKey;
const isMatchPairsKey = (key: Key): key is MatchPairsKey => 'pairs' in key;

export function initPractice() {
  const container = document.querySelector<HTMLElement>('[data-practice]');
  const payload = document.getElementById('lesson-grading');
  if (!container || !payload) return;
  const keys: Key[] = JSON.parse(payload.textContent ?? '[]');
  const forms = Array.from(container.querySelectorAll<HTMLFormElement>('form'));
  const panels = Array.from(document.querySelectorAll<HTMLElement>('[data-stage]'));
  const stageButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-stage-target]'));
  const results = new Map<string, boolean>();
  // A MATCH_PAIRS form resets its own board (tap state) rather than a plain radio
  // reset; clearForm() looks here first so Retry/Retry-practice stay generic.
  const matchPairResets = new Map<HTMLFormElement, () => void>();
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
    const resetMatchPairs = matchPairResets.get(form);
    if (resetMatchPairs) { resetMatchPairs(); return; }
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
  // Tap/click one left item, then its pair on the right (order either way). A correct
  // tap locks both items; a wrong tap gives feedback and simply deselects (no retry
  // button needed — the board itself is always retryable). The whole exercise counts
  // as answered, like other exercises, only once every pair is matched.
  function initMatchPairs(form: HTMLFormElement, key: MatchPairsKey) {
    const buttons = Array.from(form.querySelectorAll<HTMLButtonElement>('.match-pairs-item'));
    const feedback = form.querySelector<HTMLElement>('[role="status"]')!;
    const explanation = form.querySelector<HTMLElement>('[data-explanation]');
    const matched = new Set<string>();
    let selected: HTMLButtonElement | null = null;

    function deselect(button: HTMLButtonElement) {
      button.setAttribute('aria-pressed', 'false');
      button.classList.remove('is-selected');
    }
    function announceProgress() {
      const { status, matched: matchedCount, total } = gradeMatchPairs(key, matched);
      feedback.textContent = status === 'correct' ? 'All pairs matched. Well done!' : `${matchedCount} of ${total} pairs matched.`;
      if (status === 'correct') {
        feedback.dataset.result = 'correct';
        if (explanation) explanation.hidden = false;
        results.set(key.id, true);
      }
      updateResults();
      updateNavigation();
    }
    function reset() {
      matched.clear();
      selected = null;
      buttons.forEach(button => { button.disabled = false; deselect(button); button.classList.remove('is-matched'); });
      feedback.textContent = '';
      delete feedback.dataset.result;
      if (explanation) explanation.hidden = true;
      results.delete(key.id);
      updateResults();
      updateNavigation();
    }
    matchPairResets.set(form, reset);

    buttons.forEach(button => button.addEventListener('click', () => {
      if (button.disabled) return;
      if (!selected) {
        selected = button;
        button.setAttribute('aria-pressed', 'true');
        button.classList.add('is-selected');
        return;
      }
      if (selected === button) { deselect(button); selected = null; return; }
      if (selected.dataset.pairSide === button.dataset.pairSide) {
        deselect(selected);
        selected = button;
        button.setAttribute('aria-pressed', 'true');
        button.classList.add('is-selected');
        return;
      }
      const left = selected.dataset.pairSide === 'left' ? selected : button;
      const right = selected.dataset.pairSide === 'left' ? button : selected;
      const result = gradeMatchPair(key, left.dataset.pairId!, right.dataset.pairId!);
      const previouslySelected = selected;
      selected = null;
      if (result.correct) {
        matched.add(left.dataset.pairId!);
        [left, right].forEach(el => { deselect(el); el.disabled = true; el.classList.add('is-matched'); });
        announceProgress();
      } else {
        feedback.dataset.result = 'incorrect';
        feedback.textContent = 'Not a match. Try again.';
        deselect(previouslySelected);
        [left, right].forEach(el => el.classList.add('is-wrong'));
        window.setTimeout(() => [left, right].forEach(el => el.classList.remove('is-wrong')), 500);
      }
    }));
  }
  forms.forEach(form => {
    if (form.dataset.unavailable) return;
    form.querySelector<HTMLElement>('[data-fallback-answer]')!.hidden = true;
    const key = keys.find(item => item.id === form.dataset.exerciseId)!;
    if (isMatchPairsKey(key)) { initMatchPairs(form, key); return; }
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
