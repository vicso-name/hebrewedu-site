#!/usr/bin/env node
// Imports the app's verb dictionary into src/data/hebrew-verbs.json for the
// /learn/hebrew-verbs/ tool. The app gates full tables behind a daily limit,
// so the site gets every form only for the FREE verbs below; every other verb
// ships as a headword (Hebrew, root, binyan, translation) and nothing more —
// its conjugation never reaches the browser. See docs/VERBS.md.
//
//   node scripts/import-app-verbs.mjs [path/to/hebrew_verbs_multilang.json]
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';

const DEFAULT_SOURCE = `${homedir()}/Developer/android/Alef-Bet-Trutor/app/src/main/assets/hebrew_verbs_multilang.json`;
const OUT = new URL('../src/data/hebrew-verbs.json', import.meta.url);

// Source indexes, 30 in all (6 Pa'al, 5 Pi'el and Hif'il, 4 for the rest, 2 Huf'al:
// only two Huf'al entries carry nikud). Roots repeat across binyanim on purpose (כתב, למד, דבר, בין) so the
// page can show one root moving through the patterns.
const FREE = {
  "pa'al": [5, 25, 0, 4, 3, 11],
  "pi'el": [2, 26, 86, 6, 107],
  "hiph'il": [138, 162, 156, 1, 139],
  "hitpa'el": [196, 198, 182, 195],
  "nif'al": [233, 228, 235, 186],
  "pu'al": [269, 268, 275, 265],
  "huf'al": [276, 285],
};

const BINYAN_ID = { "pa'al": 'paal', "pi'el": 'piel', "hiph'il": 'hifil', "hitpa'el": 'hitpael', "nif'al": 'nifal', "pu'al": 'pual', "huf'al": 'hufal' };

// Corrections to the app data, keyed by source index. Report each one back to
// the app repo too — the app ships the same text. `forms` values are
// [translit_en, translit_fr] after cleanTranslit() (no stress marks).
const OVERRIDES = {
  4: { forms: { past_3fs: ['halkha', 'halkha'], past_3pl: ['halkhu', 'halkhou'] } },
  11: { forms: {
    past_3fs: ['ratsta', 'ratsta'], past_2mp: ['retsitem', 'retsitem'], past_2fp: ['retsiten', 'retsiten'],
    imperative_ms: ['retse', 'retse'], imperative_fs: ['retsi', 'retsi'], imperative_mp: ['retsu', 'retsou'], imperative_fp: ['retseyna', 'retseyna'],
  } },
  107: { forms: { past_2fp: ['kibalten', 'kibalten'] } },
  // מַגִּיעָה / הִגִּיעָה would read like the masculine magia / higia without the stop.
  139: { forms: { present_fs: ["magi'a", "magui'a"], past_3fs: ["higi'a", "higui'a"] } },
  195: { forms: { future_2fs: ['tistakli', 'tistakli'], future_2mp: ['tistaklu', 'tistaklou'] } },
  198: { forms: {
    past_1p: ["hit'amanu", "hit'amanou"],
    present_mp: ["mit'amnim", "mit'amnim"], present_fp: ["mit'amnot", "mit'amnot"],
    past_3fs: ["hit'amna", "hit'amna"], past_3pl: ["hit'amnu", "hit'amnou"],
    future_2fs: ["tit'amni", "tit'amni"], future_2mp: ["tit'amnu", "tit'amnou"], future_3mp: ["yit'amnu", "yit'amnou"],
    imperative_fs: ["hit'amni", "hit'amni"], imperative_mp: ["hit'amnu", "hit'amnou"],
  } },
  228: { forms: { future_3mp: ['yikansu', 'yikansou'] } },
  233: { tr: { en: 'be written' }, forms: { infinitive: ['lehikatev', 'lehikatev'] } },
  235: { tr: { en: 'meet' } },
  // Pu'al/Huf'al headwords are the past 3ms form; the app glosses them "is …".
  268: { tr: { en: 'be changed' }, forms: { past_1p: ['shuneynu', 'chouneynou'] } },
  269: { tr: { en: 'be spoken' }, forms: {
    past_3fs: ['dubra', 'doubra'], past_3pl: ['dubru', 'doubrou'],
    future_2fs: ['tedubri', 'tedoubri'], future_2mp: ['tedubru', 'tedoubrou'], future_3mp: ['yedubru', 'yedoubrou'],
  } },
  265: { tr: { en: 'be tried, be tested' } },
  275: { tr: { en: 'be filled' } },
  276: { tr: { en: 'be understood' }, forms: { past_1p: ['huvanu', 'houvanou'] } },
  285: { tr: { en: 'be decided' }, forms: {
    present_fs: ['mukhletet', 'moukhletet'],
    past_1s: ['hukhlatti', 'houkhlatti'], past_1p: ['hukhlatnu', 'houkhlatnou'],
    past_2ms: ['hukhlatta', 'houkhlatta'], past_2fs: ['hukhlatt', 'houkhlatt'],
    past_2mp: ['hukhlattem', 'houkhlattem'], past_2fp: ['hukhlatten', 'houkhlatten'],
    past_3fs: ['hukhleta', 'houkhleta'], past_3pl: ['hukhletu', 'houkhletou'],
    future_2fs: ['tukhleti', 'toukhleti'],
  } },
};
// לְשַׁלֵּם (86) drops the vocal shva throughout: lshalem, mshalem, tshalmi…
// לְהִשָּׁאֵר (186) doubles the shin in every dagesh form: esh'she'er, tish'she'ari…
const FIXERS = {
  86: text => text.replace(/^([lmnty])(sh|ch)/, '$1e$2'),
  186: text => text.replace(/(sh|ch)'\1e'/, "$1a'"),
};

// The app's Latin transliterations carry Cyrillic look-alikes (katvа, melamед)
// and stress marks that often sit mid-syllable (hitkashˈer). Map the former,
// drop the latter — the site's phrase transliterations carry no stress either.
const CYRILLIC = { 'а': 'a', 'е': 'e', 'о': 'o', 'с': 'c', 'р': 'p', 'х': 'x', 'у': 'u', 'д': 'd', 'л': 'l', 'т': 't', 'н': 'n', 'м': 'm', 'к': 'k', 'в': 'v', 'и': 'i' };
function cleanTranslit(text, where) {
  const out = text.replace(/[Ѐ-ӿ]/g, c => CYRILLIC[c] ?? c).replace(/ˈ/g, '').trim();
  if (!/^[a-z' ]+$/.test(out)) throw new Error(`${where}: unexpected transliteration "${text}"`);
  return out;
}

const FORM_KEYS = [
  'present_ms', 'present_fs', 'present_mp', 'present_fp',
  'past_1s', 'past_1p', 'past_2ms', 'past_2fs', 'past_2mp', 'past_2fp', 'past_3ms', 'past_3fs', 'past_3pl',
  'future_1s', 'future_1p', 'future_2ms', 'future_2fs', 'future_2mp', 'future_2fp', 'future_3ms', 'future_3fs', 'future_3mp', 'future_3fp',
  'imperative_ms', 'imperative_fs', 'imperative_mp', 'imperative_fp',
  'infinitive',
];
const NIKUD = /[ְ-ׇּׁׂ]/;

const source = process.argv[2] ?? DEFAULT_SOURCE;
const raw = readFileSync(source);
const verbs = JSON.parse(raw);
const freeIndexes = new Set(Object.values(FREE).flat());

const slug = text => text.replace(/[\u0400-\u04FF]/g, c => CYRILLIC[c] ?? c).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z]/g, '');
const used = new Set();
const out = [];

verbs.forEach((verb, index) => {
  const binyan = BINYAN_ID[verb.binyan];
  if (!binyan) throw new Error(`#${index}: unknown binyan ${verb.binyan}`);
  // Pu'al and Huf'al have no infinitive; their headword is the past 3ms form.
  const head = verb.forms.infinitive?.he_niqqud ? verb.forms.infinitive : verb.forms.past_3ms;
  const tr = { en: verb.translations.en.trim(), fr: verb.translations.fr.trim(), ...OVERRIDES[index]?.tr };
  if (!head?.he_niqqud || !tr.en || !tr.fr) {
    if (freeIndexes.has(index)) throw new Error(`#${index}: free verb without headword or translation`);
    return; // e.g. an entry with no translation yet
  }
  const entry = { id: '', binyan, root: verb.root, he: head.he_niqqud, tr };
  if (freeIndexes.has(index)) {
    const fix = FIXERS[index] ?? (text => text);
    const translit = (form, key) => {
      const override = OVERRIDES[index]?.forms?.[key];
      return override ?? [fix(cleanTranslit(form.translit_en, `#${index} ${key}`)), fix(cleanTranslit(form.translit_fr, `#${index} ${key}`))];
    };
    entry.free = true;
    entry.prep = { he: verb.prepositions.he, en: verb.prepositions.en, fr: verb.prepositions.fr };
    entry.forms = {};
    for (const key of FORM_KEYS) {
      const form = verb.forms[key];
      if (!form?.he_niqqud) continue; // passive binyanim: no imperative/infinitive
      if (!NIKUD.test(form.he_niqqud)) throw new Error(`#${index} ${key}: free verb form without nikud`);
      entry.forms[key] = [form.he_niqqud, ...translit(form, key)];
    }
    const [, en, fr] = entry.forms.infinitive ?? entry.forms.past_3ms;
    entry.translit = { en, fr };
  }
  // The id is the headword's transliteration, so it reads well in a URL hash.
  let id = slug(entry.translit?.en ?? head.translit_en);
  if (used.has(id)) id = `${id}-${binyan}`;
  if (used.has(id)) throw new Error(`#${index}: duplicate id ${id}`);
  used.add(id);
  entry.id = id;
  out.push(entry);
});

const free = Object.values(FREE).flat().map(i => out.find(v => v.free && v.he === (verbs[i].forms.infinitive?.he_niqqud || verbs[i].forms.past_3ms.he_niqqud)).id);
const data = {
  source: { file: 'hebrew_verbs_multilang.json', sha256: createHash('sha256').update(raw).digest('hex'), count: verbs.length },
  free,
  verbs: out,
};
writeFileSync(OUT, `${JSON.stringify(data, null, 1)}\n`);
console.log(`${out.length} verbs (${free.length} free) -> src/data/hebrew-verbs.json`);
