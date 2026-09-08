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
    textAlign: z.enum(['left', 'justify']).default('left'),
  }),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.json' }),
  schema: z.object({
    titleVi: z.string(),
    titleEn: z.string(),
    excerptVi: z.string(),
    excerptEn: z.string(),
    tags: z.array(z.string()).default([]),
    resultVi: z.string(),
    resultEn: z.string(),
    link: z.string().default('#'),
    thumbFrom: z.string().default('#eae6e1'),
    thumbTo: z.string().default('#cbdcd0'),
    coverImage: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const collections = { posts, projects };
