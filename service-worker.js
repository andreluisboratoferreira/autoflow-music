const CACHE_NAME = "autoflow-v5";

const arquivos = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",

    // imagens
    "./imagens/icon-192.png",
    "./imagens/icon-512.png",
    "./imagens/siki_seven.png",
    "./imagens/montagem_flauta_elfica.png",
    "./imagens/homage_funk.png",
    "./imagens/montagem_direcao.png",
    "./imagens/amor_na_praia.png",
    "./imagens/montagem_delirio.png",
    "./imagens/funk_abnormal.png",
    "./imagens/montagem_elder.png",
    "./imagens/montagem_sethron.png",
    "./imagens/montagem_alquimia.png",
    "./imagens/melodia_cavalgada.png",
    "./imagens/montagem_pegadora.png",
    "./imagens/yumi_funk.png",
    "./imagens/birds_funk.png",

    // músicas
    "./musicas/siki_seven.mp3",
    "./musicas/montagem_flauta_elfica.mp3",
    "./musicas/homage_funk.mp3",
    "./musicas/montagem_direcao.mp3",
    "./musicas/amor_na_praia.mp3",
    "./musicas/montagem_delirio.mp3",
    "./musicas/funk_abnormal.mp3",
    "./musicas/montagem_elder.mp3",
    "./musicas/montagem_sethron.mp3",
    "./musicas/montagem_alquimia.mp3",
    "./musicas/melodia_cavalgada.mp3",
    "./musicas/montagem_pegadora.mp3",
    "./musicas/yumi_funk.mp3",
    "./musicas/birds_funk.mp3"
];


// instala e salva os arquivos
self.addEventListener("install", evento => {

    evento.waitUntil(
        caches.open(CACHE_NAME)
        .then(async cache => {

            for (const arquivo of arquivos) {

                try {
                    await cache.add(arquivo);
                } catch (erro) {
                    console.log("Erro ao salvar:", arquivo);
                }

            }

        })
    );

});

// procura no cache antes de buscar na internet
self.addEventListener("fetch", evento => {

    evento.respondWith(

        caches.match(evento.request)
        .then(resposta => {

            return resposta || fetch(evento.request);

        })

    );

});