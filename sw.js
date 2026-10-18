/* GreenComp Trails: offline after the first visit. Cache-first for the app shell,
   stale-while-revalidate for fonts and the QR library. Stores nothing about the user. */
var CACHE = "gct-v12";
var SHELL = ["./", "index.html", "data.js", "pieces.js", "guide.js", "i18n.js", "audio.js", "core.js", "cards.js", "joker.js", "deckel.js", "viz.js", "scenes.js", "play.js", "tafel.js", "spielen.js", "pages.js", "app.js", "manifest.webmanifest", "icon.svg"];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  var url = new URL(e.request.url);
  var external = /fonts\.(googleapis|gstatic)\.com$|cdn\.jsdelivr\.net$/.test(url.hostname);
  if (url.origin !== self.location.origin && !external) return;
  e.respondWith(caches.open(CACHE).then(function (cache) {
    return cache.match(e.request, { ignoreSearch: url.origin === self.location.origin }).then(function (hit) {
      var net = fetch(e.request).then(function (res) {
        if (res && (res.ok || res.type === "opaque")) cache.put(e.request, res.clone());
        return res;
      }).catch(function () { return hit; });
      return hit || net;
    });
  }));
});
