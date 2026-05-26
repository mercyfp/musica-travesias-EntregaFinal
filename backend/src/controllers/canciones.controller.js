const Cancion = require('../models/Cancion');

const subirCancion = async (req, res) => {
  try {
    if (!req.usuario) {
      req.usuario = { id: '12345_admin_temp', nombre: 'Administrador Local' };
    }

    const { titulo, artista, genero } = req.body;

    if (!req.files || !req.files['audio']) {
      return res.status(400).json({ error: 'El archivo de audio (.mp3) es obligatorio' });
    }

    const audioBuffer = req.files['audio'][0].buffer;
    const audioMime = req.files['audio'][0].mimetype;
    const audioBase64 = audioBuffer.toString('base64');
    const audioDataUrl = `data:${audioMime};base64,${audioBase64}`;

    let portadaDataUrl = null;
    let portadaMime = null;
    if (req.files['portada']) {
      portadaMime = req.files['portada'][0].mimetype;
      const portadaBase64 = req.files['portada'][0].buffer.toString('base64');
      portadaDataUrl = `data:${portadaMime};base64,${portadaBase64}`;
    }

    const nuevaCancion = new Cancion({
      titulo,
      artista,
      genero,
      archivo_url: audioDataUrl,
      archivo_mimetype: audioMime,
      portada_url: portadaDataUrl,
      portada_mimetype: portadaMime,
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

const getCanciones = async (req, res) => {
  try {
    const canciones = await Cancion.find().sort({ createdAt: -1 });
    res.status(200).json(canciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el catálogo de canciones' });
  }
};

const getPopulares = async (req, res) => {
  try {
    const populares = await Cancion.find().sort({ megusta: -1 }).limit(10);
    res.status(200).json(populares);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las canciones populares' });
  }
};

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