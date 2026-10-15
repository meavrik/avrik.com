import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://avrik.com",
  output: "static",
  build: { inlineStylesheets: "always" },
  compressHTML: true,
});
