// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import svgr from "@svgr/rollup";

import icon from "astro-icon";

import react from "@astrojs/react";

import aiRobotsTxt from "astro-ai-robots-txt";

import min from "astro-min";

import swup from "@swup/astro";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [
    mdx(),
    sitemap(),
    icon(),
    react(),
    aiRobotsTxt(),
    min(),
    swup(),
  ],
  vite: {
    plugins: [svgr()],
  },
});
