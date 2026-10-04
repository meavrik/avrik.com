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
    var byColumn = !!opts.byColumn;
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    var finals = nodes.map(function (n) {
      return n.__final || (n.__final = n.nodeValue);
    });
    if (reduced) return;

    // per-char random jitter so the reveal looks organic
    var maxCol = 1;
    var plan = finals.map(function (txt) {
      var col = 0;
      return Array.prototype.map.call(txt, function (ch) {
        var c = ch === "\n" ? ((col = 0), 0) : col++;
        if (c > maxCol) maxCol = c;
        return { ch: ch, col: c, j: Math.random() * 0.25 };
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
          var pos = byColumn ? c.col / maxCol : idx / total;
          var shown = p >= 1 || pos * 0.75 + c.j <= p;
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
  boot(function () {
    scramble($("#banner"), { duration: 1100, byColumn: true });
    setTimeout(typed, reduced ? 0 : 500);
  });
})();
