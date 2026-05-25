# phanquangvinh.com — Personal Brand Website

## Tổng quan Dự án

Website cá nhân của **Phan Quang Vinh** — một không gian lai giữa professional portfolio và lifestyle journal. Không chỉ là CV online, đây là nơi thể hiện toàn diện con người: tư duy, hành trình, góc nhìn và cuộc sống.

**Domain:** phanquangvinh.com  
**Tech Stack:** Next.js (App Router) + Tailwind CSS  
**Deploy:** Vercel  
**Ngôn ngữ mặc định:** Tiếng Việt (có thể bổ sung EN sau)

---

## Mục tiêu Website

| Phân khúc | Tỷ trọng | Mục tiêu |
|---|---|---|
| Nhà tuyển dụng / HR | ~30% | Showcase năng lực, thay thế CV truyền thống |
| Cộng đồng / Followers | ~40% | Chia sẻ kiến thức, xây dựng thương hiệu cá nhân |
| Đối tác / Clients | ~20% | Kết nối cơ hội hợp tác, tư vấn |
| Bạn bè / Cá nhân | ~10% | Lưu giữ hành trình, lifestyle |

---

## Thông tin Chủ Website

### Nhân vật
- **Họ tên:** Phan Quang Vinh
- **Nickname/Brand:** Vinh PQ (có thể dùng cho social handles)
- **Học vấn:** Cử nhân Tài chính Quốc tế — ĐH Ngoại Thương TP.HCM (GPA 3.61/4.0 — Xuất sắc)
- **Thành tích học thuật:** Điểm THPTQG 26.85/30 (Toán-Lý-Hóa), Giải Nhất HSG Vật lý TP. Đà Nẵng

### DNA Năng lực (Professional Identity)
Điểm giao thoa độc đáo giữa 4 trụ cột:
1. **Finance & Investment** — Tài chính quốc tế, chứng khoán phái sinh, tokenization (RWA), crypto markets
2. **Process & Systems Thinking** — Phân tích bottleneck, tối ưu quy trình vận hành, operations
3. **Digital & AI Mindset** — Python, AI prompt engineering, automation, no-code/low-code tools
4. **Rapid Learning & Execution** — Ứng dụng AI để đẩy nhanh tốc độ học và triển khai gấp 10x

### Achievements đáng highlight
- Xây dựng website hoàn chỉnh trong 3 tiếng bằng AI
- Thiết kế hệ thống n8n tự động sản xuất ~83.000 trang báo cáo trong 2 ngày
- Thiết kế hệ thống Marketing automation & phần mềm CRM
- GPA 3.61/4.0 ngành Tài chính Quốc tế — FTU

---

## Cấu trúc Website (Site Architecture)

```
/                   → Homepage (Hero + Quick intro + Featured content)
/about              → About me (Story, values, timeline)
/work               → Professional portfolio (skills, experience, projects)
/blog               → Blog (bài viết kiến thức, góc nhìn, phân tích)
/travel             → Travel journal (hành trình, ảnh, câu chuyện)
/now                → /now page — đang làm gì, đang học gì (cập nhật định kỳ)
/contact            → Contact + links
```

### Chi tiết từng trang

#### `/` — Homepage
- Hero section: tagline ngắn, ảnh, CTA
- "Tôi là ai" — 2-3 dòng sharp, không nhàm
- Featured posts / projects gần nhất
- Quick links: Work, Blog, Travel, Contact

#### `/about` — About
- Origin story: Đà Nẵng → FTU → career journey
- Core values & worldview
- Timeline sự kiện đáng nhớ (học thuật + nghề nghiệp + cá nhân)
- Sở thích, lifestyle ngắn gọn
- Tech/Tools stack hiện dùng

#### `/work` — Professional
- Skills matrix (Finance, Tech, AI/Automation, Ops)
- Experience timeline (các vai trò đã qua)
- Projects nổi bật với kết quả đo lường được
- Resume download (PDF)
- Open to opportunities indicator

#### `/blog` — Blog
- Categories: Finance & Investing | AI & Automation | Productivity | Life & Thoughts
- Bài viết dạng long-form, có depth
- Search + filter theo category/tag
- Reading time estimate

#### `/travel` — Travel
- Photo gallery + câu chuyện ngắn mỗi chuyến
- Map/pins các nơi đã đến (optional)
- Format: ảnh đẹp + vài đoạn cảm nhận, không quá formal

#### `/now` — Now Page
- Đang tập trung vào gì (công việc, học, dự án)
- Đang đọc sách gì / nghe gì / xem gì
- Mood / mindset hiện tại
- Cập nhật hàng tháng, ghi ngày update

#### `/contact`
- Form liên hệ đơn giản
- Social links: LinkedIn, GitHub, email
- Availability status

---

## Content Strategy

### Tone of Voice
- **Tiếng Việt là chính**, tự nhiên, không cứng nhắc
- Thông minh nhưng không pretentious — viết như nói chuyện với người bạn giỏi
- Có quan điểm rõ ràng, dám nói thẳng góc nhìn cá nhân
- Professional khi cần, personal và thú vị khi phù hợp

### Blog Categories & Định hướng nội dung
| Category | Nội dung | Tần suất |
|---|---|---|
| Finance & Investing | Phân tích thị trường, crypto/RWA, góc nhìn đầu tư | 2x/tháng |
| AI & Automation | Workflow AI, tools, case studies thực tế | 2x/tháng |
| Productivity | Mental models, hệ thống làm việc, học nhanh | 1x/tháng |
| Life & Thoughts | Suy nghĩ, bài học, daily learning | Tùy hứng |

### Travel Content Format
- Ảnh chất lượng cao là trọng tâm
- Story ngắn: bối cảnh, điểm highlight, 1 bài học/cảm xúc đáng nhớ
- Không viết review kiểu travel blog truyền thống — thiên về góc nhìn cá nhân

---

## Design Direction

### Vibe & Aesthetic
- **Clean, minimal, có cá tính** — không generic
- Dark mode hoặc tối màu là ưu tiên (nếu phù hợp với cá tính)
- Typography-forward: font đẹp, hierarchy rõ ràng
- Ảnh lớn, white space đủ thở

### UI Principles
- Mobile-first
- Load nhanh (tối ưu ảnh, lazy loading)
- Không có clutter — mỗi element phải có lý do tồn tại
- Transitions/animations nhẹ nhàng, không gây mất tập trung

### Color Palette (gợi ý)
- Background: #0a0a0a hoặc #111 (dark) / #fafafa (light)
- Accent: 1 màu nhận diện — có thể là indigo, teal, hoặc amber
- Text: high contrast, dễ đọc

---

## Tech Stack Chi tiết

### Core
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS + CSS Variables cho theming
- **Language:** TypeScript

### Content
- **Blog/MDX:** Contentlayer hoặc next-mdx-remote (viết blog bằng Markdown)
- **Images:** next/image với optimization
- **CMS (optional):** Có thể dùng Notion as CMS hoặc local MDX files

### Features
- Dark/Light mode toggle
- RSS feed cho blog
- OG image tự động generate cho từng bài
- Sitemap tự động
- Google Analytics hoặc Plausible (privacy-friendly)

### Deploy & Infra
- **Hosting:** Vercel (free tier đủ dùng ban đầu)
- **Domain:** phanquangvinh.com
- **CI/CD:** Tự động qua Vercel GitHub integration

---

## Cấu trúc Thư mục Code

```
phanquangvinh.com/
├── app/
│   ├── page.tsx              # Homepage
│   ├── about/page.tsx
│   ├── work/page.tsx
│   ├── blog/
│   │   ├── page.tsx          # Blog list
│   │   └── [slug]/page.tsx   # Blog post
│   ├── travel/page.tsx
│   ├── now/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── layout/               # Header, Footer, Nav
│   ├── ui/                   # Reusable UI primitives
│   ├── blog/                 # Blog-specific components
│   └── travel/               # Travel gallery components
├── content/
│   ├── blog/                 # .mdx files cho blog
│   └── travel/               # .mdx files cho travel posts
├── lib/
│   └── utils.ts
├── public/
│   └── images/
└── CLAUDE.md
```

---

## Quy trình Làm việc (Workflow Rules)

### Sau mỗi thay đổi lớn:
1. **Chụp screenshot** trang hiện tại bằng lệnh: `screencapture -x /path/to/screenshots/snapshot_YYYYMMDD_HHMMSS.png` (hoặc dùng browser automation)
2. **So sánh** với bản trước và với design gốc (`references/timblog_live.html`)
3. **Ghi chú** delta: thay đổi gì, cải thiện gì, còn thiếu gì
4. Screenshots lưu tại: `screenshots/` với tên file có timestamp

### Định nghĩa "thay đổi lớn":
- Thêm/xóa/sửa section chính
- Thay đổi color scheme hoặc typography
- Thêm tính năng tương tác (JS)
- Responsive breakpoint changes
- Layout structure changes

---

## Nguyên tắc cho AI khi làm việc trong dự án này

1. **Ưu tiên performance:** Trang phải load nhanh — tối ưu bundle, ảnh, và code splitting
2. **Viết TypeScript nghiêm túc:** Không dùng `any`, type đầy đủ
3. **Tailwind thuần:** Không mix với CSS-in-JS hay styled-components
4. **Component nhỏ, tái sử dụng được:** Tránh monolith components
5. **Không over-engineer:** Build những gì cần, không build cho tương lai giả định
6. **Content trước, design sau:** Khi viết nội dung, focus vào giá trị và tone — không phải format
7. **SEO cơ bản:** Mỗi trang có metadata, OG tags, và structured data phù hợp
8. **Accessibility:** Semantic HTML, alt text cho ảnh, keyboard navigable
9. **Sử dụng Google Chrome:** Nếu có sử dụng trình duyệt để kiểm tra/vận hành, hãy sử dụng Google Chrome.

---

## Milestones

### Phase 1 — MVP (Launch)
- [ ] Setup Next.js + Tailwind boilerplate
- [ ] Homepage + About + Work + Contact
- [ ] Resume download
- [ ] Deploy lên Vercel với domain

### Phase 2 — Blog
- [ ] Blog system với MDX
- [ ] 3-5 bài viết đầu tiên
- [ ] Category + tag system
- [ ] RSS feed

### Phase 3 — Lifestyle
- [ ] Travel gallery
- [ ] /now page
- [ ] Dark/light mode
- [ ] OG image generation

### Phase 4 — Polish
- [ ] Performance audit (Lighthouse > 95)
- [ ] Analytics
- [ ] Email newsletter (optional)
- [ ] i18n EN (optional)
