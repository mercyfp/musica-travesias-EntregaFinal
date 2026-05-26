const mongoose = require('mongoose');

const solicitudSchema = new mongoose.Schema({
  nombre_cancion: { type: String, required: true }, // Coincide con el frontend
  artista_sugerido: { type: String, required: true }, // Coincide con el frontend
  estado: { type: String, default: 'Pendiente' },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Solicitud', solicitudSchema);