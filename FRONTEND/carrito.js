
const cart = [];

document.addEventListener("DOMContentLoaded", function () {
  // Productos en el catálogo.
  const productList = [
    {
      id: 1,
      image: "corazon.jpg",
      name: "chocolate de corazon ",
      description: "La Rosa Dorada es una flor exquisita con pétalos dorados y un delicado aroma a vainilla. Es una elección perfecta para ocasiones especiales. Siempre te permite obtener ganancias",
      price: 19.99,
    },
    {
      id: 2,
      image: "bombon.jpg",
      name: "Bombon",
      description: "La Orquídea Celestial es una flor rara y elegante con pétalos de color lavanda y un aroma suave y agradable. Es símbolo de belleza y elegancia.",
      price: 29.99,
    },
    {
      id: 3,
      image: "caja.jpg",
      name: "Caja de Bombones (Silver Lily)",
      description: "El Lirio de Plata es una flor única con pétalos plateados y un aroma fresco y limpio. Representa la pureza y la claridad. Grandes y espectaculares para la ocasión",
      price: 24.99,
    },
    {
      id: 4,
      image: "leche.jpg",
      name: "tableta blanca",
      description: "El Tulipán de Medianoche es un tulipán de color negro profundo y misterioso. Es una opción sorprendente y elegante.",
      price: 14.99,
    },
    {
      id: 5,
      image: "negro.jpg",
      name: "tableta de chcolate negro puro",
      description: "El Girasol Brillante es una flor que irradia alegría con sus pétalos amarillos vibrantes y su centro marrón cálido. Es perfecto para transmitir felicidad.",
      price: 59.99,
    },
    {
      id: 6,
      image: "fresas.jpg",
      name: "fresas con chocolate puro",
      description: "La Margarita de Luna es una flor blanca con un delicado brillo plateado en sus pétalos. Evoca la magia de una noche estrellada. Simplemente especiales para la ocasión",
      price: 12.99,
    },
  ];

  // Obtiene el contenedor donde se mostrará el catálogo y el resumen de compra.
  const productListContainer = document.getElementById("productList");
  const checkoutCartContainer = document.getElementById("checkoutCart");
  const totalCheckout = document.getElementById("totalCheckout");

  // Genera las tarjetas de productos en el catálogo y las agrega al contenedor.
  productList.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("col-md-4", "mb-4");
    card.innerHTML = `
            <div class="card card-custom neo-md rounded-md">
                <img src="${product.image}" class="card-img-top card-img-custom" alt="Producto ${product.id}">
                <div class="card-body">
                    <h5 class="card-title">Producto ${product.id}</h5>
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">Descripción: ${product.description}</p>
                    <p class="card-text">Precio: $${product.price}</p>
                    <div class="input-group">
                        <span class="input-group-btn">
                            <button type="button" class="btn btn-danger btn-number" data-type="minus" data-field="inputQuantity${product.id}">-</button>
                        </span>
                        <input type="text" id="inputQuantity${product.id}" class="form-control input-number" value="1" min="1" max="10">
                        <span class="input-group-btn">
                            <button type="button" class="btn btn-success btn-number" data-type="plus" data-field="inputQuantity${product.id}">+</button>
                        </span>
                    </div>
                    <button class="btn btn-primary add-to-cart" data-product-id="${product.id}" style="margin-top: 20px">Agregar al cart</button>
                </div>
            </div>
        `;
    productListContainer.appendChild(card);

    // Obtiene la cantidad de productos a agregar al cart y manda llamar la función para agregar el producto al cart.
    const btnAdd = card.querySelector(".add-to-cart");
    btnAdd.addEventListener("click", function () {
      const quantity = parseInt(
        document.getElementById(`inputQuantity${product.id}`).value
      );

      if (quantity > 0) {
        addProduct(product, quantity);
      }
    });
  });

  // Almacena en el arreglo los productos agregados al cart y actualiza la cantidad de productos en el carrito en caso de que se agregue más de uno del mismo producto.
  function addProduct(product, quantity) {
    const cartProduct = cart.find((item) => item.product.id === product.id);

    if (cartProduct) {
      cartProduct.quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }

    updateCheckoutCart();
  }

  // Eventos para incrementar y decrementar la cantidad de productos en el cart.
  const btnNumberButtons = document.querySelectorAll(".btn-number");
  btnNumberButtons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      const fieldName = this.getAttribute("data-field");
      const type = this.getAttribute("data-type");
      const input = document.getElementById(fieldName);
      const currentVal = parseInt(input.value);

      if (!isNaN(currentVal)) {
        if (type === "minus") {
          if (currentVal > input.min) {
            input.value = currentVal - 1;
          }
        } else if (type === "plus") {
          if (currentVal < input.max) {
            input.value = currentVal + 1;
          }
        }
      }
    });
  });

  // Elimina un producto del carrito cuando se presiona el botón de eliminar.
  const checkoutCart = document.getElementById("checkoutCart");
  checkoutCart.addEventListener("click", function (e) {
    if (e.target.classList.contains("btnDelete")) {
      const id = e.target.parentElement.parentElement.firstElementChild
        .textContent;
      const index = cart.findIndex((item) => item.product.id === id);

      cart.splice(index, 1);
      updateCheckoutCart();
    }
  });

  // Actualiza el resumen de compra en el carrito cuando se agrega un producto o se cambia la cantidad de productos.
  function updateCheckoutCart() {
    checkoutCart.innerHTML = "";
    let subtotal = 0;

    cart.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>Producto ${item.product.id}</td>
                <td>${item.product.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.product.price}</td>
                <td>$${item.product.price * item.quantity}</td>
                <td><button type="button" class="btn btn-danger btnDelete">Eliminar</button></td>
            `;
      checkoutCart.appendChild(row);

      subtotal += item.product.price * item.quantity;
    });

    totalCheckout.textContent = `$${subtotal.toFixed(2)}`;
  }
});

// Botón para comprar productos y mandarlos al recibo.
const btnBuy = document.querySelector(".btn-comprar");
btnBuy.addEventListener("click", function () {
  if (cart.length > 0) {
    localStorage.removeItem("data-cart");

    const cartProducts = JSON.stringify(cart);
    localStorage.setItem("data-cart", cartProducts);

    window.location.href = "Pago.html";
  } else {
    alert("El cart está vacío.");
  }
});