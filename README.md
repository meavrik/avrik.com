# avrik.com

Personal site, 2026 edition. Neobrutalism, Astro, no framework.

```
src/data/site.ts          all English copy and links — the file you normally edit
src/data/he.ts            the Hebrew copy, same shape (typed against site.ts, so a missing key shows in the editor)
src/i18n.ts               picks the copy for the page's locale; the switch links between / and /he/
src/pages/                index + lab (English, at / and /lab/) and he/ (Hebrew, at /he/ and /he/lab/, RTL). /lab/ is live but not linked from the home page
src/components/*.astro    one component per section + Icon (hand-drawn SVG set) + Sky (clouds between sections, and the bird that peeps out of them) + Critters (snails and worms on the boxes, and the bird that snatches them)
src/styles/tokens.css     colours, type, shadow, motion tokens
src/styles/global.css     reset, layout primitives, press/sticker/reveal classes
src/scripts/motion.ts     reveal, icon draw-in, hero tilt, marquee, sky tint + clouds on scroll
legacy/                   previous ASCII site, kept for reference
```

## Run

```sh
npm install
npm run dev      # http://localhost:4200
npm run build    # static output in dist/
```

Deploy `dist/` to any static host.

## Languages

English is the default (`/`), Hebrew lives under `/he/`; the pill in the nav and the link in the footer switch between the same page in either language. Components read their copy through `getSite(Astro.currentLocale)`, so a section's markup is written once. Positioning uses logical CSS (`inset-inline-start`, `margin-inline-end`, …) so the layout mirrors on its own; arrows that point along the reading direction carry the `mirror` class. Hebrew pages load their own fonts (Secular One for display, Rubik for body), set in `tokens.css`.
