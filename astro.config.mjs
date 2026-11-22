import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://valnhe.netlify.app',
  integrations: [
    // /hoy es privada: no va en el sitemap
    sitemap({ filter: (page) => !page.includes('/hoy') }),
  ],
  // Las páginas antiguas ahora viven en la portada
  redirects: {
    '/projects': '/',
    '/about-me': '/',
  },
});
