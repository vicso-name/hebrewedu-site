// Client side of the verb lookup on /learn/hebrew-verbs/ (VerbsPage.astro).
// Free verbs are already in the page as <article data-verb-card>; this module
// shows one at a time, and for any other verb fills the single locked card from
// the headword index. It never has a locked verb's forms to show.
import { track } from '../analytics';
import { fillTemplate } from '../lessons/practice-client';
import { matchVerbs } from './search.mjs';

interface Entry { id: string; b: string; he: string; root: string; tr: string; free?: 1; tl?: string }
interface Strings {
  count: string; noResults: string; freeTag: string; appTag: string;
  lockedText: string; lockedMore: string;
  binyanName: Record<string, string>; binyanColor: Record<string, string>;
}

function hebrew(text: string): HTMLElement {
  const el = document.createElement('bdi');
  el.lang = 'he';
  el.dir = 'rtl';
  el.textContent = text;
  return el;
}

/** fillTemplate for a sentence whose {verb} must stay an isolated Hebrew run. */
function fillWithHebrew(target: HTMLElement, template: string, verb: string) {
  const [before, after = ''] = template.split('{verb}');
  target.replaceChildren(before, hebrew(verb), after);
}

export function initVerbExplorer(root: HTMLElement) {
  const s: Strings = JSON.parse(root.dataset.strings!);
  const entries: Entry[] = JSON.parse(root.parentElement!.querySelector('[data-verbs-index]')!.textContent!);
  const byId = new Map(entries.map(e => [e.id, e]));
  const freeCount = entries.filter(e => e.free).length;
  const input = root.querySelector<HTMLInputElement>('[data-verbs-q]')!;
  const filters = [...root.querySelectorAll<HTMLButtonElement>('[data-binyan]')];
  const count = root.querySelector<HTMLElement>('[data-verbs-count]')!;
  const list = root.querySelector<HTMLUListElement>('[data-verbs-list]')!;
  const detail = root.querySelector<HTMLElement>('[data-verbs-detail]')!;
  const cards = [...root.querySelectorAll<HTMLElement>('[data-verb-card]')];
  const locked = root.querySelector<HTMLElement>('[data-verb-locked]')!;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let binyan = '';
  let current = '';

  root.querySelectorAll<HTMLElement>('[data-verbs-js]').forEach(el => { el.hidden = false; });
  root.querySelectorAll<HTMLElement>('[data-verbs-nojs]').forEach(el => { el.hidden = true; });

  const countText = (hits: Entry[]) => hits.length ? fillTemplate(s.count, { shown: hits.length, free: hits.filter(e => e.free).length }) : s.noResults;

  /** One row of the verb list (also used by the hero's suggestions). */
  function item(e: Entry) {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'verbs-item';
    button.dataset.id = e.id;
    button.style.setProperty('--b', s.binyanColor[e.b]);
    const dot = document.createElement('span');
    dot.className = 'verbs-item-dot';
    dot.setAttribute('aria-hidden', 'true');
    const he = hebrew(e.he);
    he.className = 'verbs-item-he';
    const tr = document.createElement('span');
    tr.className = 'verbs-item-tr';
    tr.textContent = e.tr;
    const tag = document.createElement('span');
    tag.className = `verbs-item-tag verbs-item-tag--${e.free ? 'free' : 'app'}`;
    tag.textContent = e.free ? s.freeTag : s.appTag;
    button.append(dot, he, tr, tag);
    li.append(button);
    return li;
  }

  function render() {
    const hits = matchVerbs(entries, input.value, binyan);
    count.textContent = countText(hits);
    list.replaceChildren(...hits.map(e => {
      const li = item(e);
      if (e.id === current) li.firstElementChild!.setAttribute('aria-current', 'true');
      return li;
    }));
  }

  function fillLocked(e: Entry) {
    locked.style.setProperty('--b', s.binyanColor[e.b]);
    locked.querySelector('[data-locked-binyan]')!.textContent = s.binyanName[e.b];
    locked.querySelector('[data-locked-he]')!.textContent = e.he;
    locked.querySelector('[data-locked-tr]')!.textContent = e.tr;
    locked.querySelector('[data-locked-root]')!.textContent = [...e.root].join('־');
    fillWithHebrew(locked.querySelector<HTMLElement>('[data-locked-text]')!, s.lockedText, e.he);
    locked.querySelector('[data-locked-more-label]')!.textContent = fillTemplate(s.lockedMore, { binyan: s.binyanName[e.b] });
    locked.querySelector('[data-locked-more]')!.replaceChildren(...entries.filter(f => f.free && f.b === e.b).map(f => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#v-${f.id}`;
      a.dataset.verbLink = f.id;
      const he = hebrew(f.he);
      he.className = 'verb-locked-link-he';
      const tr = document.createElement('span');
      tr.className = 'verb-locked-link-tr';
      tr.textContent = f.tr;
      const arrow = document.createElement('span');
      arrow.className = 'verb-locked-link-go';
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '→';
      a.append(he, tr, arrow);
      li.append(a);
      return li;
    }));
  }

  function select(id: string, opts: { user?: boolean; scroll?: boolean; hash?: boolean } = {}) {
    const e = byId.get(id);
    if (!e) return false;
    current = id;
    cards.forEach(card => { card.hidden = card.dataset.verbCard !== id; });
    if (!e.free) fillLocked(e);
    locked.hidden = Boolean(e.free);
    list.querySelectorAll<HTMLElement>('[data-id]').forEach(b => {
      if (b.dataset.id === id) b.setAttribute('aria-current', 'true');
      else b.removeAttribute('aria-current');
    });
    if (opts.hash) history.replaceState(null, '', `#v-${id}`);
    if (opts.user) track('verb_view', { verb: id, binyan: e.b, locked: !e.free });
    if (opts.scroll) {
      const top = detail.getBoundingClientRect().top;
      if (top < 0 || top > window.innerHeight * 0.6) detail.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
      detail.focus({ preventScroll: true });
    }
    return true;
  }

  input.addEventListener('input', render);
  root.querySelector('form')!.addEventListener('submit', event => {
    event.preventDefault();
    const first = list.querySelector<HTMLElement>('[data-id]');
    if (first) select(first.dataset.id!, { user: true, scroll: true, hash: true });
  });
  filters.forEach(button => button.addEventListener('click', () => {
    binyan = button.dataset.binyan!;
    filters.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    render();
  }));
  list.addEventListener('click', event => {
    const button = (event.target as HTMLElement).closest<HTMLElement>('[data-id]');
    if (button) select(button.dataset.id!, { user: true, scroll: window.matchMedia('(max-width: 899px)').matches, hash: true });
  });
  // Chart rows, hero root pairs and the locked card's suggestions all link to #v-<id>.
  document.addEventListener('click', event => {
    const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[data-verb-link]');
    if (!link || !byId.has(link.dataset.verbLink!)) return;
    event.preventDefault();
    select(link.dataset.verbLink!, { user: true, scroll: true, hash: true });
  });
  window.addEventListener('hashchange', () => {
    const id = location.hash.replace(/^#v-/, '');
    if (location.hash.startsWith('#v-') && id !== current) select(id, { user: true, scroll: true });
  });

  // The hero search box is a shortcut into this lookup: live suggestions from the
  // same index, and Enter opens the first match. The query carries over to the
  // list, so scrolling down shows the same results.
  const hero = document.querySelector<HTMLFormElement>('[data-verbs-hero-search]');
  if (hero) {
    const heroInput = hero.querySelector('input')!;
    const suggest = hero.querySelector<HTMLUListElement>('[data-verbs-suggest]')!;
    const close = () => { suggest.hidden = true; };
    const toList = () => {
      input.value = heroInput.value;
      binyan = '';
      filters.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.binyan === '')));
      render();
    };
    const showList = () => {
      toList();
      close();
      root.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    };
    const open = (id: string) => {
      toList();
      close();
      select(id, { user: true, scroll: true, hash: true });
    };
    hero.hidden = false;
    heroInput.addEventListener('input', () => {
      const q = heroInput.value.trim();
      const hits = q ? matchVerbs(entries, q, '') : [];
      suggest.replaceChildren(...hits.slice(0, 5).map(item));
      if (q && hits.length !== 1) {
        const li = document.createElement('li');
        const more = document.createElement('button');
        more.type = 'button';
        more.className = 'verbs-suggest-more';
        more.textContent = hits.length ? `${countText(hits)} ↓` : s.noResults;
        li.append(more);
        suggest.append(li);
      }
      suggest.hidden = !q;
    });
    hero.addEventListener('submit', event => {
      event.preventDefault();
      const first = suggest.querySelector<HTMLElement>('[data-id]');
      if (first && heroInput.value.trim()) open(first.dataset.id!);
      else if (heroInput.value.trim()) showList();
    });
    suggest.addEventListener('click', event => {
      const button = (event.target as HTMLElement).closest<HTMLElement>('button');
      if (button?.dataset.id) open(button.dataset.id);
      else if (button) showList();
    });
    hero.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
    // Click, not focusout: iOS Safari does not focus a tapped button, so a
    // focusout would hide the list before the tap lands.
    document.addEventListener('click', event => { if (!hero.contains(event.target as Node)) close(); });
    document.addEventListener('focusin', event => { if (!hero.contains(event.target as Node)) close(); });
    heroInput.addEventListener('focus', () => { if (heroInput.value.trim()) suggest.hidden = false; });
  }

  render();
  const fromHash = location.hash.startsWith('#v-') && select(location.hash.slice(3), { scroll: true });
  if (!fromHash) select(root.dataset.default!);
}
