const CACHE_NAME = 'eurinhash-portfolio-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Ressources à mettre en cache immédiatement
const STATIC_ASSETS = [
    '/',
    '/about',
    '/projects',
    '/skills',
    '/blog',
    '/contact',
    '/vision',
    '/eurin-photo.webp',
    '/manifest.webmanifest'
];

// Installation du service worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(STATIC_CACHE).then((cache) => {
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting();
});

// Activation du service worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Stratégie de cache
self.addEventListener('fetch', (event) => {
    const {
        request
    } = event;
    const url = new URL(request.url);

    // Cache first pour les assets statiques
    if (STATIC_ASSETS.includes(url.pathname)) {
        event.respondWith(
            caches.match(request).then((response) => {
                return response || fetch(request).then((fetchResponse) => {
                    return caches.open(STATIC_CACHE).then((cache) => {
                        cache.put(request, fetchResponse.clone());
                        return fetchResponse;
                    });
                });
            })
        );
        return;
    }

    // Network first pour les pages dynamiques
    if (url.pathname.startsWith('/_next/') || url.pathname.includes('api')) {
        event.respondWith(
            fetch(request).then((response) => {
                if (response.status === 200) {
                    const responseClone = response.clone();
                    caches.open(DYNAMIC_CACHE).then((cache) => {
                        cache.put(request, responseClone);
                    });
                }
                return response;
            }).catch(() => {
                return caches.match(request);
            })
        );
        return;
    }

    // Stale while revalidate pour le reste
    event.respondWith(
        caches.match(request).then((response) => {
            const fetchPromise = fetch(request).then((fetchResponse) => {
                if (fetchResponse.status === 200) {
                    const responseClone = fetchResponse.clone();
                    caches.open(DYNAMIC_CACHE).then((cache) => {
                        cache.put(request, responseClone);
                    });
                }
                return fetchResponse;
            });

            return response || fetchPromise;
        })
    );
});