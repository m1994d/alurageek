# AluraGeek - Ecommerce de Productos Geek

Bienvenido al proyecto **AluraGeek**, una página web que simula un ecommerce de productos geek. Los productos se pueden agregar dinámicamente mediante un formulario, y la información se guarda utilizando una API creada con `json-server` que simula una base de datos.

## Tecnologías Utilizadas

Este proyecto usa las siguientes tecnologías:

- **HTML**: Estructura y contenido básico de la página.
- **CSS**: Estilos visuales para la presentación, diseño y formato responsivo.
- **JavaScript**: Lógica de la página para cargar productos, agregar nuevos productos y eliminar productos, utilizando la API simulada de `json-server`.
- **JSON**: Utilizado como formato de almacenamiento para los productos dentro del archivo `db.json`, gestionado por el servidor `json-server`.

## Funcionamiento de la Página

La página tiene las siguientes funcionalidades:

1. **Cargar Productos**: Los productos se cargan desde un archivo `db.json` utilizando una API REST creada con `json-server`.
2. **Agregar Producto**: Los usuarios pueden agregar productos mediante un formulario. El producto se guarda en el archivo `db.json` y se muestra dinámicamente en la página.
3. **Eliminar Producto**: Los productos pueden ser eliminados desde la interfaz, lo que actualiza la vista en tiempo real.

### Proceso de Funcionamiento:

1. **Cargar Productos**: Los productos almacenados en el archivo `db.json` se muestran en tarjetas dentro de la página principal. Se hace una solicitud a la API para obtener la lista de productos y mostrarlos.
   
2. **Agregar Producto**: A través del formulario en la sección "Agregar productos", el usuario puede ingresar el nombre, precio e imagen del producto. Al presionar el botón "Agregar", el producto se guarda en el archivo `db.json` mediante una solicitud `POST` y se actualiza la vista.
   
3. **Eliminar Producto**: Cada tarjeta de producto tiene un botón para eliminarlo. Cuando el usuario hace clic en el botón de eliminación, se realiza una solicitud `DELETE` a la API para eliminar el producto de la base de datos, y la tarjeta correspondiente se elimina de la vista.

## Instalación y Uso

### Requisitos Previos

Para ejecutar este proyecto en tu máquina local, necesitas tener instalado lo siguiente:

- **Node.js**: Para ejecutar `json-server` y manejar dependencias de JavaScript.
- **json-server**: Para crear una API REST simulada.

### Instrucciones

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/tu_usuario/alurageek.git
   cd alurageek
