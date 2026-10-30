# phanquangvinh.com — Website cá nhân của Phan Quang Vinh (Kelvin)

**Stack thật:** Astro 5 (SSR) + Decap CMS (trang /admin) + Markdoc + CSS thuần (không Tailwind) — deploy Vercel, remote GitLab (có thêm remote `github`).
**Ngôn ngữ:** chỉ tiếng Việt. Xưng "mình", gọi "bạn". Câu ngắn, thẳng, không motivational.

## Định vị (chốt 29/10/2026)
Tên giữ nguyên **Phan Quang Vinh**. Website xoay quanh 3 mảng Kelvin đang làm, mỗi mảng một module:
- **Cà phê** (`/ca-phe`): kênh Vinh Nghiền Ngẫm ☕, webinar miễn phí, khóa Bí Mật Giao Dịch Cà Phê Robusta.
- **DBL Code** (`/dbl-code`): Kelvin là Manager. Link `dblcode.com`.
- **Tài sản số** (`/tai-san-so`): TSMH, RWA, NQ 05/NQ-CP.
Ngoài ra: `/bai-viet` (blog), `/chuyen-muc/[cat]`, `/ve-vinh` (about + dự án + liên hệ), `/rss.xml`, `/sitemap.xml`, `/api/subscribe`.
Mục "Góc Vinh" (`goc-vinh`) là chuyên mục chung cho AI, năng suất, suy nghĩ cá nhân.

## Nhận diện
Cùng "bộ" với nhận diện khóa Robusta (kem · xanh rừng · vàng đồng · nâu) nhưng KHÔNG sao chép giống hệt. Chữ: Lora (tiêu đề), Inter (thân), Oswald (nhãn). Không logo. Mỗi module có màu riêng (`--m-ca-phe`, `--m-dbl-code`, `--m-tai-san-so`). Đỏ `#f00055` chỉ cho số giảm/cảnh báo. Toàn bộ token ở `src/styles/global.css` (`:root`).

## Cấu trúc code
- `src/config/site.ts`: **một nơi cấu hình**: thông tin site, mạng xã hội, kênh cà phê, `WEBINAR` (tự ẩn sau `endsAt`), `COURSE`, `MODULES`/`CATEGORIES`, menu.
- `src/lib/posts.ts`: lấy bài đã đăng. Bài mục Cà phê chỉ hiện khi `verified: true`.
- `src/content.config.ts` + `public/admin/config.yml`: schema bài viết và khai báo trang quản trị (phải sửa đồng bộ cả hai).
- `src/layouts/BaseLayout.astro`: SEO, header, footer, banner webinar. `src/components/`: PostCard, PostListing, NewsletterForm, WebinarPromo.
- `src/content/posts/*.mdoc`, `src/content/projects/*.json`: nội dung.
- `vercel.json`: redirect link cũ (`/blog`, `/about`, `/projects`, `/travel`).

## Quy tắc nội dung (bắt buộc)
- Số liệu và tuyên bố thật phải có nguồn; số tự đặt ghi "giả định" (tick `hasAssumption`). Mục Cà phê: chỉ tick `verified` (Đã kiểm nguồn) khi mọi số liệu kiểm được.
- Không cam kết lợi nhuận. Không nêu tên MXV. Không ghi giá khóa, không ghi số suất, không nhắc "3 buổi coaching" hay "699K" (chi tiết ưu đãi chỉ ở trang khóa).
- Không đưa DBL Code vào nội dung mảng Cà phê. Không đưa thông tin nội bộ VINDAS (mật) lên web.
- Dữ liệu khóa/webinar lấy từ thư mục `~/Documents/BÍ MẬT GIAO DỊCH CÀ PHÊ ROBUSTA/` (đọc `CLAUDE.md` và `Landing page.../docs/HE-THONG.md` trong đó), không fetch web.
- Mọi link sang webinar/khóa đi qua `tracked()` (gắn `ref=vinh` + UTM).

## Quy trình làm việc
- Chạy web: `npm run dev` → http://localhost:4321/ . Sửa bài ở máy: chạy thêm `npm run cms` rồi mở http://localhost:4321/admin/index.html (không cần đăng nhập). Trên web thật: /admin, đăng nhập bằng tài khoản GitLab, bấm Publish là tự commit vào `main` và Vercel tự đăng. TUYỆT ĐỐI không để mật khẩu hay token trong mã của trang admin.
- Sau thay đổi lớn: chụp screenshot vào `screenshots/` (Google Chrome headless), ghi delta.
- Chỉ commit/push khi Kelvin yêu cầu. Push GitLab → Vercel tự deploy.
- Không over-engineer. Ưu tiên tốc độ tải, a11y cơ bản, SEO (title, canonical, OG, JSON-LD).
