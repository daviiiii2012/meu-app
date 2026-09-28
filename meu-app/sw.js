// Nome do cache e versão
const CACHE_NAME = 'fightfit-cache-v1';

// Arquivos essenciais que serão armazenados no dispositivo
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// 1. Evento de Instalação: Baixa os arquivos para o Cache Local
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Armazenando arquivos estáticos no cache...');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// 2. Evento de Ativação: Limpa caches antigos caso haja atualização
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Removendo cache antigo:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Evento de Interceptação (Fetch): Serve arquivos do Cache se estiver offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Retorna o arquivo do cache se existir
      if (cachedResponse) {
        return cachedResponse;
      }
      // Caso contrário, busca na rede
      return fetch(event.request).catch(() => {
        console.log('[Service Worker] Falha na rede e item não encontrado no cache.');
      });
    })
  );
});