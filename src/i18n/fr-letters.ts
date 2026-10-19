// French display names for the 22 Hebrew letters. Search-validated against
// French volume + SERP data in docs/seo/research/fr/LETTER_SPELLINGS_FR.md,
// which is the source of truth for every SEO-facing letter name. The lesson
// pipeline's own slug (src/data/alphabet-course.json) stays the EN one — this is
// display-only, used by the FR hub and FR lesson pages.
export const frLetterNames: Record<string, string> = {
  aleph: 'Aleph',
  bet: 'Beth',
  gimel: 'Guimel',
  dalet: 'Dalet',
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
