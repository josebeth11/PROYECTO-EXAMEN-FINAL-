document.addEventListener('DOMContentLoaded', function() {
    const baseUrl = 'http://localhost:8080/usuarios'; // Reemplaza con la URL base de tu backend

    // Función para cargar todos los usuarios al cargar la página
    function cargarUsuarios() {
        fetch(baseUrl)
            .then(response => response.json())
            .then(usuarios => {
                const usuariosLista = document.getElementById('usuarios-lista');
                usuariosLista.innerHTML = ''; // Limpiar la lista actual
                usuarios.forEach(usuario => {
                    const usuarioHTML = `
                        <div class="usuario">
                            <p><strong>ID:</strong> ${usuario.id}</p>
                            <p><strong>Nombre:</strong> ${usuario.nombre}</p>
                            <p><strong>Correo Electrónico:</strong> ${usuario.correoElectronico}</p>
                            <button onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
                        </div>
                    `;
                    usuariosLista.innerHTML += usuarioHTML;
                });
            })
            .catch(error => console.error('Error al cargar usuarios:', error));
    }

    // Función para agregar un nuevo usuario
    document.getElementById('form-usuario').addEventListener('submit', function(event) {
        event.preventDefault();
        const nombre = document.getElementById('nombre-usuario').value;
        const correo = document.getElementById('correo').value;
        const contrasena = document.getElementById('contrasena').value;

        const nuevoUsuario = {
            nombre: nombre,
            correoElectronico: correo,
            contrasena: contrasena
        };

        fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoUsuario)
        })
        .then(response => response.json())
        .then(usuarioCreado => {
            cargarUsuarios(); // Actualizar la lista de usuarios después de agregar uno nuevo
            // Limpiar el formulario
            document.getElementById('nombre-usuario').value = '';
            document.getElementById('correo').value = '';
            document.getElementById('contrasena').value = '';
        })
        .catch(error => console.error('Error al crear usuario:', error));
    });

    // Función para eliminar un usuario por su ID
    function eliminarUsuario(idUsuario) {
        fetch(`${baseUrl}/${idUsuario}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                cargarUsuarios(); // Actualizar la lista de usuarios después de eliminar uno
            } else {
                console.error('Error al eliminar usuario');
            }
        })
        .catch(error => console.error('Error al eliminar usuario:', error));
    }

    // Cargar la lista de usuarios al cargar la página
    cargarUsuarios();
});
