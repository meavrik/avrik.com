// /llms.txt and /he/llms.txt: the site as plain Markdown for AI answer engines (llmstxt.org).
// Built from the same copy as the pages, so it can't drift from them. Section names reuse
// the nav labels, so each language gets its own headings for free.
import type { Site } from "./data/site";
import { localeHref, locales, sites } from "./i18n";

export const llms = (site: Site) => {
  const origin = `https://${site.domain}`;
  const section = (id: string) => site.nav.find((n) => n.href.endsWith(`#${id}`))?.label ?? id;
  const lane = (id: string) => (id === "dev" ? site.roadmap.dev : site.roadmap.biz);
  const stop = (s: string) => (/[.?!]$/.test(s) ? s : `${s}.`);
  return [
    `# ${site.fullName} — ${site.role}`,
    "",
    `> ${site.description}`,
    "",
    site.what.sub,
    "",
    `## ${section("what")}`,
    "",
    ...site.lanes.flatMap((l) => [
      `### ${l.title}: ${l.line}`,
      "",
      ...site.tiles.filter((t) => t.lane === l.id).map((t) => `- **${t.label}**: ${t.detail}`),
      "",
      `${site.roadmap.label}:`,
      "",
      ...lane(l.id).problems.map((p) => `- ${stop(p.title)} ${site.roadmap.outcomeLabel}: ${p.outcome}`),
      "",
    ]),
    `## ${section("how")}`,
    "",
    site.stepsTitle,
    "",
    ...site.steps.map((s, i) => `${i + 1}. **${s.title}**: ${s.line}`),
    "",
    `## ${section("bio")}`,
    "",
    ...site.bio.about.flatMap((p) => [p, ""]),
    `## ${site.faq.title}`,
    "",
    ...site.faq.items.flatMap((f) => [`### ${f.q}`, "", f.a, ""]),
    `## ${site.contact.label}`,
    "",
    `- ${site.talk.cta}: ${site.calendar}`,
    `- ${site.email}`,
    `- LinkedIn: ${site.linkedin}`,
    `- GitHub: ${site.github}`,
    "",
    `## ${site.lang.label}`,
    "",
    ...locales.map((l) => {
      const home = new URL(localeHref(l, "/"), origin).href;
      return `- [${sites[l].lang.name}](${home}): ${sites[l].title} ([llms.txt](${home}llms.txt))`;
    }),
    "",
  ].join("\n");
};
