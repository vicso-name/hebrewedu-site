import { createHash } from 'node:crypto';
import { phraseGroups, phraseDialogues, phraseExercises, phraseQuestions, phraseReview } from '../data/hebrew-phrases.ts';

export const phrasesPath = '/learn/hebrew-phrases/';
export const phrasesTitle = 'Hebrew Phrases for Beginners: 30 Useful Phrases | HebrewEdu';
export const phrasesDescription = 'Learn 30 everyday Hebrew phrases with English meanings, transliteration and beginner-friendly usage notes. Try a short practice exercise, then keep learning.';
export const phraseContentSha256 = createHash('sha256').update(JSON.stringify({ phraseGroups, phraseDialogues, phraseExercises, phraseQuestions })).digest('hex');

function realDate(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value && value <= new Date().toISOString().slice(0, 10);
}

export function phrasesPublished(review = phraseReview, contentSha256 = phraseContentSha256) {
  const approved = review.editorialApproved && Boolean(review.reviewer?.trim()) && Boolean(review.qualification?.trim()) && realDate(review.reviewedAt) && review.approvedContentSha256 === contentSha256;
  if (review.published && (!approved || !realDate(review.publishedAt) || review.publishedAt < review.reviewedAt)) throw new Error('Hebrew phrases release requires dated editorial sign-off for the exact current content');
  if (!review.published && review.publishedAt !== null) throw new Error('Draft phrases must not claim a publication date');
  return review.published === true && approved;
}

export function localPhrasesPreview(dev = false) {
  // Only the dev server can expose a draft; no environment flag bypasses a production build.
  return dev === true;
}
export function phrasesEnabled(preview = false) { return phrasesPublished() || preview; }
export function phrasesSitemapEntries(review = phraseReview, contentSha256 = phraseContentSha256) {
  return phrasesPublished(review, contentSha256) ? [{ url: phrasesPath, lastmod: review.publishedAt, priority: '0.8', changefreq: 'monthly' }] : [];
}
export function phrasesSchema() {
  const url = `https://hebrewedu.com${phrasesPath}`;
  return { '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: phrasesTitle, description: phrasesDescription, inLanguage: ['en', 'he'] },
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://hebrewedu.com/' },
      { '@type': 'ListItem', position: 2, name: 'Hebrew Phrases', item: url },
    ] },
  ] };
}
