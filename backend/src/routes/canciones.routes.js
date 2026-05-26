const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const verificarToken = require('../middleware/auth');
const Cancion = require('../models/Cancion');
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

// --- RUTA PARA SERVIR AUDIO ---
router.get('/:id/audio', async (req, res) => {
  try {
    const cancion = await Cancion.findById(req.params.id);
    if (!cancion || !cancion.archivo_url) {
      return res.status(404).json({ error: 'Audio no encontrado' });
    }
    const base64Data = cancion.archivo_url.replace(/^data:audio\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    res.set('Content-Type', 'audio/mpeg');
    res.set('Accept-Ranges', 'bytes');
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el audio' });
  }
});

// --- RUTA PARA SERVIR PORTADA ---
router.get('/:id/portada', async (req, res) => {
  try {
    const cancion = await Cancion.findById(req.params.id);
    if (!cancion || !cancion.portada_url) {
      return res.status(404).json({ error: 'Portada no encontrada' });
    }
    const matches = cancion.portada_url.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    if (!matches) return res.status(400).json({ error: 'Formato inválido' });
    const buffer = Buffer.from(matches[2], 'base64');
    res.set('Content-Type', matches[1]);
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la portada' });
  }
});


// --- RUTAS PROTEGIDAS (Sí requieren Token) ---
router.post('/', upload.fields([
  { name: 'audio', maxCount: 1 },
  { name: 'portada', maxCount: 1 }
]), subirCancion);

module.exports = router;