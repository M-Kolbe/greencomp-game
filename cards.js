/* GreenComp Trails — card rendering, the full set and the answer booklet, the large card view, and the joker. */
(function () {
  "use strict";
  var G = window.GCT, D = G.D, h = G.h, T = G.T, L = G.L, add = G.add, put = G.put, store = G.store;

  /* The type row names the card. With an area, its sign stands in front, so colour is never the only cue. */
  function typeRow(text, edge, area) {
    return [h("div", { class: "card-type" }, area ? G.areaSym(area, "card-sym") : null, h("span", null, text)), h("span", { class: "card-edge " + edge, "aria-hidden": "true" })];
  }
  G.typeRow = typeRow;

  /* A task is three numbered steps and a clear end. Alone, the solo form is one short paragraph. */
  /* Examples stand small under the step where people tend to freeze. */
  G.taskSteps = function (c, solo) {
    if (solo) return h("p", null, L(c.solo));
    var ex = c.examples;
    return [h("ol", { class: "task-steps" }, c.steps.map(function (x, i) { return h("li", null, L(x), ex && ex.at === i + 1 ? h("span", { class: "task-ex" }, L(ex)) : null); })), h("p", { class: "task-done" }, "✓ " + L(c.done))];
  };
  G.taskLabel = function (c) { return c && c.minutes ? T("makeRealMin", { n: c.minutes }) : T("makeReal"); };
  G.taskBlock = function (c, solo) {
    return h("div", { class: "card-task" }, h("span", { class: "label" }, solo ? T("soloForm") : G.taskLabel(c)), G.taskSteps(c, solo));
  };
  /* solo: the card as one person plays it, with the solo form instead of the three group steps. */
  function compFront(c, solo) {
    return [
      typeRow(c.no + " " + L(c.name), "edge-circle", c.area),
      h("p", { class: "card-plain" }, L(c.plain)),
      h("p", { class: "card-q" }, G.compQ(c, solo)),
      G.taskBlock(c, !!solo)
    ];
  }
  function compBack(c, mini) {
    return [
      typeRow(c.no + " " + L(c.name), "edge-circle", c.area),
      h("div", { class: "card-task" }, h("span", { class: "label" }, T("definition")), h("p", { class: "card-def", lang: "en" }, c.definition)),
      h("div", { class: "card-task" }, h("span", { class: "label" }, T("soloForm")), h("p", null, L(c.solo))),
      h("div", { class: "card-task" }, h("span", { class: "label" }, T("accessForm")), h("p", null, L(c.access))),
      /* The printed card leaves the talk question to its own conversation card, so that the type can stay large. */
      mini ? null : h("div", { class: "card-task" }, h("span", { class: "label" }, T("tTalk")), h("p", null, L(c.talk[0]))),
      /* The window (sound, voice, picture) is for when the real thing is not possible, so it sits with the other alternatives. */
      h("div", { class: "card-foot" }, G.qr(G.linkTo("k-" + c.id), T("doorWindow") + ": " + L(c.name)), h("p", null, T("windowOnly")))
    ];
  }
  G.compCard = function (c, opts) {
    opts = opts || {};
    var back = !!opts.back;
    var el = h("article", { class: "card" + (opts.big ? " card--big" : "") + (opts.mini ? " mini" : ""), style: { "--area": G.areaVar(G.AREA[c.area]) }, "aria-label": T("tComp") + ": " + L(c.name) });
    var body = h("div", { class: "card-body" });
    function paint() { put(body, back ? compBack(c, opts.mini) : compFront(c, opts.solo)); body.classList.toggle("cb-back", back); }
    paint(); el.appendChild(body);
    if (opts.flippable) {
      var b = h("button", { class: "btn btn--small card-flip", type: "button", "aria-pressed": "false" }, "↻ " + T("turnOver"));
      b.addEventListener("click", function () {
        back = !back; b.setAttribute("aria-pressed", String(back));
        if (!G.reduced) { el.classList.remove("flipping"); void el.offsetWidth; el.classList.add("flipping"); setTimeout(paint, 180); } else paint();
      });
      el.appendChild(b);
    }
    return el;
  };
  var mini = G.mini = function (cls, area, kids) { return h("article", { class: "card mini " + cls, style: area ? { "--area": area } : null }, add(h("div", { class: "card-body" }), kids)); };
  /* What a trail changes, for a group or for one person alone. */
  G.compQ = function (c, solo) { return L(solo && c.questionSolo ? c.questionSolo : c.question); };
  G.compTalk = function (c, k, solo) { return L(solo && c.talkSolo && c.talkSolo[k] || c.talk[k]); };
  G.trailChange = function (t, solo) { return L(solo && t.changeSolo ? t.changeSolo : t.change); };
  G.trailMini = function (t, faceDown, solo) {
    return mini("is-trail", "var(--sign-ink)", faceDown
      ? [typeRow(T("tTrail"), "edge-arrow"), h("div", { class: "back-pattern" })]
      : [typeRow(T("tTrail"), "edge-arrow"), h("p", { class: "big" }, L(t.name)), h("p", { class: "card-q" }, L(t.motto)), h("p", null, G.trailChange(t, solo))]);
  };
  G.trailBack = function () { return mini("is-trail", "var(--sign-ink)", [typeRow(T("tTrail"), "edge-arrow"), h("p", null, T("trailBack")), h("div", { class: "back-pattern" })]); };
  G.sparkMini = function (sp) { return mini("is-spark", "var(--blaze)", [typeRow(T("tSpark"), "edge-tri"), h("p", { class: "big" }, L(sp.name)), h("p", null, L(sp.text))]); };
  G.sparkBack = function () { return mini("is-spark", "var(--blaze)", [typeRow(T("tSpark"), "edge-tri"), h("p", null, T("sparkBack")), h("div", { class: "back-pattern" })]); };
  G.silenceMini = function (si) { return mini("is-silence", "var(--ink)", [typeRow(T("tSilence"), "edge-stripe"), h("p", { class: "card-q" }, L(si.title)), h("p", null, L(si.text))]); };
  G.silenceBack = function () { return mini("is-silence", "var(--ink)", [typeRow(T("tSilence"), "edge-stripe"), h("p", null, T("silenceBack")), h("div", { class: "back-pattern" })]); };
  G.areaMini = function (a, back) {
    return mini("is-area", G.areaVar(a), back
      ? [typeRow(T("tArea"), "edge-square", a), h("p", null, L(a.teaser)), h("div", { class: "card-foot" }, G.qr(G.linkTo("station-" + a.id), T("stationSound")), h("p", null, T("stationSound") + ": " + L(a.soundName)))]
      : [typeRow(T("tArea"), "edge-square", a), G.areaSym(a, "area-big"), h("p", { class: "big" }, L(a.name))]);
  };

  var PHOTO = G.PHOTO = { values: "linear-gradient(160deg,#5d7f45,#1c2f17 70%)", complexity: "linear-gradient(160deg,#3e7088,#0f2633 70%)", futures: "linear-gradient(160deg,#6c5a8e,#1f1830 70%)", acting: "linear-gradient(160deg,#9a5235,#2c120b 70%)" };

  G.talkMini = function (c, k, back) {
    var el = back
      ? mini("is-talk", null, [typeRow(T("tTalk"), "edge-circle"), h("p", { class: "card-q" }, T("askerFirst"))])
      : mini("is-talk", null, [typeRow(T("tTalk") + " · " + L(c.name), "edge-circle", c.area), h("p", { class: "card-q" }, L(c.talk[k])), h("p", null, T("photoNote") + ": " + L(c.photo))]);
    el.style.setProperty("--photo", PHOTO[c.area]);
    return el;
  };
  G.estMini = function (e, back) {
    var c = G.COMP[e.comp];
    return mini("is-est", G.areaVar(G.AREA[c.area]), back
      ? [typeRow(T("tEst"), "edge-diamond", c.area), h("span", { class: "lbl" }, T("source")), h("p", null, e.source), h("div", { class: "back-pattern" })]
      : [typeRow((e.type === "number" ? T("estimateNum") : T("estimateTF")) + " · " + L(c.name), "edge-diamond", c.area), h("p", { class: "card-q" }, L(e.q)), h("div", { class: "card-foot" }, G.qr(G.linkTo("tafel"), T("doorBoard")), h("p", null, T("answerOnBoard")))]);
  };
  G.promiseMini = function (back) {
    return mini("is-promise", "var(--a-values)", back
      ? [typeRow(T("tPromise"), "edge-circle"), h("p", { class: "card-q" }, L(D.promise.back))]
      : [typeRow(T("tPromise"), "edge-circle"), h("p", { class: "card-q" }, L(D.promise.front)), h("div", { class: "lines" }, h("i"), h("i"), h("i"))]);
  };

  /* ---------- the joker: blank to write on, or a card a group wrote ---------- */
  function lines(n) { return h("div", { class: "lines" }, Array.apply(null, Array(n)).map(function () { return h("i"); })); }
  function jokerName(j) { var c = j && G.COMP[j.comp]; return (j && (j.own || "").trim()) || (c ? L(c.name) : ""); }
  G.jokerName = jokerName;
  G.jokerBack = function () {
    return mini("is-joker is-joker-back", null, [typeRow(T("tJoker"), "edge-star"), h("p", { class: "big" }, T("tJoker")), h("p", { class: "card-q" }, L(D.joker.back)), h("p", null, L(D.joker.rule)), h("p", null, L(D.joker.missing)),
      h("div", { class: "card-foot" }, G.qr(G.linkTo("joker"), T("jokerWrite")), h("p", null, T("jokerWriteApp")))]);
  };
  /* opts.big: the large card of the game; otherwise a 70 x 120 mm card. Without j: the blank card to write on. */
  G.jokerCard = function (j, opts) {
    opts = opts || {};
    if (!j) return mini("is-joker is-blank", null, [typeRow(T("tJoker") + " · " + T("jokerOwn"), "edge-star"),
      h("div", { class: "card-task" }, h("span", { class: "label" }, T("jokerComp")), lines(1)),
      h("div", { class: "card-task" }, h("span", { class: "label" }, T("jokerQ")), lines(2)),
      h("div", { class: "card-task" }, h("span", { class: "label" }, T("makeReal")), h("ol", { class: "task-steps joker-lines" }, h("li", null, h("i")), h("li", null, h("i")), h("li", null, h("i")))),
      h("div", { class: "card-task" }, h("span", { class: "label" }, T("jokerDone")), lines(1))]);
    var c = G.COMP[j.comp], area = c ? G.areaVar(G.AREA[c.area]) : null, own = (j.own || "").trim();
    var steps = (j.steps || []).filter(function (x) { return (x || "").trim(); });
    /* nothing written yet: show the blank card to write on */
    if (!c && !own && !(j.q || "").trim() && !steps.length && !opts.big) return G.jokerCard(null);
    var kids = [typeRow(jokerName(j) ? T("tJoker") + " · " + jokerName(j) : T("tJoker"), "edge-star", c && c.area),
      c ? h("p", { class: "card-near" }, own ? T("jokerNear", { name: L(c.name) }) : L(c.plain)) : null,
      h("p", { class: "card-q" }, (j.q || "").trim() || "…"),
      h("div", { class: "card-task" }, h("span", { class: "label" }, T("makeReal")),
        steps.length ? h("ol", { class: "task-steps" }, steps.map(function (x) { return h("li", null, x.trim()); })) : null,
        (j.done || "").trim() ? h("p", { class: "task-done" }, "✓ " + j.done.trim()) : null),
      h("div", { class: "card-foot" }, h("p", null, T("jokerBy") + (j.at ? " · " + G.fmtDate(j.at) : "")))];
    if (opts.big) return h("article", { class: "card card--big is-joker", style: area ? { "--area": area } : null, "aria-label": T("tJoker") + ": " + jokerName(j) }, add(h("div", { class: "card-body" }), kids));
    return mini("is-joker", area, kids);
  };
  G.jokers = function () { return store.get("jokers", []); };

  /* ---------- the large card view: tap a card to see it big; turn it, swipe or use the arrow keys ---------- */
  /* kind: "coaster" counts coasters instead of cards */
  G.viewCards = function (pairs, start, startBack, kind) {
    var k = start || 0, back = !!startBack, x0 = null, y0 = null, co = kind === "coaster";
    var ov = G.overlay({ label: co ? T("coasterTitle") : T("cardView"), cls: "ov--cards" });
    var stage = h("div", { class: "cv-stage" });
    var count = h("p", { class: "cv-count small muted num", "aria-live": "polite" });
    var prev = h("button", { type: "button", class: "btn cv-nav", "aria-label": T("prevCard") }, "←");
    var next = h("button", { type: "button", class: "btn cv-nav", "aria-label": T("nextCard") }, "→");
    var flip = h("button", { type: "button", class: "btn btn--sign cv-flip" });
    function paint(how) {
      var src = pairs[k][back && pairs[k][1] ? 1 : 0], el = src.cloneNode(true);
      el.removeAttribute("tabindex"); el.removeAttribute("role");
      if (src.dataset.zoomLabel) el.setAttribute("aria-label", src.dataset.zoomLabel);
      el.classList.remove("dealt", "flipping", "zoomable", "cv-in-l", "cv-in-r");
      if (how && !G.reduced) el.classList.add(how);
      put(stage, el);
      count.textContent = pairs.length > 1 ? T(co ? "coasterOf" : "cardOf", { i: k + 1, n: pairs.length }) : "";
      flip.textContent = "↻ " + (back ? T("showFront") : T("turnOver"));
      flip.hidden = !pairs[k][1];
      prev.hidden = next.hidden = pairs.length < 2;
      prev.disabled = k === 0; next.disabled = k === pairs.length - 1;
    }
    function move(d) { var n = k + d; if (n < 0 || n >= pairs.length) return; k = n; paint(d > 0 ? "cv-in-r" : "cv-in-l"); }
    function turn() { if (!pairs[k][1]) return; back = !back; paint("flipping"); }
    flip.addEventListener("click", turn);
    prev.addEventListener("click", function () { move(-1); });
    next.addEventListener("click", function () { move(1); });
    ov.el.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { e.preventDefault(); move(-1); }
      else if (e.key === "ArrowRight") { e.preventDefault(); move(1); }
    });
    stage.addEventListener("pointerdown", function (e) { x0 = e.clientX; y0 = e.clientY; });
    stage.addEventListener("pointerup", function (e) {
      if (x0 == null) return;
      var dx = e.clientX - x0, dy = e.clientY - y0; x0 = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
      else if (Math.abs(dx) < 8 && Math.abs(dy) < 8) turn();
    });
    ov.body.append(h("div", { class: "cv" }, stage, h("div", { class: "row cv-tools" }, prev, flip, next), count, h("p", { class: "small muted cv-hint" }, pairs.length > 1 ? T("cvHint") : T("cvHint1"))));
    paint();
    return ov;
  };
  /* Make a card open the large view. pairs: [[front, back], …]; i: this card. */
  G.zoomable = function (el, pairs, i, back) {
    var name = el.getAttribute("aria-label") || (el.querySelector(".card-type") || el).textContent.trim();
    el.dataset.zoomLabel = name;
    el.classList.add("zoomable");
    el.setAttribute("tabindex", "0"); el.setAttribute("role", "button");
    el.setAttribute("aria-label", T("cardZoom", { name: name }));
    function open() { G.viewCards(pairs, i || 0, back); }
    el.addEventListener("click", function (e) { if (e.target.closest("a, button")) return; open(); });
    el.addEventListener("keydown", function (e) { if (e.target === el && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); open(); } });
    return el;
  };
  /* One card from the game, with its printed back, ready for the large view. */
  G.zoomOne = function (front, back) { return G.zoomable(front, [[front, back || null]], 0); };

  /* ---------- the full set ---------- */
  G.setCards = function (back) {
    var out = [];
    D.areas.forEach(function (a) { out.push({ type: "area", el: G.areaMini(a, back) }); });
    D.competences.forEach(function (c) { out.push({ type: "comp", el: G.compCard(c, { mini: true, back: back }) }); });
    D.trails.forEach(function (t) { out.push({ type: "trail", el: back ? G.trailBack() : G.trailMini(t, false) }); });
    D.competences.forEach(function (c) {
      c.talk.forEach(function (q, k) { out.push({ type: "talk", el: G.talkMini(c, k, back) }); });
    });
    D.competences.forEach(function (c) {
      var es = G.estsFor(c.id), gaps = D.estimateGaps.filter(function (g) { return g.comp === c.id; });
      es.forEach(function (e) { out.push({ type: "est", el: G.estMini(e, back) }); });
      gaps.forEach(function (g) {
        out.push({ type: "est", el: mini("is-est is-gap", G.areaVar(G.AREA[c.area]), [typeRow(T("tEst") + " · " + L(c.name), "edge-diamond", c.area), h("p", { class: "card-q" }, T("needsSource")), g.idea ? h("p", null, T("idea") + ": " + L(g.idea)) : null]) });
      });
    });
    D.sparks.forEach(function (sp) { out.push({ type: "spark", el: back ? G.sparkBack() : G.sparkMini(sp) }); });
    D.silence.forEach(function (si) { out.push({ type: "silence", el: back ? G.silenceBack() : G.silenceMini(si) }); });
    for (var i = 0; i < 12; i++) out.push({ type: "promise", el: G.promiseMini(back) });
    for (var j = 0; j < D.joker.count; j++) out.push({ type: "joker", el: back ? G.jokerBack() : G.jokerCard(null) });
    /* Jokers written on this device can be printed too. They are not counted as part of the set. */
    G.jokers().forEach(function (jk) { out.push({ type: "joker", own: true, el: back ? G.jokerBack() : G.jokerCard(jk) }); });
    return out;
  };
  /* How many cards the printed set has, without jokers someone wrote. */
  G.setCount = function () {
    var talk = D.competences.reduce(function (n, c) { return n + c.talk.length; }, 0);
    return D.areas.length + D.competences.length + D.trails.length + talk + D.estimates.length + D.estimateGaps.length + D.sparks.length + D.silence.length + 12 + D.joker.count;
  };

  var setFilter = "all", setBack = false;
  G.setFilterTo = function (f) { setFilter = f; setBack = false; };
  G.pages.set = function (app) {
    var types = [["all", T("all")], ["area", T("tArea")], ["comp", T("tComp")], ["trail", T("tTrail")], ["talk", T("tTalk")], ["est", T("tEst")], ["spark", T("tSpark")], ["silence", T("tSilence")], ["promise", T("tPromise")], ["joker", T("tJoker")]];
    var grid = h("div", { class: "set-grid" });
    var chips = h("div", { class: "chips", role: "group", "aria-label": T("navCards") });
    var count = h("p", { class: "muted", "aria-live": "polite" });
    var flipBtn = h("button", { type: "button", class: "btn btn--small", onclick: function () { setBack = !setBack; paint(); } });
    var jokerNote = h("div");
    function paint() {
      function pick(list) { return list.filter(function (x) { return setFilter === "all" || x.type === setFilter; }); }
      var cards = pick(G.setCards(setBack)), other = pick(G.setCards(!setBack));
      var pairs = cards.map(function (x, i) { return setBack ? [other[i].el, x.el] : [x.el, other[i].el]; });
      cards.forEach(function (x, i) { G.zoomable(x.el, pairs, i, setBack); });
      put(grid, cards.map(function (x) { return x.el; }));
      /* Backs are mirrored row by row, so that a sheet printed on both sides (turned on the long edge) puts every back behind its front. */
      grid.classList.toggle("is-backs", setBack);
      var own = cards.filter(function (x) { return x.own; }).length;
      count.textContent = T("cardsCount", { n: cards.length - own }) + (own ? " " + T("plusOwn", { n: own }) : "");
      put(chips, types.map(function (t) { return h("button", { type: "button", class: "chip", "aria-pressed": String(setFilter === t[0]), onclick: function () { setFilter = t[0]; paint(); } }, t[1]); }));
      flipBtn.textContent = "↻ " + (setBack ? T("showFronts") : T("showBacks"));
      put(jokerNote, setFilter === "joker" ? h("div", { class: "note no-print joker-note" }, h("span", null, T("jokerSetNote")), h("a", { class: "btn btn--small btn--sign", href: "#joker" }, "✎ " + T("jokerNew"))) : null);
    }
    app.append(
      h("section", { class: "wrap page-head" }, h("p", { class: "eyebrow" }, T("tileSetT", { n: G.setCount() })), h("h1", null, T("setTitle")), h("p", { class: "lead" }, T("setLead", { n: G.setCount() })),
        h("div", { class: "row" }, flipBtn, h("a", { class: "btn btn--small", href: "#loesungen" }, T("solTitle")), h("a", { class: "btn btn--small", href: "#joker" }, "✎ " + T("jokerNew")), count),
        G.inFrame ? null : h("p", { class: "note no-print" }, T("printHint")), h("p", { class: "small muted no-print" }, T("zoomHint"))),
      h("section", { class: "wrap", style: { paddingBottom: "48px" } }, chips, jokerNote, grid));
    paint();
  };

  G.pages.loesungen = function (app) {
    app.append(
      h("section", { class: "wrap page-head" }, h("p", { class: "eyebrow" }, T("tileSetT", { n: G.setCount() })), h("h1", null, T("solTitle")), h("p", { class: "lead" }, T("solLead"))),
      h("section", { class: "wrap", style: { paddingBottom: "48px" } },
        h("ol", { class: "booklet" }, D.estimates.map(function (e) {
          var c = G.COMP[e.comp];
          return h("li", { class: "booklet-item", style: { "--area": G.areaVar(G.AREA[c.area]) } },
            h("span", { class: "est-kind" }, e.type === "number" ? T("estimateNum") : T("estimateTF")),
            h("p", { class: "booklet-q" }, L(e.q)),
            h("p", { class: "booklet-a" }, L(e.detail)),
            h("p", { class: "small muted" }, L(c.name) + " · " + T("source") + ": " + e.source));
        })),
        h("p", { class: "note" }, T("estP", { a: D.estimates.length }))));
  };
})();
