# avrik.com

Personal site, 2026 edition. Neobrutalism, Astro, no framework.

```
src/data/site.ts          all copy, links, colours — the only file you normally edit
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
