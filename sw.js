/* BodyProfile Tracker V8 service worker
   HTML은 네트워크 우선: 새 버전을 올리면 다음 접속에서 바로 반영된다.
   나머지 정적 파일은 캐시 우선. 오프라인에서는 항상 캐시로 응답한다. */
const CACHE="bp-v8-2-2026";
const ASSETS=["./","./index.html","./manifest.json","./icon.svg"];

self.addEventListener("install",e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",e=>{
  e.waitUntil(caches.keys()
    .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
    .then(()=>self.clients.claim()));
});
self.addEventListener("fetch",e=>{
  const req=e.request;
  if(req.method!=="GET")return;
  const isDoc=req.mode==="navigate"||(req.destination==="document");
  if(isDoc){
    e.respondWith(
      fetch(req).then(res=>{
        const copy=res.clone();
        caches.open(CACHE).then(c=>c.put("./index.html",copy)).catch(()=>{});
        return res;
      }).catch(()=>caches.match("./index.html").then(hit=>hit||caches.match("./")))
    );
    return;
  }
  e.respondWith(
    caches.match(req).then(hit=>hit||fetch(req).then(res=>{
      if(res.ok&&new URL(req.url).origin===location.origin){
        const copy=res.clone();
        caches.open(CACHE).then(c=>c.put(req,copy)).catch(()=>{});
      }
      return res;
    }).catch(()=>hit))
  );
});
