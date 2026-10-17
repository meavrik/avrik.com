import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://avrik.com",
  output: "static",
  build: { inlineStylesheets: "always" },
  compressHTML: true,
  // English at /, Hebrew at /he/. Copy lives in src/data/{site,he}.ts, picked by src/i18n.ts.
  i18n: {
    defaultLocale: "en",
    locales: ["en", "he"],
    routing: { prefixDefaultLocale: false },
  },
});
