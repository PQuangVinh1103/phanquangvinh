# phanquangvinh.com

Personal website and blog for Phan Quang Vinh, built with Astro and Keystatic.

## Local development

Install dependencies:

```bash
npm install
```

Run the Astro dev server:

```bash
npm run dev
```

Open the website:

```text
http://127.0.0.1:4321/
```

Open Keystatic:

```text
http://127.0.0.1:4321/keystatic
```

## Cấu trúc site

- `/` trang chủ, `/ca-phe`, `/dbl-code`, `/tai-san-so` (3 module), `/bai-viet` (blog), `/chuyen-muc/[cat]`, `/ve-vinh`.
- Cấu hình chung (menu, webinar, khóa, mạng xã hội): `src/config/site.ts`.
- Bản tin email: form gọi `/api/subscribe`, chuyển tiếp tới webhook n8n. Đặt biến môi trường `NEWSLETTER_WEBHOOK_URL` trong Vercel (Settings → Environment Variables). Chưa đặt thì form báo "chưa mở", không mất email im lặng.

## Blog workflow

Blog posts live in:

```text
src/content/posts
```

Keystatic is configured in local mode, so saving a post in the admin UI writes a `.mdoc` file into the repo. New uploaded cover images are stored in:

```text
public/images/blog
```

Only posts with `status: published` are shown publicly. Posts in the `ca-phe` category also need `verified: true` (tick "Đã kiểm nguồn" in Keystatic) before they appear.

## Build

```bash
npm run build
```

The project uses the Vercel adapter because Keystatic needs server-side routes.

## Mirror to GitHub

Create an empty GitHub repo first, then add it as a second remote:

```bash
git remote add github https://github.com/YOUR_USERNAME/phanquangvinh.com.git
git push github main
```

After that, push to both GitLab and GitHub when needed:

```bash
git push origin main
git push github main
```

Or make GitHub the primary remote:

```bash
git remote set-url origin https://github.com/YOUR_USERNAME/phanquangvinh.com.git
git push -u origin main
```

If you want Keystatic editing on the deployed website, move or mirror the repo to GitHub and switch `keystatic.config.ts` from local storage to GitHub storage.
