const player = document.getElementById("player");
const playerImg = document.getElementById("playerImg");
const playerNome = document.getElementById("playerNome");
const pesquisa = document.getElementById("pesquisa");

const menu = document.getElementById("menuContexto");

let musicaAtual = null;
let musicaSelecionada = null;


// ==============================
// TOCAR MÚSICA
// ==============================

function tocarMusica(idAudio, nome, imagem) {

    if (musicaAtual) {
        musicaAtual.pause();
        musicaAtual.currentTime = 0;
    }

    musicaAtual = document.getElementById(idAudio);

    musicaAtual.loop = true;

    playerImg.src = imagem;
    playerNome.textContent = nome;

    player.style.display = "flex";

    musicaAtual.play();


    // Controle da tela bloqueada do celular
    if ("mediaSession" in navigator) {

        navigator.mediaSession.metadata = new MediaMetadata({
            title: nome,
            artist: "AutoFlow Music",
            album: "AutoFlow",
            artwork:[
                {
                    src: imagem,
                    sizes:"512x512",
                    type:"image/png"
                }
            ]
        });


        navigator.mediaSession.setActionHandler("play",()=>{
            musicaAtual.play();
        });


        navigator.mediaSession.setActionHandler("pause",()=>{
            musicaAtual.pause();
        });


        navigator.mediaSession.setActionHandler("stop",()=>{
            stopMusica();
        });

    }

}



// ==============================
// PLAY / PAUSE
// ==============================

function playPause(){

    if(!musicaAtual) return;


    if(musicaAtual.paused){
        musicaAtual.play();
    }else{
        musicaAtual.pause();
    }

}



// ==============================
// PARAR
// ==============================

function stopMusica(){

    if(!musicaAtual) return;


    musicaAtual.pause();
    musicaAtual.currentTime = 0;

    player.style.display="none";

}




// ==============================
// PESQUISA
// ==============================

pesquisa.addEventListener("input", pesquisarMusicas);


function pesquisarMusicas(){

    const texto = pesquisa.value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"");


    document.querySelectorAll(".musica")
    .forEach(musica=>{


        let nome = musica.querySelector("h5")
        .textContent
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g,"");



        if(nome.includes(texto)){

            musica.style.display="flex";

        }else{

            musica.style.display="none";

        }


    });

}




// ==============================
// MENU BOTÃO DIREITO
// ==============================


document.querySelectorAll(".musica")
.forEach(musica=>{


    musica.addEventListener("contextmenu",function(e){

        e.preventDefault();


        musicaSelecionada = this;


        menu.style.display="block";


        menu.style.left=e.pageX+"px";
        menu.style.top=e.pageY+"px";


    });


});



// fechar menu

document.addEventListener("click",()=>{

    menu.style.display="none";

});





// ==============================
// BAIXAR MP3
// ==============================

function baixarMusica(){


    if(!musicaSelecionada) return;


    const caminho = musicaSelecionada.dataset.audio;
    const nome = musicaSelecionada.dataset.nome;


    const link=document.createElement("a");


    link.href=caminho;
    link.download=nome+".mp3";


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);


}






// ==============================
// FAVORITOS
// ==============================


function favoritarAtual(){


    if(!musicaSelecionada) return;



    const id = musicaSelecionada.dataset.audio
    .replace("./musicas/","")
    .replace(".mp3","");



    let favoritos =
    JSON.parse(localStorage.getItem("favoritos")) || [];



    if(favoritos.includes(id)){


        favoritos =
        favoritos.filter(item=>item !== id);


        alert("Removido dos favoritos ❌");


    }else{


        favoritos.push(id);


        alert("Adicionado aos favoritos ⭐");


    }



    localStorage.setItem(
        "favoritos",
        JSON.stringify(favoritos)
    );

}




// ==============================
// PWA SERVICE WORKER
// ==============================


if("serviceWorker" in navigator){


navigator.serviceWorker.register("./service-worker.js")
.then(()=>{
    console.log("Service Worker ativo!");
})
.catch(erro=>{
    console.log("Erro:",erro);
});


}

function mostrarFavoritas(){

    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    const musicas = document.querySelectorAll(".musica");


    musicas.forEach(musica => {

        const id = musica.dataset.audio
        .replace("./musicas/","")
        .replace(".mp3","");


        if(favoritos.includes(id)){

            musica.style.display = "flex";

        }else{

            musica.style.display = "none";

        }

    });

}

function mostrarTodas(){

    const musicas = document.querySelectorAll(".musica");

    musicas.forEach(musica => {

        musica.style.display = "flex";

    });

}