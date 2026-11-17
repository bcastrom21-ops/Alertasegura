-- ============================================================================
-- REQUISITO 1: BASE DE DATOS MYSQL
-- Proyecto: AlertaSegura Cartagena - Bayunca
-- Archivo: database/script.sql
-- ============================================================================

CREATE DATABASE IF NOT EXISTS alertasegura_db;
USE alertasegura_db;

-- Tabla 1: Usuarios (Vecinos y Administradores)
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    correo VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    rol ENUM('vecino', 'admin') DEFAULT 'vecino',
    sector VARCHAR(100) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla 2: Reportes (Incidentes de seguridad ciudadana)
CREATE TABLE IF NOT EXISTS reportes (
    id_reporte INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    sector_ubicacion VARCHAR(100) NOT NULL,
    estado ENUM('pendiente', 'revisado', 'oculto') DEFAULT 'pendiente',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

-- Tabla 3: Contactos (Instituciones y autoridades de apoyo)
CREATE TABLE IF NOT EXISTS contactos (
    id_contacto INT AUTO_INCREMENT PRIMARY KEY,
    nombre_institucion VARCHAR(100) NOT NULL,
    telefono_canal VARCHAR(50) NOT NULL,
    tipo_servicio VARCHAR(100) NOT NULL
);

-- Registros iniciales para pruebas del sistema
INSERT IGNORE INTO usuarios (id_usuario, correo, password_hash, rol, sector) VALUES
(1, 'vecino@bayunca.com', '123456', 'vecino', 'Las Palmeras'),
(2, 'admin@bayunca.com', 'admin123', 'admin', 'Centro Bayunca');

INSERT IGNORE INTO contactos (nombre_institucion, telefono_canal, tipo_servicio) VALUES
('Estación de Policía Bayunca', '123 / 310-000-0000', 'Emergencias y Seguridad'),
('Frente de Seguridad Comunitario', '300-111-2222', 'Apoyo Vecinal');
