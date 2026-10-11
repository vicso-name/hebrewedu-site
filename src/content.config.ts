import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { lessonSchema } from './lib/lessons/schema.mjs';

const blog = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/blog',
  }),
  schema: z.object({
    title:       z.string(),
    seoTitle:    z.string().optional(),
    description: z.string(),
    pubDate:     z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author:      z.string().default('HebrewEdu Team'),
    category:    z.string(),
    readingTime: z.string(),
    featured:    z.boolean().default(false),
    showAppCta:  z.boolean().default(true),
    tags:        z.array(z.string()).optional(),
  }),
});

// A separate local-review collection; publication is controlled by the lesson route.
const lessons = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/lessons' }),
  schema: lessonSchema,
});

export const collections = { blog, lessons };
