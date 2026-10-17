// The sitemap: each page in both languages, every entry pointing at its translations.
// /lab/ stays out while it's unlinked from the home page; add "/lab/" to pages to list it.
import type { APIRoute } from "astro";
import { localeHref, locales, sites } from "../i18n";

const pages = ["/"];

export const GET: APIRoute = () => {
  const origin = `https://${sites.en.domain}`;
  const href = (l: (typeof locales)[number], p: string) => new URL(localeHref(l, p), origin).href;
  const urls = pages.flatMap((p) =>
    locales.map(
      (l) => `  <url>
    <loc>${href(l, p)}</loc>
${[...locales.map((a) => [a, href(a, p)]), ["x-default", href("en", p)]]
  .map(([a, h]) => `    <xhtml:link rel="alternate" hreflang="${a}" href="${h}"/>`)
  .join("\n")}
  </url>`,
    ),
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
