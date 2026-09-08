import { collection, config, fields } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    posts: collection({
      label: 'Blog posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      columns: ['title', 'publishedAt', 'status', 'category'],
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        excerpt: fields.text({
          label: 'Excerpt',
          multiline: true,
          validation: { length: { min: 20, max: 250 } },
        }),
        publishedAt: fields.date({
          label: 'Published date',
          validation: { isRequired: true },
        }),
        status: fields.select({
          label: 'Status',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
          ],
          defaultValue: 'draft',
        }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Finance', value: 'finance' },
            { label: 'AI & Automation', value: 'ai' },
            { label: 'Productivity', value: 'productivity' },
            { label: 'Life', value: 'life' },
          ],
          defaultValue: 'life',
        }),
        coverImage: fields.image({
          label: 'Cover image',
          directory: 'public/images/blog',
          publicPath: '/images/blog/',
        }),
        readingTime: fields.text({ label: 'Reading time', defaultValue: '5 phút đọc' }),
        textAlign: fields.select({
          label: 'Căn lề văn bản',
          description: 'Kiểu căn lề cho nội dung bài viết',
          options: [
            { label: 'Căn lề trái (Mặc định)', value: 'left' },
            { label: 'Căn đều hai bên', value: 'justify' },
          ],
          defaultValue: 'left',
        }),
        content: fields.markdoc({ label: 'Content', extension: 'mdoc' }),
      },
    }),
    projects: collection({
      label: 'Projects',
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
          itemLabel: props => props.value || 'Tag',
        }),
        resultVi: fields.text({ label: 'Kết quả nổi bật (VI)' }),
        resultEn: fields.text({ label: 'Kết quả nổi bật (EN)' }),
        link: fields.text({ label: 'Link dự án (Ví dụ: /projects/slug hoặc #)', defaultValue: '#' }),
        thumbFrom: fields.text({ label: 'Màu nền Gradient bắt đầu (Hex, ví dụ: #eae6e1)', defaultValue: '#eae6e1' }),
        thumbTo: fields.text({ label: 'Màu nền Gradient kết thúc (Hex, ví dụ: #ddd2c4)', defaultValue: '#ddd2c4' }),
        coverImage: fields.image({
          label: 'Ảnh dự án (Nếu có - thay thế màu gradient)',
          directory: 'public/images/projects',
          publicPath: '/images/projects/',
        }),
        order: fields.integer({ label: 'Thứ tự hiển thị (Số lớn xếp trước)', defaultValue: 0 }),
      },
    }),
  },
});

