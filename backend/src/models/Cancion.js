const mongoose = require('mongoose');

const cancionSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  artista: { type: String, required: true },
  genero: { type: String, required: true }, // <--- Añade esta línea
  archivo_url: { type: String, required: true },
  portada_url: { type: String },         // Opcional
  megusta: { type: Number, default: 0 },         // Contador para el Top 10
  subido_por_id: { type: String, required: true },
  subido_por_nombre: { type: String, required: true }
}, { 
  timestamps: true // Crea automáticamente 'createdAt' y 'updatedAt'
});

module.exports = mongoose.model('Cancion', cancionSchema);