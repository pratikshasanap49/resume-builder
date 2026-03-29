import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } 
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

const errorMsg = document.getElementById("errorMsg");
const successMsg = document.getElementById("successMsg");

function showError(message) {
  if (successMsg) successMsg.style.display = "none";
  if (errorMsg) {
    errorMsg.style.display = "block";
    errorMsg.textContent = message;
  } else {
    alert(message);
  }
}

function showSuccess(message) {
  if (errorMsg) errorMsg.style.display = "none";
  if (successMsg) {
    successMsg.style.display = "block";
    successMsg.textContent = message;
  } else {
    alert(message);
  }
}

// SIGNUP
const signupBtn = document.getElementById("signupBtn");
if (signupBtn) {
  signupBtn.addEventListener("click", () => {
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        showSuccess("Account created successfully!");
        window.location.href = "login.html";
      })
      .catch((error) => {
        showError(error.message);
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
        showSuccess("Login successful!");
       window.location.href = "dashboard.html";
      })
      .catch((error) => {
        showError(error.message);
      });
  });
}

// FORGOT PASSWORD (USER LOGIN)
const forgotPasswordBtn = document.getElementById("forgotPasswordBtn");
if (forgotPasswordBtn) {
  forgotPasswordBtn.addEventListener("click", () => {
    const email = document.getElementById("loginEmail")?.value?.trim();
    if (!email) {
      showError("Enter your email first, then click Forgot Password.");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        showSuccess("Password reset link sent to your email. Open your inbox and set a new password.");
      })
      .catch((error) => {
        showError(error.message);
      });
  });
}
