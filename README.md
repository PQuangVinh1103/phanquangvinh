# phanquangvinh.com

Website cá nhân và blog của Phan Quang Vinh (Vinh Nghiền Ngẫm ☕). Astro 5 (SSR) + Decap CMS + Markdoc, deploy Vercel, mã nguồn GitLab.

## Chạy ở máy

```bash
npm install
npm run dev        # web: http://localhost:4321/
npm run cms        # (terminal khác) máy chủ cho trang quản trị chạy local
```

Mở http://localhost:4321/admin/index.html để viết hoặc sửa bài ở máy, không cần đăng nhập. Lưu là ghi thẳng vào file trong `src/content/`.

## Cấu trúc site

- `/` trang chủ, `/ca-phe`, `/dbl-code`, `/tai-san-so` (3 module), `/bai-viet` (blog), `/chuyen-muc/[cat]`, `/ve-vinh`.
- Cấu hình chung (menu, webinar, khóa, mạng xã hội, tên thương hiệu): `src/config/site.ts`.
- Logo và favicon: `public/brand/` và `public/` (bộ gốc ở `Personal Branding/Kênh Cà Phê/assets/brand/vinh-nghien-ngam/`).

## Viết bài trên web thật (tự động đăng)

1. Mở `https://phanquangvinh.com/admin`, bấm "Đăng nhập" bằng tài khoản GitLab.
2. Chọn "Bài viết", viết nội dung, đặt Trạng thái là "Đăng công khai", bấm **Publish**.
3. Decap tự commit vào nhánh `main` trên GitLab, Vercel tự đăng sau khoảng 1 phút.

Quy tắc: bài mục **Cà phê** chỉ hiện công khai khi tick "Đã kiểm nguồn". Số tự đặt thì tick "Có số liệu giả định".

### Cài đặt đăng nhập GitLab (làm một lần)

Trong GitLab: User Settings → Applications → Add new application.
- Name: `phanquangvinh CMS`
- Redirect URI (mỗi dòng một địa chỉ):
  `https://www.phanquangvinh.com/admin/`
  `https://phanquangvinh.com/admin/`
  `http://localhost:4321/admin/`
- **Bỏ tick Confidential**, tick scope **api**.
- Lưu, copy **Application ID**, dán vào `app_id` trong `public/admin/config.yml`, rồi push.

Đăng nhập kiểu PKCE nên không có mật khẩu hay token nào nằm trong mã. Chỉ người có quyền ghi vào dự án GitLab mới sửa được.

## Bản tin email

Form gọi `/api/subscribe`, chuyển tiếp tới webhook n8n. Đặt biến môi trường `NEWSLETTER_WEBHOOK_URL` trong Vercel (Settings → Environment Variables) rồi deploy lại. Chưa đặt thì form tự ẩn.

## Build

```bash
npm run build
```

Dự án dùng adapter Vercel vì có trang động (bài viết, API, đếm ngược webinar).

## Mirror GitHub (tùy chọn)

```bash
git push origin main     # GitLab, nơi Vercel deploy
git push github main     # bản sao
```
