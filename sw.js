const CACHE_NAME = 'meditation-pwa-cache-v1';
const urlsToCache = [
  '/Meditations-Website/',
  '/Meditations-Website/index.html',
  '/Meditations-Website/anleitung.html',
  '/Meditations-Website/hintergruende.html',
  '/Meditations-Website/meditationsangebot.html',
  '/Meditations-Website/links.html',
  '/Meditations-Website/style.css',
  '/Meditations-Website/script.js',
  '/Meditations-Website/bilder/Achtfacher_Pfad.jpg',
  '/Meditations-Website/bilder/Benediktushof.jpg',
  '/Meditations-Website/bilder/Bodhi-Vihara.jpg',
  '/Meditations-Website/bilder/gegen_den_strich.jpg',
  '/Meditations-Website/bilder/Lotus_Logo.jpg',
  '/Meditations-Website/bilder/lotus-flower.jpg',
  '/Meditations-Website/bilder/Meditation-Positionen.png',
  '/Meditations-Website/bilder/muttodaya.jpg',
  '/Meditations-Website/bilder/Nonnenkloster.jpg',
  '/Meditations-Website/bilder/palikanon.jpg',
  '/Meditations-Website/bilder/pergament.jpg',
  '/Meditations-Website/bilder/sonnenhof.jpg',
  '/Meditations-Website/bilder/Vipassana_Karlsruhe.jpg',
  '/Meditations-Website/bilder/Wort_des_Buddha.jpg',
  '/Meditations-Website/bilder/youtube-muho.jpg',
  '/Meditations-Website/downloads/Meditation_im_Alltag.pdf',
  '/Meditations-Website/downloads/gegen_den_strich.pdf',
  '/Meditations-Website/offline.html',
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
  // Ignoriere nicht-HTTP-Anfragen (z. B. Chrome Extensions)
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Cache-Hit
        }
        // Netzwerk-Anfrage mit Offline-Fallback
        return fetch(event.request).catch(() => {
          // Falls es sich um eine HTML-Seite handelt, zeige die Offline-Seite
          if (event.request.headers.get('accept').includes('text/html')) {
            return caches.match('/offline.html');
          }
          // Für andere Dateitypen (z. B. Bilder): Gib einfach nichts zurück
          // (alternativ: Platzhalter-Bild für Bilder)
        });
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