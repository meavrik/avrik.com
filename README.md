# avrik.com

Personal site, 2026 edition. ASCII style, plain HTML/CSS/JS, no build step.

```
index.html        page content
assets/style.css  theme tokens, layout, reveal transitions
assets/main.js    boot sequence, banner decode, ascii field, sdlc pipeline, scroll reveals
```

## ASCII portrait

Drop a photo at `assets/portrait.png` (or point `data-src` on `#portrait` elsewhere). It's converted to ASCII in the browser
at load time (auto-levels, sharpen, soft edges). Until the file exists the hero
renders without it. Best results: tightly cropped head-and-shoulders, even
lighting. A PNG with the background removed (transparent) works best of all.

## Run locally

```sh
npm start   # serves on http://localhost:4200
```

Any static host works. Deploy the repo root as-is.
