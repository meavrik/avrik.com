(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var GLYPHS = "!<>-_\\/[]{}=+*^?#01";
  var $ = function (s, el) {
    return (el || document).querySelector(s);
  };
  var $$ = function (s, el) {
    return Array.prototype.slice.call((el || document).querySelectorAll(s));
  };
  var rand = function (s) {
    return s[(Math.random() * s.length) | 0];
  };
  var esc = function (c) {
    return c === "<" ? "&lt;" : c === ">" ? "&gt;" : c === "&" ? "&amp;" : c;
  };

  function store(kind, key, val) {
    try {
      var s = window[kind];
      if (val === undefined) return s.getItem(key);
      s.setItem(key, val);
    } catch (e) {
      return null;
    }
  }

  /* ───────────── scramble text (keeps child elements intact) ───────────── */
  function scramble(el, opts) {
    opts = opts || {};
    var duration = opts.duration || 650;
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    var finals = nodes.map(function (n) {
      return n.__final || (n.__final = n.nodeValue);
    });
    if (reduced) return;

    // per-char random jitter so the reveal looks organic
    var plan = finals.map(function (txt) {
      return Array.prototype.map.call(txt, function (ch) {
        return { ch: ch, j: Math.random() * 0.25 };
      });
    });
    var total = finals.reduce(function (a, t) {
      return a + t.length;
    }, 0);

    var start = performance.now();
    function frame(now) {
      var p = Math.min(1, (now - start) / duration);
      var idx = 0;
      plan.forEach(function (chars, n) {
        var out = "";
        for (var i = 0; i < chars.length; i++, idx++) {
          var c = chars[i];
          var shown = p >= 1 || (idx / total) * 0.75 + c.j <= p;
          out += shown || c.ch === " " || c.ch === "\n" ? c.ch : rand(GLYPHS);
        }
        nodes[n].nodeValue = out;
      });
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ───────────── theme toggle ───────────── */
  var themeBtn = $("#theme");
  function currentTheme() {
    var set = root.getAttribute("data-theme");
    if (set) return set;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function paintThemeBtn() {
    themeBtn.textContent = "[ " + currentTheme() + " ]";
  }
  themeBtn.addEventListener("click", function () {
    var next = currentTheme() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    store("localStorage", "theme", next);
    paintThemeBtn();
    scramble(themeBtn, { duration: 300 });
  });
  paintThemeBtn();

  /* ───────────── boot sequence (once per session) ───────────── */
  function boot(done) {
    var seen = store("sessionStorage", "booted");
    if (reduced || seen !== null) return done();
    store("sessionStorage", "booted", "1");
    if (store("sessionStorage", "booted") === null) return done(); // storage blocked

    var overlay = $("#boot");
    var log = $("#boot-log");
    var lines = [
      ["avrik.os v2026.10", ""],
      ["> loading context ........ ", "ok"],
      ["> mounting agents ........ ", "ok"],
      ["> wiring sdlc pipeline ... ", "ok"],
      ["> ready.", ""],
    ];
    var i = 0;
    var finished = false;
    overlay.classList.add("on");

    function finish() {
      if (finished) return;
      finished = true;
      overlay.classList.add("out");
      setTimeout(function () {
        overlay.classList.remove("on", "out");
      }, 600);
      done();
    }
    function next() {
      if (finished) return;
      if (i >= lines.length) return setTimeout(finish, 220);
      var l = lines[i++];
      log.innerHTML += l[0] + (l[1] ? '<span class="ok">' + l[1] + "</span>" : "") + "\n";
      setTimeout(next, 150);
    }
    ["click", "keydown", "wheel", "touchstart"].forEach(function (ev) {
      window.addEventListener(ev, finish, { once: true, passive: true });
    });
    next();
  }

  /* ───────────── hero: isometric banner (decode + light sweep) ───────────── */
  function bannerArt() {
    var pre = $("#banner");
    var lines = pre.textContent.replace(/\s+$/, "").split("\n");
    var H = lines.length;
    var W = Math.max.apply(null, lines.map(function (l) {
      return l.length;
    }));
    var cells = lines.map(function (l) {
      return Array.prototype.map.call(l, function (ch) {
        return { ch: ch, solid: ch !== " ", j: Math.random() };
      });
    });

    // decode: 0..1 progress, sweep: band position in columns (null = off)
    function render(decode, sweep) {
      var html = "";
      for (var y = 0; y < H; y++) {
        var run = "";
        var runCls = null;
        var row = cells[y];
        for (var x = 0; x < row.length; x++) {
          var c = row[x];
          var ch = c.ch;
          var cls = "";
          if (c.solid && decode < 1 && (x / W) * 0.8 + c.j * 0.2 > decode) {
            ch = rand(GLYPHS);
            cls = "g";
          } else if (c.solid && sweep !== null) {
            var d = x - (H - y) * 1.6 - sweep;
            if (d > -2.5 && d < 2.5) cls = "hi";
          }
          if (cls !== runCls) {
            html += runCls ? '<span class="' + runCls + '">' + run + "</span>" : run;
            run = "";
            runCls = cls;
          }
          run += esc(ch);
        }
        html += runCls ? '<span class="' + runCls + '">' + run + "</span>" : run;
        html += "\n";
      }
      pre.innerHTML = html;
    }

    function sweepOnce() {
      var start = performance.now();
      var span = W + H * 1.6 + 6;
      var from = -3 - H * 1.6;
      (function f(now) {
        var p = (now - start) / 1400;
        if (p >= 1) return render(1, null);
        render(1, from + p * span);
        requestAnimationFrame(f);
      })(start);
    }

    if (reduced) return render(1, null);
    render(0, null);
    return function play() {
      var start = performance.now();
      (function f(now) {
        var p = Math.min(1, (now - start) / 1300);
        render(p, null);
        if (p < 1) requestAnimationFrame(f);
        else {
          setTimeout(sweepOnce, 300);
          setInterval(sweepOnce, 7000);
        }
      })(start);
    };
  }

  /* ───────────── hero: ascii portrait from a photo ───────────── */
  function portrait() {
    var fig = $("#portrait");
    var pre = $("#portrait-art");
    var src = fig && fig.getAttribute("data-src");
    if (!src) return;

    var RAMP = " .,:-=+*#%@";
    var COLS = 40;
    var FLOOR = 0.1; // min density for opaque pixels, keeps light skin as a faint silhouette
    var CELL = 0.6; // glyph width / line height
    var rows = 0;
    var lum = null; // 0..1 brightness per cell
    var fade = null; // vignette per cell
    var mouse = null;
    var glitchRow = -1;

    var img = new Image();
    img.onload = function () {
      analyse();
      fig.hidden = false;
      $("#hero-inner").classList.add("has-portrait");
      if (reduced) return draw();
      develop();
      bindInteractions();
    };
    img.src = src;

    function analyse() {
      rows = Math.round(COLS * (img.naturalHeight / img.naturalWidth) * CELL);
      var cv = document.createElement("canvas");
      cv.width = COLS;
      cv.height = rows;
      var ctx = cv.getContext("2d", { willReadFrequently: true });
      ctx.imageSmoothingQuality = "high";
      // halve repeatedly before the final draw: closer to area-averaging than one big bilinear step
      var step = img;
      var w = img.naturalWidth;
      var h = img.naturalHeight;
      while (w / 2 > COLS * 1.5) {
        var tmp = document.createElement("canvas");
        tmp.width = w = Math.round(w / 2);
        tmp.height = h = Math.round(h / 2);
        tmp.getContext("2d").drawImage(step, 0, 0, w, h);
        step = tmp;
      }
      ctx.drawImage(step, 0, 0, COLS, rows);
      var px = ctx.getImageData(0, 0, COLS, rows).data;
      var n = COLS * rows;
      var raw = new Float32Array(n);
      var alpha = new Float32Array(n);
      for (var i = 0; i < n; i++) {
        raw[i] = (0.2126 * px[i * 4] + 0.7152 * px[i * 4 + 1] + 0.0722 * px[i * 4 + 2]) / 255;
        alpha[i] = px[i * 4 + 3] / 255;
      }

      // local-contrast boost (wide unsharp mask, subject pixels only so the
      // silhouette edge doesn't halo) — this is what brings out eyes and mouth
      var R = 1;
      var AMOUNT = 0.9;
      var sharp = new Float32Array(n);
      var vals = [];
      for (var y = 0; y < rows; y++) {
        for (var x = 0; x < COLS; x++) {
          var k = y * COLS + x;
          var sum = 0;
          var cnt = 0;
          for (var dy = -R; dy <= R; dy++)
            for (var dx = -R; dx <= R; dx++) {
              var yy = y + dy;
              var xx = x + dx;
              if (yy < 0 || yy >= rows || xx < 0 || xx >= COLS) continue;
              var kk = yy * COLS + xx;
              if (alpha[kk] <= 0.5) continue;
              sum += raw[kk];
              cnt++;
            }
          var mean = cnt ? sum / cnt : raw[k];
          sharp[k] = raw[k] + AMOUNT * (raw[k] - mean);
          if (alpha[k] > 0.5) vals.push(sharp[k]);
        }
      }

      // tone map over subject pixels only: histogram equalization blended with
      // linear 2..98% levels, so faces keep detail even next to dark clothing
      vals.sort(function (a, b) {
        return a - b;
      });
      var m = vals.length;
      var lo = vals[(m * 0.02) | 0] || 0;
      var hi = vals[(m * 0.98) | 0] || 1;
      function rank(v) {
        var a = 0;
        var b = m;
        while (a < b) {
          var mid = (a + b) >> 1;
          if (vals[mid] < v) a = mid + 1;
          else b = mid;
        }
        return m ? a / m : v;
      }

      lum = new Float32Array(n);
      fade = new Float32Array(n);
      for (var y2 = 0; y2 < rows; y2++) {
        for (var x2 = 0; x2 < COLS; x2++) {
          var k2 = y2 * COLS + x2;
          var linear = Math.max(0, Math.min(1, (sharp[k2] - lo) / (hi - lo || 1)));
          lum[k2] = 0.7 * rank(sharp[k2]) + 0.3 * linear;
          // soft edges so the image dissolves into the page; transparent pixels = background
          var ex = Math.min(x2, COLS - 1 - x2) / (COLS * 0.12);
          var ey = Math.min(y2, rows - 1 - y2) / (rows * 0.1);
          var f = Math.min(1, ex, ey);
          fade[k2] = f * f * (3 - 2 * f) * alpha[k2];
        }
      }
    }

    // reveal: 0..1, top-to-bottom develop with per-cell jitter
    var jitter = null;
    function draw(reveal) {
      if (reveal === undefined) reveal = 1;
      if (!jitter) {
        jitter = new Float32Array(COLS * rows);
        for (var j = 0; j < jitter.length; j++) jitter[j] = Math.random();
      }
      var html = "";
      for (var y = 0; y < rows; y++) {
        var shift = y === glitchRow ? 1 : 0;
        var run = "";
        var runCls = "";
        var lineCls = y === glitchRow ? "glitch" : "";
        for (var x = 0; x < COLS; x++) {
          var sx = Math.min(COLS - 1, Math.max(0, x - shift));
          var k = y * COLS + sx;
          // ink on paper: dark pixels get dense glyphs
          var dens = (FLOOR + (1 - FLOOR) * (1 - lum[k])) * fade[k];
          var ch = RAMP[Math.min(RAMP.length - 1, Math.round(dens * (RAMP.length - 1)))];
          var cls = lineCls;
          if (reveal < 1) {
            var t = (y / rows) * 0.75 + jitter[k] * 0.25;
            if (t > reveal) ch = " ";
            else if (t > reveal - 0.08 && ch !== " ") {
              ch = rand(GLYPHS);
              cls = "lens";
            }
          } else if (mouse) {
            var mx = (x - mouse.x) * CELL;
            var my = y - mouse.y;
            if (mx * mx + my * my < 10) {
              ch = dens > 0.1 ? (Math.random() < 0.5 ? "0" : "1") : " ";
              cls = "lens";
            }
          }
          if (cls !== runCls) {
            html += runCls ? '<span class="' + runCls + '">' + run + "</span>" : run;
            run = "";
            runCls = cls;
          }
          run += esc(ch);
        }
        html += runCls ? '<span class="' + runCls + '">' + run + "</span>" : run;
        html += "\n";
      }
      pre.innerHTML = html;
    }

    function develop() {
      var start = performance.now();
      (function f(now) {
        var p = Math.min(1.08, (now - start) / 1800);
        draw(p);
        if (p < 1.08) requestAnimationFrame(f);
        else draw();
      })(start);
    }

    function bindInteractions() {
      var pending = false;
      function queue() {
        if (pending) return;
        pending = true;
        requestAnimationFrame(function () {
          pending = false;
          draw();
        });
      }
      pre.addEventListener("pointermove", function (e) {
        var r = pre.getBoundingClientRect();
        mouse = {
          x: ((e.clientX - r.left) / r.width) * COLS,
          y: ((e.clientY - r.top) / r.height) * rows,
        };
        queue();
      });
      pre.addEventListener("pointerleave", function () {
        mouse = null;
        queue();
      });

      // occasional scanline glitch
      setInterval(function () {
        if (mouse || document.hidden) return;
        glitchRow = (Math.random() * rows) | 0;
        draw();
        setTimeout(function () {
          glitchRow = -1;
          draw();
        }, 140);
      }, 4200);
    }
  }

  /* ───────────── hero: typed prompt ───────────── */
  function typed() {
    var el = $("#typed");
    var phrases = [
      "ai builder",
      "sdlc process improvement expert",
      "agents in the loop. humans in charge.",
      "ship > meetings",
    ];
    if (reduced) {
      el.textContent = phrases[0];
      return;
    }
    var p = 0;
    var c = 0;
    var deleting = false;
    (function tick() {
      var word = phrases[p];
      c += deleting ? -1 : 1;
      el.textContent = word.slice(0, c);
      var wait = deleting ? 28 : 55 + Math.random() * 60;
      if (!deleting && c === word.length) {
        deleting = true;
        wait = 2200;
      } else if (deleting && c === 0) {
        deleting = false;
        p = (p + 1) % phrases.length;
        wait = 350;
      }
      setTimeout(tick, wait);
    })();
  }

  /* ───────────── hero: live ascii field ───────────── */
  function field() {
    var el = $("#field");
    var hero = $(".hero");
    var RAMP = "   ..,:;-=+*";
    var cw = 7.2;
    var lh = 14;
    var cols = 0;
    var rows = 0;
    var mouse = { x: -999, y: -999 };
    var running = false;
    var last = 0;

    function measure() {
      var probe = document.createElement("span");
      probe.textContent = "MMMMMMMMMM";
      el.appendChild(probe);
      cw = probe.getBoundingClientRect().width / 10 || cw;
      el.removeChild(probe);
      cols = Math.ceil(hero.clientWidth / cw);
      rows = Math.ceil(hero.clientHeight / lh);
    }

    function draw(t) {
      t /= 1000;
      var out = "";
      for (var y = 0; y < rows; y++) {
        for (var x = 0; x < cols; x++) {
          var v =
            Math.sin(x * 0.11 + t * 0.9) +
            Math.sin(y * 0.23 - t * 1.2) +
            Math.sin((x + y * 2) * 0.05 + t * 0.6);
          var dx = (x - mouse.x) * 0.5;
          var dy = y - mouse.y;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < 18) v += (1 - d / 18) * 2.2 * Math.sin(d * 0.9 - t * 5);
          var n = (v + 3) / 6;
          out += RAMP[Math.max(0, Math.min(RAMP.length - 1, (n * RAMP.length) | 0))];
        }
        out += "\n";
      }
      el.textContent = out;
    }

    function loop(now) {
      if (!running) return;
      if (now - last > 40) {
        last = now;
        draw(now);
      }
      requestAnimationFrame(loop);
    }

    measure();
    if (reduced) return draw(0);

    hero.addEventListener("pointermove", function (e) {
      var r = hero.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) / cw;
      mouse.y = (e.clientY - r.top) / lh;
    });
    hero.addEventListener("pointerleave", function () {
      mouse.x = mouse.y = -999;
    });
    window.addEventListener("resize", measure);

    new IntersectionObserver(function (entries) {
      var vis = entries[0].isIntersecting;
      if (vis && !running) {
        running = true;
        requestAnimationFrame(loop);
      } else if (!vis) running = false;
    }).observe(hero);
  }

  /* ───────────── sdlc pipeline diagram ───────────── */
  function pipeline() {
    var pre = $("#pipeline");
    var note = $("#stage-text");
    var STAGES = [
      ["spec", "spec: intent, written down. agents draft. humans decide."],
      ["plan", "plan: tasks small enough to review in minutes."],
      ["build", "build: coding agents do the typing. engineers steer."],
      ["verify", "verify: tests, evals and ai review on every pr."],
      ["ship", "ship: small batches. often. boring on purpose."],
    ];
    var LOOP_NOTE = "measure: lead time, cycle time, failure rate. then loop.";
    var model = null;
    var layout = "";

    function Grid() {
      this.rows = [];
    }
    Grid.prototype.put = function (r, c, str, tag) {
      while (this.rows.length <= r) this.rows.push([]);
      var row = this.rows[r];
      for (var i = 0; i < str.length; i++) {
        while (row.length <= c + i) row.push({ ch: " ", tag: null });
        row[c + i] = { ch: str[i], tag: tag || null };
      }
    };
    function center(s, w) {
      var l = Math.floor((w - s.length) / 2);
      return new Array(l + 1).join(" ") + s + new Array(w - s.length - l + 1).join(" ");
    }
    function dashes(n) {
      return new Array(n + 1).join("-");
    }

    // Every box cell is tagged "s<i>" so the active stage can light up.
    function box(g, r, c, inner, i) {
      g.put(r, c, "+" + dashes(inner) + "+", "s" + i);
      g.put(r + 1, c, "|", "s" + i);
      g.put(r + 1, c + 1, center(STAGES[i][0], inner), "l" + i);
      g.put(r + 1, c + inner + 1, "|", "s" + i);
      g.put(r + 2, c, "+" + dashes(inner) + "+", "s" + i);
    }

    function horizontal() {
      var g = new Grid();
      var W = 10;
      var GAP = 6;
      var path = [];
      var cx = function (i) {
        return i * (W + GAP) + W / 2;
      };
      STAGES.forEach(function (_, i) {
        var x = i * (W + GAP);
        box(g, 0, x, W - 2, i);
        path.push({ stage: i });
        if (i < STAGES.length - 1) {
          g.put(1, x + W, " ---> ");
          for (var k = 1; k < GAP - 1; k++) path.push({ r: 1, c: x + W + k });
        }
      });
      var a = cx(0);
      var b = cx(STAGES.length - 1);
      g.put(3, a, "^");
      g.put(3, b, "|");
      var label = " measure ";
      var line = "+" + dashes(b - a - 1) + "+";
      var mid = Math.floor((line.length - label.length) / 2);
      g.put(4, a, line.slice(0, mid) + label + line.slice(mid + label.length));
      path.push({ r: 3, c: b, loop: true });
      for (var c = b; c >= a; c--) path.push({ r: 4, c: c, loop: true });
      path.push({ r: 3, c: a, loop: true });
      return { g: g, path: path };
    }

    function vertical() {
      var g = new Grid();
      var INNER = 12;
      var STEP = 5;
      var right = INNER + 2;
      var mid = 1 + INNER / 2;
      var path = [];
      var last = STAGES.length - 1;
      STAGES.forEach(function (_, i) {
        var y = i * STEP;
        box(g, y, 0, INNER, i);
        path.push({ stage: i });
        if (i < last) {
          g.put(y + 3, mid, "|");
          g.put(y + 4, mid, "v");
          path.push({ r: y + 3, c: mid }, { r: y + 4, c: mid });
        }
      });
      // feedback loop up the right-hand side
      var top = 1;
      var bottom = last * STEP + 1;
      g.put(top, right, "<--+");
      g.put(bottom, right, "---+");
      for (var k = 0; k < 3; k++) path.push({ r: bottom, c: right + k, loop: true });
      for (var r = bottom; r >= top; r--) {
        if (r !== top && r !== bottom) g.put(r, right + 3, "|");
        path.push({ r: r, c: right + 3, loop: true });
      }
      var lbl = "measure";
      var lr = Math.floor((top + bottom - lbl.length) / 2);
      for (var j = 0; j < lbl.length; j++) g.put(lr + j, right + 5, lbl[j], "m");
      for (var k2 = 2; k2 >= 0; k2--) path.push({ r: top, c: right + k2, loop: true });
      return { g: g, path: path };
    }

    function render(head, trail, activeStage) {
      var html = "";
      var g = model.g;
      for (var r = 0; r < g.rows.length; r++) {
        var row = g.rows[r];
        for (var c = 0; c < row.length; c++) {
          var cell = row[c];
          var key = r + ":" + c;
          var ch = cell.ch;
          var cls = "";
          if (key === head) {
            cls = "pkt";
            if ("-|<>^v+".indexOf(ch) !== -1) ch = "*";
          } else if (trail[key]) {
            cls = "pkt";
          } else if (cell.tag) {
            var t = cell.tag[0];
            var n = +cell.tag.slice(1);
            if (t === "l") cls = n === activeStage ? "label on" : "label";
            else if (t === "s" && n === activeStage) cls = "on";
          }
          html += cls ? '<span class="' + cls + '">' + esc(ch) + "</span>" : esc(ch);
        }
        html += "\n";
      }
      pre.innerHTML = html;
    }

    var typing = 0;
    function say(text) {
      clearInterval(typing);
      if (reduced) {
        note.textContent = text;
        return;
      }
      var i = 0;
      typing = setInterval(function () {
        note.textContent = text.slice(0, ++i);
        if (i >= text.length) clearInterval(typing);
      }, 14);
    }

    function build() {
      var fits = pre.parentElement.clientWidth - 40 >= 80 * charWidth();
      var want = fits ? "h" : "v";
      if (want === layout) return;
      layout = want;
      model = want === "h" ? horizontal() : vertical();
      render(null, {}, -1);
    }
    function charWidth() {
      var cs = getComputedStyle(pre);
      return parseFloat(cs.fontSize) * 0.6;
    }

    build();
    window.addEventListener("resize", build);

    if (reduced) {
      note.textContent = "spec -> plan -> build -> verify -> ship -> measure -> repeat.";
      return;
    }

    var step = 0;
    var dwell = 0;
    var history = [];
    var running = false;
    var lastNote = null;

    function tick() {
      if (!running) return;
      var path = model.path;
      if (step >= path.length) step = 0;
      var s = path[step];
      var head = null;
      var active = -1;
      var msg;
      if (s.stage !== undefined) {
        active = s.stage;
        history = [];
        msg = STAGES[s.stage][1];
        if (++dwell < 16) {
          finishTick(head, active, msg);
          return;
        }
        dwell = 0;
      } else {
        head = s.r + ":" + s.c;
        history.unshift(head);
        msg = s.loop ? LOOP_NOTE : lastNote;
      }
      step++;
      finishTick(head, active, msg);
    }
    function finishTick(head, active, msg) {
      history = history.slice(0, 3);
      var trail = {};
      history.slice(1).forEach(function (k) {
        trail[k] = true;
      });
      render(head, trail, active);
      if (msg && msg !== lastNote) {
        lastNote = msg;
        say(msg);
      }
      setTimeout(tick, 65);
    }

    new IntersectionObserver(function (entries) {
      var vis = entries[0].isIntersecting;
      if (vis && !running) {
        running = true;
        tick();
      } else if (!vis) running = false;
    }).observe(pre);
  }

  /* ───────────── scroll reveal + nav state ───────────── */
  function reveals() {
    var targets = $$(
      ".section h2, .section .sub, .section .cols > *, .lines li, .box, .pipeline, .offers li, .stack, .links, footer"
    );
    var siblings = new Map();
    targets.forEach(function (el) {
      var n = siblings.get(el.parentElement) || 0;
      siblings.set(el.parentElement, n + 1);
      el.style.setProperty("--d", Math.min(n, 8) * 70 + "ms");
      el.classList.add("reveal");
    });
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var t = e.target;
          t.classList.add("in");
          // drop the reveal styles once done so hover transitions aren't delayed
          setTimeout(function () {
            t.classList.remove("reveal", "in");
          }, 1100 + (parseInt(t.style.getPropertyValue("--d"), 10) || 0));
          if (e.target.hasAttribute("data-scramble")) scramble(e.target);
          io.unobserve(e.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    targets.forEach(function (el) {
      io.observe(el);
    });

    var links = $$(".bar nav a");
    var navIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          links.forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    $$("main section[id]").forEach(function (s) {
      navIO.observe(s);
    });

    var bar = $(".bar");
    window.addEventListener(
      "scroll",
      function () {
        bar.classList.toggle("scrolled", window.scrollY > 8);
      },
      { passive: true }
    );

    $$(".bar nav a, .logo").forEach(function (a) {
      a.addEventListener("mouseenter", function () {
        scramble(a, { duration: 300 });
      });
    });
  }

  /* ───────────── go ───────────── */
  $("#year").textContent = new Date().getFullYear();
  reveals();
  field();
  pipeline();
  var playBanner = bannerArt();
  boot(function () {
    if (playBanner) playBanner();
    portrait();
    setTimeout(typed, reduced ? 0 : 500);
  });
})();
