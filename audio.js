/* GreenComp Trails — synthetic soundscapes (Web Audio API).
 * Stand-ins until real 3D field recordings exist. Nothing is loaded from the network.
 * Building blocks: noise beds (wind, stream, rain), bird species, insects, bells, steps, machines, traffic.
 */
(function () {
  "use strict";
  var A = { ctx: null, master: null, analyser: null, buffers: {}, scenes: new Set() };

  function ensure() {
    if (!A.ctx) {
      var C = window.AudioContext || window.webkitAudioContext;
      if (!C) return null;
      A.ctx = new C();
      A.master = A.ctx.createGain();
      A.master.gain.value = 0.9;
      var comp = A.ctx.createDynamicsCompressor();
      comp.threshold.value = -14; comp.ratio.value = 4;
      A.analyser = A.ctx.createAnalyser();
      A.analyser.fftSize = 512;
      A.master.connect(comp); comp.connect(A.analyser); A.analyser.connect(A.ctx.destination);
    }
    if (A.ctx.state === "suspended") { A.ctx.resume().catch(function () {}); }
    return A.ctx;
  }

  /* ---------- primitives ---------- */
  function noise(kind) {
    var ctx = A.ctx;
    if (A.buffers[kind]) return A.buffers[kind];
    var len = ctx.sampleRate * 5, buf = ctx.createBuffer(2, len, ctx.sampleRate);
    for (var ch = 0; ch < 2; ch++) {
      var d = buf.getChannelData(ch), last = 0, b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (var i = 0; i < len; i++) {
        var w = Math.random() * 2 - 1;
        if (kind === "brown") { last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; }
        else if (kind === "pink") {
          b0 = 0.99886 * b0 + w * 0.0555179; b1 = 0.99332 * b1 + w * 0.0750759; b2 = 0.969 * b2 + w * 0.153852;
          b3 = 0.8665 * b3 + w * 0.3104856; b4 = 0.55 * b4 + w * 0.5329522; b5 = -0.7616 * b5 - w * 0.016898;
          d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11; b6 = w * 0.115926;
        } else d[i] = w;
      }
    }
    A.buffers[kind] = buf;
    return buf;
  }
  function src(kind) { var s = A.ctx.createBufferSource(); s.buffer = noise(kind); s.loop = true; s.loopStart = Math.random(); return s; }
  function pan(v) { if (A.ctx.createStereoPanner) { var p = A.ctx.createStereoPanner(); p.pan.value = Math.max(-1, Math.min(1, v || 0)); return p; } return A.ctx.createGain(); }
  function lfo(rate, depth, target, offset) {
    var o = A.ctx.createOscillator(), g = A.ctx.createGain();
    o.frequency.value = rate; g.gain.value = depth; o.connect(g); g.connect(target);
    if (offset != null) target.value = offset;
    o.start(); return o;
  }
  function rnd(a, b) { return a + Math.random() * (b - a); }
  function irnd(a, b) { return Math.floor(rnd(a, b + 1)); }
  function curve(n, fn) { var a = new Float32Array(n); for (var i = 0; i < n; i++) a[i] = Math.max(30, fn(i / (n - 1))); return a; }
  function ease(u) { return u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2; }

  /* A pitched voice following a frequency curve, with a soft envelope and an optional octave partial. */
  function voice(dest, t, freqs, d, v, p, harm, attack) {
    var ctx = A.ctx, o = ctx.createOscillator(), g = ctx.createGain(), pn = pan(p);
    o.type = "sine";
    o.frequency.setValueCurveAtTime(freqs, t, d);
    var a = attack || Math.min(0.015, d / 4);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(v, t + a);
    g.gain.setValueAtTime(v, t + Math.max(a, d * 0.7));
    g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    o.connect(g);
    if (harm) {
      var o2 = ctx.createOscillator(), g2 = ctx.createGain();
      g2.gain.value = harm;
      o2.frequency.setValueCurveAtTime(freqs.map(function (f) { return f * 2; }), t, d);
      o2.connect(g2); g2.connect(g); o2.start(t); o2.stop(t + d + 0.03);
    }
    g.connect(pn); pn.connect(dest);
    o.start(t); o.stop(t + d + 0.03);
  }
  function tone(dest, t, f0, f1, d, v, type, p) {
    var ctx = A.ctx, o = ctx.createOscillator(), g = ctx.createGain(), pn = pan(p);
    o.type = type || "sine";
    o.frequency.setValueAtTime(f0, t);
    o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + d);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(v, t + Math.min(0.02, d / 3));
    g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    o.connect(g); g.connect(pn); pn.connect(dest);
    o.start(t); o.stop(t + d + 0.05);
  }
  function burst(dest, t, f, q, d, v, p) {
    var ctx = A.ctx, s = ctx.createBufferSource(), bp = ctx.createBiquadFilter(), g = ctx.createGain(), pn = pan(p);
    s.buffer = noise("white"); bp.type = "bandpass"; bp.frequency.value = f; bp.Q.value = q;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v, t + 0.003); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    s.connect(bp); bp.connect(g); g.connect(pn); pn.connect(dest);
    s.start(t, Math.random() * 3); s.stop(t + d + 0.02);
  }

  /* ---------- birds ---------- */
  var BIRDS = {
    /* Amsel: fluting, slurred notes, then a thin twitter. */
    blackbird: function (dest, t, v, p) {
      var x = t, n = irnd(3, 6);
      for (var i = 0; i < n; i++) {
        var d = rnd(0.1, 0.3), f0 = rnd(1400, 2500), f1 = f0 * rnd(0.75, 1.35), vib = rnd(14, 30), vd = rnd(0.01, 0.025);
        voice(dest, x, curve(80, function (u) { return (f0 + (f1 - f0) * ease(u)) * (1 + vd * Math.sin(2 * Math.PI * vib * u * d)); }), d, v, p, 0.14);
        x += d + rnd(0.03, 0.09);
      }
      var m = irnd(2, 5);
      for (var j = 0; j < m; j++) { var f = rnd(4500, 7000); voice(dest, x, curve(16, function (u) { return f * (1 + 0.3 * u); }), 0.035, v * 0.45, p); x += 0.055; }
      return x - t;
    },
    /* Kohlmeise: "tee-cher, tee-cher, tee-cher". */
    greattit: function (dest, t, v, p, pairs) {
      var x = t, hi = rnd(4800, 5800), lo = hi * rnd(0.64, 0.72), n = pairs || irnd(3, 4);
      for (var i = 0; i < n; i++) {
        voice(dest, x, curve(16, function (u) { return hi * (1 - 0.04 * u); }), 0.1, v, p);
        voice(dest, x + 0.13, curve(16, function (u) { return lo * (1 - 0.02 * u); }), 0.1, v * 0.9, p);
        x += 0.36;
      }
      return x - t;
    },
    /* Buchfink: an accelerating, falling trill and a flourish. */
    chaffinch: function (dest, t, v, p) {
      var x = t, f = rnd(5600, 6400);
      for (var i = 0; i < 11; i++) {
        var ff = f * Math.pow(0.95, i);
        voice(dest, x, curve(12, function (u) { return ff * (1 - 0.2 * u); }), 0.045, v * 0.85, p);
        x += 0.09 - i * 0.004;
      }
      voice(dest, x + 0.02, curve(24, function (u) { return 3800 - 900 * u; }), 0.09, v, p);
      voice(dest, x + 0.13, curve(24, function (u) { return 3400 + 1800 * u; }), 0.09, v, p);
      voice(dest, x + 0.25, curve(24, function (u) { return 2600 + 200 * Math.sin(u * 9); }), 0.16, v * 0.9, p, 0.1);
      return x + 0.45 - t;
    },
    /* Kuckuck: two soft, falling notes. */
    cuckoo: function (dest, t, v, p) {
      voice(dest, t, curve(32, function (u) { return 720 - 25 * u; }), 0.24, v, p, 0.06, 0.04);
      voice(dest, t + 0.36, curve(32, function (u) { return 590 - 25 * u; }), 0.36, v, p, 0.06, 0.04);
      return 0.75;
    },
    /* Zaunkönig: loud, fast, high trills. */
    wren: function (dest, t, v, p) {
      var x = t;
      for (var s2 = 0; s2 < 2; s2++) {
        var base = rnd(6000, 8000);
        for (var i = 0; i < irnd(10, 16); i++) { voice(dest, x, curve(8, function (u) { return base * (1 + 0.15 * (1 - u)); }), 0.026, v * 0.7, p); x += 0.042; }
        x += 0.12;
      }
      return x - t;
    },
    /* Rotkehlchen: thin, wandering whistles. */
    robin: function (dest, t, v, p) {
      var x = t;
      for (var i = 0; i < irnd(4, 7); i++) {
        var a = rnd(3500, 7500), b = rnd(3500, 7500), d = rnd(0.08, 0.2);
        voice(dest, x, curve(40, function (u) { return a + (b - a) * u; }), d, v * 0.6, p);
        x += d + rnd(0.04, 0.12);
      }
      return x - t;
    },
    /* Eisvogel: sharp "tiiii" whistles. */
    kingfisher: function (dest, t, v, p) {
      for (var i = 0; i < 3; i++) voice(dest, t + i * 0.34, curve(24, function (u) { return 6800 - 700 * u; }), 0.22, v, p);
      return 1.1;
    },
    /* Taube: a low, rolling coo. */
    pigeon: function (dest, t, v, p) {
      voice(dest, t, curve(80, function (u) { return (430 - 70 * u) * (1 + 0.03 * Math.sin(u * 40)); }), 0.55, v, p, 0.25, 0.06);
      voice(dest, t + 0.7, curve(80, function (u) { return (400 - 50 * u) * (1 + 0.03 * Math.sin(u * 40)); }), 0.75, v * 0.9, p, 0.25, 0.06);
      return 1.6;
    }
  };
  var SONG_SET = ["blackbird", "greattit", "chaffinch", "robin", "wren"];
  function song(dest, t, v, which) {
    var name = which || SONG_SET[Math.random() * SONG_SET.length | 0];
    return BIRDS[name](dest, t, v, rnd(-0.9, 0.9));
  }
  function woodpecker(dest, t, v, p) {
    p = p == null ? rnd(-0.8, 0.8) : p;
    var n = irnd(14, 21);
    for (var i = 0; i < n; i++) tone(dest, t + i * 0.052, 900, 500, 0.03, v * (1 - i / n * 0.5), "triangle", p);
  }

  /* ---------- insects, bells, steps, machines ---------- */
  function cricketChirp(dest, t, f, v, p, spread) {
    for (var k = 0; k < 3; k++) {
      if (spread) for (var j = 0; j < spread; j++) tone(dest, t + k * 0.034 + rnd(-0.004, 0.004), f + rnd(-60, 60), f + rnd(-60, 60), 0.022, v / Math.sqrt(spread), "sine", rnd(-1, 1));
      else tone(dest, t + k * 0.034, f, f, 0.022, v, "sine", p);
    }
  }
  function bee(dest, t, dur, v, p0, p1) {
    var ctx = A.ctx, o = ctx.createOscillator(), lp = ctx.createBiquadFilter(), g = ctx.createGain(), pn = pan(p0);
    o.type = "sawtooth"; o.frequency.value = rnd(200, 240);
    var l = ctx.createOscillator(), lg = ctx.createGain(); l.frequency.value = rnd(6, 10); lg.gain.value = 7; l.connect(lg); lg.connect(o.frequency);
    lp.type = "lowpass"; lp.frequency.value = 1100; lp.Q.value = 3;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v, t + dur * 0.3); g.gain.setValueAtTime(v, t + dur * 0.7); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    if (pn.pan) { pn.pan.setValueAtTime(p0, t); pn.pan.linearRampToValueAtTime(p1, t + dur); }
    o.connect(lp); lp.connect(g); g.connect(pn); pn.connect(dest);
    o.start(t); l.start(t); o.stop(t + dur + 0.05); l.stop(t + dur + 0.05);
  }
  function bell(dest, t, f, v, far) {
    var ctx = A.ctx, lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = far ? 1600 : 6000; lp.connect(dest);
    [[0.5, 0.5, 7], [1, 1, 5], [1.19, 0.45, 3.5], [1.5, 0.3, 3], [2, 0.35, 2.4], [2.52, 0.18, 1.7], [3.01, 0.12, 1.2]].forEach(function (pt) {
      var o = ctx.createOscillator(), g = ctx.createGain();
      o.frequency.value = f * pt[0];
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v * pt[1], t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + pt[2]);
      o.connect(g); g.connect(lp); o.start(t); o.stop(t + pt[2] + 0.1);
    });
  }
  function ring(dest, t, v, p) { /* bicycle bell */
    [[3150, 1], [4180, 0.6]].forEach(function (pt) {
      for (var r = 0; r < 2; r++) {
        var o = A.ctx.createOscillator(), g = A.ctx.createGain(), pn = pan(p), s = t + r * 0.22;
        o.frequency.value = pt[0];
        g.gain.setValueAtTime(0.0001, s); g.gain.exponentialRampToValueAtTime(v * pt[1], s + 0.005); g.gain.exponentialRampToValueAtTime(0.0001, s + 0.8);
        o.connect(g); g.connect(pn); pn.connect(dest); o.start(s); o.stop(s + 0.85);
      }
    });
  }
  function step(dest, t, v, p) { for (var i = 0; i < irnd(4, 7); i++) burst(dest, t + i * rnd(0.007, 0.016), rnd(1600, 4200), rnd(1, 2.5), rnd(0.02, 0.05), v * rnd(0.4, 1), p); }
  function walker(dest, t, n, v, p0, p1) {
    for (var i = 0; i < n; i++) { var u = i / Math.max(1, n - 1), dist = 1 - Math.abs(u - 0.5) * 1.3; step(dest, t + i * 0.56 + rnd(-0.03, 0.03), v * Math.max(0.15, dist), p0 + (p1 - p0) * u); }
  }
  function car(dest, t, v) {
    var ctx = A.ctx, s = src("pink"), bp = ctx.createBiquadFilter(), g = ctx.createGain(), pn = pan(-1);
    var dir = Math.random() < 0.5 ? 1 : -1, d = rnd(2.4, 4);
    bp.type = "bandpass"; bp.Q.value = 0.9;
    bp.frequency.setValueAtTime(rnd(380, 520), t); bp.frequency.linearRampToValueAtTime(rnd(700, 950), t + d / 2); bp.frequency.linearRampToValueAtTime(rnd(300, 420), t + d);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v, t + d / 2); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    if (pn.pan) { pn.pan.setValueAtTime(-dir, t); pn.pan.linearRampToValueAtTime(dir, t + d); }
    s.connect(bp); bp.connect(g); g.connect(pn); pn.connect(dest);
    s.start(t); s.stop(t + d + 0.1);
  }
  function passBy(dest, t, d, v, lowF, highF, dir) { /* a long whoosh, e.g. a train or a tram */
    var ctx = A.ctx, s = src("pink"), bp = ctx.createBiquadFilter(), g = ctx.createGain(), pn = pan(-dir);
    bp.type = "bandpass"; bp.Q.value = 0.7;
    bp.frequency.setValueAtTime(lowF, t); bp.frequency.linearRampToValueAtTime(highF, t + d * 0.5); bp.frequency.linearRampToValueAtTime(lowF * 0.8, t + d);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v, t + d * 0.5); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    if (pn.pan) { pn.pan.setValueAtTime(-dir, t); pn.pan.linearRampToValueAtTime(dir, t + d); }
    s.connect(bp); bp.connect(g); g.connect(pn); pn.connect(dest); s.start(t); s.stop(t + d + 0.1);
    var r = src("brown"), lp = ctx.createBiquadFilter(), rg = ctx.createGain();
    lp.type = "lowpass"; lp.frequency.value = 140;
    rg.gain.setValueAtTime(0.0001, t); rg.gain.exponentialRampToValueAtTime(v * 1.6, t + d * 0.5); rg.gain.exponentialRampToValueAtTime(0.0001, t + d);
    r.connect(lp); lp.connect(rg); rg.connect(dest); r.start(t); r.stop(t + d + 0.1);
  }
  function thunder(dest, t, v) {
    var ctx = A.ctx, s = src("brown"), lp = ctx.createBiquadFilter(), g = ctx.createGain();
    lp.type = "lowpass"; lp.frequency.value = 180;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v, t + 0.4); g.gain.exponentialRampToValueAtTime(v * 0.5, t + 1.4); g.gain.exponentialRampToValueAtTime(0.0001, t + 4);
    s.connect(lp); lp.connect(g); g.connect(dest); s.start(t); s.stop(t + 4.2);
  }

  /* ---------- scene framework ---------- */
  function Scene(build) {
    var ctx = ensure();
    if (!ctx) return { stop: function () {}, ok: false };
    var out = ctx.createGain();
    out.gain.setValueAtTime(0.0001, ctx.currentTime);
    out.gain.exponentialRampToValueAtTime(1, ctx.currentTime + 1.2);
    out.connect(A.master);
    var self = { ok: true, out: out, ctx: ctx, t0: ctx.currentTime, timers: [], nodes: [], stopped: false };
    self.every = function (minS, maxS, fn) {
      var next = ctx.currentTime + rnd(0.2, minS);
      var id = setInterval(function () {
        if (self.stopped || ctx.state !== "running") return;
        while (next < ctx.currentTime + 0.4) { fn(Math.max(next, ctx.currentTime + 0.02), next - self.t0); next += rnd(minS, maxS); }
      }, 100);
      self.timers.push(id);
    };
    self.at = function (sec) { return self.t0 + sec; };
    self.bus = function (fadeIn, fadeOut) { /* a sub-mix that fades in at [a,b] and out at [c,d] seconds */
      var g = ctx.createGain(); g.connect(out);
      g.gain.setValueAtTime(fadeIn ? 0.0001 : 1, self.t0);
      if (fadeIn) { g.gain.setValueAtTime(0.0001, self.at(fadeIn[0])); g.gain.exponentialRampToValueAtTime(1, self.at(fadeIn[1])); }
      if (fadeOut) { g.gain.setValueAtTime(1, self.at(fadeOut[0])); g.gain.exponentialRampToValueAtTime(0.0001, self.at(fadeOut[1])); }
      return g;
    };
    self.keep = function (n) { self.nodes.push(n); return n; };
    self.stop = function (fade) {
      if (self.stopped) return;
      self.stopped = true;
      var f = fade == null ? 1.2 : fade, now = ctx.currentTime;
      try { out.gain.cancelScheduledValues(now); out.gain.setValueAtTime(Math.max(out.gain.value, 0.0001), now); out.gain.exponentialRampToValueAtTime(0.0001, now + f); } catch (e) {}
      self.timers.forEach(clearInterval);
      setTimeout(function () { self.nodes.forEach(function (n) { try { n.stop(); } catch (e) {} }); try { out.disconnect(); } catch (e) {} A.scenes.delete(self); }, f * 1000 + 100);
    };
    A.scenes.add(self);
    build(self, ctx, out);
    return self;
  }

  function windBed(S, ctx, dest, level) {
    var s = S.keep(src("brown")), lp = ctx.createBiquadFilter(), g = ctx.createGain();
    lp.type = "lowpass"; lp.Q.value = 0.7;
    S.keep(lfo(0.07, 350, lp.frequency, 650));
    S.keep(lfo(0.13, level * 0.45, g.gain, level));
    s.connect(lp); lp.connect(g); g.connect(dest); s.start();
    var hs = S.keep(src("white")), hp = ctx.createBiquadFilter(), hg = ctx.createGain();
    hp.type = "highpass"; hp.frequency.value = 4200;
    S.keep(lfo(0.11, level * 0.05, hg.gain, level * 0.06));
    hs.connect(hp); hp.connect(hg); hg.connect(dest); hs.start();
    return g;
  }
  function streamBed(S, ctx, dest, level, centre) {
    var s = S.keep(src("white")), bp = ctx.createBiquadFilter(), g = ctx.createGain();
    bp.type = "bandpass"; bp.frequency.value = centre || 1400; bp.Q.value = 0.6;
    S.keep(lfo(3.1, 260, bp.frequency, centre || 1400));
    g.gain.value = level;
    s.connect(bp); bp.connect(g); g.connect(dest); s.start();
    S.every(0.15, 0.6, function (t) { tone(dest, t, rnd(900, 2200), rnd(500, 900), 0.06, level * 0.9, "sine", rnd(-0.7, 0.7)); });
    return g;
  }
  function rainBed(S, ctx, dest, level) {
    var s = S.keep(src("pink")), hp = ctx.createBiquadFilter(), lp = ctx.createBiquadFilter(), g = ctx.createGain();
    hp.type = "highpass"; hp.frequency.value = 500; lp.type = "lowpass"; lp.frequency.value = 7000; g.gain.value = level;
    s.connect(hp); hp.connect(lp); lp.connect(g); g.connect(dest); s.start();
    S.every(0.05, 0.22, function (t) { tone(dest, t, rnd(2200, 4200), 900, 0.05, level * 0.06, "sine", rnd(-1, 1)); });
    return g;
  }
  function cityBed(S, ctx, dest, level) {
    var r = S.keep(src("brown")), lp = ctx.createBiquadFilter(), rg = ctx.createGain();
    lp.type = "lowpass"; lp.frequency.value = 170; rg.gain.value = level;
    r.connect(lp); lp.connect(rg); rg.connect(dest); r.start();
  }
  function plantBed(S, ctx, dest, level) {
    var o1 = S.keep(ctx.createOscillator()), o2 = S.keep(ctx.createOscillator()), lp = ctx.createBiquadFilter(), g = ctx.createGain();
    o1.type = "sawtooth"; o1.frequency.value = 50; o2.type = "sawtooth"; o2.frequency.value = 100.6;
    lp.type = "lowpass"; lp.frequency.value = 320; g.gain.value = level * 0.22;
    o1.connect(lp); o2.connect(lp); lp.connect(g); g.connect(dest); o1.start(); o2.start();
    var pump = S.keep(src("pink")), bp = ctx.createBiquadFilter(), pg = ctx.createGain();
    bp.type = "bandpass"; bp.frequency.value = 650; bp.Q.value = 1.2;
    S.keep(lfo(0.45, level * 0.35, pg.gain, level * 0.35));
    pump.connect(bp); bp.connect(pg); pg.connect(dest); pump.start();
    streamBed(S, ctx, dest, level * 0.12, 2600);
  }

  var BUILD = {
    /* --- the welcome: a short dawn chorus when the app opens (7 s, then it fades) --- */
    welcome: function (S, ctx, out) {
      var air = S.bus([0, 1.5], [5.5, 7.5]);
      windBed(S, ctx, air, 0.16);
      ["robin", "blackbird", "chaffinch", "wren", "greattit", "blackbird"].forEach(function (name, i) {
        BIRDS[name](air, S.at(0.3 + i * 0.9 + rnd(0, 0.3)), i % 2 ? 0.09 : 0.11, rnd(-0.8, 0.8));
      });
    },
    /* --- station sounds (20 s) --- */
    wind: function (S, ctx, out) {
      windBed(S, ctx, out, 0.55);
      S.every(4, 9, function (t) { song(out, t, 0.05); });
    },
    cityToBirds: function (S, ctx, out) {
      var city = S.bus(null, [7, 15]), birds = S.bus([7, 14], null);
      cityBed(S, ctx, city, 0.9);
      S.every(1.2, 3.2, function (t, rel) { if (rel < 13) car(city, t, 0.32); });
      windBed(S, ctx, birds, 0.25);
      S.every(0.4, 1.4, function (t, rel) { if (rel > 7) song(birds, t, 0.07); });
    },
    rainToBirds: function (S, ctx, out) {
      var rain = S.bus(null, [6, 12]), after = S.bus([9, 14], null);
      rainBed(S, ctx, rain, 0.9);
      S.every(0.8, 2.4, function (t, rel) { if (rel > 9) tone(out, t, rnd(1800, 3000), 700, 0.07, 0.06, "sine", rnd(-1, 1)); });
      S.every(0.6, 1.6, function (t, rel) { if (rel > 10) song(after, t, 0.08); });
    },
    clapping: function (S, ctx, out) {
      S.every(0.5, 0.5, function (t, rel) {
        var who = rel < 5 ? 1 : rel < 11 ? 10 : 100;
        var count = who === 1 ? 1 : who === 10 ? 10 : 34;
        var v = who === 1 ? 0.5 : who === 10 ? 0.16 : 0.07;
        for (var i = 0; i < count; i++) burst(out, t + (i ? rnd(-0.025, 0.025) : 0), rnd(900, 2300), rnd(0.7, 1.4), rnd(0.06, 0.1), v, who === 1 ? 0 : rnd(-1, 1));
      });
    },

    /* --- window sounds (about 60 s) --- */
    forest: function (S, ctx, out) {
      windBed(S, ctx, out, 0.3);
      streamBed(S, ctx, out, 0.035);
      S.every(0.35, 2.2, function (t, rel) { if (Math.random() < Math.min(1, 0.25 + rel / 40)) song(out, t, 0.06 + Math.random() * 0.04); });
      S.every(14, 26, function (t) { woodpecker(out, t, 0.12); });
    },
    windBell: function (S, ctx, out) {
      windBed(S, ctx, out, 0.5);
      [6, 30, 49].forEach(function (s2) { bell(out, S.at(s2), 196, 0.14, true); });
      S.every(5, 11, function (t) { song(out, t, 0.04); });
    },
    footsteps: function (S, ctx, out) {
      windBed(S, ctx, out, 0.18);
      walker(out, S.at(2), 12, 0.32, -1, 1);
      walker(out, S.at(13), 10, 0.25, 1, -0.4);
      walker(out, S.at(24), 14, 0.3, -0.6, 1);
      walker(out, S.at(38), 12, 0.36, 1, -1);
      walker(out, S.at(48), 8, 0.2, -1, 0.2);
      S.every(7, 14, function (t) { song(out, t, 0.035); });
    },
    streamPlant: function (S, ctx, out) {
      var nat = S.bus(null, [28, 40]), plant = S.bus([28, 38], null);
      streamBed(S, ctx, nat, 0.07);
      windBed(S, ctx, nat, 0.15);
      S.every(2, 5, function (t, rel) { if (rel < 34) song(nat, t, 0.05); });
      plantBed(S, ctx, plant, 0.8);
    },
    birdQuiz: function (S, ctx, out) {
      windBed(S, ctx, out, 0.16);
      var plan = [[1, "greattit", -0.6], [5, "blackbird", 0.5], [10, "cuckoo", -0.2], [14, "greattit", 0.7], [18.5, "blackbird", -0.5], [24, "cuckoo", 0.3], [27.5, "greattit", -0.1], [31, "blackbird", 0.6]];
      plan.forEach(function (x) { BIRDS[x[1]](out, S.at(x[0]), x[1] === "cuckoo" ? 0.16 : 0.1, x[2]); });
    },
    zoomEar: function (S, ctx, out) {
      var valley = S.bus(null, [18, 26]), creek = S.bus([18, 24], [38, 46]), close = S.bus([38, 42], null);
      windBed(S, ctx, valley, 0.55);
      S.every(3, 6, function (t, rel) { if (rel < 22) song(valley, t, 0.025); });
      streamBed(S, ctx, creek, 0.09);
      windBed(S, ctx, close, 0.08);
      bee(close, S.at(39), 22, 0.12, -0.5, 0.4);
    },
    street2046: function (S, ctx, out) {
      var now = S.bus(null, [22, 30]), later = S.bus([22, 30], null);
      cityBed(S, ctx, now, 0.85);
      S.every(1.1, 2.8, function (t, rel) { if (rel < 28) car(now, t, 0.3); });
      windBed(S, ctx, later, 0.2);
      passBy(later, S.at(31), 9, 0.12, 250, 600, 1);
      bell(later, S.at(30.5), 1250, 0.06); bell(later, S.at(30.8), 1250, 0.06);
      bell(later, S.at(47), 1250, 0.05); bell(later, S.at(47.3), 1250, 0.05);
      ring(later, S.at(37), 0.05, 0.6); ring(later, S.at(52), 0.04, -0.5);
      S.every(1.2, 3, function (t, rel) { if (rel > 28) song(later, t, 0.06, Math.random() < 0.5 ? "blackbird" : "greattit"); });
    },
    weather: function (S, ctx, out) {
      var sun = S.bus(null, [13, 17]), wind = S.bus([13, 16], [28, 32]), rain = S.bus([28, 31], [44, 48]), after = S.bus([44, 48], null);
      windBed(S, ctx, sun, 0.15); S.every(0.8, 2, function (t, rel) { if (rel < 16) song(sun, t, 0.06); });
      windBed(S, ctx, wind, 0.9);
      rainBed(S, ctx, rain, 0.85); thunder(rain, S.at(34), 0.5);
      S.every(0.7, 1.8, function (t, rel) { if (rel > 44) song(after, t, 0.07); });
      S.every(0.6, 1.5, function (t, rel) { if (rel > 44) tone(after, t, rnd(1800, 3000), 700, 0.07, 0.05, "sine", rnd(-1, 1)); });
    },
    kingfisherTrain: function (S, ctx, out) {
      streamBed(S, ctx, out, 0.08, 1100);
      windBed(S, ctx, out, 0.12);
      [14, 20, 26, 50].forEach(function (s2, i) { BIRDS.kingfisher(out, S.at(s2), 0.1, i % 2 ? 0.6 : -0.4); });
      passBy(out, S.at(33), 13, 0.22, 300, 1300, 1);
      for (var k = 0; k < 12; k++) { burst(out, S.at(35 + k * 0.7), 900, 3, 0.05, 0.12, -0.6 + k * 0.1); burst(out, S.at(35.18 + k * 0.7), 900, 3, 0.05, 0.1, -0.6 + k * 0.1); }
    },
    townSquare: function (S, ctx, out) {
      streamBed(S, ctx, out, 0.05, 2400);
      windBed(S, ctx, out, 0.12);
      [21, 24, 27].forEach(function (s2) { bell(out, S.at(s2), 247, 0.18); });
      walker(out, S.at(5), 9, 0.25, -0.8, 0.4);
      walker(out, S.at(36), 10, 0.22, 0.8, -0.6);
      [9, 33, 47].forEach(function (s2) { BIRDS.pigeon(out, S.at(s2), 0.09, rnd(-0.6, 0.6)); });
      S.every(6, 12, function (t) { song(out, t, 0.03); });
    },
    crickets: function (S, ctx, out) {
      windBed(S, ctx, out, 0.08);
      S.every(0.62, 0.62, function (t, rel) { if (rel < 16) cricketChirp(out, t, 4400, 0.07, 0.1); });
      for (var c = 0; c < 10; c++) (function (f, p, period) {
        S.every(period, period * 1.08, function (t, rel) { if (rel > 15 && rel < 33) cricketChirp(out, t, f, 0.035, p); });
      })(rnd(4200, 4800), rnd(-1, 1), rnd(0.5, 0.75));
      S.every(0.58, 0.58, function (t, rel) { if (rel > 32) cricketChirp(out, t, 4500, 0.16, 0, 6); });
      for (var d = 0; d < 6; d++) (function (f, p) {
        S.every(0.5, 0.7, function (t, rel) { if (rel > 32) cricketChirp(out, t, f, 0.012, p); });
      })(rnd(4100, 4900), rnd(-1, 1));
    },
    firstBird: function (S, ctx, out) {
      windBed(S, ctx, out, 0.06);
      [9, 13, 17.5, 22, 26].forEach(function (s2) { BIRDS.robin(out, S.at(s2), 0.12, -0.2); });
      S.every(0.5, 2.2, function (t, rel) {
        if (rel < 30) return;
        if (Math.random() < Math.min(1, (rel - 28) / 18)) song(out, t, 0.05 + Math.random() * 0.04);
      });
    }
  };

  function scene(name) { var b = BUILD[name]; if (!b) return null; return Scene(b); }

  function chime(times) {
    var ctx = ensure(); if (!ctx) return;
    var t = ctx.currentTime + 0.05, n = times || 1;
    for (var k = 0; k < n; k++) {
      var base = 528, start = t + k * 0.9;
      [[1, 0.22], [2.76, 0.09], [5.4, 0.04], [8.93, 0.02]].forEach(function (p) {
        var o = ctx.createOscillator(), g = ctx.createGain();
        o.frequency.value = base * p[0];
        g.gain.setValueAtTime(0.0001, start); g.gain.exponentialRampToValueAtTime(p[1], start + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, start + 3.2 / Math.sqrt(p[0]));
        o.connect(g); g.connect(A.master); o.start(start); o.stop(start + 3.5);
      });
    }
  }

  /* A signal for a new step: short (one call) or full (a whole song, e.g. after three minutes of silence). */
  function signal(kind, full) {
    var ctx = ensure(); if (!ctx) return 0;
    var t = ctx.currentTime + 0.06, g = ctx.createGain(), d = 0;
    g.gain.value = 1; g.connect(A.master);
    if (kind === "blackbird") { d = BIRDS.blackbird(g, t, 0.17, -0.2); if (full) d += 0.5 + BIRDS.blackbird(g, t + d + 0.5, 0.17, 0.25); }
    else if (kind === "greattit") d = BIRDS.greattit(g, t, 0.13, 0, full ? 4 : 2);
    else if (kind === "cuckoo") { d = BIRDS.cuckoo(g, t, 0.28, 0); if (full) { BIRDS.cuckoo(g, t + 1, 0.28, 0); BIRDS.cuckoo(g, t + 2, 0.28, 0); d = 2.8; } }
    else if (kind === "woodpecker") { woodpecker(g, t, 0.32, 0); d = 1.1; if (full) { woodpecker(g, t + 1.5, 0.32, 0.3); d = 2.6; } }
    else { chime(full ? 3 : 1); d = full ? 2.8 : 1; }
    setTimeout(function () { try { g.disconnect(); } catch (e) {} }, (d + 4) * 1000);
    return d;
  }

  window.GCTAudio = {
    ensure: ensure,
    scene: scene,
    chime: chime,
    signal: signal,
    welcome: function () { var sc = scene("welcome"); if (sc && sc.ok) setTimeout(function () { sc.stop(1.5); }, 6500); return sc; },
    analyser: function () { return A.analyser; },
    suspend: function () { if (A.ctx && A.ctx.state === "running") return A.ctx.suspend(); },
    resume: function () { if (A.ctx && A.ctx.state === "suspended") return A.ctx.resume(); },
    stopAll: function () { A.scenes.forEach(function (s) { s.stop(0.4); }); },
    names: Object.keys(BUILD)
  };
})();
