const mongoose = require('mongoose');

const cancionSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  artista: { type: String, required: true },
  genero: { type: String, required: true },
  archivo_url: { type: String, required: true },
  archivo_data: { type: String },
  archivo_mimetype: { type: String },
  portada_url: { type: String },
  portada_data: { type: String },
  portada_mimetype: { type: String },
  megusta: { type: Number, default: 0 },
  subido_por_id: { type: String, required: true },
  subido_por_nombre: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Cancion', cancionSchema);