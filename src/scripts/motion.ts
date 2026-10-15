// Five things, nothing else:
// 1. measure icon strokes so they can draw themselves
// 2. one staggered reveal per section (IntersectionObserver)
// 3. hero sticker tilts with the cursor
// 4. marquee is pure CSS; nothing to do here
// 5. sky: the frame's tint follows the section in view, clouds roll through at each boundary

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

// 1 — stroke lengths
for (const el of document.querySelectorAll<SVGGeometryElement>(".ico [data-draw]")) {
  try {
    el.style.setProperty("--len", String(Math.ceil(el.getTotalLength()) + 2));
  } catch {
    /* non-geometry element */
  }
}

// 2 — reveal
const reveals = document.querySelectorAll<HTMLElement>(".reveal");
if (reduced || !("IntersectionObserver" in window)) {
  reveals.forEach((r) => r.classList.add("in"));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        (e.target as HTMLElement).classList.add("in");
        io.unobserve(e.target);
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
  );
  reveals.forEach((r) => io.observe(r));
}

// 3 — hero tilt (pointer only, never on touch, never with reduced motion)
const tilt = document.querySelector<HTMLElement>("[data-tilt]");
if (tilt && !reduced && matchMedia("(hover: hover) and (pointer: fine)").matches) {
  const sticker = tilt.querySelector<HTMLElement>(".sticker")!;
  const max = 7;
  let raf = 0;
  tilt.addEventListener("pointermove", (ev) => {
    const r = tilt.getBoundingClientRect();
    const x = (ev.clientX - r.left) / r.width - 0.5;
    const y = (ev.clientY - r.top) / r.height - 0.5;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      sticker.style.setProperty("--ry", `${x * max * 2}deg`);
      sticker.style.setProperty("--rx", `${-y * max * 2}deg`);
    });
  });
  tilt.addEventListener("pointerleave", () => {
    sticker.style.setProperty("--ry", "0deg");
    sticker.style.setProperty("--rx", "0deg");
  });
}

// 5 — sky. Every section boundary gets a pass: a stretch of scroll that starts as the
// boundary comes in at the bottom of the viewport and ends as it leaves at the top. Within
// it t runs -1 → 1. The Sky layer moves its clouds with --t; the frame mixes the two
// sections' tints with --bg-mix, changing in the thick of the clouds.
const frame = document.querySelector<HTMLElement>(".frame");
const sky = document.querySelector<HTMLElement>(".sky");
const sections = [...document.querySelectorAll<HTMLElement>("main > section[id]")];
if (frame && sections.length > 1) {
  const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
  const last: Record<string, string> = {};
  const set = (el: HTMLElement, name: string, value: string) => {
    if (last[name] === value) return;
    last[name] = value;
    el.style.setProperty(name, value);
  };
  let raf = 0;
  const update = () => {
    raf = 0;
    const vh = innerHeight;
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - vh);
    // a boundary sits in the middle of the gap between two sections (the first one's bottom padding)
    const gap = parseFloat(getComputedStyle(sections[1]).paddingBottom) || 0;
    const passes = sections.slice(1).map((s) => {
      const b = s.getBoundingClientRect().top + scrollY - gap / 2;
      // a pass spans 1.2 viewports of scroll. It may start a little before the page does, so a
      // short hero still shows a few clouds at load; it never runs past the page's end.
      return { s0: Math.max(-0.2 * vh, b - 1.1 * vh), s1: Math.min(maxScroll, b + 0.1 * vh) };
    });
    // neighbouring passes must not overlap: cut both at the midpoint
    for (let i = 1; i < passes.length; i++) {
      if (passes[i - 1].s1 > passes[i].s0) passes[i - 1].s1 = passes[i].s0 = (passes[i - 1].s1 + passes[i].s0) / 2;
    }
    // the current pass: the last one that has started (before the first one starts, it is the first)
    let k = 0;
    for (let i = 0; i < passes.length; i++) if (scrollY >= passes[i].s0) k = i;
    const { s0, s1 } = passes[k];
    const t = s1 > s0 ? clamp(-1 + (2 * (scrollY - s0)) / (s1 - s0), -1, 1) : scrollY >= s1 ? 1 : -1;

    // tint: the change happens for |t| < 0.3, in the thick of the clouds
    const x = clamp((t + 0.3) / 0.6, 0, 1);
    const mix = x * x * (3 - 2 * x);
    set(frame, "--bg-from", `var(--bg-${sections[k].id})`);
    set(frame, "--bg-to", `var(--bg-${sections[k + 1].id})`);
    set(frame, "--bg-mix", `${(mix * 100).toFixed(1)}%`);
    if (sky) {
      set(sky, "--t", t.toFixed(4));
      // between passes every cloud is off screen: Sky rests its idle animations and the bird
      sky.classList.toggle("away", Math.abs(t) >= 1);
    }
  };
  const queue = () => {
    if (!raf) raf = requestAnimationFrame(update);
  };
  addEventListener("scroll", queue, { passive: true });
  addEventListener("resize", queue);
  // sections change height (the road map opens and closes) without a scroll
  if ("ResizeObserver" in window) new ResizeObserver(queue).observe(document.querySelector("main")!);
  update();
}
