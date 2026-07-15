const CACHE_NAME = "autoflow-v6";

self.addEventListener("install", event => {

    self.skipWaiting();

    event.waitUntil(

        caches.open(CACHE_NAME).then(async cache => {

            for (const arquivo of arquivos) {

                try{
                    await cache.add(arquivo);
                }catch(e){
                    console.log("Erro:", arquivo);
                }

            }

        })

    );

});


self.addEventListener("activate", event => {

    event.waitUntil(

        Promise.all([

            caches.keys().then(keys => {

                return Promise.all(

                    keys.map(key => {

                        if(key !== CACHE_NAME){
                            return caches.delete(key);
                        }

                    })

                );

            }),

            self.clients.claim()

        ])

    );

});

self.addEventListener("fetch", event => {

    event.respondWith(

        fetch(event.request)
        .then(response => {

            const copia = response.clone();

            caches.open(CACHE_NAME).then(cache => {

                cache.put(event.request, copia);

            });

            return response;

        })
        .catch(() => {

            return caches.match(event.request);

        })

    );

});