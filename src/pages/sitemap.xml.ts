import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE = 'https://hebrewedu.com';

function toDateString(date: Date): string {
  return date.toISOString().split('T')[0];
}

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog');

  // Sort newest first so /blog lastmod reflects the most recent post
  const sorted = posts.sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );

  const latestPostDate = sorted.length > 0
    ? toDateString(sorted[0].data.pubDate)
    : toDateString(new Date());

  const staticPages = [
    {
      url: '/',
      priority: '1.0',
      changefreq: 'weekly',
      lastmod: latestPostDate,
    },
    {
      url: '/blog/',
      priority: '0.8',
      changefreq: 'weekly',
      lastmod: latestPostDate,
    },
    {
      url: '/privacy/',
      priority: '0.3',
      changefreq: 'yearly',
      lastmod: '2025-07-01',
    },
    {
      url: '/terms/',
      priority: '0.3',
      changefreq: 'yearly',
      lastmod: '2025-07-01',
    },
  ];

  const blogPages = sorted.map((post) => ({
    url: `/blog/${post.slug}/`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: toDateString(post.data.pubDate),
  }));

  const allPages = [...staticPages, ...blogPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${SITE}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
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
