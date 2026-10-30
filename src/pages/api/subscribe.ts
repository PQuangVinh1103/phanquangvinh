import type { APIRoute } from 'astro';

export const prerender = false;

const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8' } });

// Nhận email từ form bản tin và chuyển tiếp tới webhook n8n (NEWSLETTER_WEBHOOK_URL).
// n8n lo phần ghi Google Sheets / GetResponse. Chưa có biến môi trường thì trả 503, không mất email im lặng.
export const POST: APIRoute = async ({ request }) => {
  let body: { email?: string; website?: string; source?: string; page?: string };
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, message: 'Dữ liệu không hợp lệ.' }, 400);
  }

  // Ô ẩn "website": bot điền vào thì giả vờ thành công.
  if (body.website) return json({ ok: true, message: 'Đã nhận. Cảm ơn bạn!' });

  const email = (body.email ?? '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 254) {
    return json({ ok: false, message: 'Email chưa đúng, bạn kiểm tra lại nhé.' }, 400);
  }

  const hook = import.meta.env.NEWSLETTER_WEBHOOK_URL;
  if (!hook) {
    return json({ ok: false, message: 'Form chưa mở. Bạn nhắn mình qua Zalo 0978.155.397 giúp nhé.' }, 503);
  }

  try {
    const res = await fetch(hook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        source: String(body.source ?? '').slice(0, 80),
        page: String(body.page ?? '').slice(0, 200),
        at: new Date().toISOString(),
      }),
    });
    if (!res.ok) throw new Error(String(res.status));
    return json({ ok: true, message: 'Đã nhận. Cảm ơn bạn!' });
  } catch {
    return json({ ok: false, message: 'Có lỗi khi gửi, bạn thử lại sau nhé.' }, 502);
  }
};
