/* GreenComp Trails — pages: home, competence, station, my way, guide, measure, workshop. */
(function () {
  "use strict";
  var G = window.GCT, D = G.D, A = G.A, h = G.h, s = G.s, T = G.T, L = G.L, put = G.put, store = G.store;

  /* What GreenComp is, what the game wants, what you take home, who it is for. */
  function greencompUrl() { return "https://joint-research-centre.ec.europa.eu/greencomp-european-sustainability-competence-framework_" + (G.lang === "de" ? "de" : "en"); }
  /* accordion: one row per question, opened by a tap (the start page); otherwise four tiles (the guide). */
  G.aboutTiles = function (accordion) {
    var src = h("p", { class: "small muted" }, L(D.about.source) + " ", h("a", { href: greencompUrl(), target: "_blank", rel: "noopener" }, T("aboutMore")));
    if (accordion) return h("div", { class: "stack about about-acc" },
      D.about.items.map(function (x) { return h("details", { class: "panel about-item" }, h("summary", null, h("span", { class: "tile-ico" }, G.icon(x.icon)), h("b", null, L(x.t))), h("p", null, L(x.d))); }),
      src);
    return h("div", { class: "stack about" },
      h("div", { class: "icon-grid" }, D.about.items.map(function (x) { return h("div", { class: "icon-tile" }, h("span", { class: "tile-ico" }, G.icon(x.icon)), h("h4", null, L(x.t)), h("p", null, L(x.d))); })),
      h("p", { class: "small muted" }, L(D.about.source) + " ", h("a", { href: greencompUrl(), target: "_blank", rel: "noopener" }, T("aboutMore"))));
  };

  /* ================= hero landscape (generative, theme-aware) ================= */
  function heroLandscape(cv) {
    var seed = 7, ridges = [];
    function rnd(i) { var x = Math.sin((i + seed) * 9301 + 49297) * 233280; return x - Math.floor(x); }
    for (var r = 0; r < 5; r++) {
      var waves = []; for (var w = 0; w < 4; w++) waves.push({ f: 1 + rnd(r * 10 + w) * 4 * (w + 1), a: (0.06 + rnd(r * 20 + w) * 0.08) / (w + 1), p: rnd(r * 30 + w) * 6 });
      ridges.push({ base: 0.42 + r * 0.12, waves: waves, depth: (r + 1) / 5 });
    }
    var birds = []; for (var b = 0; b < 6; b++) birds.push({ x: rnd(b + 100), y: 0.18 + rnd(b + 110) * 0.16, v: 0.006 + rnd(b + 120) * 0.006, ph: rnd(b + 130) * 6 });
    var stars = []; for (var st = 0; st < 90; st++) stars.push([rnd(st + 300), rnd(st + 400) * 0.55, rnd(st + 500)]);
    var px = 0, tx = 0, raf = 0, t0 = performance.now(), visible = true;
    function col(name) { return G.cssVar(name, cv); }
    function draw() {
      var dpr = window.devicePixelRatio || 1, W = cv.clientWidth * dpr, H = cv.clientHeight * dpr;
      if (cv.width !== W || cv.height !== H) { cv.width = W; cv.height = H; }
      var x = cv.getContext("2d"), t = (performance.now() - t0) / 1000, night = col("--hero-night") === "1";
      px += (tx - px) * 0.05;
      var g = x.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, col("--hero-sky-1")); g.addColorStop(0.62, col("--hero-sky-2")); g.addColorStop(1, col("--hero-sky-3"));
      x.fillStyle = g; x.fillRect(0, 0, W, H);
      if (night) stars.forEach(function (s2) { x.fillStyle = "rgba(255,255,255," + (0.35 + 0.5 * Math.abs(Math.sin(t * 0.6 + s2[2] * 9))) + ")"; x.fillRect(s2[0] * W, s2[1] * H, 1.6 * dpr, 1.6 * dpr); });
      var sx = W * 0.72 + px * W * 0.01, sy = H * (0.36 + 0.015 * Math.sin(t * 0.15)), sr = Math.min(W, H) * 0.07;
      var glow = x.createRadialGradient(sx, sy, sr * 0.3, sx, sy, sr * 4);
      glow.addColorStop(0, col("--hero-sun-glow")); glow.addColorStop(1, "rgba(0,0,0,0)");
      x.fillStyle = glow; x.fillRect(0, 0, W, H);
      x.fillStyle = col("--hero-sun"); x.beginPath(); x.arc(sx, sy, sr, 0, 7); x.fill();
      for (var c = 0; c < 3; c++) { x.fillStyle = "rgba(255,255,255," + (night ? 0.04 : 0.18) + ")"; var cx = ((t * 0.008 * (c + 1) + c * 0.37) % 1.3 - 0.15) * W; x.beginPath(); x.ellipse(cx, H * (0.2 + c * 0.07), W * 0.12, H * 0.025, 0, 0, 7); x.fill(); }
      ridges.forEach(function (rg, i) {
        x.fillStyle = col("--hero-m" + (i + 1));
        x.beginPath(); x.moveTo(0, H);
        for (var k = 0; k <= 80; k++) {
          var u = k / 80, y = rg.base;
          rg.waves.forEach(function (wv) { y -= Math.abs(Math.sin(u * wv.f + wv.p + px * 0.02 * rg.depth)) * wv.a; });
          x.lineTo(u * W + px * rg.depth * 18 * dpr, y * H);
        }
        x.lineTo(W + 40 * dpr, H); x.closePath(); x.fill();
        if (i === 0) { x.fillStyle = "rgba(255,255,255," + (night ? 0.18 : 0.55) + ")"; }
      });
      x.strokeStyle = col("--hero-bird"); x.lineWidth = 1.6 * dpr;
      birds.forEach(function (bd) {
        var bx = ((bd.x + t * bd.v) % 1.2 - 0.1) * W, by = bd.y * H + Math.sin(t * 0.8 + bd.ph) * 6 * dpr, fl = Math.sin(t * 6 + bd.ph) * 3 * dpr;
        x.beginPath(); x.moveTo(bx - 7 * dpr, by - fl); x.quadraticCurveTo(bx - 3 * dpr, by - 3 * dpr, bx, by); x.quadraticCurveTo(bx + 3 * dpr, by - 3 * dpr, bx + 7 * dpr, by - fl); x.stroke();
      });
      if (!G.reduced && visible && cv.isConnected) raf = requestAnimationFrame(draw);
    }
    function onMove(e) { var r = cv.getBoundingClientRect(); tx = ((e.clientX - r.left) / Math.max(1, r.width) - 0.5) * 2; }
    window.addEventListener("pointermove", onMove);
    var io = null;
    if ("IntersectionObserver" in window) { io = new IntersectionObserver(function (en) { visible = en[0].isIntersecting; if (visible && !G.reduced) { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); } }); io.observe(cv); }
    var mq = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
    function redraw() { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); }
    if (mq && mq.addEventListener) mq.addEventListener("change", redraw);
    raf = requestAnimationFrame(draw);
    G.onLeave(function () { cancelAnimationFrame(raf); window.removeEventListener("pointermove", onMove); if (io) io.disconnect(); if (mq && mq.removeEventListener) mq.removeEventListener("change", redraw); });
  }

  /* ================= home ================= */
  G.drawnId = G.pick(D.competences).id;
  var coasterId = "promoting-nature";
  /* Birds at the start (see app.js): on or off, remembered on this device. */
  function birdsToggle() {
    var b = h("button", { type: "button", class: "birds-toggle", title: T("birdsHint") });
    function paint() { var on = store.get("birdsStart", true); b.setAttribute("aria-pressed", String(on)); put(b, (on ? "🔊 " : "🔈 ") + T(on ? "birdsOn" : "birdsOff")); }
    b.addEventListener("click", function () { var on = !store.get("birdsStart", true); store.set("birdsStart", on); if (!on && window.GCTAudio) window.GCTAudio.stopAll(); paint(); });
    paint();
    return b;
  }
  G.pages.home = function (app) {
    var cc = G.COMP[coasterId], going = G.gameInProgress();
    function quick(who, icon, title, sub) {
      return h("button", { type: "button", class: "quick-who", onclick: function () { G.newGame(who); } }, G.icon(icon, "quick-ico"), h("b", null, title), h("span", null, sub));
    }
    /* Who plays? Three answers, always in sight. Below them the shortcut for a first try. */
    var playBox = h("div", { class: "hero-play", role: "group", "aria-labelledby": "hero-play-t" },
      h("h2", { id: "hero-play-t", class: "hero-play-t" }, h("span", { class: "hero-play-dot", "aria-hidden": "true" }, G.icon("play")), T("playNowBig"), h("small", null, T("wWhoT"))),
      going ? h("a", { class: "btn btn--sign hero-continue", href: "#spielen" }, "▶ " + T("continueGame", going)) : null,
      h("div", { class: "quick-whos" },
        quick("solo", "walk", T("whoSolo"), T("whoSoloSub")),
        quick("group", "table", T("whoGroup"), T("whoGroupSub")),
        quick("room", "board", T("whoRoom"), T("whoRoomSub"))),
      h("div", { class: "hero-more" },
        h("a", { class: "hero-go", href: "#los" }, G.icon("compass", "quick-ico"), h("b", null, T("goOne", { n: G.gameMinutes("one") })), h("span", null, T("goOneSub")))),
      h("p", { class: "small hero-play-hint" }, T("heroPlayHint"), " · ", h("a", { href: "#anleitung" }, T("howToPlay")), " · ", birdsToggle()));

    /* the same coaster that lies on the tables: front with the question, back with the signpost and the code */
    var flipC = G.coasterFlip(cc, false), coaster = flipC.el;
    var flickMsg = h("p", { class: "small hero-note", "aria-live": "polite" });
    var flick = h("button", { type: "button", class: "btn btn--small btn--glass", onclick: function () {
      coaster.classList.remove("flick"); void coaster.offsetWidth; if (!G.reduced) coaster.classList.add("flick");
      coasterId = G.pick(D.competences.filter(function (x) { return x.id !== coasterId; })).id;
      setTimeout(function () { flipC.set(G.COMP[coasterId]); }, G.reduced ? 0 : 450);
      flickMsg.textContent = T("flickHint");
    } }, "✋ " + T("flick"));

    var cv = h("canvas", { class: "hero-canvas", "aria-hidden": "true" });
    var walks = Object.keys(store.get("walks", {})).length, have = G.badges(), nFinds = Object.keys(have).length;
    function tile(cls, href, icon, title, text, extra) {
      return h("a", { class: "tile " + (cls || ""), href: href }, h("span", { class: "tile-ico" }, G.icon(icon)), h("h3", null, title), h("p", null, text), extra || null, h("span", { class: "tile-go", "aria-hidden": "true" }, "→"));
    }
    var ring = s("svg", { class: "ring", viewBox: "0 0 44 44", "aria-hidden": "true" }, s("circle", { cx: 22, cy: 22, r: 18, class: "ring-bg" }), s("circle", { cx: 22, cy: 22, r: 18, class: "ring-fg", "stroke-dasharray": (113 * walks / 12) + " 113" }));

    G.add(app, [
      h("section", { class: "hero-band" }, cv,
        h("div", { class: "wrap hero" },
          h("div", { class: "hero-text" },
            h("p", { class: "eyebrow hero-eyebrow" }, T("heroEyebrow")),
            h("h1", null, T("heroTitle")),
            h("p", { class: "lead" }, T("heroLead2")),
            playBox),
          h("div", { class: "coaster-wrap" }, coaster, flick, flickMsg))),
      h("section", { class: "wrap", style: { paddingBlock: "28px 8px" } },
        h("div", { class: "section-head" }, h("h2", null, T("aboutT"))), G.aboutTiles(true),
        /* a fact in plain sight, not folded away */
        (D.facts || []).length ? h("div", { style: { marginTop: "18px" } }, G.factItem(null, true)) : null),
      h("section", { class: "wrap", style: { paddingBlock: "20px 44px" } },
        h("div", { class: "bento" },
          tile("tile--hero tile--facts", "#fakten", "spark", T("tileFactsT"), T("tileFactsP", { n: (D.facts || []).length }), h("span", { class: "tile-tags" }, h("i", null, T("factWow")), h("i", null, T("factThink")), h("i", null, T("factSource")))),
          tile("tile--way", "#spuren", "way", T("tileWayT"), T("tileWayP", { n: walks }), ring),
          tile("", "#anleitung", "guide", T("tileGuideT"), T("tileGuideP")),
          tile("", "#schaetzen", "target", T("tileTrainT"), T("tileTrainP")),
          tile("", "#set", "set", T("tileSetT", { n: G.setCount() }), T("tileSetP")),
          tile("tile--joker", "#joker", "joker", T("tileJokerT"), T("tileJokerP")),
          (function () { var t = tile("tile--wide tile--wide3", "#spielen", "globe", T("tileR0T"), T("tileR0P")); t.addEventListener("click", function (ev) { ev.preventDefault(); G.newOriginal(); }); return t; })(),
          tile("tile--finds", "#spuren", "crown", T("tileFindsT"), T("findsCount", { n: nFinds, m: D.badges.length }),
            h("span", { class: "mini-finds" }, D.badges.slice(0, 8).map(function (b) { return h("i", { class: have[b.id] ? "got" : "", style: { "--fc": "var(" + b.color + ")" } }); }))))),
      h("section", { class: "band" }, h("div", { class: "wrap" },
        h("div", { class: "section-head" }, h("h2", null, T("mapTitle")), h("p", { class: "muted" }, T("mapSub"))),
        trailMap())),
      h("section", { class: "wrap", style: { paddingBlock: "36px 40px" } },
        h("details", { class: "panel" }, h("summary", null, h("b", null, T("nciTitle")), " ", h("span", { class: "muted" }, T("nciSub"))), G.nciForm(false)))]);
    heroLandscape(cv);
  };

  function trailMap() {
    return h("div", { class: "posts" }, D.areas.map(function (a) {
      var comps = D.competences.filter(function (c) { return c.area === a.id; });
      return h("div", { class: "post", style: { "--area": G.areaVar(a) } },
        h("a", { class: "post-head", href: "#station-" + a.id }, h("span", { class: "post-sym" }, G.areaSym(a)), L(a.name)),
        comps.map(function (c) { return h("a", { class: "sign", href: "#k-" + c.id }, h("span", null, L(c.name))); }));
    }));
  }

  /* ================= competence page ================= */
  G.pages.comp = function (app, id) {
    var c = G.COMP[id], a = G.AREA[c.area];
    var idx = D.competences.indexOf(c);
    var prev = D.competences[(idx + 11) % 12], next = D.competences[(idx + 1) % 12];
    var textSec = h("section", { class: "wrap textdoor", id: "text", hidden: true });
    function openText() { textSec.hidden = false; put(textSec, textDoor(c)); textSec.scrollIntoView({ behavior: G.reduced ? "auto" : "smooth" }); var h2 = G.$("h2", textSec); if (h2) { h2.setAttribute("tabindex", "-1"); h2.focus({ preventScroll: true }); } }
    function door(cls, ic, title, sub, fn, href, extra) {
      var kids = [G.icon(ic), h("b", null, title), h("span", null, sub), extra || null];
      return href ? h("a", { class: "door " + cls, href: href }, kids) : fn ? h("button", { type: "button", class: "door " + cls, onclick: fn }, kids) : h("div", { class: "door " + cls }, kids);
    }
    var pieceBtns = h("div", { class: "piece-btns" }, ["sound", "voice", "picture"].map(function (k) {
      return h("button", { type: "button", class: "piece-btn" + (k === c.piece ? " is-card" : ""), onclick: function () { G.openWindow(id, k); } }, G.icon(k), h("span", null, T(k === "sound" ? "pSound" : k === "voice" ? "pVoice" : "pPicture")));
    }));
    app.append(
      h("nav", { class: "wrap crumbs", "aria-label": "Breadcrumb" }, h("a", { href: "#" }, T("home")), "›", h("a", { href: "#station-" + a.id, style: { color: G.areaVar(a) } }, G.areaSym(a, "eyebrow-sym"), L(a.name)), "›", h("span", { "aria-current": "page" }, L(c.name))),
      h("section", { class: "wrap comp-layout" },
        G.compCard(c, { big: true, flippable: true }),
        h("div", { class: "stack" },
          h("div", { class: "doors" },
            door("door--play", "play", T("doorPlay"), T("doorPlaySub"), function () { G.newGame(null, id); }),
            door("door--window", "window", T("doorWindow"), T("doorWindowSub"), null, null, pieceBtns),
            door("", "walk", T("doorWalk"), T("doorWalkSub"), function () { G.openWalk(id); }),
            door("", "board", T("doorBoard"), T("doorBoardSub"), null, "#tafel"),
            door("", "text", T("doorText"), T("doorTextSub"), openText)),
          h("button", { type: "button", class: "big-choice big-choice--sign", onclick: function () { G.openFive(id); } }, G.icon("table"), h("b", null, T("fiveTable")), h("span", null, T("fiveTableSub"))),
          G.factsFor(id).length ? (function () {
            /* three to start with, the rest one tap away */
            var mine = G.factsFor(id).slice().sort(function () { return Math.random() - 0.5; });
            return h("div", { class: "panel fact-panel" }, h("h3", null, G.icon("spark", "fact-ico"), T("factsForCard")),
              mine.slice(0, 3).map(function (f) { return G.factBox(f, { actions: true }); }),
              h("div", { class: "row" },
                mine.length > 3 ? h("a", { class: "btn btn--small", href: "#fakten-" + id }, T("factsCard", { n: mine.length }) + " →") : null,
                h("a", { class: "btn btn--small btn--ghost", href: "#fakten" }, T("factsAll", { n: D.facts.length }) + " →")));
          })() : null,
          h("div", { class: "pager" }, h("a", { class: "btn btn--small", href: "#k-" + prev.id }, "← " + L(prev.name)), h("a", { class: "btn btn--small", href: "#k-" + next.id }, L(next.name) + " →")))),
      textSec);
  };

  function textDoor(c) {
    var a = G.AREA[c.area], es = G.estsFor(c.id), gaps = D.estimateGaps.filter(function (g) { return g.comp === c.id; }).length;
    return h("article", null,
      h("header", { class: "stack" }, h("p", { class: "eyebrow" }, L(a.name) + " · " + c.no), h("h2", null, L(c.name))),
      h("dl", null,
        h("dt", null, T("tComp")), h("dd", null, h("b", null, L(c.question))),
        h("dt", null, T("plainT")), h("dd", null, L(c.plain)),
        h("dt", null, G.taskLabel(c)), h("dd", null, G.taskSteps(c, false)),
        h("dt", null, T("accessForm")), h("dd", null, L(c.access)),
        h("dt", null, T("soloForm")), h("dd", null, L(c.solo))),
      ["sound", "voice", "picture"].map(function (k) {
        return h("section", null, h("h3", null, T("windowT") + " · " + T(k === "sound" ? "pSound" : k === "voice" ? "pVoice" : "pPicture") + (k === c.piece ? " (" + T("onCard") + ")" : "")), G.pieceTranscript(c, k));
      }),
      h("section", null, h("h3", null, T("tTalk")), h("ol", null, c.talk.map(function (q) { return h("li", null, L(q)); })), h("p", { class: "muted" }, T("askerFirst") + " " + T("photoIdea") + ": " + L(c.photo) + ".")),
      h("section", null, h("h3", null, T("estimatesT")),
        es.map(function (e) { return h("details", null, h("summary", null, (e.type === "number" ? T("estimateNum") : T("estimateTF")) + " " + L(e.q)), h("p", null, h("b", null, T("answerLeader") + ": "), L(e.detail), " (" + T("source") + ": " + e.source + ")")); }),
        gaps ? h("p", { class: "muted" }, T("openGaps", { n: gaps })) : null),
      h("section", null, h("h3", null, T("definition")), h("p", { lang: "en" }, h("i", null, c.definition))),
      h("section", null, h("h3", null, T("tTrail")), h("ul", null, D.trails.map(function (t) { return h("li", null, h("b", null, L(t.name) + " «" + L(t.motto) + "» "), L(t.change)); }))));
  }

  /* ================= station page ================= */
  G.pages.station = function (app, id) {
    var a = G.AREA[id], comps = D.competences.filter(function (c) { return c.area === id; });
    app.append(
      h("section", { class: "wrap page-head", style: { "--area": G.areaVar(a) } }, h("p", { class: "eyebrow area-eyebrow" }, G.areaSym(a, "eyebrow-sym"), T("tArea")), h("h1", null, L(a.name)), h("p", { class: "lead" }, L(a.teaser))),
      h("section", { class: "wrap cols", style: { paddingBottom: "40px" } },
        h("div", { class: "panel" }, h("h3", null, T("stationSound")), G.soundPanel(a)),
        (D.facts || []).length ? G.factItem(G.pick(comps).id, true) : null,
        h("div", { class: "panel" }, h("h3", null, T("cardsHere")), h("div", { class: "post", style: { "--area": G.areaVar(a) } }, comps.map(function (c) { return h("a", { class: "sign", href: "#k-" + c.id }, h("span", null, L(c.name))); })))));
  };

  /* ================= facts to marvel at and think about: #fakten, #fakten-<skill>, #fakt-<id> =================
   * Open on their own, for people who scan a code and want to be inspired without playing. */
  G.pages.fakten = function (app, sel) {
    sel = sel || {};
    var all = D.facts || [], kind = "all", area = "all", comp = sel.comp || null;
    var featured = (sel.fact && all.find(function (f) { return f.id === sel.fact; })) || G.pick(comp ? G.factsFor(comp) : all);
    function shown() { return all.filter(function (f) { var c = G.COMP[f.comp]; return (kind === "all" || f.kind === kind) && (area === "all" || c.area === area) && (!comp || f.comp === comp); }); }
    var feat = h("div", { class: "fact-feature", "aria-live": "polite" }), list = h("div", { class: "fact-list" }), count = h("p", { class: "small muted" }), filters = h("div", { class: "stack" });
    function paintFeat() { put(feat, G.factBox(featured, { big: true, actions: true, read: true, card: true })); }
    function another() {
      var pool = shown().filter(function (f) { return f.id !== featured.id; });
      if (!pool.length) pool = all.filter(function (f) { return f.id !== featured.id; });
      featured = G.pick(pool); paintFeat();
    }
    function chip(on, label, fn, style) { return h("button", { type: "button", class: "chip", "aria-pressed": String(on), style: style || null, onclick: fn }, label); }
    function paintFilters() {
      put(filters,
        h("div", { class: "chips", role: "group", "aria-label": T("factsKindLabel") },
          [["all", T("factsKindAll")], ["wow", "✦ " + T("factWow")], ["think", "✦ " + T("factThink")]].map(function (k) { return chip(kind === k[0], k[1], function () { kind = k[0]; paintAll(); }); })),
        h("div", { class: "chips", role: "group", "aria-label": T("factsAreaLabel") },
          chip(area === "all" && !comp, T("factsAreaAll"), function () { area = "all"; comp = null; paintAll(); }),
          D.areas.map(function (a) { return chip(area === a.id && !comp, L(a.name), function () { area = a.id; comp = null; paintAll(); }, { borderColor: G.areaVar(a) }); }),
          comp ? chip(true, G.COMP[comp].no + " " + L(G.COMP[comp].name) + " ✕", function () { comp = null; paintAll(); }) : null));
    }
    function paintList() {
      var fs = shown();
      count.textContent = T("factsShown", { n: fs.length, m: all.length });
      put(list, D.competences.map(function (c) {
        var mine = fs.filter(function (f) { return f.comp === c.id; });
        if (!mine.length) return null;
        return h("section", { class: "fact-sec", style: { "--area": G.areaVar(G.AREA[c.area]) } },
          h("h2", null, G.areaSym(c.area, "eyebrow-sym"), c.no + " " + L(c.name)),
          h("div", { class: "fact-grid" }, mine.map(function (f) { return G.factBox(f, { actions: true, anchor: true }); })),
          h("a", { class: "btn btn--small btn--ghost", href: "#k-" + c.id }, T("factToCard") + ": " + L(c.name) + " →"));
      }));
    }
    function paintAll() { paintFilters(); paintList(); }
    paintFeat(); paintAll();
    app.append(
      h("section", { class: "wrap page-head" }, h("p", { class: "eyebrow" }, T("factsEyebrow")), h("h1", null, T("factsT")), h("p", { class: "lead" }, T("factsLead", { n: all.length }))),
      h("section", { class: "wrap stack", style: { paddingBottom: "24px" } }, feat,
        h("div", { class: "row" }, h("button", { type: "button", class: "btn btn--sign", onclick: another }, "↻ " + T("factMore")))),
      h("section", { class: "wrap stack", style: { paddingBottom: "48px" } }, filters, count, list,
        h("div", { class: "panel fact-play" }, h("h3", null, T("factsPlayT")), h("p", null, T("factsPlayP")),
          h("div", { class: "row" }, h("a", { class: "btn btn--sign", href: "#spielen" }, "▶ " + T("playNowBig")), h("a", { class: "btn", href: "#set" }, T("navCards"))))));
  };

  /* ================= my way (Mein Weg) ================= */
  var WAY = [[70, 388], [180, 362], [292, 374], [384, 334], [304, 292], [424, 262], [544, 282], [626, 236], [566, 190], [684, 160], [792, 142], [880, 96]];
  function wayMap(walks) {
    var nextIdx = D.competences.findIndex(function (c) { return !walks[c.id]; });
    var path = "M" + WAY.map(function (p) { return p[0] + " " + p[1]; }).join(" L") + " L930 58";
    var trees = []; for (var i = 0; i < 18; i++) { var tx = 20 + i * 56 + (i % 3) * 9, ty = 410 - (i % 2) * 8; trees.push(s("path", { d: "M" + tx + " " + ty + "l12-34 12 34z", class: "way-tree" })); }
    var marks = D.competences.map(function (c, i) {
      var p = WAY[i], done = !!walks[c.id], isNext = i === nextIdx, area = G.areaVar(G.AREA[c.area]);
      return s("a", { href: "#walk-" + c.id, class: "way-pt" + (done ? " done" : "") + (isNext ? " next" : ""), "aria-label": T("week", { n: i + 1 }) + ": " + L(c.name) + (done ? " · " + T("walkedOn", { d: G.fmtDate(walks[c.id]) }) : "") },
        s("title", { text: T("week", { n: i + 1 }) + ": " + L(c.name) }),
        isNext ? s("circle", { cx: p[0], cy: p[1], r: 30, class: "way-pulse" }) : null,
        s("circle", { cx: p[0], cy: p[1], r: 22, class: "way-dot", style: "--wc:" + area }),
        done ? s("path", { d: "M" + (p[0] - 9) + " " + p[1] + "l6 6 12-13", class: "way-check" }) : s("text", { x: p[0], y: p[1] + 7, "text-anchor": "middle", class: "way-n", text: String(i + 1) }));
    });
    return s("svg", { class: "way-map", viewBox: "0 0 1000 430", role: "group", "aria-label": T("wayMapLabel") },
      s("rect", { width: 1000, height: 430, class: "way-sky" }),
      s("circle", { cx: 150, cy: 80, r: 34, class: "way-sun" }),
      s("path", { d: "M0 430L180 250 300 330 470 150 600 260 760 90 930 40 1000 120V430Z", class: "way-m1" }),
      s("path", { d: "M886 53L930 40 966 81 950 74 938 86 922 70 904 78Z", class: "way-snow" }),
      s("path", { d: "M0 430L120 330 260 380 420 290 560 350 700 270 860 330 1000 280V430Z", class: "way-m2" }),
      trees,
      s("path", { d: path, class: "way-path" }),
      s("g", { class: "way-flag" }, s("path", { d: "M930 58V14" }), s("path", { d: "M930 14h30l-8 9 8 9h-30z", class: "way-flag-cloth" })),
      s("text", { x: 920, y: 30, "text-anchor": "end", class: "way-label", text: T("summit") }),
      marks);
  }
  G.pages.spuren = function (app) {
    var walks = store.get("walks", {}), have = G.badges();
    var nWalks = Object.keys(walks).length, nFinds = Object.keys(have).length;
    var next = D.competences.find(function (c) { return !walks[c.id]; });
    var plist = h("div", { class: "stack" });
    function paintPromises() {
      var list = store.get("promises", []);
      if (!list.length) { put(plist, h("p", { class: "muted" }, T("promisesEmpty"))); return; }
      put(plist, list.map(function (p) {
        var days = Math.floor((Date.now() - new Date(p.date).getTime()) / 86400000), due = days >= 7;
        function setKept(v) { var l = store.get("promises", []); l.forEach(function (x) { if (x.id === p.id) x.kept = v; }); store.set("promises", l); if (v === "yes") G.award("kept"); paintPromises(); }
        return h("div", { class: "promise-card" },
          h("p", { class: "card-q", style: { fontSize: "1.2rem" } }, p.text),
          h("p", { class: "small muted" }, T("writtenOn", { d: G.fmtDate(p.date) }), p.comp && G.COMP[p.comp] ? " · " + L(G.COMP[p.comp].name) : ""),
          p.kept ? h("p", null, h("b", null, { yes: "✓ " + T("kept"), partly: T("partly"), no: T("notKept") }[p.kept])) :
            due ? h("div", { class: "stack" }, h("p", null, T("dueNow")), h("div", { class: "row" },
              h("button", { type: "button", class: "btn btn--small btn--sign", onclick: function () { setKept("yes"); } }, T("kept")),
              h("button", { type: "button", class: "btn btn--small", onclick: function () { setKept("partly"); } }, T("partly")),
              h("button", { type: "button", class: "btn btn--small", onclick: function () { setKept("no"); } }, T("notKept"))))
              : h("div", { class: "row" }, h("span", { class: "days" }, T("daysLeft", { n: 7 - days })),
                G.inFrame ? null : h("button", { type: "button", class: "btn btn--small btn--ghost", onclick: function () { G.download("versprechen.ics", G.icsReminder(p.text, p.date), "text/calendar"); } }, "📅 " + T("calendar"))),
          h("div", null, h("button", { type: "button", class: "btn btn--small btn--ghost", onclick: function () { store.set("promises", store.get("promises", []).filter(function (x) { return x.id !== p.id; })); paintPromises(); } }, T("del"))));
      }));
    }
    paintPromises();
    var ta = h("textarea", { id: "new-promise", placeholder: T("promisePh") }), msg = h("p", { class: "small muted", "aria-live": "polite" });
    G.add(app, [
      h("section", { class: "wrap page-head" }, h("p", { class: "eyebrow" }, T("tileWayT")), h("h1", null, T("trailTitle")), h("p", { class: "lead" }, T("trailLead")),
        h("div", { class: "row stats" },
          h("span", { class: "stat" }, h("b", { class: "num" }, nWalks + "/12"), T("tileWayT")),
          h("span", { class: "stat" }, h("b", { class: "num" }, nFinds + "/" + D.badges.length), T("finds")),
          h("span", { class: "stat" }, h("b", { class: "num" }, String(store.get("promises", []).length)), T("promisesT")),
          next ? h("a", { class: "btn btn--sign", href: "#walk-" + next.id }, "▶ " + T("nextWalk") + ": " + L(next.name)) : null)),
      h("section", { class: "wrap" }, h("div", { class: "way-wrap" }, wayMap(walks)),
        h("details", { class: "panel", style: { marginTop: "14px" } }, h("summary", null, T("weeksList")),
          h("ol", { class: "weeks" }, D.competences.map(function (c, i) {
            var done = walks[c.id];
            return h("li", { class: "week" + (done ? " done" : ""), style: { "--area": G.areaVar(G.AREA[c.area]) } },
              G.icon("foot", "foot"), h("small", null, T("week", { n: i + 1 })), h("b", null, L(c.name)),
              h("span", { class: "row", style: { gap: "8px" } }, h("small", null, done ? T("walkedOn", { d: G.fmtDate(done) }) : T("notYet")), h("a", { class: "link small", href: "#walk-" + c.id }, T("walkThis") + " →")));
          })))),
      store.get("groupCards", []).length ? h("section", { class: "wrap", style: { paddingTop: "32px" } },
        h("div", { class: "section-head" }, h("h2", null, T("groupCardsT")), h("p", { class: "muted" }, T("groupCardsSub"))),
        h("div", { class: "group-cards" }, store.get("groupCards", []).map(function (d) { return G.groupCardEl(d, true); }))) : null,
      G.jokers().length ? h("section", { class: "wrap", style: { paddingTop: "32px" } },
        h("div", { class: "section-head" }, h("h2", null, T("jMine")), h("a", { class: "btn btn--small", href: "#joker" }, "✎ " + T("jokerNew"))),
        h("div", { class: "joker-list" }, (function () {
          var list = G.jokers(), pairs = list.map(function (j) { return [G.jokerCard(j), G.jokerBack()]; });
          return list.map(function (j, i) { return G.zoomable(G.jokerCard(j), pairs, i); });
        })())) : null,
      h("section", { class: "wrap", style: { paddingBlock: "32px" } },
        h("div", { class: "section-head" }, h("h2", null, T("finds")), h("p", { class: "muted" }, T("findsCount", { n: nFinds, m: D.badges.length }))),
        h("div", { class: "finds" }, D.badges.map(function (b) { return G.badgeEl(b, have[b.id]); }))),
      h("section", { class: "band" }, h("div", { class: "wrap cols" },
        h("div", { class: "stack" }, h("h2", { class: "display" }, T("promisesT")), plist),
        h("div", { class: "panel", style: { alignSelf: "start" } }, h("h3", null, T("newPromise")),
          h("div", { class: "field" }, h("label", { for: "new-promise" }, L(D.promise.front)), ta),
          h("div", { class: "row" }, h("button", { type: "button", class: "btn btn--sign", onclick: function () { if (G.savePromise(ta.value)) { ta.value = ""; msg.textContent = T("saved"); paintPromises(); } } }, T("save"))), msg,
          h("p", { class: "note" }, L(D.promise.back)))))]);
  };

  /* ================= guide (Spielanleitung) ================= */
  var easy = false, mode = "expedition";
  G.pages.anleitung = function (app) {
    var body = h("div", { class: "guide-body" });
    var toggle = h("button", { type: "button", class: "btn btn--small", "aria-pressed": String(easy), onclick: function () { easy = !easy; paint(); } });
    function bagTile(b) { return h("div", { class: "bag-tile" }, h("span", { class: "bag-shape card-edge " + b.edge, "aria-hidden": "true" }), h("b", { class: "num" }, String(b.n)), h("h4", null, L(b.t)), h("p", null, L(b.d))); }
    function iconTile(x) { return h("div", { class: "icon-tile" }, h("span", { class: "tile-ico" }, G.icon(x.icon)), h("h4", null, L(x.t)), h("p", null, L(x.d))); }
    function modePanel() {
      var tabs = h("div", { class: "seg", role: "tablist" }, D.guide.modes.map(function (m) {
        return h("button", { type: "button", role: "tab", class: "seg-btn", "aria-selected": String(m.id === mode), onclick: function () { mode = m.id; paint(); } }, h("span", null, L(m.t)), h("small", null, L(m.meta)));
      }));
      var m = D.guide.modes.find(function (x) { return x.id === mode; }), content;
      if (mode === "expedition") {
        var detail = h("p", { class: "lead", "aria-live": "polite" });
        var bar = h("div", { class: "timeline", role: "list" }, D.guide.expedition.map(function (seg) {
          return h("button", { type: "button", class: "tl-seg tl-" + seg.k, role: "listitem", style: { flexGrow: String(seg.min) }, onclick: function () { put(detail, h("b", null, L(seg.t) + " · " + T("minutes", { n: seg.min }) + ": "), seg.d ? L(seg.d) : T("stationT")); } },
            h("span", null, L(seg.t)), h("small", null, T("minutes", { n: seg.min })));
        }));
        put(detail, h("b", null, T("total60")));
        content = [bar, detail,
          h("h4", null, T("stationT")),
          h("ol", { class: "station-list" }, D.guide.station.map(function (p) { return h("li", null, h("span", { class: "num" }, p.sec % 60 ? (p.sec > 60 ? G.mmss(p.sec) + " min" : T("seconds", { n: p.sec })) : T("minutes", { n: p.sec / 60 })), h("b", null, L(p.t)), h("span", null, L(p.d))); })),
          h("div", { class: "row" }, h("a", { class: "btn btn--sign", href: "#tafel" }, T("openBoard") + " →"))];
      } else {
        content = [h("ol", { class: "steps-list" }, m.steps.map(function (st) { return h("li", null, L(st)); })), h("p", { class: "note" }, L(m.note)),
          mode === "five" ? h("button", { type: "button", class: "btn btn--sign", onclick: function () { G.openFive(G.pick(D.competences).id); } }, T("tryRound")) :
          mode === "walk" ? h("button", { type: "button", class: "btn btn--sign", onclick: function () { G.openWalk(G.drawnId); } }, "▶ " + T("startWalk")) :
          mode === "original" ? h("button", { type: "button", class: "btn btn--sign", onclick: function () { G.newOriginal(); } }, "▶ " + T("playOriginal")) : null];
      }
      return h("div", { class: "panel" }, tabs, content);
    }
    function full() {
      return [
        h("section", { class: "guide-sec" }, h("h2", { class: "display" }, T("aboutT")), G.aboutTiles()),
        h("section", { class: "guide-sec" }, h("h2", { class: "display" }, T("quickT")),
          h("ol", { class: "quick" }, D.guide.quick.map(function (q, i) { return h("li", null, h("span", { class: "quick-n" }, String(i + 1)), h("span", { class: "tile-ico" }, G.icon(q.icon)), h("b", null, L(q.t)), h("span", null, L(q.d))); }))),
        h("section", { class: "guide-sec" }, h("h2", { class: "display" }, T("rulesT")), h("div", { class: "icon-grid" }, D.guide.rules.map(iconTile))),
        h("section", { class: "guide-sec" }, h("h2", { class: "display" }, T("modesT")), modePanel()),
        h("section", { class: "guide-sec" }, h("h2", { class: "display" }, T("rolesT")), h("div", { class: "icon-grid three" }, D.guide.roles.map(iconTile))),
        h("section", { class: "guide-sec" }, h("h2", { class: "display" }, T("bagT")), h("div", { class: "bag" }, D.guide.bag.map(bagTile)),
          h("ul", { class: "extras" }, D.guide.extras.map(function (x) { return h("li", null, h("b", null, L(x.t) + ": "), L(x.d)); }))),
        h("section", { class: "guide-sec" }, h("h2", { class: "display" }, T("funT")), h("div", { class: "icon-grid" }, D.guide.fun.map(iconTile))),
        h("section", { class: "guide-sec" }, h("h2", { class: "display" }, T("winT")), h("p", { class: "lead" }, T("winP")),
          h("div", { class: "tbl-wrap" }, h("table", null, h("thead", null, h("tr", null, h("th", null, T("what")), h("th", { class: "num" }, T("pts")), h("th", null, T("who")))),
            h("tbody", null, window.GCT_POINTS.map(function (p) { return h("tr", null, h("td", null, L(p[0])), h("td", { class: "num" }, String(p[1])), h("td", null, L(p[2]))); }))))),
        h("section", { class: "guide-sec" }, h("h2", { class: "display" }, T("accessT")), h("ul", { class: "checklist" }, D.guide.access.map(function (x) { return h("li", null, L(x)); })))
      ];
    }
    function easyRead() {
      return h("div", { class: "easy" }, D.guide.easy.map(function (sec) { return h("section", null, h("h2", null, L(sec.h)), h("ul", null, sec.p.map(function (x) { return h("li", null, L(x)); }))); }));
    }
    function paint() {
      toggle.textContent = easy ? T("easyOff") : T("easyOn");
      toggle.setAttribute("aria-pressed", String(easy));
      put(body, easy ? easyRead() : full(),
        h("section", { class: "guide-sec try" }, h("h2", { class: "display" }, T("tryT")),
          h("div", { class: "row" },
            h("button", { type: "button", class: "btn btn--sign btn--big", onclick: function () { G.openFive(G.pick(D.competences).id); } }, "✦ " + T("tryRound")),
            h("a", { class: "btn btn--big", href: "#tafel" }, T("openBoard")),
            h("button", { type: "button", class: "btn btn--big", onclick: function () { G.award("reader"); this.disabled = true; this.textContent = "✓ " + T("understood"); } }, T("understood")))));
    }
    app.append(
      h("section", { class: "wrap page-head" }, h("p", { class: "eyebrow" }, T("navGuide")), h("h1", null, T("guideTitle")), h("p", { class: "lead" }, T("guideLead")),
        h("div", { class: "row" }, toggle, G.inFrame ? null : h("span", { class: "small muted" }, T("printHint").split(".")[0] + "."))),
      h("section", { class: "wrap guide", style: { paddingBottom: "48px" } }, body));
    paint();
  };

  /* ================= measure (Messung) ================= */
  var formSeq = 0;
  G.nciForm = function (collect, onSaved) {
    var fid = "f" + (++formSeq);
    var form = h("form", { class: "stack", novalidate: true, style: { gap: "20px" } });
    var codeIn = null, whenSel = "before", keptBox = null, keptVal = null;
    if (collect) {
      codeIn = h("input", { type: "text", id: fid + "-code", autocomplete: "off", "aria-describedby": fid + "-codehint", style: { maxWidth: "260px" } });
      var words = G.lang === "de" ? ["MOOS", "FARN", "BIRKE", "KIESEL", "QUELLE", "EICHE", "LERCHE", "DACHS"] : ["MOSS", "FERN", "BIRCH", "PEBBLE", "SPRING", "OAK", "LARK", "BADGER"];
      form.append(
        h("div", { class: "field" }, h("label", { for: fid + "-code" }, T("code")),
          h("div", { class: "row" }, codeIn, h("button", { type: "button", class: "btn btn--small", onclick: function () { codeIn.value = G.pick(words) + "-" + String(10 + (Math.random() * 90 | 0)); } }, T("suggest"))),
          h("p", { class: "small muted", id: fid + "-codehint" }, T("codeHint"))),
        h("fieldset", { class: "scale" }, h("legend", null, T("when")),
          h("div", { class: "row" }, [["before", T("before")], ["after", T("after")], ["day7", T("day7")]].map(function (o, i) {
            var r = h("input", { type: "radio", name: fid + "-when", id: fid + "-w" + i, value: o[0], checked: i === 0 });
            r.addEventListener("change", function () { whenSel = o[0]; keptBox.hidden = whenSel !== "day7"; });
            return h("label", { for: fid + "-w" + i, class: "row", style: { gap: "6px", fontWeight: "400" } }, r, o[1]);
          }))));
    }
    D.nci.forEach(function (it, i) {
      form.appendChild(h("fieldset", { class: "scale" }, h("legend", null, (i + 1) + ". " + L(it)),
        h("div", { class: "scale-row" }, [1, 2, 3, 4, 5, 6, 7].map(function (v) {
          var lbl = v === 1 ? T("disagree") : v === 7 ? T("agree") : String(v);
          return h("label", { title: lbl }, h("input", { type: "radio", name: fid + "-q" + i, value: v, "aria-label": v + " (" + lbl + ")" }), h("span", { "aria-hidden": "true" }, String(v)));
        })),
        h("div", { class: "scale-ends", "aria-hidden": "true" }, h("span", null, "1 = " + T("disagree")), h("span", null, "7 = " + T("agree")))));
    });
    if (collect) {
      keptBox = h("fieldset", { class: "scale", hidden: true }, h("legend", null, T("keptQ")),
        h("div", { class: "row" }, [["yes", T("yes")], ["partly", T("partly")], ["no", T("no")]].map(function (o, i) {
          var r = h("input", { type: "radio", name: fid + "-kept", id: fid + "-k" + i, value: o[0] });
          r.addEventListener("change", function () { keptVal = o[0]; });
          return h("label", { for: fid + "-k" + i, class: "row", style: { gap: "6px", fontWeight: "400" } }, r, o[1]);
        })));
      form.appendChild(keptBox);
    }
    var out = h("div", { class: "stack", "aria-live": "polite" });
    form.append(h("div", { class: "row" }, h("button", { type: "submit", class: "btn btn--sign" }, collect ? T("saveEntry") : T("showNumber"))), out,
      h("p", { class: "note" }, T("rawNote"), G.lang === "de" ? " " + T("deNote") : ""));
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var vals = D.nci.map(function (_, i) { var r = form.querySelector("input[name='" + fid + "-q" + i + "']:checked"); return r ? +r.value : null; });
      if (vals.some(function (v) { return v == null; })) { put(out, h("p", null, h("b", null, T("answerAll")))); return; }
      var mean = vals.reduce(function (a, b) { return a + b; }, 0) / vals.length;
      if (collect) {
        var code = (codeIn.value || "").trim().toUpperCase();
        if (!code) { put(out, h("p", null, h("b", null, T("needCode")))); codeIn.focus(); return; }
        var list = store.get("nci", []);
        list.push({ code: code, when: whenSel, date: new Date().toISOString(), q: vals, mean: Math.round(mean * 100) / 100, kept: whenSel === "day7" ? keptVal : null, lang: G.lang });
        store.set("nci", list);
        put(out, h("p", null, h("b", null, T("entrySaved", { c: code }))), h("p", { class: "answer-big num" }, G.fmt(mean, 1)));
        form.reset(); whenSel = "before"; keptVal = null; keptBox.hidden = true;
        if (onSaved) onSaved();
      } else put(out, h("p", { class: "answer-big num" }, G.fmt(mean, 1)), h("p", null, T("yourNumber", { n: G.fmt(mean, 1) })));
    });
    return form;
  };
  function nciCsv() {
    var rows = [["code", "timepoint", "date", "nci1", "nci2", "nci3", "nci4", "nci5", "nci6", "nci_raw_mean", "promise_kept", "lang"]];
    store.get("nci", []).forEach(function (e) { rows.push([e.code, e.when, e.date].concat(e.q).concat([e.mean, e.kept || "", e.lang])); });
    return rows.map(function (r) { return r.map(G.csvCell).join(","); }).join("\n");
  }
  G.pages.messung = function (app) {
    var tableBox = h("div", { class: "stack" }), status = h("p", { class: "small muted", "aria-live": "polite" });
    var area = h("textarea", { class: "small", hidden: true, readonly: true, "aria-label": "CSV" });
    function paintTable() {
      var list = store.get("nci", []), confirmBox = h("div");
      put(tableBox,
        h("h3", null, T("entries") + " (" + list.length + ")"),
        list.length ? h("div", { class: "tbl-wrap" }, h("table", null,
          h("thead", null, h("tr", null, h("th", null, T("code")), h("th", null, T("when")), h("th", { class: "num" }, "NCI 1–6"), h("th", { class: "num" }, "Ø"), h("th", null, T("keptQ")))),
          h("tbody", null, list.slice().reverse().map(function (e) {
            return h("tr", null, h("td", null, e.code), h("td", null, T(e.when)), h("td", { class: "num" }, e.q.join(" ")), h("td", { class: "num" }, G.fmt(e.mean, 2)), h("td", null, e.kept ? T(e.kept === "yes" ? "yes" : e.kept === "no" ? "no" : "partly") : "–"));
          })))) : h("p", { class: "muted" }, T("noEntries")),
        h("div", { class: "row" },
          h("button", { type: "button", class: "btn btn--small btn--sign", disabled: !list.length, onclick: function () { G.copyText(nciCsv(), status, area); } }, T("copyCsv")),
          G.inFrame ? null : h("button", { type: "button", class: "btn btn--small", disabled: !list.length, onclick: function () { G.download("greencomp-trails-nci.csv", nciCsv()); } }, T("download")),
          h("button", { type: "button", class: "btn btn--small btn--ghost", disabled: !list.length, onclick: function () {
            put(confirmBox, h("div", { class: "confirm" }, h("span", null, T("clearQ", { n: list.length })),
              h("button", { type: "button", class: "btn btn--small", onclick: function () { store.set("nci", []); paintTable(); } }, T("yesClear")),
              h("button", { type: "button", class: "btn btn--small btn--ghost", onclick: function () { confirmBox.replaceChildren(); } }, T("cancel"))));
          } }, T("clearAll"))),
        confirmBox, status, area);
    }
    paintTable();
    app.append(
      h("section", { class: "wrap page-head" }, h("p", { class: "eyebrow" }, "Nature Connection Index · Richardson et al. 2019"), h("h1", null, T("measureTitle")), h("p", { class: "lead" }, T("measureLead"))),
      h("section", { class: "wrap cols", style: { paddingBottom: "48px", alignItems: "start" } },
        h("div", { class: "panel" }, G.nciForm(true, paintTable)),
        h("div", { class: "stack" }, h("div", { class: "panel" }, tableBox), h("p", { class: "note" }, T("measureHonest")), h("p", { class: "note" }, T("gcSelf")))));
  };

  /* ================= workshop (Werkstatt) ================= */
  G.pages.werkstatt = function (app) {
    var abc = store.get("abc", null) || { "promoting-nature": { senses: "A" }, "critical-thinking": { beauty: "B" } };
    var addr = h("input", { type: "url", id: "ws-addr", placeholder: location.href.replace(/#.*$/, ""), value: store.get("baseUrl", "") });
    var preview = h("div", { style: { width: "120px" } }, G.qr(G.linkTo("k-promoting-nature")));
    addr.addEventListener("change", function () { store.set("baseUrl", addr.value.trim()); put(preview, G.qr(G.linkTo("k-promoting-nature"))); });
    var table = h("table", null,
      h("thead", null, h("tr", null, h("th", null, T("tComp")), D.trails.map(function (t) { return h("th", null, L(t.name)); }))),
      h("tbody", null, D.competences.map(function (c) {
        return h("tr", null, h("td", null, L(c.name)), D.trails.map(function (t) {
          var b = h("button", { type: "button", class: "chip", "aria-label": L(c.name) + " × " + L(t.name) });
          function paint() { var v = (abc[c.id] || {})[t.id] || ""; b.textContent = v || "·"; b.setAttribute("aria-pressed", String(!!v)); }
          b.addEventListener("click", function () { var order = ["", "A", "B", "C"]; abc[c.id] = abc[c.id] || {}; var v = abc[c.id][t.id] || ""; abc[c.id][t.id] = order[(order.indexOf(v) + 1) % 4]; store.set("abc", abc); paint(); });
          paint(); return h("td", null, b);
        }));
      })));
    var status = h("p", { class: "small muted", "aria-live": "polite" }), area = h("textarea", { class: "small", hidden: true, readonly: true, "aria-label": "CSV" });
    function abcCsv() { var rows = [["competence"].concat(D.trails.map(function (t) { return t.id; }))]; D.competences.forEach(function (c) { rows.push([c.id].concat(D.trails.map(function (t) { return (abc[c.id] || {})[t.id] || ""; }))); }); return rows.map(function (r) { return r.join(","); }).join("\n"); }
    var mediaRows = [];
    D.areas.forEach(function (a) { mediaRows.push([T("kStation") + ": " + L(a.name), T("kStation"), L(a.soundName), T("stPlace")]); });
    D.competences.forEach(function (c) {
      var p = c.pieces;
      mediaRows.push([L(c.name), T("kSound"), p.sound ? L(p.sound.title) : "", T("stPlace")]);
      mediaRows.push([L(c.name), T("kVoice"), p.voice ? L(p.voice.lines[0].label) : "", T("stPlace")]);
      mediaRows.push([L(c.name), T("kPicture"), p.picture ? p.picture.kind : "", T("stPlace")]);
      mediaRows.push([L(c.name), T("kWalk"), "", T("stPlace")]);
      mediaRows.push([L(c.name), T("kPhoto"), L(c.photo), T("stMissing")]);
    });
    function mediaCsv() { return [["piece", "kind", "content", "status", "file", "author", "licence", "release"]].concat(mediaRows.map(function (r) { return r.concat(["", "", "", ""]); })).map(function (r) { return r.map(G.csvCell).join(","); }).join("\n"); }
    var st2 = h("p", { class: "small muted", "aria-live": "polite" }), area2 = h("textarea", { class: "small", hidden: true, readonly: true, "aria-label": "CSV" });
    app.append(
      h("section", { class: "wrap page-head" }, h("p", { class: "eyebrow" }, "v" + D.version), h("h1", null, T("wsTitle")), h("p", { class: "lead" }, T("wsLead"))),
      h("section", { class: "wrap stack", style: { paddingBottom: "48px", gap: "22px" } },
        h("div", { class: "panel" }, h("h3", null, T("checkT")), h("ol", null, window.GCT_CHECKS.map(function (x) { return h("li", null, L(x)); }))),
        h("div", { class: "panel" }, h("h3", null, T("qrAddr")), h("p", { class: "muted" }, T("qrAddrP")), h("div", { class: "row", style: { alignItems: "flex-start" } }, h("div", { class: "field", style: { flex: "1", minWidth: "240px" } }, h("label", { for: "ws-addr" }, T("qrAddr")), addr), preview),
          h("p", null, h("a", { class: "btn btn--small", href: "#deckel" }, T("coasterTitle") + " · " + T("cpT") + " →"))),
        h("div", { class: "panel" }, h("h3", null, T("abcT")), h("p", { class: "muted" }, T("abcP")), h("div", { class: "tbl-wrap" }, table),
          h("div", { class: "row" }, h("button", { type: "button", class: "btn btn--small", onclick: function () { G.copyText(abcCsv(), status, area); } }, T("copyCsv"))), status, area),
        h("div", { class: "panel" }, h("h3", null, T("mediaT")), h("p", { class: "muted" }, T("mediaP")),
          h("div", { class: "tbl-wrap" }, h("table", null, h("thead", null, h("tr", null, h("th", null, T("piece")), h("th", null, T("kind")), h("th", null, T("tComp")), h("th", null, T("status")))),
            h("tbody", null, mediaRows.map(function (r) { return h("tr", null, h("td", null, r[0]), h("td", null, r[1]), h("td", null, r[2]), h("td", null, h("span", { class: "badge", style: { borderStyle: r[3] === T("stMissing") ? "dashed" : "solid" } }, r[3]))); })))),
          h("div", { class: "row" }, h("button", { type: "button", class: "btn btn--small", onclick: function () { G.copyText(mediaCsv(), st2, area2); } }, T("copyCsv"))), st2, area2),
        h("div", { class: "panel" }, h("h3", null, T("estT")), h("p", { class: "muted" }, T("estP", { a: D.estimates.length })),
          h("div", { class: "tbl-wrap" }, h("table", null, h("tbody", null, D.competences.map(function (c) {
            var es = G.estsFor(c.id), gaps = D.estimateGaps.filter(function (g) { return g.comp === c.id; });
            return h("tr", null, h("td", null, L(c.name)), h("td", { class: "num" }, es.length + " / 2"),
              h("td", null, es.map(function (e) { return h("div", null, "✓ " + L(e.q) + " (" + e.source + ")"); }), gaps.map(function (g) { return h("div", { class: "muted" }, "○ " + (g.idea ? T("idea") + ": " + L(g.idea) : T("needsSource"))); })));
          })))))));
  };
})();
