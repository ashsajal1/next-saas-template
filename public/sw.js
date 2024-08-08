const STATIC_CACHE = "web-static-cache";
const DYNAMIC_CACHE = "web-dynamic-cache";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(["/", "/about"]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response; // Return the cached response if it exists
      }

      return fetch(event.request).then((networkResponse) => {
        return caches.open(DYNAMIC_CACHE).then((cache) => {
          cache.put(event.request, networkResponse.clone()); // Cache the fetched response
          return networkResponse;
        });
      });
    })
  );
});