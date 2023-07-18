'use strict';

importScripts('sw-toolbox.js');

toolbox.precache(["index.html","style/style.css"]);

toolbox.router.get('/images/*', toolbox.cacheFirst);

toolbox.router.get('/*', toolbox.networkFirst, {
  networkTimeoutSeconds: 5
});

// sw.js
self.addEventListener('install', (event) => {
  async function buildCache() {
    const cache = await caches.open(cacheName);
    return cache.addAll([
    
      '/index.html',
    ]);
  }
  event.waitUntil(buildCache());
});

self.addEventListener('fetch', (event) => {
  async function cachedFetch(event) {
    const cache = await caches.open(cacheName);
    let response = await cache.match(event.request);
    if (response) return response;
    response = await fetch(event.request);
    cache.put(event.request, response.clone());
    return response;
  }
  event.respondWith(cachedFetch(event));
});
