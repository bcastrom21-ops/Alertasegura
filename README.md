# AlertaSegura

Sistema de gestión de reportes vecinales que permite registrar y administrar situaciones que afectan a la comunidad.

## Tecnologías utilizadas

- HTML
- CSS
- JavaScript
- Node.js
- Express
- MySQL

## Funcionalidades implementadas

- Registro de reportes.
- Consulta de reportes.
- Actualización de reportes.
- Eliminación de reportes.
- Conexión del backend con MySQL.
- Asignación automática del cuadrante responsable según el sector.
- Estado inicial de los reportes: Pendiente.

## Estructura del proyecto

- `index.html`: interfaz principal.
- `style.css`: estilos de la aplicación.
- `script.js`: funcionalidades del frontend.
- `backend/`: servidor y lógica del backend.
- `backend/config/`: configuración de la conexión a MySQL.
- `backend/controllers/`: controladores de reportes.
- `backend/routes/`: rutas de la API.

## Ejecución del backend

Instalar las dependencias:

npm install

Iniciar el servidor:

npm run dev

El backend utiliza variables de entorno para configurar la conexión con MySQL.