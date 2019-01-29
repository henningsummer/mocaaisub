var CACHE_NAME = 'staticV3';

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll([
                './',
                './faces',
                './fibo',
                './ocr',
                //
                '../css/materialize.min.css',
                '../css/materialize.css',
                '../css/custom.css',
                '../css/style.css',
                '../css/materialdesignicons.css',
                '../css/back2.jpg',
                //
                '../fonts/materialdesignicons-webfont.woff2?v=2.1.19',
                '../fonts/roboto/Roboto-Light.woff2',
                '../fonts/roboto/Roboto-Regular.woff2',
                '../fonts/roboto/Roboto-Medium.woff2',
                '../fonts/roboto/Roboto-Light.woff2',
                '../fonts/roboto/Roboto-Medium.woff',
                //
                '../js/api/network.js',
                '../js/api/battery.js',
                '../js/api/core.js',
                '../js/mcc/faces.js',
                '../js/mcc/fibo.js',
                '../js/mcc/ocr.js',
                '../js/mcc/webworker.js',
                '../js/lib/ocrad.js',
                '../js/lib/face-min.js',
                '../js/lib/tracking-min.js',
                '../js/jquery-3.2.1.min.js',
                '../js/jquery-form.js',
                '../js/materialize.min.js',
                '../js/chart/highcharts.js',
                '../js/chart/exporting.js',
                '../js/chart/export-data.js',
                '../js/chart/pizza.js',
                //
                '../js/rna/fiboIA.js',
                '../js/rna/faceIA.js',
                '../js/rna/ocrIA.js',

                //'../assets/img/iconappnm.png',
                '../assets/img/iconapp.png',
                '../assets/img/brasao.png',
                '../assets/img/brain3.jpg',
                '../assets/img/hs.png',
                '../assets/img/cpu.png',
                '../assets/img/favicons.ico',
                //
                '/manifest.json',
             ]);
        })
    );
});

self.addEventListener('activate', function activator(event) {
    event.waitUntil(
        caches.keys().then(function(keys) {
            return Promise.all(keys
                .filter(function(key) {
                    return key.indexOf(CACHE_NAME) !== 0;
                })
                .map(function(key) {
                    return caches.delete(key);
                })
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(cachedResponse) {
            return cachedResponse || fetch(event.request);
        })
    );
});