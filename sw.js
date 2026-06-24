const CACHE_NAME = 'meditation-pwa-cache-v19';
const urlsToCache = [
  './',
  'index.html',
  'anleitung.html',
  'hintergruende.html',
  'meditationsangebot.html',
  'links.html',
  'style.css',
  'script.js',
  'bilder/Achtfacher_Pfad.jpg',
  'bilder/Benediktushof.jpg',
  'bilder/Bodhi-Vihara.jpg',
  'bilder/Dhamma_Dana.jpg',
  'bilder/gegen_den_strich.jpg',
  'bilder/Lotus_Logo.jpg',
  'bilder/lotus-flower.jpg',
  'bilder/Meditation-Positionen.png',
  'bilder/muttodaya.jpg',
  'bilder/Nonnenkloster.jpg',
  'bilder/palikanon.jpg',
  'bilder/pergament.jpg',
  'bilder/sonnenhof.jpg',
  'bilder/Vipassana_Karlsruhe.jpg',
  'bilder/Wort_des_Buddha.jpg',
  'bilder/youtube-muho.jpg',
  'downloads/Meditation_im_Alltag.pdf',
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

/*self.addEventListener('fetch', event => {
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
            return caches.match('offline.html');
          }
          // Für andere Dateitypen (z. B. Bilder): Gib einfach nichts zurück
          // (alternativ: Platzhalter-Bild für Bilder)
        });
      })
  );
}); alter fetch*/

/* neuer fetch:*/

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

/*bis hier!*/

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