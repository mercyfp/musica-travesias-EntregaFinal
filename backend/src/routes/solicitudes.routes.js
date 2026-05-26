const express = require('express');
const router = express.Router();
const { getSolicitudes, crearSolicitud, actualizarEstado } = require('../controllers/solicitudes.controller');

// El :id es fundamental para que findByIdAndUpdate funcione
router.get('/', getSolicitudes);
router.post('/', crearSolicitud);
router.put('/:id', actualizarEstado); // VERIFICA ESTA LÍNEA

module.exports = router;