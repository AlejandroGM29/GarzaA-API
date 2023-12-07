import { Router } from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";
import {
    calificarJuego,
    obtenerPuntuacionesPorJuego
} from "../controllers/valoraciones.controller.js";
const router = Router();


function decodeToken(accessToken) {
  try {
    const decoded = jwt.verify(accessToken, SECRET);
    return decoded.user; // Los datos del usuario están en la propiedad 'user' del token
  } catch (error) {
    // Manejar el error si el token no es válido
    console.error('Error al decodificar el token:', error);
    return null;
  }
}

function validateAdminToken(req, res, next) {
  const accessToken = req.headers["authorization"];
  const decodedUser = decodeToken(accessToken);

  if (!accessToken) {
      return res.status(401).json({
          message: "Acceso denegado",
          info: "Token de acceso no proporcionado",
      });
  }

  jwt.verify(accessToken, SECRET, (accessTokenError, user) => {
      if (accessTokenError) {
          return res.status(401).json({
              message: "Acceso denegado",
              info: "Token de acceso inválido o expirado",
          });
      } else {
          // El token de acceso es válido
          // Verifica si el usuario tiene la propiedad 'admin' en true
          if (decodedUser && decodedUser.Admin === true) {
              next(); // Usuario autenticado y es administrador
          } else {
              return res.status(403).json({
                  message: "Acceso denegado",
                  info: "Usuario no autorizado",
              });
          }
      }
  });
}

function validateToken(req, res, next) {
    const accessToken = req.headers["authorization"];
  
    if (!accessToken) {
      return res.status(401).json({
        message: "Acceso denegado",
        info: "Token de acceso no proporcionado",
      });
    }
    jwt.verify(accessToken, SECRET, (accessTokenError, user) => {
      if (accessTokenError) {
        return res.status(401).json({
          message: "Acceso denegado",
          info: "Token de acceso inválido o expirado",
        });
      } else {
        // El token de acceso es válido, sigue adelante
        next();
      }
    });
}
const validarSesion = (req, res, next) => {
  if (req.session.loggedin === true) {
    next();
  } else {
    res.status(401).json({
      message: "No autorizado. Inicia sesión primero.",
    });
  }
};

router.post('/valorar-juego', validarSesion, validateToken,  calificarJuego);
router.get('/valorar-juego', validarSesion,  obtenerPuntuacionesPorJuego);


export default router;
