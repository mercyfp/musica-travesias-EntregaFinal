const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Asegurar que las carpetas existan
const audioDir = '/app/uploads/audio';
const portadasDir = '/app/uploads/portadas';
fs.mkdirSync(audioDir, { recursive: true });
fs.mkdirSync(portadasDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'audio') {
      cb(null, audioDir);
    } else if (file.fieldname === 'portada') {
      cb(null, portadasDir);
    }
  },
  filename: (req, file, cb) => {
    const nombreUnico = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, nombreUnico + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'audio') {
    if (file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/mp3') {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos MP3.'), false);
    }
  } else if (file.fieldname === 'portada') {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes para la portada.'), false);
    }
  }
};

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: fileFilter
});

module.exports = upload;