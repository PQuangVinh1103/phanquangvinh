---
name: setup-keystatic-astro
description: Set up, migrate, or troubleshoot Keystatic with Astro for a static/personal website, including blog content collections, Markdoc posts, local authoring, GitHub mirroring, and Vercel deployment. Use when asked to install Keystatic, make an Astro blog CMS, configure /keystatic, move from HTML pages to Astro routes, publish posts from Markdown/Markdoc, or explain local mode vs GitHub mode.
---

# Setup Keystatic Astro

## Quick Workflow

1. Inspect the repo before changing files:
   - `rg --files -g 'package.json' -g 'astro.config.*' -g 'src/**' -g 'public/**'`
   - `git status --short --branch`
   - `git remote -v`
2. If the site is plain HTML, migrate conservatively:
   - Create `src/pages`.
   - Copy existing pages to `.astro` routes first.
   - Move static files into `public`.
   - Rewrite internal `.html` links to clean Astro routes (`/blog`, `/about`, `/projects`).
3. Install compatible dependencies.
4. Add Astro config, Keystatic config, content collection schema, and blog routes.
5. Seed one or more `.mdoc` posts so `/blog` and `/blog/[slug]` can be verified immediately.
6. Run `npm run build`, fix content/frontmatter errors, then run `npm run dev`.
7. For GitHub/Vercel production authoring, read `references/github-vercel.md`.

## Dependency Rules

Use Astro v5 when `@keystatic/astro` peer dependencies do not support the latest Astro major. A known working set:

```bash
npm install astro@5 @astrojs/react@4 @astrojs/markdoc@0.15 @astrojs/vercel@8 @keystatic/core @keystatic/astro react react-dom
```

Use these scripts in `package.json`:

```json
{
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  }
}
```

Never commit tokens copied from remote URLs into `package.json` or docs. `npm init` may copy a tokenized Git remote into package metadata; remove it.

## Core Files

Create `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import vercel from '@astrojs/vercel';
import keystatic from '@keystatic/astro';

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [react(), markdoc(), keystatic()],
});
```

Create `keystatic.config.ts` for local authoring:

```ts
import { collection, config, fields } from '@keystatic/core';

export default config({
  storage: { kind: 'local' },
  collections: {
    posts: collection({
      label: 'Blog posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      columns: ['title', 'publishedAt', 'status', 'category'],
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true }),
        publishedAt: fields.date({ label: 'Published date' }),
        status: fields.select({
          label: 'Status',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
          ],
          defaultValue: 'draft',
        }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Finance', value: 'finance' },
            { label: 'AI & Automation', value: 'ai' },
            { label: 'Productivity', value: 'productivity' },
            { label: 'Life', value: 'life' },
          ],
          defaultValue: 'life',
        }),
        coverImage: fields.image({
          label: 'Cover image',
          directory: 'public/images/blog',
          publicPath: '/images/blog/',
        }),
        readingTime: fields.text({ label: 'Reading time', defaultValue: '5 phút đọc' }),
        content: fields.markdoc({ label: 'Content', extension: 'mdoc' }),
      },
    }),
  },
});
```

Create `src/content.config.ts`:

```ts
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
```

## Blog Routes

Create `src/pages/blog/index.astro` to:

- Load posts with `getCollection('posts')`.
- Filter to `post.data.status === 'published'`.
- Sort by `publishedAt` descending.
- Link each card to `/blog/${post.id.replace(/\.(md|mdoc)$/, '')}`.

Create `src/pages/blog/[slug].astro` to:

- Export `prerender = true` when using `getStaticPaths`.
- Return only published posts.
- Use `const { Content } = await render(post)`.

Quote YAML frontmatter values that contain `:` or other special characters:

```yaml
title: "n8n + AI: Workflow tôi dùng để làm việc gấp 5 lần"
excerpt: "Short summary here."
```

## Local Authoring

Run:

```bash
npm run dev -- --host 127.0.0.1
```

Open:

```text
http://127.0.0.1:4321/keystatic
```

Posts are written to `src/content/posts`. Uploaded images go to `public/images/blog`.

After editing:

```bash
git status
git add src/content/posts public/images/blog
git commit -m "Add blog post"
git push github main
```

## Validation

Always run:

```bash
npm run build
```

Verify:

```bash
curl -I http://127.0.0.1:4321/
curl -I http://127.0.0.1:4321/blog
curl -I http://127.0.0.1:4321/keystatic
```

Expected warnings that usually do not block release:

- Keystatic client chunk can exceed Vite's 500 kB warning threshold.
- Local Node may differ from Vercel runtime; Vercel commonly uses Node 22 for serverless functions.

## Safety Notes

- Treat `.git/config` remote URLs as sensitive if they contain PATs or GitLab tokens.
- Do not print or commit tokens.
- If a token appeared in output or config, tell the user to rotate it.
- Local Keystatic mode is for authoring on the developer machine. Production `/keystatic` should use GitHub auth or additional access protection.
