# Version 1 Archive — phanquangvinh.com

Thư mục này lưu trữ toàn bộ mã nguồn, giao diện và nội dung của **Website Version 1** (trước đợt tái cấu trúc Tháng 9/2026).

---

## 📁 Cấu trúc lưu trữ

1. **`html-mockups/`**: Các file HTML, script mapping ảnh và cấu hình thử nghiệm ban đầu:
   - `index.html`, `about.html`, `blog.html`, `projects.html`, `organizer.html`, `logo_test.html`
   - `apply_photo_mapping.py`, `photo_mapping.json`, `setup-keystatic-astro/`
2. **`old-pages/`**: Các trang Astro của Version 1 (CV cá nhân, thành tích học thuật, danh mục dự án, blog đa tầng):
   - `about.astro`, `projects.astro`, `organizer.astro`, `travel.astro`, `blog/`

---

## 💡 Đánh giá Kế thừa (Inheritance & Actionable Assets)

| Thành phần Version 1 | Trạng thái kế thừa sang Version 2 | Ghi chú |
| :--- | :--- | :--- |
| **Ảnh chân dung & Lifestyle** | ✅ **Đã kế thừa toàn bộ** | Toàn bộ ảnh gốc chất lượng cao được giữ trong `public/pictures/` để sử dụng cho Hero và các điểm chạm. |
| **Nội dung 4 bài viết trong `src/content/posts/`** | 🟡 **Tư liệu raw** | Giữ làm chất liệu để chuyển đổi thành các cẩm nang/bài phân tích tư duy theo định vị mới. |
| **Bảng điểm GPA, giải thưởng, CV formal** | ❌ **Loại bỏ hoàn toàn** | Không phù hợp với định vị mới (Client-Centric, Helper Mentality). |
| **Giao diện Navy + Gold cũ** | ❌ **Thay thế bằng Version 2** | Đã chuyển sang Hệ thống Electric Cobalt Blue (`#0066FF`) + Typography hiện đại `Bricolage Grotesque`. |
