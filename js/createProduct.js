import { createProduct, getProducts, deleteProduct } from './api.js';

// Seleccionar el formulario y el contenedor de la lista de productos
const productForm = document.querySelector('#product-form');
const productList = document.querySelector('#product-list');
// Trash icon
const trashIconPath = "./assets/icons8-trash-24.png";

// Función para renderizar los productos en el DOM
function renderProducts(products) {
  productList.innerHTML = ''; // Limpiar lista antes de renderizar

  if (products.length === 0) {
    productList.innerHTML = '<p>No se han agregado productos.</p>';
    return;
  }

  products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <img src="${product.image}" alt="Imagen del producto"/>
      <div class="card-container--info">
        <p>${product.name}</p>
        <div class="card-container--value">
          <p>$ ${product.price.toFixed(2)}</p>
          <img src="${trashIconPath}" alt="Eliminar producto" class="delete-icon" data-id="${product.id}"/>
        </div>
      </div>
    `;
    productList.appendChild(card);
  });

  // Agregar event listeners a los iconos de eliminar
  const deleteIcons = document.querySelectorAll('.delete-icon');
  deleteIcons.forEach(icon => {
    icon.addEventListener('click', async (event) => {
      const productId = event.target.dataset.id;
      const success = await deleteProduct(productId);
      if (success) {
        const updatedProducts = await getProducts();
        renderProducts(updatedProducts);
      } else {
        alert('Error al eliminar el producto. Inténtalo nuevamente.');
      }
    });
  });
}

// Evento para manejar el envío del formulario de productos
productForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const productName = document.querySelector('#productName').value;
  const productPrice = parseFloat(document.querySelector('#productPrice').value);
  const productImage = document.querySelector('#productImage').value;

  if (!productName || !productPrice || !productImage) {
    alert('Por favor completa todos los campos.');
    return;
  }

  const newProduct = {
    name: productName,
    price: productPrice,
    image: productImage,
  };

  const createdProduct = await createProduct(newProduct);
  if (createdProduct) {
    const updatedProducts = await getProducts();
    renderProducts(updatedProducts);
    productForm.reset(); // Limpiar formulario después de enviar
  } else {
    alert('Error al agregar el producto. Inténtalo nuevamente.');
  }
});

// Cargar los productos cuando se carga la página
window.addEventListener('DOMContentLoaded', async () => {
  const products = await getProducts();
  renderProducts(products);
});
