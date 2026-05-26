const mongoose = require('mongoose');

const conectarDB = async () => {
  try {
    // La URI la traeremos de tu archivo .env
    const conexion = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`✅ MongoDB Conectado: ${conexion.connection.name}`);
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:', error.message);
    // Si falla la conexión, el servidor se detiene para evitar errores mayores
    process.exit(1);
  }
};

module.exports = conectarDB;