// Script para manejar el formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    // Comprobar si el formulario existe en la página
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Añadir validación en tiempo real para cada campo
        const nombreInput = document.getElementById('nombre');
        const emailInput = document.getElementById('email');
        const motivoSelect = document.getElementById('motivo');
        const mensajeTextarea = document.getElementById('mensaje');
        const privacidadCheckbox = document.getElementById('privacidad');
        
        // Validación de correo electrónico
        function validarEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        }
        
        // Validación para el campo de nombre
        if (nombreInput) {
            nombreInput.addEventListener('blur', function() {
                if (nombreInput.value.trim() === '') {
                    nombreInput.classList.add('campo-error');
                    mostrarErrorCampo(nombreInput, 'El nombre es obligatorio');
                } else if (nombreInput.value.trim().length < 3) {
                    nombreInput.classList.add('campo-error');
                    mostrarErrorCampo(nombreInput, 'El nombre debe tener al menos 3 caracteres');
                } else {
                    nombreInput.classList.remove('campo-error');
                    ocultarErrorCampo(nombreInput);
                }
            });
        }
        
        // Validación para el campo de email
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                if (emailInput.value.trim() === '') {
                    emailInput.classList.add('campo-error');
                    mostrarErrorCampo(emailInput, 'El email es obligatorio');
                } else if (!validarEmail(emailInput.value.trim())) {
                    emailInput.classList.add('campo-error');
                    mostrarErrorCampo(emailInput, 'Ingresa un email válido');
                } else {
                    emailInput.classList.remove('campo-error');
                    ocultarErrorCampo(emailInput);
                }
            });
        }
        
        // Validación para el campo de motivo
        if (motivoSelect) {
            motivoSelect.addEventListener('change', function() {
                if (motivoSelect.value === '') {
                    motivoSelect.classList.add('campo-error');
                    mostrarErrorCampo(motivoSelect, 'Selecciona un motivo de contacto');
                } else {
                    motivoSelect.classList.remove('campo-error');
                    ocultarErrorCampo(motivoSelect);
                }
            });
        }
        
        // Validación para el campo de mensaje
        if (mensajeTextarea) {
            mensajeTextarea.addEventListener('blur', function() {
                if (mensajeTextarea.value.trim() === '') {
                    mensajeTextarea.classList.add('campo-error');
                    mostrarErrorCampo(mensajeTextarea, 'El mensaje es obligatorio');
                } else if (mensajeTextarea.value.trim().length < 10) {
                    mensajeTextarea.classList.add('campo-error');
                    mostrarErrorCampo(mensajeTextarea, 'El mensaje debe tener al menos 10 caracteres');
                } else {
                    mensajeTextarea.classList.remove('campo-error');
                    ocultarErrorCampo(mensajeTextarea);
                }
            });
        }
        
        // Función para mostrar mensaje de error debajo del campo
        function mostrarErrorCampo(campo, mensaje) {
            // Buscar si ya existe un mensaje de error
            let mensajeError = campo.nextElementSibling;
            if (!mensajeError || !mensajeError.classList.contains('error-mensaje')) {
                // Crear nuevo elemento para el mensaje de error
                mensajeError = document.createElement('div');
                mensajeError.className = 'error-mensaje';
                // Insertar después del campo
                campo.parentNode.insertBefore(mensajeError, campo.nextSibling);
            }
            
            // Actualizar el mensaje
            mensajeError.textContent = mensaje;
            mensajeError.style.display = 'block';
        }
        
        // Función para ocultar mensaje de error
        function ocultarErrorCampo(campo) {
            const mensajeError = campo.nextElementSibling;
            if (mensajeError && mensajeError.classList.contains('error-mensaje')) {
                mensajeError.style.display = 'none';
            }
        }
        
        // Manejar envío del formulario
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevenir el envío del formulario
            
            // Obtener los valores de los campos
            const nombre = nombreInput.value.trim();
            const email = emailInput.value.trim();
            const motivo = motivoSelect.value;
            const mensaje = mensajeTextarea.value.trim();
            const aceptaPrivacidad = privacidadCheckbox.checked;
            
            // Array para almacenar errores
            let errores = [];
            
            // Validar todos los campos
            if (nombre === '') {
                errores.push('El nombre es obligatorio');
                nombreInput.classList.add('campo-error');
            } else if (nombre.length < 3) {
                errores.push('El nombre debe tener al menos 3 caracteres');
                nombreInput.classList.add('campo-error');
            }
            
            if (email === '') {
                errores.push('El email es obligatorio');
                emailInput.classList.add('campo-error');
            } else if (!validarEmail(email)) {
                errores.push('Ingresa un email válido');
                emailInput.classList.add('campo-error');
            }
            
            if (motivo === '') {
                errores.push('Selecciona un motivo de contacto');
                motivoSelect.classList.add('campo-error');
            }
            
            if (mensaje === '') {
                errores.push('El mensaje es obligatorio');
                mensajeTextarea.classList.add('campo-error');
            } else if (mensaje.length < 10) {
                errores.push('El mensaje debe tener al menos 10 caracteres');
                mensajeTextarea.classList.add('campo-error');
            }
            
            if (!aceptaPrivacidad) {
                errores.push('Debes aceptar la política de privacidad');
                privacidadCheckbox.classList.add('campo-error');
            }
            
            // Si hay errores, mostrar mensaje y salir
            if (errores.length > 0) {
                mostrarMensaje('Por favor, corrige los siguientes errores:<br>' + errores.join('<br>'), 'error');
                return;
            }
            
            // Simulación de envío exitoso
            mostrarMensaje('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.', 'success');
            
            // Mostrar animación de confirmación
            mostrarAnimacionConfirmacion();
            
            // Resetear el formulario
            contactForm.reset();
            
            // Eliminar clases de error
            nombreInput.classList.remove('campo-error');
            emailInput.classList.remove('campo-error');
            motivoSelect.classList.remove('campo-error');
            mensajeTextarea.classList.remove('campo-error');
            if (privacidadCheckbox) privacidadCheckbox.classList.remove('campo-error');
        });
    }
    
    // Función para mostrar mensajes al usuario
    function mostrarMensaje(texto, tipo) {
        const formMessage = document.getElementById('formMessage');
        
        if (formMessage) {
            formMessage.innerHTML = texto;
            formMessage.className = 'form-message ' + tipo;
            formMessage.style.display = 'block';
            
            // Hacer scroll hasta el mensaje
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Ocultar el mensaje después de 5 segundos
            setTimeout(function() {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
    
    // Función para mostrar animación de confirmación
    function mostrarAnimacionConfirmacion() {
        // Crear contenedor para la animación
        const animacionContainer = document.createElement('div');
        animacionContainer.className = 'animacion-confirmacion';
        
        // Crear elemento de check
        const checkMark = document.createElement('div');
        checkMark.className = 'check-mark';
        checkMark.innerHTML = '✓';
        
        // Añadir elementos al DOM
        animacionContainer.appendChild(checkMark);
        document.body.appendChild(animacionContainer);
        
        // Añadir clase para la animación
        setTimeout(() => {
            animacionContainer.classList.add('visible');
        }, 100);
        
        // Eliminar la animación después de completarse
        setTimeout(() => {
            animacionContainer.classList.remove('visible');
            setTimeout(() => {
                document.body.removeChild(animacionContainer);
            }, 500);
        }, 2000);
    }
    
    // Añadir estilos para la animación
    const estiloAnimacion = document.createElement('style');
    estiloAnimacion.innerHTML = `
        .animacion-confirmacion {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            width: 120px;
            height: 120px;
            background-color: var(--deep-purple-primary);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            opacity: 0;
            transition: transform 0.5s ease, opacity 0.5s ease;
        }
        .animacion-confirmacion.visible {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        .check-mark {
            color: white;
            font-size: 60px;
            transform: scale(0);
            transition: transform 0.5s ease 0.2s;
        }
        .animacion-confirmacion.visible .check-mark {
            transform: scale(1);
        }
        .campo-error {
            border-color: #f44336 !important;
        }
        .error-mensaje {
            color: #f44336;
            font-size: 12px;
            margin-top: 5px;
            display: none;
        }
    `;
    document.head.appendChild(estiloAnimacion);
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
            localStorage.setItem('tema', 'oscuro');
        } else {
            themeToggle.textContent = '🌙'; // Icono de luna
            localStorage.setItem('tema', 'claro');
        }
    });
    
    // Verificar tema guardado en localStorage
    const temaGuardado = localStorage.getItem('tema');
    if (temaGuardado === 'oscuro') {
        document.body.classList.add('dark-theme');
        themeToggle.textContent = '☀️';
    }
});

// Script para filtrar productos (para la página de productos)
document.addEventListener('DOMContentLoaded', function() {
    const productosContainer = document.querySelector('.catalogo-productos');
    
    if (productosContainer) {
        // Crear barra de filtrado
        const filtroContainer = document.createElement('div');
        filtroContainer.className = 'filtro-container';
        
        const filtroLabel = document.createElement('label');
        filtroLabel.textContent = 'Filtrar por tipo: ';
        
        const filtroSelect = document.createElement('select');
        filtroSelect.id = 'filtroProductos';
        
        // Opciones del filtro
        const opciones = [
            { valor: 'todos', texto: 'Todos los productos' },
            { valor: 'original', texto: 'Fórmula Original' },
            { valor: 'concentracion', texto: 'Fórmula Concentración' },
            { valor: 'memoria', texto: 'Fórmula Memoria' }
        ];
        
        // Crear opciones del select
        opciones.forEach(opcion => {
            const option = document.createElement('option');
            option.value = opcion.valor;
            option.textContent = opcion.texto;
            filtroSelect.appendChild(option);
        });
        
        // Armar la barra de filtrado
        filtroContainer.appendChild(filtroLabel);
        filtroContainer.appendChild(filtroSelect);
        
        // Insertarla antes del catálogo
        productosContainer.parentNode.insertBefore(filtroContainer, productosContainer);
        
        // Obtener productos y añadir atributos para filtrado
        const productos = document.querySelectorAll('.producto');
        
        productos.forEach(producto => {
            const titulo = producto.querySelector('h3').textContent.toLowerCase();
            
            if (titulo.includes('original')) {
                producto.setAttribute('data-tipo', 'original');
            } else if (titulo.includes('concentración')) {
                producto.setAttribute('data-tipo', 'concentracion');
            } else if (titulo.includes('memoria')) {
                producto.setAttribute('data-tipo', 'memoria');
            } else {
                producto.setAttribute('data-tipo', 'otros');
            }
            
            // Añadir efecto de animación al pasar el mouse
            producto.addEventListener('mouseenter', function() {
                const img = this.querySelector('img');
                img.style.transform = 'scale(1.1)';
                img.style.transition = 'transform 0.3s ease';
            });
            
            producto.addEventListener('mouseleave', function() {
                const img = this.querySelector('img');
                img.style.transform = 'scale(1)';
            });
        });
        
        // Manejar cambio en el filtro
        filtroSelect.addEventListener('change', function() {
            const filtro = this.value;
            
            productos.forEach(producto => {
                if (filtro === 'todos' || producto.getAttribute('data-tipo') === filtro) {
                    producto.style.display = 'flex';
                    
                    // Añadir animación de aparición
                    producto.style.opacity = '0';
                    producto.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        producto.style.opacity = '1';
                        producto.style.transform = 'translateY(0)';
                        producto.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    }, 10);
                    
                } else {
                    producto.style.opacity = '0';
                    producto.style.transform = 'translateY(20px)';
                    producto.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    
                    setTimeout(() => {
                        producto.style.display = 'none';
                    }, 500);
                }
            });
        });
        
        // Añadir estilos para el filtro
        const estilofiltro = document.createElement('style');
        estilofiltro.innerHTML = `
            .filtro-container {
                margin-bottom: 2rem;
                padding: 1rem;
                background-color: #f5f5f5;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1rem;
                max-width: 1200px;
                margin-left: auto;
                margin-right: auto;
            }
            
            #filtroProductos {
                padding: 0.5rem 1rem;
                border: 2px solid var(--deep-purple-light);
                border-radius: 4px;
                background-color: white;
                color: var(--deep-purple-dark);
                font-family: 'Roboto', sans-serif;
                cursor: pointer;
                transition: border-color 0.3s ease;
                min-width: 200px;
            }
            
            #filtroProductos:focus {
                outline: none;
                border-color: var(--deep-purple-primary);
            }
            
            .producto {
                opacity: 1;
                transform: translateY(0);
                transition: opacity 0.5s ease, transform 0.5s ease;
            }
        `;
        document.head.appendChild(estilofiltro);
    }
}); 