const Solicitud = require('../models/Solicitud');

// 1. Crear una solicitud (POST)
const crearSolicitud = async (req, res) => {
  try {
    const { nombre_cancion, artista_sugerido } = req.body;

    if (!nombre_cancion || !artista_sugerido) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const nuevaSolicitud = new Solicitud({
      nombre_cancion,
      artista_sugerido,
      estado: 'Pendiente' // Estado inicial por defecto
    });

    await nuevaSolicitud.save();
    res.status(201).json(nuevaSolicitud);
  } catch (error) {
    console.error("Error al crear solicitud:", error);
    res.status(500).json({ error: 'Error al procesar la solicitud en el servidor' });
  }
};

// 2. Ver todas las solicitudes (GET)
const getSolicitudes = async (req, res) => {
  try {
    // Las traemos todas, de la más nueva a la más antigua
    const solicitudes = await Solicitud.find().sort({ createdAt: -1 });
    res.status(200).json(solicitudes);
  } catch (error) {
    console.error("Error al obtener solicitudes:", error);
    res.status(500).json({ error: 'No se pudieron cargar las solicitudes' });
  }
};

// 3. Actualizar estado (PUT) - EL MOTOR DEL ADMIN
const actualizarEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    // Validación de seguridad para que solo entren estados válidos
    const estadosValidos = ['Pendiente', 'Aceptada', 'Rechazada'];
    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({ error: 'Estado no válido' });
    }

    // Actualización directa en MongoDB
    const solicitudActualizada = await Solicitud.findByIdAndUpdate(
      id,
      { $set: { estado } }, // Usamos $set para ser específicos
      { new: true, runValidators: true } // new: true devuelve el objeto ya cambiado
    );

    if (!solicitudActualizada) {
      return res.status(404).json({ error: 'La solicitud no existe en la base de datos' });
    }

    console.log(`Solicitud ${id} actualizada a: ${estado}`);
    res.status(200).json(solicitudActualizada);
  } catch (error) {
    console.error("Error al actualizar estado en MongoDB:", error);
    res.status(500).json({ error: 'Error crítico al actualizar el estado' });
  }
};

module.exports = { crearSolicitud, getSolicitudes, actualizarEstado };