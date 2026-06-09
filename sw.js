const CACHE = 'bodyprofile-icons-v2';
const ASSETS = [
'./index.html','./style.css','./app.js','./manifest.json','./icon.svg',
'./assets/icons/bench.svg','./assets/icons/row.svg','./assets/icons/inclineDb.svg','./assets/icons/lat.svg',
'./assets/icons/shoulder.svg','./assets/icons/lateralFace.svg','./assets/icons/armSuperset.svg',
'./assets/icons/squat.svg','./assets/icons/rdl.svg','./assets/icons/legpress.svg','./assets/icons/lunge.svg',
'./assets/icons/extension.svg','./assets/icons/curl.svg','./assets/icons/calf.svg','./assets/icons/core.svg'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
});