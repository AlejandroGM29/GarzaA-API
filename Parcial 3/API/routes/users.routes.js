import { Router } from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";
import {
    createUser,
    loginUser,
    logout
} from "../controllers/users.controller.js";
const router = Router();

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




export default router;
