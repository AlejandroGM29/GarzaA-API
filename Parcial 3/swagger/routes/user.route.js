import { Router } from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";
import {
  getUsers,
  updateUser,
  getUser,
  deleteUsers,
  logout,
  loginUser,
  createUser
} from "../controllers/user.controller.js";
const router = Router();

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Iniciar sesión de usuario.
 *     description: Permite a un usuario iniciar sesión y generar un token de acceso válido.
 *     requestBody:
 *       description: Datos de inicio de sesión del usuario.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *               contraseña:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso. Retorna un objeto JSON con el usuario y un token de acceso válido.
 *       400:
 *         description: Credenciales de inicio de sesión incorrectas o usuario no existente.
 *       500:
 *         description: Error interno del servidor.
 */

router.post("/login", loginUser)

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Registrar un nuevo usuario.
 *     description: Permite a un usuario registrarse en el sistema.
 *     requestBody:
 *       description: Datos de registro del usuario.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               correo:
 *                 type: string
 *               contraseña:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito. Retorna un objeto JSON con los detalles del usuario.
 *       400:
 *         description: Error en los datos de registro del usuario o el usuario ya existe.
 *       500:
 *         description: Error interno del servidor.
 */

router.post("/register", createUser);


/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: Cerrar sesión de usuario.
 *     description: Permite a un usuario cerrar sesión y eliminar el token de acceso.
 *     responses:
 *       200:
 *         description: Sesión cerrada con éxito.
 *       401:
 *         description: Acceso no autorizado.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/logout",validateToken ,logout);


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
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtener información de un usuario por ID.
 *     description: Permite a un usuario obtener información detallada por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Retorna un objeto JSON con la información del usuario.
 *       401:
 *         description: Acceso no autorizado.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 *
 *   patch:
 *     summary: Actualizar información de un usuario por ID.
 *     description: Permite a un usuario actualizar su información por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario.
 *         schema:
 *           type: integer
 *       - in: body
 *         name: body
 *         description: Datos del usuario a actualizar.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             nombre:
 *               type: string
 *             correo:
 *               type: string
 *             contraseña:
 *               type: string
 *     responses:
 *       204:
 *         description: Usuario actualizado con éxito.
 *       401:
 *         description: Acceso no autorizado.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 *
 *   delete:
 *     summary: Eliminar un usuario por ID.
 *     description: Permite a un usuario eliminar su cuenta por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Usuario eliminado con éxito.
 *       401:
 *         description: Acceso no autorizado.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */

router.get("/", validateToken, getUsers);

router.get("/:id",validateToken, getUser);

router.patch("/:id", validateToken,updateUser);

router.delete("/:id",validateToken, deleteUsers);

export default router;
