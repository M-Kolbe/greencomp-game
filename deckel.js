/* GreenComp Trails — the coaster (Bierdeckel): the marketing piece that brings people to the game.
 * It lies on a table in a pub, a club house or at a fair. Someone points a phone camera at the code and lands in the game.
 * One drawing serves everything: the app, the page after a scan and the print data. What people hold is what they see.
 * Round, 107 mm (the common size), drawn with 3 mm bleed on 113 x 113 mm; everything that matters stays 4 mm inside the cut.
 * Recognition comes from five things that never change: the ring «GreenComp erleben», dawn over the mountains with a question,
 * the yellow signpost «Play now» with a white-red-white tip, the white code field with the trail mark, and the area colour and sign. */
(function () {
  "use strict";
  var G = window.GCT, D = G.D, h = G.h, s = G.s, T = G.T, L = G.L, put = G.put, store = G.store;

  var SIZE = 113, C = 56.5, CUT = 53.5, SAFE = 49.5;
  /* Fixed colours: a printed coaster does not follow the dark mode of a screen. */
  var INK = "#13201a", SIGN = "#f6c600", BLAZE = "#c62f28", WHITE = "#ffffff";
  var AREA_HEX = { values: "#3b7633", complexity: "#1d6687", futures: "#6a4d99", acting: "#ad422c" };
  var F_TEXT = "'Atkinson Hyperlegible', Verdana, sans-serif", F_SIGN = "'Barlow Condensed', 'Arial Narrow', sans-serif";
  var uid = 0;

  G.coasterNo = function (c) { return D.competences.indexOf(c) + 1; };
  G.coasterComp = function (n) { return D.competences[n - 1] || null; };
  G.coasterLink = function (c) { return G.linkTo("d" + G.coasterNo(c)); };
  /* The address printed under the code, short enough to type. */
  G.coasterAddr = function () { return G.baseUrl().replace(/^https?:\/\//, "").replace(/index\.html$/, "").replace(/\/$/, ""); };

  function mix(a, b, t) {
    function p(x) { return [1, 3, 5].map(function (i) { return parseInt(x.slice(i, i + 2), 16); }); }
    var x = p(a), y = p(b);
    return "#" + x.map(function (v, i) { return Math.round(v + (y[i] - v) * t).toString(16).padStart(2, "0"); }).join("");
  }
  var cv = null;
  function width(str, weight, family, size) {
    cv = cv || document.createElement("canvas").getContext("2d");
    cv.font = weight + " 100px " + family;
    return cv.measureText(str).width / 100 * size;
  }
  /* Even lines (like text-wrap: balance): the narrowest width that keeps the same number of lines. */
  function wrap(str, weight, family, size, maxW) {
    function lines(w) {
      var out = [], cur = "";
      str.split(/\s+/).forEach(function (word) { var t = cur ? cur + " " + word : word; if (cur && width(t, weight, family, size) > w) { out.push(cur); cur = word; } else cur = t; });
      if (cur) out.push(cur);
      return out;
    }
    var best = lines(maxW), n = best.length, lo = maxW * 0.5, hi = maxW;
    for (var i = 0; i < 12; i++) { var mid = (lo + hi) / 2, l = lines(mid); if (l.length <= n) { hi = mid; best = l; } else lo = mid; }
    return best;
  }
  function fit(str, weight, family, size, maxW) { var w = width(str, weight, family, size); return w > maxW ? size * maxW / w : size; }
  function arcPath(id, r, bottom) {
    return bottom
      ? s("path", { id: id, d: "M " + (C - r) + " " + C + " A " + r + " " + r + " 0 0 0 " + (C + r) + " " + C, fill: "none" })
      : s("path", { id: id, d: "M " + (C - r) + " " + C + " A " + r + " " + r + " 0 0 1 " + (C + r) + " " + C, fill: "none" });
  }
  function ringText(id, text, r, bottom, fill, size) {
    return s("text", { "font-family": F_SIGN, "font-weight": 600, "font-size": size || 3.5, "letter-spacing": 0.95, fill: fill, "text-anchor": "middle" },
      s("textPath", { href: "#" + id, startOffset: "50%", text: text.toUpperCase() }));
  }
  /* The white-red-white trail mark, as painted on rocks along Swiss mountain paths. */
  function blaze(x, y, w, hgt, outline) {
    var st = hgt / 3;
    return s("g", null,
      s("rect", { x: x, y: y, width: w, height: hgt, rx: 0.5, fill: WHITE, stroke: outline || "none", "stroke-width": outline ? 0.3 : 0 }),
      s("rect", { x: x, y: y + st, width: w, height: st, fill: BLAZE }));
  }
  function areaSign(area, x, y, size, color) {
    var ic = G.icon("a-" + area, "");
    var path = ic.querySelector("path").getAttribute("d");
    return s("path", { d: path, transform: "translate(" + x + " " + y + ") scale(" + (size / 24) + ")", fill: "none", stroke: color, "stroke-width": 2.3, "stroke-linecap": "round", "stroke-linejoin": "round" });
  }

  /* The code: error correction H, so the trail mark in the middle may cover a few modules; quiet zone of four modules. */
  function qrGroup(text, x, y, size) {
    if (typeof window.qrcode !== "function") return s("text", { x: x + size / 2, y: y + size / 2, "text-anchor": "middle", "font-family": F_SIGN, "font-size": 3, fill: INK, text: text.replace(/^https?:\/\//, "") });
    var q = window.qrcode(0, "H"); q.addData(text); q.make();
    var n = q.getModuleCount(), m = size / (n + 8), ox = x + 4 * m, oy = y + 4 * m;
    var hole = Math.max(5, Math.round(n * 0.22)); if (hole % 2 === 0) hole++;
    var h0 = (n - hole) / 2;
    function finder(r, c) { return (r < 7 && c < 7) || (r < 7 && c >= n - 7) || (r >= n - 7 && c < 7); }
    var d = "";
    for (var r = 0; r < n; r++) {
      var run = -1;
      for (var c = 0; c <= n; c++) {
        var dark = c < n && q.isDark(r, c) && !finder(r, c) && !(r >= h0 && r < h0 + hole && c >= h0 && c < h0 + hole);
        if (dark && run < 0) run = c;
        if (!dark && run >= 0) { d += "M" + (ox + run * m).toFixed(3) + " " + (oy + r * m).toFixed(3) + "h" + ((c - run) * m).toFixed(3) + "v" + m.toFixed(3) + "h" + (-(c - run) * m).toFixed(3) + "z"; run = -1; }
      }
    }
    var g = s("g", { "shape-rendering": "crispEdges" }, s("path", { d: d, fill: INK }));
    [[0, 0], [0, n - 7], [n - 7, 0]].forEach(function (p) {
      var fx = ox + p[1] * m, fy = oy + p[0] * m;
      g.appendChild(s("path", { d: rr(fx, fy, 7 * m, 1.6 * m) + rr(fx + m, fy + m, 5 * m, 1 * m), fill: INK, "fill-rule": "evenodd" }));
      g.appendChild(s("rect", { x: fx + 2 * m, y: fy + 2 * m, width: 3 * m, height: 3 * m, rx: 0.7 * m, fill: INK }));
    });
    var lw = hole * m - 1.2 * m, lx = ox + h0 * m + 0.6 * m, ly = oy + h0 * m + 0.6 * m;
    g.appendChild(s("rect", { x: lx, y: ly, width: lw, height: lw, rx: 0.9, fill: WHITE }));
    g.appendChild(blaze(lx + lw * 0.14, ly + lw * 0.2, lw * 0.72, lw * 0.6, INK));
    return g;
  }
  function rr(x, y, w, r) { return "M" + (x + r) + " " + y + "h" + (w - 2 * r) + "a" + r + " " + r + " 0 0 1 " + r + " " + r + "v" + (w - 2 * r) + "a" + r + " " + r + " 0 0 1 " + (-r) + " " + r + "h" + (-(w - 2 * r)) + "a" + r + " " + r + " 0 0 1 " + (-r) + " " + (-r) + "v" + (-(w - 2 * r)) + "a" + r + " " + r + " 0 0 1 " + r + " " + (-r) + "z"; }

  /* opts.print: full 113 mm with bleed, for the print shop. opts.cut: show the cut line (proofs only).
   * Otherwise the coaster as people see it: cut to the round shape, with a hint of cardboard. */
  G.coaster = function (c, side, opts) {
    opts = opts || {};
    var id = "cst" + (++uid), area = c.area, col = AREA_HEX[area];
    var vb = opts.print ? "0 0 113 113" : (C - CUT) + " " + (C - CUT) + " " + (2 * CUT) + " " + (2 * CUT);
    var svg = s("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: vb, class: "coaster-svg", role: "img",
      "aria-label": side === "back" ? T("coasterBackLabel") : T("coasterFrontLabel", { q: L(c.question) }) });
    if (opts.print) { svg.setAttribute("width", "113mm"); svg.setAttribute("height", "113mm"); }
    var defs = s("defs", null, s("clipPath", { id: id + "-cut" }, s("circle", { cx: C, cy: C, r: CUT })),
      arcPath(id + "-top", 43, false), arcPath(id + "-bot", 46.6, true));
    svg.appendChild(defs);
    var art = s("g", opts.print ? null : { "clip-path": "url(#" + id + "-cut)" });
    svg.appendChild(art);

    if (side !== "back") {
      /* ---- front: dawn over the mountains and the question ---- */
      defs.appendChild(s("linearGradient", { id: id + "-sky", x1: 0, y1: 0, x2: 0, y2: 1 },
        s("stop", { offset: "0", "stop-color": "#152b3f" }), s("stop", { offset: "0.34", "stop-color": "#2d4a66" }),
        s("stop", { offset: "0.6", "stop-color": "#b9805f" }), s("stop", { offset: "0.74", "stop-color": "#efc895" })));
      defs.appendChild(s("radialGradient", { id: id + "-glow", cx: 0.53, cy: 0.58, r: 0.3 },
        s("stop", { offset: "0", "stop-color": "#fff1c9", "stop-opacity": "0.95" }), s("stop", { offset: "1", "stop-color": "#fff1c9", "stop-opacity": "0" })));
      art.appendChild(s("rect", { x: 0, y: 0, width: SIZE, height: SIZE, fill: "url(#" + id + "-sky)" }));
      art.appendChild(s("rect", { x: 0, y: 0, width: SIZE, height: SIZE, fill: "url(#" + id + "-glow)" }));
      [[24, 22], [31, 16.5], [83, 18], [90, 25], [18, 32], [96, 34]].forEach(function (p, i) { art.appendChild(s("circle", { cx: p[0], cy: p[1], r: i % 2 ? 0.32 : 0.45, fill: WHITE, opacity: 0.7 })); });
      art.appendChild(s("circle", { cx: 60, cy: 64.5, r: 6.2, fill: "#fff3d1" }));
      art.appendChild(s("path", { d: "M-2 74 L7 68 L15 71 L25 62.5 L33 67 L41 60.5 L49 66 L57 63.5 L65 68.5 L76 58.5 L86 66 L95 62 L105 68.5 L115 64.5 V115 H-2Z", fill: "#9cb0bf" }));
      art.appendChild(s("path", { d: "M76 58.5 L72.6 61.9 L74.6 61.5 L76 62.6 L77.7 61.4 L79.6 62 Z M41 60.5 L38.6 63 L40.2 62.7 L41.4 63.5 L42.8 62.6 Z", fill: WHITE, opacity: 0.9 }));
      art.appendChild(s("path", { d: "M-2 80 L9 74 L19 78 L30 71 L40 76.5 L48 72.5 L58 77 L68 70.5 L80 76.5 L90 72 L100 77 L115 73 V115 H-2Z", fill: mix("#5d7d84", col, 0.1) }));
      art.appendChild(s("path", { d: "M-2 86 C 14 80.5, 28 82, 40 85 S 70 80, 85 83 S 104 86.5, 115 82 V115 H-2Z", fill: mix(col, INK, 0.35) }));
      art.appendChild(s("path", { d: "M-2 93 C 18 88.5, 38 91.5, 56 89.5 S 94 88.5, 115 92.5 V115 H-2Z", fill: mix(col, INK, 0.72) }));
      /* the question, as large as it fits */
      var q = L(c.question), size, ls, SZ = [6.9, 6.3, 5.7, 5.1];
      if (!SZ.some(function (sz) { size = sz; ls = wrap(q, 700, F_TEXT, sz, 68); return ls.length <= 3; }))
        SZ.some(function (sz) { size = sz; ls = wrap(q, 700, F_TEXT, sz, 70); return ls.length <= 4; });
      var lh = size * 1.17, top = 44.5 - ls.length * lh / 2;
      art.appendChild(blaze(C - 4.6, top - 8.6, 9.2, 5.6));
      var qt = s("text", { "font-family": F_TEXT, "font-weight": 700, "font-size": size, fill: WHITE, "text-anchor": "middle" });
      ls.forEach(function (line, i) { qt.appendChild(s("tspan", { x: C, y: (top + size * 0.82 + i * lh).toFixed(2), text: line })); });
      art.appendChild(qt);
      /* which of the twelve: area sign and name on the hill */
      var label = c.no + " " + L(c.name).toUpperCase(), lsz = fit(label, 600, F_SIGN, 3.3, 58), lw = width(label, 600, F_SIGN, lsz) + label.length * 0.35;
      var gx = C - (lw + 5.4) / 2;
      art.appendChild(areaSign(area, gx, 91.6, 4.4, WHITE));
      art.appendChild(s("text", { x: gx + 5.6, y: 95.1, "font-family": F_SIGN, "font-weight": 600, "font-size": lsz, "letter-spacing": 0.35, fill: WHITE, text: label }));
      art.appendChild(s("circle", { cx: C, cy: C, r: 47.9, fill: "none", stroke: WHITE, "stroke-width": 0.3, opacity: 0.45 }));
      art.appendChild(ringText(id + "-top", T("appTitleRing"), 43, false, WHITE));
      art.appendChild(ringText(id + "-bot", T("coasterTurn"), 46.6, true, WHITE, 3.1));
    } else {
      /* ---- back: the signpost and the code ---- */
      defs.appendChild(s("radialGradient", { id: id + "-bg", cx: 0.5, cy: 0.4, r: 0.62 },
        s("stop", { offset: "0", "stop-color": "#22392d" }), s("stop", { offset: "1", "stop-color": "#0d1611" })));
      art.appendChild(s("rect", { x: 0, y: 0, width: SIZE, height: SIZE, fill: "url(#" + id + "-bg)" }));
      /* the same mountains as on the front, quietly, so both sides belong together */
      art.appendChild(s("path", { d: "M-2 98 L9 93 L19 96 L30 90.5 L40 94.5 L48 91.5 L58 95 L68 89.5 L80 94.5 L90 91 L100 95 L115 92 V115 H-2Z", fill: "#2a4535", opacity: 0.85 }));
      art.appendChild(s("circle", { cx: C, cy: C, r: 47.9, fill: "none", stroke: WHITE, "stroke-width": 0.3, opacity: 0.3 }));
      /* the yellow mountain-path sign with its white-red-white tip */
      var sy = 19.6, sh = 12, sx = 25.5, tipX = 75.5, tipEnd = 88.5;
      defs.appendChild(s("clipPath", { id: id + "-sign" }, s("path", { d: "M" + (sx + 1) + " " + sy + " H" + (tipEnd - 6) + " L" + tipEnd + " " + (sy + sh / 2) + " L" + (tipEnd - 6) + " " + (sy + sh) + " H" + (sx + 1) + " Q" + sx + " " + (sy + sh) + " " + sx + " " + (sy + sh - 1) + " V" + (sy + 1) + " Q" + sx + " " + sy + " " + (sx + 1) + " " + sy + " Z" })));
      var sign = s("g", { "clip-path": "url(#" + id + "-sign)" },
        s("rect", { x: sx, y: sy, width: tipEnd - sx, height: sh, fill: SIGN }),
        s("rect", { x: tipX, y: sy, width: tipEnd - tipX, height: sh, fill: WHITE }),
        s("rect", { x: tipX, y: sy + sh / 3, width: tipEnd - tipX, height: sh / 3, fill: BLAZE }));
      art.appendChild(sign);
      var go = T("coasterGo").toUpperCase(), mins = "5 MIN", msz = 3.6;
      var gsz = fit(go, 700, F_SIGN, 6.4, tipX - 2 - width(mins, 600, F_SIGN, msz) - 4 - (sx + 3));
      art.appendChild(s("text", { x: sx + 3, y: sy + sh / 2 + gsz * 0.35, "font-family": F_SIGN, "font-weight": 700, "font-size": gsz, "letter-spacing": 0.2, fill: INK, text: go }));
      art.appendChild(s("text", { x: tipX - 2, y: sy + sh / 2 + msz * 0.36, "font-family": F_SIGN, "font-weight": 600, "font-size": msz, fill: INK, "text-anchor": "end", text: mins }));
      /* the white field with the code */
      var px = 35, py = 34.6, ps = 43;
      art.appendChild(s("rect", { x: px, y: py, width: ps, height: ps, rx: 2.6, fill: WHITE }));
      art.appendChild(qrGroup(G.coasterLink(c), px, py, ps));
      var addr = G.coasterAddr(), asz = fit(addr, 600, F_SIGN, 4.4, 62);
      art.appendChild(s("text", { x: C, y: 83.4, "font-family": F_SIGN, "font-weight": 600, "font-size": asz, "letter-spacing": 0.25, fill: WHITE, "text-anchor": "middle", text: addr }));
      var hint = T("coasterHint");
      art.appendChild(s("text", { x: C, y: 89, "font-family": F_TEXT, "font-weight": 400, "font-size": fit(hint, 400, F_TEXT, 3, 54), fill: WHITE, opacity: 0.82, "text-anchor": "middle", text: hint }));
      art.appendChild(ringText(id + "-top", T("appTitleRing"), 43, false, SIGN));
      art.appendChild(ringText(id + "-bot", T("coasterFree"), 46.6, true, WHITE, 3.1));
    }
    if (!opts.print) {
      /* a hint of cardboard: the edge darkens a little, as on a real coaster */
      defs.appendChild(s("radialGradient", { id: id + "-edge", cx: 0.5, cy: 0.5, r: 0.5 },
        s("stop", { offset: "0.88", "stop-color": "#000", "stop-opacity": "0" }), s("stop", { offset: "1", "stop-color": "#000", "stop-opacity": "0.28" })));
      art.appendChild(s("circle", { cx: C, cy: C, r: CUT, fill: "url(#" + id + "-edge)" }));
    }
    if (opts.cut) {
      svg.appendChild(s("circle", { cx: C, cy: C, r: CUT, fill: "none", stroke: "#e6007e", "stroke-width": 0.25, "stroke-dasharray": "1.2 0.8" }));
      svg.appendChild(s("circle", { cx: C, cy: C, r: SAFE, fill: "none", stroke: "#00a0e6", "stroke-width": 0.2, "stroke-dasharray": "0.6 0.8" }));
    }
    return svg;
  };
  /* A coaster to flip: back first after a scan, front on the home page. */
  G.coasterFlip = function (c, startBack) {
    var btn = h("button", { type: "button", class: "coaster" + (startBack ? " flip" : ""), "aria-pressed": String(!!startBack) });
    var front = h("div", { class: "coaster-face" }), back = h("div", { class: "coaster-face coaster-back" });
    btn.append(front, back);
    function paint() { put(front, G.coaster(c, "front")); put(back, G.coaster(c, "back")); btn.setAttribute("aria-label", T("coasterLabel") + " " + L(c.question)); }
    btn.addEventListener("click", function () { var on = !btn.classList.contains("flip"); btn.classList.toggle("flip", on); btn.setAttribute("aria-pressed", String(on)); });
    paint();
    /* fonts decide the line breaks: draw again once they are there */
    if (document.fonts && document.fonts.status !== "loaded") document.fonts.ready.then(function () { if (btn.isConnected) paint(); });
    return { el: btn, set: function (nc) { c = nc; paint(); }, flip: function (on) { btn.classList.toggle("flip", !!on); btn.setAttribute("aria-pressed", String(!!on)); }, comp: function () { return c; } };
  };
  G.coasterSVGText = function (c, side) {
    var el = G.coaster(c, side, { print: true });
    return '<?xml version="1.0" encoding="UTF-8"?>\n<!-- GreenComp erleben · Bierdeckel ' + c.no + " " + side + " · rund 107 mm, Datenformat 113 x 113 mm (3 mm Beschnitt), Sicherheitsabstand 4 mm.\n     Schriften: Atkinson Hyperlegible, Barlow Condensed (SIL Open Font License). Vor dem Druck in Pfade wandeln oder einbetten. -->\n" + new XMLSerializer().serializeToString(el);
  };

  /* ---------- after a scan: the page for this coaster ---------- */
  G.pages.found = function (app, n) {
    var c = G.coasterComp(n);
    var got = store.get("coasters", {});
    if (!got[n]) { got[n] = new Date().toISOString(); store.set("coasters", got); }
    var count = Object.keys(got).length;
    if (count >= 3) setTimeout(function () { G.award("coasters"); }, 700);
    var flip = G.coasterFlip(c, true);
    /* the moment of recognition: the side just scanned, then the question */
    setTimeout(function () { if (flip.el.isConnected) flip.flip(false); }, G.reduced ? 0 : 900);
    var dots = h("div", { class: "found-dots", "aria-hidden": "true" }, D.competences.map(function (x, i) {
      return h("i", { class: got[i + 1] ? "got" : "", style: { "--fc": AREA_HEX[x.area] } });
    }));
    app.append(h("section", { class: "found" }, h("div", { class: "wrap found-grid" },
      h("div", { class: "found-coaster" }, flip.el, h("p", { class: "small found-turn" }, T("coasterTapTurn"))),
      h("div", { class: "found-text stack" },
        h("p", { class: "eyebrow" }, T("foundEyebrow", { n: n })),
        h("h1", null, T("foundT")),
        h("p", { class: "lead" }, T("foundLead")),
        h("button", { type: "button", class: "btn btn--sign btn--big found-play", onclick: function () { G.newGame("group", c.id, "five"); } }, "▶ " + T("foundPlay")),
        h("div", { class: "row" },
          h("button", { type: "button", class: "btn btn--small", onclick: function () { G.newGame("solo", c.id, "walk"); } }, T("foundAlone")),
          h("button", { type: "button", class: "btn btn--small", onclick: function () { G.newGame("group", c.id); } }, T("foundLong")),
          h("a", { class: "btn btn--small btn--ghost", href: "#k-" + c.id }, T("foundCard"))),
        h("details", { class: "panel found-what" }, h("summary", null, T("foundWhatQ")), h("p", null, T("foundWhat1")), h("p", null, T("foundWhat2")), h("p", { class: "small muted" }, T("coasterWho"))),
        h("div", { class: "found-collect" }, h("p", null, h("b", null, T("foundCount", { n: count }))), dots, h("p", { class: "small muted" }, T("foundPass"))),
        h("p", { class: "small muted" }, T("foundPrivacy"))))));
  };

  /* ---------- «The coaster»: the twelve, how they are recognised, print data ---------- */
  var showBack = false;
  G.pages.deckel = function (app) {
    var grid = h("div", { class: "coaster-grid" });
    var addr = G.coasterAddr(), own = !!store.get("baseUrl", "");
    function paint() {
      var pairs = D.competences.map(function (c) { return [G.coaster(c, "front"), G.coaster(c, "back")]; });
      put(grid, D.competences.map(function (c, i) {
        var face = pairs[i][showBack ? 1 : 0].cloneNode(true);
        var tile = h("div", { class: "coaster-tile" }, h("div", { class: "coaster-pic", tabindex: "0", role: "button", "aria-label": T("cardZoom", { name: c.no + " " + L(c.name) }), onclick: function () { G.viewCards(pairs, i, showBack, "coaster"); }, onkeydown: function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); G.viewCards(pairs, i, showBack, "coaster"); } } }, face),
          h("p", { class: "small" }, h("b", null, "#d" + (i + 1)), " · " + c.no + " " + L(c.name)),
          h("div", { class: "row" },
            h("button", { type: "button", class: "btn btn--small btn--ghost", onclick: function () { G.download("deckel-" + (i + 1) + "-vorne-" + G.lang + ".svg", G.coasterSVGText(c, "front"), "image/svg+xml"); } }, "SVG " + T("coasterFrontShort")),
            h("button", { type: "button", class: "btn btn--small btn--ghost", onclick: function () { G.download("deckel-" + (i + 1) + "-hinten-" + G.lang + ".svg", G.coasterSVGText(c, "back"), "image/svg+xml"); } }, "SVG " + T("coasterBackShort"))));
        return tile;
      }));
      flipBtn.textContent = "↻ " + (showBack ? T("showFronts") : T("showBacks"));
    }
    var flipBtn = h("button", { type: "button", class: "btn btn--small", onclick: function () { showBack = !showBack; paint(); } });
    var mode = "press", sides = "both";
    var modeBox = h("div"), sideBox = h("div");
    function chipsOf(items, cur, set) { return h("div", { class: "chips", role: "radiogroup" }, items.map(function (it) { return h("button", { type: "button", class: "chip", role: "radio", "aria-checked": String(it[0] === cur), onclick: function () { set(it[0]); } }, it[1]); })); }
    function paintOpts() {
      put(modeBox, chipsOf([["press", T("cpPress")], ["proof", T("cpProof")]], mode, function (v) { mode = v; paintOpts(); }));
      put(sideBox, chipsOf([["both", T("cpBoth")], ["front", T("coasterFrontShort")], ["back", T("coasterBackShort")]], sides, function (v) { sides = v; paintOpts(); }));
    }
    paintOpts();
    function printNow() {
      var box = h("div", { class: "cprint " + (mode === "proof" ? "is-proof" : "is-press") });
      D.competences.forEach(function (c) {
        ["front", "back"].forEach(function (sd) {
          if (sides !== "both" && sides !== sd) return;
          box.appendChild(h("div", { class: "cprint-page" }, G.coaster(c, sd, { print: true, cut: mode === "proof" })));
        });
      });
      document.body.appendChild(box); document.body.classList.add("printing-coasters");
      function done() { box.remove(); document.body.classList.remove("printing-coasters"); window.removeEventListener("afterprint", done); }
      window.addEventListener("afterprint", done);
      setTimeout(function () { window.print(); }, 60);
    }
    paint();
    app.append(
      h("section", { class: "wrap page-head" }, h("p", { class: "eyebrow" }, T("coasterEyebrow")), h("h1", null, T("coasterTitle")), h("p", { class: "lead" }, T("coasterLead"))),
      h("section", { class: "wrap stack coaster-page", style: { paddingBottom: "48px", gap: "22px" } },
        h("div", { class: "panel coaster-rules" }, h("h2", null, T("crT")),
          h("ol", { class: "rules3" }, ["cr1", "cr2", "cr3", "cr4", "cr5"].map(function (k) { return h("li", null, T(k)); })),
          h("p", { class: "small muted" }, T("crWhy"))),
        h("div", { class: "row" }, flipBtn, h("span", { class: "small muted" }, T("zoomHint"))),
        grid,
        h("div", { class: "panel stack" }, h("h2", null, T("cpT")),
          own ? h("p", { class: "note" }, T("cpAddr", { a: addr })) : h("p", { class: "note warn" }, T("cpAddrMissing", { a: addr }), " ", h("a", { href: "#werkstatt" }, T("wsTitle"))),
          addr.length > 26 ? h("p", { class: "note warn" }, T("cpAddrLong")) : null,
          h("p", { class: "small" }, h("b", null, T("cpMode"))), modeBox,
          h("p", { class: "small" }, h("b", null, T("cpSides"))), sideBox,
          h("div", { class: "row" }, h("button", { type: "button", class: "btn btn--sign btn--big", onclick: printNow }, "🖨 " + T("cpPrint"))),
          h("p", { class: "small muted" }, T("cpHow"))),
        h("div", { class: "panel" }, h("h2", null, T("csT")),
          h("div", { class: "tbl-wrap" }, h("table", { class: "plan-table spec-table" }, h("tbody", null, ["cs1", "cs2", "cs3", "cs4", "cs5", "cs6", "cs7"].map(function (k) { var v = T(k).split(" | "); return h("tr", null, h("th", null, v[0]), h("td", null, v[1])); }))))),
        h("div", { class: "panel" }, h("h2", null, T("ckT")), h("ul", { class: "checklist" }, ["ck1", "ck2", "ck3", "ck4", "ck5"].map(function (k) { return h("li", null, T(k)); }))),
        h("div", { class: "panel" }, h("h2", null, T("cwT")), h("ul", null, ["cw1", "cw2", "cw3", "cw4"].map(function (k) { return h("li", null, T(k)); })))));
  };
})();
