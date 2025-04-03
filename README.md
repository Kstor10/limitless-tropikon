# Limitless Tropik-on

Limitless Tropik-on es un sitio web dedicado a promocionar y vender suplementos nootrópicos para mejorar el rendimiento cognitivo. El proyecto se ha desarrollado como parte de la asignatura Lenguaje de Marcas para el grado de Desarrollo de Aplicaciones Multiplataforma (DAM).

## Demo en vivo

Puedes ver la versión en vivo del sitio en: [https://Kstor10.github.io/limitless-tropikon](https://Kstor10.github.io/limitless-tropikon)

## Estructura del sitio

El sitio web cuenta con 4 páginas principales:

1. **Inicio (index.html)**: Página principal con información destacada sobre el producto y sus beneficios.
2. **Productos (productos.html)**: Catálogo de productos disponibles con descripciones, ingredientes y detalles.
3. **Información (informacion.html)**: Datos relevantes sobre los nootrópicos, su historia, beneficios y estudios científicos.
4. **Contacto (contacto.html)**: Formulario para que los usuarios puedan contactar con la empresa.

## Funcionalidades implementadas

- **Diseño responsivo**: El sitio se adapta a diferentes tamaños de pantalla.
- **Formulario de contacto**: Con validación utilizando JavaScript.
- **Filtrado de productos**: Permite filtrar productos por categoría.
- **Carrito de compra**: Simulación de carrito de compra con todas las funcionalidades:
  - Añadir productos al carrito
  - Cambiar cantidades de productos
  - Eliminar productos del carrito
  - Visualizar total
  - Proceso de compra simulado
- **Animaciones y transiciones**: 
  - Efectos de hover en elementos interactivos
  - Transiciones suaves entre estados
  - Animación de productos añadidos al carrito
  - Aparición progresiva de elementos en scroll
- **Preloader**: Indicador de carga mientras se cargan los recursos de la página.
- **Notificaciones**: Sistema de alertas para acciones como añadir productos al carrito.

## Estructura de archivos

- **HTML**: Páginas principales del sitio
  - `index.html`: Página principal/inicio
  - `productos.html`: Catálogo de productos
  - `informacion.html`: Información sobre nootrópicos
  - `contacto.html`: Formulario de contacto

- **CSS**: Estilos del sitio
  - `css/styles.css`: Contiene todos los estilos, variables de color, clases utilitarias y animaciones

- **JavaScript**: Funcionalidades interactivas
  - `js/script.js`: Contiene toda la lógica para:
    - Validación del formulario
    - Filtrado de productos
    - Funcionalidad del carrito
    - Animaciones y efectos visuales
    - Preloader y efectos de aparición

- **Imágenes**: Recursos gráficos
  - `img/`: Directorio con todas las imágenes del sitio:
    - Logo e iconos
    - Imágenes de productos
    - Ilustraciones para la sección de información

## Tecnologías utilizadas

- **HTML5**: Estructura y contenido semántico
- **CSS3**: 
  - Diseño responsive con Grid y Flexbox
  - Variables CSS para gestión de colores
  - Animaciones y transiciones
  - Media queries para diferentes dispositivos
- **JavaScript**: 
  - Manipulación del DOM
  - Gestión de eventos
  - Almacenamiento local (localStorage)
  - Validación de formularios
  - Intersection Observer para animaciones de scroll
- **Git**: Control de versiones
- **GitHub Pages**: Alojamiento del sitio web

## Instalación y uso local

1. Clona el repositorio:
   ```
   git clone https://github.com/Kstor10/limitless-tropikon.git
   ```
2. Navega a la carpeta del proyecto:
   ```
   cd limitless-tropikon
   ```
3. Abre cualquiera de los archivos HTML en tu navegador preferido o utiliza un servidor local como Live Server en VS Code.

## Versiones y desarrollo

El proyecto ha seguido un desarrollo incremental, con las siguientes versiones:
- **v1.0**: Estructura HTML básica y creación del repositorio
- **v1.1**: Implementación de estilos CSS y mejora visual
- **v1.2**: Corrección de rutas de imágenes y ajustes de diseño
- **v1.3**: Implementación de formulario con validación
- **v1.4**: Sistema de filtrado de productos
- **v1.5**: Implementación del carrito de compra y animaciones avanzadas

## Características futuras

Funcionalidades planeadas para futuras versiones:
- Sistema de reseñas y valoraciones de productos
- Integración con un sistema de pagos
- Calculadora de dosis personalizada
- Blog con artículos sobre nootrópicos

## Autor

Desarrollado para la asignatura Lenguaje de Marcas - Desarrollo de Aplicaciones Multiplataforma (DAM). 