const CACHE_NAME = 'meditation-pwa-cache-v27';
const urlsToCache = [
  './',
  'index.html',
  'anleitung.html',
  'meditationsangebot.html',
  'vertiefung.html',
  'style.css',
  'script.js',
  'bilder/Benediktushof.jpg',
  'bilder/Bodhi-Path.jpg',
  'bilder/Brad.jpg',
  'bilder/Brahmavihara.jpg',
  'bilder/Chah.jpg',
  'bilder/clear_mountain.jpg',
  'bilder/gegen_den_strich.jpg',
  'bilder/Lotus_Logo.jpg',
  'bilder/lotus-flower.jpg',
  'bilder/Meditation-Positionen.png',
  'bilder/Nonnenkloster.jpg',
  'bilder/pergament.jpg',
  'bilder/sonnenhof.jpg',
  'bilder/Uchiyama.jpg',
  'bilder/Vipassana_Karlsruhe.jpg',
  'bilder/youtube-muho.jpg',
  'downloads/gegen_den_strich.pdf',
  'downloads/gesammelten-lehren-2021-01-21.pdf',
  'downloads/voll_liebe_zu_der_ganzen_welt.pdf',
  'downloads/weg-zum-selbst-zen-wirklichkeit-von-uchiyama-roshi.pdf',
  'offline.html',
  // Füge hier alle wichtigen Dateien hinzu
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});


self.addEventListener('fetch', event => {
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request).then(response => {
      // Cache-Hit: Zeige die gecachte Version
      const fetchPromise = fetch(event.request).then(networkResponse => {
        // Aktualisiere den Cache im Hintergrund
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, networkResponse.clone());
        });
        return networkResponse;
      }).catch(() => {
        // Falls Offline: Zeige die gecachte Version oder Offline-Seite
        return response || caches.match('/Meditations-Website/offline.html');
      });

      return response || fetchPromise;
    })
  );
}); 


self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME]; // Nur dieser Cache soll bleiben
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName); // Alte Caches löschen
          }
        })
      );
    })
  );
});