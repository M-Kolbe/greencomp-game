/* GreenComp Trails — playing: «Five minutes at this table», «The walk» and the estimate training. */
(function () {
  "use strict";
  var G = window.GCT, D = G.D, A = G.A, h = G.h, s = G.s, T = G.T, L = G.L, put = G.put, Voice = G.Voice, store = G.store;

  G.signalKind = function () { return store.get("signal", "blackbird"); };

  /* ================= hourglass ================= */
  function hourglass() {
    var glassD = "M22 12H98C98 58 68 78 64 100C68 122 98 142 98 188H22C22 142 52 122 56 100C52 78 22 58 22 12Z";
    var cid = "hg" + Math.random().toString(36).slice(2, 7);
    var top = s("rect", { x: 0, y: 30, width: 120, height: 70, class: "sand" });
    var bottom = s("rect", { x: 0, y: 188, width: 120, height: 0, class: "sand" });
    var stream = s("rect", { x: 59, y: 100, width: 2, height: 0, class: "sand" });
    var svg = s("svg", { class: "hourglass", viewBox: "0 0 120 200", "aria-hidden": "true" },
      s("defs", null, s("clipPath", { id: cid }, s("path", { d: glassD }))),
      s("rect", { x: 10, y: 2, width: 100, height: 10, rx: 3, class: "frame" }), s("rect", { x: 10, y: 188, width: 100, height: 10, rx: 3, class: "frame" }),
      s("g", { "clip-path": "url(#" + cid + ")" }, top, bottom, stream), s("path", { d: glassD, class: "glass" }));
    return { el: svg, set: function (p) {
      p = Math.max(0, Math.min(1, p));
      top.setAttribute("y", 30 + 70 * p); top.setAttribute("height", 70 * (1 - p));
      var by = 188 - 74 * p; bottom.setAttribute("y", by); bottom.setAttribute("height", 188 - by);
      stream.setAttribute("height", p > 0 && p < 1 ? Math.max(0, by - 100) : 0);
    } };
  }

  /* ================= spark wheel ================= */
  function sparkWheel(onDone) {
    var n = D.sparks.length, R = 120, segs = [];
    var cols = ["--a-values", "--a-complex", "--a-futures", "--a-acting", "--sign", "--blaze"];
    D.sparks.forEach(function (sp, i) {
      var a0 = (i / n) * 2 * Math.PI - Math.PI / 2, a1 = ((i + 1) / n) * 2 * Math.PI - Math.PI / 2, am = (a0 + a1) / 2;
      segs.push(s("path", { d: "M0 0L" + (R * Math.cos(a0)) + " " + (R * Math.sin(a0)) + "A" + R + " " + R + " 0 0 1 " + (R * Math.cos(a1)) + " " + (R * Math.sin(a1)) + "Z", fill: "var(" + cols[i % cols.length] + ")", stroke: "var(--paper)", "stroke-width": 3 }));
      var tx = Math.cos(am) * R * 0.6, ty = Math.sin(am) * R * 0.6, words = L(sp.name).split(" "), lines = [L(sp.name)];
      if (words.length > 1 && L(sp.name).length > 10) { var half = Math.ceil(words.length / 2); lines = [words.slice(0, half).join(" "), words.slice(half).join(" ")]; }
      segs.push(s("text", { x: tx, y: ty, "text-anchor": "middle", transform: "rotate(" + (am * 180 / Math.PI + 90) + " " + tx + " " + ty + ")", class: "wheel-t" + (L(sp.name).length > 12 && lines.length === 1 ? " wheel-t--small" : "") },
        lines.map(function (ln, k) { return s("tspan", { x: tx, dy: k === 0 ? (lines.length > 1 ? "-0.35em" : "0.35em") : "1.15em", text: ln }); })));
    });
    var rot = s("g", { class: "wheel-rot" }, segs, s("circle", { r: 16, fill: "var(--paper)", stroke: "var(--ink)", "stroke-width": 3 }));
    var svg = s("svg", { class: "wheel", viewBox: "-130 -140 260 270", role: "img", "aria-label": T("spinWheel") },
      rot, s("path", { d: "M-12 -136h24l-12 22z", fill: "var(--ink)" }));
    var turns = 0;
    return { el: svg, spin: function () {
      var k = Math.random() * n | 0;
      turns += 5;
      var deg = turns * 360 - (k + 0.5) * (360 / n);
      rot.style.transition = G.reduced ? "none" : "transform 3.2s cubic-bezier(.15,.85,.2,1)";
      rot.style.transform = "rotate(" + deg + "deg)";
      setTimeout(function () { onDone(D.sparks[k]); }, G.reduced ? 50 : 3300);
    } };
  }

  G.hourglass = hourglass;
  G.sparkWheel = sparkWheel;

  /* ================= five minutes ================= */
  G.openFive = function (id) {
    var c = G.COMP[id];
    var ov = G.overlay({ label: T("fiveTitle", { name: L(c.name) }) });
    var trail = null, spark = null, tl = null, raf = 0, orient = null;
    function cleanup() { if (tl) tl.stop(); cancelAnimationFrame(raf); G.Wake.off(); if (orient) window.removeEventListener("deviceorientation", orient); var r = G.$(".resting"); if (r) r.remove(); }
    var origClose = ov.close; ov.close = function () { cleanup(); origClose(); };
    var summary = h("div", { class: "panel five-card", style: { "--area": G.areaVar(G.AREA[c.area]) } }, h("p", { class: "eyebrow" }, c.no + " " + L(c.name)), h("p", { class: "card-q" }, L(c.question)), G.taskBlock(c, false));
    var dots = h("div", { class: "stepper", "aria-hidden": "true" }, h("i"), h("i"), h("i"), h("i"));
    function stepDots(k) { Array.prototype.forEach.call(dots.children, function (d, i) { d.className = i < k ? "done" : i === k ? "now" : ""; }); }
    var stepBox = h("div", { class: "stack" });
    ov.body.append(dots, summary, stepBox);

    function stepTrail() {
      stepDots(0);
      var fan = h("div", { class: "trail-fan" }, D.trails.map(function (t) { return h("div", { class: "flip3d" }, h("div", { class: "flip3d-inner" }, h("div", { class: "flip3d-face" }, G.trailMini(t, true)), h("div", { class: "flip3d-face flip3d-back" }, G.trailMini(t, false)))); }));
      var pickBox = h("div", { class: "trail-pick" }, D.trails.map(function (t) { return h("button", { type: "button", class: "btn", onclick: function () { trail = t; stepSpark(); } }, L(t.name) + ": " + L(t.motto)); }));
      var drawBtn = h("button", { type: "button", class: "btn btn--sign btn--big", onclick: function () {
        drawBtn.disabled = true;
        var k = Math.random() * D.trails.length | 0, cards = fan.children;
        if (!G.reduced) fan.classList.add("shuffling");
        setTimeout(function () {
          fan.classList.remove("shuffling");
          Array.prototype.forEach.call(cards, function (el, i) { el.classList.toggle("dim", i !== k); });
          cards[k].classList.add("flipped");
          trail = D.trails[k];
          setTimeout(stepSpark, G.reduced ? 300 : 1500);
        }, G.reduced ? 0 : 1000);
      } }, T("drawTrail"));
      put(stepBox, fan, h("div", { class: "row", style: { justifyContent: "center" } }, drawBtn),
        h("details", { class: "panel" }, h("summary", null, T("chooseTrail")), pickBox));
    }
    function trailPanel() {
      return h("div", { class: "row trail-row" },
        h("div", { class: "trail-row-card" }, G.trailMini(trail, false)),
        h("div", { class: "stack", style: { flex: "1", minWidth: "200px", alignContent: "center" } }, h("p", { class: "eyebrow" }, T("trailIs")), h("p", { class: "lead" }, L(trail.change)),
          spark ? h("p", { class: "spark-line" }, G.icon("spark"), h("b", null, L(spark.name) + ": "), L(spark.text)) : null));
    }
    function stepSpark() {
      if (ov.closed) return;
      stepDots(1);
      var result = h("p", { class: "lead", "aria-live": "polite" });
      var wheel = sparkWheel(function (sp) { spark = sp; put(result, h("b", null, L(sp.name) + ": "), L(sp.text)); G.award("spark"); setTimeout(stepTimer, 1600); });
      var spinBtn = h("button", { type: "button", class: "btn btn--sign", onclick: function () { spinBtn.disabled = true; noBtn.disabled = true; wheel.spin(); } }, T("spinWheel"));
      var noBtn = h("button", { type: "button", class: "btn", onclick: function () { spark = null; stepTimer(); } }, T("noSpark"));
      put(stepBox, trailPanel(), h("p", null, T("sparkQ")), h("div", { class: "wheel-wrap" }, wheel.el), h("div", { class: "row", style: { justifyContent: "center" } }, spinBtn, noBtn), result);
    }
    function stepTimer() {
      if (ov.closed) return;
      stepDots(2);
      var hg = hourglass(), clock = h("p", { class: "clock" }, "5:00");
      var phase = h("p", { class: "lead", "aria-live": "polite" }, T("doTask"));
      var startBtn = h("button", { type: "button", class: "btn btn--sign btn--big" }, T("startSand"));
      var skipBtn = h("button", { type: "button", class: "btn btn--ghost", onclick: function () {
        if (tl) tl.stop(); cancelAnimationFrame(raf); G.Wake.off(); Voice.cancel(); var r = G.$(".resting"); if (r) r.remove(); stepEnd();
      } }, "⏭ " + T("skipTime"));
      put(stepBox, trailPanel(), h("div", { class: "timer-grid" }, hg.el, h("div", { class: "stack" }, clock, phase, h("div", { class: "row" }, startBtn, skipBtn), h("p", { class: "muted small" }, T("sandHint")))));
      var DUR = 300;
      function loop() { if (tl) { hg.set(tl.elapsed / DUR); clock.textContent = G.mmss(DUR - tl.elapsed); } raf = requestAnimationFrame(loop); }
      startBtn.addEventListener("click", function () {
        if (tl && tl.running) { tl.pause(); startBtn.textContent = T("resume"); return; }
        if (tl && !tl.ended) { tl.play(); startBtn.textContent = T("pause"); return; }
        A.ensure(); A.signal(G.signalKind(), false); G.Wake.on();
        tl = G.Timeline(DUR, [{ at: 240, fn: function () { phase.textContent = T("oneSentence"); A.signal(G.signalKind(), false); } }], {
          onEnd: function () { cancelAnimationFrame(raf); hg.set(1); clock.textContent = "0:00"; phase.textContent = T("timeUp"); A.signal(G.signalKind(), true); G.Wake.off(); var r = G.$(".resting"); if (r) r.remove(); setTimeout(stepEnd, 2600); }
        });
        tl.play(); startBtn.textContent = T("pause");
        cancelAnimationFrame(raf); loop();
        if (!orient && "DeviceOrientationEvent" in window) {
          orient = function (e) {
            var down = e.beta != null && Math.abs(e.beta) > 150, r = G.$(".resting");
            if (down && !r && tl && tl.running) document.body.appendChild(h("div", { class: "resting", role: "status" }, T("resting")));
            if (!down && r) r.remove();
          };
          window.addEventListener("deviceorientation", orient);
        }
      });
    }
    function stepEnd() {
      if (ov.closed) return;
      stepDots(3);
      G.markPlayed({ comp: id, trail: trail && trail.id });
      G.award("first");
      var ta = h("textarea", { id: "five-promise", placeholder: T("promisePh") });
      var msg = h("p", { class: "small muted", "aria-live": "polite" });
      var outMsg = h("p", { class: "muted", "aria-live": "polite" });
      var outRow = h("div", { class: "row" },
        h("button", { type: "button", class: "btn btn--sign", onclick: function () { G.award("outside"); put(outRow); outMsg.textContent = "✓"; } }, "☀ " + T("yesOutside")),
        h("button", { type: "button", class: "btn", onclick: function () { put(outRow); outMsg.textContent = T("nextTime"); } }, T("noInside")));
      put(stepBox,
        h("p", { class: "lead" }, T("timeUp")),
        h("div", { class: "panel" }, h("h3", null, T("outsideQ")), outRow, outMsg),
        h("div", { class: "panel" }, h("div", { class: "field" }, h("label", { for: "five-promise" }, T("writePromise")), ta),
          h("div", { class: "row" }, h("button", { type: "button", class: "btn btn--sign", onclick: function () { if (G.savePromise(ta.value, id)) { msg.textContent = T("saved"); ta.value = ""; } } }, T("save"))), msg),
        h("div", { class: "row" }, h("button", { type: "button", class: "btn", onclick: function () { ov.close(); G.drawnId = G.pick(D.competences.filter(function (x) { return x.id !== id; })).id; if (location.hash.length > 1) location.hash = ""; else G.route(); } }, T("anotherCard"))));
    }
    stepTrail();
  };

  /* ================= the walk ================= */
  G.openWalk = function (id) {
    var c = G.COMP[id], e = G.estsFor(id)[0] || null;
    var talkIdx = store.get("walkTalk", 0) % 2;
    var segs = D.walk.filter(function (sg) { return sg.id !== "estimate" || e; });
    function fill(str) {
      return str.replace("{q}", G.compQ(c, true)).replace("{task}", L(c.solo)).replace("{talk}", G.compTalk(c, talkIdx, true))
        .replace("{eq}", e ? L(e.q) : "").replace("{ed}", e ? L(e.detail) : "");
    }
    var total = segs.reduce(function (n, sg) { return n + sg.dur; }, 0);
    var ov = G.overlay({ label: T("walkTitle", { name: L(c.name) }), cls: "ov--night ov--walk" });
    var tl = null, starts = [], cur = -1, sayTimer = 0, skippedSilence = false;
    var dots = h("div", { class: "walk-dots", "aria-hidden": "true" }, segs.map(function () { return h("i"); }));
    var stepLbl = h("p", { class: "eyebrow" }), title = h("h2", { tabindex: "-1" }), say = h("p", { class: "say" });
    var extra = h("div", { class: "stack", style: { justifyItems: "center", width: "100%" } });
    var left = h("p", { class: "muted num", style: { textAlign: "center" } });
    var pauseBtn = h("button", { type: "button", class: "btn btn--sign" }, T("pause"));
    var backBtn = h("button", { type: "button", class: "btn" }, "← " + T("prevStep"));
    var skipBtn = h("button", { type: "button", class: "btn" }, T("nextStep") + " →");
    var live = h("div", { class: "walk-step", "aria-live": "polite" }, stepLbl, title, say, extra);
    function teardown() { if (tl) tl.stop(); clearTimeout(sayTimer); Voice.cancel(); G.Wake.off(); }
    var origClose = ov.close; ov.close = function () { teardown(); origClose(); };

    function sky(p) { ov.el.style.setProperty("--walk-p", p.toFixed(3)); }
    function show(i) {
      if (cur >= 0 && segs[cur].id === "silence" && i === cur + 1 && !skippedSilence) G.award("silence");
      cur = i; var sg = segs[i];
      Array.prototype.forEach.call(dots.children, function (d, k) { d.className = k < i ? "done" : k === i ? "now" : ""; });
      stepLbl.textContent = T("stepOf", { i: i + 1, n: segs.length });
      title.textContent = L(sg.title);
      var text = sg.id === "estimate" ? fill(L(e.type === "truefalse" ? sg.sayTF : sg.say)) : fill(L(sg.say));
      say.textContent = text; extra.replaceChildren();
      if (sg.id === "silence") { skippedSilence = false; extra.append(h("div", { class: "breath", "aria-hidden": "true" }), h("p", { class: "muted" }, T("silenceLeft"))); }
      if (sg.id === "promise") {
        var ta = h("textarea", { id: "walk-promise", placeholder: T("promisePh") }), msg = h("p", { class: "small muted" });
        extra.append(h("div", { class: "field", style: { width: "min(520px, 100%)", textAlign: "left" } }, h("label", { for: "walk-promise" }, T("writePromise")), ta),
          h("button", { type: "button", class: "btn", onclick: function () { if (G.savePromise(ta.value, id)) { msg.textContent = T("saved"); ta.value = ""; } } }, T("save")), msg);
      }
      /* A bird marks every new step; after a three-minute block it sings a whole song. */
      var full = i > 0 && segs[i - 1].dur >= 120;
      var d = A.signal(G.signalKind(), full) || 0;
      clearTimeout(sayTimer);
      sayTimer = setTimeout(function () { Voice.speak(text, "narrator"); }, Math.min(3, d * 0.8) * 1000 + 300);
    }
    function reveal() {
      var sg = segs[cur]; if (!sg || sg.id !== "estimate") return;
      put(extra, h("p", { class: "eyebrow" }, T("estAnswer")), h("p", { class: "lead" }, L(e.detail)), h("p", { class: "small muted" }, T("source") + ": " + e.source));
      Voice.speak(fill(L(sg.reveal)), "narrator");
    }
    function finish() {
      teardown();
      var walks = store.get("walks", {}); walks[id] = new Date().toISOString(); store.set("walks", walks);
      store.set("walkTalk", store.get("walkTalk", 0) + 1);
      A.signal(G.signalKind(), true);
      G.markPlayed({ comp: id });
      G.award("first");
      var n = Object.keys(walks).length;
      if (n >= 3) G.award("walks3");
      if (n >= 12) G.award("walks12");
      sky(1);
      put(ov.body, h("div", { class: "walk-step" },
        h("div", { class: "breath", "aria-hidden": "true" }),
        h("h2", { tabindex: "-1" }, T("walkDone")), h("p", { class: "say" }, T("walkDoneP")),
        h("a", { class: "btn btn--sign", href: "#spuren", onclick: function () { ov.close(); } }, T("toMyTrail"))));
      var hh = G.$("h2", ov.body); if (hh) hh.focus();
    }
    function startWalk() {
      A.ensure();
      var t = 0, cues = [];
      segs.forEach(function (sg, i) {
        starts.push(t);
        cues.push({ at: t, fn: function () { show(i); } });
        if (sg.id === "estimate") cues.push({ at: t + 30, fn: reveal });
        t += sg.dur;
      });
      tl = G.Timeline(total, cues, { onTick: function (el) { left.textContent = T("left", { t: G.mmss(total - el) }); sky(el / total); }, onEnd: finish });
      put(ov.body, dots, live, left, h("div", { class: "controls" }, backBtn, pauseBtn, skipBtn, G.voiceToggle()), e ? null : h("p", { class: "note" }, T("noEstimate")));
      tl.play();
    }
    pauseBtn.addEventListener("click", function () {
      if (!tl) return;
      if (tl.running) { tl.pause(); clearTimeout(sayTimer); Voice.cancel(); pauseBtn.textContent = T("resume"); }
      else { tl.play(); pauseBtn.textContent = T("pause"); }
    });
    skipBtn.addEventListener("click", function () { if (!tl) return; if (segs[cur] && segs[cur].id === "silence") skippedSilence = true; Voice.cancel(); if (cur + 1 < segs.length) tl.skipTo(starts[cur + 1]); else tl.skipTo(total); });
    backBtn.addEventListener("click", function () { if (!tl) return; Voice.cancel(); tl.skipTo(starts[Math.max(0, cur - (tl.elapsed - starts[cur] < 4 ? 1 : 0))]); });

    var awake = h("input", { type: "checkbox", id: "walk-awake", checked: true });
    var vOn = h("input", { type: "checkbox", id: "walk-voice", checked: Voice.on, disabled: !Voice.ok });
    var sigBox = h("div", { class: "chips sig-chips", role: "radiogroup", "aria-label": T("signal") });
    function paintSig() {
      var cur2 = G.signalKind();
      put(sigBox, D.signals.map(function (sg) {
        return h("button", { type: "button", class: "chip", role: "radio", "aria-checked": String(sg.id === cur2), onclick: function () { store.set("signal", sg.id); paintSig(); A.ensure(); A.signal(sg.id, false); } }, "♪ " + L(sg.name));
      }));
    }
    paintSig();
    ov.body.append(h("div", { class: "walk-step" },
      G.icon("walk", "walk-ico"),
      h("h2", { tabindex: "-1" }, G.compQ(c, true)),
      h("p", { class: "say" }, T("walkIntro")),
      h("p", { class: "muted" }, T("walkLen", { m: Math.round(total / 60) })),
      h("div", { class: "panel walk-settings" },
        h("label", { class: "row", for: "walk-voice", style: { gap: "10px" } }, vOn, Voice.ok ? T("voiceOn") : T("noVoice")),
        h("label", { class: "row", for: "walk-awake", style: { gap: "10px" } }, awake, T("keepAwake")),
        h("p", null, h("b", null, T("signal"))), sigBox,
        h("p", { class: "small muted" }, T("signalNote"))),
      h("button", { type: "button", class: "btn btn--sign btn--big", onclick: function () {
        Voice.set(vOn.checked && Voice.ok);
        if (awake.checked) G.Wake.on();
        startWalk();
      } }, "▶ " + T("startWalk")),
      h("p", { class: "note", style: { textAlign: "left" } }, T("walkVoiceNote"))));
  };

  /* ================= estimate training ================= */
  G.pages.schaetzen = function (app) {
    var cards = G.shuffle(D.estimates), i = 0, results = [];
    var box = h("div", { class: "train" });
    function logRange(e) { return e.unit && L(e.unit) === "%" ? null : [1, Math.pow(10, Math.ceil(Math.log10(e.answer) + 1.5))]; }
    function paint() {
      if (i >= cards.length) return done();
      var e = cards[i], c = G.COMP[e.comp], a = G.AREA[c.area];
      var dots = h("div", { class: "stepper wide", "aria-hidden": "true" }, cards.map(function (_, k) { return h("i", { class: k < i ? "done" : k === i ? "now" : "" }); }));
      var head = h("div", { class: "panel train-card", style: { "--area": G.areaVar(a) } },
        h("p", { class: "eyebrow" }, T("cardOf", { i: i + 1, n: cards.length }) + " · " + L(c.name)),
        h("span", { class: "est-kind" }, e.type === "number" ? T("estimateNum") : T("estimateTF")),
        h("p", { class: "est-q" }, L(e.q)));
      var answerBox = h("div", { class: "stack" });
      function lock(val) {
        var sc = e.type === "number" ? G.scoreNum(val, e.answer) : (val === e.answer ? 100 : 0);
        results.push({ e: e, v: val, sc: sc });
        if (e.type === "number" && Math.abs(val - e.answer) / e.answer <= 0.1) G.award("spoton");
        var vizBox = h("div", { class: "viz" });
        put(answerBox,
          h("p", { class: "answer-big num" }, G.answerText(e)),
          h("p", { class: "lead" }, L(e.detail)),
          e.type === "number" ? G.guessScale(e, [{ v: val, name: T("yourGuess"), color: G.cssVar("--a-complex") }]) : h("p", { class: "lead" }, (val === e.answer ? "✓ " + T("quizRight") : "✗ " + T("quizWrong"))),
          vizBox,
          h("p", { class: "small muted" }, T("source") + ": " + e.source),
          h("div", { class: "row" }, h("span", { class: "score-pill" }, T("accuracy") + ": " + sc + " %"),
            h("button", { type: "button", class: "btn btn--sign", onclick: function () { i++; paint(); } }, T("nextCard") + " →")));
        G.drawViz(e, vizBox);
      }
      if (e.type === "number") {
        var rng = logRange(e), num = h("input", { type: "number", id: "train-num", min: "0", step: "any", inputmode: "decimal" });
        var slider = h("input", { type: "range", id: "train-range", min: "0", max: "1000", value: "500", "aria-label": T("yourGuess") });
        function fromSlider() { var x = +slider.value / 1000; return rng ? Math.round(rng[0] * Math.pow(rng[1] / rng[0], x)) : Math.round(x * 100); }
        function toSlider(v) { return rng ? Math.round(1000 * Math.log(Math.max(rng[0], v) / rng[0]) / Math.log(rng[1] / rng[0])) : Math.round(v * 10); }
        num.value = fromSlider();
        slider.addEventListener("input", function () { num.value = fromSlider(); });
        num.addEventListener("input", function () { var v = parseFloat(String(num.value).replace(",", ".")); if (isFinite(v)) slider.value = toSlider(v); });
        var lockBtn = h("button", { type: "button", class: "btn btn--sign", onclick: function () { var v = parseFloat(String(num.value).replace(",", ".")); if (!(v > 0)) { num.focus(); return; } slider.disabled = num.disabled = lockBtn.disabled = true; lock(v); } }, T("lockIn"));
        put(answerBox, h("div", { class: "field" }, h("label", { for: "train-num" }, T("yourGuess") + " (" + L(e.unit) + ")"), slider, h("div", { class: "row" }, num, h("span", { class: "muted" }, L(e.unit)), lockBtn)));
      } else {
        var b1 = h("button", { type: "button", class: "btn btn--big", onclick: function () { b1.disabled = b2.disabled = true; lock(true); } }, "👍 " + T("trueBtn"));
        var b2 = h("button", { type: "button", class: "btn btn--big", onclick: function () { b1.disabled = b2.disabled = true; lock(false); } }, "👎 " + T("falseBtn"));
        put(answerBox, h("div", { class: "row" }, b1, b2));
      }
      box.style.setProperty("--area", G.areaVar(a));
      put(box, dots, head, answerBox);
    }
    function done() {
      var avg = Math.round(results.reduce(function (n, r) { return n + r.sc; }, 0) / results.length);
      var cv = h("canvas", { "aria-hidden": "true" });
      put(box, h("div", { class: "winner" }, cv, h("p", { class: "eyebrow", style: { position: "relative" } }, T("trainTitle")), h("h2", null, avg + " %"), h("p", { class: "lead" }, T("trainDone", { p: avg }))),
        h("div", { class: "tbl-wrap" }, h("table", null, h("tbody", null, results.map(function (r) { return h("tr", null, h("td", null, L(r.e.q)), h("td", { class: "num" }, r.e.type === "number" ? G.fmt(r.v) : (r.v ? T("trueBtn") : T("falseBtn"))), h("td", { class: "num" }, G.answerText(r.e)), h("td", { class: "num" }, r.sc + " %")); })))),
        h("div", { class: "row" }, h("button", { type: "button", class: "btn btn--sign", onclick: function () { cards = G.shuffle(D.estimates); i = 0; results = []; paint(); } }, T("again")), h("a", { class: "btn", href: "#tafel" }, T("openBoard"))));
      setTimeout(function () { G.onLeave(G.leaves(cv, 6)); }, 50);
    }
    app.append(
      h("section", { class: "wrap page-head" }, h("p", { class: "eyebrow" }, T("tileTrainT")), h("h1", null, T("trainTitle")), h("p", { class: "lead" }, T("trainLead"))),
      h("section", { class: "wrap", style: { paddingBottom: "48px" } }, box));
    paint();
  };
})();
