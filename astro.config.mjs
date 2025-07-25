// @ts-check
import { defineConfig, envField } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import svgr from "@svgr/rollup";
import icon from "astro-icon";
import react from "@astrojs/react";
import aiRobotsTxt from "astro-ai-robots-txt";
import netlify from "@astrojs/netlify";
import favicons from "astro-favicons";

export default defineConfig({
  site: "https://josedhernandez.com",
  integrations: [
    favicons({
      name: "Portafolio José hernández",
      short_name: "Josedhernandez",
    }),
    mdx(),
    sitemap(),
    icon(),
    react(),
    aiRobotsTxt(),
  ],

  vite: {
    plugins: [svgr()],
  },
  env: {
    schema: {
      URL_PROFILE: envField.string({ context: "server", access: "public" }),
      AVAILABLE: envField.boolean({ context: "server", access: "public" }),
    },
  },
  adapter: netlify(),
});
