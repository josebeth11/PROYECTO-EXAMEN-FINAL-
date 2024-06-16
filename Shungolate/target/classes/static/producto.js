document.addEventListener("DOMContentLoaded", function () {
  const productListContainer = document.getElementById("productList");
  const formCreate = document.getElementById("formCreate");
  const formUpdate = document.getElementById("formUpdate");

  // Función para obtener todos los productos
  async function getAllProductos() {
    try {
      const response = await fetch('/productos');
      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Función para obtener un producto por su ID
  async function getProductoById(productId) {
    try {
      const response = await fetch(`/productos/${productId}`);
      if (!response.ok) {
        throw new Error('Producto no encontrado');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Función para crear un nuevo producto
  async function createProducto(producto) {
    try {
      const response = await fetch('/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
      });
      if (!response.ok) {
        throw new Error('Error al crear el producto');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Función para actualizar un producto existente
  async function updateProducto(productId, productoDetails) {
    try {
      const response = await fetch(`/productos/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productoDetails)
      });
      if (!response.ok) {
        throw new Error('Error al actualizar el producto');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Función para eliminar un producto
  async function deleteProducto(productId) {
    try {
      const response = await fetch(`/productos/${productId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }
      return true; // Éxito al eliminar
    } catch (error) {
      console.error('Error:', error);
      return false; // Error al eliminar
    }
  }

  // Función para cargar y mostrar todos los productos en el frontend
  async function loadProductos() {
    const productos = await getAllProductos();
    productListContainer.innerHTML = ''; // Limpiar contenedor

    productos.forEach((producto) => {
      const card = createProductCard(producto);
      productListContainer.appendChild(card);
    });
  }

  // Función para crear una tarjeta de producto (ejemplo de interfaz gráfica)
  function createProductCard(producto) {
    const card = document.createElement('div');
    card.classList.add('card', 'mb-3');
    card.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text">${producto.descripcion}</p>
        <p class="card-text">Precio: $${producto.precio}</p>
        <button class="btn btn-primary btn-sm mr-2 btnEdit" data-product-id="${producto.id}">Editar</button>
        <button class="btn btn-danger btn-sm btnDelete" data-product-id="${producto.id}">Eliminar</button>
      </div>
    `;

    // Agregar eventos para los botones de editar y eliminar
    const btnEdit = card.querySelector('.btnEdit');
    btnEdit.addEventListener('click', async () => {
      const productoId = btnEdit.getAttribute('data-product-id');
      const producto = await getProductoById(productoId);
      fillUpdateForm(producto);
    });

    const btnDelete = card.querySelector('.btnDelete');
    btnDelete.addEventListener('click', async () => {
      const productoId = btnDelete.getAttribute('data-product-id');
      const deleted = await deleteProducto(productoId);
      if (deleted) {
        loadProductos();
      }
    });

    return card;
  }

  // Función para llenar el formulario de actualización con los datos del producto seleccionado
  function fillUpdateForm(producto) {
    formUpdate.querySelector('#productId').value = producto.id;
    formUpdate.querySelector('#updateNombre').value = producto.nombre;
    formUpdate.querySelector('#updateDescripcion').value = producto.descripcion;
    formUpdate.querySelector('#updatePrecio').value = producto.precio;
    // Puedes añadir más campos según la estructura de tu producto
    formUpdate.classList.remove('d-none'); // Mostrar formulario de actualización
  }

  // Evento para el formulario de creación de producto
  formCreate.addEventListener('submit', async (event) => {
    event.preventDefault();

    const producto = {
      nombre: formCreate.querySelector('#createNombre').value,
      descripcion: formCreate.querySelector('#createDescripcion').value,
      precio: parseFloat(formCreate.querySelector('#createPrecio').value)
      // Puedes añadir más campos según la estructura de tu producto
    };

    const createdProduct = await createProducto(producto);
    if (createdProduct) {
      formCreate.reset(); // Limpiar formulario
      loadProductos(); // Actualizar la lista de productos
    }
  });

  // Evento para el formulario de actualización de producto
  formUpdate.addEventListener('submit', async (event) => {
    event.preventDefault();

    const productId = formUpdate.querySelector('#productId').value;
    const productoDetails = {
      nombre: formUpdate.querySelector('#updateNombre').value,
      descripcion: formUpdate.querySelector('#updateDescripcion').value,
      precio: parseFloat(formUpdate.querySelector('#updatePrecio').value)
      // Puedes añadir más campos según la estructura de tu producto
    };

    const updatedProduct = await updateProducto(productId, productoDetails);
    if (updatedProduct) {
      formUpdate.classList.add('d-none'); // Ocultar formulario de actualización
      loadProductos(); // Actualizar la lista de productos
    }
  });

  // Cargar inicialmente todos los productos al cargar la página
  loadProductos();
});
