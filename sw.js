/* Spuren: offline after the first visit. Stores nothing about the user.
   The app's own files: network first, so a new version shows at once; the cache only when there is no network.
   Fonts and the QR library: from the cache, refreshed in the background. */
var CACHE = "gct-v13";
var SHELL = ["./", "index.html", "data.js", "pieces.js", "guide.js", "i18n.js", "audio.js", "core.js", "cards.js", "joker.js", "deckel.js", "viz.js", "scenes.js", "play.js", "tafel.js", "spielen.js", "pages.js", "app.js", "manifest.webmanifest", "icon.svg"];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return c.addAll(SHELL.map(function (u) { return new Request(u, { cache: "reload" }); }));
  }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    var old = keys.filter(function (k) { return k !== CACHE; });
    return Promise.all(old.map(function (k) { return caches.delete(k); })).then(function () { return self.clients.claim(); }).then(function () {
      /* An update, not a first visit: open pages still show the old version, so load them again. */
      if (!old.length) return;
      return self.clients.matchAll({ type: "window" }).then(function (cs) {
        cs.forEach(function (c) { if (c.navigate) c.navigate(c.url).catch(function () {}); });
      });
    });
  }));
});
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  var url = new URL(e.request.url);
  var external = /fonts\.(googleapis|gstatic)\.com$|cdn\.jsdelivr\.net$/.test(url.hostname);
  if (url.origin !== self.location.origin && !external) return;
  e.respondWith(caches.open(CACHE).then(function (cache) {
    var key = { ignoreSearch: url.origin === self.location.origin };
    if (external) {
      return cache.match(e.request).then(function (hit) {
        var net = fetch(e.request).then(function (res) { if (res && (res.ok || res.type === "opaque")) cache.put(e.request, res.clone()); return res; }).catch(function () { return hit; });
        return hit || net;
      });
    }
    return fetch(url.href, { cache: "no-cache", credentials: "same-origin" }).then(function (res) {
      if (res && res.ok) cache.put(e.request, res.clone());
      return res;
    }).catch(function () {
      return cache.match(e.request, key).then(function (hit) { return hit || cache.match("index.html"); });
    });
  }));
});
