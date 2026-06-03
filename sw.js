const CACHE_NAME = 'blend-builder-v4';
const urlsToCache = [
    './',
    './index.html',
    './styles.css',
    './app.js',
    './data/ingredientes.js',
    './data/productos.js',
    './images/logo.jpg'
];

// Instalación del service worker
self.addEventListener('install', event => {
    self.skipWaiting(); // Fuerza la activación inmediata
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

// Activación: Limpieza de cachés antiguas
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Borrando caché antigua:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim()) // Toma el control de las pestañas inmediatamente
    );
});

// Fetch con estrategia de red primero para archivos de datos, caché primero para el resto
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});
