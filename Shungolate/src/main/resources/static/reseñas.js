document.addEventListener("DOMContentLoaded", function () {
  const resenaListContainer = document.getElementById("resenaList");
  const formCreate = document.getElementById("formCreate");
  const formUpdate = document.getElementById("formUpdate");

  // Función para obtener todas las reseñas
  async function getAllResenas() {
    try {
      const response = await fetch('/resenas');
      if (!response.ok) {
        throw new Error('Error al obtener las reseñas');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Función para obtener una reseña por su ID
  async function getResenaById(resenaId) {
    try {
      const response = await fetch(`/resenas/${resenaId}`);
      if (!response.ok) {
        throw new Error('Reseña no encontrada');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Función para crear una nueva reseña
  async function createResena(resena) {
    try {
      const response = await fetch('/resenas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(resena)
      });
      if (!response.ok) {
        throw new Error('Error al crear la reseña');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Función para actualizar una reseña existente
  async function updateResena(resenaId, resenaDetails) {
    try {
      const response = await fetch(`/resenas/${resenaId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(resenaDetails)
      });
      if (!response.ok) {
        throw new Error('Error al actualizar la reseña');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Función para eliminar una reseña
  async function deleteResena(resenaId) {
    try {
      const response = await fetch(`/resenas/${resenaId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Error al eliminar la reseña');
      }
      return true; // Éxito al eliminar
    } catch (error) {
      console.error('Error:', error);
      return false; // Error al eliminar
    }
  }

  // Función para cargar y mostrar todas las reseñas en el frontend
  async function loadResenas() {
    const resenas = await getAllResenas();
    resenaListContainer.innerHTML = ''; // Limpiar contenedor

    resenas.forEach((resena) => {
      const card = createResenaCard(resena);
      resenaListContainer.appendChild(card);
    });
  }

  // Función para crear una tarjeta de reseña (ejemplo de interfaz gráfica)
  function createResenaCard(resena) {
    const card = document.createElement('div');
    card.classList.add('card', 'mb-3');
    card.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${resena.usuario}</h5>
        <p class="card-text">${resena.comentario}</p>
        <p class="card-text">Rating: ${resena.rating}</p>
        <button class="btn btn-primary btn-sm mr-2 btnEdit" data-resena-id="${resena.id}">Editar</button>
        <button class="btn btn-danger btn-sm btnDelete" data-resena-id="${resena.id}">Eliminar</button>
      </div>
    `;

    // Agregar eventos para los botones de editar y eliminar
    const btnEdit = card.querySelector('.btnEdit');
    btnEdit.addEventListener('click', async () => {
      const resenaId = btnEdit.getAttribute('data-resena-id');
      const resena = await getResenaById(resenaId);
      fillUpdateForm(resena);
    });

    const btnDelete = card.querySelector('.btnDelete');
    btnDelete.addEventListener('click', async () => {
      const resenaId = btnDelete.getAttribute('data-resena-id');
      const deleted = await deleteResena(resenaId);
      if (deleted) {
        loadResenas();
      }
    });

    return card;
  }

  // Función para llenar el formulario de actualización con los datos de la reseña seleccionada
  function fillUpdateForm(resena) {
    formUpdate.querySelector('#resenaId').value = resena.id;
    formUpdate.querySelector('#updateUsuario').value = resena.usuario;
    formUpdate.querySelector('#updateProducto').value = resena.producto;
    formUpdate.querySelector('#updateRating').value = resena.rating;
    formUpdate.querySelector('#updateComentario').value = resena.comentario;
    // Puedes añadir más campos según la estructura de tu reseña
    formUpdate.classList.remove('d-none'); // Mostrar formulario de actualización
  }

  // Evento para el formulario de creación de reseña
  formCreate.addEventListener('submit', async (event) => {
    event.preventDefault();

    const resena = {
      usuario: formCreate.querySelector('#createUsuario').value,
      producto: formCreate.querySelector('#createProducto').value,
      rating: parseInt(formCreate.querySelector('#createRating').value),
      comentario: formCreate.querySelector('#createComentario').value
      // Puedes añadir más campos según la estructura de tu reseña
    };

    const createdResena = await createResena(resena);
    if (createdResena) {
      formCreate.reset(); // Limpiar formulario
      loadResenas(); // Actualizar la lista de reseñas
    }
  });

  // Evento para el formulario de actualización de reseña
  formUpdate.addEventListener('submit', async (event) => {
    event.preventDefault();

    const resenaId = formUpdate.querySelector('#resenaId').value;
    const resenaDetails = {
      usuario: formUpdate.querySelector('#updateUsuario').value,
      producto: formUpdate.querySelector('#updateProducto').value,
      rating: parseInt(formUpdate.querySelector('#updateRating').value),
      comentario: formUpdate.querySelector('#updateComentario').value
      // Puedes añadir más campos según la estructura de tu reseña
    };

    const updatedResena = await updateResena(resenaId, resenaDetails);
    if (updatedResena) {
      formUpdate.classList.add('d-none'); // Ocultar formulario de actualización
      loadResenas(); // Actualizar la lista de reseñas
    }
  });

  // Cargar inicialmente todas las reseñas al cargar la página
  loadResenas();
});
