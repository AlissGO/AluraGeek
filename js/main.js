// js/main.js

import { getProducts, createProduct } from './api.js';

const productList = document.getElementById('product-list');
const productForm = document.getElementById('product-form');

// Función para renderizar los productos en el DOM
async function renderProducts() {
  try {
    const products = await getProducts();
    productList.innerHTML = ''; // Limpiar lista antes de renderizar

    if (products.length === 0) {
      productList.innerHTML = '<p>No se han agregado productos.</p>';
      return;
    }

    products.forEach(product => {
      const card = document.createElement('div');
      card.classList.add('card');
      
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <div class="card-container--info">
          <p>${product.name}</p>
          <div class="card-container--value">
            <p>$${product.price.toFixed(2)}</p>
            <img src="./assets/trashIcon.png"/>
          </div>
        </div>
      `;
      
      productList.appendChild(card);
    });
  } catch (error) {
    console.error('Error al renderizar productos:', error);
  }
}

// Evento para manejar el envío del formulario de productos
productForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const productName = document.getElementById('productName').value;
  const productPrice = parseFloat(document.getElementById('productPrice').value);
  const productImage = document.getElementById('productImage').value;

  if (!productName || !productPrice || !productImage) {
    alert('Por favor completa todos los campos.');
    return;
  }

  const newProduct = {
    name: productName,
    price: productPrice,
    image: productImage,
  };

  try {
    const createdProduct = await createProduct(newProduct);
    if (createdProduct) {
      await renderProducts();
      productForm.reset(); // Limpiar formulario después de enviar
    } else {
      alert('Error al agregar el producto. Inténtalo nuevamente.');
    }
  } catch (error) {
    console.error('Error al crear producto:', error);
    alert('Error al agregar el producto. Inténtalo nuevamente.');
  }
});

// Evento para cargar productos al cargar la página
window.addEventListener('DOMContentLoaded', renderProducts);
