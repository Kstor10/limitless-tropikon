// Script para manejar el formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    // Comprobar si el formulario existe en la página
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevenir el envío del formulario
            
            // Obtener los valores de los campos
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const motivo = document.getElementById('motivo').value;
            const mensaje = document.getElementById('mensaje').value;
            
            // Validar que los campos no estén vacíos
            if (!nombre || !email || !motivo || !mensaje) {
                mostrarMensaje('Por favor, completa todos los campos obligatorios.', 'error');
                return;
            }
            
            // Simulación de envío exitoso
            mostrarMensaje('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.', 'success');
            
            // Resetear el formulario
            contactForm.reset();
        });
    }
    
    // Función para mostrar mensajes al usuario
    function mostrarMensaje(texto, tipo) {
        const formMessage = document.getElementById('formMessage');
        
        if (formMessage) {
            formMessage.textContent = texto;
            formMessage.className = 'form-message ' + tipo;
            formMessage.style.display = 'block';
            
            // Ocultar el mensaje después de 5 segundos
            setTimeout(function() {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
});

// Script para cambiar el tema de la página (claro/oscuro)
document.addEventListener('DOMContentLoaded', function() {
    // Comprobar si existe el botón de tema en la página
    const themeToggle = document.createElement('button');
    themeToggle.textContent = '🌙'; // Icono de luna
    themeToggle.id = 'themeToggle';
    themeToggle.className = 'theme-toggle';
    themeToggle.title = 'Cambiar tema';
    
    // Añadir el botón al documento
    document.body.appendChild(themeToggle);
    
    // Manejar el cambio de tema
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        // Cambiar el icono según el tema
        if (document.body.classList.contains('dark-theme')) {
            themeToggle.textContent = '☀️'; // Icono de sol
        } else {
            themeToggle.textContent = '🌙'; // Icono de luna
        }
    });
}); 