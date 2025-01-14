// Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
 import { getFirestore } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
 import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
 import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
     apiKey: "AIzaSyCSY0Q5bc_0QHGihzFBbbO6HiypGbyGI0I",
     authDomain: "firsttest-af942.firebaseapp.com",
     projectId: "firsttest-af942",
     storageBucket: "firsttest-af942.firebasestorage.app",
     messagingSenderId: "648242683253",
     appId: "1:648242683253:web:03536310392d917e12873c",
     measurementId: "G-HSTZXDLM37"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);
 const db = getFirestore(app);
 const auth = getAuth();
 export {auth, createUserWithEmailAndPassword, signInWithEmailAndPassword};

// fetch all products
 export const fetchProducts = async () => {
    const productsRef = collection(db, "products"); 
    try {
        const querySnapshot = await getDocs(productsRef); 
        const products = querySnapshot.docs.map((doc) => ({
            id: doc.id, 
            ...doc.data() 
        }));

        
        products.forEach((product) => {
            renderCard(product, product.id); 
        });
    } catch (error) {
        console.error("Error fetching products: ", error);
    }
};

 // Add a new product with multiple variables
 export const addProduct = async (input) => {
    const productsRef = collection(db, "products");

    const product = {
        title: input.title,
        price: input.price,
        description: input.description,
        image: input.image
    };

    try {
        const docRef = await addDoc(productsRef, product);
        console.log("Document written with ID: ", docRef.id);
        alert('Product Added Successfully');
        return docRef.id; 
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e; 
    }
};



 // Update a product
export const updateProduct = async (id, updatedFields) => {
    const productRef = doc(db, "products", id);
    try {
        await updateDoc(productRef, updatedFields);
        console.log("Document updated successfully");
        alert("Product updated successfully!");
    } catch (e) {
        console.error("Error updating document: ", e);
    }
};

// Delete a product
export const deleteProduct = async (id) => {
    const productRef = doc(db, "products", id);
    try {
        await deleteDoc(productRef);
        console.log("Document deleted successfully");
        alert("Product deleted successfully!");
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
};

export function renderCard(input, docId) {

    const cardsContainer = document.querySelector(".cardsContainer");


    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("data-id", docId); 
    const imageUrl = input.image || "https://via.placeholder.com/150"; 

  
    card.innerHTML = `
        <img src="${imageUrl}" alt="${input.title}">
        <h2>${input.title}</h2>
        <p>${input.description}</p>
        <p>Price: $${input.price}</p>
        <button class="update-btn">Update Title</button>
        <button class="delete-btn">Delete Product</button>
      `;
  
    cardsContainer.appendChild(card);
  
   
   card.querySelector(".update-btn").addEventListener("click", async () => {
    const newTitle = prompt("Enter new title for the product:", input.title);
    if (newTitle) {
        await updateProduct(docId, { title: newTitle }); 
        card.querySelector("h2").textContent = newTitle; 
    }
});

card.querySelector(".delete-btn").addEventListener("click", async () => {
    const confirmDelete = confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
        await deleteProduct(docId); 
        card.remove(); 
    }
});
}