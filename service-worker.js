const CACHE_NAME = "azkary-github-pages-v5";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/style.css",
  "./css/bootstrap.min.css",
  "./css/font.css",
  "./css/layout.all.css",
  "./css/responsive.css",
  "./css/all.min.css",
  "./bootstrap-icons/bootstrap-icons.min.css",
  "./bootstrap-icons/fonts/bootstrap-icons.woff2",
  "./js/bootstrap.bundle.min.js",
  "./js/app.js",
  "./js/main.js",
  "./js/index.js",
  "./js/mail.js",
  "./assets/icon/icon-192.png",
  "./assets/icon/icon-512.png",
  "./assets/images/logo-AM.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(async (cache) => {
        // Cache files one by one so a single optional asset never breaks SW installation.
        await Promise.allSettled(
          APP_SHELL.map(async (url) => {
            try {
              await cache.add(url);
            } catch (error) {
              console.warn("PWA cache skipped:", url);
            }
          })
        );
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const requestURL = new URL(event.request.url);
  if (requestURL.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, copy).catch(() => {});
            });
          }
          return response;
        })
        .catch(() => {
          // GitHub Pages SPA/navigation fallback.
          if (event.request.mode === "navigate") {
            return caches.match("./index.html");
          }
          return Response.error();
        });
    })
  );
});
