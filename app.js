import { fetchProducts, addProduct, updateProduct, deleteProduct,renderCard } from './fireBase-Crud.js';

const form = document.querySelector("form");


form.addEventListener('submit', async function render(event) {
    event.preventDefault();
   
    let title = document.getElementById('title').value;
    let price = parseInt(document.getElementById('price').value);
    let description = document.getElementById('description').value;
    let image = document.getElementById('image').value;

    const products = new Product(
        title,
        price,
        description,
        image
    );

    try {
        const docId = await addProduct(products); 
        renderCard(products, docId); 
    } catch (error) {
        console.error("Error adding product: ", error);
    }
});


function Product(title, price, description, image) {
  this.title = title;
  this.price = price;
  this.description = description;
  this.image = image;
}

fetchProducts();