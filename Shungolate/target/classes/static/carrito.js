const carritoUrl = 'http://localhost:8080/carrito'; // URL base para el CarritoController

const cart = [];

document.addEventListener("DOMContentLoaded", function () {
  const productListContainer = document.getElementById("productList");
  const checkoutCartContainer = document.getElementById("checkoutCart");
  const totalCheckout = document.getElementById("totalCheckout");

  // Función para obtener todos los carritos existentes
  async function getAllCarritos() {
    try {
      const response = await fetch('/carrito');
      if (!response.ok) {
        throw new Error('Error al obtener los carritos');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Función para agregar un producto al carrito
  async function addProductToCart(productId, quantity) {
    try {
      const response = await fetch(`/carrito/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          producto: { id: productId }, // Suponiendo que el body espera un objeto con la estructura correcta
          cantidad: quantity
        })
      });
      if (!response.ok) {
        throw new Error('Error al agregar el producto al carrito');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Función para actualizar la cantidad de un producto en el carrito
  async function updateCartItem(cartItemId, quantity) {
    try {
      const response = await fetch(`/carrito/${cartItemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cantidad: quantity
        })
      });
      if (!response.ok) {
        throw new Error('Error al actualizar el producto en el carrito');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Función para eliminar un producto del carrito
  async function deleteCartItem(cartItemId) {
    try {
      const response = await fetch(`/carrito/${cartItemId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el producto del carrito');
      }
      return true; // Éxito al eliminar
    } catch (error) {
      console.error('Error:', error);
      return false; // Error al eliminar
    }
  }

  // Función para cargar el carrito desde el backend y mostrarlo en la interfaz
  async function loadCartFromBackend() {
    const carritos = await getAllCarritos();
    cart.push(...carritos); // Agrega los carritos obtenidos al array local cart

    // Actualiza la interfaz gráfica del carrito
    updateCheckoutCart();
  }

  // Función para actualizar la interfaz gráfica del carrito
  function updateCheckoutCart() {
    checkoutCartContainer.innerHTML = "";
    let subtotal = 0;

    cart.forEach((item) => {
      const row = document.createElement("div");
      row.classList.add("cart-item");
      row.innerHTML = `
        <div>Producto ${item.product.id}</div>
        <div>${item.product.name}</div>
        <div>${item.cantidad}</div>
        <div>$${item.product.price}</div>
        <div>$${item.product.price * item.cantidad}</div>
        <div>
          <button class="btn btn-danger btnDelete" data-cart-item-id="${item.id}">Eliminar</button>
        </div>
      `;
      checkoutCartContainer.appendChild(row);

      subtotal += item.product.price * item.cantidad;
    });

    totalCheckout.textContent = `$${subtotal.toFixed(2)}`;
  }

  // Evento para escuchar clics en el botón de eliminar producto del carrito
  checkoutCartContainer.addEventListener("click", async function (event) {
    if (event.target.classList.contains("btnDelete")) {
      const cartItemId = event.target.getAttribute("data-cart-item-id");
      const deleted = await deleteCartItem(cartItemId);
      if (deleted) {
        const itemIndex = cart.findIndex((item) => item.id === cartItemId);
        if (itemIndex !== -1) {
          cart.splice(itemIndex, 1);
          updateCheckoutCart();
        }
      }
    }
  });

  // Carga inicial del carrito al cargar la página
  loadCartFromBackend();
});

// Suponiendo que tengas un formulario o evento de click para agregar productos al carrito
// Puedes usar la función addProductToCart(productId, quantity) para manejar esta lógica
// y luego actualizar la interfaz con updateCheckoutCart().
