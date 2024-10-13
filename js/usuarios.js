const apiBaseUrl = 'https://api-nodejs-pab6.onrender.com/'; // Cambia esta URL si la API está desplegada en otro lado
const token = 'supersecreto'; // Token de autenticación

// Obtener todos los usuarios
function obtenerUsuarios() {
    fetch(`${apiBaseUrl}/usuarios`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token // Agregar el token al header
        }
    })
    .then(response => response.json())
    .then(data => {
        const listaUsuarios = document.getElementById('lista-usuarios');
        listaUsuarios.innerHTML = data.map(usuario => `<p>${usuario.nombre} - ${usuario.email}</p>`).join('');
    })
    .catch(error => console.error('Error al obtener usuarios:', error));
}

// Agregar un nuevo usuario
document.getElementById('formulario-usuario').addEventListener('submit', function (evento) {
    evento.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const contrasena = document.getElementById('contrasena').value;

    const nuevoUsuario = {
        nombre: nombre,
        email: email,
        contraseña: contrasena
    };

    fetch(`${apiBaseUrl}/usuarios`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token // Agregar el token al header
        },
        body: JSON.stringify(nuevoUsuario)
    })
    .then(response => response.json())
    .then(data => {
        alert('Usuario agregado exitosamente');
        obtenerUsuarios();  // Refrescar la lista de usuarios
    })
    .catch(error => console.error('Error al agregar usuario:', error));
});
