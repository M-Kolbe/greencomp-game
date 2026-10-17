/* GreenComp Trails — the window (Fenster): three pieces per competence. Sound, voice, picture.
 * Every scene returns { dur, cues, cleanup?, pause?, resume?, after? } and runs on G.Timeline. */
(function () {
  "use strict";
  var G = window.GCT, D = G.D, A = G.A, h = G.h, s = G.s, T = G.T, L = G.L, put = G.put, Voice = G.Voice;

  function narratedCues(list, ui, who, minDur, start) {
    var t = start == null ? 0.8 : start, cues = [];
    list.forEach(function (it, i) {
      var text = L(it.text);
      cues.push({ at: t, fn: function () { if (it.onShow) it.onShow(i); ui.caption(text, it.cap ? L(it.cap) : ""); Voice.speak(text, it.who || who); } });
      t += Math.max(minDur || 0, G.est(text) + 1.3);
    });
    return { cues: cues, end: t };
  }
  function captionCues(steps, ui, speak) {
    return steps.map(function (st) { return { at: st.at, fn: function () { ui.caption(L(st.text), st.label ? L(st.label) : ""); if (speak) Voice.speak(L(st.text), "narrator"); } }; });
  }
  /* A canvas that redraws every frame with the scene clock (t in seconds), pausable. */
  function canvasClock(stage, draw) {
    var cv = h("canvas", { "aria-hidden": "true" }); stage.appendChild(cv);
    var t0 = performance.now(), off = 0, paused = false, pausedAt = 0, raf = 0;
    function now() { return paused ? pausedAt : (performance.now() - t0 - off) / 1000; }
    function frame() {
      var dpr = window.devicePixelRatio || 1;
      var W = cv.clientWidth * dpr, H = cv.clientHeight * dpr;
      if (cv.width !== W || cv.height !== H) { cv.width = W; cv.height = H; }
      draw(cv.getContext("2d"), W, H, now(), dpr);
      raf = requestAnimationFrame(frame);
    }
    frame();
    return {
      pause: function () { if (!paused) { pausedAt = now(); paused = true; } },
      resume: function () { if (paused) { off = performance.now() - t0 - pausedAt * 1000; paused = false; } },
      cleanup: function () { cancelAnimationFrame(raf); }
    };
  }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function mix(c1, c2, t) { t = Math.max(0, Math.min(1, t)); return "rgb(" + [0, 1, 2].map(function (k) { return Math.round(lerp(c1[k], c2[k], t)); }).join(",") + ")"; }
  function keyed(keys, p) { /* keys: [[pos,[r,g,b]],...] */
    for (var i = 0; i < keys.length - 1; i++) if (p <= keys[i + 1][0]) return mix(keys[i][1], keys[i + 1][1], (p - keys[i][0]) / (keys[i + 1][0] - keys[i][0]));
    return mix(keys[keys.length - 1][1], keys[keys.length - 1][1], 0);
  }
  function seeded(n) { var x = Math.sin(n * 9301 + 49297) * 233280; return x - Math.floor(x); }

  /* ================= VOICE pieces ================= */
  function voiceScene(stage, piece, ui) {
    var labels = [], idxOf = [];
    piece.lines.forEach(function (ln) { var l = L(ln.label); var k = labels.indexOf(l); if (k < 0) { labels.push(l); k = labels.length - 1; } idxOf.push(k); });
    var dark = piece.kind === "child", seeds = [];
    var people = labels.map(function (l) { return h("div", { class: "voice" }, h("span", { class: "voice-orb" }), h("span", { class: "voice-label" }, l)); });
    if (piece.kind === "promises") {
      people = piece.lines.map(function (ln) {
        var stem = s("path", { class: "stem", d: "M50 118 C50 90 52 70 50 40", stroke: "var(--a-values)", "stroke-width": 5, fill: "none", "stroke-linecap": "round" });
        var lf1 = s("path", { class: "leaf", d: "M50 62 C30 58 24 44 26 38 C40 38 50 48 50 62 Z", fill: "var(--a-values)" });
        var lf2 = s("path", { class: "leaf", d: "M51 50 C70 44 76 30 74 24 C60 26 51 36 51 50 Z", fill: "var(--a-values)" });
        seeds.push([stem, lf1, lf2]);
        return h("div", { class: "seed voice" }, s("svg", { viewBox: "0 0 100 150", "aria-hidden": "true" },
          s("g", { style: "transform-origin:50px 120px;transform:scale(" + ln.grow + ")" }, stem, lf1, lf2),
          s("rect", { x: 14, y: 118, width: 72, height: 26, rx: 3, fill: "var(--paper)", stroke: "var(--line)", "stroke-width": 2, "stroke-dasharray": "4 3" })), h("span", { class: "voice-label" }, L(ln.label)));
      });
    }
    var wrap = h("div", { class: "voices" + (dark ? " voices--dark" : "") }, people);
    stage.appendChild(wrap);
    function active(k) { Array.prototype.forEach.call(wrap.children, function (el, i) { el.classList.toggle("on", i === k); }); }
    var list = piece.lines.map(function (ln, i) {
      return { text: ln.text, who: ln.who, cap: ln.label, onShow: function () {
        active(piece.kind === "promises" ? i : idxOf[i]);
        if (seeds[i]) seeds[i].forEach(function (el) { el.style.transform = "none"; });
      } };
    });
    var n = narratedCues(list, ui, null, 3, 1);
    n.cues.push({ at: n.end, fn: function () { active(-1); } });
    return { dur: n.end + 1.5, cues: n.cues };
  }

  /* ================= SOUND pieces ================= */
  function soundScene(stage, piece, ui, c) {
    var wrap = h("div", { class: "listen" });
    var rings = h("div", { class: "listen-rings", "aria-hidden": "true" }, h("i"), h("i"), h("i"), h("span", { class: "listen-core" }, G.icon("sound", "listen-ico")));
    wrap.append(rings, h("p", { class: "listen-title" }, L(piece.title)), h("p", { class: "listen-hint" }, T("headphones")));
    stage.appendChild(wrap);
    var snd = null, raf = 0;
    function pulse() {
      var an = A.analyser();
      if (an) { var d = new Uint8Array(an.frequencyBinCount); an.getByteFrequencyData(d); var sum = 0; for (var i = 0; i < d.length; i++) sum += d[i]; wrap.style.setProperty("--lvl", Math.min(1, sum / d.length / 70).toFixed(3)); }
      raf = requestAnimationFrame(pulse);
    }
    if (!G.reduced) pulse();
    var cues = captionCues(piece.steps, ui, false);
    cues.unshift({ at: 0, fn: function () { snd = A.scene(piece.preset); } });
    cues.push({ at: piece.dur - 5, fn: function () { if (snd) snd.stop(4.5); } });
    var res = { dur: piece.dur, cues: cues, cleanup: function () { cancelAnimationFrame(raf); if (snd) snd.stop(0.4); } };
    if (piece.quiz) res.after = function () {
      var q = piece.quiz, out = h("div", { class: "stage-start" });
      var msg = h("p", { class: "lead", "aria-live": "polite" });
      var btns = h("div", { class: "row", style: { justifyContent: "center" } }, q.options.map(function (n) {
        return h("button", { type: "button", class: "btn quiz-btn", onclick: function () {
          var right = n === q.answer;
          Array.prototype.forEach.call(btns.children, function (b) { b.disabled = true; if (+b.textContent === q.answer) b.classList.add("right"); });
          put(msg, h("b", null, right ? T("quizRight") : T("quizWrong")), " ", L(q.reveal));
          ui.caption(L(q.reveal));
          if (right) G.award("ear");
        } }, String(n));
      }));
      out.append(h("p", { class: "lead", style: { color: "var(--ink)" } }, L(piece.steps[piece.steps.length - 1].text)), btns, msg);
      stage.appendChild(out);
    };
    return res;
  }

  /* ================= PICTURE pieces ================= */
  var PIC = {};

  PIC.forest = function (stage, piece, ui) {
    var trees = []; for (var i = 0; i < 26; i++) trees.push({ x: seeded(i), h: 0.25 + seeded(i + 40) * 0.45, w: 0.03 + seeded(i + 80) * 0.05, layer: i % 3 });
    trees.sort(function (p, q) { return p.layer - q.layer; });
    var cc = canvasClock(stage, function (x, W, H, t, dpr) {
      var p = Math.min(1, t / piece.dur);
      var g = x.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, mix([6, 9, 18], [70, 92, 124], p)); g.addColorStop(0.7, mix([10, 14, 20], [214, 160, 112], p)); g.addColorStop(1, mix([4, 6, 6], [240, 196, 132], p));
      x.fillStyle = g; x.fillRect(0, 0, W, H);
      trees.forEach(function (tr) {
        var sh = [8, 14, 22][tr.layer];
        x.fillStyle = mix([sh, sh + 4, sh], [sh + 10 * (2 - tr.layer), sh + 22 * (2 - tr.layer), sh + 10 * (2 - tr.layer)], p * 0.6);
        var bx = tr.x * W, bh = tr.h * H * (1 + tr.layer * 0.25), bw = tr.w * W * (1 + tr.layer * 0.3);
        x.beginPath(); x.moveTo(bx - bw, H); x.lineTo(bx, H - bh); x.lineTo(bx + bw, H); x.fill();
      });
      for (var m = 0; m < 40; m++) { var a = (0.25 + 0.25 * Math.sin(t * 1.3 + m)) * (1 - p * 0.6); x.fillStyle = "rgba(255,236,170," + a + ")"; x.beginPath(); x.arc(((seeded(m + 7) + t * 0.004 * (1 + m % 3)) % 1) * W, (0.4 + seeded(m + 99) * 0.5) * H + Math.sin(t + m) * 6, 2 * dpr, 0, 7); x.fill(); }
    });
    var res = { dur: piece.dur, cues: captionCues(piece.steps, ui, true), pause: cc.pause, resume: cc.resume, cleanup: cc.cleanup };
    if (!piece.silent) { var snd = null; res.cues.unshift({ at: 0, fn: function () { snd = A.scene("forest"); } }); var cl = res.cleanup; res.cleanup = function () { cl(); if (snd) snd.stop(0.5); }; }
    return res;
  };

  PIC.seasons = function (stage, piece, ui) {
    var leaves = []; for (var i = 0; i < 160; i++) { var a = seeded(i) * Math.PI * 2, r = Math.sqrt(seeded(i + 300)); leaves.push({ a: a, r: r, f: seeded(i + 600), k: seeded(i + 900) }); }
    var cc = canvasClock(stage, function (x, W, H, t, dpr) {
      var p = Math.max(0, Math.min(3.999, (t - 2.5) / 7.2));
      var sky = keyed([[0, [196, 226, 240]], [1, [160, 210, 240]], [2, [190, 200, 205]], [3, [214, 220, 226]], [4, [214, 220, 226]]], p);
      x.fillStyle = sky; x.fillRect(0, 0, W, H);
      var gy = H * 0.78;
      x.fillStyle = keyed([[0, [120, 170, 80]], [1, [90, 140, 60]], [2, [160, 140, 80]], [3, [240, 244, 246]], [4, [240, 244, 246]]], p);
      x.fillRect(0, gy, W, H - gy);
      // wall
      x.fillStyle = "#d9cbb5"; x.fillRect(W * 0.08, H * 0.28, W * 0.5, gy - H * 0.28);
      x.strokeStyle = "rgba(120,100,80,.25)"; x.lineWidth = 1 * dpr;
      for (var by = H * 0.28; by < gy; by += H * 0.06) { x.beginPath(); x.moveTo(W * 0.08, by); x.lineTo(W * 0.58, by); x.stroke(); }
      // child's bicycle
      var bx = W * 0.3, wy = gy - H * 0.07, wr = H * 0.065;
      x.strokeStyle = "#b5342b"; x.lineWidth = 4 * dpr; x.lineCap = "round";
      x.beginPath(); x.arc(bx - wr * 1.4, wy, wr, 0, 7); x.stroke(); x.beginPath(); x.arc(bx + wr * 1.4, wy, wr, 0, 7); x.stroke();
      x.beginPath(); x.moveTo(bx - wr * 1.4, wy); x.lineTo(bx - wr * 0.2, wy - wr * 1.2); x.lineTo(bx + wr * 0.9, wy - wr * 1.2); x.lineTo(bx + wr * 1.4, wy); x.moveTo(bx - wr * 0.2, wy - wr * 1.2); x.lineTo(bx, wy); x.lineTo(bx - wr * 1.4, wy); x.moveTo(bx + wr * 0.9, wy - wr * 1.2); x.lineTo(bx + wr * 1.1, wy - wr * 1.8); x.stroke();
      x.fillStyle = "#222"; x.fillRect(bx - wr * 0.5, wy - wr * 1.45, wr * 0.6, wr * 0.22);
      if (p > 3) { x.fillStyle = "#fff"; x.beginPath(); x.ellipse(bx - wr * 0.2, wy - wr * 1.5, wr * 0.4, wr * 0.12, 0, 0, 7); x.fill(); }
      // tree
      var tx = W * 0.78, ty = gy, th = H * 0.42;
      x.fillStyle = "#6b4a2b"; x.fillRect(tx - 6 * dpr, ty - th, 12 * dpr, th);
      x.strokeStyle = "#6b4a2b"; x.lineWidth = 5 * dpr;
      [[-1, 0.7], [1, 0.6], [-0.6, 0.85], [0.7, 0.9]].forEach(function (b) { x.beginPath(); x.moveTo(tx, ty - th * b[1] * 0.8); x.lineTo(tx + b[0] * W * 0.08, ty - th * b[1] * 1.1); x.stroke(); });
      var dens = p < 1 ? 0.35 + p * 0.65 : p < 2 ? 1 : p < 3 ? 1 - (p - 2) * 0.85 : 0;
      var col = keyed([[0, [150, 205, 110]], [1, [60, 125, 50]], [2, [214, 122, 38]], [3, [170, 90, 40]], [4, [170, 90, 40]]], p);
      var cx = tx, cy = ty - th * 1.05, R = W * 0.13;
      leaves.forEach(function (lf, i) {
        if (lf.f > dens) {
          if (p > 2 && p < 3.3 && lf.f < dens + 0.25) { var fall = ((t * 0.3 + lf.k) % 1); x.fillStyle = col; x.beginPath(); x.ellipse(cx + Math.cos(lf.a) * lf.r * R + Math.sin(t + i) * 10 * dpr, cy + fall * (ty - cy), 5 * dpr, 2.5 * dpr, t + i, 0, 7); x.fill(); }
          return;
        }
        x.fillStyle = p < 0.8 && lf.k > 0.8 ? "#f2b8c6" : col;
        x.beginPath(); x.arc(cx + Math.cos(lf.a) * lf.r * R, cy + Math.sin(lf.a) * lf.r * R * 0.75, 7 * dpr, 0, 7); x.fill();
      });
      if (p > 3) for (var f = 0; f < 70; f++) { x.fillStyle = "rgba(255,255,255,.9)"; x.beginPath(); x.arc(seeded(f) * W + Math.sin(t + f) * 8 * dpr, ((seeded(f + 50) + t * 0.08) % 1) * H, 2.2 * dpr, 0, 7); x.fill(); }
      if (p > 1 && p < 2) { x.fillStyle = "rgba(246,198,0,.9)"; x.beginPath(); x.arc(W * 0.9, H * 0.12, H * 0.06, 0, 7); x.fill(); }
    });
    return { dur: piece.dur, cues: captionCues(piece.steps, ui, true), pause: cc.pause, resume: cc.resume, cleanup: cc.cleanup };
  };

  PIC.footprints = function (stage, piece, ui) {
    function pathPt(u, W, H) { return [W * (0.05 + 0.9 * u), H * (0.62 + 0.18 * Math.sin(u * Math.PI * 1.6 + 0.3))]; }
    var walkers = []; for (var i = 0; i < 26; i++) walkers.push({ start: 1 + i * 1.15 + seeded(i) * 0.8, dir: seeded(i + 5) > 0.5 ? 1 : -1, off: (seeded(i + 9) - 0.5) * 0.05, speed: 0.11 + seeded(i + 13) * 0.05 });
    var litter = [[0.3, 13], [0.55, 15], [0.72, 17]];
    var cc = canvasClock(stage, function (x, W, H, t, dpr) {
      x.fillStyle = "#7fa860"; x.fillRect(0, 0, W, H);
      for (var g = 0; g < 120; g++) { x.fillStyle = "rgba(60,100,40,.35)"; x.fillRect(seeded(g) * W, seeded(g + 200) * H, 2 * dpr, 6 * dpr); }
      x.strokeStyle = "#d9c9a3"; x.lineWidth = H * 0.12; x.lineCap = "round"; x.beginPath();
      for (var u = 0; u <= 1.001; u += 0.02) { var pt = pathPt(u, W, H); if (u === 0) x.moveTo(pt[0], pt[1]); else x.lineTo(pt[0], pt[1]); }
      x.stroke();
      // bench
      x.fillStyle = "#8a5a35"; x.fillRect(W * 0.62, H * 0.18, W * 0.18, H * 0.04); x.fillRect(W * 0.62, H * 0.12, W * 0.18, H * 0.03);
      // footprints
      walkers.forEach(function (wk) {
        var age = t - wk.start; if (age < 0) return;
        var steps = Math.floor(age / 0.28);
        for (var k = 0; k < steps; k++) {
          var u = k * wk.speed * 0.28; if (u > 1) break;
          var uu = wk.dir > 0 ? u : 1 - u, pt = pathPt(uu, W, H), side = k % 2 ? 1 : -1;
          var fade = Math.max(0, 1 - (age - k * 0.28) / 6); if (fade <= 0) continue;
          x.fillStyle = "rgba(90,70,45," + (0.55 * fade) + ")";
          x.beginPath(); x.ellipse(pt[0], pt[1] + (side * 0.025 + wk.off) * H, 4 * dpr, 2.4 * dpr, 0, 0, 7); x.fill();
        }
      });
      // litter appears and is picked up
      litter.forEach(function (l, i) {
        if (t < l[1] || t > 24 + i * 1.6) return;
        var pt = pathPt(l[0], W, H); x.fillStyle = ["#e04c3c", "#2b7bd8", "#f2c200"][i]; x.fillRect(pt[0], pt[1] - 6 * dpr, 12 * dpr, 7 * dpr);
      });
      if (t > 26) { x.fillStyle = "#f6e27a"; x.save(); x.translate(W * 0.7, H * 0.17); x.rotate(-0.12); x.fillRect(0, 0, W * 0.05, W * 0.035); x.restore(); }
      var year = Math.round(t < 33 ? 1990 + (2026 - 1990) * Math.min(1, t / 30) : 2026 + (2050 - 2026) * Math.min(1, (t - 33) / 6));
      x.fillStyle = "rgba(255,255,255,.92)"; x.font = "700 " + Math.round(H * 0.12) + "px Barlow Condensed, sans-serif"; x.fillText(String(year), W * 0.04, H * 0.16);
    });
    return { dur: piece.dur, cues: captionCues(piece.steps, ui, true), pause: cc.pause, resume: cc.resume, cleanup: cc.cleanup };
  };

  PIC.crops = function (stage, piece, ui) {
    var plants = []; for (var i = 0; i < 3; i++) for (var j = 0; j < 14; j++) plants.push({ s: i, x: (i + 0.12 + 0.76 * (j % 7) / 6) / 3, row: Math.floor(j / 7), h: 0.8 + seeded(i * 20 + j) * 0.3 });
    var COL = [[214, 176, 60], [80, 150, 70], [170, 70, 60]];
    function state(t) { /* 0 healthy .. 1 suffering, per stripe */
      function bump(a, b) { return t < a ? 0 : t < a + 2 ? (t - a) / 2 : t < b ? 1 : t < b + 2 ? 1 - (t - b) / 2 : 0; }
      return [bump(9, 18), bump(19, 28), bump(29, 38)];
    }
    var cc = canvasClock(stage, function (x, W, H, t, dpr) {
      var st = state(t);
      x.fillStyle = st[0] > 0.5 ? "#f2dcae" : "#cfe6f2"; x.fillRect(0, 0, W, H);
      if (st[0] > 0) { x.fillStyle = "rgba(246,198,0," + (0.5 + 0.5 * st[0]) + ")"; x.beginPath(); x.arc(W * 0.85, H * 0.15, H * (0.07 + 0.04 * st[0]), 0, 7); x.fill(); }
      if (st[2] > 0) { x.strokeStyle = "rgba(90,110,130," + st[2] + ")"; x.lineWidth = 2 * dpr; for (var w = 0; w < 9; w++) { var yy = H * (0.12 + w * 0.05), xx = ((t * 0.6 + w * 0.13) % 1) * W; x.beginPath(); x.moveTo(xx, yy); x.lineTo(xx + W * 0.12, yy); x.stroke(); } }
      x.fillStyle = "#8a6a45"; x.fillRect(0, H * 0.8, W, H * 0.2);
      plants.forEach(function (pl) {
        var bad = st[pl.s], base = H * (0.8 + pl.row * 0.06), px = pl.x * W, ph = H * 0.38 * pl.h * (1 - 0.15 * pl.row);
        var lean = pl.s === 2 ? bad * 0.9 : pl.s === 0 ? bad * 0.35 : 0;
        var tipx = px + Math.sin(lean) * ph * (pl.s === 2 ? 1 : 0.5), tipy = base - Math.cos(lean) * ph;
        var c = pl.s === 0 ? mix(COL[0], [140, 110, 70], bad) : pl.s === 1 ? mix(COL[1], [70, 90, 60], bad * 0.6) : mix(COL[2], [120, 70, 60], bad * 0.4);
        x.strokeStyle = c; x.lineWidth = 3.5 * dpr; x.beginPath(); x.moveTo(px, base); x.quadraticCurveTo(px, base - ph * 0.6, tipx, tipy); x.stroke();
        x.fillStyle = c; x.beginPath(); x.ellipse(tipx, tipy, 5 * dpr, 11 * dpr, lean, 0, 7); x.fill();
        if (pl.s === 1 && bad > 0.3) { x.fillStyle = "rgba(40,30,20," + bad + ")"; x.beginPath(); x.arc(tipx + 2 * dpr, tipy, 2.2 * dpr, 0, 7); x.arc(px, base - ph * 0.5, 2 * dpr, 0, 7); x.fill(); }
      });
      x.fillStyle = "rgba(255,255,255,.9)"; x.font = "700 " + Math.round(H * 0.06) + "px Barlow Condensed, sans-serif";
      ["A", "B", "C"].forEach(function (l, i) { x.fillText(l, W * (i + 0.47) / 3, H * 0.95); });
    });
    return { dur: piece.dur, cues: captionCues(piece.steps, ui, true), pause: cc.pause, resume: cc.resume, cleanup: cc.cleanup };
  };

  PIC.snow = function (stage, piece, ui) {
    function trail(k, u, W, H) { /* k = 0 first trace; others follow it then branch */
      var bx = W * 0.5 + Math.sin(u * 5) * W * 0.06, y = H * (0.97 - 0.62 * u);
      if (k > 0 && u > 0.45) bx += (k === 1 ? -1 : 1) * (u - 0.45) * W * 0.55;
      return [bx, y];
    }
    var starts = [7, 18, 20.5];
    var cc = canvasClock(stage, function (x, W, H, t, dpr) {
      var g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#b8c9d9"); g.addColorStop(0.35, "#e3ebf2"); g.addColorStop(0.36, "#f7f9fb"); g.addColorStop(1, "#ffffff");
      x.fillStyle = g; x.fillRect(0, 0, W, H);
      x.fillStyle = "#e8eef4"; x.beginPath(); x.moveTo(0, H * 0.36); x.quadraticCurveTo(W * 0.3, H * 0.28, W * 0.55, H * 0.35); x.quadraticCurveTo(W * 0.8, H * 0.3, W, H * 0.34); x.lineTo(W, H * 0.4); x.lineTo(0, H * 0.4); x.fill();
      for (var tr = 0; tr < 6; tr++) { x.fillStyle = "#4d6b55"; var tx = W * (0.08 + tr * 0.17), ty = H * 0.35; x.beginPath(); x.moveTo(tx, ty - H * 0.09); x.lineTo(tx - W * 0.02, ty); x.lineTo(tx + W * 0.02, ty); x.fill(); }
      starts.forEach(function (st, k) {
        var age = t - st; if (age < 0) return;
        var n = Math.floor(age / 0.32);
        for (var i = 0; i < n && i < 40; i++) {
          var u = i / 40, pt = trail(k, u, W, H), side = i % 2 ? 1 : -1, sc = 1 - u * 0.6;
          x.fillStyle = "rgba(120,140,165," + (k === 0 ? 0.75 : 0.55) + ")";
          x.beginPath(); x.ellipse(pt[0] + side * 5 * dpr * sc, pt[1], 3.4 * dpr * sc, 5.5 * dpr * sc, 0, 0, 7); x.fill();
        }
      });
      for (var f = 0; f < 90; f++) { x.fillStyle = "rgba(255,255,255,.95)"; x.beginPath(); x.arc(seeded(f) * W + Math.sin(t * 0.8 + f) * 10 * dpr, ((seeded(f + 70) + t * 0.05) % 1) * H, 1.8 * dpr, 0, 7); x.fill(); }
    });
    return { dur: piece.dur, cues: captionCues(piece.steps, ui, true), pause: cc.pause, resume: cc.resume, cleanup: cc.cleanup };
  };

  function chainIcon(name) {
    var P = {
      field: [s("path", { d: "M4 46 Q16 38 28 46 T52 46M4 34 Q16 26 28 34 T52 34" }), s("circle", { cx: 14, cy: 20, r: 5 }), s("circle", { cx: 28, cy: 15, r: 5 }), s("circle", { cx: 42, cy: 20, r: 5 })],
      factory: [s("path", { d: "M4 54V26l14 8v-8l14 8v-8l14 8v20zM40 26V8h8v22" })],
      shop: [s("path", { d: "M30 4h24v24L28 54 4 30z" }), s("circle", { cx: 44, cy: 14, r: 4 })],
      wardrobe: [s("path", { d: "M24 14a6 6 0 1 1 6 6c-3 1-3 3-3 6M27 26L4 46h50z" })],
      bag: [s("path", { d: "M14 22q16-8 32 0l6 32H8zM22 14l6 8 6-8" })]
    };
    return s.apply(null, ["g", { class: "ic", transform: "translate(-28,-30)" }].concat(P[name]));
  }
  PIC.chain = function (stage, piece, ui) {
    var st = piece.steps, xs = st.map(function (_, i) { return 100 + i * 200; });
    var traveller = s("circle", { cx: xs[0], cy: 140, r: 11, fill: "var(--sign)", style: "transition: cx 1.2s ease" });
    var nodes = st.map(function (x2, i) {
      return s("g", { class: "chain-node", transform: "translate(" + xs[i] + ",140)" }, s("circle", { class: "disc", r: 62 }), chainIcon(x2.icon), s("text", { y: 112, "text-anchor": "middle", text: L(x2.label) }));
    });
    stage.appendChild(h("div", { style: { display: "grid", placeItems: "center", padding: "3%" } },
      s("svg", { viewBox: "0 0 1000 300", preserveAspectRatio: "xMidYMid meet", "aria-hidden": "true" },
        s("path", { d: "M100 140H900", stroke: "var(--line)", "stroke-width": 6, "stroke-dasharray": "2 14", "stroke-linecap": "round" }), nodes, traveller)));
    var cues = st.map(function (x2, i) { return { at: 0.6 + i * 11.6, fn: function () { nodes.forEach(function (n, k) { n.classList.toggle("on", k === i); }); traveller.setAttribute("cx", xs[i]); ui.caption(L(x2.text), L(x2.label)); Voice.speak(L(x2.text), "narrator"); } }; });
    return { dur: 60, cues: cues };
  };

  PIC.ads = function (stage, piece, ui) {
    var ads = piece.ads.map(function (ad) {
      return h("div", { class: "ad layer " + (ad.tone === "sky" ? "ad--sky" : "ad--plain") },
        h("span", { class: "brand" }, ad.brand), h("span", { class: "claim" }, L(ad.claim)), h("span", null, L(ad.text)), h("span", { class: "fine" }, "* " + L(ad.small)));
    });
    ads.forEach(function (el) { stage.appendChild(el); });
    var cues = ads.map(function (el, i) { return { at: 0.5 + i * 20, fn: function () { ads.forEach(function (x2, k) { x2.classList.toggle("on", k === i); }); ui.caption(L(piece.ads[i].text), piece.ads[i].brand); Voice.speak(L(piece.ads[i].text), "ad"); } }; });
    return { dur: 41, cues: cues, after: function () {
      ads.forEach(function (x2) { x2.classList.remove("on"); });
      var out = h("div", { class: "stage-start" }, h("p", { class: "lead", style: { color: "var(--ink)" } }, L(piece.ask)));
      var revealP = h("p", { class: "lead", style: { color: "var(--ink)", fontSize: "1.05rem" }, hidden: true }, L(piece.reveal));
      var b = h("button", { type: "button", class: "btn btn--sign", onclick: function () { revealP.hidden = false; b.hidden = true; ui.caption(L(piece.reveal)); } }, T("showAnswer"));
      out.append(b, revealP); stage.appendChild(out); ui.caption(L(piece.ask));
    } };
  };

  function zoomSVG(kind) {
    var V = { viewBox: "0 0 800 500", preserveAspectRatio: "xMidYMid slice", "aria-hidden": "true" };
    if (kind === "space") {
      var stars = []; for (var i = 0; i < 60; i++) stars.push(s("circle", { cx: seeded(i) * 800, cy: seeded(i + 60) * 500, r: seeded(i + 120) * 1.6 + 0.3, fill: "#dfe8ff", opacity: seeded(i + 180) * 0.8 + 0.2 }));
      var hid = "halo" + Math.random().toString(36).slice(2, 6);
      return s("svg", V, s("defs", null, s("radialGradient", { id: hid }, s("stop", { offset: "60%", "stop-color": "#ff9a3c", "stop-opacity": 0.55 }), s("stop", { offset: "100%", "stop-color": "#ff9a3c", "stop-opacity": 0 }))),
        s("rect", { width: 800, height: 500, fill: "#04070f" }), stars,
        s("circle", { cx: 400, cy: 250, r: 190, fill: "url(#" + hid + ")" }), s("circle", { cx: 400, cy: 250, r: 140, fill: "#235f8c" }),
        s("path", { d: "M330 170c40-30 90-20 110 10s-10 50 10 70 60 10 50 50-70 40-90 10-60-10-80-40 0-70 0-100z", fill: "#7c9b4a" }),
        s("path", { d: "M470 300c20-10 50 0 50 25s-30 40-50 30-20-45 0-55z", fill: "#9aa957" }),
        s("ellipse", { cx: 400, cy: 125, rx: 70, ry: 14, fill: "#f2f6f8", opacity: 0.85 }));
    }
    if (kind === "city") {
      var blocks = [];
      for (var gx = 0; gx < 8; gx++) for (var gy = 0; gy < 5; gy++) {
        var hot = !(gx > 5 && gy > 2), x0 = 20 + gx * 98, y0 = 20 + gy * 96;
        blocks.push(s("rect", { x: x0, y: y0, width: 78, height: 76, rx: 3, fill: hot ? ["#c9b9a6", "#b8a693", "#d3c4b1"][(gx + gy) % 3] : "#5f8f4e" }));
        if (hot && (gx * 7 + gy * 3) % 5 === 0) blocks.push(s("rect", { x: x0, y: y0, width: 78, height: 76, rx: 3, fill: "#ff5a2a", opacity: 0.35 }));
        if (!hot) blocks.push(s("circle", { cx: x0 + 39, cy: y0 + 38, r: 24, fill: "#3f6f33" }));
      }
      return s("svg", V, s("rect", { width: 800, height: 500, fill: "#8d8378" }), blocks);
    }
    return s("svg", V,
      s("rect", { width: 800, height: 330, fill: "#bfe0f2" }), s("rect", { y: 330, width: 800, height: 170, fill: "#d8c79f" }),
      s("circle", { cx: 660, cy: 90, r: 48, fill: "#f6c600" }),
      s("g", { stroke: "#f6c600", "stroke-width": 6, "stroke-linecap": "round" }, [0, 45, 90, 135, 180, 225, 270, 315].map(function (d) { var r = d * Math.PI / 180; return s("line", { x1: 660 + Math.cos(r) * 64, y1: 90 + Math.sin(r) * 64, x2: 660 + Math.cos(r) * 84, y2: 90 + Math.sin(r) * 84 }); })),
      s("rect", { x: 260, y: 300, width: 260, height: 22, rx: 4, fill: "#8a5a35" }), s("rect", { x: 260, y: 262, width: 260, height: 16, rx: 4, fill: "#8a5a35" }),
      s("rect", { x: 280, y: 322, width: 14, height: 60, fill: "#5e3c22" }), s("rect", { x: 486, y: 322, width: 14, height: 60, fill: "#5e3c22" }),
      s("path", { d: "M120 400V300", stroke: "#6b4a2b", "stroke-width": 6 }), s("circle", { cx: 120, cy: 290, r: 16, fill: "#6e9b45" }),
      s("path", { d: "M300 230q20-12 40 0t40 0M420 220q20-12 40 0t40 0", stroke: "#e9a35c", "stroke-width": 4, fill: "none", opacity: 0.8 }));
  }
  PIC.zoom = function (stage, piece, ui) {
    var layers = piece.steps.map(function (st) { var l = h("div", { class: "layer zoom" }, zoomSVG(st.scene)); stage.appendChild(l); return l; });
    var tag = h("span", { class: "year" }); stage.appendChild(tag);
    var cues = piece.steps.map(function (st, i) { return { at: 0.4 + i * 15.5, fn: function () { layers.forEach(function (l, k) { l.classList.toggle("on", k === i); }); tag.textContent = L(st.label); ui.caption(L(st.text), L(st.label)); Voice.speak(L(st.text), "narrator"); } }; });
    cues.push({ at: 46.5, fn: function () { ui.caption(L(piece.ask)); Voice.speak(L(piece.ask), "narrator"); } });
    return { dur: 50, cues: cues };
  };

  function streetSVG(v) {
    var sky = { "1990": "#cfd6da", today: "#c4dbe9", "2050": "#cde9d9" }[v];
    var els = [s("rect", { width: 800, height: 500, fill: sky })];
    [[30, 170, 120], [160, 130, 110], [280, 200, 140], [430, 150, 120], [560, 190, 210]].forEach(function (b, i) {
      var top = 360 - b[1];
      els.push(s("rect", { x: b[0], y: top, width: b[2], height: b[1], fill: ["#b9aa98", "#a7b0b7", "#c7b59a", "#9fa9a2", "#b8a28c"][i] }));
      for (var r = top + 18; r < 340; r += 34) for (var cx = b[0] + 14; cx < b[0] + b[2] - 20; cx += 30) els.push(s("rect", { x: cx, y: r, width: 14, height: 18, fill: "#e9edf0", opacity: 0.85 }));
      if (v !== "1990" && i % 2 === 0) els.push(s("path", { d: "M" + (b[0] + 10) + " " + (top - 2) + "l20-14h" + (b[2] - 50) + "l-20 14z", fill: "#27466b" }));
      if (v === "2050") els.push(s("rect", { x: b[0], y: top - 10, width: b[2], height: 12, rx: 6, fill: "#5c9a48" }));
    });
    els.push(s("rect", { y: 360, width: 800, height: 140, fill: v === "2050" ? "#a9b39b" : "#7d8183" }), s("rect", { y: 360, width: 800, height: 14, fill: "#c9c4b8" }));
    function tree(x, sc) { return s("g", { transform: "translate(" + x + ",372) scale(" + sc + ")" }, s("rect", { x: -4, y: -60, width: 8, height: 60, fill: "#6b4a2b" }), s("circle", { cy: -74, r: 30, fill: "#4f8a3c" })); }
    function car(x, col) { return s("g", { transform: "translate(" + x + ",420)" }, s("rect", { x: 0, y: -22, width: 96, height: 30, rx: 10, fill: col }), s("rect", { x: 18, y: -40, width: 54, height: 22, rx: 8, fill: col }), s("circle", { cx: 22, cy: 10, r: 10, fill: "#222" }), s("circle", { cx: 74, cy: 10, r: 10, fill: "#222" })); }
    function bike(x) { return s("g", { transform: "translate(" + x + ",470)", stroke: "#1d2a22", "stroke-width": 3, fill: "none" }, s("circle", { cx: 0, cy: 0, r: 12 }), s("circle", { cx: 34, cy: 0, r: 12 }), s("path", { d: "M0 0l12-20h16l6 20M12-20l-4-8" }), s("circle", { cx: 20, cy: -42, r: 6, fill: "#1d2a22" }), s("path", { d: "M20-36l-2 14" })); }
    function person(x, col) { return s("g", { transform: "translate(" + x + ",372)" }, s("circle", { cy: -40, r: 7, fill: col }), s("rect", { x: -6, y: -32, width: 12, height: 24, rx: 5, fill: col }), s("path", { d: "M-3-8l-3 8M3-8l3 8", stroke: col, "stroke-width": 4 })); }
    if (v === "1990") { els.push(s("path", { d: "M0 432H800", stroke: "#e8e2c8", "stroke-width": 4, "stroke-dasharray": "30 26" }), tree(120, 0.9), tree(700, 0.8), car(90, "#a33b2f"), car(330, "#2f5e8f"), car(560, "#6b6b6b"), s("rect", { x: 610, y: 296, width: 34, height: 66, fill: "#d6a400" })); }
    else if (v === "today") { els.push(s("rect", { y: 450, width: 800, height: 50, fill: "#6e9c62", opacity: 0.6 }), tree(60, 0.9), tree(250, 0.85), tree(520, 0.9), tree(740, 0.8), car(130, "#3d6d9a"), car(420, "#8b8f93"), bike(250), bike(600)); }
    else {
      els.push(s("path", { d: "M0 418H800M0 432H800", stroke: "#6e6e6e", "stroke-width": 3 }));
      els.push(s("g", { transform: "translate(160,0)" }, s("rect", { x: 0, y: 372, width: 340, height: 50, rx: 14, fill: "#e8e2d0", stroke: "#2f6a4f", "stroke-width": 4 }), s("rect", { x: 20, y: 382, width: 300, height: 18, rx: 4, fill: "#9fc6dc" }), s("path", { d: "M170 372l-20-26h40", stroke: "#333", "stroke-width": 3, fill: "none" })));
      [40, 110, 540, 610, 680, 750, 330, 520, 20].forEach(function (x, i) { els.push(tree(x, 0.7 + (i % 3) * 0.12)); });
      els.push(bike(600), bike(70), person(560, "#a3542f"), person(590, "#2f5e8f"), person(700, "#6a4d99"), s("rect", { y: 474, width: 800, height: 26, fill: "#5c9a48" }));
    }
    return s("svg", { viewBox: "0 0 800 500", preserveAspectRatio: "xMidYMid slice", "aria-hidden": "true" }, els);
  }
  PIC.street = function (stage, piece, ui) {
    var layers = piece.steps.map(function (st) { var l = h("div", { class: "layer" }, streetSVG(st.year)); stage.appendChild(l); return l; });
    var tag = h("span", { class: "year" }); stage.appendChild(tag);
    var cues = piece.steps.map(function (st, i) { return { at: 0.3 + i * 10, fn: function () { layers.forEach(function (l, k) { l.classList.toggle("on", k === i); }); tag.textContent = st.year === "today" ? (G.lang === "de" ? "Heute" : "Today") : st.year; ui.caption(L(st.text)); Voice.speak(L(st.text), "narrator"); } }; });
    return { dur: 31, cues: cues };
  };

  PIC.kingfisher = function (stage, piece, ui) {
    var portal = s("path", { d: "M0 400V250q0-90 90-90t90 90v150z", fill: "#2b2f2c" });
    var blunt = s("g", null, s("rect", { x: 130, y: 300, width: 680, height: 70, rx: 12, fill: "#e9edf0", stroke: "#5b6670", "stroke-width": 3 }), s("rect", { x: 100, y: 300, width: 60, height: 70, rx: 30, fill: "#e9edf0", stroke: "#5b6670", "stroke-width": 3 }));
    var bang = s("g", { opacity: 0 }, s("path", { d: "M90 260l20 30 34-14-14 32 34 12-34 10 14 32-34-14-20 30-20-30-34 14 14-32-34-10 34-12-14-32 34 14z", fill: "#f6c600", stroke: "#c62f28", "stroke-width": 4 }));
    var longNose = s("g", { opacity: 0 }, s("rect", { x: 300, y: 300, width: 510, height: 70, rx: 10, fill: "#e9edf0", stroke: "#5b6670", "stroke-width": 3 }), s("path", { d: "M300 300C230 304 150 326 70 352c80 6 160 14 230 18z", fill: "#e9edf0", stroke: "#5b6670", "stroke-width": 3 }), s("rect", { x: 330, y: 316, width: 440, height: 18, rx: 4, fill: "#9fc6dc" }));
    var outline = s("path", { d: "M300 300C230 304 150 326 70 352c80 6 160 14 230 18", fill: "none", stroke: "#1e7fb8", "stroke-width": 5, "stroke-dasharray": "10 8", opacity: 0 });
    var bird = s("g", { opacity: 0, transform: "translate(560,120) rotate(28)" },
      s("ellipse", { cx: 0, cy: 0, rx: 46, ry: 26, fill: "#1e7fb8" }), s("ellipse", { cx: 6, cy: 12, rx: 34, ry: 14, fill: "#e8833a" }),
      s("circle", { cx: -28, cy: -8, r: 18, fill: "#1e7fb8" }), s("circle", { cx: -32, cy: -12, r: 4, fill: "#111" }),
      s("path", { d: "M-42 -8L-118 2-42 4z", fill: "#222" }), s("path", { d: "M30 -10l40-14-12 22z", fill: "#155d88" }));
    var water = s("path", { d: "M380 230q20-8 40 0t40 0 40 0 40 0 40 0", stroke: "#1e7fb8", "stroke-width": 4, fill: "none", opacity: 0 });
    var waves = s("g", { opacity: 0, stroke: "#5b6670", "stroke-width": 3, fill: "none" }, s("path", { d: "M50 330q-14 6 0 12" }), s("path", { d: "M36 324q-20 12 0 24" }));
    stage.appendChild(s("svg", { viewBox: "0 0 800 450", preserveAspectRatio: "xMidYMid meet", "aria-hidden": "true" }, s("rect", { width: 800, height: 450, fill: "var(--paper)" }), s("path", { d: "M0 400H800", stroke: "var(--line)", "stroke-width": 4 }), portal, blunt, longNose, bang, outline, water, bird, waves));
    var EL = { blunt: blunt, bang: bang, longNose: longNose, outline: outline, bird: bird, water: water, waves: waves };
    var PH = {
      train: { blunt: 1, bang: 1, longNose: 0, outline: 0, bird: 0, water: 0, waves: 0 },
      bird: { blunt: 0.25, bang: 0, longNose: 0, outline: 0, bird: 1, water: 1, waves: 0 },
      morph: { blunt: 0, bang: 0, longNose: 1, outline: 1, bird: 0.35, water: 0.3, waves: 0 },
      done: { blunt: 0, bang: 0, longNose: 1, outline: 0, bird: 0, water: 0, waves: 1 }
    };
    function show(map) { Object.keys(map).forEach(function (k) { EL[k].setAttribute("opacity", map[k]); EL[k].style.transition = "opacity .8s"; }); }
    var n = narratedCues(piece.steps.map(function (st) { return { text: st.text, onShow: function () { show(PH[st.phase]); } }; }), ui, "narrator", 8, 0.5);
    return { dur: Math.max(45, n.end + 1), cues: n.cues };
  };

  PIC.steps = function (stage, piece, ui) {
    var cards = piece.steps.map(function (st, i) { return h("div", null, h("span", { class: "n" }, String(i + 1)), h("b", null, L(st.title)), h("p", null, L(st.text))); });
    stage.appendChild(h("div", { class: "steps3" }, cards));
    var list = piece.steps.map(function (st, i) { var tx = L(st.title) + ". " + L(st.text); return { text: { en: tx, de: tx }, cap: { en: (i + 1) + " · " + L(st.title), de: (i + 1) + " · " + L(st.title) }, onShow: function () { cards[i].classList.add("on"); } }; });
    var n = narratedCues(list, ui, "narrator", 16, 1);
    n.cues.push({ at: n.end, fn: function () { ui.caption(L(piece.note)); } });
    return { dur: Math.max(60, n.end + 4), cues: n.cues };
  };

  PIC.grow = function (stage, piece, ui) {
    var counter = h("span", { class: "counter num" }, "0");
    var dots = []; for (var i = 0; i < 300; i++) dots.push({ a: seeded(i) * Math.PI * 2, r: Math.sqrt(seeded(i + 400)), t: 0, ph: seeded(i + 800) * 6 });
    var target = 0, shown = 0;
    var cc = canvasClock(stage, function (x, W, H, t, dpr) {
      x.clearRect(0, 0, W, H);
      var col = G.cssVar("--a-acting", stage), cx = W / 2, cy = H * 0.42, R = Math.min(W, H) * 0.38;
      if (shown < target) shown = Math.min(target, shown + Math.max(1, (target - shown) * 0.05));
      counter.textContent = String(Math.round(shown));
      x.fillStyle = col;
      for (var k = 0; k < Math.round(shown); k++) {
        var d = dots[k]; d.t = Math.min(1, d.t + 0.02);
        var e = 1 - Math.pow(1 - d.t, 3), rr = d.r * R * e;
        x.beginPath(); x.arc(cx + Math.cos(d.a) * rr * 1.5 + Math.sin(t * 1.1 + d.ph) * 2 * dpr, cy + Math.sin(d.a) * rr * 0.8, (k < 3 ? 7 : 3.4) * dpr, 0, 7); x.fill();
      }
    });
    stage.appendChild(counter);
    var n = narratedCues(piece.steps.map(function (st) { return { text: st.text, onShow: function () { target = st.n; } }; }), ui, "narrator", 9, 0.5);
    return { dur: Math.max(45, n.end + 1), cues: n.cues, pause: cc.pause, resume: cc.resume, cleanup: cc.cleanup };
  };

  /* ================= the window overlay ================= */
  var KIND = { sound: "pSound", voice: "pVoice", picture: "pPicture" };
  function pieceDur(c, kind) {
    var p = c.pieces[kind]; if (!p) return 0;
    if (p.dur) return p.dur;
    if (p.lines) return Math.round(p.lines.reduce(function (n, ln) { return n + Math.max(3, G.est(L(ln.text)) + 1.3); }, 2));
    if (p.kind === "ads") return 41;
    return 45;
  }
  function buildScene(stage, c, kind, ui) {
    var p = c.pieces[kind];
    if (kind === "sound") return soundScene(stage, p, ui, c);
    if (kind === "voice") return voiceScene(stage, p, ui);
    return (PIC[p.kind] || PIC.forest)(stage, p, ui);
  }

  G.openWindow = function (id, startKind) {
    var c = G.COMP[id];
    var kind = startKind || c.piece;
    var ov = G.overlay({ label: T("winTitle", { name: L(c.name) }), cls: "ov--night", badge: h("span", { class: "badge" }, T("proto")) });
    var stage = h("div", { class: "stage" });
    var cap = h("p", { class: "caption", "aria-live": "polite" });
    var bar = h("i"), prog = h("div", { class: "progress", "aria-hidden": "true" }, bar);
    var playBtn = h("button", { type: "button", class: "btn btn--sign" }, T("pause"));
    var restartBtn = h("button", { type: "button", class: "btn" }, T("restart"));
    var controls = h("div", { class: "controls", hidden: true }, playBtn, restartBtn, G.voiceToggle());
    var tabs = h("div", { class: "seg", role: "tablist", "aria-label": T("windowT") });
    var transcript = h("div");
    var tl = null, sc = null, started = false;
    var ui = { caption: function (text, who) { put(cap, who ? h("small", null, who) : null, text); } };
    function teardown() { if (tl) tl.stop(); Voice.cancel(); if (sc && sc.cleanup) sc.cleanup(); A.stopAll(); A.resume(); }
    function paintTabs() {
      put(tabs, ["sound", "voice", "picture"].map(function (k) {
        return h("button", { type: "button", role: "tab", class: "seg-btn", "aria-selected": String(k === kind), onclick: function () { if (k === kind) return; kind = k; paintTabs(); paintTranscript(); if (started) build(); else showStart(); } },
          G.icon(k === "sound" ? "sound" : k === "voice" ? "voice" : "picture", "seg-ico"),
          h("span", null, T(KIND[k])),
          h("small", null, G.mmss(pieceDur(c, k)) + (k === c.piece ? " · " + T("onCard") : "")));
      }));
    }
    function paintTranscript() { put(transcript, h("details", { class: "panel" }, h("summary", null, T("transcript")), G.pieceTranscript(c, kind))); }
    function build() {
      teardown(); started = true; stage.replaceChildren(); cap.replaceChildren(); controls.hidden = false;
      sc = buildScene(stage, c, kind, ui);
      tl = G.Timeline(sc.dur, sc.cues, {
        onTick: function (e, d) { bar.style.width = (100 * e / d) + "%"; },
        onEnd: function () { playBtn.textContent = T("restart"); playBtn.dataset.state = "end"; restartBtn.hidden = true; if (sc.after) sc.after(); }
      });
      playBtn.textContent = T("pause"); playBtn.dataset.state = "run"; restartBtn.hidden = false;
      A.ensure(); A.resume(); tl.play();
    }
    function showStart() {
      teardown(); stage.replaceChildren(); cap.replaceChildren(); bar.style.width = "0";
      stage.appendChild(h("div", { class: "stage-start" },
        h("p", { class: "eyebrow" }, T("realFirst")),
        h("div", { class: "lead", style: { color: "var(--ink)" } }, G.taskSteps(c, false)),
        h("p", null, T("realFirstP")),
        h("button", { type: "button", class: "btn btn--sign", onclick: build }, "▶ " + T("openWindow")),
        h("p", { class: "small" }, L(c.windowText))));
    }
    playBtn.addEventListener("click", function () {
      if (playBtn.dataset.state === "end") { build(); return; }
      if (tl.running) { tl.pause(); Voice.cancel(); A.suspend(); if (sc.pause) sc.pause(); playBtn.textContent = T("resume"); }
      else { A.resume(); if (sc.resume) sc.resume(); tl.play(); playBtn.textContent = T("pause"); }
    });
    restartBtn.addEventListener("click", build);
    paintTabs(); paintTranscript(); showStart();
    ov.body.append(tabs, stage, prog, cap, controls, transcript, h("p", { class: "note" }, T("protoLong")));
    var origClose = ov.close; ov.close = function () { teardown(); origClose(); };
  };

  /* ---------- transcripts (also used by the Text door) ---------- */
  G.pieceTranscript = function (c, kind) {
    var p = c.pieces[kind], items = [];
    if (!p) return null;
    if (kind === "sound") { items.push(h("li", null, h("b", null, L(p.title)))); p.steps.forEach(function (st) { items.push(h("li", null, L(st.text))); }); if (p.quiz) items.push(h("li", null, h("i", null, L(p.quiz.reveal)))); }
    if (p.lines) p.lines.forEach(function (ln) { items.push(h("li", null, h("b", null, L(ln.label) + ": "), L(ln.text))); });
    if (kind === "picture" && p.steps) p.steps.forEach(function (st) { items.push(h("li", null, st.label || st.title ? h("b", null, L(st.label || st.title) + ": ") : null, L(st.text))); });
    if (p.ads) p.ads.forEach(function (ad) { items.push(h("li", null, h("b", null, ad.brand + ": "), L(ad.text), " ", h("i", null, L(ad.small)))); });
    if (p.ask) items.push(h("li", null, h("b", null, "→ "), L(p.ask)));
    if (p.note) items.push(h("li", null, h("i", null, L(p.note))));
    var list = h("ul", { class: "transcript" }, items);
    if (p.reveal) return [list, h("details", null, h("summary", null, T("showAnswer")), h("p", null, L(p.reveal)))];
    return list;
  };
})();
