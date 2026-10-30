// Một nơi duy nhất chứa thông tin cấu hình của website.
// Đổi link webinar, bật/tắt khối khóa học, thêm mạng xã hội... đều sửa ở đây.

export const SITE = {
  name: 'Phan Quang Vinh',
  brand: 'Vinh Nghiền Ngẫm',
  nickname: 'Kelvin',
  url: 'https://phanquangvinh.com',
  tagline: 'Cà phê · DBL Code · Tài sản số',
  description:
    'Phan Quang Vinh (Kelvin): ghi lại những gì mình đang làm ở ba mảng cà phê, DBL Code và tài sản mã hóa (RWA) tại Việt Nam. Có nguồn, có số, có tình huống thật.',
  email: 'kelvinphan1mil@gmail.com',
  zalo: 'https://zalo.me/0978155397',
  zaloPhone: '0978.155.397',
  defaultOg: '/brand/vinh-nghien-ngam-og-1200x630.png',
  portrait: '/pictures/opt/vinh-portrait.jpg',
};

export const SOCIAL = [
  { label: 'TikTok', handle: '@vinhunique', url: 'https://www.tiktok.com/@vinhunique' },
  { label: 'Threads', handle: '@kelvin1mil', url: 'https://www.threads.com/@kelvin1mil' },
  { label: 'Facebook', handle: 'kelvinphan1mil', url: 'https://www.facebook.com/kelvinphan1mil' },
  { label: 'Instagram', handle: '@kelvin1mil', url: 'https://www.instagram.com/kelvin1mil/' },
  { label: 'LinkedIn', handle: 'kelvinph11', url: 'https://www.linkedin.com/in/kelvinph11/' },
];

// Kênh cà phê riêng (handle đã chốt 29/10/2026). Kiểm tra link còn sống trước khi bật.
export const COFFEE_CHANNEL = {
  enabled: true,
  name: 'Vinh Nghiền Ngẫm ☕',
  handle: '@vinh.nghienngam',
  links: [
    { label: 'TikTok', url: 'https://www.tiktok.com/@vinh.nghienngam' },
    { label: 'Instagram', url: 'https://www.instagram.com/vinh.nghienngam/' },
  ],
};

// Gắn UTM + mã giới thiệu để biết lead đến từ website này.
export function tracked(url: string, campaign: string): string {
  const u = new URL(url);
  u.searchParams.set('ref', 'vinh');
  u.searchParams.set('utm_source', 'phanquangvinh.com');
  u.searchParams.set('utm_medium', 'website');
  u.searchParams.set('utm_campaign', campaign);
  return u.toString();
}

// Webinar miễn phí. Tự ẩn sau giờ kết thúc (endsAt). Tắt tay bằng enabled=false.
// Trang đích đang noindex (hệ thống khóa quản lý), nên chỉ dẫn link, không lấy nội dung về.
export const WEBINAR = {
  enabled: true,
  title: 'Webinar miễn phí: Hiểu thị trường hàng hóa trong 3 giờ',
  dateLabel: 'Thứ Tư, 04/11/2026 · 19:30–22:30 · Zoom',
  endsAt: '2026-11-04T22:30:00+07:00',
  url: 'https://bi-mat-giao-dich-robusta.vercel.app/webinar',
};

export function isWebinarOpen(now: number = Date.now()): boolean {
  return WEBINAR.enabled && now < Date.parse(WEBINAR.endsAt);
}

// Khóa "Bí Mật Giao Dịch Cà Phê Robusta" (HAP Academy, giảng viên David Dũng).
// Quy tắc công khai: KHÔNG ghi giá, KHÔNG nêu số suất, KHÔNG hứa kết quả.
// Chi tiết ưu đãi chỉ để ở trang khóa.
export const COURSE = {
  enabled: true,
  name: 'Bí Mật Giao Dịch Cà Phê Robusta',
  host: 'HAP Academy · giảng viên David Dũng',
  schedule: 'Khai giảng 10, 11, 12/11/2026 · Zoom',
  url: 'https://bi-mat-giao-dich-robusta.vercel.app/',
};

export const DBL = {
  url: 'https://dblcode.com',
};

export type ModuleSlug = 'ca-phe' | 'dbl-code' | 'tai-san-so';
export type CategorySlug = ModuleSlug | 'goc-vinh';

export interface CategoryInfo {
  slug: CategorySlug;
  name: string;
  short: string;
  path: string;
  blurb: string;
  disclaimer?: string;
}

// 3 module + 1 mục chung. Thứ tự ở đây = thứ tự trên menu và các tab bài viết.
export const MODULES: CategoryInfo[] = [
  {
    slug: 'ca-phe',
    name: 'Cà phê',
    short: 'Cà phê',
    path: '/ca-phe',
    blurb: 'Chuyện thị trường cà phê và kinh doanh quanh ly cà phê, kể có nguồn.',
    disclaimer:
      'Nội dung chia sẻ kiến thức, không phải khuyến nghị đầu tư và không cam kết lợi nhuận. Các ví dụ số có ghi "giả định" là số tự đặt để minh họa.',
  },
  {
    slug: 'dbl-code',
    name: 'DBL Code',
    short: 'DBL Code',
    path: '/dbl-code',
    blurb: 'Giải mã năng lực con người để dùng người đúng, chọn hướng đi đúng.',
  },
  {
    slug: 'tai-san-so',
    name: 'Tài sản số',
    short: 'Tài sản số',
    path: '/tai-san-so',
    blurb: 'Tài sản mã hóa (TSMH), RWA và khung pháp lý tại Việt Nam.',
    disclaimer:
      'Nội dung mang tính tham khảo, không phải tư vấn đầu tư hay tư vấn pháp lý. Hãy đối chiếu văn bản pháp luật gốc trước khi ra quyết định.',
  },
];

export const GOC_VINH: CategoryInfo = {
  slug: 'goc-vinh',
  name: 'Góc Vinh',
  short: 'Góc Vinh',
  path: '/chuyen-muc/goc-vinh',
  blurb: 'AI, tự động hóa, năng suất và những suy nghĩ cá nhân.',
};

export const CATEGORIES: CategoryInfo[] = [...MODULES, GOC_VINH];

export function categoryOf(slug: string): CategoryInfo {
  return CATEGORIES.find((c) => c.slug === slug) ?? GOC_VINH;
}

export const NAV = [
  { label: 'Cà phê', href: '/ca-phe', key: 'ca-phe' },
  { label: 'DBL Code', href: '/dbl-code', key: 'dbl-code' },
  { label: 'Tài sản số', href: '/tai-san-so', key: 'tai-san-so' },
  { label: 'Bài viết', href: '/bai-viet', key: 'bai-viet' },
  { label: 'Về Vinh', href: '/ve-vinh', key: 've-vinh' },
];
