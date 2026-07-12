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