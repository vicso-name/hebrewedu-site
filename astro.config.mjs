import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://hebrewedu.com',
  output: 'static',
  trailingSlash: 'always',
  vite: {
    server: {
      fs: {
        // Retain standard sensitive-file exclusions and deny local lesson snapshots
        // even through Vite's /@fs development-file endpoint.
        deny: ['.env', '.env.*', '*.{crt,pem}', '**/.git/**', '**/.local/**'],
      },
    },
  },
});
