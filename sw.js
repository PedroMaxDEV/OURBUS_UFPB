const CACHE = 'ourbus-v1';
const OFFLINE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  // folha de estilo e scripts do leaflet são carregados via CDN — opcionalmente cachear
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(OFFLINE_URLS)));
});
self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
