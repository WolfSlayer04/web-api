const apiBaseUrl = 'https://api-nodejs-pab6.onrender.com/'; // Cambia esta URL si la API está desplegada en otro lado
const token = 'supersecreto'; // Token de autenticación

// Obtener todas las ofertas
function obtenerOfertas() {
    fetch(`${apiBaseUrl}/ofertas`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token // Agregar el token al header
        }
    })
    .then(response => response.json())
    .then(data => {
        const listaOfertas = document.getElementById('lista-ofertas');
        listaOfertas.innerHTML = data.map(oferta => `
            <p>
                <strong>${oferta.titulo}</strong><br>
                ${oferta.descripcion}<br>
                <em>${oferta.tipo_cuidado} - ${oferta.ubicacion} - ${oferta.horario} - $${oferta.salario}</em>
            </p>
        `).join('');
    })
    .catch(error => console.error('Error al obtener ofertas:', error));
}

// Agregar una nueva oferta
document.getElementById('formulario-oferta').addEventListener('submit', function (evento) {
    evento.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const tipoCuidado = document.getElementById('tipoCuidado').value;
    const ubicacion = document.getElementById('ubicacion').value;
    const horario = document.getElementById('horario').value;
    const salario = document.getElementById('salario').value;

    const nuevaOferta = {
        titulo: titulo,
        descripcion: descripcion,
        tipo_cuidado: tipoCuidado,
        ubicacion: ubicacion,
        horario: horario,
        salario: salario
    };

    fetch(`${apiBaseUrl}/ofertas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token // Agregar el token al header
        },
        body: JSON.stringify(nuevaOferta)
    })
    .then(response => response.json())
    .then(data => {
        alert('Oferta agregada exitosamente');
        obtenerOfertas();  // Refrescar la lista de ofertas
    })
    .catch(error => console.error('Error al agregar oferta:', error));
});
