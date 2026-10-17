// Two languages, one copy file each. Pages under src/pages/he/ get the Hebrew one
// through Astro.currentLocale (see the i18n block in astro.config.mjs).
import { site as en } from "./data/site";
import { site as he } from "./data/he";

export const sites = { en, he } as const;
export type Locale = keyof typeof sites;
export const locales = Object.keys(sites) as Locale[];

export const getSite = (locale?: string) => (locale === "he" ? he : en);

// the same page in another language: / ↔ /he/, /lab/ ↔ /he/lab/
export const localeHref = (locale: Locale, pathname: string) => {
  const base = pathname.replace(/^\/he(?=\/|$)/, "") || "/";
  const path = locale === "en" ? base : `/he${base}`;
  return path.endsWith("/") ? path : `${path}/`;
};
