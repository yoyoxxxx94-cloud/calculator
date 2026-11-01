// يحفظ التطبيق على الجهاز ليعمل بدون إنترنت
var CACHE='calculator-v1';
var FILES=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(FILES)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  var u=new URL(e.request.url);
  if(u.origin!==location.origin)return;
  e.respondWith(caches.match(e.request).then(function(r){
    return r||fetch(e.request).then(function(n){var cp=n.clone();caches.open(CACHE).then(function(c){c.put(e.request,cp)});return n}).catch(function(){return caches.match('./index.html')});
  }));
});
