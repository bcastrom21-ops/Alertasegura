# AlertaSegura Cartagena - Bayunca | Cuarta Entrega

Proyecto universitario desarrollado para cumplir con los tres entregables exigidos en la **Cuarta Entrega**:

---

## Cumplimiento de Requisitos de la Cuarta Entrega

### 1. Base de datos MySQL (`database/script.sql`)
* Base de datos relacional `alertasegura_db` implementada en MySQL.
* Contiene tres tablas normalizadas y relacionadas mediante llaves foráneas (`FOREIGN KEY`):
  * **`usuarios`**: Almacena los vecinos y administradores (`id_usuario`, `correo`, `password_hash`, `rol`, `sector`).
  * **`reportes`**: Registra los incidentes comunitarios (`id_reporte`, `id_usuario`, `categoria`, `descripcion`, `sector_ubicacion`, `estado`).
  * **`contactos`**: Directorio de instituciones y autoridades de apoyo (`id_contacto`, `nombre_institucion`, `telefono_canal`, `tipo_servicio`).

### 2. CRUD e integración Frontend-Backend (`backend/` y `frontend/`)
* **Backend (API REST con Node.js + Express + MySQL2):**
  * **Create (`POST /api/reportes`):** Crea un nuevo reporte en MySQL desde el formulario del vecino.
  * **Read (`GET /api/reportes`):** Consulta los reportes almacenados y permite filtrarlos por sector o categoría.
  * **Update (`PUT /api/reportes/:id`):** Permite al administrador cambiar el estado del reporte (`pendiente`, `revisado`, `oculto`).
  * **Delete (`DELETE /api/reportes/:id`):** Elimina un reporte de la base de datos.
* **Frontend (`frontend/index.html` + `frontend/js/app.js`):**
  * Consume los endpoints del servidor mediante `fetch()` en tiempo real, separando la vista del **Panel Vecino** y el **Panel Administración**.

### 3. Regla de negocio implementada (`backend/controllers/reportesController.js`)
* **Validación de calidad y anti-spam de reportes:** El sistema valida en el servidor antes de ejecutar cualquier inserción en MySQL que:
  1. La categoría y el sector de Bayunca estén diligenciados obligatoriamente.
  2. La descripción del incidente contenga **mínimo 10 caracteres**; de lo contrario, el servidor rechaza la petición (HTTP 400) y notifica al usuario.

---

## Estructura de Carpetas del Repositorio

```text
alertasegura-bayunca/
├── database/
│   └── script.sql                   # 1. Base de datos MySQL
├── backend/                         # 2. Servidor API REST (CRUD + Regla de Negocio)
│   ├── config/
│   │   └── db.js                    # Conexión a MySQL
│   ├── controllers/
│   │   └── reportesController.js    # CRUD completo y Regla de Negocio
│   ├── routes/
│   │   └── reportesRoutes.js        # Endpoints REST
│   ├── package.json                 # Dependencias Node.js
│   └── server.js                    # Punto de entrada del servidor
├── frontend/                        # 2. Interfaz Cliente integrada con el Backend
│   ├── css/
│   │   └── styles.css               # Estilos visuales
│   ├── js/
│   │   └── app.js                   # Peticiones fetch al CRUD
│   └── index.html                   # Vistas de Vecino y Administración
├── .gitignore
└── README.md                        # Documentación de la Cuarta Entrega
```

---

## Guía de Ejecución Local

1. **Base de datos MySQL:** Abre **phpMyAdmin**, importa o ejecuta el archivo `database/script.sql`.
2. **Servidor Backend:** Abre una terminal en la carpeta `backend/` y ejecuta:
   ```bash
   npm install
   npm start
   ```
3. **Frontend:** Abre el archivo `frontend/index.html` en tu navegador web.
