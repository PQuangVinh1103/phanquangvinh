import type { APIRoute } from 'astro';
import { SITE, categoryOf } from '../config/site';
import { getPublishedPosts } from '../lib/posts';

export const prerender = false;

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = async () => {
  const posts = (await getPublishedPosts()).slice(0, 30);
  const items = posts
    .map((p) => {
      const link = `${SITE.url}/bai-viet/${p.id}`;
      return `<item><title>${esc(p.data.title)}</title><link>${link}</link><guid>${link}</guid><pubDate>${p.data.publishedAt.toUTCString()}</pubDate><category>${esc(categoryOf(p.data.category).name)}</category><description>${esc(p.data.excerpt)}</description></item>`;
    })
    .join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(SITE.name)} — Bài viết</title><link>${SITE.url}</link><description>${esc(SITE.description)}</description><language>vi</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, max-age=600' } });
};
