// 앱 셸 캐시. 파일을 바꾸면 CACHE 이름을 올려야 설치된 앱에 새 버전이 내려간다.
const CACHE="bp-v8-4-wife-20261111";
const SHELL=["./index.html","./wife.html","./app.js","./app.css","./manifest.json","./manifest-wife.json","./icon.svg"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(a=>Promise.all(a.filter(k=>k.startsWith("bp-")&&k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  if(new URL(e.request.url).origin!==self.location.origin)return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}return res})));
});
