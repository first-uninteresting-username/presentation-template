// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import icon from "astro-icon";

const base = process.env.ASTRO_BASE ?? "/";

export default defineConfig({
  site: process.env.ASTRO_SITE,
  base,

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [icon()],
  redirects: {
    "/": `${base.replace(/\/$/, "")}/slide/1`,
  },
});
