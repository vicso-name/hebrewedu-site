// Client side of the Hebrew cursive tool (CursivePage.astro): the converter
// (typing, letter pad, example words, ?text= share links, save as image), the
// tracer (a canvas over the model letter) and the printable sheets. Strings
// come from the page's data-cursive-strings payload; the module carries no
// language of its own (docs/I18N.md).
import { track } from '../analytics';

interface Letter { id: string; he: string; name: string; href: string | null }
interface Strings {
  linkCopied: string;
  downloadFile: string;
  canvasTemplate: string;
  lessonTemplate: string;
  sheetTitle: string;
  sheetChartTitle: string;
  sheetFooter: string;
  lang: string;
  font: string;
  letters: Letter[];
}

const MAX_LENGTH = 40;
const LATIN = /[A-Za-z]/;
const CURSIVE_FONT = '"Hebrew Cursive"';

const fill = (template: string, values: Record<string, string>) => template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? '');
const escapeHtml = (text: string) => text.replace(/[&<>"']/g, ch => `&#${ch.charCodeAt(0)};`);

/** Text the converter accepts: trimmed to the input's own limit, line breaks flattened. */
export function cleanText(text: string): string {
  return [...text.replace(/\s+/g, ' ')].slice(0, MAX_LENGTH).join('');
}

/** Distinct letters of `text` in reading order, from the known alphabet only. */
export function lettersIn(text: string, letters: Letter[]): Letter[] {
  const byHe = new Map(letters.map(l => [l.he, l]));
  const seen = new Set<string>();
  const out: Letter[] = [];
  for (const ch of text) {
    const letter = byHe.get(ch);
    if (letter && !seen.has(ch)) { seen.add(ch); out.push(letter); }
  }
  return out;
}

export function initCursivePage(root: HTMLElement): void {
  const s: Strings = JSON.parse(root.dataset.cursiveStrings ?? '{}');
  document.querySelectorAll<HTMLElement>('[data-cursive-js]').forEach(el => { el.hidden = false; });
  document.querySelectorAll<HTMLElement>('[data-cursive-nojs]').forEach(el => { el.hidden = true; });
  const converter = initConverter(s);
  initTracer(s);
  document.querySelectorAll<HTMLButtonElement>('[data-cursive-sheet]').forEach(button => {
    button.addEventListener('click', () => {
      const kind = button.dataset.cursiveSheet as 'letters' | 'word' | 'chart';
      printSheet(kind, s, converter.text());
      track('cursive_print', { sheet: kind });
    });
  });
}

function initConverter(s: Strings) {
  const input = document.querySelector<HTMLInputElement>('[data-cursive-input]')!;
  const output = document.querySelector<HTMLElement>('[data-cursive-output]')!;
  const print = document.querySelector<HTMLElement>('[data-cursive-print]')!;
  const hint = document.querySelector<HTMLElement>('[data-cursive-hint]')!;
  const breakdown = document.querySelector<HTMLElement>('[data-cursive-breakdown]')!;
  const status = document.querySelector<HTMLElement>('[data-cursive-status]')!;
  let urlTimer = 0;
  let trackTimer = 0;
  let lastTracked = '';

  const text = () => cleanText(input.value).trim();

  function renderBreakdown(value: string) {
    breakdown.replaceChildren(...lettersIn(value, s.letters).map(letter => {
      const li = document.createElement('li');
      for (const [cls, content, lang] of [['cursive-tile-glyph', letter.he, 'he'], ['cursive-tile-print', letter.he, 'he'], ['cursive-tile-name', letter.name, '']]) {
        const span = document.createElement('span');
        span.className = cls;
        span.textContent = content;
        if (lang) span.lang = lang;
        li.append(span);
      }
      return li;
    }));
  }

  function render() {
    const value = text();
    output.textContent = value;
    print.textContent = value;
    hint.hidden = !LATIN.test(value);
    renderBreakdown(value);
    window.clearTimeout(urlTimer);
    urlTimer = window.setTimeout(() => {
      const url = new URL(window.location.href);
      if (value) url.searchParams.set('text', value); else url.searchParams.delete('text');
      history.replaceState(history.state, '', url);
    }, 400);
    window.clearTimeout(trackTimer);
    trackTimer = window.setTimeout(() => {
      // Length only: the event never carries what the reader typed.
      if (value && value !== lastTracked) { lastTracked = value; track('cursive_convert', { length: [...value].length }); }
    }, 1500);
  }

  const shared = new URL(window.location.href).searchParams.get('text');
  if (shared) { input.value = cleanText(shared); render(); }
  input.addEventListener('input', render);
  document.querySelector('[data-cursive-form]')?.addEventListener('submit', event => { event.preventDefault(); input.blur(); });

  document.querySelectorAll<HTMLAnchorElement>('[data-cursive-example]').forEach((link, index) => {
    link.addEventListener('click', event => {
      event.preventDefault();
      input.value = link.dataset.cursiveExample ?? '';
      render();
      document.getElementById('converter')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      track('cursive_example', { index });
    });
  });

  // The pad types at the caret without focusing the field, so a phone's own
  // keyboard doesn't open over the letters.
  document.querySelectorAll<HTMLButtonElement>('[data-cursive-key]').forEach(key => {
    key.addEventListener('click', () => {
      if ([...input.value].length >= MAX_LENGTH) return;
      const start = input.selectionStart ?? input.value.length;
      const end = input.selectionEnd ?? input.value.length;
      input.setRangeText(key.dataset.cursiveKey ?? '', start, end, 'end');
      render();
    });
  });
  document.querySelector('[data-cursive-back]')?.addEventListener('click', () => {
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? input.value.length;
    if (start !== end) input.setRangeText('', start, end, 'end');
    else if (start > 0) {
      const before = [...input.value.slice(0, start)];
      before.pop();
      const cut = before.join('').length;
      input.setRangeText('', cut, start, 'end');
    }
    render();
  });

  let statusTimer = 0;
  document.querySelector('[data-cursive-copy]')?.addEventListener('click', async () => {
    window.clearTimeout(urlTimer);
    const url = new URL(window.location.href);
    url.hash = '';
    if (text()) url.searchParams.set('text', text());
    try {
      await navigator.clipboard.writeText(url.toString());
      status.textContent = s.linkCopied;
      window.clearTimeout(statusTimer);
      statusTimer = window.setTimeout(() => { status.textContent = ''; }, 2500);
      track('cursive_copy_link');
    } catch { /* clipboard refused: the address bar already holds the link */ }
  });

  document.querySelector('[data-cursive-download]')?.addEventListener('click', async () => {
    const value = text();
    if (!value) return;
    const blob = await renderImage(value);
    if (!blob) return;
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${s.downloadFile}.png`;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(link.href), 10_000);
    track('cursive_download', { length: [...value].length });
  });

  return { text };
}

/** The word in cursive on white, with the site's address in small print. */
async function renderImage(text: string): Promise<Blob | null> {
  const size = 140;
  await document.fonts.load(`${size}px ${CURSIVE_FONT}`, text);
  const scale = 2;
  const measure = document.createElement('canvas').getContext('2d')!;
  measure.font = `${size}px ${CURSIVE_FONT}`;
  const width = Math.ceil(Math.max(measure.measureText(text).width + size, 480));
  const height = Math.round(size * 2.1);
  const canvas = document.createElement('canvas');
  canvas.width = width * scale;
  canvas.height = height * scale;
  const ctx = canvas.getContext('2d')!;
  ctx.scale(scale, scale);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = '#1F2937';
  ctx.font = `${size}px ${CURSIVE_FONT}`;
  ctx.direction = 'rtl';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(text, width / 2, size * 1.25);
  ctx.direction = 'ltr';
  ctx.fillStyle = '#9CA3AF';
  ctx.font = '600 15px "DM Sans", sans-serif';
  ctx.fillText('hebrewedu.com', width / 2, height - 18);
  return new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
}

function initTracer(s: Strings) {
  const canvas = document.querySelector<HTMLCanvasElement>('[data-cursive-canvas]');
  if (!canvas) return;
  const model = document.querySelector<HTMLElement>('[data-cursive-model]')!;
  const name = document.querySelector<HTMLElement>('[data-cursive-trace-name]')!;
  const lesson = document.querySelector<HTMLAnchorElement>('[data-cursive-lesson]')!;
  const guide = document.querySelector<HTMLCanvasElement>('[data-cursive-guide]')!;
  const picks = [...document.querySelectorAll<HTMLButtonElement>('[data-cursive-pick]')];
  const ctx = canvas.getContext('2d')!;
  const gctx = guide.getContext('2d')!;
  const traced = new Set<string>();
  let index = 0;
  let drawing = false;
  let showModel = true;

  function size() {
    const rect = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    for (const [el, c] of [[canvas, ctx], [guide, gctx]] as const) {
      el.width = Math.round(rect.width * ratio);
      el.height = Math.round(rect.height * ratio);
      c.setTransform(ratio, 0, 0, ratio, 0, 0);
    }
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = getComputedStyle(canvas).color;
    ctx.lineWidth = Math.max(6, rect.height * 0.035);
    drawGuide();
  }
  const clear = () => ctx.clearRect(0, 0, canvas.width, canvas.height);

  // The model letter sits on a real baseline at 70% of the height, with a
  // dashed line at the height of a body letter (about 0.6 em in this font).
  // With the font at 0.62 × the height, the tallest letters (ף ץ, ~1.03 em)
  // and the deepest (ך ן, ~0.37 em) both stay inside the box.
  function drawGuide() {
    const { width, height } = guide.getBoundingClientRect();
    const style = getComputedStyle(guide);
    const size = height * 0.62;
    const baseline = Math.round(height * 0.7) + 0.5;
    const bodyTop = Math.round(baseline - size * 0.6) + 0.5;
    gctx.clearRect(0, 0, guide.width, guide.height);
    gctx.strokeStyle = style.getPropertyValue('--trace-line').trim() || style.color;
    gctx.lineWidth = 2;
    gctx.setLineDash([]);
    gctx.beginPath(); gctx.moveTo(0, baseline); gctx.lineTo(width, baseline); gctx.stroke();
    gctx.strokeStyle = style.color;
    gctx.lineWidth = 1;
    gctx.setLineDash([8, 8]);
    gctx.beginPath(); gctx.moveTo(0, bodyTop); gctx.lineTo(width, bodyTop); gctx.stroke();
    if (!showModel) return;
    gctx.fillStyle = style.color;
    gctx.font = `${size}px ${CURSIVE_FONT}`;
    gctx.direction = 'rtl';
    gctx.textAlign = 'center';
    gctx.textBaseline = 'alphabetic';
    gctx.fillText(s.letters[index].he, width / 2, baseline);
  }

  function select(next: number, user = false) {
    index = (next + s.letters.length) % s.letters.length;
    const letter = s.letters[index];
    model.textContent = letter.he;
    drawGuide();
    name.textContent = letter.name;
    canvas.setAttribute('aria-label', fill(s.canvasTemplate, { name: letter.name }));
    picks.forEach((pick, i) => pick.setAttribute('aria-pressed', String(i === index)));
    lesson.hidden = !letter.href;
    if (letter.href) {
      lesson.href = letter.href;
      lesson.firstChild!.textContent = `${fill(s.lessonTemplate, { name: letter.name })} `;
    }
    clear();
    if (user) picks[index]?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }

  const point = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    return [event.clientX - rect.left, event.clientY - rect.top] as const;
  };
  canvas.addEventListener('pointerdown', event => {
    drawing = true;
    canvas.setPointerCapture(event.pointerId);
    const [x, y] = point(event);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 0.01, y);
    ctx.stroke();
    const id = s.letters[index].id;
    if (!traced.has(id)) { traced.add(id); track('cursive_trace', { letter: id }); }
  });
  canvas.addEventListener('pointermove', event => {
    if (!drawing) return;
    const [x, y] = point(event);
    ctx.lineTo(x, y);
    ctx.stroke();
  });
  const stop = () => { drawing = false; };
  canvas.addEventListener('pointerup', stop);
  canvas.addEventListener('pointercancel', stop);

  picks.forEach((pick, i) => pick.addEventListener('click', () => select(i)));
  document.querySelector('[data-cursive-prev]')?.addEventListener('click', () => select(index - 1, true));
  document.querySelector('[data-cursive-next]')?.addEventListener('click', () => select(index + 1, true));
  document.querySelector('[data-cursive-clear]')?.addEventListener('click', clear);
  document.querySelector<HTMLInputElement>('[data-cursive-model-toggle]')?.addEventListener('change', event => {
    showModel = (event.currentTarget as HTMLInputElement).checked;
    drawGuide();
  });
  // A chart card jumps to #practice on its own; this sets the letter first.
  document.querySelectorAll<HTMLAnchorElement>('[data-cursive-practice]').forEach(card => {
    card.addEventListener('click', () => select(Number(card.dataset.cursivePractice), true));
  });

  // The static model is the no-JS fallback; from here the guide canvas draws it.
  model.hidden = true;
  size();
  document.fonts.load(`40px ${CURSIVE_FONT}`, s.letters.map(l => l.he).join('')).then(drawGuide, () => {});
  let width = canvas.getBoundingClientRect().width;
  new ResizeObserver(() => {
    const next = canvas.getBoundingClientRect().width;
    if (Math.abs(next - width) > 1) { width = next; size(); }
  }).observe(canvas);
}

/** Opens a printable A4 sheet in a new tab and starts printing once the font is in.
 *  Rows read right to left: the model first, then grey copies to trace. Before
 *  printing, the sheet measures where the font's baseline falls in a row (a
 *  zero-size inline-block sits on it) and shifts the letters down onto the
 *  ruled line, whatever metrics the browser applies. */
function printSheet(kind: 'letters' | 'word' | 'chart', s: Strings, word: string) {
  const fontUrl = new URL(s.font, window.location.href).href;
  const title = kind === 'chart' ? s.sheetChartTitle : s.sheetTitle;
  const row = (label: string, model: string, traces: number) => `<div class="row"><span class="label">${escapeHtml(label)}</span><span class="cells"><span class="model">${escapeHtml(model)}</span>${`<span class="trace">${escapeHtml(model)}</span>`.repeat(traces)}</span></div>`;
  let body = '';
  if (kind === 'letters') body = s.letters.map(l => row(l.name, l.he, 6)).join('');
  if (kind === 'word') {
    // A model line, four lines to trace, five blank lines to write it alone.
    // Each line repeats the word as often as it fits (~26 letters a line).
    const raw = word || s.letters[0].he;
    const text = escapeHtml(raw);
    const copies = Math.max(1, Math.min(6, Math.floor(26 / ([...raw].length + 2))));
    const span = (cls: string) => `<span class="${cls}">${text}</span>`;
    const line = (first: string) => `<div class="row"><span class="cells">${span(first)}${span('trace').repeat(copies - 1)}</span></div>`;
    body = line('model') + line('trace').repeat(4) + '<div class="row"></div>'.repeat(5);
  }
  if (kind === 'chart') body = `<div class="chart">${s.letters.map(l => `<div><b>${l.he}</b><i>${l.he}</i><small>${escapeHtml(l.name)}</small></div>`).join('')}</div>`;

  const html = `<!doctype html><html lang="${s.lang}"><head><meta charset="utf-8"><title>${escapeHtml(title)}</title><style>
@font-face{font-family:HC;src:url("${fontUrl}") format("woff2")}
@page{size:A4;margin:14mm}
*{box-sizing:border-box}
body{margin:0;font-family:system-ui,-apple-system,"Segoe UI",sans-serif;color:#1F2937}
h1{font-size:15pt;margin:0 0 6mm}
.row{display:flex;align-items:flex-end;gap:4mm;height:19mm;border-bottom:.35mm solid #9CA3AF;margin-bottom:3mm;break-inside:avoid}
.label{width:22mm;flex:none;font-size:8.5pt;color:#6B7280;align-self:center}
.cells{flex:1;display:flex;gap:5mm;direction:rtl;font:30pt/1.3 HC;white-space:nowrap;overflow:hidden;transform:translateY(var(--shift,0px))}
.model{color:#1F2937}.trace{color:#D1D5DB}
.chart{display:grid;grid-template-columns:repeat(6,1fr);gap:3mm;direction:rtl}
.chart div{border:.3mm solid #D1D5DB;border-radius:2mm;text-align:center;padding:2mm 1mm;break-inside:avoid}
.chart b{display:block;font:38pt/1.35 HC;font-weight:400}.chart i{display:block;font-style:normal;font-size:15pt}
.chart small{display:block;direction:ltr;font-size:7.5pt;color:#6B7280;margin-top:1mm}
footer{margin-top:6mm;font-size:8pt;color:#9CA3AF}
</style></head><body><h1>${escapeHtml(title)}</h1>${body}<footer>${escapeHtml(s.sheetFooter)}</footer>
<script>document.fonts.load('30pt HC','א').then(function(){return document.fonts.ready}).then(function(){
var c=document.querySelector('.cells');if(c&&c.firstElementChild){var m=document.createElement('i');m.style.cssText='display:inline-block;width:0;height:0;vertical-align:baseline';c.firstElementChild.appendChild(m);
document.documentElement.style.setProperty('--shift',(c.getBoundingClientRect().bottom-m.getBoundingClientRect().top)+'px');m.remove()}
setTimeout(function(){window.print()},150)})<\/script></body></html>`;
  const url = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
  // A blocked pop-up falls back to printing from a hidden frame, so the page
  // itself is never navigated away from.
  if (!window.open(url, '_blank')) {
    const frame = document.createElement('iframe');
    frame.title = title;
    frame.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0';
    frame.src = url;
    document.body.append(frame);
    window.setTimeout(() => frame.remove(), 60_000);
  }
  window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
}
