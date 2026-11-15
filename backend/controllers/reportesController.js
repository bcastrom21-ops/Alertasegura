
const db = require('../config/database');

// CREATE: registrar reporte y asignar cuadrante automáticamente
exports.crearReporte = async (req, res) => {
    try {
        const { titulo, categoria, descripcion, sector_id } = req.body;

        if (!titulo || !categoria || !descripcion || !sector_id) {
            return res.status(400).json({
                mensaje: 'Todos los campos son obligatorios'
            });
        }

        // 1. Buscar el sector y su cuadrante responsable
        const [sectores] = await db.query(`
            SELECT
                s.id,
                s.nombre AS sector,
                c.nombre AS cuadrante,
                c.telefono_contacto
            FROM sectores s
            INNER JOIN cuadrantes c ON s.cuadrante_id = c.id
            WHERE s.id = ?
        `, [sector_id]);

        // 2. Validar que el sector exista
        if (sectores.length === 0) {
            return res.status(404).json({
                mensaje: 'El sector seleccionado no existe'
            });
        }

        const responsable = sectores[0];

        // 3. Registrar el reporte con estado Pendiente
        const [resultado] = await db.query(
            `INSERT INTO reportes
            (titulo, categoria, descripcion, estado, sector_id)
            VALUES (?, ?, ?, 'Pendiente', ?)`,
            [titulo, categoria, descripcion, sector_id]
        );

        // 4. Devolver la información del reporte y su cuadrante
        res.status(201).json({
            mensaje: 'Reporte registrado y asignado correctamente',
            reporte: {
                id: resultado.insertId,
                titulo,
                categoria,
                descripcion,
                estado: 'Pendiente',
                sector: responsable.sector,
                cuadrante: responsable.cuadrante,
                telefono_contacto: responsable.telefono_contacto
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al registrar el reporte'
        });
    }
};

// READ: obtener todos los reportes
exports.obtenerReportes = async (req, res) => {
    try {
        const [reportes] = await db.query(`
            SELECT
                r.*,
                s.nombre AS sector,
                c.nombre AS cuadrante,
                c.telefono_contacto
            FROM reportes r
            INNER JOIN sectores s ON r.sector_id = s.id
            INNER JOIN cuadrantes c ON s.cuadrante_id = c.id
            ORDER BY r.fecha_creacion DESC
        `);

        res.json(reportes);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al consultar los reportes'
        });
    }
};

// READ: obtener un reporte por ID
exports.obtenerReportePorId = async (req, res) => {
    try {
        const [reportes] = await db.query(`
            SELECT
                r.*,
                s.nombre AS sector,
                c.nombre AS cuadrante,
                c.telefono_contacto
            FROM reportes r
            INNER JOIN sectores s ON r.sector_id = s.id
            INNER JOIN cuadrantes c ON s.cuadrante_id = c.id
            WHERE r.id = ?
        `, [req.params.id]);

        if (reportes.length === 0) {
            return res.status(404).json({
                mensaje: 'Reporte no encontrado'
            });
        }

        res.json(reportes[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al consultar el reporte'
        });
    }
};

// UPDATE: actualizar reporte
exports.actualizarReporte = async (req, res) => {
    try {
        const { titulo, categoria, descripcion, estado, sector_id } = req.body;

        const estadosPermitidos = [
            'Pendiente',
            'En proceso',
            'Atendido',
            'Cerrado'
        ];

        if (
            !titulo ||
            !categoria ||
            !descripcion ||
            !sector_id ||
            !estadosPermitidos.includes(estado)
        ) {
            return res.status(400).json({
                mensaje: 'Datos del reporte inválidos'
            });
        }

        // Validar que el sector exista
        const [sectores] = await db.query(
            'SELECT id FROM sectores WHERE id = ?',
            [sector_id]
        );

        if (sectores.length === 0) {
            return res.status(404).json({
                mensaje: 'El sector seleccionado no existe'
            });
        }

        const [resultado] = await db.query(
            `UPDATE reportes
            SET titulo = ?, categoria = ?, descripcion = ?,
                estado = ?, sector_id = ?
            WHERE id = ?`,
            [
                titulo,
                categoria,
                descripcion,
                estado,
                sector_id,
                req.params.id
            ]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: 'Reporte no encontrado'
            });
        }

        res.json({
            mensaje: 'Reporte actualizado correctamente'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al actualizar el reporte'
        });
    }
};

// DELETE: eliminar reporte
exports.eliminarReporte = async (req, res) => {
    try {
        const [resultado] = await db.query(
            'DELETE FROM reportes WHERE id = ?',
            [req.params.id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: 'Reporte no encontrado'
            });
        }

        res.json({
            mensaje: 'Reporte eliminado correctamente'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al eliminar el reporte'
        });
    }
};
