# ALERTASEGURA BAYUNCA

**Documentación técnica del proyecto**

Proyecto académico · Cartagena de Indias, Colombia  
Asignatura: Aplicaciones Web  
Grupo 3  
Docente: Maybelline Castro  
Fecha de entrega: 23 de noviembre de 2026

**Integrantes:**
- José Romero
- Breiner Castro
- Mateo Castro
- Juan del Toro
- Edinson Noriega

## 1. Descripción general

AlertaSegura Bayunca es un prototipo de aplicación web diseñado para apoyar la comunicación y la prevención vecinal en Bayunca, Cartagena de Indias. Su propósito es ofrecer un espacio donde los habitantes puedan registrar situaciones relevantes para la comunidad y consultar los reportes disponibles.

La plataforma cuenta con tres secciones principales: Inicio, Consultar reportes y Crear reporte. Se plantea como una herramienta de comunicación comunitaria y no como un servicio oficial de atención de emergencias.

## 2. Objetivos y alcance

**Objetivo general:**

Desarrollar un prototipo web que facilite el registro y la consulta de reportes vecinales relacionados con situaciones de interés comunitario en Bayunca.

**Alcance funcional:**
- Navegación entre las diferentes secciones.
- Registro de reportes mediante formularios.
- Validación básica de los campos.
- Búsqueda por título, sector y descripción.
- Filtrado de reportes por categoría.
- Presentación de recomendaciones para el uso responsable de la plataforma.

## 3. Tecnologías utilizadas

- **HTML:** estructura de las páginas, formularios y elementos de navegación.
- **CSS:** diseño visual, colores, distribución, tarjetas y adaptación a diferentes pantallas.
- **JavaScript:** navegación, validación de datos, registro de reportes, búsquedas y filtros.
- **MySQL:** tecnología propuesta para el almacenamiento permanente de los reportes.

## 4. Funcionamiento de la aplicación

### 4.1 Inicio

Presenta el nombre AlertaSegura Bayunca, explica el propósito de la plataforma y ofrece accesos para crear o consultar reportes. También incluye recomendaciones de seguridad y el acceso telefónico al 123 para emergencias.

### 4.2 Crear reporte

El formulario permite registrar:
- Título.
- Categoría.
- Sector o ubicación aproximada.
- Descripción.

Los campos son obligatorios. El sistema valida que el título tenga al menos cinco caracteres y que la descripción tenga al menos diez caracteres antes de registrar la información.

### 4.3 Consultar reportes

Permite buscar reportes por palabras relacionadas con el título, sector o descripción, además de filtrar por categoría.

Las categorías contempladas son:
- Alumbrado público.
- Actividad sospechosa.
- Ruido.
- Otro.

Los resultados se presentan mediante tarjetas informativas.

## 5. Estructura de la base de datos SQL

El proyecto contempla un archivo `database.sql` con una propuesta de base de datos llamada `alertasegura` y una tabla denominada `reportes`.

La estructura contempla los siguientes campos:
- Identificador del reporte.
- Título.
- Categoría.
- Sector.
- Descripción.
- Fecha de registro.

**Nota técnica:** disponer del archivo SQL no significa que la aplicación ya esté conectada a MySQL. Para lograr el almacenamiento permanente se requiere implementar y comprobar la conexión mediante un backend o API.

## 6. Instalación y ejecución

Para ejecutar el prototipo frontend:

1. Descargar los archivos del repositorio.
2. Guardar `índice.html`, `script.js` y `estilo.css` en una misma carpeta.
3. Verificar que la ruta del archivo CSS coincida con su nombre real.
4. Abrir `índice.html` en un navegador actualizado.
5. Probar la navegación y el registro de reportes.
6. Verificar las funciones de búsqueda y filtrado.

## 7. Pruebas funcionales recomendadas

| Prueba | Acción | Resultado esperado |
|---|---|---|
| Navegación | Entrar a las tres secciones. | Se muestra la sección seleccionada. |
| Validación | Enviar el formulario vacío. | Se solicita completar los campos. |
| Registro | Crear un reporte válido. | Se muestra una confirmación. |
| Búsqueda | Buscar por título o sector. | Se muestran coincidencias. |
| Filtro | Seleccionar una categoría. | Se muestran los reportes correspondientes. |
| Recarga | Registrar y recargar la página. | En la versión sin persistencia, el reporte puede perderse. |

## 8. Limitaciones y trabajos pendientes

- Los reportes de la versión frontend básica se almacenan temporalmente en memoria.
- Se requiere verificar la conexión entre el frontend y la base de datos MySQL.
- Es necesario comprobar que las rutas de los archivos estén correctamente configuradas.
- Se debe implementar y probar el almacenamiento permanente mediante el backend.
- El prototipo no envía notificaciones ni alertas reales.
- La plataforma no sustituye los servicios oficiales de emergencia.

## 9. Conclusiones

AlertaSegura Bayunca representa una propuesta tecnológica orientada a fortalecer la comunicación y la prevención vecinal mediante una aplicación web.

El prototipo permite demostrar funciones de navegación, registro, validación, búsqueda y consulta de reportes. Además, establece una base para futuras mejoras relacionadas con el almacenamiento permanente y la integración con servicios backend.

El desarrollo demuestra cómo las tecnologías web pueden contribuir a la organización de información de interés comunitario y al fortalecimiento de la participación ciudadana.
