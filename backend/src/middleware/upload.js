const multer = require('multer');
const path = require('path');

// 1. Configurar dónde y con qué nombre se guardan los archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Si es la canción, va a la carpeta de audio
    if (file.fieldname === 'audio') {
      cb(null, 'uploads/audio/');
    } 
    // Si es la imagen, va a portadas
    else if (file.fieldname === 'portada') {
      cb(null, 'uploads/portadas/');
    }
  },
  filename: (req, file, cb) => {
    // Generamos un nombre único: timestamp + extensión original (.mp3, .jpg, etc)
    const nombreUnico = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, nombreUnico + path.extname(file.originalname));
  }
});

// 2. Filtro de seguridad (Solo MP3 e Imágenes)
const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'audio') {
    if (file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/mp3') {
      cb(null, true); // Aceptar archivo
    } else {
      cb(new Error('Formato inválido. Solo se permiten archivos MP3.'), false);
    }
  } else if (file.fieldname === 'portada') {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes para la portada.'), false);
    }
  }
};

// 3. Crear el middleware final con el límite de 20MB del Brief
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB en bytes
  fileFilter: fileFilter
});

module.exports = upload;