/* GreenComp Trails — the board (Tafel): one screen for the room.
 * Station sound, room clock, estimates per group with reveal, sparks and finds, and at the end the comparison round of the original.
 * Points for people, the group of the day and the trail master only when the game leader switches points on. */
(function () {
  "use strict";
  var G = window.GCT, D = G.D, A = G.A, h = G.h, s = G.s, T = G.T, L = G.L, put = G.put, store = G.store;

  var GROUP_NAMES = { en: ["Kingfishers", "Badgers", "Foxes", "Owls", "Beavers", "Swifts", "Hedgehogs", "Otters"], de: ["Eisvögel", "Dachse", "Füchse", "Eulen", "Biber", "Mauersegler", "Igel", "Otter"] };
  var GROUP_COLORS = ["--a-values", "--a-complex", "--a-futures", "--a-acting", "--sign", "--blaze", "--ink-2", "--a-values"];
  /* Eleven minutes per station with the twenty seconds of listening: task, talk, estimate, one sentence and a find. */
  var PHASES = [["phTask", 240], ["phTalk", 180], ["phEst", 120], ["phSentence", 100]];
  function pts() { return G.withPoints && G.withPoints(); }
  function minLabel(sec) { return sec % 60 ? G.mmss(sec) : (sec / 60) + " min"; }
  function gcol(i) { return "var(" + GROUP_COLORS[i % GROUP_COLORS.length] + ")"; }

  function defaultEst(areaId) {
    var e = D.estimates.find(function (x) { return G.COMP[x.comp].area === areaId && x.type === "number"; }) || D.estimates.find(function (x) { return G.COMP[x.comp].area === areaId; });
    return e ? e.id : null;
  }
  function tfDefault() {
    return { v: 2, started: false, view: "setup",
      groups: GROUP_NAMES[G.lang].slice(0, 4).map(function (n) { return { name: n, players: [] }; }),
      stations: D.areas.map(function (a) { return { area: a.id, est: defaultEst(a.id) }; }),
      inputs: {}, revealed: {}, pts: {}, log: [], track: {}, choices: {}, finalChoice: {}, plans: {}, sdgs: {} };
  }
  var TF = null;
  function save() { store.set("tafel", TF); }
  function estById(id) { return D.estimates.find(function (e) { return e.id === id; }); }
  function groupScore(e, gi) { var v = (TF.inputs[e.id] || {})[gi]; if (v == null) return null; return e.type === "number" ? G.scoreNum(v, e.answer) : G.scoreTF(v, e.answer); }
  function hasInput(e, gi) { var v = (TF.inputs[e.id] || {})[gi]; if (v == null) return false; return e.type === "number" ? v > 0 : ((v.up || 0) + (v.down || 0)) > 0; }
  function pkey(gi, pi) { return gi + "-" + pi; }
  function ptsOf(gi, pi) { return TF.pts[pkey(gi, pi)] || 0; }
  function addPts(gi, pi, n) { var k = pkey(gi, pi); TF.pts[k] = (TF.pts[k] || 0) + n; TF.log.push({ k: k, n: n }); save(); }
  function undoPts(gi, pi) { var k = pkey(gi, pi); for (var i = TF.log.length - 1; i >= 0; i--) if (TF.log[i].k === k) { TF.pts[k] -= TF.log[i].n; TF.log.splice(i, 1); save(); return; } }
  function hasPlayers() { return TF.groups.some(function (g) { return g.players && g.players.length; }); }
  function track(st, gi) { var k = st + "-" + gi; TF.track[k] = TF.track[k] || { spark: false, find: false }; return TF.track[k]; }
  function groupAccuracy(gi) {
    var got = TF.stations.map(function (st) { var e = estById(st.est); return e && TF.revealed[e.id] ? groupScore(e, gi) : null; }).filter(function (x) { return x != null; });
    return got.length ? Math.round(got.reduce(function (a, b) { return a + b; }, 0) / got.length) : null;
  }
  function sparks(gi) { var n = 0; for (var st = 0; st < 4; st++) if (TF.track[st + "-" + gi] && TF.track[st + "-" + gi].spark) n++; return n; }
  function finds(gi) { var n = 0; for (var st = 0; st < 4; st++) if (TF.track[st + "-" + gi] && TF.track[st + "-" + gi].find) n++; return n; }

  /* ---------- sound panel (also used by the station page) ---------- */
  G.soundPanel = function (a) {
    var cv = h("canvas", { class: "viz-canvas", width: 600, height: 90, "aria-hidden": "true" });
    var btn = h("button", { type: "button", class: "btn btn--sign" }, "▶ " + T("playSound"));
    var sc = null, raf = 0, to = 0;
    function draw() {
      var an = A.analyser(), x = cv.getContext("2d"), dpr = window.devicePixelRatio || 1;
      var w = cv.width = cv.clientWidth * dpr, hh = cv.height = cv.clientHeight * dpr;
      x.clearRect(0, 0, w, hh);
      if (an) {
        var data = new Uint8Array(an.frequencyBinCount); an.getByteFrequencyData(data);
        var n = 48, bw = w / n; x.fillStyle = G.cssVar("--area", cv);
        for (var i = 0; i < n; i++) { var v = data[Math.floor(i * data.length / n / 1.6)] / 255; var bh = Math.max(2, v * hh * 0.9); x.beginPath(); x.roundRect ? x.roundRect(i * bw + bw * 0.2, (hh - bh) / 2, bw * 0.6, bh, bw * 0.3) : x.rect(i * bw + bw * 0.2, (hh - bh) / 2, bw * 0.6, bh); x.fill(); }
      }
      raf = requestAnimationFrame(draw);
    }
    function stop() { if (sc) sc.stop(1.5); sc = null; cancelAnimationFrame(raf); clearTimeout(to); btn.textContent = "▶ " + T("playSound"); }
    btn.addEventListener("click", function () {
      if (sc) { stop(); return; }
      A.ensure(); A.resume(); sc = A.scene(a.sound);
      if (!sc || !sc.ok) return;
      btn.textContent = "■ " + T("stopSound");
      if (!G.reduced) draw();
      to = setTimeout(stop, 20000);
    });
    G.onLeave(stop);
    return h("div", { class: "stack", style: { "--area": G.areaVar(a) } }, h("div", { class: "row" }, btn, h("span", { class: "muted" }, L(a.soundName))), cv, h("p", { class: "small muted" }, T("proto")));
  };

  var clock = { phase: 0, remain: PHASES[0][1], running: false, iv: 0 };

  G.pages.tafel = function (app) {
    TF = TF || store.get("tafel", null);
    if (!TF || TF.v !== 2) TF = tfDefault();
    TF.choices = TF.choices || {}; TF.finalChoice = TF.finalChoice || {}; TF.plans = TF.plans || {}; TF.sdgs = TF.sdgs || {};
    var tabs = [["setup", T("setup")], ["arrive", T("arrive")], ["choose", T("phChoose")], ["st0", "1"], ["st1", "2"], ["st2", "3"], ["st3", "4"], ["debrief", T("phDebrief")], ["final", T("final")]];
    var body = h("div"), tabBar = h("div", { class: "board-tabs", role: "group", "aria-label": T("boardTitle") });
    var standings = h("div", { class: "standings", "aria-live": "off" });
    function go(v) { TF.view = v; save(); paint(); var top = G.$(".board-tabs"); if (top) top.scrollIntoView({ block: "start", behavior: "auto" }); }
    function paintStandings() {
      if (!TF.started || TF.view === "setup") { standings.hidden = true; return; }
      standings.hidden = false;
      put(standings, h("span", { class: "eyebrow" }, T("standings")), TF.groups.map(function (g, gi) {
        var acc = groupAccuracy(gi);
        return h("span", { class: "stand", style: { "--gc": gcol(gi) } }, h("i"), h("b", null, g.name), pts() ? h("span", { class: "num" }, acc == null ? "–" : acc + " %") : null,
          h("span", { class: "stand-icons", "aria-label": T("sparkDrawn") + " " + sparks(gi) + ", " + T("findLaid") + " " + finds(gi) }, "✦" + sparks(gi) + " 🍂" + finds(gi)));
      }));
    }
    G.paintStandings = paintStandings;
    function paint() {
      G.runCleanups();
      put(tabBar, tabs.map(function (t) {
        var label = t[0].indexOf("st") === 0 ? T("station", { n: t[1] }) : t[1];
        return h("button", { type: "button", "aria-current": TF.view === t[0] ? "step" : null, disabled: !TF.started && t[0] !== "setup", onclick: function () { go(t[0]); } }, label);
      }));
      body.replaceChildren();
      if (TF.view === "setup") body.appendChild(setup(go));
      else if (TF.view === "arrive") body.appendChild(arrive(go));
      else if (TF.view === "choose") body.appendChild(chooseView(go));
      else if (TF.view === "debrief") body.appendChild(debriefView(go));
      else if (TF.view.indexOf("st") === 0) body.appendChild(station(+TF.view.slice(2), go));
      else body.appendChild(finale(go));
      paintStandings();
    }
    app.append(
      h("section", { class: "wrap page-head", style: { paddingBottom: "0" } }, h("p", { class: "eyebrow" }, T("doorBoardSub")), h("h1", null, T("boardTitle")), h("p", { class: "lead" }, T("boardLead"))),
      h("section", { class: "wrap" }, tabBar, standings, body));
    paint();
  };

  /* ---------- set-up ---------- */
  function setup(go) {
    var list = h("div", { class: "stack" });
    function paintGroups() {
      put(list, TF.groups.map(function (g, i) {
        var inp = h("input", { type: "text", id: "g-" + i, value: g.name, "aria-label": T("groupN", { n: i + 1 }) });
        inp.addEventListener("input", function () { TF.groups[i].name = inp.value; save(); });
        var players = h("div", { class: "players" }, (g.players || []).map(function (p, pi) {
          var pin = h("input", { type: "text", class: "player-in", value: p, "aria-label": T("person") + " " + (pi + 1) + " · " + g.name });
          pin.addEventListener("input", function () { g.players[pi] = pin.value; save(); });
          return h("span", { class: "player-chip" }, pin, h("button", { type: "button", class: "x", "aria-label": T("removeGroup") + " " + (p || ""), onclick: function () { g.players.splice(pi, 1); save(); paintGroups(); } }, "×"));
        }), (g.players || []).length < 6 ? h("button", { type: "button", class: "chip", onclick: function () { g.players = g.players || []; g.players.push(T("person") + " " + (g.players.length + 1)); save(); paintGroups(); } }, T("addPlayer")) : null);
        return h("div", { class: "group-setup", style: { "--gc": gcol(i) } },
          h("div", { class: "row", style: { flexWrap: "nowrap" } }, h("span", { class: "group-name" }, h("i")), inp,
            TF.groups.length > 2 ? h("button", { type: "button", class: "btn btn--small btn--ghost", onclick: function () { TF.groups.splice(i, 1); save(); paintGroups(); } }, T("removeGroup")) : null),
          players);
      }));
    }
    paintGroups();
    var confirmBox = h("div");
    var ptsBox = h("input", { type: "checkbox", id: "tf-points", checked: !!pts() });
    ptsBox.addEventListener("change", function () { store.set("points", ptsBox.checked); });
    var stationsBox = h("div", { class: "stack" }, TF.stations.map(function (st, i) {
      var a = G.AREA[st.area], opts = D.estimates.filter(function (e) { return G.COMP[e.comp].area === st.area; });
      var sel = h("select", { id: "st-est-" + i }, opts.map(function (e) { return h("option", { value: e.id, selected: e.id === st.est }, (e.type === "number" ? T("estimateNum") : T("estimateTF")) + " " + L(e.q)); }));
      sel.addEventListener("change", function () { TF.stations[i].est = sel.value; save(); });
      return h("div", { class: "field" }, h("label", { for: "st-est-" + i }, T("station", { n: i + 1 }) + " · " + L(a.name)), sel);
    }));
    return h("div", { class: "board" },
      h("div", { class: "panel" }, h("h3", null, T("groups") + " (" + TF.groups.length + ")"), h("p", { class: "small muted" }, T("playersHint")), list,
        TF.groups.length < 8 ? h("div", null, h("button", { type: "button", class: "btn btn--small", onclick: function () { TF.groups.push({ name: GROUP_NAMES[G.lang][TF.groups.length], players: [] }); save(); go("setup"); } }, "+ " + T("addGroup"))) : null,
        h("p", { class: "note" }, T("roles"))),
      h("div", { class: "panel" }, h("h3", null, T("stationCards")), stationsBox,
        h("div", { class: "row" },
          h("button", { type: "button", class: "btn btn--sign btn--big", onclick: function () { TF.started = true; save(); go("arrive"); } }, "▶ " + T("startGame")),
          h("button", { type: "button", class: "btn btn--ghost", onclick: function () {
            put(confirmBox, h("div", { class: "confirm" }, h("span", null, T("newGameQ")),
              h("button", { type: "button", class: "btn btn--small", onclick: function () { TF = tfDefault(); save(); go("setup"); } }, T("yesClear")),
              h("button", { type: "button", class: "btn btn--small btn--ghost", onclick: function () { confirmBox.replaceChildren(); } }, T("cancel"))));
          } }, T("newGame"))), confirmBox,
        h("p", { class: "small muted" }, T("scoreRule"))),
      h("div", { class: "panel" }, h("label", { class: "row", for: "tf-points", style: { gap: "10px" } }, ptsBox, h("b", null, T("boardPoints"))), h("p", { class: "small muted" }, T("boardPointsSub"))));
  }

  function openSilence() {
    var ov = G.overlay({ label: T("silence60"), cls: "ov--night" });
    var n = h("p", { class: "muted num", "aria-live": "off" }, "60");
    ov.body.appendChild(h("div", { class: "silence-ov" }, h("div", { class: "breath", "aria-hidden": "true" }), h("h2", { class: "display" }, T("silence60")), n));
    A.ensure(); A.chime(1);
    var tl = G.Timeline(60, [], { onTick: function (e) { n.textContent = String(Math.ceil(60 - e)); }, onEnd: function () { A.signal(G.signalKind ? G.signalKind() : "bowl", true); G.award("silence"); setTimeout(function () { ov.close(); }, 3000); } });
    tl.play();
    var origClose = ov.close; ov.close = function () { tl.stop(); origClose(); };
  }

  /* ---------- arrive ---------- */
  function arrive(go) {
    var drawn = h("div", { class: "silence-draw" });
    function drawSilence() {
      var si = G.pick(D.silence), card = G.silenceMini(si);
      if (!G.reduced) card.classList.add("dealt");
      put(drawn, card);
    }
    return h("div", { class: "board" },
      h("div", { class: "panel" }, h("span", { class: "sign station-sign" }, h("span", null, T("arrive")), h("span", { class: "t" }, "3 min")),
        h("ol", { class: "steps-list" }, h("li", null, T("arrive1")), h("li", null, T("arrive2")), h("li", null, T("arrive3")), h("li", null, T("tfArrive0"))),
        h("div", { class: "panel" }, h("h3", null, T("rules3T")), h("ol", { class: "rules3" }, h("li", null, T("rule1")), h("li", null, T("rule2")), h("li", null, h("b", null, T("rule3"))))),
        h("p", { class: "note" }, T("roles"))),
      h("div", { class: "stack" },
        h("div", { class: "panel" }, h("h3", null, T("tSilence")),
          h("div", { class: "row" }, h("button", { type: "button", class: "btn btn--sign", onclick: drawSilence }, "✦ " + T("drawSilence")), h("button", { type: "button", class: "btn", onclick: openSilence }, T("silence60"))),
          drawn),
        h("div", { class: "row" }, h("button", { type: "button", class: "btn btn--sign btn--big", onclick: function () { go("choose"); } }, T("toChoose") + " →"))));
  }

  /* ---------- station ---------- */
  function station(i, go) {
    var st = TF.stations[i], a = G.AREA[st.area], e = estById(st.est);
    var comps = D.competences.filter(function (c) { return c.area === st.area; });
    var clockEl = h("p", { class: "clock" }, G.mmss(clock.remain)), phaseList = h("div", { class: "phases" }), clockBtn = h("button", { type: "button", class: "btn btn--small btn--sign" });
    function paintClock() {
      clockEl.textContent = G.mmss(clock.remain);
      clockBtn.textContent = clock.running ? T("pause") : T("startClock");
      put(phaseList, PHASES.map(function (p, k) {
        return h("button", { type: "button", class: "phase", "aria-current": clock.phase === k ? "step" : null, onclick: function () { stopClock(); clock.phase = k; clock.remain = p[1]; paintClock(); } }, h("span", null, T(p[0])), h("span", { class: "num" }, minLabel(p[1])));
      }));
    }
    function stopClock() { clock.running = false; clearInterval(clock.iv); }
    clockBtn.addEventListener("click", function () {
      if (clock.running) { stopClock(); paintClock(); return; }
      A.ensure(); clock.running = true; var last = Date.now();
      clock.iv = setInterval(function () {
        var now = Date.now(); clock.remain -= (now - last) / 1000; last = now;
        if (clock.remain <= 0) { A.signal(G.signalKind(), true); stopClock(); clock.phase = Math.min(PHASES.length - 1, clock.phase + 1); clock.remain = PHASES[clock.phase][1]; }
        paintClock();
      }, 250);
      paintClock();
    });
    G.onLeave(stopClock);
    paintClock();

    var trackBox = h("div", { class: "track" }, TF.groups.map(function (g, gi) {
      var tr = track(i, gi);
      function chip(key, label, glyph) {
        var b = h("button", { type: "button", class: "chip", "aria-pressed": String(!!tr[key]) }, glyph + " " + label);
        b.addEventListener("click", function () { tr[key] = !tr[key]; b.setAttribute("aria-pressed", String(tr[key])); save(); paintStandingsSafe(); });
        return b;
      }
      return h("div", { class: "track-row", style: { "--gc": gcol(gi) } }, h("span", { class: "group-name" }, h("i"), g.name), chip("spark", T("sparkDrawn"), "✦"), chip("find", T("findLaid"), "🍂"));
    }));
    function paintStandingsSafe() { if (G.paintStandings) G.paintStandings(); }

    var left = h("div", { class: "stack", style: { "--area": G.areaVar(a) } },
      h("span", { class: "sign station-sign" }, h("span", { class: "sign-sym" }, G.areaSym(a)), h("span", null, T("station", { n: i + 1 }) + " · " + L(a.name)), h("span", { class: "t" }, "11 min")),
      h("p", { class: "lead" }, L(a.teaser)),
      chosenHere(st.area),
      h("div", { class: "panel" }, h("h3", null, T("stationSound")), G.soundPanel(a)),
      h("div", { class: "panel" }, h("h3", null, T("phaseTimer")), h("div", { class: "row", style: { justifyContent: "space-between" } }, clockEl, h("div", { class: "row" }, clockBtn,
        h("button", { type: "button", class: "btn btn--small", onclick: function () { stopClock(); clock.phase = (clock.phase + 1) % PHASES.length; clock.remain = PHASES[clock.phase][1]; paintClock(); } }, T("nextPhase")))), phaseList),
      h("div", { class: "panel" }, h("h3", null, T("groupTrack")), h("p", { class: "small muted" }, T("sparkReminder")), trackBox),
      h("div", { class: "panel" }, h("h3", null, T("cardsHere")), h("p", { class: "small muted" }, T("cardsHereHint")), comps.map(function (c) { return h("a", { class: "sign", href: "#k-" + c.id }, h("span", null, L(c.name))); }),
        h("p", { class: "small muted" }, "🃏 " + T("tfJoker"))));

    var estBox = h("div", { class: "panel", style: { "--area": G.areaVar(a) } });
    var ptsBox = h("div", { class: "panel" });
    function paintPts() {
      if (!hasPlayers()) { put(ptsBox, h("h3", null, T("givePoints")), h("p", { class: "muted" }, T("noPlayers"))); return; }
      put(ptsBox, h("h3", null, T("givePoints")), h("p", { class: "small muted" }, T("givePointsHint")),
        TF.groups.map(function (g, gi) {
          if (!g.players || !g.players.length) return null;
          return h("div", { class: "pts-group", style: { "--gc": gcol(gi) } }, h("span", { class: "group-name" }, h("i"), g.name),
            g.players.map(function (p, pi) {
              var total = h("b", { class: "pts-total num" }, String(ptsOf(gi, pi)));
              function plus(n, label) { return h("button", { type: "button", class: "chip", onclick: function () { addPts(gi, pi, n); total.textContent = String(ptsOf(gi, pi)); total.classList.remove("pop"); void total.offsetWidth; total.classList.add("pop"); } }, label); }
              return h("div", { class: "pts-row" }, h("span", { class: "pts-name" }, p || T("person") + " " + (pi + 1)), total,
                plus(3, "+3"), plus(1, "+1"),
                h("button", { type: "button", class: "chip chip--ghost", "aria-label": T("undo") + " · " + p, onclick: function () { undoPts(gi, pi); total.textContent = String(ptsOf(gi, pi)); } }, "↶"));
            }));
        }));
    }
    function paintEst() {
      if (!e) { put(estBox, h("p", null, T("needsSource"))); return; }
      var inputs = TF.inputs[e.id] = TF.inputs[e.id] || {};
      var head = [h("span", { class: "est-kind" }, e.type === "number" ? T("estimateNum") : T("estimateTF")), h("p", { class: "est-q" }, L(e.q)), h("p", { class: "small muted" }, L(G.COMP[e.comp].name))];
      if (!TF.revealed[e.id]) {
        var revealBtn = h("button", { type: "button", class: "btn btn--sign btn--big" }, "✦ " + T("reveal"));
        function check() { revealBtn.disabled = !TF.groups.every(function (_, gi) { return hasInput(e, gi); }); }
        var rows = TF.groups.map(function (g, gi) {
          var name = h("span", { class: "group-name", style: { "--gc": gcol(gi) } }, h("i"), g.name || T("groupN", { n: gi + 1 }));
          if (e.type === "number") {
            var inp = h("input", { type: "number", inputmode: "decimal", min: "0", step: "any", value: inputs[gi] != null ? inputs[gi] : "", "aria-label": (g.name || "") + " · " + T("guess") + " (" + L(e.unit) + ")" });
            inp.addEventListener("input", function () { var v = parseFloat(String(inp.value).replace(",", ".")); if (isFinite(v)) inputs[gi] = v; else delete inputs[gi]; save(); check(); });
            return h("div", { class: "group-row" }, name, h("div", { class: "row", style: { flexWrap: "nowrap", gap: "6px" } }, inp, h("span", { class: "muted" }, L(e.unit))));
          }
          var v = inputs[gi] || { up: 0, down: 0 };
          function tfIn(key, label) {
            var inp2 = h("input", { type: "number", min: "0", step: "1", inputmode: "numeric", value: v[key] || "", "aria-label": (g.name || "") + " · " + label });
            inp2.addEventListener("input", function () { v[key] = Math.max(0, parseInt(inp2.value, 10) || 0); inputs[gi] = v; save(); check(); });
            return h("label", { class: "row", style: { gap: "4px", fontWeight: "400" } }, h("span", { "aria-hidden": "true" }, key === "up" ? "👍" : "👎"), inp2);
          }
          return h("div", { class: "group-row" }, name, h("div", { class: "tf" }, tfIn("up", T("up")), tfIn("down", T("down"))));
        });
        revealBtn.addEventListener("click", function () { TF.revealed[e.id] = true; save(); A.ensure(); A.signal("greattit", false); paintEst(); paintStandingsSafe(); });
        check();
        put(estBox, head, h("p", { class: "muted" }, e.type === "number" ? T("groupNumber") : T("tfHow")), h("div", { class: "group-inputs" }, rows), h("div", { class: "row" }, revealBtn), h("p", { class: "small muted" }, T("revealWait")));
        return;
      }
      var scores = TF.groups.map(function (g, gi) { return { gi: gi, name: g.name, score: groupScore(e, gi), v: inputs[gi] }; }).sort(function (p, q) { return (q.score || 0) - (p.score || 0); });
      var best = scores.length ? scores[0].score : null;
      var avg = scores.length ? Math.round(scores.reduce(function (n, x) { return n + (x.score || 0); }, 0) / scores.length) : 0;
      var vizBox = h("div", { class: "viz" });
      put(estBox, head,
        h("p", { class: "answer-big num reveal-pop" }, G.answerText(e)),
        h("p", { class: "lead" }, L(e.detail)),
        e.type === "number" ? G.guessScale(e, scores.map(function (x) { return { v: x.v, name: x.name, color: G.cssVar(GROUP_COLORS[x.gi % GROUP_COLORS.length]) }; })) : null,
        vizBox,
        e.vizNote ? h("p", { class: "small muted" }, L(e.vizNote)) : null,
        h("p", { class: "small muted" }, T("source") + ": " + e.source),
        h("div", { class: "tbl-wrap" }, h("table", null,
          h("thead", null, h("tr", null, h("th", null, T("groupCol")), h("th", { class: "num" }, T("guess")), pts() ? h("th", { class: "num" }, T("accuracy")) : null)),
          h("tbody", null, scores.map(function (x) {
            var shown = e.type === "number" ? G.fmt(x.v) + " " + L(e.unit) : "👍 " + ((x.v || {}).up || 0) + " · 👎 " + ((x.v || {}).down || 0);
            return h("tr", null, h("td", null, h("span", { class: "group-name", style: { "--gc": gcol(x.gi) } }, h("i"), x.name), x.score === best && best > 0 ? h("span", { class: "score-pill" }, T("nearest")) : null), h("td", { class: "num" }, shown), pts() ? h("td", { class: "num" }, h("span", { class: "meter", style: { "--v": (x.score || 0) + "%" } }), " " + (x.score || 0) + " %") : null);
          })))),
        h("p", null, T("roomAvg", { p: avg })),
        h("div", { class: "row" }, h("button", { type: "button", class: "btn btn--small btn--ghost", onclick: function () { delete TF.revealed[e.id]; save(); paintEst(); paintStandingsSafe(); } }, T("hideAgain"))));
      G.drawViz(e, vizBox);
    }
    paintEst(); if (pts()) paintPts();
    var nav = h("div", { class: "row", style: { justifyContent: "flex-end" } },
      i < 3 ? h("button", { type: "button", class: "btn btn--sign btn--big", onclick: function () { go("st" + (i + 1)); } }, T("nextStation") + " →")
        : h("button", { type: "button", class: "btn btn--sign btn--big", onclick: function () { go("debrief"); } }, T("toDebrief") + " →"));
    return h("div", { class: "board" }, left, h("div", { class: "stack" }, estBox, pts() ? ptsBox : null, nav));
  }

  /* ---------- choose: each group picks the competence it needs most ---------- */
  function compSelect(id, value, onPick, emptyLabel) {
    var sel = h("select", { id: id }, h("option", { value: "" }, emptyLabel), D.areas.map(function (a) {
      return h("optgroup", { label: L(a.name) }, D.competences.filter(function (c) { return c.area === a.id; }).map(function (c) { return h("option", { value: c.id, selected: c.id === value }, c.no + " " + L(c.name)); }));
    }));
    sel.addEventListener("change", function () { onPick(sel.value || null); });
    return sel;
  }
  function chosenHere(areaId) {
    var here = TF.groups.map(function (g, gi) { return { g: g, gi: gi, c: G.COMP[TF.choices[gi]] }; }).filter(function (x) { return x.c && x.c.area === areaId; });
    if (!here.length) return null;
    return h("div", { class: "panel" }, here.map(function (x) { return h("p", { class: "chosen-line" }, h("span", { class: "group-name", style: { "--gc": gcol(x.gi) } }, h("i"), x.g.name), " ⭐ " + T("chosenHere", { c: L(x.c.name) })); }));
  }
  function chooseView(go) {
    var list = h("div", { class: "pick-grid pick-grid--static" }, D.areas.map(function (a) {
      return h("div", { class: "pick-area", style: { "--area": G.areaVar(a) } }, h("p", { class: "pick-area-name" }, G.areaSym(a, "eyebrow-sym"), L(a.name)),
        D.competences.filter(function (c) { return c.area === a.id; }).map(function (c) { return h("div", { class: "pick-tile" }, h("div", { class: "pick-add" }, h("b", null, c.no + " " + L(c.name)), h("span", null, L(c.plain)))); }));
    }));
    function sdgSelect(gi) {
      var sel = h("select", { id: "tf-sdg-" + gi, "aria-label": g0(gi) + " · " + T("gcSdg") }, h("option", { value: "" }, T("sdgNone")), D.sdgs.map(function (x) { return h("option", { value: String(x.n), selected: TF.sdgs[gi] === x.n }, x.n + " · " + L(x)); }));
      sel.addEventListener("change", function () { if (sel.value) TF.sdgs[gi] = +sel.value; else delete TF.sdgs[gi]; save(); });
      return sel;
    }
    function g0(gi) { return TF.groups[gi].name || T("groupN", { n: gi + 1 }); }
    var r0 = h("details", { class: "r0-offer" }, h("summary", null, G.icon("globe"), " ", T("r0Offer")), h("p", { class: "small" }, T("tfR0")));
    var rows = h("div", { class: "stack" }, TF.groups.map(function (g, gi) {
      return h("div", { class: "field tf-choice", style: { "--gc": gcol(gi) } }, h("label", { for: "tf-choice-" + gi }, h("span", { class: "group-name" }, h("i"), g.name)),
        compSelect("tf-choice-" + gi, TF.choices[gi], function (v) { if (v) TF.choices[gi] = v; else delete TF.choices[gi]; save(); }, T("chooseNone")),
        h("div", { class: "tf-sdg" }, G.icon("globe"), sdgSelect(gi)));
    }));
    return h("div", { class: "board" },
      h("div", { class: "stack" }, h("div", { class: "panel" }, h("span", { class: "sign station-sign" }, h("span", null, T("phChoose")), h("span", { class: "t" }, "2 min")),
        h("ol", { class: "steps-list" }, h("li", null, T("tfChoose1")), h("li", null, T("tfChoose2")), h("li", null, T("tfChoose3")))), list),
      h("div", { class: "stack" }, h("div", { class: "panel stack" }, h("h3", null, T("tfChoicesT")), h("p", { class: "small muted" }, T("tfChoicesHint")), r0, rows),
        h("div", { class: "row", style: { justifyContent: "flex-end" } }, h("button", { type: "button", class: "btn btn--sign btn--big", onclick: function () { go("st0"); } }, T("toStation1") + " →"))));
  }

  /* ---------- debrief: What? So what? Now what? ---------- */
  function miniTimer(sec) {
    var clockEl = h("span", { class: "clock clock--small num" }, G.mmss(sec)), tl = null;
    var btn = h("button", { type: "button", class: "btn btn--small btn--sign" }, T("startTime", { t: G.mmss(sec) }));
    btn.addEventListener("click", function () {
      if (tl && tl.running) { tl.pause(); btn.textContent = T("resume"); return; }
      if (tl && !tl.ended) { tl.play(); btn.textContent = T("pause"); return; }
      A.ensure();
      tl = G.Timeline(sec, [], { onTick: function (e) { clockEl.textContent = G.mmss(sec - e); }, onEnd: function () { clockEl.textContent = "0:00"; A.signal(G.signalKind(), true); btn.hidden = true; } });
      tl.play(); btn.textContent = T("pause");
    });
    G.onLeave(function () { if (tl) tl.stop(); });
    return h("div", { class: "row" }, clockEl, btn);
  }
  function debriefView(go) {
    function q(n, key, sayKey, sec) { return h("div", { class: "panel debrief-q" }, h("p", { class: "eyebrow" }, T("debriefOf", { i: n, n: 3 })), h("h3", null, T(key)), h("p", null, T(sayKey)), miniTimer(sec)); }
    var groups = h("div", { class: "stack" }, TF.groups.map(function (g, gi) {
      var start = G.COMP[TF.choices[gi]];
      var plan = h("input", { type: "text", id: "tf-plan-" + gi, maxlength: "160", value: TF.plans[gi] || "", placeholder: T("planPh") });
      plan.addEventListener("input", function () { TF.plans[gi] = plan.value; save(); });
      return h("div", { class: "group-setup", style: { "--gc": gcol(gi) } },
        h("span", { class: "group-name" }, h("i"), g.name),
        h("p", { class: "small" }, start ? T("choseAtStart") + ": " + L(start.name) : T("chooseNone")),
        h("div", { class: "field" }, h("label", { for: "tf-final-" + gi }, T("tfFinalQ")), compSelect("tf-final-" + gi, TF.finalChoice[gi] || TF.choices[gi], function (v) { if (v) TF.finalChoice[gi] = v; else delete TF.finalChoice[gi]; save(); }, T("chooseNone"))),
        h("div", { class: "field" }, h("label", { for: "tf-plan-" + gi }, T("planLabel")), plan));
    }));
    return h("div", { class: "board" },
      h("div", { class: "stack" }, h("span", { class: "sign station-sign" }, h("span", null, T("phDebrief")), h("span", { class: "t" }, "8 min")),
        h("p", { class: "lead" }, T("tfDebriefLead")),
        q(1, "whatT", "whatSay", 160), q(2, "sowhatT", "tfSowhatSay", 150), q(3, "nowwhatT", "nowwhatSay", 170)),
      h("div", { class: "stack" }, h("div", { class: "panel stack" }, h("h3", null, T("tfGroupsDebriefT")), groups),
        h("div", { class: "row", style: { justifyContent: "flex-end" } }, h("button", { type: "button", class: "btn btn--sign btn--big", onclick: function () { go("final"); } }, T("toFinal") + " →"))));
  }

  /* ---------- finale ----------
   * First the comparison round of the original: every group's choice side by side, stays or changes, and its plan.
   * With points switched on, the group of the day and the trail master follow. */
  function finale(go) {
    G.award("leader");
    var parts = [compareView()];
    var noSpark = TF.groups.filter(function (g, gi) { return sparks(gi) === 0; }).map(function (g) { return g.name; });
    var totalFinds = TF.groups.reduce(function (n, g, gi) { return n + finds(gi); }, 0);
    var findsNote = [noSpark.length ? h("p", { class: "note warn" }, T("noSparkYet", { g: noSpark.join(", ") })) : null, h("p", { class: "note" }, T("findsCompare", { n: totalFinds }))];
    if (pts()) parts.push(winnerView(), h("div", { class: "panel" }, h("p", { class: "muted" }, T("finalLead")), accuracyTable(), findsNote));
    else parts.push(h("div", { class: "panel" }, h("div", { class: "tbl-wrap" }, h("table", null,
      h("thead", null, h("tr", null, h("th", null, T("groupCol")), h("th", { class: "num" }, "✦"), h("th", { class: "num" }, "🍂"))),
      h("tbody", null, TF.groups.map(function (g, gi) { return h("tr", null, h("td", null, h("span", { class: "group-name", style: { "--gc": gcol(gi) } }, h("i"), g.name)), h("td", { class: "num" }, String(sparks(gi))), h("td", { class: "num" }, String(finds(gi)))); })))), findsNote));
    if (pts()) parts.push(masterView());
    parts.push(h("div", { class: "cols" },
      h("div", { class: "panel" }, h("h3", null, T("nowPromise")), h("p", null, T("nowPromiseP")), h("p", { class: "small muted" }, L(D.promise.back))),
      h("div", { class: "panel" }, h("h3", null, T("nowMaster")), h("p", null, T("nowMasterP")), h("a", { class: "btn btn--small", href: "#messung" }, G.icon("measure"), " " + T("measureAfter")))));
    if (pts()) parts.push(h("div", { class: "panel" }, h("h3", null, T("pointsT")), h("div", { class: "tbl-wrap" }, h("table", null,
      h("thead", null, h("tr", null, h("th", null, T("what")), h("th", { class: "num" }, T("pts")), h("th", null, T("who")))),
      h("tbody", null, window.GCT_POINTS.map(function (p) { return h("tr", null, h("td", null, L(p[0])), h("td", { class: "num" }, String(p[1])), h("td", null, L(p[2]))); }))))));
    return h("div", { class: "stack", style: { paddingBlock: "16px 44px", gap: "20px" } }, parts);
  }
  /* D2 of the change list: the picture the game leader photographs at the end. */
  function compareView() {
    return h("div", { class: "panel stack compare" }, h("h3", null, T("tfCompareT")), h("p", null, T("tfCompareSay")),
      h("div", { class: "compare-grid" }, TF.groups.map(function (g, gi) {
        var a = G.COMP[TF.choices[gi]], b = G.COMP[TF.finalChoice[gi]], sg = D.sdgs.find(function (x) { return x.n === TF.sdgs[gi]; });
        var changed = a && b && b !== a, plan = (TF.plans[gi] || "").trim();
        return h("div", { class: "compare-card", style: { "--gc": gcol(gi), "--area": a ? G.areaVar(G.AREA[a.area]) : null } },
          h("span", { class: "group-name" }, h("i"), g.name),
          sg ? h("p", { class: "small" }, G.icon("globe"), " " + sg.n + " · " + L(sg)) : null,
          h("p", { class: "compare-choice" }, a ? [G.areaSym(a.area, "eyebrow-sym"), L(a.name)] : T("chooseNone")),
          a ? h("p", { class: "compare-verdict" + (changed ? " is-changed" : "") }, changed ? "↻ " + T("tfChanges", { c: L(b.name) }) : "✓ " + T("tfStays")) : null,
          plan ? h("p", { class: "small" }, h("b", null, T("gcPlan") + ": "), plan) : null);
      })),
      h("p", { class: "small muted" }, T("tfCompareHint")));
  }
  function groupRows() {
    return TF.groups.map(function (g, gi) {
      var per = TF.stations.map(function (st) { var e = estById(st.est); return e && TF.revealed[e.id] ? groupScore(e, gi) : null; });
      var got = per.filter(function (x) { return x != null; });
      return { gi: gi, name: g.name, per: per, mean: got.length ? Math.round(got.reduce(function (a, b) { return a + b; }, 0) / got.length) : 0 };
    }).sort(function (p, q) { return q.mean - p.mean; });
  }
  function winnerView() {
    var sorted = groupRows(), revealedAny = sorted.some(function (r) { return r.per.some(function (x) { return x != null; }); });
    if (!revealedAny) return h("p", { class: "note" }, T("noRevealYet"));
    var top = sorted[0].mean, winners = sorted.filter(function (r) { return r.mean === top; });
    var cv = h("canvas", { "aria-hidden": "true" });
    setTimeout(function () { G.onLeave(G.leaves(cv, 9)); }, 50);
    return h("div", { class: "winner" }, cv, h("p", { class: "eyebrow", style: { position: "relative" } }, T("final")), h("h2", null, winners.map(function (w) { return w.name; }).join(" · ")), h("p", { class: "lead" }, T("accuracy") + ": " + top + " %"), winners.length > 1 ? h("p", null, T("tie")) : null,
      h("div", { class: "podium", "aria-hidden": "true" }, [1, 0, 2].map(function (k) { var r = sorted[k]; if (!r) return null; return h("div", { class: "podium-step p" + (k + 1), style: { "--gc": gcol(r.gi) } }, h("span", null, r.name), h("b", null, r.mean + " %"), h("i", null, String(k + 1))); })));
  }
  function accuracyTable() {
    return h("div", { class: "tbl-wrap" }, h("table", null,
      h("thead", null, h("tr", null, h("th", null, T("groupCol")), TF.stations.map(function (st, i) { return h("th", { class: "num" }, String(i + 1)); }), h("th", { class: "num" }, "Ø"), h("th", { class: "num" }, "✦"), h("th", { class: "num" }, "🍂"))),
      h("tbody", null, groupRows().map(function (r) { return h("tr", null, h("td", null, h("span", { class: "group-name", style: { "--gc": gcol(r.gi) } }, h("i"), r.name)), r.per.map(function (p) { return h("td", { class: "num" }, p == null ? "–" : p + " %"); }), h("td", { class: "num" }, h("b", null, r.mean + " %")), h("td", { class: "num" }, String(sparks(r.gi))), h("td", { class: "num" }, String(finds(r.gi)))); }))));
  }
  /* Only with points: the points for people, from estimating. No crown: the next game leader is chosen in each group. */
  function masterView() {
    if (!hasPlayers()) return h("div", { class: "panel" }, h("h3", null, T("pts")), h("p", { class: "muted" }, T("noPlayers")));
    var all = [];
    TF.groups.forEach(function (g, gi) { (g.players || []).forEach(function (p, pi) { all.push({ gi: gi, name: p || T("person") + " " + (pi + 1), pts: ptsOf(gi, pi) }); }); });
    all.sort(function (p, q) { return q.pts - p.pts; });
    return h("div", { class: "panel" }, h("h3", null, T("ptsEst")),
      h("div", { class: "vote-grid" }, all.map(function (p) { return h("div", { class: "vote", style: { "--gc": gcol(p.gi) } }, h("span", null, p.name), h("b", { class: "num" }, String(p.pts))); })));
  }
})();
