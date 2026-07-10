const player = document.getElementById("player");
const playerImg = document.getElementById("playerImg");
const playerNome = document.getElementById("playerNome");

let musicaAtual = null;

function tocarMusica(idAudio, nome, imagem) {

    console.log(idAudio);
    console.log(nome);
    console.log(imagem);


    // Para a música anterior
    if (musicaAtual) {
        musicaAtual.pause();
        musicaAtual.currentTime = 0;
    }

    // Pega a nova música
    musicaAtual = document.getElementById(idAudio);

    musicaAtual.loop = true

    // Atualiza o mini player
    playerImg.src = imagem;
    console.log(playerImg.src)
    playerNome.textContent = nome;

    // Mostra o player
    player.style.display = "flex";

    // Toca
    musicaAtual.play();
}

function playPause() {

    if (!musicaAtual) return;

    if (musicaAtual.paused) {
        musicaAtual.play();
    } else {
        musicaAtual.pause();
    }

}

function stopMusica() {

    if (!musicaAtual) return;

    musicaAtual.pause();
    musicaAtual.currentTime = 0;

    player.style.display = "none";

}