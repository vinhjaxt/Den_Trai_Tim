var cacheName="Den_Trai_Tim-3n",filesToCache=["/","/index.html","/style.css","/love.min.js","/heart-icon.png","/ws.js"];self.addEventListener("install",function(e){console.log("[ServiceWorker] Install"),e.waitUntil(caches.open(cacheName).then(function(e){return console.log("[ServiceWorker] Caching app shell"),e.addAll(filesToCache)}))}),self.addEventListener("activate",function(e){return console.log("[ServiceWorker] Activate"),e.waitUntil(caches.keys().then(function(e){return Promise.all(e.map(function(e){if(e!==cacheName)return console.log("[ServiceWorker] Removing old cache",e),caches.delete(e)}))})),self.clients.claim()}),self.addEventListener("fetch",function(e){console.log("Fetch event for ",e.request.url),e.respondWith(caches.match(e.request).then(function(t){return/\/rpc\//i.test(e.request.url)?(console.log("Network request for ",e.request.url),fetch(e.request.clone())):t?(console.log("Found ",e.request.url," in cache"),t):(console.log("Network request for ",e.request.url),fetch(e.request.clone()).then(function(t){if(!t||200!==t.status||"basic"!==t.type)return t;var n=t.clone();return caches.open(cacheName).then(function(t){t.put(e.request,n)}),t}))}).catch(function(e){console.error("Fetch:",e)}))});