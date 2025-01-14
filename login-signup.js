import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './fireBase-Crud.js';

document.getElementById("signup-btn").addEventListener("click", async () => {
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        alert("✅ Sign-up successful! User created: " + userCredential.user.email);
        console.log("User Details:", userCredential.user);
    } catch (error) {
        alert("❌ Sign-up failed: " + error.message);
        console.error("Error during sign-up:", error);
    }
});

document.getElementById("login-btn").addEventListener("click", async () => {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert("✅ Login successful! Welcome: " + userCredential.user.email);
        console.log("Logged-in User:", userCredential.user);

        // Hide Login/Sign-Up forms after successful login
        document.getElementById("signup-container").style.display = "none";
        document.getElementById("login-container").style.display = "none";
    } catch (error) {
        alert("❌ Login failed: " + error.message);
        console.error("Error during login:", error);
    }
});
