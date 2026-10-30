import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdoc}' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    status: z.enum(['draft', 'published']).default('draft'),
    category: z.enum(['ca-phe', 'dbl-code', 'tai-san-so', 'goc-vinh']).default('goc-vinh'),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    coverImage: z.string().optional(),
    videoUrl: z.string().optional(),
    readingTime: z.string().optional(),
    textAlign: z.enum(['left', 'justify']).default('left'),
    // Kiểm nguồn: bài mục Cà phê chỉ hiện công khai khi verified = true (xem src/lib/posts.ts).
    verified: z.boolean().default(false),
    hasAssumption: z.boolean().default(false),
    sources: z
      .array(
        z.object({
          title: z.string(),
          url: z.string().optional(),
          // YAML tự đọc 2026-10-01 thành kiểu ngày nên nhận cả hai, đổi về chữ YYYY-MM-DD.
          date: z
            .union([z.string(), z.date()])
            .transform((v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v))
            .optional(),
        }),
      )
      .default([]),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
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
