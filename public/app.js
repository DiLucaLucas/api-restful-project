const API_URL = 'http://localhost:3000/api/auth';

// Función para alternar entre el formulario de login y el de registro
function toggleForm() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginForm.style.display === "none") {
        loginForm.style.display = "block";
        registerForm.style.display = "none";
    } else {
        loginForm.style.display = "none";
        registerForm.style.display = "block";
    }
}

// Función para registrar un nuevo usuario
async function register(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma tradicional

    const email = document.querySelector('#register-form input[type="email"]').value;
    const password = document.querySelector('#register-form input[type="password"]').value;

    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        toggleForm(); // Cambia al formulario de login
    } else {
        alert(`Error: ${data.message || 'No se pudo registrar'}`);
    }
}

// Función para loguear un usuario
async function login(event) {
    event.preventDefault();

    const email = document.querySelector('#login-form input[type="email"]').value;
    const password = document.querySelector('#login-form input[type="password"]').value;

    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('token', data.token);
        alert('Login exitoso.');
        // Aquí podrías redirigir al usuario a una página protegida
    } else {
        alert(`Error: ${data.message || 'No se pudo iniciar sesión'}`);
    }
}

// Asignar las funciones a los formularios
document.getElementById('register-form').addEventListener('submit', register);
document.getElementById('login-form').addEventListener('submit', login);
