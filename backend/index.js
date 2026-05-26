require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path'); // Importante para manejar rutas de archivos
const conectarDB = require('./src/config/db');

const app = express();
const PORT = process.env.PORT || 3006;

// 1. Conexión a MongoDB (Base de datos: db_musica)
conectarDB();

// 2. Middlewares Globales
app.use(cors());
app.use(express.json());

// 3. Servir archivos estáticos (MP3 y Portadas)
// Usamos path.join para asegurar que encuentre la carpeta sin importar desde donde se ejecute el servidor
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 4. Ruta de salud (Health Check)
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    servicio: 'musica-travesias',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// 5. Registro de Rutas
// Asegúrate de que los archivos en ./src/routes/ existan con estos nombres exactos
app.use('/api/canciones', require('./src/routes/canciones.routes'));
app.use('/api/solicitudes', require('./src/routes/solicitudes.routes'));

// 6. Manejo de errores para rutas no encontradas (Esto evitará el 404 silencioso)
app.use((req, res) => {
  res.status(404).json({ error: `La ruta ${req.originalUrl} no existe en este servidor.` });
});

// 7. Inicio del Servidor
app.listen(PORT, () => {
  console.log(`\n=================================================`);
  console.log(`🚀 Servidor de Música Travesías listo`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`📂 Archivos: http://localhost:${PORT}/uploads/`);
  console.log(`=================================================\n`);
});