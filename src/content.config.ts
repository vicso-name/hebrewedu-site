import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { lessonSchema } from './lib/lessons/schema.mjs';

const blogSchema = z.object({
  title:       z.string(),
  seoTitle:    z.string().optional(),
  description: z.string(),
  pubDate:     z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  author:      z.string().default('HebrewEdu Team'),
  category:    z.string(),
  /** Dictionary key for `category` (src/i18n's `blog.categories`). Present on
   *  every post that has a counterpart in the other locale, so the two
   *  taxonomies can't drift; `category` is the fallback label when absent. */
  categoryKey: z.string().optional(),
  readingTime: z.string(),
  featured:    z.boolean().default(false),
  showAppCta:  z.boolean().default(true),
  tags:        z.array(z.string()).optional(),
  /** Rendered via Faq.astro at the end of the article, before the closing CTA. */
  faq:         z.array(z.object({ q: z.string(), a: z.string() })).optional(),
  /** Pairs this post 1:1 with its counterpart in the other locale, which is what
   *  drives reciprocal hreflang (docs/I18N.md §3). FR slugs are French and some
   *  FR posts cover several EN sections, so the shared-slug trick used for letter
   *  lessons cannot work here. By convention the key is the EN post's id.
   *  A post with no counterpart omits it and declares no alternates. */
  translationKey: z.string().optional(),
});

// EN posts are the files directly in src/content/blog/. The pattern is
// deliberately non-recursive: '**/*.md' would also match src/content/blog/fr/,
// pulling FR posts into the EN collection — same reason EN lessons glob '*.json'
// while FR lessons live in their own subdirectory (docs/I18N.md §2).
const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/blog' }),
  schema: blogSchema,
});

// FR posts live in their own subdirectory (never mixed with EN files), so this
// glob can never pick up an EN entry under the 'blogFr' collection name.
// Same schema, reused as-is.
const blogFr = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/blog/fr' }),
  schema: blogSchema,
});

// A separate local-review collection; publication is controlled by the lesson route.
const lessons = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/lessons' }),
  schema: lessonSchema,
});

// FR lesson content lives in its own subdirectory (never mixed with EN files) so
// this glob can never pick up an EN entry under the 'lessonsFr' collection name —
// see docs/LESSON_PIPELINE.md and docs/I18N_AUDIT.md §3. Same schema, reused as-is.
const lessonsFr = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/lessons/fr' }),
  schema: lessonSchema,
});

export const collections = { blog, blogFr, lessons, lessonsFr };
