// Este middleware asume que el token JWT incluye un campo llamado "rol"
const verificarModerador = (req, res, next) => {
  if (!req.usuario) {
    return res.status(401).json({ error: 'No autenticado' });
  }

  // Verificamos si el rol es el adecuado
  if (req.usuario.rol === 'admin' || req.usuario.rol === 'moderador') {
    next(); // Lo dejamos pasar
  } else {
    return res.status(403).json({ 
      error: 'Acceso denegado. Solo los moderadores de Travesías pueden hacer esto.' 
    });
  }
};

module.exports = verificarModerador;