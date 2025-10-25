// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
require('dotenv').config(); // Para acceder a la variable de entorno

// Un middleware es simplemente una función con 3 argumentos:
// req (request), res (response), next (función para pasar al siguiente paso)
function authMiddleware(req, res, next) {

  // 1. Obtenemos el token de la cabecera (header) de la petición.
  // Lo enviaremos desde React/Postman bajo el nombre 'x-auth-token'
  const token = req.header('x-auth-token');

  // 2. Comprobamos si no hay token
  if (!token) {
    // 401 = No autorizado
    return res.status(401).json({ mensaje: 'No hay token, permiso denegado' });
  }

  // 3. Si hay token, lo verificamos
  try {
    // jwt.verify() descifra el token.
    // Si la firma no coincide o el token ha expirado, saltará un error (al 'catch').
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Si el token es válido, 'decoded' contiene el 'payload' que guardamos
    //    (recuerda: { usuario: { id: usuario._id } })
    //
    //    ¡IMPORTANTE! Añadimos esta información del usuario al objeto 'req'.
    //    Ahora, todas las rutas que vengan *después* de este middleware
    //    tendrán acceso a 'req.usuario'.
    req.usuario = decoded.usuario;

    // 5. Llamamos a next() para que la petición continúe
    //    hacia la ruta que el usuario quería (ej. crear nota).
    next();

  } catch (error) {
    // Esto se ejecuta si jwt.verify() falla
    res.status(401).json({ mensaje: 'El token no es válido' });
  }
}

module.exports = authMiddleware;