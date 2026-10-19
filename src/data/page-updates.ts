// Editorial dates (YYYY-MM-DD, UTC) of meaningful changes to these pages.
// Leave unknown dates undefined: the sitemap omits lastmod rather than guessing.
// Set a date when changing page content, links, or the blog listing/cards.
// Article body edits belong in that article's updatedDate, not /blog/ here.
import { phrasesPublished, phrasesPublishedFr } from '../lib/hebrew-phrases.mjs';
import { phraseReview, phraseReviewFr } from './hebrew-phrases';

const phrasesReleaseDate = phrasesPublished() ? phraseReview.publishedAt! : undefined;
const phrasesReleaseDateFr = phrasesPublishedFr() ? phraseReviewFr.publishedAt! : undefined;
export const pageUpdatedDates: Record<string, string | undefined> = {
  '/': ['2026-10-10', ...(phrasesReleaseDate ? [phrasesReleaseDate] : [])].sort().at(-1),
  '/learn/hebrew-phrases/': phrasesReleaseDate,
  '/blog/': undefined,
  '/play/': '2026-10-13',
  '/play/alef-bet-rush/': undefined,
  '/play/hebrew-mahjong/': undefined,
  '/play/hebrew-word-search/': '2026-10-13',
  '/fr/': '2026-10-19',
  '/fr/apprendre/alphabet-hebreu/': '2026-10-19',
  '/fr/apprendre/phrases-hebreu/': phrasesReleaseDateFr,
};
