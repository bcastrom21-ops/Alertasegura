# AlertaSegura Bayunca

Aplicación web académica orientada a la comunicación y prevención vecinal en Bayunca, Cartagena de Indias, Colombia.

## Archivos principales
- `índice.html`: estructura y pantallas de la aplicación.
- `script.js`: navegación, validación del formulario, búsqueda, filtros y visualización de reportes.
- `estilo.css`: presentación visual y adaptación a dispositivos móviles.
- `database.sql`: esquema inicial propuesto para almacenar reportes en MySQL.

## Ejecución del prototipo actual
1. Descargue los archivos del repositorio en una misma carpeta.
2. Compruebe que el nombre del archivo CSS coincida con el enlace del HTML.
   En el HTML compartido aparece `style.css`, mientras que en el repositorio se observó `estilo.css`.
   Si el archivo se llama `estilo.css`, cambie el enlace del HTML a:
   `<link rel="stylesheet" href="estilo.css">`
3. Abra `índice.html` con un navegador web.

## Funciones presentes en el código compartido
- Navegación entre Inicio, Consultar reportes y Crear reporte.
- Formulario con validación básica.
- Búsqueda por texto y filtro por categoría.
- Visualización de reportes de ejemplo y reportes creados durante la sesión.

## Limitación técnica que debe tenerse en cuenta
La versión HTML/JavaScript compartida mantiene los reportes en una variable de memoria del navegador. Por ello, los reportes nuevos no quedan guardados al recargar o cerrar la página. El archivo `database.sql` crea una estructura MySQL, pero por sí solo no conecta la aplicación con la base de datos. Para almacenamiento permanente se necesita un backend/API y adaptar el JavaScript para enviar y consultar datos en el servidor.

## Categorías previstas
- Alumbrado público
- Actividad sospechosa
- Ruido
- Otro

## Alcance y seguridad
El prototipo no envía alertas reales ni sustituye los canales oficiales de emergencia. La propia interfaz recomienda llamar al 123 ante una emergencia.
