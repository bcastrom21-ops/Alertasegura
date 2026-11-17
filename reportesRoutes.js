const express = require('express');
const router = express.Router();
const reportesController = require('../controllers/reportesController');

router.get('/', reportesController.obtenerReportes);
router.post('/', reportesController.crearReporte);
router.put('/:id', reportesController.actualizarEstado);
router.delete('/:id', reportesController.eliminarReporte);

module.exports = router;
