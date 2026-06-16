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
  },
});
