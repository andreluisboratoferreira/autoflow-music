import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { initializeApp } from 
"https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";


import { 
getAuth,
GoogleAuthProvider,
signInWithPopup
} from 
"https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";



const firebaseConfig = {
  apiKey: "AIzaSyA2HAwAUlxksasI4rD0Z0SzoBt9o7jAe1o",
  authDomain: "autoflow-music.firebaseapp.com",
  projectId: "autoflow-music",
  storageBucket: "autoflow-music.firebasestorage.app",
  messagingSenderId: "53813681548",
  appId: "1:53813681548:web:1889c4697314aac1f34aa9"
};



const app = initializeApp(firebaseConfig);


const auth = getAuth(app);


const provider = new GoogleAuthProvider();



document
.getElementById("loginGoogle")
.addEventListener("click",()=>{


signInWithPopup(auth,provider)

.then((result)=>{


const user=result.user;


document.getElementById("usuario").innerHTML =
"Olá, "+user.displayName;


console.log(user);


})


.catch((erro)=>{

console.log(erro);

});


});

import { 
    getFirestore,
    doc,
    setDoc,
    getDoc
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const db = getFirestore(app);

await setDoc(doc(db, "usuarios", user.uid), {

    nome: user.displayName,
    email: user.email,
    foto: user.photoURL,
    criadoEm: new Date()

});

document.getElementById("nomeUsuario").innerHTML =
user.displayName;


document.getElementById("fotoUsuario").src =
user.photoURL;