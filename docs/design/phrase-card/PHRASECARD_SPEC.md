# PhraseCard — developer spec (option B "Hebrew panel")

Page: `hebrewedu.com/learn/hebrew-phrases/` — 30 phrases in 5 groups, for English-speaking beginners.
Reference build: `phrase-card.html` (standalone, every state is live). The CSS in its
"Component" block is the production CSS; class prefix `pc-`.

---

## 1. Status labels used in this spec

| Label | Meaning | Action for the developer |
|---|---|---|
| **EXISTING** | Existing site token. The brief confirms both the token and its value. | Use the site token as is. |
| **EXISTING · ASSUMED** | The site has a token for this role, but the value here was sampled from a screenshot of the current card. | Map to the real site token and keep the real value. |
| **NEW · PROPOSED** | The site has no such token yet, as far as is known. | Add it under this name, or reuse an equivalent if one exists. |

The live page was not reachable when this spec was written, so every **ASSUMED** value needs one check against the site stylesheet.

---

## 2. Tokens

### 2.1 Colour

All contrast ratios below were computed (WCAG 2.x), not estimated.

| Token | Value | Status | Used for | Contrast |
|---|---|---|---|---|
| `--surface` | `#ffffff` | EXISTING | Page and card background | — |
| `--surface-sunken` | `#f5f6fb` | NEW · PROPOSED | Hebrew panel; segment hover fill | — |
| `--ink` | `#1c2030` | EXISTING · ASSUMED | Hebrew, English meaning, group h2 | 16.2:1 on surface, 15.0:1 on sunken |
| `--ink-muted` | `#525a6b` | EXISTING · ASSUMED | Note, labels, translit brackets, unselected segment | 6.9:1 / 6.4:1 |
| `--border` | `#e3e6ee` | EXISTING · ASSUMED | Card outline, divider above variants (decorative) | — |
| `--border-hover` | `#c5cad6` | NEW · PROPOSED | Card outline on hover | — |
| `--border-control` | `#7a8396` | NEW · PROPOSED | Play button outline, segment track outline | 3.8:1 / 3.5:1 (≥3:1 non-text) |
| `--brand` | `#4f46e5` | EXISTING · ASSUMED (the "01" index colour) | Translit text, selected segment, playing state, progress bar | 6.3:1 / 5.8:1 |
| `--brand-tint` | `#eef0fd` | NEW · PROPOSED | Play button hover fill | — |
| `--on-brand` | `#ffffff` | EXISTING · ASSUMED | Text and icon on `--brand` | 6.3:1 |
| `--focus` | `= var(--brand)` | NEW · PROPOSED (alias) | Focus ring | 6.3:1 on surface |

### 2.2 Fonts

| Token | Stack | Status |
|---|---|---|
| `--font-heading` | `Manrope, system-ui, sans-serif` | EXISTING (Manrope per brief) |
| `--font-body` | `"DM Sans", Manrope, system-ui, sans-serif` | EXISTING · ASSUMED. The brief says "current body font", and DM Sans is a guess from the screenshot. |
| `--font-hebrew` | `Rubik, "Arial Hebrew", "Noto Sans Hebrew", sans-serif` | EXISTING (shared Rubik per brief) |

Rubik must be loaded with the **Hebrew subset** at weight **500**, plus 400 if the site uses it elsewhere.

### 2.3 Type styles

| Style | Family | Size / line-height | Weight | Colour | Status |
|---|---|---|---|---|---|
| Hebrew phrase | hebrew | 32 / 48 px (desktop ≥640) | 500 | ink | NEW · PROPOSED |
| Hebrew phrase, mobile | hebrew | 28 / 42 px (<640) | 500 | ink | NEW · PROPOSED |
| Hebrew phrase, long (`.pc--long`) | hebrew | 26 / 40 px desktop, 24 / 36 px mobile | 500 | ink | NEW · PROPOSED |
| Transliteration | body | 15 / 22 px, letter-spacing 0.01em | 600 | brand | NEW · PROPOSED |
| Translit brackets `[ ]` | body | inherit | 500 | ink-muted | NEW · PROPOSED |
| English meaning (h3) | heading | 18 / 24 px | 700 | ink | EXISTING · ASSUMED (maps to the site's h3/h4) |
| Usage note | body | 15 / 22 px | 400 | ink-muted | EXISTING · ASSUMED (site body-small) |
| Variant row label | body | 13 / 16 px | 600 | ink-muted | NEW · PROPOSED |
| Segment label | body | 14 / 20 px | 600 | ink-muted; on-brand when selected | NEW · PROPOSED |
| Group title (h2) | heading | 28 / 36 px desktop, 22 / 28 px mobile | 700 | ink | EXISTING · ASSUMED |
| Group description | body | 16 / 24 px desktop, 15 / 22 px mobile | 400 | ink-muted | EXISTING · ASSUMED |
| Group count "· 7 phrases" | heading | inherits h2 | 500 | ink-muted | NEW · PROPOSED (optional) |

The Hebrew line-height is 1.5 so that nikud and dagesh never clip. Don't reduce it below 1.45.

### 2.4 Spacing, radius, shadow

| Token | Value | Status | Used for |
|---|---|---|---|
| `--space-1` | 4px | EXISTING · ASSUMED | Hebrew → transliteration; group h2 → description |
| `--space-2` | 8px | EXISTING · ASSUMED | Meaning → note; between variant rows |
| `--space-3` | 12px | EXISTING · ASSUMED | Play button ↔ Hebrew column; label ↔ segment track |
| `--space-4` | 16px | EXISTING · ASSUMED | Card section gap; panel padding; card padding <640; variant block padding-top; mobile grid gap and gutter |
| `--space-5` | 20px | EXISTING · ASSUMED | Card padding ≥640; group header → grid |
| `--space-6` | 24px | EXISTING · ASSUMED | Grid gap ≥640 |
| `--space-8` | 32px | EXISTING · ASSUMED | Between groups (use 2 × 32 = 64) |
| `--radius-md` | 12px | NEW · PROPOSED (or the site's medium radius) | Hebrew panel |
| `--radius-lg` | 16px | EXISTING · ASSUMED (the current card radius) | Card |
| `--radius-pill` | 999px | NEW · PROPOSED (or the site's pill radius) | Play button, segment track, segments |
| `--shadow-card-hover` | `0 4px 16px rgba(28,32,48,0.08)` | NEW · PROPOSED | Card hover only. Cards have no shadow at rest, as on the current site. |

---

## 3. Anatomy and measurements

```
article.pc  (.has-audio when audio exists)        padding 20 (16 <640), gap 16
│  border 1px --border, radius 16, bg --surface
├─ div.pc-panel                                   padding 16, radius 12, bg --surface-sunken
│   │  min-height 96, display grid, align-items center, gap 12
│   │  columns: "44px 1fr" with audio | "1fr" without
│   ├─ button.pc-play            44×44 circle, col 1 (left)
│   ├─ div.pc-heb                col 2 (or the only column), text-align right
│   │   ├─ p.pc-he               lang="he" dir="rtl", Rubik 32/48
│   │   └─ p.pc-tr               lang="he-Latn", 4px above, [ … ]
│   └─ div.pc-progress           absolute, bottom 0, full width, 3px, visible only while playing
├─ div.pc-body                   flex column, gap 8
│   ├─ h3.pc-en                  English meaning
│   └─ p.pc-note                 usage note
└─ div.pc-vars  (optional)       border-top 1px --border, padding-top 16, rows gap 8
    └─ div.pc-var × 1–2          flex, space-between, align center, gap 12
        ├─ span.pc-var-l         "Said by" / "Said to"
        └─ div.pc-seg            radiogroup, pill track 1px --border-control
            └─ button × 2        min 80×44, padding 0 16, "Man" | "Woman"
```

- **Card width:** set by the grid, never fixed. In practice it is 300–360px, which keeps notes at about 40–48 characters per line. Don't let a single card run wider than 480px.
- **Hebrew wrapping:** `text-wrap: balance; overflow-wrap: anywhere`. Hebrew stays right-aligned when it wraps.
- **Order inside the card:** Hebrew, then transliteration, then English, then note, then variants. Don't reorder.
- **No index numbers** (01, 02…) anywhere. Order comes from the group headings.

---

## 4. Markup

```html
<article class="pc has-audio"
         data-forms='{"m":["אֲנִי רוֹצֶה","ani rotse"],"f":["אֲנִי רוֹצָה","ani rotsa"]}'>
  <div class="pc-panel">
    <button class="pc-play" type="button" aria-label="Play pronunciation">
      <svg class="i-play"  viewBox="0 0 24 24" aria-hidden="true">…</svg>
      <svg class="i-pause" viewBox="0 0 24 24" aria-hidden="true">…</svg>
    </button>
    <div class="pc-progress" aria-hidden="true"><span></span></div>
    <div class="pc-heb" aria-live="polite">
      <p class="pc-he" lang="he" dir="rtl">אֲנִי רוֹצֶה</p>
      <p class="pc-tr" lang="he-Latn"><span class="b" aria-hidden="true">[</span><span class="pc-tr-t">ani rotse</span><span class="b" aria-hidden="true">]</span></p>
    </div>
  </div>
  <div class="pc-body">
    <h3 class="pc-en">I want</h3>
    <p class="pc-note">Start a request with it, then name the thing you want.</p>
  </div>
  <div class="pc-vars">
    <div class="pc-var">
      <span class="pc-var-l" id="ani-rotse-by">Said by</span>
      <div class="pc-seg" role="radiogroup" aria-labelledby="ani-rotse-by">
        <button type="button" role="radio" data-v="m" aria-checked="true"  tabindex="0">Man</button>
        <button type="button" role="radio" data-v="f" aria-checked="false" tabindex="-1">Woman</button>
      </div>
    </div>
  </div>
</article>
```

### Variants of the markup

| Case | Change |
|---|---|
| No audio | Remove `.has-audio`, `.pc-play` and `.pc-progress`. The panel becomes one column, and the Hebrew stays right-aligned. |
| No gender forms | Remove `.pc-vars` and `data-forms`. |
| Speaker forms (2) | One `.pc-var`, labelled "Said by". `data-forms` keys `m`, `f`. |
| Addressee forms (2) | One `.pc-var`, labelled "Said to". Keys `m`, `f`. |
| Four forms | Two `.pc-var` rows, **Said by first, then Said to**. Keys are the selected values joined in row order: `mm`, `mf`, `fm`, `ff` (speaker + listener). |
| Long phrase | Add `.pc--long` when the Hebrew has about 18 or more letters (not counting nikud), or always for four-form cards. |

- **Semantics:** the card is an `<article>`. The English meaning is the `h3`, under the group `h2`, so screen-reader users can navigate by meaning. The Hebrew is a `<p>`, not a heading.
- **IDs:** the `aria-labelledby` ids must be unique on the page. Slugify the transliteration and add `-by` or `-to`.
- **Audio per form:** put the source on the card, for example `data-audio='{"m":"/audio/ani-rotse.mp3","f":"/audio/ani-rotsa.mp3"}'`, or use `data-audio="/audio/shalom.mp3"` when there are no forms.

---

## 5. States

| # | State | Visual change | Trigger |
|---|---|---|---|
| 1 | **Basic** (no audio, no forms) | Panel is Hebrew only; card border `--border`, no shadow | — |
| 2 | **Audio, idle** | Play button: bg `--surface`, 1px `--border-control`, ink play icon 20px | — |
| 3 | **Audio, playing** | Card border becomes `--brand`. Play button bg and border `--brand`, white pause icon. Progress bar `--brand` 3px grows 0→100% along the panel's bottom edge. `aria-label="Pause pronunciation"`. | Click or Enter/Space on the play button |
| 4 | **Gender variants, Said by** | Divider plus one segment row. Selected segment: bg `--brand`, text `--on-brand`. Unselected: transparent, `--ink-muted`; on hover `--ink` on `--surface-sunken`. | — |
| 5 | **Gender variants, Said to** | Same as 4, labelled "Said to" | — |
| 6 | **Four forms** | Two rows (Said by, Said to); `.pc--long` type size | — |
| 7 | **Hover, card** | Border `--border-hover` plus `--shadow-card-hover`; transition 150ms ease on border-color and box-shadow. No lift or translate. The card is not a link and has no pointer cursor. | `:hover` |
| 7b | **Hover, play button** | bg `--brand-tint`, border and icon `--brand`; 150ms | `:hover` |
| 8 | **Focus, play button** | `outline: 2px solid var(--focus); outline-offset: 2px` | `:focus-visible` |
| 9 | **Focus, segment** | Same ring on the focused segment | `:focus-visible` |

- **Reduced motion:** under `prefers-reduced-motion: reduce`, remove all transitions. The progress bar still updates, because it carries state, not decoration.
- **Touch:** hover styles don't persist on touch devices, because they use `:hover` only, with no JS.

---

## 6. Behaviour, ARIA and keyboard

### 6.1 Play button

- A native `<button type="button">`, so it is focusable and Enter and Space work for free.
- **Accessible name:** `aria-label="Play pronunciation"` at rest, `"Pause pronunciation"` while playing. Swap the label rather than using `aria-pressed`: a play/pause button reads more clearly that way.
- **Implementation:** use one shared `HTMLAudioElement` for the whole page.
  - On click: if this card is playing, pause, reset to 0 and return to rest. Otherwise, stop any other playing card, set `src` to the current form's file, call `play()`, and add `.is-playing`.
  - Progress: update `--pc-p` (0–100%) on the card from `currentTime / duration` in a `requestAnimationFrame` loop (or `timeupdate`).
  - On `ended` or `error`: remove `.is-playing`, reset the label and clear `--pc-p`.
  - Changing the gender form stops playback.
- No autoplay, ever. Don't preload audio (`preload="none"`). Load on the first click.
- **Focus** stays on the button through the whole play/pause cycle.

### 6.2 "Said by" / "Said to" switch

Follows the WAI-ARIA **radio group** pattern:

| Element | Attributes |
|---|---|
| Track | `role="radiogroup"`, `aria-labelledby` pointing to the row label ("Said by" / "Said to") |
| Segment | native `<button type="button">`, `role="radio"`, `aria-checked="true|false"`, `data-v="m|f"` |
| Roving tabindex | the checked segment has `tabindex="0"`, the other `-1`: each group is one Tab stop |

| Key | Action |
|---|---|
| Tab / Shift+Tab | Into or out of the group (lands on the checked segment) |
| → or ↓ | Select and focus the next segment, wrapping around |
| ← or ↑ | Select and focus the previous segment, wrapping around |
| Home / End | Select the first / last segment |
| Space / Enter | Select the focused segment |
| Click / tap | Select |

- **On change:** swap the text of `.pc-he` and `.pc-tr-t` in place from `data-forms[key]` (and the audio source). `.pc-heb` has `aria-live="polite"`, so the new Hebrew is announced with `lang="he"`.
- **Default selection:** Man, for both speaker and listener (the masculine form is the one in dictionaries).
- The selected state uses fill, text colour and `aria-checked` together, never colour alone.
- **Arrow direction:** the page is LTR, so → moves to the next segment ("Woman") in visual order. Don't mirror the arrows inside the card.

### 6.3 Hebrew and transliteration language

- Every Hebrew string: `lang="he" dir="rtl"`. Never centre or left-align it.
- Transliteration: `lang="he-Latn"`, which lets screen readers attempt Hebrew pronunciation of the Latin text.

---

## 7. Transliteration rules

1. Display as **`[shalom]`**: square brackets, lowercase, no spaces inside the brackets.
2. Render the brackets as separate `aria-hidden="true"` spans in `--ink-muted`, so screen readers don't read "left bracket". The transliteration itself is in `--brand`.
3. **No sentence punctuation inside the brackets.** No `?`, `.`, `!` or `,`. The Hebrew keeps its own punctuation (`מָה שְׁלוֹמְךָ?` → `[ma shlomkha]`).
4. An apostrophe that marks a syllable break is part of the spelling and stays: `[lehitra'ot]`.
5. Conventions: `kh` for ח and כ (without dagesh), `ts` for צ, `sh` for שׁ, `e` for both segol and tsere, `a` for both patakh and kamats; no doubled consonants for dagesh. Examples: `[ani rotse]`, `[ani rotsa]`, `[ani sameakh lirot otkha]`.
6. Each gender form has its own transliteration. Never write combined forms like `[rotse/rotsa]`.

## 8. Content rules

- **English meaning:** sentence case; join alternatives with ` / ` ("Hello / goodbye"); no final period.
- **Usage note:** 1–2 sentences, at most about 120 characters, second person, ending with a period.
- **Gender labels** are exactly "Said by" / "Said to" and "Man" / "Woman".

---

## 9. Responsive rules

| Breakpoint | Grid | Card padding | Hebrew | Gaps / gutters |
|---|---|---|---|---|
| ≥1024px | 3 columns, `repeat(3, minmax(0,1fr))`, container max 1120px | 20 | 32/48 (long 26/40) | gap 24 |
| 640–1023px | 2 columns | 20 | 32/48 (long 26/40) | gap 24 |
| <640px (360 reference) | 1 column | 16 | 28/42 (long 24/36) | gap 16, side gutter 16 |

- Use `align-items: start` on the grid. Cards with variants are taller, so don't stretch cards to equal heights.
- **At 360px:** card width is 328px; the Hebrew column with audio is 328 − 32 (card padding) − 32 (panel padding) − 44 − 12 = **208px**. Long phrases wrap onto two balanced lines, which is expected.
- The variant row stays on one line down to 320px (label 13px plus a 160px track).
- **Group header:** h2 then description, 20px below that to the grid; 64px between groups.

---

## 10. Acceptance checklist

- [ ] No index numbers on cards or groups.
- [ ] Hebrew is the largest text on the card, right-aligned, `lang="he" dir="rtl"`, in Rubik 500.
- [ ] Transliteration in brackets, brand colour, brackets `aria-hidden`.
- [ ] Every target is at least 44×44 (play button, segments).
- [ ] Tab reaches the play button, then each switch group once. Arrow keys change the form, and the form is announced.
- [ ] Only one clip plays at a time. Switching forms stops playback.
- [ ] Focus ring is visible on every control. No `outline: none` without a replacement.
- [ ] No horizontal scroll at 360px. 3 columns at 1024px or wider.
- [ ] Every **ASSUMED** value in §2 has been checked against the site stylesheet.
