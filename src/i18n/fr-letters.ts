// French display names for the 22 Hebrew letters. Search-validated against
// French volume + SERP data in docs/seo/research/fr/LETTER_SPELLINGS_FR.md,
// which is the source of truth for every SEO-facing letter name. The lesson
// pipeline's own slug (src/data/alphabet-course.json) stays the EN one — this is
// display-only, used by the FR hub and FR lesson pages.
//
// `dalet` still reads "Daleth" although the research picks "Dalet": that page is
// published, and retitling a live page is an owner decision (see that doc's
// "Published pages whose title/H1 still uses the old spelling").
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
  pe: 'Pe',
  tsadi: 'Tsadi',
  qof: 'Qof',
  resh: 'Resh',
  shin: 'Shin',
  tav: 'Tav',
};
