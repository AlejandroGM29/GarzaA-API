/**
 * Módulo Express para manejar la autenticación y las rutas protegidas con JWT.
 * @module
 */

import express from "express";
import cors from "cors";
import jsonwebtoken from "jsonwebtoken";

/**
 * Instancia de la aplicación Express.
 * @type {express.Application}
 */
const app = express();

// Middleware para habilitar CORS y analizar datos JSON y URL codificados en las solicitudes
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * Maneja las solicitudes de inicio de sesión.
 * @function
 * @name POST /login
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @param {Function} next - Función de middleware siguiente.
 * @throws {Object} 401 - Si las credenciales son inválidas o no se proporcionan.
 * @returns {Object} Token JWT generado.
 */
app.post('/login', (req, res, next) => {
  // Simplemente imprime un mensaje en la consola (para propósitos de demostración)
  console.log("Solicitud de inicio de sesión recibida");

  // Firmar un token JWT utilizando la clave secreta y los datos del cuerpo de la solicitud
  var token = jsonwebtoken.sign(req.body, 'clavesecreta');

  // Imprimir el token generado en la consola (para propósitos de demostración)
  console.log(token);

  // Agregar el token como encabezado 'authorization' y también enviarlo en la respuesta
  res.header("authorization", token).json(token);
});

/**
 * Ruta protegida que requiere un token JWT válido para acceder.
 * @function
 * @name GET /sistema
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @param {Function} next - Función de middleware siguiente.
 * @throws {Object} 401 - Si el token de acceso es inválido o no se proporciona.
 * @returns {Object} Mensaje de acceso concedido al sistema.
 */
app.get("/sistema", validateToken, (req, res, next) => {
  res.json({
    message: "Acceso concedido al sistema"
  });
});

/**
 * Función de validación de token de acceso.
 * @function
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @param {Function} next - Función de middleware siguiente.
 * @throws {Object} 401 - Si el token de acceso es inválido o no se proporciona.
 */
function validateToken(req, res, next) {
  // Obtener el token de la cabecera de la solicitud
  const accessToken = req.headers["authorization"];

  // Verificar si el token existe
  if (!accessToken) {
    return res.status(401).json({
      message: "Acceso denegado",
      info: "Token de acceso no proporcionado",
    });
  }

  // Verificar la validez del token utilizando la clave secreta
  jsonwebtoken.verify(accessToken, 'clavesecreta', (accessTokenError, user) => {
    if (accessTokenError) {
      // Si el token no es válido, enviar una respuesta de error
      return res.status(401).json({
        message: "Acceso denegado",
        info: "Token de acceso inválido o expirado",
      });
    } else {
      // Si el token es válido, permitir el acceso a la siguiente capa
      next();
    }
  });
}

/**
 * Middleware para manejar rutas no encontradas.
 * @function
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @param {Function} next - Función de middleware siguiente.
 */
app.use((req, res, next) => {
  res.status(404).json({
    message: "Endpoint no encontrado",
  });
});

/**
 * Middleware para manejar errores.
 * @function
 * @param {Object} err - Objeto de error.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @param {Function} next - Función de middleware siguiente.
 */
app.use((err, req, res, next) => {
  console.error(err.message);

  // Establecer el código de estado HTTP del error
  res.status(err.status || 500);

  // Enviar el mensaje de error al cliente en formato JSON
  res.json({
    error: {
      message: err.message,
    },
  });
});

/**
 * Exporta la aplicación Express para su uso en otros archivos.
 * @exports app
 */
export default app;
