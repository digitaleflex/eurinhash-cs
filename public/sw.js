// Service Worker pour cache intelligent
const CACHE_NAME = 'eurinhash-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

const STATIC_ASSETS = [
  '/',
  '/contact',
  '/about',
  '/skills',
  '/projects',
  '/manifest.webmanifest',
  '/eurin-photo.webp',
  '/eurin-photoo.webp'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE)
            .map((cacheName) => caches.delete(cacheName))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Stratégie de cache
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Cache first pour les assets statiques
  if (request.destination === 'image' || request.destination === 'font') {
    event.respondWith(
      caches.match(request)
        .then((response) => response || fetch(request)
          .then((fetchResponse) => {
            const responseClone = fetchResponse.clone();
            caches.open(DYNAMIC_CACHE)
              .then((cache) => cache.put(request, responseClone));
            return fetchResponse;
          })
        )
    );
    return;
  }

  // Network first pour les pages
  if (request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE)
            .then((cache) => cache.put(request, responseClone));
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Stale while revalidate pour les API
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      caches.open(DYNAMIC_CACHE)
        .then((cache) => {
          return cache.match(request)
            .then((response) => {
              const fetchPromise = fetch(request)
                .then((fetchResponse) => {
                  cache.put(request, fetchResponse.clone());
                  return fetchResponse;
                });
              return response || fetchPromise;
            });
        })
    );
  }
});
