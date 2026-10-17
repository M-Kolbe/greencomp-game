/* GreenComp Trails — core: storage, language, DOM helpers, voice, timeline, overlays, toasts, finds.
 * Every other module reads its tools from window.GCT. Plain JavaScript, no build step. */
(function () {
  "use strict";
  var D = window.GCT_DATA, I18N = window.GCT_I18N;
  var G = window.GCT = { D: D, A: window.GCTAudio, pages: {} };

  /* ---------- storage ---------- */
  var store = G.store = {
    get: function (k, d) { try { var v = localStorage.getItem("gct." + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem("gct." + k, JSON.stringify(v)); } catch (e) {} }
  };
  G.inFrame = (function () { try { return window.self !== window.top; } catch (e) { return true; } })();
  G.reduced = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  /* ---------- language ---------- */
  G.lang = store.get("lang", null) || ((navigator.language || "en").toLowerCase().indexOf("de") === 0 ? "de" : "en");
  var L = G.L = function (o) { if (o == null) return ""; if (typeof o === "string") return o; return o[G.lang] != null ? o[G.lang] : (o.en != null ? o.en : ""); };
  var T = G.T = function (key, vars) {
    var s = L(I18N[key]);
    if (!(key in I18N)) { console.error("missing string: " + key); s = key; }
    if (vars) s = s.replace(/\{(\w+)\}/g, function (m, k) { return vars[k] != null ? vars[k] : m; });
    return s;
  };

  /* ---------- DOM ---------- */
  var $ = G.$ = function (sel, root) { return (root || document).querySelector(sel); };
  function add(el, kids) {
    for (var i = 0; i < kids.length; i++) {
      var k = kids[i];
      if (k == null || k === false) continue;
      if (Array.isArray(k)) { add(el, k); continue; }
      el.appendChild(k instanceof Node ? k : document.createTextNode(String(k)));
    }
    return el;
  }
  G.add = add;
  G.put = function (el) { el.replaceChildren(); return add(el, Array.prototype.slice.call(arguments, 1)); };
  function setProps(el, props) {
    if (!props) return;
    Object.keys(props).forEach(function (k) {
      var v = props[k];
      if (v == null || v === false) return;
      if (k === "class") el.setAttribute("class", v);
      else if (k === "style" && typeof v === "object") Object.keys(v).forEach(function (sk) { if (sk.indexOf("--") === 0) el.style.setProperty(sk, v[sk]); else el.style[sk] = v[sk]; });
      else if (k.indexOf("on") === 0 && typeof v === "function") el.addEventListener(k.slice(2).toLowerCase(), v);
      else if (k === "text") el.textContent = v;
      else if (k === "value" && "value" in el) el.value = v;
      else if (k === "checked") { el.defaultChecked = !!v; el.checked = !!v; }
      else if (k === "selected") { el.defaultSelected = !!v; el.selected = !!v; }
      else el.setAttribute(k, v === true ? "" : v);
    });
  }
  var h = G.h = function (tag, props) { var el = document.createElement(tag); setProps(el, props); return add(el, Array.prototype.slice.call(arguments, 2)); };
  var NS = "http://www.w3.org/2000/svg";
  var s = G.s = function (tag, attrs) {
    var el = document.createElementNS(NS, tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      var v = attrs[k]; if (v == null) return;
      if (k === "text") el.textContent = v;
      else if ((k === "fill" || k === "stroke" || k === "stop-color") && String(v).indexOf("var(") >= 0) el.style.setProperty(k, v);
      else el.setAttribute(k, v);
    });
    return add(el, Array.prototype.slice.call(arguments, 2));
  };
  G.cssVar = function (name, el) { return getComputedStyle(el || document.documentElement).getPropertyValue(name).trim() || "#888"; };
  G.fmt = function (n, digits) { return new Intl.NumberFormat(G.lang === "de" ? "de-CH" : "en-GB", { maximumFractionDigits: digits == null ? 1 : digits }).format(n); };
  G.fmtDate = function (iso) { try { return new Date(iso).toLocaleDateString(G.lang === "de" ? "de-CH" : "en-GB", { day: "numeric", month: "long", year: "numeric" }); } catch (e) { return iso; } };
  G.mmss = function (sec) { sec = Math.max(0, Math.ceil(sec)); return Math.floor(sec / 60) + ":" + String(sec % 60).padStart(2, "0"); };
  G.pick = function (arr) { return arr[Math.random() * arr.length | 0]; };
  G.shuffle = function (arr) { var a = arr.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.random() * (i + 1) | 0; var t = a[i]; a[i] = a[j]; a[j] = t; } return a; };

  G.AREA = {}; D.areas.forEach(function (a) { G.AREA[a.id] = a; });
  G.COMP = {}; D.competences.forEach(function (c) { G.COMP[c.id] = c; });
  G.areaVar = function (a) { return "var(" + a.color + ")"; };
  G.estsFor = function (id) { return D.estimates.filter(function (e) { return e.comp === id; }); };

  /* ---------- route-scoped cleanup ---------- */
  var cleanups = [];
  G.onLeave = function (fn) { cleanups.push(fn); };
  G.runCleanups = function () { var c = cleanups; cleanups = []; c.forEach(function (f) { try { f(); } catch (e) { console.error(e); } }); };

  /* ---------- QR ---------- */
  G.baseUrl = function () { var saved = store.get("baseUrl", ""); return (saved || location.href).replace(/#.*$/, ""); };
  G.linkTo = function (hash) { return G.baseUrl() + (hash ? "#" + hash : ""); };
  G.qr = function (text, label) {
    var box = h("div", { class: "qr" });
    try {
      if (typeof window.qrcode !== "function") throw new Error("no qr");
      var q = window.qrcode(0, "M"); q.addData(text); q.make();
      var n = q.getModuleCount(), d = "";
      for (var r = 0; r < n; r++) for (var c = 0; c < n; c++) if (q.isDark(r, c)) d += "M" + c + " " + r + "h1v1h-1z";
      box.appendChild(s("svg", { viewBox: "-2 -2 " + (n + 4) + " " + (n + 4), role: "img", "aria-label": label || text, "shape-rendering": "crispEdges" },
        s("rect", { x: -2, y: -2, width: n + 4, height: n + 4, fill: "var(--qr-bg)" }), s("path", { d: d, fill: "var(--qr-ink)" })));
    } catch (e) { box.classList.add("qr--text"); box.textContent = text.replace(/^https?:\/\//, ""); }
    return box;
  };

  /* ---------- voice (device text-to-speech as placeholder) ---------- */
  var PROFILES = { narrator: [1, 0.92], elder: [0.72, 0.84], adult: [1, 0.95], teen: [1.28, 1.02], child: [1.65, 0.95], farmer: [0.86, 0.9], ad: [1.12, 1.08] };
  var Voice = G.Voice = {
    ok: "speechSynthesis" in window && typeof window.SpeechSynthesisUtterance === "function",
    on: store.get("voice", true),
    pick: function () {
      var vs = window.speechSynthesis.getVoices() || [], want = G.lang;
      var c = vs.filter(function (v) { return v.lang && v.lang.toLowerCase().indexOf(want) === 0; });
      return c.find(function (v) { return /natural|neural|premium|enhanced/i.test(v.name); }) ||
        c.find(function (v) { return /google/i.test(v.name); }) ||
        c.find(function (v) { return want === "de" ? /de[-_](CH|DE|AT)/i.test(v.lang) : /en[-_](GB|IE)/i.test(v.lang); }) || c[0] || null;
    },
    speak: function (text, who) {
      if (!this.ok || !this.on || !text) return;
      try {
        var u = new SpeechSynthesisUtterance(text), v = this.pick(), p = PROFILES[who] || PROFILES.narrator;
        if (v) u.voice = v;
        u.lang = v ? v.lang : (G.lang === "de" ? "de-DE" : "en-GB");
        u.pitch = p[0]; u.rate = p[1];
        window.speechSynthesis.speak(u);
      } catch (e) {}
    },
    cancel: function () { if (this.ok) try { window.speechSynthesis.cancel(); } catch (e) {} },
    set: function (on) { this.on = on; store.set("voice", on); if (!on) this.cancel(); }
  };
  if (Voice.ok) { try { window.speechSynthesis.getVoices(); } catch (e) {} }
  G.est = function (text) { var w = String(text).split(/\s+/).length; return Math.max(2.2, w / (G.lang === "de" ? 2.1 : 2.4) + 0.6); };
  G.voiceToggle = function () {
    var b = h("button", { type: "button", class: "btn btn--small", "aria-pressed": String(Voice.on), hidden: !Voice.ok });
    function paint() { b.setAttribute("aria-pressed", String(Voice.on)); b.textContent = Voice.on ? T("voiceOn") : T("voiceOff"); }
    b.addEventListener("click", function () { Voice.set(!Voice.on); paint(); });
    paint(); return b;
  };

  /* ---------- timeline: cues at seconds, pause/resume, skip ---------- */
  G.Timeline = function (dur, cues, opts) {
    opts = opts || {};
    var elapsed = 0, last = 0, running = false, ended = false, iv = 0, fired = {};
    function fire() {
      for (var i = 0; i < cues.length; i++) if (!fired[i] && cues[i].at <= elapsed) { fired[i] = true; try { cues[i].fn(); } catch (e) { console.error(e); } }
      if (opts.onTick) opts.onTick(Math.min(elapsed, dur), dur);
    }
    function tick() {
      if (!running) return;
      var now = performance.now(); elapsed += (now - last) / 1000; last = now;
      fire();
      if (elapsed >= dur) { running = false; ended = true; clearInterval(iv); if (opts.onEnd) opts.onEnd(); }
    }
    return {
      play: function () { if (running || ended) return; running = true; last = performance.now(); clearInterval(iv); iv = setInterval(tick, 100); tick(); },
      pause: function () { if (!running) return; tick(); running = false; clearInterval(iv); },
      stop: function () { running = false; ended = true; clearInterval(iv); },
      skipTo: function (t) {
        elapsed = Math.max(0, Math.min(t, dur)); fired = {};
        for (var i = 0; i < cues.length; i++) if (cues[i].at < elapsed) fired[i] = true;
        last = performance.now(); if (running) tick(); else fire();
      },
      get running() { return running; }, get ended() { return ended; }, get elapsed() { return elapsed; }, dur: dur
    };
  };

  G.Wake = {
    lock: null, want: false,
    on: function () { this.want = true; var self = this; try { if ("wakeLock" in navigator && !self.lock) navigator.wakeLock.request("screen").then(function (l) { self.lock = l; if (l.addEventListener) l.addEventListener("release", function () { self.lock = null; }); }).catch(function () {}); } catch (e) {} },
    off: function () { this.want = false; try { if (this.lock) this.lock.release(); } catch (e) {} this.lock = null; }
  };
  document.addEventListener("visibilitychange", function () { if (document.visibilityState === "visible" && G.Wake.want) G.Wake.on(); });

  /* ---------- overlays ---------- */
  var ovStack = G.ovStack = [];
  G.overlay = function (opts) {
    var prev = document.activeElement, id = "ovt" + Date.now().toString(36) + ovStack.length;
    var closeBtn = h("button", { class: "btn btn--small ov-close", type: "button" }, T("close"));
    var body = h("div", { class: "ov-body" });
    var bar = h("div", { class: "ov-bar" }, h("h2", { class: "ov-title", id: id }, opts.label), opts.badge || null, closeBtn);
    var el = h("div", { class: "ov " + (opts.cls || ""), role: "dialog", "aria-modal": "true", "aria-labelledby": id }, bar, body);
    document.body.appendChild(el); document.body.classList.add("has-ov");
    var api = {
      el: el, body: body, bar: bar, closed: false,
      close: function () {
        if (api.closed) return; api.closed = true;
        try { if (opts.onClose) opts.onClose(); } catch (e) { console.error(e); }
        el.remove(); G.ovStack.splice(G.ovStack.indexOf(api), 1);
        if (!G.ovStack.length) document.body.classList.remove("has-ov");
        if (prev && prev.focus) try { prev.focus({ preventScroll: true }); } catch (e) {}
      }
    };
    closeBtn.addEventListener("click", function () { api.close(); });
    ovStack.push(api);
    setTimeout(function () { closeBtn.focus(); }, 30);
    return api;
  };
  G.closeOverlays = function () { ovStack.slice().forEach(function (o) { o.close(); }); };
  document.addEventListener("keydown", function (e) {
    if (!ovStack.length) return;
    var top = ovStack[ovStack.length - 1];
    if (e.key === "Escape") { e.preventDefault(); top.close(); return; }
    if (e.key === "Tab") {
      var f = Array.prototype.filter.call(top.el.querySelectorAll("button, [href], input, select, textarea, summary, [tabindex]:not([tabindex='-1'])"), function (x) { return !x.disabled && x.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], lastEl = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastEl.focus(); }
      else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------- copy & download ---------- */
  G.copyText = function (text, statusEl, area) {
    function fail() { if (area) { area.hidden = false; area.value = text; area.focus(); area.select(); } if (statusEl) statusEl.textContent = T("copyFail"); }
    try { navigator.clipboard.writeText(text).then(function () { if (statusEl) statusEl.textContent = T("copied"); }, fail); } catch (e) { fail(); }
  };
  G.download = function (name, text, type) {
    var blob = new Blob([text], { type: type || "text/csv;charset=utf-8" });
    var a = h("a", { href: URL.createObjectURL(blob), download: name });
    document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  };
  G.csvCell = function (v) { v = v == null ? "" : String(v); return /[",\n;]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; };

  /* ---------- icons (24-unit grid, stroked) ---------- */
  var ICONS = {
    table: "M4 9h16M6 9v10M18 9v10M8 5.5a1.5 1.5 0 1 0 0 .01M16 5.5a1.5 1.5 0 1 0 0 .01",
    walk: "M13 4.5a1.5 1.5 0 1 0 0 .01M12 7l-3 6 4 2-1 7M12 7l3 5 4 1M9 13l-3 2M13 15l4 6",
    window: "M5 3h14v18H5zM12 3v18M5 12h14",
    board: "M3 4h18v13H3zM9 21l3-4 3 4M6 13l3.5-4 3 2.5 4.5-5.5",
    text: "M5 6h14M5 10h14M5 14h10M5 18h12",
    set: "M5 6h10v14H5zM9 3h10v14",
    foot: "M7 20c-2 0-3-2-2.5-4.5S7 11.5 8.5 12s1.5 3 1 5-1 3-2.5 3zM16 13c-1.5 0-2.5-1.5-2-4s2-3.5 3-3 1.5 2.5 1 4-0.5 3-2 3z",
    cloud: "M7 18h10a4 4 0 0 0 0-8 6 6 0 0 0-11.5 1.5A3.3 3.3 0 0 0 7 18zM8 21l1-2M12 21l1-2M16 21l1-2",
    fork: "M12 22V12M12 12l-6-6M12 12l6-6M4 4h4v4M16 4h4v4",
    spark: "M12 2l2.2 6.6L21 9l-5.4 4.1L17.5 20 12 16l-5.5 4 1.9-6.9L3 9l6.8-.4z",
    feather: "M20 4C12 4 6 10 6 18M6 18l-2 2M9 15h6M11 11h7M14 7h5",
    compass: "M12 3a9 9 0 1 0 0 18 9 9 0 1 0 0-18zM15.5 8.5l-2 5-5 2 2-5z",
    seed: "M12 20c-4 0-6-3-6-7 3 0 6 2 6 7zM12 20c4 0 6-3 6-7-3 0-6 2-6 7zM12 20V9M12 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 1 0 0 5",
    sprout: "M12 21V11M12 11c0-4-3-6-7-6 0 4 3 6 7 6zM12 14c0-3 2.5-5 6-5 0 3-2.5 5-6 5zM7 21h10",
    target: "M12 3a9 9 0 1 0 0 18 9 9 0 1 0 0-18zM12 7a5 5 0 1 0 0 10 5 5 0 1 0 0-10zM12 11a1 1 0 1 0 0 2 1 1 0 1 0 0-2",
    ear: "M7 9a5 5 0 0 1 10 0c0 3-2 4-3 5.5S13 18 11 19.5 7 19 7 17M10 10a2 2 0 0 1 4 0c0 1.5-1.5 2-2 3",
    eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 9a3 3 0 1 0 0 6 3 3 0 1 0 0-6",
    flag: "M5 21V4M5 4h11l-2 4 2 4H5",
    boot: "M8 3h5v9l6 3v4H5v-4l3-2zM5 19h14",
    peak: "M2 20l7-12 4 6 2-3 7 9zM9 8l2-3 2 3",
    crown: "M3 18h18M4 18l-1-10 5 4 4-7 4 7 5-4-1 10",
    card: "M6 3h12v18H6zM9 8h6M9 12h6M9 16h3",
    hand: "M8 13V6a1.5 1.5 0 0 1 3 0v6M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v8c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 13a1.5 1.5 0 0 1 2.6-1.5L8 14",
    talk: "M4 5h16v10H9l-5 4zM8 9h8M8 12h5",
    tree: "M12 22v-7M12 15c-4 0-7-2-7-6 0-3 3-6 7-6s7 3 7 6c0 4-3 6-7 6zM9 22h6",
    phone: "M7 2h10v20H7zM11 18h2",
    leaf: "M5 19C5 10 10 5 20 4c0 10-5 15-14 15zM5 19l8-8",
    hourglass: "M6 2h12M6 22h12M7 2c0 6 5 7 5 10s-5 4-5 10M17 2c0 6-5 7-5 10s5 4 5 10",
    coaster: "M12 3a9 9 0 1 0 0 18 9 9 0 1 0 0-18zM12 7a5 5 0 1 0 0 10",
    sound: "M4 9v6h4l5 4V5L8 9zM16 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12",
    voice: "M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3",
    picture: "M3 5h18v14H3zM3 16l5-5 4 4 3-3 6 6M15 9a1.5 1.5 0 1 0 0 .01",
    home: "M3 11l9-7 9 7M5 10v10h5v-6h4v6h5V10",
    guide: "M4 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4zM20 4h-6M20 4v14h-6",
    way: "M5 21c3-4-1-6 2-9s7 0 9-4M14 4l2 4 4-1",
    more: "M5 12h.01M12 12h.01M19 12h.01",
    check: "M5 12l5 5 9-10",
    play: "M7 4l13 8-13 8z",
    measure: "M4 20V10M9 20V4M14 20v-7M19 20v-11",
    joker: "M6 3h12v18H6zM12 8v8M8 12h8",
    globe: "M12 3a9 9 0 1 0 0 18 9 9 0 1 0 0-18zM3 12h18M12 3c3.2 3 3.2 15 0 18M12 3c-3.2 3-3.2 15 0 18",
    zoom: "M10 4a6 6 0 1 0 0 12 6 6 0 1 0 0-12zM14.5 14.5L20 20M10 7.5v5M7.5 10h5",
    /* One sign per GreenComp area, so that colour is never the only cue (WCAG 1.4.1):
     * a heart for values, a network for complexity, a sunrise for futures, a rising arrow for acting. */
    "a-values": "M12 20s-7.5-4.6-7.5-10.2A4.1 4.1 0 0 1 12 7.2a4.1 4.1 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z",
    "a-complexity": "M8.5 7h7M7.3 9.2l3.4 6.4M16.7 9.2l-3.4 6.4M6 4.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 1 0 0-5zM18 4.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 1 0 0-5zM12 15.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 1 0 0-5z",
    "a-futures": "M3 19h18M7 19a5 5 0 0 1 10 0M12 7v3M5.6 10.6l2.1 2.1M18.4 10.6l-2.1 2.1M2.5 15.5h2M19.5 15.5h2",
    "a-acting": "M3 18l6-6 4 4 8-8M15 8h6v6"
  };
  G.areaSym = function (area, cls) { var a = typeof area === "string" ? G.AREA[area] : area; return a ? G.icon("a-" + a.id, cls || "area-sym") : null; };
  G.icon = function (name, cls) {
    return s("svg", { class: cls || "ico", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": 1.9, "stroke-linecap": "round", "stroke-linejoin": "round", "aria-hidden": "true" },
      s("path", { d: ICONS[name] || ICONS.card }));
  };

  /* ---------- toasts ---------- */
  var toastBox = null;
  G.toast = function (content, ms) {
    if (!toastBox) { toastBox = h("div", { class: "toasts", role: "status", "aria-live": "polite" }); document.body.appendChild(toastBox); }
    var t = h("div", { class: "toast" }, content);
    toastBox.appendChild(t);
    setTimeout(function () { t.classList.add("out"); setTimeout(function () { t.remove(); }, 500); }, ms || 4600);
  };

  /* ---------- falling leaves (celebration) ---------- */
  G.leaves = function (cv, seconds) {
    if (!cv || !cv.isConnected) return function () {};
    var dpr = window.devicePixelRatio || 1, W = cv.width = cv.clientWidth * dpr, H = cv.height = cv.clientHeight * dpr, ctx = cv.getContext("2d");
    var cols = ["--a-values", "--a-complex", "--a-futures", "--a-acting", "--sign"].map(function (v) { return G.cssVar(v); });
    var list = []; for (var i = 0; i < 52; i++) list.push({ x: Math.random() * W, y: -Math.random() * H, r: Math.random() * 6, v: (0.7 + Math.random()) * dpr * 1.4, s: (5 + Math.random() * 7) * dpr, c: G.pick(cols), w: Math.random() * 6 });
    var t0 = performance.now(), raf = 0;
    function frame(now) {
      var t = (now - t0) / 1000; ctx.clearRect(0, 0, W, H);
      list.forEach(function (l) {
        if (!G.reduced) { l.y += l.v; l.x += Math.sin(t * 1.4 + l.w) * 0.8 * dpr; l.r += 0.03; } else if (l.y < 0) l.y = Math.random() * H;
        ctx.save(); ctx.translate(l.x, l.y); ctx.rotate(l.r); ctx.fillStyle = l.c; ctx.globalAlpha = 0.85;
        ctx.beginPath(); ctx.ellipse(0, 0, l.s, l.s * 0.45, 0, 0, 7); ctx.fill(); ctx.restore();
      });
      if (!G.reduced && t < (seconds || 9) && cv.isConnected) raf = requestAnimationFrame(frame);
      else if (!G.reduced) ctx.clearRect(0, 0, W, H);
    }
    raf = requestAnimationFrame(frame);
    return function () { cancelAnimationFrame(raf); };
  };
  G.celebrate = function (seconds) {
    if (G.reduced) return;
    var cv = h("canvas", { class: "celebrate", "aria-hidden": "true" });
    document.body.appendChild(cv);
    G.leaves(cv, seconds || 4);
    setTimeout(function () { cv.remove(); }, ((seconds || 4) + 0.5) * 1000);
  };

  /* ---------- finds (badges) ---------- */
  var BADGE = {}; D.badges.forEach(function (b) { BADGE[b.id] = b; });
  G.badges = function () { return store.get("badges", {}); };
  G.badgeEl = function (b, when, small) {
    var got = !!when;
    return h("div", { class: "find" + (got ? " got" : "") + (small ? " find--small" : ""), style: { "--fc": "var(" + b.color + ")" } },
      h("span", { class: "find-token" }, G.icon(b.icon, "find-ico")),
      h("span", { class: "find-text" }, h("b", null, L(b.name)), small ? null : h("small", null, got ? T("foundOn", { d: G.fmtDate(when) }) : L(b.how))));
  };
  G.award = function (id) {
    var have = G.badges();
    if (have[id] || !BADGE[id]) return false;
    have[id] = new Date().toISOString(); store.set("badges", have);
    G.toast([G.badgeEl(BADGE[id], have[id], true), h("span", { class: "toast-label" }, T("newFind"))]);
    try { if (G.A) { G.A.ensure(); G.A.signal("greattit", false); } } catch (e) {}
    G.celebrate(3.5);
    if (id !== "master" && Object.keys(have).length >= 10) setTimeout(function () { G.award("master"); }, 1800);
    return true;
  };
  G.markPlayed = function (info) {
    var p = store.get("played", { comps: {}, trails: {}, areas: {} });
    if (info.comp && G.COMP[info.comp]) { p.comps[info.comp] = 1; p.areas[G.COMP[info.comp].area] = 1; }
    if (info.trail) p.trails[info.trail] = 1;
    store.set("played", p);
    if (Object.keys(p.trails).length >= 5) G.award("trails5");
    if (Object.keys(p.areas).length >= 4) G.award("areas4");
  };

  /* ---------- promises (local) ---------- */
  G.savePromise = function (text, comp) {
    text = String(text || "").trim(); if (!text) return false;
    var list = store.get("promises", []);
    list.unshift({ id: Date.now().toString(36), text: text, comp: comp || null, date: new Date().toISOString(), kept: null });
    store.set("promises", list);
    G.award("promise");
    return true;
  };
  G.icsReminder = function (text, fromIso) {
    var d = new Date(new Date(fromIso).getTime() + 7 * 86400000);
    function z(n) { return String(n).padStart(2, "0"); }
    var day = d.getFullYear() + z(d.getMonth() + 1) + z(d.getDate());
    return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//GreenComp Trails//EN", "BEGIN:VEVENT", "UID:" + Date.now() + "@greencomp-trails",
      "DTSTAMP:" + new Date().toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z", "DTSTART;VALUE=DATE:" + day,
      "SUMMARY:" + L(D.promise.back).replace(/[,;]/g, " "), "DESCRIPTION:" + String(text).replace(/[\n,;]/g, " "), "END:VEVENT", "END:VCALENDAR"].join("\r\n");
  };
})();
