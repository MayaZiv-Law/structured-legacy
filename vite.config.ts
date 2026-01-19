import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import prerender from "vite-plugin-prerender";

const Renderer = prerender.PuppeteerRenderer;

// Routes to prerender for SEO and AI crawlers
const routesToPrerender = [
  '/',
  '/about',
  '/real-estate',
  '/taxation',
  '/estate-planning',
  '/commercial',
  '/olim-returning-residents',
  '/insights',
  '/contact',
  '/privacy',
  '/terms',
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" && prerender({
      staticDir: path.join(__dirname, 'dist'),
      routes: routesToPrerender,
      renderer: new Renderer({
        headless: true,
        renderAfterDocumentEvent: 'render-event',
      }),
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
