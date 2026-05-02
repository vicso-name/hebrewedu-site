import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    pubDate:     z.date(),
    updatedDate: z.date().optional(),
    author:      z.string().default('HebrewEdu Team'),
    category:    z.string(),
    readingTime: z.string(),
    featured:    z.boolean().default(false),
  }),
});

export const collections = { blog };
