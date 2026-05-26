const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const verificarToken = require('../middleware/auth');
const { 
  subirCancion, 
  getCanciones, 
  getPopulares, 
  darMeGusta 
} = require('../controllers/canciones.controller');

// --- RUTAS PÚBLICAS (No requieren Token) ---
router.get('/', getCanciones);
router.get('/populares', getPopulares);
router.put('/:id/megusta', darMeGusta);

// --- RUTAS PROTEGIDAS (Sí requieren Token) ---
router.post('/', upload.fields([
  { name: 'audio', maxCount: 1 },
  { name: 'portada', maxCount: 1 }
]), subirCancion);

module.exports = router;