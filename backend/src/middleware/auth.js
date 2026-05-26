const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  // El frontend nos enviará el token en la cabecera 'Authorization'
  const authHeader = req.headers['authorization'];
  
  // El formato suele ser "Bearer eyJhbGci..." así que lo separamos para sacar solo el token
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. Se requiere un token JWT.' });
  }

  try {
    // Desencriptamos el token usando la clave de tu archivo .env
    const decodificado = jwt.verify(token, process.env.JWT_SECRET);
    
    // Guardamos los datos del habitante en la petición (req.usuario) 
    // para que el controlador pueda saber quién es
    req.usuario = decodificado;
    
    next(); // Todo está bien, lo dejamos pasar al controlador
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido o ha expirado.' });
  }
};

module.exports = verificarToken;