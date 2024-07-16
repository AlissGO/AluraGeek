const baseURL = 'http://localhost:3001/products';

// Función para obtener todos los productos
async function getProducts() {
  try {
    const response = await fetch(baseURL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Función para crear un nuevo producto
async function createProduct(productData) {
  try {
    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating product:', error);
    return null;
  }
}

// Función para eliminar un producto
async function deleteProduct(productId) {
  try {
    const response = await fetch(`${baseURL}/${productId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    return false;
  }
}

export { getProducts, createProduct, deleteProduct };
