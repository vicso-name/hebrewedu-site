// French display names for the 22 Hebrew letters, per the preferred SEO spellings
// in docs/seo/research/fr/FR_RESEARCH.md's per-letter table (Aleph not Alef, Beth
// not Bet, Guimel not Gimel, Daleth not Dalet, Heth not Het, Noun not Nun, Pé not
// Pe, etc.). The lesson pipeline's own slug (src/data/alphabet-course.json) stays
// the EN one — this is display-only, used by the FR hub and FR lesson pages.
export const frLetterNames: Record<string, string> = {
  aleph: 'Aleph',
  bet: 'Beth',
  gimel: 'Guimel',
  dalet: 'Daleth',
  he: 'Hé',
  vav: 'Vav',
  zayin: 'Zayin',
  chet: 'Heth',
  tet: 'Teth',
  yod: 'Yod',
  kaf: 'Kaf',
  lamed: 'Lamed',
  mem: 'Mem',
  nun: 'Noun',
  samekh: 'Samekh',
  ayin: 'Ayin',
  pe: 'Pé',
  tsadi: 'Tsadi',
  qof: 'Qof',
  resh: 'Resh',
  shin: 'Shin',
  tav: 'Tav',
};
