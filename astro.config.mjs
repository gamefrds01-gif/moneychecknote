// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://money.pointchecknote.com',
  vite: {
    plugins: [tailwindcss()]
  },

  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' }
    }
  },

  integrations: [mdx(), sitemap({
    // 비공개 관리 페이지(/stats 등)는 사이트맵·검색에서 제외
    filter: (page) => !page.includes('/stats')
  })]
});
