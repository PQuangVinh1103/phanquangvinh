import { defineConfig } from 'astro/config';
import markdoc from '@astrojs/markdoc';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://phanquangvinh.com',
  output: 'server',
  adapter: vercel(),
  integrations: [markdoc()],
});
