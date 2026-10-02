// Real "Last updated" dates of the legal documents (ISO, UTC). Shown on the
// pages themselves and used as their sitemap lastmod, so the two cannot drift.
export const legalUpdated = {
  privacy: '2026-09-30',
  terms:   '2026-09-25',
};

export function formatLegalDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'
  });
}
