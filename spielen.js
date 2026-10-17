/* GreenComp Trails — «Play now»: the whole game, one step at a time, and «Prepare» for the game leader.
 * The shape follows briefing, play and debrief: arrive in silence, a one-minute briefing (why, three rules, roles),
 * a group choice, the stations, then a debrief in three questions (What? So what? Now what?) that ends with a shared plan.
 * First do, then talk: the game starts with a silence card, and a task shows one step per screen.
 * No points unless the group switches them on; at the end everyone points at the next game leader.
 * The game in progress stays on this device. */
(function () {
  "use strict";
  var G = window.GCT, D = G.D, A = G.A, h = G.h, T = G.T, L = G.L, put = G.put, store = G.store, Voice = G.Voice;

  var STATION = ["sound", "card", "trail", "spark", "task", "talk", "est", "sentence"];
  var COLORS = ["--a-values", "--a-complex", "--a-futures", "--a-acting", "--blaze", "--sign"];
  var PACE = { calm: 1.25, normal: 1, brisk: 0.8 };
  var COMMUNITY = "https://education-for-climate.ec.europa.eu/community/GreenCompGame";
  var S = null, runs = [], skipHandler = null;

  function fresh() { return { v: 2, i: 0, who: null, len: null, names: [], roles: 0, pace: "normal", goal: null, e4c: null, pre: null, sil: null, dots: {}, choice: null, final: null, changed: false, plan: "", thumbs: {}, st: [], leader: null, out: null, done: false, r0: false, sdg: null, picks: null, place: "out", later: false }; }
  function save() { store.set("game", S); }
  function load() { var g = store.get("game", null); if (!g || g.v !== 2) return fresh(); g.place = g.place || "out"; return g; }
  /* Points are a switch, off by default: estimating is fun without them (see README, v0.7). */
  G.withPoints = function () { return !!store.get("points", false); };
  function solo() { return S.who === "solo"; }
  function stations() { return S.len === "exp" || S.len === "one"; }
  /* «Original plus»: round 0 of the JRC game, a UN goal first. */
  function isR0() { return S.goal === "sdg" || !!S.r0; }
  function sdgById(n) { return D.sdgs.find(function (x) { return x.n === n; }) || null; }
  function sdgText(n) { var g = sdgById(n); return g ? g.n + " · " + L(g) : ""; }
  /* The joker can be played once per game, by a group, instead of a drawn card. */
  function jokerAt() { for (var k = 0; k < S.st.length; k++) if (S.st[k] && S.st[k].joker) return k; return -1; }
  function nm(i) { return (S.names[i] || "").trim() || T("person") + " " + (i + 1); }
  function pcol(i) { return "var(" + COLORS[i % COLORS.length] + ")"; }
  function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }
  function trailById(id) { return id ? D.trails.find(function (x) { return x.id === id; }) : null; }
  function sparkById(id) { return id && id !== "none" ? D.sparks.find(function (x) { return x.id === id; }) : null; }
  function goalById(id) { return D.goals.find(function (g) { return g.id === id; }); }
  function goalText() {
    var own = (store.get("prep", {}).goalText || "").trim();
    if (S.goal === "own" && own) return own;
    var g = goalById(S.goal); return g ? L(g.t) : "";
  }
  /* The order of the areas over the four stations. A card brought along starts; when the group chooses after
   * the first station, its choice comes next, so that it is still played. */
  function areaOrder() {
    var ids = D.areas.map(function (a) { return a.id; }), pre = S.pre && G.COMP[S.pre];
    var first = S.st[0] && S.st[0].area || (pre ? pre.area : ids[0]), k = ids.indexOf(first);
    var out = ids.slice(k).concat(ids.slice(0, k));
    var ch = S.later && S.choice && G.COMP[S.choice];
    if (ch && ch.area !== first) out = [first, ch.area].concat(out.filter(function (a) { return a !== first && a !== ch.area; }));
    return out;
  }

  /* ---------- time ----------
   * Seconds for one part of the game. Sixty minutes: arrive 2, briefing 1, choose 2, four stations of 11, debrief 8,
   * promise 2, next game leader 1. A station: listen 20 s, three quick draws, the task as long as the card says,
   * talking for the rest of 7:20, estimate 2, one sentence and a find 1:40. Groups above four talk a little longer;
   * the pace stretches or shortens everything except the fixed silence.
   * task: seconds of the task on the card (2 to 4 minutes); unknown before the card is drawn, then 3 minutes. */
  function durFor(kind, len, n, pace, r0, task) {
    var f = PACE[pace] || 1, sec;
    task = task || 180;
    switch (kind) {
      case "silence": return 60;
      case "arrive": sec = 60; break;
      case "sound": return 20;
      case "pick": return 15;
      case "walk": return 640;
      case "brief": sec = len === "exp" || len === "one" ? 60 : 30; break;
      case "choose": sec = 120 + (r0 ? 60 : 0); break;
      case "task": sec = task; break;
      case "talk": sec = Math.max(90, 375 - task + 20 * Math.max(0, n - 4)); break;
      case "est": sec = 120; break;
      case "sentence": sec = len === "five" ? clamp(12 + 12 * n, 45, 120) : 100; break;
      case "what": sec = 160; break;
      case "sowhat": sec = 150; break;
      case "nowwhat": sec = 170; break;
      case "debrief": sec = 120; break;
      case "promise": sec = 120; break;
      case "leader": sec = len === "exp" ? 60 : 20; break;
      case "end": sec = 60; break;
      default: return 0;
    }
    return Math.round(sec * f / 5) * 5;
  }
  var KIND = { card: "pick", trail: "pick", spark: "pick" };
  var TIMED = { silence: 1, brief: 1, choose: 1, sound: 1, task: 1, talk: 1, est: 1, sentence: 1, what: 1, sowhat: 1, nowwhat: 1, debrief: 1, promise: 1, leader: 1 };
  function people() { return solo() ? 1 : Math.max(2, S.names.length); }
  function taskSec(st) { var c = st && !st.joker && G.COMP[st.comp]; return c && c.minutes ? c.minutes * 60 : 180; }
  function dur(kind, st) { return durFor(kind, S.len, people(), S.pace, isR0(), taskSec(st)); }

  /* ---------- the plan: every step of the chosen game ----------
   * One station is the way in: silence, briefing, the station, then choose and plan in a short debrief.
   * The expedition chooses before the first station, or after it (later), when the group already knows what a card is. */
  function planFor(who, len, later) {
    var p = [{ id: "who", ph: "setup" }];
    if (who === "room") return p.concat([{ id: "room", ph: "setup" }]);
    if (!who) return p;
    p.push({ id: "len", ph: "setup" });
    if (!len) return p;
    if (who !== "solo") p.push({ id: "names", ph: "setup" });
    if (len === "walk") return p.concat([{ id: "brief", ph: "start" }, { id: "card", ph: "play", k: 0 }, { id: "walk", ph: "play", k: 0 }]);
    if (len === "five") return p.concat([{ id: "brief", ph: "start" }], ["card", "trail", "task", "sentence"].map(function (id) { return { id: id, ph: "play", k: 0 }; }), [{ id: "end", ph: "end" }]);
    p.push({ id: "silence", ph: "start" }, { id: "brief", ph: "start" });
    function station(k) { STATION.forEach(function (id) { p.push({ id: id, ph: "st" + k, k: k }); }); }
    if (len === "one") { station(0); return p.concat([{ id: "debrief", ph: "debrief" }, { id: "leader", ph: "end" }]); }
    for (var k = 0; k < 4; k++) { if (k === (later ? 1 : 0)) p.push({ id: "choose", ph: "choose" }); station(k); }
    return p.concat([{ id: "what", ph: "debrief" }, { id: "sowhat", ph: "debrief" }, { id: "nowwhat", ph: "debrief" }, { id: "promise", ph: "end" }, { id: "leader", ph: "end" }]);
  }
  function plan() { return planFor(S.who, S.len, S.later); }
  function phLabel(ph, len) {
    len = len || S.len;
    if (ph === "setup") return T("phSetup");
    if (ph === "start") return len === "exp" || len === "one" ? T("arrive") : T("phReady");
    if (ph === "choose") return T("phChoose");
    if (ph === "debrief") return T("phDebrief");
    if (ph === "play") return T("phPlay");
    if (ph === "end") return T("phEnd");
    return len === "exp" ? T("phStation", { n: +ph.slice(2) + 1 }) : T("phStation1");
  }
  /* Minutes per section, for the briefing, the time planner and the labels on «How much time?».
   * Arriving at the expedition takes a minute more than the silence card: forming groups, phones in the middle. */
  function runPlan(who, len, n, pace, r0) {
    var out = [];
    planFor(who, len).forEach(function (p) {
      if (p.ph === "setup") return;
      var sec = durFor(KIND[p.id] || p.id, len, n, pace, r0) + (p.id === "silence" && len === "exp" ? durFor("arrive", len, n, pace) : 0), last = out[out.length - 1];
      if (!last || last.ph !== p.ph) out.push(last = { ph: p.ph, sec: 0 });
      last.sec += sec;
    });
    out.forEach(function (x) { x.min = Math.max(1, Math.round(x.sec / 60)); x.label = phLabel(x.ph, len); });
    return out;
  }
  function totalMin(who, len, n, pace, r0) { return Math.round(runPlan(who, len, n, pace, r0).reduce(function (a, x) { return a + x.sec; }, 0) / 60); }
  G.gameMinutes = function (len, r0) { return totalMin("group", len, 4, "normal", !!r0); };
  /* «20 s», «3 min», «1:40 min»: how long a step takes, shown next to its name. */
  function durLabel(sec) { return sec < 60 ? T("seconds", { n: sec }) : T("minShort", { n: sec % 60 ? G.mmss(sec) : sec / 60 }); }
  /* What one station holds, with minutes, for the briefing: listen, task, talk, estimate, one sentence. */
  function stationLine() {
    var n = people(), f = function (k, sec) { return T(k) + " " + durLabel(sec); };
    return [f("stListen", dur("sound")), T("stTask", { a: 2, b: 4 }), f("stTalk", Math.round(durFor("talk", S.len, n, S.pace, false, 180) / 60) * 60), f("stEst", dur("est")), f("stSentence", dur("sentence"))].join(" · ");
  }

  /* ---------- per-station state ---------- */
  function stn(k) {
    var st = S.st[k] || (S.st[k] = {});
    if (!st.area && S.len === "exp") st.area = areaOrder()[k];
    if (!st.area && S.len === "one") { st.area = S.choice ? G.COMP[S.choice].area : S.pre ? G.COMP[S.pre].area : G.pick(D.areas).id; st.areaByChoice = !!S.choice; }
    /* A card brought along (from its page or from a coaster) is played first; five minutes and the walk have no areas. */
    if (!st.comp && k === 0 && S.pre && (!st.area || G.COMP[S.pre].area === st.area)) { st.comp = S.pre; st.est = estFor(st, k); }
    /* The competence the group chose is played at the station of its area. */
    if (!st.comp && S.choice && G.COMP[S.choice].area === st.area && !S.st.some(function (x, j) { return x && j !== k && x.comp === S.choice; })) { st.comp = S.choice; st.est = estFor(st, k); st.byChoice = true; }
    /* In round 0 the group chose skills for its goal; each one waits at the station of its area. */
    var pk = S.picks && S.picks[st.area];
    if (!st.comp && pk && !S.st.some(function (x, j) { return x && j !== k && x.comp === pk; })) { st.comp = pk; st.est = estFor(st, k); st.byChoice = true; }
    return st;
  }
  /* A new choice replaces what an earlier choice put into the stations, as long as nothing was played there yet. */
  function setChoice(id) {
    S.choice = id;
    S.st = S.st.map(function (st) { return st && !st.trail && (st.byChoice || st.areaByChoice) ? null : st; });
    save();
  }
  function pool(st, k) {
    var used = S.st.filter(function (x, j) { return x && j !== k; }).map(function (x) { return x.comp; });
    return D.competences.filter(function (c) { return (!st.area || c.area === st.area) && used.indexOf(c.id) < 0; });
  }
  function estFor(st, k) {
    var c = G.COMP[st.comp], used = S.st.filter(function (x, j) { return x && j !== k; }).map(function (x) { return x.est; });
    var own = G.estsFor(c.id).filter(function (e) { return used.indexOf(e.id) < 0; });
    var area = D.estimates.filter(function (e) { return G.COMP[e.comp].area === c.area && used.indexOf(e.id) < 0; });
    var list = own.length ? own : area;
    var e = list.find(function (x) { return x.type === "number"; }) || list[0];
    return e ? e.id : null;
  }
  function estById(id) { return D.estimates.find(function (e) { return e.id === id; }) || null; }
  function sparkCount() { return S.st.filter(function (x) { return x && x.spark && x.spark !== "none"; }).length; }
  /* Three roles that rotate at every station. */
  function roleOf(k) {
    var n = S.names.length, out = {};
    if (!n) return out;
    var base = (S.roles + (k || 0)) % n;
    out.lead = base; out.silence = (base + 1) % n; out.tracker = (base + (n > 2 ? 2 : 0)) % n;
    return out;
  }
  /* Points come only from estimating, and only when the group switched them on. */
  function points() {
    var pts = S.names.map(function () { return 0; });
    S.st.forEach(function (st) { if (st && st.pts) Object.keys(st.pts).forEach(function (i) { if (pts[i] != null) pts[i] += st.pts[i]; }); });
    return pts;
  }

  /* ---------- small building blocks ---------- */
  function choice(on, icon, title, sub, fn, extra) {
    return h("button", { type: "button", class: "choice", "aria-pressed": String(!!on), onclick: fn }, h("span", { class: "choice-ico" }, G.icon(icon)), h("b", null, title), h("span", null, sub), extra || null);
  }
  function radioChips(label, items, cur, pick) {
    return h("div", { class: "chips", role: "radiogroup", "aria-label": label }, items.map(function (it) {
      return h("button", { type: "button", class: "chip", role: "radio", "aria-checked": String(it.id === cur), onclick: function () { pick(it.id); } }, it.label);
    }));
  }
  function timer(sec, opts) {
    opts = opts || {};
    var hg = opts.glass ? G.hourglass() : null;
    var clock = h("p", { class: "clock" }, G.mmss(sec));
    var phase = h("p", { class: "lead", "aria-live": "polite" }, opts.label || "");
    var btn = h("button", { type: "button", class: "btn btn--sign btn--big" }, opts.start || T("startTime", { t: G.mmss(sec) }));
    var skip = h("button", { type: "button", class: "btn btn--ghost" }, "⏭ " + T("skipTime"));
    var tl = null, raf = 0;
    function loop() { if (tl) { if (hg) hg.set(tl.elapsed / sec); clock.textContent = G.mmss(sec - tl.elapsed); } raf = requestAnimationFrame(loop); }
    function stop() { if (tl) tl.stop(); cancelAnimationFrame(raf); G.Wake.off(); }
    btn.addEventListener("click", function () {
      if (tl && tl.running) { tl.pause(); btn.textContent = T("resume"); return; }
      if (tl && !tl.ended) { tl.play(); btn.textContent = T("pause"); return; }
      A.ensure(); A.signal(G.signalKind(), false); G.Wake.on();
      tl = G.Timeline(sec, [], { onEnd: function () {
        cancelAnimationFrame(raf); if (hg) hg.set(1); clock.textContent = "0:00"; phase.textContent = T("timeUp");
        A.signal(G.signalKind(), true); G.Wake.off(); btn.hidden = true;
        if (opts.onEnd) opts.onEnd();
        var nx = G.$(".play-next"); if (nx) nx.classList.add("is-hot");
      } });
      tl.play(); btn.textContent = T("pause"); cancelAnimationFrame(raf); loop();
    });
    skip.addEventListener("click", function () {
      stop(); btn.hidden = true; skip.hidden = true; phase.textContent = T("skipped");
      if (opts.onSkip) opts.onSkip(); else if (skipHandler) skipHandler();
    });
    runs.push(stop);
    return h("div", { class: "timer-grid" + (hg ? "" : " timer-grid--plain") }, hg ? hg.el : (opts.art || h("div", { class: "breath", "aria-hidden": "true" })),
      h("div", { class: "stack" }, clock, phase, h("div", { class: "row" }, btn, skip), h("p", { class: "muted small" }, opts.hint || T("earlyNext"))));
  }
  function roleList(k) {
    var r = roleOf(k);
    if (!S.names.length) return null;
    function row(key, i, ico) { return h("li", null, h("span", { class: "role-ico", "aria-hidden": "true" }, G.icon(ico)), h("b", null, nm(i)), h("span", null, T(key))); }
    return h("ul", { class: "roles-list" }, row("roleLead", r.lead, "card"), row("roleSilence", r.silence, "phone"), S.names.length > 2 ? row("roleTracker", r.tracker, "eye") : null);
  }
  /* What this station plays. bare: only the card and its question, for the steps that show the new card itself. */
  function compSummary(st, withTask, bare) {
    var c = G.COMP[st.comp], j = st.joker, t = trailById(st.trail), t2 = trailById(st.trail2), sp = sparkById(st.spark);
    var task = null;
    if (withTask) task = j ? h("div", { class: "card-task" }, h("span", { class: "label" }, T("makeReal")),
      h("ol", { class: "task-steps" }, j.steps.filter(function (x) { return (x || "").trim(); }).map(function (x) { return h("li", null, x); })),
      (j.done || "").trim() ? h("p", { class: "task-done" }, "✓ " + j.done) : null) : G.taskBlock(c, solo());
    return h("div", { class: "panel five-card", style: { "--area": G.areaVar(G.AREA[c.area]) } },
      h("p", { class: "eyebrow" }, G.areaSym(c.area, "eyebrow-sym"), j ? T("tJoker") + " · " + G.jokerName(j) : c.no + " " + L(c.name)),
      h("p", { class: "card-q" }, j ? j.q : G.compQ(c, solo())),
      task,
      !bare && t ? h("p", { class: "spark-line" }, G.icon("fork"), h("b", null, L(t.name) + ": "), G.trailChange(t, solo())) : null,
      !bare && t2 ? h("p", { class: "spark-line" }, G.icon("fork"), h("b", null, L(t2.name) + ": "), G.trailChange(t2, solo())) : null,
      !bare && sp ? h("p", { class: "spark-line" }, G.icon("spark"), h("b", null, L(sp.name) + ": "), L(sp.text)) : null);
  }
  /* The five innovation areas of EducationForClimate, as in round 2 of the JRC game. Offered only with the goal «as in the original». */
  function e4cChoice(cur, pick) {
    return h("div", { class: "stack e4c" }, h("p", { class: "small" }, h("b", null, T("e4cQ")), " ", h("span", { class: "muted" }, T("e4cNote"))),
      radioChips(T("e4cQ"), D.e4c.map(function (x) { return { id: x.id, label: L(x.t) }; }), cur, pick));
  }
  function e4cText(id) { var x = id && D.e4c.find(function (y) { return y.id === id; }); return x ? L(x.t) : ""; }
  /* A card laid on the table: readable size, the instruction next to it, tap for the large view. */
  function cardRow(card, back, side) {
    return h("div", { class: "card-row" }, h("div", { class: "card-slot" }, G.zoomOne(card, back)), side ? h("div", { class: "card-side stack" }, side) : null);
  }
  function chosenPanel(id, eyebrow, extra) {
    var c = G.COMP[id];
    return h("div", { class: "chosen-panel", style: { "--area": G.areaVar(G.AREA[c.area]) } },
      h("p", { class: "eyebrow" }, eyebrow), h("h3", null, c.no + " " + L(c.name)), h("p", null, L(c.plain)), extra || null);
  }
  /* Does the choice from the start still hold? Used in the debrief. With one station there was no choice yet:
   * the group has played a card and now picks the skill it needs most. */
  function choiceCheck(ctl) {
    var box = h("div", { class: "stack" });
    function paint() {
      if (!S.choice) {
        put(box, h("p", null, h("b", null, T("finalPickQ")), " ", h("span", { class: "muted" }, T("finalPickHow"))),
          radioChips(T("finalPickQ"), D.competences.map(function (c) { return { id: c.id, label: c.no + " " + L(c.name) }; }), S.final, function (id) { S.final = id; S.changed = false; save(); paint(); ctl.refresh(); }));
        return;
      }
      put(box,
        S.choice ? chosenPanel(S.choice, T("choseAtStart")) : null,
        h("div", { class: "row" },
          h("button", { type: "button", class: "btn" + (S.final && !S.changed ? " btn--sign" : ""), "aria-pressed": String(!!S.final && !S.changed), onclick: function () { S.final = S.choice; S.changed = false; save(); paint(); ctl.refresh(); } }, "✓ " + T("choiceStays")),
          h("button", { type: "button", class: "btn" + (S.changed ? " btn--sign" : ""), "aria-pressed": String(!!S.changed), onclick: function () { S.changed = true; S.final = null; save(); paint(); ctl.refresh(); } }, "↻ " + T("choiceChanges"))),
        S.changed ? h("div", { class: "stack" }, h("p", { class: "small muted" }, T("choiceNew")),
          radioChips(T("choiceNew"), D.competences.map(function (c) { return { id: c.id, label: c.no + " " + L(c.name) }; }), S.final, function (id) { S.final = id; save(); paint(); ctl.refresh(); })) : null);
    }
    paint();
    return box;
  }
  /* The shared plan, checked with the thumbs: everyone at least sideways, then it stands. */
  function planField(ctl) {
    var ta = h("textarea", { id: "group-plan", placeholder: T("planPh"), maxlength: "200" });
    ta.value = S.plan || "";
    ta.addEventListener("input", function () { S.plan = ta.value; save(); ctl.refresh(); });
    var ideas = h("div", { class: "chips" }, ["planIdea1", "planIdea2", "planIdea3"].map(function (k) {
      return h("button", { type: "button", class: "chip chip--ghost", onclick: function () { ta.value = T(k); S.plan = ta.value; save(); ctl.refresh(); } }, T(k));
    }));
    var thumbs = h("div", { class: "stack" }), verdict = h("p", { class: "thumb-verdict", "aria-live": "polite" });
    function paintThumbs() {
      var opts = [{ id: "up", label: "👍", name: T("thumbUp") }, { id: "side", label: "👉", name: T("thumbSide") }, { id: "down", label: "👎", name: T("thumbDown") }];
      put(thumbs, S.names.map(function (_, i) {
        return h("div", { class: "vote-row", style: { "--pc": pcol(i) } }, h("span", { class: "guess-name" }, nm(i)),
          h("div", { class: "chips", role: "radiogroup", "aria-label": T("thumbsT") + ": " + nm(i) }, opts.map(function (o) {
            return h("button", { type: "button", class: "chip", role: "radio", "aria-checked": String(S.thumbs[i] === o.id), "aria-label": o.name, title: o.name, onclick: function () { S.thumbs[i] = o.id; save(); paintThumbs(); } }, o.label);
          })));
      }), verdict);
      var got = S.names.filter(function (_, i) { return S.thumbs[i]; }).length;
      verdict.className = "thumb-verdict";
      if (got < S.names.length) verdict.textContent = T("thumbsWait");
      else if (S.names.some(function (_, i) { return S.thumbs[i] === "down"; })) { verdict.textContent = T("thumbsNo"); verdict.classList.add("is-no"); }
      else { verdict.textContent = "✓ " + T("thumbsOk"); verdict.classList.add("is-ok"); }
    }
    paintThumbs();
    return h("div", { class: "stack" },
      h("div", { class: "field" }, h("label", { for: "group-plan" }, T("planLabel")), ta), ideas,
      h("div", { class: "panel stack" }, h("h3", null, T("thumbsT")), h("p", { class: "small muted" }, T("thumbsSay")), thumbs));
  }
  function prepProgress() {
    var p = store.get("prep", {}), checks = p.checks || {};
    return { n: D.prep.filter(function (x) { return checks[x.id]; }).length, m: D.prep.length };
  }

  /* ---------- the steps ---------- */
  var STEPS = {
    who: function (step, st, ctl) {
      function pickWho(id) {
        if (S.who !== id) { var pre = S.pre; S = fresh(); S.pre = pre; S.who = id; if (id === "group") S.names = ["", "", ""]; }
        save(); ctl.go(1);
      }
      return { icon: "hand", title: T("wWhoT"), say: T("wWhoSay"),
        body: [S.pre ? h("p", { class: "note" }, T("withCard", { name: L(G.COMP[S.pre].name) })) : null, h("div", { class: "choices" },
          choice(S.who === "solo", "walk", T("whoSolo"), T("whoSoloSub"), function () { pickWho("solo"); }),
          choice(S.who === "group", "table", T("whoGroup"), T("whoGroupSub"), function () { pickWho("group"); }),
          choice(S.who === "room", "board", T("whoRoom"), T("whoRoomSub"), function () { pickWho("room"); }))],
        need: function () { return S.who ? null : T("needChoice"); } };
    },
    len: function (step, st, ctl) {
      function pickLen(id) { if (S.len !== id) { S.len = id; S.st = []; S.leader = null; S.dots = {}; S.choice = null; S.final = null; S.done = false; S.later = false; } save(); ctl.go(1); }
      var n = Math.max(2, S.names.length || 4);
      var opts = solo()
        ? [["five", "hourglass", T("len5"), T("len5SubSolo")], ["walk", "walk", T("lenWalk"), T("lenWalkSub")]]
        : [["five", "hourglass", T("len5"), T("len5Sub")],
           ["one", "compass", T("len15", { n: totalMin("group", "one", n, S.pace) }), T("len15Sub")],
           ["exp", "peak", T("len60", { n: totalMin("group", "exp", n, S.pace) }), T("len60Sub")]];
      return { icon: "hourglass", title: solo() ? T("wLenTSolo") : T("wLenT"), say: solo() ? T("wLenSaySolo") : T("wLenSay"),
        body: h("div", { class: "choices" }, opts.map(function (o) { return choice(S.len === o[0], o[1], o[2], o[3], function () { pickLen(o[0]); }); })),
        need: function () { return S.len ? null : T("needChoice"); } };
    },
    names: function (step, st, ctl) {
      var list = h("div", { class: "name-list" });
      function paint(focusLast) {
        put(list, S.names.map(function (v, i) {
          var inp = h("input", { type: "text", id: "pn-" + i, value: v, placeholder: T("person") + " " + (i + 1), maxlength: "24", autocomplete: "off", "aria-label": T("person") + " " + (i + 1) });
          inp.addEventListener("input", function () { S.names[i] = inp.value; save(); });
          return h("div", { class: "name-row", style: { "--pc": pcol(i) } }, h("span", { class: "name-n", "aria-hidden": "true" }, String(i + 1)), inp,
            S.names.length > 2 ? h("button", { type: "button", class: "x", "aria-label": T("removePerson", { name: nm(i) }), onclick: function () { S.names.splice(i, 1); save(); paint(); } }, "×") : null);
        }), S.names.length < 6 ? h("button", { type: "button", class: "btn btn--small", onclick: function () { S.names.push(""); save(); paint(true); } }, "+ " + T("person")) : null);
        if (focusLast) { var ins = list.querySelectorAll("input"); if (ins.length) ins[ins.length - 1].focus(); }
      }
      paint();
      return { icon: "talk", title: T("wNamesT"), say: T("wNamesSay"), body: [list, h("p", { class: "small muted" }, T("namesNote"))] };
    },
    room: function () {
      var pp = prepProgress();
      return { icon: "board", title: T("whoRoom"), say: T("wRoomSay"), last: true,
        body: [h("ol", { class: "steps-list" }, h("li", null, T("room0"), " ", h("a", { href: "#vorbereiten" }, T("prepLine", pp))), h("li", null, T("room1")), h("li", null, T("room2")), h("li", null, T("room3"))),
          h("div", { class: "row" }, h("a", { class: "btn btn--sign btn--big", href: "#tafel" }, "▶ " + T("openBoard")), h("a", { class: "btn", href: "#vorbereiten" }, T("prepT"))),
          h("p", { class: "small muted" }, T("roomNote"))] };
    },
    /* The briefing, one minute: why we play, three rules, roles, and whether we are outdoors.
     * Prebriefing practice: purpose, ground rules and a safe frame («nobody has to»). Everything else waits behind «More». */
    brief: function (step, st, ctl) {
      var auto = h("input", { type: "checkbox", id: "auto-read", checked: store.get("autoRead", false), disabled: !Voice.ok });
      auto.addEventListener("change", function () { store.set("autoRead", auto.checked); if (auto.checked) { Voice.set(true); A.ensure(); } });
      var pts = h("input", { type: "checkbox", id: "with-points", checked: G.withPoints() });
      pts.addEventListener("change", function () { store.set("points", pts.checked); });
      var sig = h("div", { class: "chips sig-chips", role: "radiogroup", "aria-label": T("signal") });
      function paintSig() {
        var cur = G.signalKind();
        put(sig, D.signals.map(function (sg) {
          return h("button", { type: "button", class: "chip", role: "radio", "aria-checked": String(sg.id === cur), onclick: function () { store.set("signal", sg.id); paintSig(); A.ensure(); A.signal(sg.id, false); } }, "♪ " + L(sg.name));
        }));
      }
      paintSig();
      var settings = h("div", { class: "stack" }, h("p", null, h("b", null, T("signalPlay"))), sig,
        h("label", { class: "row", for: "auto-read", style: { gap: "10px" } }, auto, Voice.ok ? T("autoRead") : T("noVoice")),
        stations() && !solo() ? h("label", { class: "row", for: "with-points", style: { gap: "10px" } }, pts, T("pointsOn")) : null);
      if (!stations()) {
        var list = solo()
          ? h("ul", { class: "checklist big-list" }, h("li", null, T("ready1S")), h("li", null, T("ready2S")), h("li", null, T("ready3S")))
          : h("ul", { class: "checklist big-list" }, h("li", null, T("ready1G")), h("li", null, T("ready2G")), h("li", null, T("rule3"))) ;
        return { icon: "tree", title: T("wReadyT"), say: solo() ? T("wReadySaySolo") : T("wReadySay"), body: [h("p", { class: "about-line" }, L(solo() ? D.about.briefSolo : D.about.brief)), list, h("details", { class: "panel" }, h("summary", null, T("settingsT")), settings)], next: solo() ? T("imReady") : T("weAreReady"),
          read: function () { return L(solo() ? D.about.briefSolo : D.about.brief); } };
      }
      if (!S.goal) { var pg = store.get("prep", {}); if (pg.goal) S.goal = pg.goal; if (pg.e4c) S.e4c = pg.e4c; }
      var goalBox = h("div", { class: "stack" });
      var goals = D.goals.map(function (g) { return { id: g.id, label: L(g.t) }; });
      if ((store.get("prep", {}).goalText || "").trim()) goals.push({ id: "own", label: store.get("prep", {}).goalText.trim() });
      function paintGoal() {
        put(goalBox, radioChips(T("goalQ"), goals, S.goal, function (id) { S.goal = id; if (id !== "sdg") { S.e4c = null; S.r0 = false; } save(); paintGoal(); paintRun(); }),
          S.goal === "sdg" ? e4cChoice(S.e4c, function (id) { S.e4c = id; save(); paintGoal(); }) : null);
      }
      var placeBox = h("div");
      function paintPlace() {
        put(placeBox, radioChips(T("placeQ"), [{ id: "out", label: "🌳 " + T("placeOut") }, { id: "in", label: "🏠 " + T("placeIn") }], S.place, function (id) { S.place = id; save(); paintPlace(); }));
      }
      var runBox = h("div", { class: "stack" }), paceBox = h("div");
      function paintRun() {
        var segs = runPlan(S.who, S.len, people(), S.pace, isR0()), total = Math.round(segs.reduce(function (a, x) { return a + x.sec; }, 0) / 60);
        put(runBox, h("div", { class: "run-bar", role: "list", "aria-label": T("runT") }, segs.map(function (x) {
          return h("div", { class: "run-seg run-" + (x.ph.indexOf("st") === 0 ? "st" + (+x.ph.slice(2) + 1) : x.ph), role: "listitem", style: { flexGrow: String(Math.max(1, x.min)) } }, h("b", null, x.label), h("small", null, T("minShort", { n: x.min })));
        })), h("p", { class: "run-station" }, h("b", null, T("stEach") + " "), stationLine()), h("p", { class: "small muted" }, T("runTotal", { n: total })));
        put(paceBox, radioChips(T("paceT"), ["calm", "normal", "brisk"].map(function (p) {
          return { id: p, label: T(p === "calm" ? "paceCalm" : p === "brisk" ? "paceBrisk" : "paceNormal") + " · " + T("minShort", { n: totalMin(S.who, S.len, people(), p, isR0()) }) };
        }), S.pace, function (p) { S.pace = p; save(); paintRun(); }));
      }
      paintGoal(); paintPlace(); paintRun();
      var shuffle = h("button", { type: "button", class: "btn btn--small", onclick: function () { S.roles = (S.roles + 1) % Math.max(1, S.names.length); save(); put(rolesBox, roleList(0), h("div", { class: "row" }, shuffle)); } }, "↻ " + T("rolesAgain"));
      var rolesBox = h("div", { class: "stack" }, roleList(0), h("div", { class: "row" }, shuffle));
      var pp = prepProgress();
      var more = h("details", { class: "panel brief-more" }, h("summary", null, T("moreT")),
        h("div", { class: "stack", style: { marginTop: "10px" } },
          h("section", { class: "brief-sec" }, h("h3", null, T("paceT")), paceBox, h("p", { class: "small muted" }, T("paceHint"))),
          h("section", { class: "brief-sec" }, h("h3", null, T("lookAroundT")), h("p", null, T("lookAround"))),
          h("section", { class: "brief-sec" }, h("h3", null, T("settingsT")), settings),
          h("p", { class: "small muted" }, T("prepLine", pp) + " · ", h("a", { href: "#vorbereiten" }, T("prepOpen")))));
      return { icon: "tree", title: T("wBriefT"), say: T("wBriefSay"),
        body: [
          h("p", { class: "about-line" }, L(D.about.brief)),
          h("section", { class: "brief-sec" }, h("h3", null, "1 · " + T("goalQ")), goalBox),
          h("section", { class: "brief-sec" }, h("h3", null, "2 · " + T("runT")), runBox),
          h("section", { class: "brief-sec" }, h("h3", null, "3 · " + T("rules3T")),
            h("ol", { class: "rules3" }, h("li", null, T("rule1")), h("li", null, T("rule2")), h("li", null, h("b", null, T("rule3"))))),
          h("section", { class: "brief-sec" }, h("h3", null, "4 · " + T("rolesShort")), h("p", { class: "small muted" }, T("ready2G")), rolesBox),
          h("section", { class: "brief-sec" }, h("h3", null, T("placeQ")), placeBox),
          more],
        read: function () {
          var g = goalText(), segs = runPlan(S.who, S.len, people(), S.pace, isR0());
          return [L(D.about.brief), g ? T("briefSayGoal", { goal: g }) : "", T("runTotal", { n: Math.round(segs.reduce(function (a, x) { return a + x.sec; }, 0) / 60) }), T("stEach") + " " + stationLine(), T("rules3T"), T("rule1"), T("rule2"), T("rule3"), T("ready2G")].filter(Boolean).join(". ");
        },
        next: T("weAreReady") };
    },
    silence: function (step, st, ctl) {
      var slot = h("div", { class: "silence-draw" }, S.sil ? G.zoomOne(G.silenceMini(D.silence.find(function (x) { return x.id === S.sil; })), G.silenceBack()) : null);
      var drawBtn = h("button", { type: "button", class: "btn btn--sign", onclick: function () {
        var si = G.pick(D.silence.filter(function (x) { return x.id !== S.sil; })); S.sil = si.id; save();
        var card = G.zoomOne(G.silenceMini(si), G.silenceBack()); if (!G.reduced) card.classList.add("dealt"); put(slot, card); Voice.speak(L(si.title) + " " + L(si.text), "narrator");
      } }, "✦ " + T("drawSilence"));
      return { icon: "feather", title: T("wSilT"), say: T("wSilSay"),
        body: [h("div", { class: "row" }, drawBtn), slot,
          timer(dur("silence"), { start: T("start60"), hint: T("silHint"), onEnd: function () { G.award("silence"); } })] };
    },
    /* Choosing: everyone points at the same time, one dot each (dot voting); a tie is talked out. */
    choose: function (step, st, ctl) {
      var n = S.names.length, grid = h("div", { class: "pick-grid" }), status = h("p", { class: "pick-status num", "aria-live": "polite" }), result = h("div", { class: "stack" });
      /* Round 0, as in the JRC game: first a UN goal, then the skills this goal needs most. */
      var r0Box = h("div");
      function paintR0() {
        if (!isR0()) {
          put(r0Box, h("details", { class: "panel r0-offer" }, h("summary", null, G.icon("globe"), " ", T("r0Offer")),
            h("p", { class: "small" }, T("r0Why")),
            h("div", { class: "row" }, h("button", { type: "button", class: "btn btn--small", onclick: function () { S.r0 = true; save(); paintR0(); ctl.refresh(); } }, "+ " + T("r0Add")))));
          return;
        }
        put(r0Box, h("section", { class: "panel r0" },
          h("p", { class: "eyebrow" }, G.icon("globe"), " " + T("r0Eyebrow")),
          h("h3", null, T("r0Q")), h("p", { class: "small muted" }, T("r0Say")),
          h("div", { class: "sdg-grid", role: "radiogroup", "aria-label": T("r0Q") }, D.sdgs.map(function (g) {
            return h("button", { type: "button", class: "sdg", role: "radio", "aria-checked": String(S.sdg === g.n), onclick: function () { S.sdg = g.n; save(); paintR0(); paint(); } }, h("b", { class: "num" }, String(g.n)), h("span", null, L(g)));
          })),
          S.sdg ? h("p", { class: "note" }, T("r0Then", { sdg: sdgText(S.sdg) })) : null,
          S.goal !== "sdg" ? h("button", { type: "button", class: "btn btn--small btn--ghost", onclick: function () { S.r0 = false; S.sdg = null; S.picks = null; save(); paintR0(); paint(); } }, "✕ " + T("r0Remove")) : null));
      }
      function given() { return Object.keys(S.dots).reduce(function (a, k) { return a + S.dots[k]; }, 0); }
      function paint() {
        put(grid, D.areas.map(function (a) {
          return h("div", { class: "pick-area", style: { "--area": G.areaVar(a) } }, h("p", { class: "pick-area-name" }, G.areaSym(a, "eyebrow-sym"), L(a.name)),
            D.competences.filter(function (c) { return c.area === a.id; }).map(function (c) {
              var d = S.dots[c.id] || 0;
              return h("div", { class: "pick-tile" + (S.choice === c.id ? " is-chosen" : "") + (d ? " has-dots" : "") },
                h("button", { type: "button", class: "pick-add", "aria-label": T("dotAdd", { name: L(c.name), n: d }), onclick: function () {
                  if (given() >= n) { ctl.hint(T("dotsAllGiven")); return; }
                  S.dots[c.id] = d + 1; S.choice = null; save(); paint();
                } }, h("b", null, L(c.name)), h("span", null, L(c.plain)),
                  h("span", { class: "pick-dots", "aria-hidden": "true" }, Array.apply(null, Array(d)).map(function () { return h("i"); }))),
                d ? h("button", { type: "button", class: "pick-minus", "aria-label": T("dotRemove", { name: L(c.name) }), onclick: function () { S.dots[c.id] = d - 1; if (!S.dots[c.id]) delete S.dots[c.id]; S.choice = null; save(); paint(); } }, "−") : null);
            }));
        }));
        status.textContent = (isR0() && S.sdg ? T("dotsFor", { sdg: sdgText(S.sdg) }) + " " : "") + T("dotsGiven", { n: given(), m: n });
        paintResult(); ctl.refresh();
      }
      /* With round 0, the most-dotted skill of every other area is played at that area's station too. */
      function picksFromDots() {
        if (!isR0()) { S.picks = null; return; }
        var out = {};
        D.areas.forEach(function (a) {
          var best = null, bd = 0;
          D.competences.forEach(function (c) { var d = S.dots[c.id] || 0; if (c.area === a.id && d > bd) { best = c.id; bd = d; } });
          if (best) out[a.id] = best;
        });
        S.picks = out;
      }
      function evaluate() {
        var ids = Object.keys(S.dots), max = Math.max.apply(null, ids.map(function (id) { return S.dots[id]; }));
        var top = ids.filter(function (id) { return S.dots[id] === max; });
        picksFromDots();
        if (top.length === 1) { setChoice(top[0]); paint(); A.ensure(); A.chime(2); return; }
        put(result, h("div", { class: "panel stack" }, h("p", { class: "lead" }, T("tieSay")),
          radioChips(T("tieSay"), top.map(function (id) { return { id: id, label: G.COMP[id].no + " " + L(G.COMP[id].name) }; }), S.choice, function (id) { setChoice(id); paint(); })));
      }
      function paintResult() {
        if (S.choice) {
          var more = S.picks ? Object.keys(S.picks).map(function (a) { return S.picks[a]; }).filter(function (id) { return id !== S.choice; }) : [];
          var seen = S.later && S.st[0] && S.st[0].area === G.COMP[S.choice].area;
          put(result, chosenPanel(S.choice, T("ourChoice"), h("p", { class: "small" }, seen ? T("choiceSeen") : T("choiceWhere", { area: L(G.AREA[G.COMP[S.choice].area].name) })),
            S.len === "exp" && more.length ? h("p", { class: "small" }, T("picksToo", { list: more.map(function (id) { return L(G.COMP[id].name); }).join(", ") })) : null));
          return;
        }
        if (!given()) { put(result); return; }
        put(result, h("div", { class: "row" }, h("button", { type: "button", class: "btn btn--sign", onclick: evaluate }, T("countDots")),
          given() < n ? h("span", { class: "small muted" }, T("dotsWait")) : null));
      }
      var direct = h("details", { class: "panel" }, h("summary", null, T("agreeDirect")),
        radioChips(T("agreeDirect"), D.competences.map(function (c) { return { id: c.id, label: c.no + " " + L(c.name) }; }), S.choice, function (id) { S.dots = {}; S.picks = null; setChoice(id); direct.open = false; paint(); }));
      /* The game leader may put the choice after the first station: then the group has felt what a card is. */
      var later = S.len === "exp" && !S.later && !S.choice && !S.st.some(function (x) { return x && x.comp; }) ? h("div", { class: "row" },
        h("button", { type: "button", class: "btn btn--ghost", onclick: function () {
          S.later = true; S.dots = {}; S.picks = null; save();
          S.i = plan().findIndex(function (p) { return p.k === 0; }); save(); ctl.repaint(true);
        } }, "↷ " + T("chooseLater")), h("span", { class: "small muted" }, T("chooseLaterSub"))) : null;
      paintR0(); paint();
      return { icon: "compass", kicker: phLabel(step.ph), title: T("wChooseT"), say: (S.later ? T("chooseAfterOne") + " " : "") + (isR0() ? T("wChooseSayR0") : T("wChooseSay")),
        body: [r0Box, status, grid, result, direct, later],
        read: function () { return isR0() ? T("wChooseSayR0") : T("wChooseSay"); },
        need: function () { if (isR0() && !S.sdg) return T("needSdg"); return S.choice ? null : T("needChooseComp"); } };
    },
    /* Outdoors the place is the sound: a phone speaker is lost in the wind, and a recording would beat the real thing.
     * So outdoors the group listens for twenty seconds with the hourglass; indoors the app plays the station sound. */
    sound: function (step, st, ctl) {
      var a = G.AREA[st.area], k = step.k, inside = S.place === "in";
      var pickArea = S.len === "one" && !S.choice ? radioChips(T("chooseArea"), D.areas.map(function (x) { return { id: x.id, label: L(x.short) }; }), st.area, function (id) { if (st.area !== id) { S.st[k] = { area: id }; save(); ctl.repaint(); } }) : null;
      var swap = h("button", { type: "button", class: "btn btn--small btn--ghost", onclick: function () { S.place = inside ? "out" : "in"; save(); ctl.repaint(); } }, inside ? "🌳 " + T("placeAreOut") : "🏠 " + T("placeAreIn"));
      return { icon: "sound", kicker: phLabel(step.ph), title: L(a.name), say: inside ? T("wSoundSayIn") : T("wSoundSay"),
        body: [pickArea ? h("p", { class: "small muted" }, T("chooseArea")) : null, pickArea,
          S.len === "exp" ? h("p", { class: "note station-go", style: { borderColor: G.areaVar(a) } }, G.areaSym(a, "eyebrow-sym"), T(k ? "goToStation" : "goToStation1", { n: k + 1, area: L(a.name) })) : null,
          h("p", { class: "lead" }, "«" + L(a.teaser) + "»"),
          inside ? G.soundPanel(a) : timer(dur("sound"), { glass: true, start: T("listen20"), hint: T("listenHint") }),
          h("div", { class: "row" }, swap),
          k > 0 && S.names.length ? h("div", { class: "panel" }, h("h3", null, T("rolesSwap")), roleList(k)) : null] };
    },
    card: function (step, st, ctl) {
      var k = step.k, slot = h("div", { class: "draw-card" });
      var tools = h("div", { class: "row" }), note = h("div"), jokerBox = h("div");
      /* The joker: once per game, a group may write its own card instead of the one it drew. */
      var jokerOk = !solo() && S.len !== "walk";
      function showCard(anim) {
        var c = G.COMP[st.comp], card = st.joker ? G.jokerCard(st.joker, { big: true }) : G.compCard(c, { big: true, flippable: true, solo: solo() });
        if (anim && !G.reduced) card.classList.add("dealt");
        put(slot, card);
        put(note, st.joker ? h("p", { class: "note" }, "🃏 " + T("jokerPlayed")) : S.choice === st.comp ? h("p", { class: "note" }, "⭐ " + T("chosenCardNote")) : null);
        put(tools,
          G.speakButton(function () { return st.joker ? st.joker.q : G.compQ(c, solo()); }, T("readQuestion")),
          st.joker ? h("button", { type: "button", class: "btn btn--small btn--ghost", onclick: function () { st.joker = null; save(); showCard(true); paintJoker(); } }, "↺ " + T("jokerUndo"))
            : h("button", { type: "button", class: "btn btn--small btn--ghost", onclick: function () { draw(); } }, "↻ " + T("drawAgain")));
        ctl.refresh();
      }
      function draw(id) {
        var list = pool(st, k).filter(function (c) { return c.id !== st.comp; });
        st.comp = id || G.pick(list.length ? list : D.competences).id; st.est = estFor(st, k); st.trail = null; st.trail2 = null; st.spark = null; st.pts = null; st.guess = null; st.revealed = false; st.joker = null;
        save(); showCard(true); paintJoker();
        if (store.get("autoRead", false)) Voice.speak(G.compQ(G.COMP[st.comp], solo()), "narrator");
      }
      function playJoker(j) {
        st.joker = { comp: j.comp, own: j.own || "", q: (j.q || "").trim(), steps: j.steps.map(function (x) { return (x || "").trim(); }), done: (j.done || "").trim(), at: j.at };
        if (st.comp !== j.comp) { st.comp = j.comp; st.est = estFor(st, k); st.trail = null; st.trail2 = null; st.spark = null; st.pts = null; st.guess = null; st.revealed = false; }
        save(); showCard(true); paintJoker();
      }
      function openJoker() {
        var ov = G.overlay({ label: T("tJoker") + " · " + T("jokerOwn") });
        var saved = G.jokers();
        var ed = G.jokerEditor({ comp: st.comp || (pool(st, k)[0] || {}).id, saveLabel: "🃏 " + T("jokerPlay"), onSave: function (j) { ov.close(); playJoker(j); } });
        ov.body.append(h("p", { class: "lead" }, L(D.joker.back)), h("p", { class: "small muted" }, L(D.joker.rule) + " " + T("jokerTime")), ed.el,
          saved.length ? h("details", { class: "panel" }, h("summary", null, T("jokerSaved", { n: saved.length })),
            h("div", { class: "chips" }, saved.map(function (j) { return h("button", { type: "button", class: "chip", onclick: function () { ov.close(); playJoker(j); } }, "🃏 " + G.jokerName(j) + ": " + j.q); }))) : null);
      }
      function paintJoker() {
        var at = jokerAt();
        if (!jokerOk || st.joker) { put(jokerBox); return; }
        put(jokerBox, at >= 0 ? h("p", { class: "small muted" }, "🃏 " + T("jokerUsed", { st: phLabel("st" + at) }))
          : h("div", { class: "joker-offer" }, h("button", { type: "button", class: "btn", onclick: openJoker }, "🃏 " + T("jokerOffer")), h("span", { class: "small muted" }, T("jokerOfferSub"))));
      }
      if (st.comp) showCard(false);
      else put(slot, h("button", { type: "button", class: "deck", onclick: function () { draw(); } }, h("span", { class: "deck-c" }), h("span", { class: "deck-c" }), h("span", { class: "deck-top" }, G.icon("card", "deck-ico"), h("b", null, "✦ " + T("drawCard")))));
      paintJoker();
      var paper = h("details", { class: "panel" }, h("summary", null, T("paperCard")),
        h("div", { class: "chips paper-chips" }, pool(st, k).map(function (c) { return h("button", { type: "button", class: "chip", style: { borderColor: G.areaVar(G.AREA[c.area]) }, onclick: function () { paper.open = false; draw(c.id); } }, c.no + " " + L(c.name)); })));
      return { icon: "card", kicker: phLabel(step.ph), title: T("wCardT"), say: solo() ? T("wCardSaySolo") : T("wCardSay") + (stations() ? " " + T("cardOfThree") : ""),
        body: [note, slot, tools, jokerBox, paper],
        read: function () { return st.joker ? st.joker.q : st.comp ? G.compQ(G.COMP[st.comp], solo()) : ""; },
        need: function () { return st.comp ? null : T("needCard"); } };
    },
    trail: function (step, st, ctl) {
      var box = h("div", { class: "stack" });
      function result(t) {
        put(box, cardRow(G.trailMini(t, false, solo()), G.trailBack(), [h("p", { class: "eyebrow" }, solo() ? T("trailIsSolo") : T("trailIs")), h("p", { class: "lead" }, G.trailChange(t, solo())),
          h("button", { type: "button", class: "btn btn--small btn--ghost", onclick: function () { st.trail = null; save(); fan(); ctl.refresh(); } }, "↻ " + T("drawAgain"))]));
        ctl.refresh();
      }
      function fan() {
        var f = h("div", { class: "trail-fan" }, D.trails.map(function (t) { return h("div", { class: "flip3d" }, h("div", { class: "flip3d-inner" }, h("div", { class: "flip3d-face" }, G.trailMini(t, true)), h("div", { class: "flip3d-face flip3d-back" }, G.trailMini(t, false, solo())))); }));
        var drawBtn = h("button", { type: "button", class: "btn btn--sign btn--big", onclick: function () {
          drawBtn.disabled = true;
          var k = Math.random() * D.trails.length | 0, cards = f.children;
          if (!G.reduced) f.classList.add("shuffling");
          setTimeout(function () {
            f.classList.remove("shuffling");
            Array.prototype.forEach.call(cards, function (el, i) { el.classList.toggle("dim", i !== k); });
            cards[k].classList.add("flipped");
            st.trail = D.trails[k].id; save();
            if (store.get("autoRead", false)) Voice.speak(L(D.trails[k].name) + ". " + G.trailChange(D.trails[k], solo()), "narrator");
            setTimeout(function () { if (box.isConnected) result(D.trails[k]); }, G.reduced ? 200 : 1500);
          }, G.reduced ? 0 : 1000);
        } }, "✦ " + T("drawTrail"));
        put(box, f, h("div", { class: "row", style: { justifyContent: "center" } }, drawBtn),
          h("details", { class: "panel" }, h("summary", null, T("chooseTrail")),
            h("div", { class: "trail-pick" }, D.trails.map(function (t) { return h("button", { type: "button", class: "btn", onclick: function () { st.trail = t.id; save(); result(t); } }, L(t.name) + ": " + L(t.motto)); }))));
      }
      if (st.trail) result(trailById(st.trail)); else fan();
      return { icon: "fork", kicker: phLabel(step.ph), title: T("drawTrail"), say: T("wTrailSay"), body: [compSummary(st, false, true), box],
        read: function () { var t = trailById(st.trail); return t ? L(t.name) + ". " + G.trailChange(t, solo()) : ""; },
        need: function () { return st.trail ? null : T("needTrail"); } };
    },
    spark: function (step, st, ctl) {
      var must = S.len === "exp" && step.k === 3 && sparkCount() === 0 && !st.spark;
      var box = h("div", { class: "stack" });
      /* Two sparks change the cards themselves: «Double» adds a trail card, «Swap» exchanges the competence card. */
      function sparkAction(sp) {
        if (sp.id === "double") {
          if (st.trail2) { var t2 = trailById(st.trail2); return cardRow(G.trailMini(t2, false, solo()), G.trailBack(), [h("p", { class: "eyebrow" }, T("secondTrailIs")), h("p", { class: "lead" }, G.trailChange(t2, solo()))]); }
          return h("button", { type: "button", class: "btn btn--sign", onclick: function () { var rest = D.trails.filter(function (t) { return t.id !== st.trail; }); st.trail2 = G.pick(rest).id; save(); result(); } }, "✦ " + T("secondTrail"));
        }
        if (sp.id === "swap") {
          var others = pool(st, step.k).filter(function (c) { return c.id !== st.comp; });
          if (!others.length) others = D.competences.filter(function (c) { return c.id !== st.comp; });
          return h("div", { class: "stack" }, h("p", null, T("swapSay")),
            radioChips(T("swapSay"), others.map(function (c) { return { id: c.id, label: c.no + " " + L(c.name) }; }), null, function (id) { st.comp = id; st.joker = null; st.est = estFor(st, step.k); st.swapped = true; save(); result(); ctl.repaint(); }));
        }
        return null;
      }
      function result() {
        var sp = sparkById(st.spark);
        put(box, sp ? cardRow(G.sparkMini(sp), G.sparkBack(), [h("p", { class: "eyebrow" }, T("sparkIs")), h("p", { class: "lead" }, L(sp.text))])
          : h("p", { class: "lead" }, T("noSparkThis")),
          sp && !st.swapped ? sparkAction(sp) : null,
          st.swapped ? h("p", { class: "note" }, T("swapDone", { name: L(G.COMP[st.comp].name) })) : null,
          h("button", { type: "button", class: "btn btn--small btn--ghost", onclick: function () { st.spark = null; st.trail2 = null; save(); wheel(); ctl.refresh(); } }, "↻ " + T("changeMind")));
        ctl.refresh();
      }
      function wheel() {
        var res = h("p", { class: "lead", "aria-live": "polite" });
        var w = G.sparkWheel(function (sp) { st.spark = sp.id; save(); G.award("spark"); put(res, h("b", null, L(sp.name) + ": "), L(sp.text)); if (store.get("autoRead", false)) Voice.speak(L(sp.name) + ". " + L(sp.text), "narrator"); setTimeout(function () { if (box.isConnected) result(); }, 1400); });
        var spin = h("button", { type: "button", class: "btn btn--sign", onclick: function () { spin.disabled = true; if (no) no.disabled = true; w.spin(); } }, T("spinWheel"));
        var no = must ? null : h("button", { type: "button", class: "btn", onclick: function () { st.spark = "none"; save(); result(); } }, T("noSpark"));
        put(box, must ? h("p", { class: "note warn" }, T("sparkMust")) : null, h("div", { class: "wheel-wrap" }, w.el), h("div", { class: "row", style: { justifyContent: "center" } }, spin, no), res);
      }
      if (st.spark) result(); else wheel();
      return { icon: "spark", kicker: phLabel(step.ph), title: T("wSparkT"), say: T("sparkQ"), body: [compSummary(st, false, true), box],
        need: function () {
          if (!st.spark) return T("needSpark");
          if (st.spark === "double" && !st.trail2) return T("needSecondTrail");
          return null;
        } };
    },
    /* One step per screen: whoever leads reads it out, everyone does it, then «Next step». One hourglass runs through all three.
     * «Done when» comes with the last step. Alone, the solo form is one short paragraph. */
    task: function (step, st, ctl) {
      var c = G.COMP[st.comp], r = roleOf(step.k), j = st.joker;
      var steps = solo() ? [] : j ? j.steps.filter(function (x) { return (x || "").trim(); }) : c.steps.map(L);
      var done = j ? (j.done || "").trim() : L(c.done), n = steps.length;
      if (!(st.sub >= 0 && st.sub < n)) st.sub = 0;
      var box = h("div", { class: "panel task-now", "aria-live": "polite" });
      function paintSub() {
        if (!n) { put(box, h("p", { class: "eyebrow" }, T("soloForm")), h("p", { class: "task-now-text" }, j ? j.q : L(c.solo))); return; }
        var i = st.sub, ex = !j && c.examples && c.examples.at === i + 1 ? L(c.examples) : "";
        put(box, h("p", { class: "eyebrow" }, T("stepOf", { i: i + 1, n: n })),
          h("p", { class: "task-now-text" }, steps[i]),
          ex ? h("p", { class: "task-ex" }, ex) : null,
          i === n - 1 && done ? h("p", { class: "task-done" }, "✓ " + done) : null,
          h("div", { class: "task-dots", "aria-hidden": "true" }, steps.map(function (_, k) { return h("i", { class: k <= i ? "on" : "" }); })));
        ctl.relabel();
      }
      paintSub();
      return { icon: "hand", title: T("wTaskT"), say: solo() ? T("wTaskSaySolo") : T("wTaskSay"),
        body: [box, compSummary(st, false),
          timer(dur("task", st), { glass: true, hint: T("sandHint") }),
          solo() ? null : h("details", { class: "panel" }, h("summary", null, T("accessForm")), h("p", null, L(c.access))),
          !solo() && S.names.length > 2 ? h("p", { class: "note" }, T("trackerCheck", { name: nm(r.tracker) })) : null],
        nextLabel: function () { return n && st.sub < n - 1 ? T("nextStep") : null; },
        onNext: function () { if (n && st.sub < n - 1) { st.sub++; save(); paintSub(); return true; } return false; },
        onBack: function () { if (n && st.sub > 0) { st.sub--; save(); paintSub(); return true; } return false; },
        read: function () { return n ? steps[st.sub] + (st.sub === n - 1 && done ? ". " + done : "") : j ? j.q : L(c.solo); } };
    },
    talk: function (step, st) {
      var c = G.COMP[st.comp], slot = h("div", { class: "talk-slot" });
      if (st.talk == null) { st.talk = Math.random() * 2 | 0; save(); }
      /* Who asks is drawn once per station; the question on the round card is what you talk about. */
      if (st.asker == null && S.names.length) { st.asker = Math.random() * S.names.length | 0; save(); }
      var asker = S.names.length ? st.asker : -1;
      function paint() { put(slot, G.zoomOne(G.talkMini(c, st.talk), G.talkMini(c, st.talk, true))); }
      paint();
      return { icon: "talk", kicker: phLabel(step.ph), title: T("wTalkT"), say: asker >= 0 ? T("talkSayName", { name: nm(asker) }) : T("talkSayNoName"),
        body: [h("div", { class: "row talk-row" }, slot,
          h("div", { class: "stack", style: { flex: "1", minWidth: "220px" } },
            h("button", { type: "button", class: "btn btn--small btn--ghost", onclick: function () { st.talk = 1 - st.talk; save(); paint(); } }, "↻ " + T("otherQuestion")))),
          timer(dur("talk", st), { hint: T("talkHint") })],
        read: function () { return L(c.talk[st.talk]); } };
    },
    est: function (step, st, ctl) {
      var e = estById(st.est);
      if (!e) return { icon: "target", kicker: phLabel(step.ph), title: T("tEst"), say: T("noEstimate"), body: null };
      st.guess = st.guess || {};
      var n = S.names.length, inputs = h("div", { class: "est-inputs" }), out = h("div", { class: "stack" });
      var revealBtn = h("button", { type: "button", class: "btn btn--sign btn--big" }, T("revealAnswer"));
      var withPts = G.withPoints() && n > 1;
      function paintInputs() {
        put(inputs, S.names.map(function (_, i) {
          var v = st.guess[i];
          if (e.type === "number") {
            var inp = h("input", { type: "number", id: "g-" + i, min: "0", step: "any", inputmode: "decimal", value: v != null ? v : "", disabled: st.revealed || null });
            inp.addEventListener("input", function () { var x = parseFloat(String(inp.value).replace(",", ".")); if (x > 0) st.guess[i] = x; else delete st.guess[i]; save(); ctl.refresh(); });
            return h("div", { class: "guess-row", style: { "--pc": pcol(i) } }, h("label", { for: "g-" + i }, nm(i)), inp, h("span", { class: "muted" }, L(e.unit)));
          }
          return h("div", { class: "guess-row", style: { "--pc": pcol(i) } }, h("span", { class: "guess-name" }, nm(i)),
            h("div", { class: "row" },
              h("button", { type: "button", class: "chip", "aria-pressed": String(v === true), disabled: st.revealed || null, onclick: function () { st.guess[i] = true; save(); paintInputs(); ctl.refresh(); } }, "👍 " + T("trueBtn")),
              h("button", { type: "button", class: "chip", "aria-pressed": String(v === false), disabled: st.revealed || null, onclick: function () { st.guess[i] = false; save(); paintInputs(); ctl.refresh(); } }, "👎 " + T("falseBtn"))));
        }));
      }
      /* Who was nearest (numbers) or right (true or not). With points: nearest +3, second +1, right +1. */
      function score() {
        var pts = {}, got = Object.keys(st.guess).map(Number);
        if (e.type === "number") {
          var dist = got.map(function (i) { return { i: i, d: Math.abs(Math.log10(st.guess[i] / e.answer)) }; }).sort(function (p, q) { return p.d - q.d; });
          var ranks = []; dist.forEach(function (x) { if (!ranks.length || Math.abs(ranks[ranks.length - 1] - x.d) > 1e-9) ranks.push(x.d); });
          dist.forEach(function (x) { if (x.d === ranks[0]) pts[x.i] = 3; else if (ranks.length > 1 && x.d === ranks[1]) pts[x.i] = 1; });
          if (dist.some(function (x) { return Math.abs(st.guess[x.i] - e.answer) / e.answer <= 0.1; })) G.award("spoton");
        } else got.forEach(function (i) { if (st.guess[i] === e.answer) pts[i] = 1; });
        return pts;
      }
      /* Without points the reveal is the reward: the answer, and who came closest. */
      function closest() {
        var best = Object.keys(st.pts || {}).filter(function (i) { return st.pts[i] === (e.type === "number" ? 3 : 1); }).map(Number);
        if (!best.length) return h("p", { class: "lead" }, e.type === "number" ? "" : T("nobodyRight"));
        return h("p", { class: "lead closest" }, "🎯 " + (e.type === "number" ? T("closestWas", { names: best.map(nm).join(", ") }) : T("rightWere", { names: best.map(nm).join(", ") })));
      }
      function reveal(anim) {
        var viz = h("div", { class: "viz" });
        var rows = S.names.map(function (_, i) { return i; }).filter(function (i) { return st.guess[i] != null; });
        put(out,
          h("p", { class: "eyebrow" }, T("estAnswer")),
          h("p", { class: "answer-big num" + (anim ? " reveal-pop" : "") }, G.answerText(e)),
          h("p", { class: "lead" }, L(e.detail)),
          e.type === "number" ? G.guessScale(e, rows.map(function (i) { return { v: st.guess[i], name: nm(i), color: G.cssVar(COLORS[i % COLORS.length]) }; })) : null,
          viz,
          h("p", { class: "small muted" }, T("source") + ": " + e.source),
          withPts ? h("div", { class: "pts-list" }, S.names.map(function (_, i) {
            var p = (st.pts || {})[i] || 0;
            return h("span", { class: "pts-chip" + (p ? " got" : ""), style: { "--pc": pcol(i) } }, nm(i), h("b", { class: "num" }, (p ? "+" + p : "0")));
          })) : n > 1 ? closest() : null,
          withPts ? h("p", { class: "small muted" }, e.type === "number" ? T("estRuleNum") : T("estRuleTF")) : null);
        G.drawViz(e, viz);
      }
      revealBtn.addEventListener("click", function () {
        if (!Object.keys(st.guess).length) { var f = G.$("#g-0"); if (f) f.focus(); ctl.hint(T("needGuess")); return; }
        st.revealed = true; st.pts = score(); save();
        revealBtn.hidden = true; paintInputs(); reveal(true); ctl.refresh();
        A.ensure(); A.chime(2);
        if (store.get("autoRead", false)) Voice.speak(L(e.detail), "narrator");
      });
      paintInputs();
      if (st.revealed) { revealBtn.hidden = true; reveal(false); }
      return { icon: "target", title: e.type === "number" ? T("estimateNum") : T("estimateTF"), say: e.type === "number" ? T("wEstSay") : T("wEstSayTF"),
        body: [h("div", { class: "panel est-card" }, h("p", { class: "eyebrow" }, G.COMP[e.comp].no + " " + L(G.COMP[e.comp].name)), h("p", { class: "est-q" }, L(e.q))),
          h("div", { class: "panel stack" }, h("h3", null, n > 1 ? T("guessesAll") : T("yourGuess")), inputs,
            h("div", { class: "row" }, revealBtn)), out],
        read: function () { return L(e.q); },
        need: function () { return st.revealed ? null : T("needReveal"); } };
    },
    sentence: function (step, st) {
      var five = S.len === "five", findBtn = null;
      if (!five) {
        findBtn = h("button", { type: "button", class: "btn", "aria-pressed": String(!!st.find), onclick: function () { st.find = !st.find; save(); findBtn.setAttribute("aria-pressed", String(st.find)); findBtn.textContent = (st.find ? "✓ " : "🍂 ") + T("findDone"); } }, (st.find ? "✓ " : "🍂 ") + T("findDone"));
      }
      /* The way to the next station is part of the game: the button names it. */
      var P = plan(), nx = P[P.findIndex(function (p) { return p.id === "sentence" && p.k === step.k; }) + 1] || {};
      var nextLabel = nx.id === "sound" ? T("toStation", { n: nx.k + 1 }) : nx.id === "what" || nx.id === "debrief" ? T("toDebrief") : null;
      return { icon: "leaf", kicker: phLabel(step.ph), title: !five ? T("wSentT") : solo() ? T("wSentTSolo") : T("phSentence"), say: solo() ? T("wSentSaySolo") : five ? T("oneSentence") : T("wSentSay"),
        body: [timer(dur("sentence")), findBtn ? h("div", { class: "row" }, findBtn) : null],
        nextLabel: function () { return nextLabel; } };
    },
    /* Debrief, after Rolfe: What? So what? Now what? */
    what: function (step) {
      var rows = S.st.map(function (st, k) {
        if (!st || !st.comp) return null;
        var c = G.COMP[st.comp], t = trailById(st.trail), sp = sparkById(st.spark);
        return h("li", { style: { "--area": G.areaVar(G.AREA[c.area]) } }, h("b", null, phLabel("st" + k) + " · " + (st.joker ? "🃏 " + G.jokerName(st.joker) : L(c.name))),
          h("span", null, [t ? L(t.name) : null, sp ? "✦ " + L(sp.name) : null, st.find ? "🍂 " + T("findShort") : null].filter(Boolean).join(" · ")));
      });
      return { icon: "eye", kicker: T("debriefOf", { i: 1, n: 3 }), title: T("whatT"), say: T("whatSay"),
        body: [h("ol", { class: "recap" }, rows), timer(dur("what"))] };
    },
    sowhat: function (step, st, ctl) {
      var c = S.choice && G.COMP[S.choice];
      return { icon: "compass", kicker: T("debriefOf", { i: 2, n: 3 }), title: T("sowhatT"), say: c ? T("sowhatSay", { name: L(c.name) }) : T("sowhatSayNo"),
        body: [choiceCheck(ctl), h("p", { class: "lead" }, T("surpriseQ")), timer(dur("sowhat"))],
        need: function () { return S.final ? null : S.choice ? T("needFinal") : T("needFinalPick"); } };
    },
    nowwhat: function (step, st, ctl) {
      return { icon: "seed", kicker: T("debriefOf", { i: 3, n: 3 }), title: T("nowwhatT"), say: T("nowwhatSay"),
        body: [timer(dur("nowwhat")), planField(ctl), S.sdg ? h("p", { class: "note" }, T("r0Plan", { sdg: sdgText(S.sdg) })) : null],
        need: function () { return (S.plan || "").trim() ? null : T("needPlan"); } };
    },
    /* One station: the same three questions on one screen. Having played one card, the group now chooses. */
    debrief: function (step, st, ctl) {
      return { icon: "eye", kicker: phLabel(step.ph), title: T("phDebrief"), say: T("debriefSay"),
        body: [h("ol", { class: "rules3" }, h("li", null, h("b", null, T("whatT") + " "), T("whatSayShort")), h("li", null, h("b", null, T("sowhatT") + " "), S.choice ? T("sowhatSayShort") : T("sowhatSayPick")), h("li", null, h("b", null, T("nowwhatT") + " "), T("nowwhatSayShort"))),
          timer(dur("debrief")), choiceCheck(ctl), planField(ctl), S.sdg ? h("p", { class: "note" }, T("r0Plan", { sdg: sdgText(S.sdg) })) : null],
        need: function () { if (!S.final) return S.choice ? T("needFinal") : T("needFinalPick"); return (S.plan || "").trim() ? null : T("needPlan"); } };
    },
    walk: function (step, st) {
      var c = G.COMP[st.comp];
      /* The walk itself records what was played when it ends. */
      if (!S.done) { S.done = true; save(); }
      return { icon: "walk", kicker: phLabel(step.ph), title: T("wWalkT"), say: T("wWalkSay"), last: true,
        body: [compSummary(st, false),
          h("ul", { class: "checklist big-list" }, h("li", null, T("walk1")), h("li", null, T("walk2")), h("li", null, T("walk3"))),
          h("div", { class: "row" }, h("button", { type: "button", class: "btn btn--sign btn--big", onclick: function () { G.openWalk(c.id); } }, "▶ " + T("startWalk")))] };
    },
    end: function (step, st, ctl) {
      finish();
      var c0 = S.st[0] && S.st[0].comp;
      var msg = h("p", { class: "small muted", "aria-live": "polite" });
      var ta = h("textarea", { id: "end-promise", placeholder: T("promisePh") });
      return { icon: "seed", title: T("wEndT"), say: solo() ? T("wEndSaySolo") : T("wEndSay"), last: true,
        body: [outsidePanel(),
          h("div", { class: "panel" }, h("div", { class: "field" }, h("label", { for: "end-promise" }, T("writePromise")), ta),
            h("div", { class: "row" }, h("button", { type: "button", class: "btn btn--sign", onclick: function () { if (G.savePromise(ta.value, c0)) { msg.textContent = T("saved"); ta.value = ""; } } }, T("save"))), msg),
          againRow(ctl)] };
    },
    promise: function (step) {
      var last = S.st[S.st.length - 1] || {};
      var msg = h("p", { class: "small muted", "aria-live": "polite" });
      var ta = h("textarea", { id: "game-promise", placeholder: T("promisePh") });
      var say = D.guide.expedition.find(function (x) { return x.k === "promise"; });
      return { icon: "seed", kicker: phLabel(step.ph), title: T("tPromise"), say: L(say.d),
        body: [cardRow(G.promiseMini(false), G.promiseMini(true), [h("p", { class: "lead" }, L(D.promise.back))]),
          (S.plan || "").trim() ? h("p", { class: "note" }, T("promiseFromPlan", { plan: S.plan.trim().replace(/[.!?]+$/, "") })) : null,
          h("div", { class: "panel" }, h("div", { class: "field" }, h("label", { for: "game-promise" }, T("promiseOwn")), ta),
            h("div", { class: "row" }, h("button", { type: "button", class: "btn btn--sign", onclick: function () { if (G.savePromise(ta.value, last.comp)) { msg.textContent = T("saved"); ta.value = ""; } } }, T("save"))), msg)] };
    },
    /* The end: everyone points at the same time at the person who leads the next game. No winner, no master card.
     * With points switched on, the estimate points are shown as well, for fun. */
    leader: function (step, st, ctl) {
      finish();
      var box = h("div", { class: "stack" });
      function paint() {
        var finds = S.st.filter(function (x) { return x && x.find; }).length, pts = points(), withPts = G.withPoints() && S.names.length > 1;
        var order = S.names.map(function (_, i) { return i; }).sort(function (p, q) { return pts[q] - pts[p]; });
        put(box,
          h("div", { class: "panel stack" }, h("h3", null, T("leaderQ")), h("p", { class: "small muted" }, T("leaderHow")),
            radioChips(T("leaderQ"), S.names.map(function (_, i) { return { id: i, label: nm(i) }; }), S.leader, function (i) { S.leader = S.leader === i ? null : i; save(); paint(); })),
          S.leader != null ? h("div", { class: "master-card leader-card" },
            h("span", { class: "eyebrow" }, T("leaderNext")), G.icon("flag", "master-ico"),
            h("h2", null, nm(S.leader)), h("p", null, T("leaderLead"))) : null,
          withPts ? h("div", { class: "panel" }, h("h3", null, T("ptsEst")),
            h("ol", { class: "score-list" }, order.map(function (i) { return h("li", { style: { "--pc": pcol(i) } }, h("span", null, nm(i)), h("b", { class: "num" }, String(pts[i]))); })),
            h("p", { class: "small muted" }, T("ptsHow"))) : null,
          h("p", { class: "note" }, "🍂 " + T("findsLaid", { n: finds, m: S.st.length }) + (sparkCount() || S.len !== "exp" ? "" : " " + T("noSparkGame"))));
      }
      paint();
      return { icon: "flag", kicker: phLabel(step.ph), title: T("wLeaderT"), say: T("wLeaderSay"), last: true,
        body: [box, groupCard(), outsidePanel(), againRow(ctl)] };
    }
  };

  /* ---------- the group card: what stays from the game ---------- */
  function cardData() {
    var jk = S.st.filter(function (x) { return x && x.joker; })[0];
    return { date: new Date().toISOString(), goal: goalText(), e4c: S.goal === "sdg" ? S.e4c || null : null, sdg: S.sdg || null, joker: jk ? { name: G.jokerName(jk.joker), q: jk.joker.q } : null, choice: S.choice || S.final, final: S.choice ? S.final : null, plan: (S.plan || "").trim(),
      comps: S.st.filter(function (x) { return x && x.comp; }).map(function (x) { return x.comp; }), finds: S.st.filter(function (x) { return x && x.find; }).length, stations: S.st.length };
  }
  G.groupCardText = function (d) {
    var lines = [T("groupCardT") + " · " + G.fmtDate(d.date)];
    if (d.goal) lines.push(T("gcGoal") + ": " + d.goal);
    if (d.e4c) lines.push(T("gcE4c") + ": " + e4cText(d.e4c));
    if (d.sdg) lines.push(T("gcSdg") + ": " + sdgText(d.sdg));
    if (d.choice) lines.push(T("gcChoice") + ": " + L(G.COMP[d.choice].name) + (d.final && d.final !== d.choice ? " → " + L(G.COMP[d.final].name) : ""));
    if (d.plan) lines.push(T("gcPlan") + ": " + d.plan);
    lines.push(T("gcPlayed") + ": " + d.comps.map(function (id) { return L(G.COMP[id].name); }).join(", "));
    if (d.joker) lines.push(T("tJoker") + ": " + d.joker.name + " · " + d.joker.q);
    lines.push(T("gcFinds") + ": " + d.finds + "/" + d.stations);
    lines.push(T("appName") + " · CC BY 4.0");
    return lines.join("\n");
  };
  G.groupCardEl = function (d, withActions) {
    var msg = h("p", { class: "small muted", "aria-live": "polite" }), area = h("textarea", { class: "copy-area", hidden: true, readonly: true, "aria-label": T("groupCardT") });
    function row(k, v) { return v ? [h("dt", null, T(k)), h("dd", null, v)] : null; }
    var choice = d.choice ? L(G.COMP[d.choice].name) + (d.final && d.final !== d.choice ? " → " + T("atTheEnd") + " " + L(G.COMP[d.final].name) : "") : "";
    return h("div", { class: "group-card" },
      h("p", { class: "eyebrow" }, T("groupCardT") + " · " + G.fmtDate(d.date)),
      h("dl", null, row("gcGoal", d.goal), row("gcE4c", e4cText(d.e4c)), row("gcSdg", d.sdg ? sdgText(d.sdg) : ""), row("gcChoice", choice), row("gcPlan", d.plan),
        row("gcPlayed", d.comps.map(function (id) { return L(G.COMP[id].name); }).join(", ")), row("tJoker", d.joker ? d.joker.name + " · " + d.joker.q : ""), row("gcFinds", d.finds + " / " + d.stations)),
      withActions ? h("div", { class: "row" },
        h("button", { type: "button", class: "btn btn--small btn--sign", onclick: function () { G.copyText(G.groupCardText(d), msg, area); } }, T("copyCard")),
        h("a", { class: "btn btn--small btn--ghost", href: COMMUNITY, target: "_blank", rel: "noopener" }, T("shareCommunity"))) : null,
      withActions ? h("p", { class: "small muted" }, T("shareSay")) : null,
      withActions ? msg : null, withActions ? area : null);
  };
  function groupCard() { return h("div", { class: "stack" }, h("h3", null, T("groupCardT")), h("p", { class: "small muted" }, T("groupCardSay")), G.groupCardEl(cardData(), true)); }

  function outsidePanel() {
    var out = h("p", { class: "muted", "aria-live": "polite" }, S.out === true ? "✓ " + T("yesOutside") : S.out === false ? T("nextTime") : "");
    var row = h("div", { class: "row", hidden: S.out != null },
      h("button", { type: "button", class: "btn btn--sign", onclick: function () { S.out = true; save(); G.award("outside"); row.hidden = true; out.textContent = "✓ " + T("yesOutside"); } }, "☀ " + T("yesOutside")),
      h("button", { type: "button", class: "btn", onclick: function () { S.out = false; save(); row.hidden = true; out.textContent = T("nextTime"); } }, T("noInside")));
    return h("div", { class: "panel" }, h("h3", null, solo() ? T("outsideQSolo") : T("outsideQ")), row, out);
  }
  function againRow(ctl) {
    return h("div", { class: "row" },
      h("button", { type: "button", class: "btn btn--sign", onclick: function () {
        S.st = []; S.leader = null; S.out = null; S.done = false; S.pre = null; S.sil = null; S.dots = {}; S.choice = null; S.final = null; S.changed = false; S.plan = ""; S.thumbs = {}; S.picks = null;
        S.roles = (S.roles + 1) % Math.max(1, S.names.length);
        var P = plan(); S.i = P.findIndex(function (p) { return p.id === "card" || p.id === "silence"; }); save(); ctl.repaint(true);
      } }, "↻ " + T("playAgain")),
      h("a", { class: "btn", href: "#spuren" }, T("toMyTrail")));
  }
  function finish() {
    if (S.done) return;
    S.done = true; save();
    S.st.forEach(function (st) { if (st && st.comp) G.markPlayed({ comp: st.comp, trail: st.trail }); });
    if (S.len !== "walk") G.award("first");
    if (stations()) { var list = store.get("groupCards", []); list.unshift(cardData()); store.set("groupCards", list.slice(0, 24)); }
  }

  /* ---------- the page ---------- */
  G.pages.spielen = function (app) {
    S = load();
    var root = h("div", { class: "wrap play" });
    app.append(root);
    function stopRuns() { runs.forEach(function (f) { try { f(); } catch (e) {} }); runs = []; Voice.cancel(); if (A && A.stopAll) A.stopAll(); }
    G.onLeave(stopRuns);
    var nextBtn, hintEl, def;
    var ctl = {
      go: function (d) { var P = plan(); S.i = Math.max(0, Math.min(P.length - 1, S.i + d)); save(); paint(true); },
      repaint: function (moved) { paint(!!moved); },
      refresh: function () { if (!nextBtn) return; var need = def.need && def.need(); nextBtn.classList.toggle("is-wait", !!need); if (!need) hintEl.textContent = ""; else if (hintEl.textContent) hintEl.textContent = need; },
      /* A step with parts of its own (the task, one step per screen) names the next button after its next part. */
      relabel: function () { if (nextBtn && def) nextBtn.textContent = ((def.nextLabel && def.nextLabel()) || def.next || T("next")) + " →"; },
      hint: function (t) { if (hintEl) hintEl.textContent = t; }
    };
    function stepText() { var r = def.read ? def.read() : ""; return [def.title, def.say, r].filter(Boolean).join(". "); }
    var readBtn = null;
    function paint(moved) {
      stopRuns();
      var P = plan();
      if (S.i >= P.length) S.i = P.length - 1;
      if (S.i < 0) S.i = 0;
      var step = P[S.i];
      if (step.k != null && !S.choice && S.len && S.len !== "five" && S.len !== "walk") {
        var ci = P.findIndex(function (p) { return p.id === "choose"; });
        if (ci >= 0 && ci < S.i) { S.i = ci; save(); return paint(moved); }
      }
      var st = step.k != null ? stn(step.k) : null;
      if (st && step.id !== "sound" && step.id !== "card" && !st.comp) { S.i = P.findIndex(function (p) { return p.id === "card" && p.k === step.k; }); save(); return paint(moved); }
      def = STEPS[step.id](step, st, ctl);
      save();
      var known = !!S.len || S.who === "room";
      var phs = [];
      P.forEach(function (p, k) { var last = phs[phs.length - 1]; if (!last || last.ph !== p.ph) phs.push(last = { ph: p.ph, from: k, n: 0 }); last.n++; });
      var confirm = h("div", { class: "row" });
      var restart = S.i > 0 ? h("button", { type: "button", class: "btn btn--small btn--ghost", onclick: function () {
        put(confirm, h("div", { class: "confirm" }, h("span", null, T("restartQ")),
          h("button", { type: "button", class: "btn btn--small", onclick: function () { S = fresh(); save(); paint(true); } }, T("restart")),
          h("button", { type: "button", class: "btn btn--small btn--ghost", onclick: function () { confirm.replaceChildren(); } }, T("cancel"))));
      }, "aria-label": T("restart") }, "↺", h("span", { class: "hide-xs" }, " " + T("restart"))) : null;
      var top = h("div", { class: "play-top" },
        h("div", { class: "play-meta" }, h("p", { class: "eyebrow" }, "▶ " + T("playNowBig")), known ? h("p", { class: "muted small num" }, T("stepOf", { i: S.i + 1, n: P.length })) : null, restart),
        confirm,
        h("div", { class: "play-prog", "aria-hidden": "true" }, phs.map(function (x) {
          var done = Math.max(0, Math.min(x.n, S.i - x.from + 1)), state = S.i >= x.from + x.n ? "done" : S.i >= x.from ? "now" : "";
          return h("div", { class: "ph " + state, style: { "--w": String(x.n) } }, h("span", null, phLabel(x.ph)), h("div", { class: "bar" }, h("i", { style: { width: (100 * done / x.n) + "%" } })));
        })));
      var title = h("h1", { tabindex: "-1" }, def.title);
      /* Every step with a clock says how long it takes, right under its name. */
      var secs = TIMED[step.id] && (step.id !== "brief" || stations()) ? dur(step.id, st) : 0;
      var kicker = (def.kicker || phLabel(step.ph)) + (secs ? " · " + durLabel(secs) : "");
      if (S.len === "exp" && step.k != null) kicker = kicker.replace(phLabel(step.ph), T("phStationOf", { n: step.k + 1, m: 4 }));
      var area = st && st.comp ? G.AREA[G.COMP[st.comp].area] : st && st.area ? G.AREA[st.area] : null;
      var card = h("article", { class: "play-step" + (moved && !G.reduced ? " in" : ""), style: area ? { "--area": G.areaVar(area) } : null },
        h("header", { class: "play-head" },
          h("span", { class: "play-num", "aria-hidden": "true" }, known ? String(S.i + 1) : G.icon(def.icon)),
          h("div", { class: "stack", style: { gap: "4px" } }, h("p", { class: "eyebrow" }, kicker), title),
          readBtn = Voice.ok ? G.speakButton(stepText, T("readOut"), "btn btn--small btn--ghost play-read") : null),
        def.say ? h("p", { class: "play-say" }, def.say) : null,
        h("div", { class: "play-body stack" }, def.body));
      hintEl = h("p", { class: "play-hint", role: "status" });
      var back = S.i > 0 ? h("button", { type: "button", class: "btn", onclick: function () { if (def.onBack && def.onBack()) return; ctl.go(-1); } }, "← ", h("span", { class: "hide-xs" }, T("back"))) : h("span");
      nextBtn = def.last ? null : h("button", { type: "button", class: "btn btn--sign btn--big play-next", onclick: function () {
        if (def.onNext && def.onNext()) return;
        var need = def.need && def.need();
        if (need) { hintEl.textContent = need; nextBtn.classList.remove("nudge"); void nextBtn.offsetWidth; nextBtn.classList.add("nudge"); return; }
        ctl.go(1);
      } }, ((def.nextLabel && def.nextLabel()) || def.next || T("next")) + " →");
      var nav = h("nav", { class: "play-nav", "aria-label": T("stepsNav") }, back, hintEl, nextBtn || h("a", { class: "btn btn--ghost", href: "#" }, T("home")));
      put(root, top, card, nav);
      ctl.refresh();
      if (moved) { window.scrollTo(0, 0); title.focus({ preventScroll: true }); }
      if (moved && store.get("autoRead", false) && Voice.on && readBtn) setTimeout(function () { if (title.isConnected) readBtn.speak(); }, 350);
      /* «Skip» next to a clock: on to the next screen, unless this step still needs something. */
      skipHandler = function () { var need = def.need && def.need(); if (need) { hintEl.textContent = need; return; } ctl.go(1); };
    }
    paint(false);
  };

  /* Start a game from anywhere: the home page, a card page, a QR code.
   * len: start right at the first step of that game, without setup (a coaster on a table: five minutes; #los: one station).
   * replace: the address that started it (#los) is replaced, so that «back» does not start a new game. */
  G.newGame = function (who, comp, len, replace) {
    S = fresh(); S.pre = comp && G.COMP[comp] ? comp : null;
    if (who) { S.who = who; S.i = 1; if (who === "group") S.names = ["", "", ""]; }
    if (who && len) { S.len = len; var P = plan(); S.i = Math.max(0, P.findIndex(function (p) { return p.ph !== "setup"; })); }
    save();
    if (replace) { history.replaceState(null, "", "#spielen"); G.route(); }
    else if (location.hash === "#spielen") G.route(); else location.hash = "spielen";
  };
  /* «Original plus» is no game of its own: the expedition with the goal «a UN goal», set beforehand. Starts at the names. */
  G.newOriginal = function () {
    S = fresh(); S.who = "group"; S.names = ["", "", ""]; S.len = "exp"; S.goal = "sdg"; S.r0 = true;
    S.i = Math.max(0, plan().findIndex(function (p) { return p.id === "names"; }));
    save();
    if (location.hash === "#spielen") G.route(); else location.hash = "spielen";
  };
  G.gameInProgress = function () {
    var g = store.get("game", null);
    if (!g || g.v !== 2 || g.done || !g.len || g.i < 1) return null;
    return { i: g.i + 1, n: planFor(g.who, g.len, g.later).length };
  };

  /* ---------- «Prepare»: for the game leader, before the day ---------- */
  G.pages.vorbereiten = function (app) {
    var P = store.get("prep", {}); P.checks = P.checks || {}; P.len = P.len || "exp"; P.n = P.n || 4; P.pace = P.pace || "normal";
    function keep() { store.set("prep", P); }
    var progress = h("p", { class: "prep-progress num", "aria-live": "polite" });
    function paintProgress() { var n = D.prep.filter(function (x) { return P.checks[x.id]; }).length; progress.textContent = T("prepDone", { n: n, m: D.prep.length }); progress.classList.toggle("is-done", n === D.prep.length); }
    var goalBox = h("div");
    function paintGoal() {
      put(goalBox, radioChips(T("goalQ"), D.goals.map(function (g) { return { id: g.id, label: L(g.t) }; }), P.goal, function (id) { P.goal = id; if (id !== "sdg") P.e4c = null; keep(); paintGoal(); paintPlan(); }),
        P.goal === "sdg" ? [h("p", { class: "small muted" }, T("r0Prep")), e4cChoice(P.e4c, function (id) { P.e4c = id; keep(); paintGoal(); })] : null);
    }
    var own = h("input", { type: "text", id: "prep-goal", maxlength: "80", value: P.goalText || "", placeholder: T("prepGoalOwnPh") });
    own.addEventListener("input", function () { P.goalText = own.value; if (own.value.trim()) P.goal = "own"; keep(); });
    var list = h("ul", { class: "prep-list" }, D.prep.map(function (x) {
      var cb = h("input", { type: "checkbox", id: "prep-" + x.id, checked: !!P.checks[x.id] });
      cb.addEventListener("change", function () { P.checks[x.id] = cb.checked; keep(); paintProgress(); });
      return h("li", null, h("label", { for: "prep-" + x.id }, cb, h("span", null, h("b", null, L(x.t)), h("small", null, L(x.d)))));
    }));
    var planBox = h("div", { class: "stack" });
    function paintPlan() {
      var segs = runPlan("group", P.len, P.n, P.pace, P.goal === "sdg"), total = Math.round(segs.reduce(function (a, x) { return a + x.sec; }, 0) / 60);
      put(planBox,
        h("div", { class: "row" }, h("span", { class: "small" }, h("b", null, T("planMode"))), radioChips(T("planMode"), [{ id: "one", label: T("phStation1") }, { id: "exp", label: T("expShort") }], P.len, function (id) { P.len = id; keep(); paintPlan(); })),
        h("div", { class: "row" }, h("span", { class: "small" }, h("b", null, T("planPeople"))), radioChips(T("planPeople"), [2, 3, 4, 5, 6].map(function (n) { return { id: n, label: String(n) }; }), P.n, function (n) { P.n = n; keep(); paintPlan(); })),
        h("div", { class: "row" }, h("span", { class: "small" }, h("b", null, T("paceT"))), radioChips(T("paceT"), ["calm", "normal", "brisk"].map(function (p) { return { id: p, label: T(p === "calm" ? "paceCalm" : p === "brisk" ? "paceBrisk" : "paceNormal") }; }), P.pace, function (p) { P.pace = p; keep(); paintPlan(); })),
        h("div", { class: "tbl-wrap" }, h("table", { class: "plan-table" },
          h("tbody", null, segs.map(function (x) { return h("tr", null, h("td", null, x.label), h("td", { class: "num" }, T("minShort", { n: x.min }))); })),
          h("tfoot", null, h("tr", null, h("th", null, T("planTotal")), h("th", { class: "num" }, T("minShort", { n: total })))))),
        h("p", { class: "small muted" }, T("paceHint") + " " + T("planNote")));
    }
    paintGoal(); paintPlan(); paintProgress();
    app.append(
      h("section", { class: "wrap page-head" }, h("p", { class: "eyebrow" }, T("prepEyebrow")), h("h1", null, T("prepT")), h("p", { class: "lead" }, T("prepLead")), progress),
      h("section", { class: "wrap prep" },
        h("div", { class: "panel stack" }, h("h2", null, "1 · " + T("goalQ")), h("p", { class: "small muted" }, T("prepGoalWhy")), goalBox,
          h("div", { class: "field" }, h("label", { for: "prep-goal" }, T("prepGoalOwn")), own)),
        h("div", { class: "panel stack" }, h("h2", null, "2 · " + T("prepListT")), list),
        h("div", { class: "panel stack" }, h("h2", null, "3 · " + T("prepTimeT")), planBox),
        h("div", { class: "panel stack" }, h("h2", null, "4 · " + T("prepDayT")),
          h("ol", { class: "steps-list" }, h("li", null, T("prepDay1")), h("li", null, T("prepDay2")), h("li", null, T("prepDay3"))),
          h("div", { class: "row" }, h("button", { type: "button", class: "btn btn--sign btn--big", onclick: function () { G.newGame("group"); } }, "▶ " + T("playNowBig")), h("a", { class: "btn", href: "#tafel" }, T("openBoard")))),
        h("div", { class: "row", style: { paddingBottom: "40px" } }, h("button", { type: "button", class: "btn btn--small btn--ghost", onclick: function () { P.checks = {}; keep(); G.route(); } }, "↺ " + T("prepReset")))));
  };
})();
