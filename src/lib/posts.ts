import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

// Bài hiện công khai: status = published. Riêng mục Cà phê phải tick "đã kiểm nguồn"
// (quy tắc kênh: không đưa số liệu chưa có nguồn).
export function isPublished(p: Post): boolean {
  if (p.data.status !== 'published') return false;
  if (p.data.category === 'ca-phe' && !p.data.verified) return false;
  return true;
}

export async function getPublishedPosts(category?: string): Promise<Post[]> {
  const all = await getCollection('posts');
  return all
    .filter(isPublished)
    .filter((p) => !category || p.data.category === category)
    .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
}

export function readingTime(p: Post): string {
  if (p.data.readingTime?.trim()) return p.data.readingTime;
  const words = (p.body ?? '').split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} phút đọc`;
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Asia/Ho_Chi_Minh' });
}

export const PAGE_SIZE = 9;
