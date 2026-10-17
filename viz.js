/* GreenComp Trails — estimate scoring and the animated reveals (used by the board and the training). */
(function () {
  "use strict";
  var G = window.GCT, h = G.h, s = G.s, T = G.T, L = G.L;

  /* Accuracy: 100 for a hit, about 70 when off by a factor of 2, 0 from a factor of 10. */
  G.scoreNum = function (g, a) { if (!(g > 0)) return 0; return Math.max(0, Math.round(100 * (1 - Math.abs(Math.log10(g / a))))); };
  G.scoreTF = function (v, ans) { var n = (v.up || 0) + (v.down || 0); if (!n) return 0; return Math.round(100 * (ans ? (v.up || 0) : (v.down || 0)) / n); };
  G.answerText = function (e) {
    return e.type === "number" ? G.fmt(e.answer) + " " + L(e.unit) : (e.answer ? T("trueBtn") + "." : T("falseBtn") + ".");
  };

  /* Pins for each guess on a log scale, then the answer flag drops in. */
  G.guessScale = function (e, guesses) {
    var vals = guesses.filter(function (x) { return x.v > 0; });
    var all = vals.map(function (x) { return x.v; }).concat([e.answer]);
    var lo = Math.min.apply(null, all) / 1.6, hi = Math.max.apply(null, all) * 1.6;
    var W = 800, X = function (v) { return 40 + (W - 80) * (Math.log(v) - Math.log(lo)) / (Math.log(hi) - Math.log(lo)); };
    var els = [s("line", { class: "axis", x1: 40, y1: 110, x2: W - 40, y2: 110 })];
    vals.slice().sort(function (p, q) { return p.v - q.v; }).forEach(function (x, k) {
      var y = k % 2 ? 62 : 86, gx = X(x.v), col = x.color || G.cssVar("--ink-2");
      els.push(s("line", { x1: gx, y1: y + 6, x2: gx, y2: 110, stroke: col, "stroke-width": 3 }), s("circle", { cx: gx, cy: 110, r: 7, fill: col }),
        s("text", { x: gx, y: y, "text-anchor": "middle", "font-size": 18, text: x.name || "" }),
        s("text", { x: gx, y: 136, "text-anchor": "middle", "font-size": 16, class: "muted-t", text: G.fmt(x.v) }));
    });
    var ax = X(e.answer);
    var flag = s("g", { style: G.reduced ? "" : "transition: transform 1s cubic-bezier(.3,1.5,.5,1); transform: translateY(-40px)" },
      s("line", { x1: ax, y1: 18, x2: ax, y2: 110, stroke: G.cssVar("--ink"), "stroke-width": 3 }),
      s("path", { d: "M" + ax + " 18h46l-10 12 10 12h-46z", fill: G.cssVar("--sign") }),
      s("text", { x: ax + 6, y: 36, "font-size": 15, fill: G.cssVar("--sign-ink"), text: G.fmt(e.answer) }));
    els.push(flag);
    setTimeout(function () { flag.style.transform = "none"; }, 60);
    return h("div", { class: "viz" }, s("svg", { viewBox: "0 0 " + W + " 150", role: "img", "aria-label": T("guess") + " / " + G.fmt(e.answer) + " " + L(e.unit) }, els));
  };

  G.drawViz = function (e, box) {
    var area = G.cssVar("--area", box), ink2 = G.cssVar("--ink-2");
    if (e.viz === "split") {
      var tot = e.parts.reduce(function (n, p) { return n + p.v; }, 0), x = 0, W = 800, segs = [], labels = [];
      e.parts.forEach(function (p, i) {
        var w = (W - 20) * p.v / tot, on = p.hi;
        var r = s("rect", { x: 10 + x, y: 20, width: G.reduced ? w - 3 : 0, height: 56, rx: 6, fill: on ? area : ink2, opacity: e.highlightOnly && !on ? 0.3 : (on ? 1 : 0.55) });
        segs.push(r);
        (function (rr, ww, d) { setTimeout(function () { rr.style.transition = "width .9s ease"; rr.setAttribute("width", ww - 3); }, d); })(r, w, 120 + i * 220);
        labels.push(s("text", { x: 10 + x + 4, y: 100 + (i % 2) * 20, "font-size": 16, text: G.fmt(p.v, 0) + " · " + L(p.label), class: on ? "" : "muted-t" }));
        x += w;
      });
      G.put(box, s("svg", { viewBox: "0 0 800 140", role: "img", "aria-label": e.parts.map(function (p) { return L(p.label) + " " + p.v; }).join(", ") }, segs, labels));
    } else if (e.viz === "flock") {
      var cv = h("canvas", { width: 800, height: 260, role: "img", "aria-label": L(e.detail) }); G.put(box, cv);
      var ctx = cv.getContext("2d"), pts = [], ink = G.cssVar("--ink");
      for (var i = 0; i < 360; i++) pts.push({ x: 30 + Math.random() * 740, y: 20 + Math.random() * 220, p: Math.random() * 6, lost: i % 6 === 0, sparrow: i % 6 === 0 && (i / 6) % 12 < 5 });
      var t0 = performance.now(), raf = 0;
      (function frame(now) {
        var t = (now - t0) / 1000; ctx.clearRect(0, 0, 800, 260);
        pts.forEach(function (pt) {
          var fade = pt.lost ? Math.max(0.08, 1 - Math.max(0, t - 1.2) / 1.6) : 1;
          if (G.reduced && pt.lost) fade = 0.12;
          ctx.globalAlpha = fade; ctx.fillStyle = pt.sparrow ? ink : area;
          ctx.beginPath(); ctx.arc(pt.x + Math.sin(t + pt.p) * 3, pt.y + Math.cos(t * 0.8 + pt.p) * 2, pt.lost ? 4.4 : 3.8, 0, 7); ctx.fill();
        });
        ctx.globalAlpha = 1;
        if (!G.reduced && t < 30 && cv.isConnected) raf = requestAnimationFrame(frame);
      })(t0);
      G.onLeave(function () { cancelAnimationFrame(raf); });
    } else if (e.viz === "line") {
      var p0 = e.points[0], p1 = e.points[1], X2 = function (yr) { return 70 + (yr - 2019) * 130; }, Y = function (v) { return 220 - v * 3.2; };
      G.put(box, s("svg", { viewBox: "0 0 800 260", role: "img", "aria-label": p0[0] + ": " + p0[1] + " %, " + p1[0] + ": " + p1[1] + " %" },
        [0, 20, 40, 60].map(function (v) { return [s("line", { class: "grid", x1: 60, x2: 740, y1: Y(v), y2: Y(v) }), s("text", { x: 50, y: Y(v) + 5, "text-anchor": "end", "font-size": 15, class: "muted-t", text: v + " %" })]; }),
        [2019, 2020, 2021, 2022, 2023, 2024].map(function (yr) { return s("text", { x: X2(yr), y: 248, "text-anchor": "middle", "font-size": 15, class: "muted-t", text: String(yr) }); }),
        s("path", { d: "M" + X2(p0[0]) + " " + Y(p0[1]) + "L" + X2(p1[0]) + " " + Y(p1[1]), stroke: area, "stroke-width": 5, "stroke-dasharray": "10 8", fill: "none" }),
        e.points.map(function (pt) { return [s("circle", { cx: X2(pt[0]), cy: Y(pt[1]), r: 9, fill: area }), s("text", { x: X2(pt[0]), y: Y(pt[1]) - 18, "text-anchor": "middle", "font-size": 24, text: pt[1] + " %" })]; })));
    } else if (e.viz === "bars") {
      var rows = e.bars.map(function (b, i) {
        var w = 600 * b.v / 14, r = s("rect", { x: 140, y: 24 + i * 70, height: 44, rx: 6, width: G.reduced ? w : 0, fill: b.hi ? area : ink2, opacity: b.hi ? 1 : 0.6 });
        setTimeout(function () { r.style.transition = "width 1.1s ease"; r.setAttribute("width", w); }, 100 + i * 150);
        return [s("text", { x: 130, y: 54 + i * 70, "text-anchor": "end", "font-size": 22, text: L(b.label) }), r, s("text", { x: 150 + w, y: 54 + i * 70, "font-size": 22, text: b.v + " %" })];
      });
      G.put(box, s("svg", { viewBox: "0 0 800 170", role: "img", "aria-label": e.bars.map(function (b) { return L(b.label) + " " + b.v + " %"; }).join(", ") }, rows));
    } else if (e.viz === "ring") {
      var C = 2 * Math.PI * 80, ring = s("circle", { cx: 120, cy: 120, r: 80, fill: "none", stroke: area, "stroke-width": 26, "stroke-dasharray": C, "stroke-dashoffset": G.reduced ? C * (1 - e.answer / 100) : C, transform: "rotate(-90 120 120)" });
      setTimeout(function () { ring.style.transition = "stroke-dashoffset 1.6s ease"; ring.setAttribute("stroke-dashoffset", C * (1 - e.answer / 100)); }, 80);
      G.put(box, s("svg", { viewBox: "0 0 240 240", style: "max-width:260px;margin:0 auto", role: "img", "aria-label": e.answer + " %" },
        s("circle", { cx: 120, cy: 120, r: 80, fill: "none", stroke: G.cssVar("--line"), "stroke-width": 26 }), ring,
        s("text", { x: 120, y: 132, "text-anchor": "middle", "font-size": 40, text: e.answer + " %" })));
    } else if (e.viz === "pair") {
      var nums = e.pair.map(function (p) { return { p: p, n: h("b", { class: "answer-big num" }, G.reduced ? String(p.v) : "0") }; });
      G.put(box, h("div", { class: "cols", style: { textAlign: "center" } }, nums.map(function (x) { return h("div", { class: "stack" }, h("span", null, x.n, h("span", { class: "answer-big" }, " %")), h("span", { class: "muted" }, L(x.p.label))); })));
      if (!G.reduced) { var t1 = performance.now(), raf2 = 0; (function tick(now) { var k = Math.min(1, (now - t1) / 1400); nums.forEach(function (x) { x.n.textContent = String(Math.round(x.p.v * (1 - Math.pow(1 - k, 3)))); }); if (k < 1) raf2 = requestAnimationFrame(tick); })(t1); G.onLeave(function () { cancelAnimationFrame(raf2); }); }
    }
  };
})();
