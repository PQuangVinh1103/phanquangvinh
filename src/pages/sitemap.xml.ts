import type { APIRoute } from 'astro';
import { CATEGORIES, SITE } from '../config/site';
import { getPublishedPosts } from '../lib/posts';

export const prerender = false;

// Sitemap tự sinh theo bài đã đăng (site chạy SSR nên không dùng @astrojs/sitemap).
export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();
  const fixed = ['/', '/ca-phe', '/dbl-code', '/tai-san-so', '/bai-viet', '/ve-vinh', ...CATEGORIES.map((c) => `/chuyen-muc/${c.slug}`)];
  const urls = [
    ...fixed.map((p) => `<url><loc>${SITE.url}${p === '/' ? '' : p}</loc></url>`),
    ...posts.map((p) => `<url><loc>${SITE.url}/bai-viet/${p.id}</loc><lastmod>${(p.data.updatedAt ?? p.data.publishedAt).toISOString().slice(0, 10)}</lastmod></url>`),
  ].join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=600' } });
};
