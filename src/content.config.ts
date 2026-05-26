import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdoc}' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    publishedAt: z.coerce.date(),
    status: z.enum(['draft', 'published']).default('draft'),
    category: z.enum(['finance', 'ai', 'productivity', 'life']).default('life'),
    coverImage: z.string().optional(),
    readingTime: z.string().optional(),
  }),
});

export const collections = { posts };
