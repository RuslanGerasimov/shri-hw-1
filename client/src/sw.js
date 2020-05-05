const CACHE_NAME = 'ci-ruslan-cache';

self.addEventListener('install', (event) => {
    console.log('Установлен');
});
self.addEventListener('activate', (event) => {
    console.log('Активирован');
});


self.addEventListener('fetch', (event) => {
    if (
        event.request.method !== 'GET' ||
        event.request.url.indexOf('/static/') === -1
    ) {
        return;
    }

    event.respondWith(fromCache(event.request).catch((err) => {
        return fetchAndPut(event.request);
    }));

});

function fetchAndPut(request) {
    return new Promise((resolve, reject) => {
        fetch(request).then((response) => {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseClone);
            });

            resolve(response);
        })
    })
}

function fromCache(request) {
    return caches.open(CACHE_NAME)
        .then((cache) => cache.match(request))
        .then((matching) => matching || Promise.reject('no-match'));
}