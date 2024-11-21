const CACHE_NAME = 'pwa-demo-cache-v3';
const urlsToCache = [
    '/',
    'index.html',
    'style.css',
    'app.js',
    'icon-150x150.png'
];

// 安装Service Worker并缓存文件
self.addEventListener('install', (event) => {
    // 强制立即获取更新
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName); // 删除旧缓存
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request); // 尝试网络请求
        })
    );
});
