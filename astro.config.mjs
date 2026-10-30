import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import vercel from '@astrojs/vercel';
import keystatic from '@keystatic/astro';

export default defineConfig({
  site: 'https://phanquangvinh.com',
  output: 'server',
  adapter: vercel(),
  integrations: [react(), markdoc(), keystatic()],
});
