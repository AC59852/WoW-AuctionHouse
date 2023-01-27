// bust the cache
const CACHE_NAME = 'v1';

// Call Install Event
self.addEventListener('install', (e) => {
  console.log('Service Worker: Installed');
});

// Call Activate Event
self.addEventListener('activate', (e) => {
  console.log('Service Worker: Activated');
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if(cache !== CACHE_NAME) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      )
    })
  );
});