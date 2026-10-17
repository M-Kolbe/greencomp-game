/* GreenComp Trails — the joker: a group writes its own card for the place.
 * The JRC set has three blank jokers and no rule for them. Here the joker gets a job and the same parts as every
 * competence card: a question from everyday life, three steps that start with a doing word, a clear end.
 * A live check uses the rules of SPRACHE.md. Jokers stay on this device and can be printed with the set. */
(function () {
  "use strict";
  var G = window.GCT, D = G.D, h = G.h, T = G.T, L = G.L, put = G.put, store = G.store;
  var MAX = 24;

  function words(s) { return (s || "").trim().split(/\s+/).filter(Boolean).length; }
  function blank(comp) { return { id: null, comp: comp || "", own: "", q: "", steps: ["", "", ""], done: "" }; }
  function copy(j) { return { id: j.id || null, comp: j.comp || "", own: j.own || "", q: j.q || "", steps: (j.steps || []).concat(["", "", ""]).slice(0, 3), done: j.done || "", at: j.at }; }
  G.saveJoker = function (j) {
    var list = G.jokers(), out = copy(j);
    out.at = new Date().toISOString();
    if (!out.id) out.id = "j" + Date.now().toString(36);
    list = list.filter(function (x) { return x.id !== out.id; });
    list.unshift(out); store.set("jokers", list.slice(0, MAX));
    G.award && G.award("joker");
    return out;
  };
  G.deleteJoker = function (id) { store.set("jokers", G.jokers().filter(function (x) { return x.id !== id; })); };
  /* What the joker still needs before it can be played, or null. */
  G.jokerNeed = function (j) {
    if (!G.COMP[j.comp]) return T("jNeedComp");
    if (!(j.q || "").trim()) return T("jNeedQ");
    if (!(j.steps || []).some(function (x) { return (x || "").trim(); })) return T("jNeedStep");
    return null;
  };
  G.jokerText = function (j) {
    var c = G.COMP[j.comp], lines = [T("tJoker") + " · " + G.jokerName(j)];
    if (c && (j.own || "").trim()) lines.push(T("jokerNear", { name: L(c.name) }));
    lines.push((j.q || "").trim());
    (j.steps || []).filter(function (x) { return (x || "").trim(); }).forEach(function (x, i) { lines.push((i + 1) + ". " + x.trim()); });
    if ((j.done || "").trim()) lines.push("✓ " + j.done.trim());
    return lines.join("\n");
  };

  /* The editor: fields on one side, the card as it will look on the other, and a short language check below.
   * opts: { joker, comp, comps (ids to offer first), onSave(j), saveLabel } */
  G.jokerEditor = function (opts) {
    opts = opts || {};
    var J = opts.joker ? copy(opts.joker) : blank(opts.comp);
    var uid = "je" + Math.random().toString(36).slice(2, 6);
    var preview = h("div", { class: "je-preview" });
    var checks = h("ul", { class: "je-checks", "aria-live": "polite" });
    var msg = h("p", { class: "small muted", role: "status" });

    var sel = h("select", { id: uid + "-comp" }, h("option", { value: "" }, T("jPickComp")), D.areas.map(function (a) {
      return h("optgroup", { label: L(a.name) }, D.competences.filter(function (c) { return c.area === a.id; }).map(function (c) { return h("option", { value: c.id, selected: c.id === J.comp }, c.no + " " + L(c.name)); }));
    }));
    function input(key, max, ph) {
      var el = h("input", { type: "text", id: uid + "-" + key, maxlength: String(max), placeholder: ph || "", autocomplete: "off" });
      el.value = J[key] || "";
      el.addEventListener("input", function () { J[key] = el.value; update(); });
      return el;
    }
    var own = input("own", 40, T("jOwnPh")), q = input("q", 100, T("jQPh")), done = input("done", 90, T("jDonePh"));
    var stepInputs = [0, 1, 2].map(function (i) {
      var el = h("input", { type: "text", id: uid + "-s" + i, maxlength: "140", placeholder: T("jStepPh" + (i + 1)), autocomplete: "off", "aria-label": T("jStep", { n: i + 1 }) });
      el.value = J.steps[i] || "";
      el.addEventListener("input", function () { J.steps[i] = el.value; update(); });
      return h("div", { class: "je-step" }, h("span", { class: "je-n", "aria-hidden": "true" }, String(i + 1)), el);
    });
    sel.addEventListener("change", function () { J.comp = sel.value; update(); });

    function check(ok, text) { return h("li", { class: ok ? "ok" : "todo" }, h("span", { "aria-hidden": "true" }, ok ? "✓" : "•"), " ", text); }
    function update() {
      var c = G.COMP[J.comp];
      put(preview, G.jokerCard(Object.assign({}, J, { at: J.at || new Date().toISOString() })));
      var filled = J.steps.filter(function (x) { return (x || "").trim(); });
      var long = J.steps.concat([J.q, J.done]).some(function (x) { return words(x) > 20; });
      var qs = (J.q || "").trim();
      put(checks,
        check(!!c, T("jChkComp")),
        check(/\?\s*$/.test(qs), T("jChkQ")),
        check(filled.length === 3, T("jChkSteps")),
        check(!!(J.done || "").trim(), T("jChkDone")),
        check(qs && !long, T("jChkShort")), fitLi);
      msg.textContent = "";
      /* the card is printed at 70 x 120 mm: say when the text no longer fits */
      requestAnimationFrame(function () {
        var b = preview.querySelector(".card-body"), fits = !b || !b.isConnected || b.scrollHeight <= b.clientHeight + 1;
        put(fitLi, h("span", { "aria-hidden": "true" }, fits ? "✓" : "!"), " ", fits ? T("jChkFits") : T("jChkTooLong"));
        fitLi.className = fits ? "ok" : "warn";
      });
    }
    var fitLi = h("li", { class: "ok" });
    function fill(j) {
      J = copy(Object.assign({}, j, { id: J.id }));
      sel.value = J.comp; own.value = J.own; q.value = J.q; done.value = J.done;
      stepInputs.forEach(function (row, i) { row.querySelector("input").value = J.steps[i] || ""; });
      update();
    }
    var example = h("button", { type: "button", class: "btn btn--small btn--ghost", onclick: function () {
      var ex = D.joker.example;
      fill({ comp: J.comp || ex.comp, own: "", q: L(ex.q), steps: ex.steps.map(L), done: L(ex.done) });
    } }, "✦ " + T("jExample"));
    var clear = h("button", { type: "button", class: "btn btn--small btn--ghost", onclick: function () { fill(blank(J.comp)); } }, "↺ " + T("jClear"));
    var save = h("button", { type: "button", class: "btn btn--sign btn--big", onclick: function () {
      var need = G.jokerNeed(J);
      if (need) { msg.textContent = need; return; }
      var saved = G.saveJoker(J); J.id = saved.id; J.at = saved.at;
      msg.textContent = "✓ " + T("jSaved");
      if (opts.onSave) opts.onSave(saved);
    } }, opts.saveLabel || "✓ " + T("jSave"));

    update();
    var el = h("div", { class: "je" },
      h("div", { class: "je-form stack" },
        h("div", { class: "field" }, h("label", { for: uid + "-comp" }, T("jCompL")), sel,
          h("details", { class: "je-own" }, h("summary", null, L(D.joker.missing)), h("div", { class: "field" }, h("label", { for: uid + "-own" }, T("jOwnL")), own))),
        h("div", { class: "field" }, h("label", { for: uid + "-q" }, T("jokerQ")), h("p", { class: "small muted" }, T("jQHint")), q),
        h("fieldset", { class: "field je-steps" }, h("legend", null, T("makeReal")), h("p", { class: "small muted" }, T("jStepsHint")), stepInputs),
        h("div", { class: "field" }, h("label", { for: uid + "-done" }, T("jokerDone")), done),
        h("p", { class: "small muted" }, T("jMaterial")),
        h("div", { class: "row" }, save, example, clear), msg),
      h("div", { class: "je-side stack" }, h("p", { class: "eyebrow" }, T("jPreview")), preview,
        h("div", { class: "panel je-check" }, h("h3", null, T("jCheckT")), checks)));
    return { el: el, get: function () { return copy(J); } };
  };

  /* The page: write a joker, and the jokers written on this device. */
  G.pages.joker = function (app) {
    var listBox = h("div", { class: "stack" });
    var editorBox = h("div");
    function openEditor(j) {
      var ed = G.jokerEditor({ joker: j, onSave: function () { paintList(); } });
      put(editorBox, ed.el);
    }
    function paintList() {
      var list = G.jokers();
      if (!list.length) { put(listBox, h("p", { class: "muted" }, T("jNone"))); return; }
      var pairs = list.map(function (j) { return [G.jokerCard(j), G.jokerBack()]; });
      put(listBox, h("div", { class: "joker-list" }, list.map(function (j, i) {
        var card = G.zoomable(G.jokerCard(j), pairs, i);
        var msg = h("p", { class: "small muted", "aria-live": "polite" }), area = h("textarea", { class: "copy-area", hidden: true, readonly: true, "aria-label": T("tJoker") });
        return h("div", { class: "joker-item" }, card,
          h("div", { class: "row" },
            h("button", { type: "button", class: "btn btn--small", onclick: function () { openEditor(j); window.scrollTo({ top: editorBox.getBoundingClientRect().top + window.scrollY - 80, behavior: G.reduced ? "auto" : "smooth" }); } }, "✎ " + T("jEdit")),
            h("button", { type: "button", class: "btn btn--small btn--ghost", onclick: function () { G.copyText(G.jokerText(j), msg, area); } }, T("jCopy")),
            h("button", { type: "button", class: "btn btn--small btn--ghost", onclick: function () { G.deleteJoker(j.id); paintList(); } }, "✕ " + T("jDelete"))), msg, area);
      })), h("div", { class: "row" }, h("a", { class: "btn btn--small", href: "#set", onclick: function () { G.setFilterTo && G.setFilterTo("joker"); } }, "🖨 " + T("jPrint"))));
    }
    openEditor(null); paintList();
    app.append(
      h("section", { class: "wrap page-head" }, h("p", { class: "eyebrow" }, T("tJoker")), h("h1", null, T("jTitle")), h("p", { class: "lead" }, L(D.joker.back)),
        h("ol", { class: "rules3 joker-rules" }, h("li", null, L(D.joker.rule)), h("li", null, T("jRule2")), h("li", null, T("jRule3")))),
      h("section", { class: "wrap stack", style: { paddingBottom: "18px" } }, h("div", { class: "panel" }, editorBox)),
      h("section", { class: "wrap stack", style: { paddingBottom: "48px" } }, h("h2", { class: "display" }, T("jMine")), listBox,
        h("p", { class: "small muted" }, T("jPrivacy"))));
  };
})();
