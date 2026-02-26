import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDGBEkdKB2w6vS3oD1y6mvgKkG7s2_L-tw",
    authDomain: "resume-builder-app-1024d.firebaseapp.com",
    projectId: "resume-builder-app-1024d",
    storageBucket: "resume-builder-app-1024d.firebasestorage.app",
    messagingSenderId: "851501862995",
    appId: "1:851501862995:web:1df4820f8d15ec2f72f6a6",
    measurementId: "G-7LCTFBQF2H"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// SIGNUP
const signupBtn = document.getElementById("signupBtn");
if (signupBtn) {
  signupBtn.addEventListener("click", () => {
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Account Created Successfully!");
        window.location.href = "login.html";
      })
      .catch((error) => {
        alert(error.message);
      });
  });
}

// LOGIN
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Login Successful!");
       window.location.href = "dashboard.html";
      })
      .catch((error) => {
        alert(error.message);
      });
  });
}
