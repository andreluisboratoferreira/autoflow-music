// Firebase App
import { initializeApp } from 
"https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";


// Firebase Auth
import { 
    getAuth,
    GoogleAuthProvider,
    signInWithPopup
} from 
"https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";


// Firebase Firestore
import {
    getFirestore,
    doc,
    setDoc
} from 
"https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";



// CONFIGURAÇÃO DO FIREBASE

const firebaseConfig = {

  apiKey: "AIzaSyA2HAwAUlxksasI4rD0Z0SzoBt9o7jAe1o",

  authDomain: "autoflow-music.firebaseapp.com",

  projectId: "autoflow-music",

  storageBucket: "autoflow-music.firebasestorage.app",

  messagingSenderId: "53813681548",

  appId: "1:53813681548:web:1889c4697314aac1f34aa9"

};



// INICIAR FIREBASE

const app = initializeApp(firebaseConfig);


// LOGIN

const auth = getAuth(app);


// GOOGLE

const provider = new GoogleAuthProvider();


// BANCO

const db = getFirestore(app);




// BOTÃO LOGIN

document
.getElementById("loginGoogle")
.addEventListener("click", async ()=>{


    try{


        const result = await signInWithPopup(
            auth,
            provider
        );


        const user = result.user;



        // MOSTRA NA TELA

        document.getElementById("usuario").innerHTML =
        "Olá, " + user.displayName;



        document.getElementById("nomeUsuario").innerHTML =
        user.displayName;



        document.getElementById("fotoUsuario").src =
        user.photoURL;




        // SALVAR NO FIRESTORE

        await setDoc(
            doc(db,"usuarios",user.uid),
            {

                nome: user.displayName,

                email: user.email,

                foto: user.photoURL,

                criadoEm: new Date()

            },

            {
                merge:true
            }

        );



        console.log("Usuário salvo:", user);



    }catch(erro){


        console.log("Erro no login:", erro);


    }


});