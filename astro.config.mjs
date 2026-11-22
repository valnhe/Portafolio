import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://valnhe.netlify.app',
  // Las páginas antiguas ahora viven en la portada
  redirects: {
    '/projects': '/',
    '/about-me': '/',
  },
});
