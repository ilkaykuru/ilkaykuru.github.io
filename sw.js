const CACHE = 'eylul-v1';
const ASSETS = [
  './', './index.html', './hafiza.html', './boyama.html', './yilan.html', './yildiz.html',
  './roket.html', './yapboz.html', './peri.html', './bahce.html', './kale.html',
  './macera.html', './dostum.html', './itmece.html', './satranc.html', './sudoku.html',
  './blok.html', './kart.html', './zindan.html', './korece.html', './dortbagla.html',
  './mangala.html', './profil.html', './manifest.json', './icon-192.png', './icon-512.png'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ).then(() => self.clients.claim()));
});
// ağ öncelikli: güncel sürüm gelir, çevrimdışıysa önbellekten
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
      return res;
    }).catch(() => caches.match(e.request, { ignoreSearch: true })
      .then(r => r || caches.match('./index.html')))
  );
});
