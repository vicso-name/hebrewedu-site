import { gradeAnswer, gradeMatchPair, gradeMatchPairs } from './grading.mjs';
import { track } from '../analytics';

interface ChoiceKey { id: string; correctOptionId: string; options: { id: string }[] }
interface MatchPairsKey { id: string; type: 'MATCH_PAIRS'; pairs: { id: string }[] }
type Key = ChoiceKey | MatchPairsKey;
const isMatchPairsKey = (key: Key): key is MatchPairsKey => 'pairs' in key;

/** Runtime strings handed over by Practice.astro as JSON (#lesson-practice-strings),
 *  since this module can't import a per-locale dictionary. The English defaults
 *  below keep the module standalone-testable and are what every en page sends. */
interface PracticeStrings {
  progressTemplate: string;
  meterTemplate: string;
  overallScoreTemplate: string;
  resultsSummaryTemplate: string;
  skippedTemplate: string;
  noneSkipped: string;
  unavailableNoteTemplate: string;
  stageAnnouncementTemplate: string;
  stageNames: Record<string, string>;
  nextQuestion: string;
  seeResults: string;
  pairsAllMatched: string;
  pairsPartialTemplate: string;
  pairsNotAMatch: string;
  chooseFirst: string;
  answerCorrect: string;
  answerIncorrectWithExplanation: string;
  answerIncorrect: string;
  chooseAgain: string;
}

const DEFAULT_STRINGS: PracticeStrings = {
  progressTemplate: '{answered} of {total} available questions answered · {correct} correct',
  meterTemplate: '{answered} of {total} available questions answered',
  overallScoreTemplate: 'Overall score · correct answers out of {total} available questions',
  resultsSummaryTemplate: '{correct} correct out of {total} available questions. {attempted} attempted; {unanswered} unanswered.',
  skippedTemplate: 'Skipped questions: {list}.',
  noneSkipped: 'No questions were skipped.',
  unavailableNoteTemplate: ' Unavailable in this preview: {list}. These {count} questions are not scored.',
  stageAnnouncementTemplate: 'Step {step} of 4: {stage}',
  stageNames: { theory: 'Theory', examples: 'Examples', practice: 'Practice', results: 'Results' },
  nextQuestion: 'Next question',
  seeResults: 'See results',
  pairsAllMatched: 'All pairs matched. Well done!',
  pairsPartialTemplate: '{matched} of {total} pairs matched.',
  pairsNotAMatch: 'Not a match. Try again.',
  chooseFirst: 'Choose an answer first.',
  answerCorrect: 'Correct. Well done!',
  answerIncorrectWithExplanation: 'Not quite. Read the explanation, then retry or continue.',
  answerIncorrect: 'Not quite. Retry this question or continue.',
  chooseAgain: 'Choose an answer and check it again.',
};

/** Replaces {placeholder} tokens; an unknown token is left verbatim so a
 *  mistyped dictionary entry is visible rather than silently blank. */
export function fillTemplate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => (key in values ? String(values[key]) : match));
}

export function initPractice() {
  const container = document.querySelector<HTMLElement>('[data-practice]');
  const payload = document.getElementById('lesson-grading');
  if (!container || !payload) return;
  const stringsPayload = document.getElementById('lesson-practice-strings');
  let s = DEFAULT_STRINGS;
  if (stringsPayload) {
    try { s = { ...DEFAULT_STRINGS, ...JSON.parse(stringsPayload.textContent ?? '{}') }; } catch { /* keep defaults */ }
  }
  const letter = container.dataset.lessonLetter ?? 'unknown';
  const firedStages = new Set<string>();
  track('lesson_start', { letter });
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
    document.querySelector<HTMLElement>('[data-percentage-label]')!.textContent = fillTemplate(s.overallScoreTemplate, { total: availableCount });
    for (const [field, count] of Object.entries({ correct, attempted, incorrect: attempted - correct, unanswered: skippedCount })) {
      document.querySelector<HTMLElement>(`[data-result-${field}]`)!.textContent = String(count);
    }
    document.querySelector<HTMLElement>('[data-results-summary]')!.textContent = fillTemplate(s.resultsSummaryTemplate, { correct, total: availableCount, attempted, unanswered: skippedCount });
    const unavailable = forms.map((form, index) => form.dataset.unavailable ? index + 1 : null).filter(value => value !== null);
    const skipped = unanswered.filter(index => !unavailable.includes(index));
    document.querySelector<HTMLElement>('[data-unanswered-list]')!.textContent =
      (skipped.length ? fillTemplate(s.skippedTemplate, { list: skipped.join(', ') }) : s.noneSkipped) +
      (unavailable.length ? fillTemplate(s.unavailableNoteTemplate, { list: unavailable.join(', '), count: unavailable.length }) : '');
    document.querySelector<HTMLButtonElement>('[data-review-mistakes]')!.disabled = attempted === correct;
    document.querySelector<HTMLButtonElement>('[data-answer-unanswered]')!.hidden = skipped.length === 0;
    progress.textContent = fillTemplate(s.progressTemplate, { answered: attempted, total: availableCount, correct });
    meter.max = availableCount;
    meter.value = attempted;
    meter.textContent = fillTemplate(s.meterTemplate, { answered: attempted, total: availableCount });
  }
  // Each question's own forward button (`[data-advance]`) only becomes visible once that
  // question has been answered (or is marked unavailable, since it can't be answered at
  // all) — there is no "skip" path. It reads "See results" on the last question/review item.
  function refreshAdvance() {
    const form = forms[current];
    const index = reviewQueue ? reviewQueue.indexOf(current) : current;
    const total = reviewQueue?.length ?? forms.length;
    const last = index === total - 1;
    const unavailable = !!form.dataset.unavailable;
    const submitted = results.has(form.dataset.exerciseId!);
    const advance = form.querySelector<HTMLButtonElement>('[data-advance]')!;
    advance.hidden = !(unavailable || submitted);
    advance.querySelector<HTMLElement>('[data-advance-label]')!.textContent = last ? s.seeResults : s.nextQuestion;
  }
  function showQuestion(index: number, focus = true) {
    current = index;
    forms.forEach((form, i) => { form.hidden = i !== index; });
    refreshAdvance();
    if (focus) {
      const legend = forms[index].querySelector<HTMLElement>('legend, .unavailable-question')!;
      legend.tabIndex = -1;
      legend.focus();
    }
  }
  function advanceFromCurrent() {
    const index = reviewQueue ? reviewQueue.indexOf(current) : current;
    const total = reviewQueue?.length ?? forms.length;
    if (index === total - 1) { reviewQueue = null; showStage('results'); return; }
    showQuestion(reviewQueue ? reviewQueue[index + 1] : current + 1);
  }
  function showStage(target: string, focus = true) {
    const panel = panels.find(item => item.dataset.stage === target);
    if (!panel) return;
    stage = target;
    updateResults();
    if (!firedStages.has(target)) {
      firedStages.add(target);
      if (target === 'practice') track('practice_start', { letter });
      if (target === 'results') track('lesson_complete', { letter, score: [...results.values()].filter(Boolean).length, total: availableCount });
    }
    panels.forEach(item => { item.hidden = item !== panel; });
    document.querySelectorAll<HTMLButtonElement>('.stage-navigation button').forEach(button => {
      if (button.dataset.stageTarget === target) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
    announcement.textContent = fillTemplate(s.stageAnnouncementTemplate, { step: panels.indexOf(panel) + 1, stage: s.stageNames[target] ?? target });
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
      feedback.textContent = status === 'correct' ? s.pairsAllMatched : fillTemplate(s.pairsPartialTemplate, { matched: matchedCount, total });
      if (status === 'correct') {
        feedback.dataset.result = 'correct';
        if (explanation) explanation.hidden = false;
        results.set(key.id, true);
      }
      updateResults();
      refreshAdvance();
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
      refreshAdvance();
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
        feedback.textContent = s.pairsNotAMatch;
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
        feedback.textContent = s.chooseFirst;
        form.querySelector<HTMLInputElement>('input')!.focus();
        return;
      }
      results.set(key.id, result.correct);
      feedback.dataset.result = result.status;
      const explanation = form.querySelector<HTMLElement>('[data-explanation]');
      feedback.textContent = result.correct ? s.answerCorrect : (explanation ? s.answerIncorrectWithExplanation : s.answerIncorrect);
      if (explanation) explanation.hidden = false;
      form.querySelector<HTMLElement>('[data-retry]')!.hidden = result.correct;
      form.querySelector<HTMLButtonElement>('button[type="submit"]')!.hidden = true;
      form.querySelectorAll<HTMLInputElement>('input').forEach(input => { input.disabled = true; });
      updateResults();
      refreshAdvance();
      // A submitted choice is locked; hand focus to readable feedback before navigation.
      feedback.focus({ preventScroll: true });
    });
    form.querySelector<HTMLElement>('[data-retry]')!.addEventListener('click', () => {
      results.delete(key.id);
      clearForm(form);
      updateResults();
      refreshAdvance();
      feedback.textContent = s.chooseAgain;
      form.querySelector<HTMLInputElement>('input')!.focus();
    });
  });
  stageButtons.forEach(button => {
    button.disabled = false;
    button.addEventListener('click', () => showStage(button.dataset.stageTarget!));
  });
  forms.forEach(form => form.querySelector<HTMLButtonElement>('[data-advance]')!.addEventListener('click', advanceFromCurrent));
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
