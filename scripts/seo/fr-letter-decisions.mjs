// Applies the owner's decision rule to the cached FR letter-spelling research
// and writes docs/seo/research/fr/LETTER_SPELLINGS_FR.md. No API calls.
//
//   highest qualified volume wins
//   -> tie, or both <= 10: spelling dominant in FR SERP titles
//   -> still tied: fr.wikipedia's spelling
//
// Run: node scripts/seo/fr-letter-decisions.mjs

import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const ROOT = resolve(new URL('../..', import.meta.url).pathname);
const OUT = resolve(ROOT, 'docs/seo/research/fr');
const TIE = 10;

const src = await readFile(resolve(ROOT, 'scripts/seo/fr-letter-spellings.mjs'), 'utf8');
const VARIANTS = eval('(' + src.match(/export const VARIANTS = (\{[\s\S]*?\n\});/)[1] + ')');
const rows = JSON.parse(await readFile(resolve(OUT, 'letter-spellings-volumes.json'), 'utf8'));
const serp = JSON.parse(await readFile(resolve(OUT, 'letter-spellings-serp.json'), 'utf8'));

const isBare = (r) => !/hébreu|hébraïque|lettre/.test(r.keyword);

// fr.wikipedia canonical article titles for the Hebrew letter, resolved through
// the free MediaWiki API (action=query&redirects=1) — not a paid call.
const WIKIPEDIA = {
  dalet: 'Dalet', chet: 'Ḥēth / Het (lettre)', nun: 'Nun', pe: 'Pe (lettre)',
  tsadi: 'Tsadi', tav: 'Tav', ayin: 'ʿAyin', qof: 'Qof',
};

// Where a SERP title count is homograph noise rather than Hebrew-letter usage,
// the override says so and cites the evidence. Only one letter needs it.
const RELEVANCE_OVERRIDE = {
  tav: {
    choose: 'Tav',
    why: '"lettre tau" (210) and every "Tau" title on the FR SERP are the Greek letter τ, the Tau cross or a dictionary entry — the one Hebrew-letter result ("127- La lettre Tav") uses Tav, and fr.wikipedia\'s article is Tav. The raw volume leader measures Greek demand, not this letter.',
  },
};

const decisions = [];
for (const [slug, variants] of Object.entries(VARIANTS)) {
  const scored = variants.map((name) => {
    const mine = rows.filter((r) => r.slug === slug && r.name === name && !isBare(r));
    const best = mine.reduce((m, r) => (r.volume > m.volume ? r : m), mine[0]);
    const bare = rows.find((r) => r.slug === slug && r.name === name && isBare(r));
    return { name, volume: best.volume, keyword: best.keyword, bareVolume: bare?.volume ?? 0 };
  }).sort((a, b) => b.volume - a.volume);

  const [a, b] = scored;
  const s = serp[slug];
  let chosen, reason, basis;

  if (RELEVANCE_OVERRIDE[slug]) {
    const o = RELEVANCE_OVERRIDE[slug];
    chosen = scored.find((v) => v.name === o.choose);
    basis = 'relevance override';
    reason = o.why;
  } else if (scored.length === 1) {
    chosen = a;
    basis = 'only spelling';
    reason = `No competing French spelling in use; volume ${a.volume} on "${a.keyword}".`;
  } else if (a.volume > b.volume && !(a.volume <= TIE && b.volume <= TIE)) {
    chosen = a;
    basis = 'volume';
    reason = `Highest qualified volume: "${a.keyword}" ${a.volume} vs ${b.name} ${b.volume}.`;
  } else if (s) {
    const counts = s.titleCounts;
    const ranked = [...scored].sort((x, y) => (counts[y.name] ?? 0) - (counts[x.name] ?? 0));
    if ((counts[ranked[0].name] ?? 0) > (counts[ranked[1]?.name] ?? 0)) {
      chosen = ranked[0];
      basis = 'SERP titles';
      reason = `Volumes tied or <=${TIE} (${scored.map((v) => `${v.name} ${v.volume}`).join(', ')}); FR SERP for "${s.query}" shows ${Object.entries(counts).map(([n, c]) => `${n} ${c}`).join(', ')} in top-10 titles.`;
    } else {
      const wiki = WIKIPEDIA[slug];
      chosen = scored.find((v) => wiki?.toLowerCase().includes(v.name.toLowerCase())) ?? a;
      basis = 'fr.wikipedia';
      reason = `Volumes and SERP titles both inconclusive (${Object.entries(counts).map(([n, c]) => `${n} ${c}`).join(', ')}); fr.wikipedia's article is "${wiki}".`;
    }
  } else {
    chosen = a;
    basis = 'volume (no SERP needed)';
    reason = `Highest qualified volume: "${a.keyword}" ${a.volume}.`;
  }

  const runnerUp = scored.find((v) => v.name !== chosen.name) ?? null;
  decisions.push({
    slug, chosen: chosen.name, primaryKeyword: chosen.keyword, volume: chosen.volume,
    runnerUp: runnerUp ? `${runnerUp.name} (${runnerUp.volume})` : '—',
    basis, reason, scored,
    secondaryKeywords: rows
      .filter((r) => r.slug === slug && r.keyword !== chosen.keyword && r.volume > 0 && !isBare(r))
      .sort((x, y) => y.volume - x.volume).map((r) => r.keyword),
  });
}

await writeFile(resolve(OUT, 'letter-spellings-decisions.json'), JSON.stringify(decisions, null, 1));

const PUBLISHED = new Set(['aleph', 'bet', 'gimel', 'dalet', 'he', 'vav']);
const CURRENT = eval('(' + (await readFile(resolve(ROOT, 'src/i18n/fr-letters.ts'), 'utf8')).match(/\{[\s\S]*?\n\}/)[0] + ')');

const md = `# FR letter-name spellings — search-validated

Which French spelling of each Hebrew letter name this site targets, decided from
French (location \`fr\`, language \`fr\`) search data. Source of truth for
\`src/i18n/fr-letters.ts\`, the \`docs/seo/core\` rows of the FR letter pages, and
the spelling table in \`docs/hebrew-alphabet-editorial-rules.fr.md\`.

Raw data: \`letter-spellings-volumes.json\` (208 candidates),
\`letter-spellings-serp.json\` (12 tie-break SERPs),
\`letter-spellings-decisions.json\`. Spend: \`spend.csv\`.

## Method

22 letters x ${Object.values(VARIANTS).flat().length} spelling variants x 4 query shapes
(\`<name>\`, \`<name> hébreu\`, \`lettre <name>\`, \`lettre hébraïque <name>\`) =
208 candidates, priced in one \`/v1/seo/keywords/overview\` batch. 12 letters then
got a \`/v1/serp/google\` top-10 tie-break.

**Decision rule** (owner's): highest volume wins; tie or both <=${TIE} -> the
spelling dominant in FR SERP titles; still tied -> fr.wikipedia's spelling.

### The bare-name pattern is excluded from scoring

A letter name on its own measures its homographs, not Hebrew-letter demand. In
France: \`youd\` 301,000 · \`pe\` 22,200 · \`fé\` 22,200 · \`bet\` 18,100 (betting) ·
\`sin\` 9,900 · \`tau\` 8,100 (Greek) · \`mem\` 6,600 · \`noun\` 3,600 (the English
word) · \`tet\` 14,800. None of that is somebody looking for a Hebrew letter. The
bare-name figures stay in the raw JSON for the record, but only the three
Hebrew-qualified shapes decide anything.

The same contamination reaches \`lettre <name>\` for one letter — see Tav below.

### SERP tie-breaks use a Hebrew-scoped query

Step 3 was specified as a SERP on the bare name. A bare-name SERP is worthless
here for exactly the reason above: searching \`pe\` or \`tau\` in France returns
nothing about Hebrew, so no spelling of the Hebrew letter could appear in the
titles either way. Each tie-break therefore ran on \`<leading variant> hébreu\`
and counted **every** candidate spelling in that one Hebrew-scoped result set,
which is what the rule is actually asking.

## Decisions

| # | Letter | Chosen | Primary keyword | Vol | Runner-up | Basis | Reason |
|---|---|---|---|---|---|---|---|
${decisions.map((d, i) => `| ${i + 1} | \`${d.slug}\` | **${d.chosen}** | \`${d.primaryKeyword}\` | ${d.volume} | ${d.runnerUp} | ${d.basis} | ${d.reason.replace(/\|/g, '\\|')} |`).join('\n')}

## Volumes per variant (Hebrew-qualified best, bare name for contrast)

| Letter | Variants (qualified / bare) |
|---|---|
${decisions.map((d) => `| \`${d.slug}\` | ${d.scored.map((v) => `${v.name} ${v.volume} / ${v.bareVolume}`).join(' · ')} |`).join('\n')}

## Divergences from what the site renders today

${(() => {
  const diff = decisions.filter((d) => CURRENT[d.slug] !== d.chosen);
  if (!diff.length) return 'None — every chosen spelling already matches `src/i18n/fr-letters.ts`.';
  return `| Letter | Rendered today | Chosen | Published? | Action |
|---|---|---|---|---|
${diff.map((d) => `| \`${d.slug}\` | ${CURRENT[d.slug]} | **${d.chosen}** | ${PUBLISHED.has(d.slug) ? '**yes**' : 'no'} | ${PUBLISHED.has(d.slug) ? 'title/H1 change deferred — owner decision, not made in this step' : '`fr-letters.ts` updated'} |`).join('\n')}`;
})()}

${(() => {
  const pub = decisions.filter((d) => PUBLISHED.has(d.slug) && CURRENT[d.slug] !== d.chosen);
  if (!pub.length) return '';
  return `### Published pages whose title/H1 still uses the old spelling

Listed, **not changed** — retitling a live page is the owner's call:

${pub.map((d) => `- \`/fr/apprendre/alphabet-hebreu/${d.slug}/\` renders "${CURRENT[d.slug]}" in its \`<title>\`, H1 and breadcrumb; research picks **${d.chosen}** (${d.reason})`).join('\n')}

Their \`docs/seo/core\` rows now carry the chosen spelling's keyword as
\`primary_keyword\` regardless, so the gap is visible in the semantic core.`;
})()}

## Notes on individual letters

- **Noun vs Nun** — \`lettre noun\` 70 and \`lettre hébraïque noun\` 10 beat
  \`lettre nun\` 20, so the volume rule picks **Noun**, which is also what French
  Hebrew-teaching sites use (\`Nun\` would read "nune" in French). fr.wikipedia's
  article is \`Nun\`; the rule only reaches Wikipedia on a tie, so Noun stands.
- **Tav vs Tau** — the one documented override; see the table.
- **Heth vs Het** — every qualified pattern is 0 for both. FR SERP titles for
  \`heth hébreu\` run Heth 3 / Het 2, so Heth keeps it, narrowly.
- **Pe vs Pé** — all qualified patterns 0; SERP titles Pe 2 / Pé 1 and
  fr.wikipedia's \`Pe (lettre)\` agree on **Pe**, so the accent goes.
- **Mem** has no competing French spelling at all.
`;

await writeFile(resolve(OUT, 'LETTER_SPELLINGS_FR.md'), md);
console.log('wrote LETTER_SPELLINGS_FR.md');
console.log('\nchosen spellings:');
for (const d of decisions) {
  const flag = CURRENT[d.slug] !== d.chosen ? `  <-- CHANGE from ${CURRENT[d.slug]}${PUBLISHED.has(d.slug) ? ' (PUBLISHED)' : ''}` : '';
  console.log(`  ${d.slug.padEnd(7)} ${d.chosen.padEnd(8)} ${String(d.volume).padStart(4)}  ${d.basis.padEnd(22)}${flag}`);
}
