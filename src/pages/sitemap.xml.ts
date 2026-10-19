import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { legalUpdated } from '../data/legal';
import { websitePrivacyUpdated } from '../data/website-privacy';
import { pageUpdatedDates } from '../data/page-updates';
import { courseSitemapEntries } from '../lib/alphabet-course.mjs';
import { phrasesSitemapEntries } from '../lib/hebrew-phrases.mjs';

const SITE = 'https://hebrewedu.com';

function toDateString(date: Date): string {
  return date.toISOString().split('T')[0];
}

function validateLastmod(date: string): string {
  const parsed = new Date(date);
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    !Number.isFinite(parsed.getTime()) ||
    toDateString(parsed) !== date ||
    date > toDateString(new Date())
  ) {
    throw new Error(`Invalid or future sitemap lastmod: ${date}`);
  }
  return date;
}

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog');

  // New publications change the listing; article body edits do not.
  const sorted = posts.sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );

  const latestPostDate = sorted.length > 0
    ? toDateString(sorted[0].data.pubDate)
    : undefined;

  const listingDates = [latestPostDate, pageUpdatedDates['/blog/']]
    .filter((date): date is string => date !== undefined)
    .map(validateLastmod);
  const blogIndexLastmod = listingDates.sort().at(-1);

  const staticPages = [
    { url: '/play/', priority: '0.8', changefreq: 'monthly', lastmod: pageUpdatedDates['/play/'] },
    { url: '/play/alef-bet-rush/', priority: '0.9', changefreq: 'monthly', lastmod: pageUpdatedDates['/play/alef-bet-rush/'] },
    { url: '/play/hebrew-mahjong/', priority: '0.9', changefreq: 'monthly', lastmod: pageUpdatedDates['/play/hebrew-mahjong/'] },
    { url: '/play/hebrew-word-search/', priority: '0.9', changefreq: 'monthly', lastmod: pageUpdatedDates['/play/hebrew-word-search/'] },
    {
      url: '/',
      priority: '1.0',
      changefreq: 'weekly',
      lastmod: pageUpdatedDates['/'],
    },
    {
      url: '/fr/',
      priority: '1.0',
      changefreq: 'weekly',
      lastmod: pageUpdatedDates['/fr/'],
    },
    {
      url: '/fr/apprendre/alphabet-hebreu/',
      priority: '0.8',
      changefreq: 'weekly',
      lastmod: pageUpdatedDates['/fr/apprendre/alphabet-hebreu/'],
    },
    {
      url: '/blog/',
      priority: '0.8',
      changefreq: 'weekly',
      lastmod: blogIndexLastmod,
    },
    {
      url: '/privacy/',
      priority: '0.3',
      changefreq: 'yearly',
      lastmod: legalUpdated.privacy,
    },
    {
      url: '/website-privacy/',
      priority: '0.3',
      changefreq: 'yearly',
      lastmod: websitePrivacyUpdated,
    },
    {
      url: '/terms/',
      priority: '0.3',
      changefreq: 'yearly',
      lastmod: legalUpdated.terms,
    },
  ];

  const blogPages = sorted.map((post) => ({
    url: `/blog/${post.id}/`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: [toDateString(post.data.updatedDate ?? post.data.pubDate), ...(post.id === 'how-to-learn-hebrew-vocabulary' && pageUpdatedDates['/learn/hebrew-phrases/'] ? [pageUpdatedDates['/learn/hebrew-phrases/']!] : [])].sort().at(-1),
  }));

  // Preview flags never affect indexing; only the explicit approved release manifest does.
  const allPages = [...staticPages, ...blogPages, ...courseSitemapEntries(), ...phrasesSitemapEntries()];
  for (const page of allPages) {
    if (page.lastmod !== undefined) validateLastmod(page.lastmod);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${SITE}${page.url}</loc>
${page.lastmod !== undefined ? `    <lastmod>${page.lastmod}</lastmod>\n` : ''}    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
