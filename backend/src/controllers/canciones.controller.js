const Cancion = require('../models/Cancion');
const musicMetadata = require('music-metadata');
const fs = require('fs').promises;
const path = require('path');


// 1. Subir una nueva canción
const subirCancion = async (req, res) => {
  try {
    // --- LÓGICA TEMPORAL PARA PRUEBAS (Evita el error de req.usuario undefined) ---
    if (!req.usuario) {
      req.usuario = { 
        id: '12345_admin_temp', 
        nombre: 'Administrador Local' 
      };
    }
    // -----------------------------------------------------------------------------

    const { titulo, artista, genero } = req.body;

    if (!req.files || !req.files['audio']) {
      return res.status(400).json({ error: 'El archivo de audio (.mp3) es obligatorio' });
    }

    const archivoUrl = `/uploads/audio/${req.files['audio'][0].filename}`;
    let portadaUrl = null;
    if (req.files['portada']) {
      portadaUrl = `/uploads/portadas/${req.files['portada'][0].filename}`;
    }
    // NUEVO: Si no subió portada, intentamos extraerla automáticamente del archivo MP3
    else {
      try {
        const audioPath = req.files['audio'][0].path; // Ruta física del archivo guardado por Multer
        const metadata = await musicMetadata.parseFile(audioPath);
        const fotoIncrustada = metadata.common.picture?.[0];

        if (fotoIncrustada) {
          const nombreImagen = `portada-automatica-${Date.now()}.jpg`;
          
          // CORRECCIÓN DE RUTA: Subimos un nivel antes de entrar a 'uploads'
          const rutaFisicaImagen = path.join(__dirname, '../../uploads/portadas', nombreImagen);
          
          // SEGURIDAD: Esto crea la carpeta 'uploads/portadas' si no existe en el disco
          await fs.mkdir(path.dirname(rutaFisicaImagen), { recursive: true });
          
          // Guardamos el buffer binario de la imagen extraída
          await fs.writeFile(rutaFisicaImagen, fotoIncrustada.data);
          
          // Asignamos la URL para guardarla en MongoDB (esta se queda igual)
          portadaUrl = `/uploads/portadas/${nombreImagen}`;
        }
      } catch (errorMetadata) {
        // CAMBIA ESTA LÍNEA para ver el error real en la terminal de VS Code:
        console.error('--- ERROR EXTRAYENDO METADATOS ---:', errorMetadata);
      }
    }

    const nuevaCancion = new Cancion({
      titulo,
      artista,
      genero,
      archivo_url: archivoUrl,
      portada_url: portadaUrl,
      subido_por_id: req.usuario.id, 
      subido_por_nombre: req.usuario.nombre 
    });

    await nuevaCancion.save();

    res.status(201).json({
      mensaje: 'Canción subida exitosamente a Travesías',
      cancion: nuevaCancion
    });
  } catch (error) {
    console.error('Error en subirCancion:', error);
    res.status(500).json({ error: 'Hubo un error al subir la canción' });
  }
};

// 2. Obtener TODAS las canciones (Catálogo)
const getCanciones = async (req, res) => {
  try {
    const canciones = await Cancion.find().sort({ createdAt: -1 });
    res.status(200).json(canciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el catálogo de canciones' });
  }
};

// 3. Obtener el Top 10 (Populares)
const getPopulares = async (req, res) => {
  try {
    const populares = await Cancion.find().sort({ megusta: -1 }).limit(10);
    res.status(200).json(populares);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las canciones populares' });
  }
};

// 4. Sumar un "Me gusta" a una canción
const darMeGusta = async (req, res) => {
  try {
    const { id } = req.params;
    const cancionActualizada = await Cancion.findByIdAndUpdate(
      id,
      { $inc: { megusta: 1 } },
      { new: true }
    );

    if (!cancionActualizada) {
      return res.status(404).json({ error: 'Canción no encontrada' });
    }

    res.status(200).json({ 
      mensaje: '¡Voto registrado!', 
      megusta_totales: cancionActualizada.megusta 
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el me gusta' });
  }
};

module.exports = { subirCancion, getCanciones, getPopulares, darMeGusta };