/* GreenComp Trails — router, header, bottom tab bar, footer, boot. */
(function () {
  "use strict";
  var G = window.GCT, D = G.D, h = G.h, T = G.T, put = G.put, store = G.store;
  var app = G.$("#app");
  var current = "";

  /* «Play» comes first on a desk, and sits in the middle of the tab bar on a phone. */
  var NAV = [
    { hash: "spielen", icon: "play", key: "navPlay", desktop: true, play: true },
    { hash: "", icon: "home", key: "navHome", mobile: true },
    { hash: "set", icon: "set", key: "navCards", desktop: true, mobile: true },
    { hash: "fakten", icon: "spark", key: "navFacts", desktop: true },
    { hash: "spielen", icon: "play", key: "navPlay", mobile: true, play: true },
    { hash: "anleitung", icon: "guide", key: "navGuide", desktop: true, mobile: true },
    { hash: "tafel", icon: "board", key: "navBoard", desktop: true },
    { hash: "spuren", icon: "way", key: "navTrail", desktop: true, mobile: true },
    { hash: "messung", icon: "measure", key: "navMeasure", desktop: true }
  ];

  function render(hash) {
    G.runCleanups();
    current = hash;
    app.replaceChildren();
    var P = G.pages;
    /* #los: the way in for a first test. Straight into one station, no home page and no choices. */
    if (hash === "los") { G.newGame("group", null, "one", true); return; }
    if (!hash) P.home(app);
    else if (/^d\d{1,2}$/.test(hash) && G.coasterComp(+hash.slice(1))) P.found(app, +hash.slice(1));
    else if (hash.indexOf("k-") === 0 && G.COMP[hash.slice(2)]) P.comp(app, hash.slice(2));
    else if (hash.indexOf("walk-") === 0 && G.COMP[hash.slice(5)]) { P.comp(app, hash.slice(5)); G.openWalk(hash.slice(5)); }
    else if (hash.indexOf("station-") === 0 && G.AREA[hash.slice(8)]) P.station(app, hash.slice(8));
    else if (hash === "fakten") P.fakten(app);
    else if (hash.indexOf("fakten-") === 0 && G.COMP[hash.slice(7)]) { P.fakten(app, { comp: hash.slice(7) }); current = "fakten"; }
    else if (hash.indexOf("fakt-") === 0) { P.fakten(app, { fact: hash.slice(5) }); current = "fakten"; }
    else if (P[hash] && ["spielen", "vorbereiten", "set", "loesungen", "tafel", "spuren", "messung", "werkstatt", "anleitung", "schaetzen", "joker", "deckel"].indexOf(hash) >= 0) P[hash](app);
    else { current = ""; P.home(app); }
    /* In the game the phone shows only the game: no tab bar under the cards. */
    document.body.classList.toggle("in-game", current === "spielen");
    renderHeader();
    window.scrollTo(0, 0);
  }
  G.route = function () {
    var hash = decodeURIComponent(location.hash.slice(1));
    if (hash === "app") { app.focus(); return; }
    if (document.startViewTransition && !G.reduced && app.childElementCount) document.startViewTransition(function () { render(hash); });
    else render(hash);
  };

  function setLang(code) {
    if (G.lang === code) return;
    G.lang = code; store.set("lang", code); document.documentElement.lang = code;
    G.closeOverlays(); G.route(); renderFooter();
  }
  function renderHeader() {
    function navLink(n) { return h("a", { href: "#" + n.hash, class: n.play ? "nav-play" : null, "aria-current": current === n.hash ? "page" : null }, n.play ? G.icon("play") : null, T(n.key)); }
    function lb(code) { return h("button", { type: "button", lang: code, "aria-pressed": String(G.lang === code), onclick: function () { setLang(code); } }, code.toUpperCase()); }
    put(G.$("#site"), h("div", { class: "wrap" },
      h("a", { class: "mark", href: "#" }, h("span", { class: "mark-blaze", "aria-hidden": "true" }, h("i"), h("i"), h("i")), h("span", null, h("b", null, T("appName")), h("small", null, T("working")))),
      h("nav", { class: "nav", "aria-label": T("navLabel") }, NAV.filter(function (n) { return n.desktop; }).map(navLink)),
      h("div", { class: "langs", role: "group", "aria-label": T("language") }, lb("en"), lb("de"))));
    put(G.$("#tabbar"), NAV.filter(function (n) { return n.mobile; }).map(function (n) {
      return h("a", { href: "#" + n.hash, class: n.play ? "tab-play" : null, "aria-current": current === n.hash ? "page" : null }, G.icon(n.icon, "tab-ico"), h("span", null, T(n.key)));
    }));
    G.$("#tabbar").setAttribute("aria-label", T("navLabel"));
    var sk = G.$(".skip"); if (sk) sk.textContent = T("skip");
    document.title = T("appName") + " · " + T("working");
  }
  function renderFooter() {
    put(G.$("#foot"), h("div", { class: "wrap" },
      h("div", { class: "foot-links" },
        h("a", { href: "#anleitung" }, T("navGuide")), h("a", { href: "#fakten" }, T("navFacts")), h("a", { href: "#vorbereiten" }, T("prepT")), h("a", { href: "#schaetzen" }, T("trainTitle")), h("a", { href: "#joker" }, T("tJoker")), h("a", { href: "#deckel" }, T("coasterTitle")), h("a", { href: "#loesungen" }, T("solTitle")),
        h("a", { href: "#messung" }, T("navMeasure")), h("a", { href: "#werkstatt" }, T("wsTitle"))),
      h("p", null, T("footPrivacy")),
      h("p", null, T("footLicense")),
      h("details", null, h("summary", null, T("sourcesT")), h("ul", null, D.sources.map(function (x) { return h("li", null, h("b", null, x.short), ": ", x.text); }))),
      h("p", null, T("footDraft", { v: D.version }))));
  }

  /* boot */
  document.documentElement.lang = G.lang;
  var skipLink = G.$(".skip");
  if (skipLink) skipLink.addEventListener("click", function (ev) { ev.preventDefault(); app.focus(); });
  window.addEventListener("hashchange", function () { G.closeOverlays(); G.route(); });
  renderFooter();
  render(decodeURIComponent(location.hash.slice(1)));
  /* Birds greet you when the app opens. Browsers allow sound only after a first tap, so the chorus starts with it. */
  var WELCOME = ["pointerdown", "pointerup", "touchend", "keydown", "click"], welcomed = false;
  function welcomeDone() { welcomed = true; WELCOME.forEach(function (t) { document.removeEventListener(t, welcome, true); }); }
  function welcome(ev) {
    if (welcomed) return;
    if (!store.get("birdsStart", true) || !window.GCTAudio || (ev.target.closest && ev.target.closest(".birds-toggle"))) { welcomeDone(); return; }
    var ctx = window.GCTAudio.ensure();
    if (!ctx) { welcomeDone(); return; }
    function go() { if (!welcomed && ctx.state === "running") { welcomeDone(); window.GCTAudio.welcome(); } }
    if (ctx.state === "running") go(); else ctx.resume().then(go, function () {});
  }
  WELCOME.forEach(function (t) { document.addEventListener(t, welcome, true); });
  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol) && !G.inFrame) {
    try { navigator.serviceWorker.register("sw.js").catch(function () {}); } catch (e) {}
  }
})();
