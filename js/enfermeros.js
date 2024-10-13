const apiBaseUrl = 'https://api-nodejs-pab6.onrender.com/'; // Cambia esta URL si la API está desplegada en otro lado
const token = 'supersecreto'; // Token de autenticación

// Obtener todos los enfermeros
function obtenerEnfermeros() {
    fetch(`${apiBaseUrl}/enfermeros`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token // Agregar el token al header
        }
    })
    .then(response => response.json())
    .then(data => {
        const listaEnfermeros = document.getElementById('lista-enfermeros');
        listaEnfermeros.innerHTML = data.map(enfermero => `<p>${enfermero.nombre} - ${enfermero.email}</p>`).join('');
    })
    .catch(error => console.error('Error al obtener enfermeros:', error));
}

// Agregar un nuevo enfermero
document.getElementById('formulario-enfermero').addEventListener('submit', function (evento) {
    evento.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const certificaciones = document.getElementById('certificaciones').value;
    const especialidad = document.getElementById('especialidad').value;

    const nuevoEnfermero = {
        nombre: nombre,
        email: email,
        certificaciones: certificaciones,
        especialidad: especialidad
    };

    fetch(`${apiBaseUrl}/enfermeros`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token // Agregar el token al header
        },
        body: JSON.stringify(nuevoEnfermero)
    })
    .then(response => response.json())
    .then(data => {
        alert('Enfermero agregado exitosamente');
        obtenerEnfermeros();  // Refrescar la lista
    })
    .catch(error => console.error('Error al agregar enfermero:', error));
});
