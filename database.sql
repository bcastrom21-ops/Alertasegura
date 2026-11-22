-- AlertaSegura Bayunca
-- Esquema inicial de base de datos para los reportes vecinales.
-- Nota: este script crea la estructura SQL; la aplicación HTML/JS compartida
-- todavía no está conectada a MySQL. Para persistencia real se requiere un backend
-- (por ejemplo, PHP) que consulte esta tabla.

CREATE DATABASE IF NOT EXISTS alertasegura
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE alertasegura;

CREATE TABLE IF NOT EXISTS reportes (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(80) NOT NULL,
    categoria ENUM(
        'Alumbrado público',
        'Actividad sospechosa',
        'Ruido',
        'Otro'
    ) NOT NULL,
    sector VARCHAR(100) NOT NULL,
    descripcion VARCHAR(600) NOT NULL,
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_reportes_categoria (categoria),
    INDEX idx_reportes_fecha (fecha_registro)
);

-- Consulta de verificación:
SELECT id, titulo, categoria, sector, descripcion, fecha_registro
FROM reportes
ORDER BY fecha_registro DESC;
