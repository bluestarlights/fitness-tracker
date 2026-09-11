// V7: 앱 범위 캐시만 관리하고 사용자 localStorage는 변경하지 않는다.
const CACHE='bp-v7-mobile-20260912-3';
const ASSETS=['./','./index.html','./manifest.json','./icon.svg','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));self.skipWaiting()});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{for(const name of await caches.keys())if(/^bp-v[4-7]-/.test(name)&&name!==CACHE)await caches.delete(name);await self.clients.claim()})())});
self.addEventListener('fetch',event=>{
 const req=event.request,url=new URL(req.url);if(req.method!=='GET'||url.origin!==location.origin||!url.href.startsWith(self.registration.scope))return;
 event.respondWith((async()=>{const cache=await caches.open(CACHE);try{const res=await fetch(req);if(res.ok)await cache.put(req,res.clone());return res}catch(error){const hit=await cache.match(req);if(hit)return hit;if(req.mode==='navigate')return cache.match('./index.html');throw error}})());
});
