import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';
import type {OutputAsset} from 'rollup';

/**
 * Inlines the single CSS bundle into index.html as a <style> tag and drops the
 * external stylesheet, removing the render-blocking CSS request. The bundle is
 * small (~13 KB gzipped) so inlining is a net win for FCP on a CSR app: the
 * browser no longer waits on a separate stylesheet round-trip before painting.
 */
function inlineCss(): Plugin {
  return {
    name: 'inline-critical-css',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const html = bundle['index.html'] as OutputAsset | undefined;
      const cssFile = Object.keys(bundle).find((f) => f.endsWith('.css'));
      if (!html || !cssFile) return;
      const css = bundle[cssFile] as OutputAsset;
      const cssSource = typeof css.source === 'string' ? css.source : Buffer.from(css.source).toString('utf8');
      const base = cssFile.split('/').pop()!.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const linkRe = new RegExp(`<link[^>]+href="[^"]*${base}"[^>]*>`);
      let htmlSource = typeof html.source === 'string' ? html.source : Buffer.from(html.source).toString('utf8');
      htmlSource = htmlSource.replace(linkRe, `<style>${cssSource}</style>`);
      html.source = htmlSource;
      delete bundle[cssFile];
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), inlineCss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      // Split heavy vendor libs into stable, long-cacheable chunks so app-code
      // changes don't bust the React/animation runtime cache, and the browser
      // can fetch them in parallel.
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-dom/client'],
            motion: ['motion'],
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
