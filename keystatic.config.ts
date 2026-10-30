import { collection, config, fields } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    posts: collection({
      label: 'Bài viết',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      columns: ['title', 'publishedAt', 'status', 'category'],
      schema: {
        title: fields.slug({ name: { label: 'Tiêu đề' } }),
        excerpt: fields.text({
          label: 'Mô tả ngắn (hiện ở thẻ bài và Google)',
          multiline: true,
          validation: { length: { min: 20, max: 250 } },
        }),
        category: fields.select({
          label: 'Chuyên mục',
          options: [
            { label: 'Cà phê', value: 'ca-phe' },
            { label: 'DBL Code', value: 'dbl-code' },
            { label: 'Tài sản số', value: 'tai-san-so' },
            { label: 'Góc Vinh (AI, năng suất, suy nghĩ)', value: 'goc-vinh' },
          ],
          defaultValue: 'goc-vinh',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value || 'Tag',
        }),
        publishedAt: fields.date({
          label: 'Ngày đăng',
          validation: { isRequired: true },
        }),
        updatedAt: fields.date({ label: 'Ngày cập nhật (nếu có)' }),
        status: fields.select({
          label: 'Trạng thái',
          options: [
            { label: 'Nháp (chưa hiện)', value: 'draft' },
            { label: 'Đăng công khai', value: 'published' },
          ],
          defaultValue: 'draft',
        }),
        featured: fields.checkbox({
          label: 'Bài nổi bật (hiện đầu trang Bài viết)',
          defaultValue: false,
        }),
        coverImage: fields.image({
          label: 'Ảnh bìa',
          directory: 'public/images/blog',
          publicPath: '/images/blog/',
        }),
        videoUrl: fields.text({
          label: 'Link video TikTok/YouTube liên quan (nếu có)',
        }),
        readingTime: fields.text({
          label: 'Thời gian đọc (để trống = tự tính)',
        }),
        textAlign: fields.select({
          label: 'Căn lề văn bản',
          options: [
            { label: 'Căn lề trái (Mặc định)', value: 'left' },
            { label: 'Căn đều hai bên', value: 'justify' },
          ],
          defaultValue: 'left',
        }),
        verified: fields.checkbox({
          label: 'Đã kiểm nguồn',
          description:
            'BẮT BUỘC với mục Cà phê: chưa tick thì bài không hiện công khai. Chỉ tick khi mọi số liệu đều có nguồn kiểm được.',
          defaultValue: false,
        }),
        hasAssumption: fields.checkbox({
          label: 'Có số liệu giả định (hiện ghi chú "giả định" cuối bài)',
          defaultValue: false,
        }),
        sources: fields.array(
          fields.object({
            title: fields.text({ label: 'Tên nguồn (báo, báo cáo, văn bản)' }),
            url: fields.text({ label: 'Link' }),
            date: fields.text({ label: 'Ngày đăng nguồn (vd 2026-10-15)' }),
          }),
          {
            label: 'Nguồn tham khảo',
            itemLabel: (props) => props.fields.title.value || 'Nguồn',
          },
        ),
        seoTitle: fields.text({ label: 'SEO title (để trống = dùng tiêu đề)' }),
        seoDescription: fields.text({
          label: 'SEO description (để trống = dùng mô tả ngắn)',
          multiline: true,
        }),
        content: fields.markdoc({ label: 'Nội dung', extension: 'mdoc' }),
      },
    }),
    projects: collection({
      label: 'Dự án',
      slugField: 'titleVi',
      path: 'src/content/projects/*',
      format: { data: 'json' },
      columns: ['titleVi', 'titleEn', 'order'],
      schema: {
        titleVi: fields.slug({ name: { label: 'Tiêu đề (VI)' } }),
        titleEn: fields.text({ label: 'Tiêu đề (EN)' }),
        excerptVi: fields.text({
          label: 'Mô tả ngắn (VI)',
          multiline: true,
        }),
        excerptEn: fields.text({
          label: 'Mô tả ngắn (EN)',
          multiline: true,
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value || 'Tag',
        }),
        resultVi: fields.text({ label: 'Kết quả nổi bật (VI)' }),
        resultEn: fields.text({ label: 'Kết quả nổi bật (EN)' }),
        link: fields.text({ label: 'Link dự án (hoặc # nếu chưa có)', defaultValue: '#' }),
        thumbFrom: fields.text({ label: 'Màu nền Gradient bắt đầu (Hex)', defaultValue: '#eae6e1' }),
        thumbTo: fields.text({ label: 'Màu nền Gradient kết thúc (Hex)', defaultValue: '#ddd2c4' }),
        coverImage: fields.image({
          label: 'Ảnh dự án (nếu có, thay màu gradient)',
          directory: 'public/images/projects',
          publicPath: '/images/projects/',
        }),
        order: fields.integer({ label: 'Thứ tự hiển thị (số lớn xếp trước)', defaultValue: 0 }),
      },
    }),
  },
});
