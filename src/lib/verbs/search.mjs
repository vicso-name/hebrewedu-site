// Verb lookup matching, shared by explorer-client.ts and its tests.
// Entries are verbIndex() rows: { id, b, he, root, tr, free?, tl? }.
const FINALS = { 'ך': 'כ', 'ם': 'מ', 'ן': 'נ', 'ף': 'פ', 'ץ': 'צ' };

/** Folds case, Latin accents, nikud, final letters and the matres lectionis
 *  ו/י, so a plene query (לכתוב) finds a pointed headword (לִכְתֹּב). */
export function foldSearch(text) {
  return text.normalize('NFD').toLowerCase()
    .replace(/[̀-֑ͯ-ׇ]/g, '')
    .replace(/[ךםןףץ]/g, c => FINALS[c])
    .replace(/[וי]/g, '')
    .replace(/[’ˈ]/g, "'");
}

/** Matches by headword, root, translation or transliteration; free verbs first. */
export function matchVerbs(entries, query, binyan) {
  const q = foldSearch(query.trim()).replace(/^to\s+/, '');
  const hits = entries.filter(e => (!binyan || e.b === binyan)
    && (!q || foldSearch(`${e.he} ${e.root} ${e.tr} ${e.id} ${e.tl ?? ''}`).includes(q)));
  return [...hits.filter(e => e.free), ...hits.filter(e => !e.free)];
}
