# Hebrew phrases page — hero and "How to use" redesign

Page: `hebrewedu.com/learn/hebrew-phrases/`. Covers the first two sections only: `section.phrases-hero` and `section#how-to-use`.
Reference build: `hero-guide.html`. It is standalone and uses the real `global.css` tokens and the PhraseCard as it ships. Two 360px frames sit at the bottom.

**Chosen directions**
- **H-A · Card deck** (hero): three real PhraseCards stacked on a light indigo panel, with five situation tiles below.
- **G-B · Numbered anatomy** (guide): one real PhraseCard with numbered markers, plus a numbered legend beside it.

**Rejected directions** (both in the design system preview):
- **H-B · Situation board** puts five navigation rows with a Hebrew sample in the right column. It is useful, but no PhraseCard appears above the fold.
- **G-A · Callout lines** puts labels on both sides with leader lines. It needs JS measurement and still collapses to a list on mobile.

---

## 1. Status labels

| Label | Meaning |
|---|---|
| **EXISTING** | A token from `global.css`, or an unchanged class from `hebrew-phrases.css`. Use it as is. |
| **PROPOSED** | A new token or class introduced by this redesign. |

Every colour and length below names its token. No new colours are introduced. The only new token, `--brand-line`, gives a name to a hex value the page already hard-codes.

---

## 2. Tokens used

| Token | Value | Status | Used here for |
|---|---|---|---|
| `--white` | #FFFFFF | EXISTING | Hero section, tiles, cards |
| `--surface-soft` | #F7F7FC | EXISTING | Guide section (`home-section--soft`), card Hebrew panel, ring around the markers |
| `--brand-light` | #EEF2FF | EXISTING | Deck backdrop, tile hover fill |
| `--brand-line` | #DBDCFB | **PROPOSED**: names the literal already used for `.phrases-first-card` and `.phrases-inline-app` borders | Deck border |
| `--brand-dark` | #4F46E5 | EXISTING | Eyebrows, links, primary button, secondary button text and border, tile arrow, markers, tile hover border |
| `--ink` | #1F2937 | EXISTING | H1, H2, tile names, legend titles |
| `--ink-mid` | #374151 | EXISTING | Lead, tile meta, "Jump to a situation" label, legend text |
| `--ink-light` | #6B7280 | EXISTING | Meta line, breadcrumbs. Never on `--brand-light` (4.3:1). |
| `--border` | #E5E7EB | EXISTING | Tile outline, legend dividers |
| `--shadow-sm` / `--shadow-md` | global.css | EXISTING | Back deck cards / front deck card |
| `--font-display` | Manrope | EXISTING | H1, H2, tile names, legend titles, marker numerals |
| `--font-body` | DM Sans | EXISTING | Everything else |
| `--font-hebrew` | Hebrew Rubik | EXISTING | Cards, deck glyph |
| `--space-xs` 8 · `--space-xs-plus` 12 · `--space-sm` 16 · `--space-sm-plus` 20 · `--space-md` 24 · `--space-lg` 40 · `--space-xl` 64 | | EXISTING | See measurements |
| `--r-md` 12 · `--r-lg` 20 · `--r-xl` 28 · `--r-full` | | EXISTING | Tile `--r-lg`, deck `--r-xl`, markers `--r-full` |
| `--w-content` 1280 · `--section-y` clamp(72px, 9vw, 128px) | | EXISTING | `.container`, section padding (unchanged rhythm) |

```css
:root { --brand-line: #DBDCFB; }   /* PROPOSED — then replace the two #dbdcfb literals in hebrew-phrases.css */
```

---

## 3. Block 1 — Hero (H-A Card deck)

### 3.1 What changes

| Part | Before | After |
|---|---|---|
| Copy (eyebrow, H1, lead, meta) | — | **Unchanged**, same classes |
| Primary CTA "Explore the phrases ↓" | `.btn.phrases-primary` | Unchanged |
| Secondary "Try a quick practice" | `.phrases-text-link` (underlined text) | `.btn.phrases-secondary`, an EXISTING class already in hebrew-phrases.css: 48px tall, white fill, 1px `--brand-dark` border and text |
| Right column | `aside.phrases-first-card` (pale box: one word, a short line and a "More ways to begin" link) | `aside.phrases-deck` with three real PhraseCards: שָׁלוֹם, בֹּקֶר טוֹב, לְהִתְרָאוֹת |
| Column ratio | `1.7fr / 1fr` | `1.15fr / 1fr`, via the modifier `.phrases-hero--deck` on the section |
| Situations | `nav.phrases-jump-links` with "01–05" chips inside `#phrases` | `nav.phrases-situations`: 5 tiles at the bottom of the hero, without index numbers |

### 3.2 Markup

```html
<section class="home-section home-section--white phrases-hero phrases-hero--deck" aria-labelledby="phrases-title">
  <div class="container">
    <nav class="phrases-breadcrumbs" aria-label="Breadcrumb">…unchanged…</nav>
    <div class="phrases-hero-layout">
      <header>
        …eyebrow, h1#phrases-title, .phrases-lead, unchanged…
        <div class="phrases-hero-actions">
          <a href="#phrases" class="btn phrases-primary">Explore the phrases <span aria-hidden="true">↓</span></a>
          <a href="#practice" class="btn phrases-secondary">Try a quick practice</a>
        </div>
        <p class="phrases-hero-meta">…unchanged…</p>
      </header>
      <aside class="phrases-deck" aria-label="Three greetings to start with">
        <span class="phrases-deck-glyph" aria-hidden="true">ש</span>
        <ul class="phrases-deck-list">
          <li><!-- PhraseCard phrase-hello, front --></li>
          <li><!-- PhraseCard phrase-good-morning --></li>
          <li><!-- PhraseCard phrase-goodbye, back --></li>
        </ul>
      </aside>
    </div>
    <nav class="phrases-situations" aria-labelledby="situations-label">
      <p class="phrases-situations-label" id="situations-label">Jump to a situation</p>
      <ul>
        <li><a class="phrases-situation" href="#greetings">
          <span class="phrases-situation-name">Greetings and introductions</span>
          <span class="phrases-situation-meta">6 phrases <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6"/></svg></span>
        </a></li>
        <!-- #politeness  Politeness and everyday replies · #food  Ordering food and drink ·
             #shopping  Shopping and paying · #help  Directions and asking for help -->
      </ul>
    </nav>
  </div>
</section>
```

**Deck cards** are the same PhraseCard component the page uses, with three differences:
- No `id`, so they don't duplicate `#phrase-hello` etc.
- The English meaning is a `<p class="pc-en">`, not an `<h3>`, which keeps the heading outline clean between the H1 and the section H2s. The visual result is the same, because the CSS targets the `.pc-en` class.
- DOM order is hello, good morning, goodbye, which is also the screen-reader order.

**Counts** come from the data: `phrases.filter(group).length`. Today every group has 6.

### 3.3 Measurements

| Element | Value | Tokens |
|---|---|---|
| Section | `padding-block: var(--section-y)`; white | EXISTING `.home-section--white` |
| Layout | `grid-template-columns: minmax(0,1.15fr) minmax(0,1fr)`; gap `clamp(32px, 5vw, 64px)`; `align-items: center` | the gap is existing |
| Deck panel | padding 40 all sides; bg `--brand-light`; 1px `--brand-line`; radius 28; `overflow:hidden; isolation:isolate` | `--space-lg`, `--r-xl` |
| Deck glyph | ש in `--font-hebrew` 500, **22rem**/1, colour `--white`, `position:absolute; right:-.06em; bottom:-.34em; z-index:-1`; `aria-hidden`, `pointer-events:none` | PROPOSED (decorative) |
| Peek per back card | `--deck-peek: 124px` (card padding 20 + Hebrew panel 96 + 8). The list has `padding-top: calc(var(--deck-peek) * 2)`. | PROPOSED local var |
| Front card (li 1) | in flow, `z-index:3`, `box-shadow: var(--shadow-md)` | EXISTING shadow |
| Middle card (li 2) | `position:absolute; top: var(--deck-peek); left/right: 12px; z-index:2`; `--shadow-sm` | `--space-xs-plus` |
| Back card (li 3) | `position:absolute; top:0; left/right: 24px; z-index:1`; `--shadow-sm` | `--space-md` |
| Deck cards | `.pc { max-width:none }`. Everything else is the stock PhraseCard. | — |
| Tiles block | `margin-top: 64px` | `--space-xl` |
| Label | DM Sans 600, 14px/1.4, `--ink-mid`, margin-bottom 12 | — |
| Tile grid | `repeat(5, minmax(0,1fr))`, gap 12 | `--space-xs-plus` |
| Tile | flex column, `justify-content: space-between`, gap 12, min-height 104, padding 16, bg `--white`, 1px `--border`, radius 20 | `--space-sm`, `--r-lg` |
| Tile name | Manrope 700, 16px/1.35, `--ink` | — |
| Tile meta | DM Sans 400, 14px/1.4, `--ink-mid`; arrow 20×20, stroke `--brand-dark` 2px, round caps | — |

### 3.4 States

| Element | State | Change |
|---|---|---|
| Tile | hover | border `--brand-dark`, bg `--brand-light`, 150ms. This matches today's jump-link hover. |
| Tile | focus-visible | Page ring: `3px solid var(--brand-dark)`, offset 4 (EXISTING `.phrases-page :focus-visible`) |
| Tile | click | Smooth scroll to the group. `[id]{scroll-margin-top:88px}` is already in place. |
| Deck cards | hover | Stock PhraseCard hover (`--border-dark` + `--shadow-card-hover`). The cards aren't links, so there's no pointer. |
| Secondary button | hover | Existing `.btn:hover` 1px lift, plus **PROPOSED** `.phrases-page .phrases-secondary:hover { background: var(--brand-light) }` (same as `.btn-outline:hover`). On hover the text is 5.6:1. |
| All | reduced motion | Covered by the page's existing rule: no transitions, no button lift |

### 3.5 Responsive

| Width | Layout |
|---|---|
| ≥1024 | Two columns; tiles in 5 columns |
| 768–1023 | Two columns (the deck narrows to about 360px and stays readable); tiles in **3 columns** (3 + 2) |
| ≤767 | One column: copy, then the deck (gap 24, existing), then the tiles. Tiles become a **1-column list**: row layout, min-height 56, padding 12 16, name 15px, gap 8. Tiles block margin-top 40. |
| ≤639 | Deck: padding 24 16, `--deck-peek: 120px` (card padding is 16 here), **the third card is hidden** (`li:nth-child(3){display:none}`), so only the shalom card plus the boker tov strip show. Glyph 15rem. |
| 360 reference | Container gutter 20 (existing clamp). Deck panel 320 wide, cards 288. Each tile is 320×56+. No horizontal scroll. |

### 3.6 Remove

These rules can be deleted:
- `.phrases-first-card`, `.phrases-first-card .phrases-hebrew`, `.phrases-first-card .phrase-transliteration`, `.phrases-first-meaning`, and their mobile overrides
- `.phrases-jump-links` and its children

The PhraseCard `.pc-*` rules stay as they are.

**The situation tiles inside `#phrases`.** The same tile component replaces the jump links above the phrase groups:
- Give that `nav` `aria-label="Phrase situations"`.
- Leave out the visible label, because the section heading above it already does that job.
- Recommended: keep both placements. The hero one is for people who arrive at the top. The `#phrases` one is for people who scroll or arrive via "Explore the phrases".

---

## 4. Block 2 — How to use (G-B Numbered anatomy)

### 4.1 Markup

```html
<section id="how-to-use" class="home-section home-section--soft">
  <div class="container">
    <div class="phrases-section-heading">…eyebrow "Read it. Understand it. Use it." + h2.display-md, unchanged…</div>
    <div class="phrases-anatomy">
      <figure class="phrases-anatomy-card" aria-label="Example phrase card. Its parts are numbered 1 to 5 and explained in the list.">
        <!-- PhraseCard phrase-coffee-please: no id; .pc-en as <p>; switch ids prefixed "anatomy-"
             (aria-labelledby="anatomy-coffee-please-by"). The Said by switch stays live. -->
      </figure>
      <ol class="phrases-anatomy-legend">
        <li><span class="phrases-anatomy-num" aria-hidden="true">1</span>
            <div><h3>Hebrew with nikud</h3><p>The dots and marks … <a href="/blog/how-to-read-hebrew-nikud/">Understand Hebrew vowel marks</a>.</p></div></li>
        … items 2–5 (copy in §4.4) …
      </ol>
    </div>
  </div>
</section>
```

- The `<ol>` already supplies the numbers to assistive tech, so the visible numerals are `aria-hidden`.
- The markers on the card are CSS pseudo-elements with empty alternative text (`content: "1" / ""`), so screen readers don't announce stray digits.
- The `figure`'s `aria-label` ties the card to the list.

### 4.2 Measurements

| Element | Value | Tokens |
|---|---|---|
| Section | `home-section--soft` (`--surface-soft`), `padding-block: var(--section-y)` | EXISTING |
| Heading block | unchanged (`max-width:720px; margin-bottom:24px`) | EXISTING |
| Anatomy grid | `grid-template-columns: minmax(0,432px) minmax(0,1fr)`; gap 64; `align-items:start` | `--space-xl` |
| Card wrapper | `padding-left: 12px` (room for markers that sit on the card's edge); `.pc{max-width:none}`; `.pc-panel{overflow:visible}` (no audio here) | `--space-xs-plus` |
| Marker | 24×24 circle, bg `--brand-dark`, numeral `--white` Manrope 700 12px, `box-shadow: 0 0 0 3px var(--surface-soft)` | `--r-full` |
| Marker x | Centred on the card's left border: `left: calc(-1 * var(--pc-pad) - 13px)` for body parts, and `calc(-1 * (var(--pc-pad) + 16px) - 13px)` for the two parts inside the Hebrew panel. `--pc-pad` is 20px, or 16px below 640px. | PROPOSED local var |
| Marker y | 1 → `.pc-he` top +12. 2 → `.pc-tr` −1. 3 → `.pc-en` 0. 4 → `.pc-note` −1. 5 → `.pc-var-l` −4. Each centres on the first line. | — |
| Legend item | grid `24px 1fr`, column gap 12, `padding-block:16px`, 1px `--border` top. The first item has no border and no top padding. | `--space-xs-plus`, `--space-sm` |
| Legend number | same circle as the marker, `margin-top:2px` | — |
| Legend title (h3) | Manrope 700, 17px/1.6, `--ink` | — |
| Legend text | DM Sans 400, 15px/1.65, `--ink-mid`, 2px under the title; `em` in `--ink`; link `--brand-dark`, underlined, offset .2em | — |

### 4.3 States and behaviour

| Element | State | Change |
|---|---|---|
| Legend row | hover (pointer enhancement) | The matching card part gets `outline: 2px dashed var(--brand-dark); outline-offset: 4px; border-radius: 4px`, via `.phrases-anatomy:has(li:nth-child(n):hover) .pc-…`. Without `:has()` nothing happens and nothing breaks. |
| Card switch | — | Live: same JS, keyboard and ARIA as every PhraseCard. Arrow keys flip רוֹצֶה ↔ רוֹצָה. |
| Nikud link | focus | Page ring, 3px `--brand-dark` |

### 4.4 Copy (**needs your OK**: items 3–5 are re-cut from the three old columns)

| # | Title | Text | Source |
|---|---|---|---|
| 1 | Hebrew with nikud | The dots and marks around the Hebrew letters are nikud, which help show vowel sounds. [Understand Hebrew vowel marks](/blog/how-to-read-hebrew-nikud/). | Existing nikud line, unchanged |
| 2 | [Transliteration] | Transliteration is an approximation: *sh* as in "shoe", *ts* as in "cats", and *kh* for a sound like the ending of Scottish "loch". An apostrophe separates vowel sounds. | Existing column 2, unchanged |
| 3 | English meaning | Follow the meaning, so you know what you are saying. | **Edited** from column 1 |
| 4 | Usage note | The situation the phrase fits, so you know when to use it. | **Edited** from column 1 |
| 5 | Said by / Said to | "Said by" is the person saying the phrase; "Said to" is the person you are speaking to. These examples address one person. | **Edited** from column 3: "Speaker/addressee" was renamed to match the card's switch labels |

### 4.5 Responsive

| Width | Layout |
|---|---|
| ≥1024 | Card column 432, legend fills the rest |
| 768–1023 | `1fr 1fr`, gap 40 |
| ≤767 | One column: the card, then the legend 40 below it |
| ≤639 | `--pc-pad: 16px`; the markers follow the card's smaller padding. The long Hebrew wraps to two balanced lines. |

### 4.6 Remove

These rules can be deleted:
- `.phrases-guide-notes` and its children
- `.phrases-guide-link` (the nikud line now lives in legend item 1)

---

## 5. Accessibility checklist

**Contrast** (WCAG 2.x, computed):

| Pair | Ratio |
|---|---|
| Tile name `--ink` on `--white` | 14.7:1 |
| Tile meta `--ink-mid` on `--white` | 10.3:1 |
| Tile meta `--ink-mid` on `--brand-light` (hover) | 9.2:1 |
| Arrow `--brand-dark` on `--white` | 6.3:1 |
| Arrow `--brand-dark` on `--brand-light` | 5.6:1 |
| Marker numeral `--white` on `--brand-dark` | 6.3:1 |
| Legend text `--ink-mid` on `--surface-soft` | 9.65:1 |
| Link `--brand-dark` on `--surface-soft` | 5.9:1 |
| Transliteration `--ink-translit` on the card panel | 4.64:1 |

- **No text sits directly on `--brand-light`** in the deck. Only white cards do. `--ink-light` and `--ink-translit` fail there.
- **Tile outline** `--border` is 1.24:1, the same as today's jump links. The text and arrow identify the control, so this is not a 1.4.11 failure. If you want the outline itself to pass, use `--ink-light`.

**Targets:**

| Control | Size |
|---|---|
| Tiles | ≥104px tall on desktop, ≥56px on mobile |
| Buttons | 48px |
| Breadcrumb links | 44px (existing) |
| Switch buttons | 38px visual, 44px hit area once the PhraseCard **FIX 1** is applied (see PHRASECARD_SPEC.md) |

**Semantics:**
- Exactly one H1. Section H2s are unchanged. The legend uses H3s.
- Deck cards and the anatomy card use `<p class="pc-en">`, so no H3 is duplicated.
- There is no duplicate `id`.

**Language:**
- Every Hebrew string keeps `lang="he" dir="rtl"`, with the per-word `<bdi>` as built.
- The deck glyph is decorative and `aria-hidden`.

**Keyboard order:** breadcrumbs → Explore → Try practice → 5 tiles → (guide) Said by switch → nikud link. The deck has no interactive elements.

**Motion:** nothing animates on its own.

---

## 6. Acceptance checklist

- [ ] Hero copy, CTAs' targets and the meta line are unchanged. The secondary CTA uses `.phrases-secondary`.
- [ ] The deck shows three real cards from the page data, with no new Hebrew strings, and only two cards at ≤639.
- [ ] 5 tiles link to `#greetings #politeness #food #shopping #help`, show counts from the data, and have no 01–05 numbers.
- [ ] The anatomy card is `phrase-coffee-please`. Its switch works by mouse and by arrow keys.
- [ ] Markers 1–5 line up on the card's left border at 1280 and at 360.
- [ ] No horizontal scroll at 360. Section padding is `--section-y`. The container is 1280.
- [ ] `--brand-line` is added and both `#dbdcfb` literals are replaced.
- [ ] Copy items 3–5 in §4.4 are approved.
