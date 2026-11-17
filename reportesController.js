// ============================================================================
// REQUISITO 2: CRUD E INTEGRACIÓN FRONTEND-BACKEND
// REQUISITO 3: REGLA DE NEGOCIO IMPLEMENTADA
// ============================================================================

const db = require('../config/db');

// [CRUD - READ] Leer y filtrar reportes
exports.obtenerReportes = (req, res) => {
    const { filtro } = req.query;
    let query = "SELECT * FROM reportes ORDER BY id_reporte DESC";
    let params = [];

    if (filtro) {
        query = "SELECT * FROM reportes WHERE sector_ubicacion LIKE ? OR categoria LIKE ? ORDER BY id_reporte DESC";
        params = [`%${filtro}%`, `%${filtro}%`];
    }

    db.query(query, params, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// [CRUD - CREATE] Crear reporte + [REGLA DE NEGOCIO]
exports.crearReporte = (req, res) => {
    const { id_usuario, categoria, descripcion, sector_ubicacion } = req.body;

    // ------------------------------------------------------------------------
    // REGLA DE NEGOCIO IMPLEMENTADA:
    // 1. Todo reporte debe especificar categoría y sector de Bayunca.
    // 2. La descripción debe contener mínimo 10 caracteres para evitar spam
    //    o reportes incompletos en la comunidad.
    // ------------------------------------------------------------------------
    if (!categoria || !sector_ubicacion) {
        return res.status(400).json({
            error: "Regla de negocio: La categoría y el sector de ubicación son obligatorios."
        });
    }

    if (!descripcion || descripcion.trim().length < 10) {
        return res.status(400).json({
            error: "Regla de negocio: La descripción del incidente debe tener mínimo 10 caracteres."
        });
    }

    const query = "INSERT INTO reportes (id_usuario, categoria, descripcion, sector_ubicacion, estado) VALUES (?, ?, ?, ?, 'pendiente')";
    db.query(query, [id_usuario || 1, categoria.trim(), descripcion.trim(), sector_ubicacion.trim()], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({
            message: "Reporte creado exitosamente",
            id_reporte: result.insertId
        });
    });
};

// [CRUD - UPDATE] Actualizar estado del reporte (Panel de Administración)
exports.actualizarEstado = (req, res) => {
    const { estado } = req.body;
    const { id } = req.params;
    const estadosValidos = ['pendiente', 'revisado', 'oculto'];

    if (!estadosValidos.includes(estado)) {
        return res.status(400).json({ error: "Estado no válido." });
    }

    const query = "UPDATE reportes SET estado = ? WHERE id_reporte = ?";
    db.query(query, [estado, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: `Reporte #${id} actualizado a estado: ${estado}` });
    });
};

// [CRUD - DELETE] Eliminar reporte
exports.eliminarReporte = (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM reportes WHERE id_reporte = ?";
    db.query(query, [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: `Reporte #${id} eliminado correctamente` });
    });
};
