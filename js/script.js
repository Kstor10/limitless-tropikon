// Script para manejar el formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    // Actualizar el año del copyright automáticamente
    const currentYearElements = document.querySelectorAll('#currentYear');
    const currentYear = new Date().getFullYear();
    currentYearElements.forEach(el => {
        el.textContent = currentYear;
    });
    
    // Funcionalidad del menú móvil
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    // Aplicar estilos inline para el menú móvil
    function setupMobileMenu() {
        // Estilos para el botón del menú
        if (mobileMenuBtn) {
            mobileMenuBtn.style.display = "block";
            mobileMenuBtn.style.backgroundColor = "#673AB7";
            mobileMenuBtn.style.color = "white";
            mobileMenuBtn.style.border = "none";
            mobileMenuBtn.style.borderRadius = "4px";
            mobileMenuBtn.style.fontSize = "1.5rem";
            mobileMenuBtn.style.cursor = "pointer";
            
            // En móviles
            if (window.innerWidth <= 768) {
                mobileMenuBtn.style.display = "block";
                mobileMenuBtn.style.position = "absolute";
                mobileMenuBtn.style.top = "1rem";
                mobileMenuBtn.style.right = "1rem";
            }
        }
        
        // Evento para mostrar/ocultar el menú
        if (mobileMenuBtn && navMenu) {
            mobileMenuBtn.addEventListener('click', function() {
                if (navMenu.style.maxHeight === "300px") {
                    navMenu.style.maxHeight = "0";
                    navMenu.style.padding = "0";
                    navMenu.style.overflow = "hidden";
                    this.textContent = "☰";
                } else {
                    navMenu.style.flexDirection = "column";
                    navMenu.style.alignItems = "center";
                    navMenu.style.backgroundColor = "#B0BEC5";
                    navMenu.style.position = "absolute";
                    navMenu.style.top = "100%";
                    navMenu.style.left = "0";
                    navMenu.style.width = "100%";
                    navMenu.style.maxHeight = "300px";
                    navMenu.style.padding = "1rem 0";
                    navMenu.style.boxShadow = "0 5px 10px rgba(0,0,0,0.1)";
                    navMenu.style.zIndex = "100";
                    navMenu.style.transition = "max-height 0.5s ease";
                    this.textContent = "✕";
                }
            });
        }
    }
    
    // Inicializar el menú móvil
    setupMobileMenu();
    
    // Evento para ajustar estilos al redimensionar la ventana
    window.addEventListener('resize', function() {
        if (mobileMenuBtn) {
            if (window.innerWidth <= 768) {
                mobileMenuBtn.style.display = "block";
            } else {
                mobileMenuBtn.style.display = "none";
                // Restablecer el menú en pantallas grandes
                if (navMenu) {
                    navMenu.style = "";
                }
            }
        }
    });

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

// Script para el carrito de compra
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar carrito
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    actualizarContadorCarrito();

    // Añadir botones de compra a los productos
    const productos = document.querySelectorAll('.producto');
    productos.forEach(producto => {
        const btnComprar = producto.querySelector('.btn');
        if (btnComprar) {
            // Cambiar el texto del botón existente
            btnComprar.textContent = 'Añadir al carrito';
            
            btnComprar.addEventListener('click', function(e) {
                e.preventDefault();
                
                const productoInfo = {
                    id: Date.now().toString(),
                    nombre: producto.querySelector('h3').textContent,
                    precio: Math.floor(Math.random() * 20) + 30, // Precio aleatorio entre 30 y 50€
                    cantidad: 1,
                    imagen: producto.querySelector('img').src
                };
                
                // Añadir al carrito
                carrito.push(productoInfo);
                localStorage.setItem('carrito', JSON.stringify(carrito));
                
                // Mostrar notificación
                mostrarNotificacion(`¡${productoInfo.nombre} añadido al carrito!`);
                
                // Actualizar contador
                actualizarContadorCarrito();
                
                // Animación de añadido al carrito
                animarProductoAlCarrito(e.target, productoInfo);
            });
        }
    });

    // Crear icono de carrito en la esquina superior derecha
    const header = document.querySelector('header');
    if (header) {
        const carritoIcono = document.createElement('div');
        carritoIcono.className = 'carrito-icono';
        carritoIcono.innerHTML = `
            <i class="icono-carrito">🛒</i>
            <span class="contador-carrito">0</span>
        `;
        header.appendChild(carritoIcono);
        
        carritoIcono.addEventListener('click', mostrarCarrito);
    }

    // Crear modal del carrito
    const carritoModal = document.createElement('div');
    carritoModal.className = 'carrito-modal';
    carritoModal.innerHTML = `
        <div class="carrito-contenido">
            <div class="carrito-header">
                <h3>Tu Carrito</h3>
                <button class="cerrar-carrito">&times;</button>
            </div>
            <div class="carrito-items"></div>
            <div class="carrito-footer">
                <div class="carrito-total">Total: <span>0.00€</span></div>
                <button class="btn finalizar-compra">Finalizar Compra</button>
            </div>
        </div>
    `;
    document.body.appendChild(carritoModal);
    
    // Añadir eventos al modal
    const cerrarCarrito = document.querySelector('.cerrar-carrito');
    if (cerrarCarrito) {
        cerrarCarrito.addEventListener('click', ocultarCarrito);
    }
    
    // Fondo para cerrar el carrito al hacer clic fuera
    carritoModal.addEventListener('click', function(e) {
        if (e.target === carritoModal) {
            ocultarCarrito();
        }
    });
    
    // Botón finalizar compra
    const finalizarCompra = document.querySelector('.finalizar-compra');
    if (finalizarCompra) {
        finalizarCompra.addEventListener('click', procesarCompra);
    }
    
    // Función para mostrar el carrito
    function mostrarCarrito() {
        renderizarItemsCarrito();
        carritoModal.classList.add('visible');
        document.body.classList.add('modal-abierto');
    }
    
    // Función para ocultar el carrito
    function ocultarCarrito() {
        carritoModal.classList.remove('visible');
        document.body.classList.remove('modal-abierto');
    }
    
    // Función para renderizar los items del carrito
    function renderizarItemsCarrito() {
        const carritoItems = document.querySelector('.carrito-items');
        if (carritoItems) {
            carritoItems.innerHTML = '';
            
            if (carrito.length === 0) {
                carritoItems.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío</p>';
                document.querySelector('.carrito-total span').textContent = '0.00€';
                return;
            }
            
            let total = 0;
            
            carrito.forEach(item => {
                const subtotal = item.precio * item.cantidad;
                total += subtotal;
                
                const itemElement = document.createElement('div');
                itemElement.className = 'carrito-item';
                itemElement.innerHTML = `
                    <img src="${item.imagen}" alt="${item.nombre}">
                    <div class="item-detalles">
                        <h4>${item.nombre}</h4>
                        <p class="item-precio">${item.precio.toFixed(2)}€</p>
                        <div class="item-cantidad">
                            <button class="cantidad-btn menos" data-id="${item.id}">-</button>
                            <span>${item.cantidad}</span>
                            <button class="cantidad-btn mas" data-id="${item.id}">+</button>
                        </div>
                    </div>
                    <button class="eliminar-item" data-id="${item.id}">&times;</button>
                `;
                
                carritoItems.appendChild(itemElement);
            });
            
            // Actualizar total
            document.querySelector('.carrito-total span').textContent = `${total.toFixed(2)}€`;
            
            // Añadir eventos a los botones
            document.querySelectorAll('.eliminar-item').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    eliminarDelCarrito(id);
                });
            });
            
            document.querySelectorAll('.cantidad-btn.menos').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    actualizarCantidad(id, 'restar');
                });
            });
            
            document.querySelectorAll('.cantidad-btn.mas').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    actualizarCantidad(id, 'sumar');
                });
            });
        }
    }
    
    // Función para actualizar cantidad
    function actualizarCantidad(id, accion) {
        carrito = carrito.map(item => {
            if (item.id === id) {
                if (accion === 'sumar') {
                    item.cantidad++;
                } else if (accion === 'restar' && item.cantidad > 1) {
                    item.cantidad--;
                }
            }
            return item;
        });
        
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderizarItemsCarrito();
        actualizarContadorCarrito();
    }
    
    // Función para eliminar un item del carrito
    function eliminarDelCarrito(id) {
        carrito = carrito.filter(item => item.id !== id);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderizarItemsCarrito();
        actualizarContadorCarrito();
        
        if (carrito.length === 0) {
            ocultarCarrito();
        }
    }
    
    // Función para actualizar el contador del carrito
    function actualizarContadorCarrito() {
        const contador = document.querySelector('.contador-carrito');
        if (contador) {
            const cantidad = carrito.reduce((total, item) => total + item.cantidad, 0);
            contador.textContent = cantidad;
            contador.style.display = cantidad > 0 ? 'flex' : 'none';
        }
    }
    
    // Función para procesar la compra
    function procesarCompra() {
        if (carrito.length === 0) return;
        
        // Simular proceso de compra
        const totalCompra = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
        
        // Crear animación de carga
        const loadingElement = document.createElement('div');
        loadingElement.className = 'loading-compra';
        loadingElement.innerHTML = '<div class="spinner"></div><p>Procesando tu pedido...</p>';
        document.body.appendChild(loadingElement);
        
        // Simular tiempo de procesamiento
        setTimeout(() => {
            document.body.removeChild(loadingElement);
            
            // Crear confirmación
            const confirmacion = document.createElement('div');
            confirmacion.className = 'confirmacion-compra';
            confirmacion.innerHTML = `
                <div class="confirmacion-contenido">
                    <div class="check-icon">✓</div>
                    <h3>¡Compra realizada con éxito!</h3>
                    <p>Gracias por tu compra de ${totalCompra.toFixed(2)}€</p>
                    <p>Recibirás un email con los detalles de tu pedido.</p>
                    <button class="btn cerrar-confirmacion">Cerrar</button>
                </div>
            `;
            document.body.appendChild(confirmacion);
            
            // Vaciar carrito
            carrito = [];
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarContadorCarrito();
            ocultarCarrito();
            
            // Evento para cerrar confirmación
            const cerrarConfirmacion = document.querySelector('.cerrar-confirmacion');
            if (cerrarConfirmacion) {
                cerrarConfirmacion.addEventListener('click', function() {
                    document.body.removeChild(confirmacion);
                });
            }
        }, 2000);
    }
    
    // Función para mostrar notificación
    function mostrarNotificacion(mensaje) {
        const notificacion = document.createElement('div');
        notificacion.className = 'notificacion';
        notificacion.textContent = mensaje;
        document.body.appendChild(notificacion);
        
        // Mostrar notificación con animación
        setTimeout(() => {
            notificacion.classList.add('visible');
        }, 10);
        
        // Ocultar notificación después de 3 segundos
        setTimeout(() => {
            notificacion.classList.remove('visible');
            setTimeout(() => {
                document.body.removeChild(notificacion);
            }, 300);
        }, 3000);
    }
    
    // Función para animar el producto añadido al carrito
    function animarProductoAlCarrito(btnComprar, producto) {
        // Crear elemento para animar
        const imgProducto = document.createElement('img');
        imgProducto.src = producto.imagen;
        imgProducto.className = 'producto-animado';
        imgProducto.style.width = '50px';
        imgProducto.style.height = '50px';
        
        // Obtener posiciones
        const btnRect = btnComprar.getBoundingClientRect();
        const carritoRect = document.querySelector('.carrito-icono').getBoundingClientRect();
        
        // Posicionar el elemento
        imgProducto.style.position = 'fixed';
        imgProducto.style.top = `${btnRect.top}px`;
        imgProducto.style.left = `${btnRect.left}px`;
        imgProducto.style.zIndex = '9999';
        imgProducto.style.borderRadius = '50%';
        imgProducto.style.transition = 'all 0.8s ease-in-out';
        
        // Añadir al DOM
        document.body.appendChild(imgProducto);
        
        // Animar
        setTimeout(() => {
            imgProducto.style.top = `${carritoRect.top + carritoRect.height/2 - 25}px`;
            imgProducto.style.left = `${carritoRect.left + carritoRect.width/2 - 25}px`;
            imgProducto.style.opacity = '0.5';
            imgProducto.style.transform = 'scale(0.3)';
        }, 10);
        
        // Eliminar después de la animación
        setTimeout(() => {
            document.body.removeChild(imgProducto);
        }, 800);
        
        // Animar el icono del carrito
        const iconoCarrito = document.querySelector('.carrito-icono');
        iconoCarrito.classList.add('bump');
        setTimeout(() => {
            iconoCarrito.classList.remove('bump');
        }, 300);
    }
    
    // Añadir estilos para el carrito
    const estilosCarrito = document.createElement('style');
    estilosCarrito.innerHTML = `
        .carrito-icono {
            position: absolute;
            top: 1.5rem;
            right: 1.5rem;
            font-size: 1.5rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.3s ease;
        }
        
        .carrito-icono:hover {
            transform: scale(1.1);
        }
        
        .contador-carrito {
            position: absolute;
            top: -8px;
            right: -8px;
            background-color: var(--deep-purple-accent);
            color: white;
            font-size: 0.7rem;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        }
        
        .carrito-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        
        .carrito-modal.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .carrito-contenido {
            background-color: white;
            border-radius: 8px;
            width: 90%;
            max-width: 600px;
            max-height: 90vh;
            display: flex;
            flex-direction: column;
            transform: translateY(20px);
            transition: transform 0.3s ease;
            overflow: hidden;
        }
        
        .carrito-modal.visible .carrito-contenido {
            transform: translateY(0);
        }
        
        .carrito-header {
            padding: 1rem 1.5rem;
            background-color: var(--deep-purple-primary);
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .carrito-header h3 {
            margin: 0;
            color: white;
        }
        
        .cerrar-carrito {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        
        .cerrar-carrito:hover {
            transform: scale(1.2);
        }
        
        .carrito-items {
            padding: 1.5rem;
            overflow-y: auto;
            max-height: 50vh;
        }
        
        .carrito-item {
            display: flex;
            margin-bottom: 1rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid var(--divider-color);
            position: relative;
            animation: fadeIn 0.5s ease;
        }
        
        .carrito-item img {
            width: 60px;
            height: 60px;
            object-fit: cover;
            margin-right: 1rem;
        }
        
        .item-detalles {
            flex-grow: 1;
        }
        
        .item-detalles h4 {
            margin: 0 0 0.5rem 0;
            font-size: 1rem;
        }
        
        .item-precio {
            color: var(--deep-purple-primary);
            font-weight: bold;
            margin: 0.3rem 0;
        }
        
        .item-cantidad {
            display: flex;
            align-items: center;
            margin-top: 0.5rem;
        }
        
        .cantidad-btn {
            background-color: var(--deep-purple-light);
            color: var(--deep-purple-dark);
            border: none;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        
        .cantidad-btn:hover {
            background-color: var(--deep-purple-primary);
            color: white;
        }
        
        .item-cantidad span {
            margin: 0 0.5rem;
            min-width: 20px;
            text-align: center;
        }
        
        .eliminar-item {
            background: none;
            border: none;
            color: #f44336;
            font-size: 1.2rem;
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        
        .eliminar-item:hover {
            transform: scale(1.2);
        }
        
        .carrito-vacio {
            text-align: center;
            color: var(--text-medium);
            font-style: italic;
        }
        
        .carrito-footer {
            padding: 1rem 1.5rem;
            background-color: #f9f9f9;
            border-top: 1px solid var(--divider-color);
        }
        
        .carrito-total {
            font-size: 1.2rem;
            font-weight: bold;
            margin-bottom: 1rem;
            text-align: right;
        }
        
        .carrito-total span {
            color: var(--deep-purple-primary);
        }
        
        .notificacion {
            position: fixed;
            bottom: 20px;
            left: 20px;
            background-color: var(--deep-purple-primary);
            color: white;
            padding: 1rem;
            border-radius: 4px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .notificacion.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .loading-compra {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 2100;
            color: white;
        }
        
        .spinner {
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top: 4px solid white;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin-bottom: 1rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .confirmacion-compra {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2100;
        }
        
        .confirmacion-contenido {
            background-color: white;
            border-radius: 8px;
            padding: 2rem;
            text-align: center;
            max-width: 400px;
            animation: zoomIn 0.5s ease;
        }
        
        .check-icon {
            color: #4CAF50;
            font-size: 3rem;
            margin-bottom: 1rem;
            animation: checkmark 0.8s ease;
        }
        
        @keyframes zoomIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes checkmark {
            0% { transform: scale(0); opacity: 0; }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); opacity: 1; }
        }
        
        .bump {
            animation: bump 0.3s ease;
        }
        
        @keyframes bump {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
        
        body.modal-abierto {
            overflow: hidden;
        }
        
        body.dark-theme .carrito-contenido {
            background-color: #383838;
        }
        
        body.dark-theme .carrito-footer {
            background-color: #2c2c2c;
        }
        
        body.dark-theme .carrito-item {
            border-bottom-color: #555;
        }
        
        body.dark-theme .confirmacion-contenido {
            background-color: #383838;
            color: white;
        }
    `;
    document.head.appendChild(estilosCarrito);
    
    // Añadir animaciones adicionales para los productos
    const productosAnimation = document.querySelectorAll('.producto');
    if (productosAnimation.length > 0) {
        let delay = 0;
        productosAnimation.forEach(producto => {
            producto.style.opacity = '0';
            producto.style.transform = 'translateY(20px)';
            producto.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            producto.style.transitionDelay = `${delay}s`;
            
            setTimeout(() => {
                producto.style.opacity = '1';
                producto.style.transform = 'translateY(0)';
            }, 100);
            
            delay += 0.1;
        });
    }
});

// Preloader y efectos de aparición
document.addEventListener('DOMContentLoaded', function() {
    // Crear preloader
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(preloader);
    
    // Ocultar preloader después de que la página cargue
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('fade-out');
            setTimeout(function() {
                document.body.removeChild(preloader);
            }, 500);
        }, 800);
    });
    
    // Detectar elementos para animación de aparición
    const elementsToAnimate = document.querySelectorAll('.beneficio-card, .producto, .faq, .ingrediente');
    
    if ('IntersectionObserver' in window) {
        const appearObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear-animation', 'visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {threshold: 0.1});
        
        elementsToAnimate.forEach(element => {
            element.classList.add('appear-animation');
            appearObserver.observe(element);
        });
    } else {
        // Fallback para navegadores que no soportan IntersectionObserver
        elementsToAnimate.forEach(element => {
            element.classList.add('appear-animation', 'visible');
        });
    }
    
    // Aplicar clases de animación a elementos específicos
    document.querySelectorAll('.producto-card img').forEach(img => {
        img.parentElement.classList.add('img-hover-zoom');
    });
    
    document.querySelectorAll('.social-links a').forEach(link => {
        link.classList.add('shake-on-hover');
    });
    
    document.querySelectorAll('.btn').forEach(btn => {
        btn.classList.add('btn-pop');
    });
    
    // Añadir efecto de resaltado a tarjetas
    document.querySelectorAll('.producto, .beneficio-card').forEach(card => {
        card.classList.add('highlight-on-hover');
    });
}); 