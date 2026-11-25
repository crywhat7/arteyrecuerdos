import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { DOMINIO } from './src/data/sitio';

export default defineConfig({
  site: DOMINIO,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  // 'hover': no se descarga nada por adelantado, así no compite con el héroe.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'es', locales: { es: 'es-HN' } },
      filter: (page) => !page.includes('/404'),
    }),
  ],
  image: {
    // Fotos reales del taller: se sirven en AVIF/WebP generados en build.
    responsiveStyles: true,
  },
  compressHTML: true,
});
