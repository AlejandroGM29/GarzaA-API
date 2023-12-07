import { response } from "express";
import { pool } from "../db.js";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";



// Middleware para validar si el usuario está logeado

// Controlador para agregar un juego
export const agregarJuego = async (req, res) => {
  try {
    const { nombre, genero, lanzamiento } = req.body;

    await pool.query('CALL CrearJuego(?, ?, ?)', [nombre, genero, lanzamiento]);

    res.status(201).json({
      message: 'Juego agregado exitosamente',
    });
  } catch (error) {
    console.error('Error al agregar el juego:', error);
    res.status(500).send('Error interno del servidor');
  }
};

// Controlador para eliminar un juego
export const eliminarJuego = async (req, res) => {
  try {
    const { idJuego, idUsuario } = req.body;

    const [isAdmin] = await pool.query('SELECT admin FROM Usuarios WHERE idUsuario = ?', [idUsuario]);

    if (isAdmin[0].admin) {
      await pool.query('CALL EliminarJuego(?, ?)', [idJuego, idUsuario]);

      res.status(200).json({
        message: 'Juego eliminado exitosamente',
      });
    } else {
      res.status(403).json({
        message: 'No tienes permisos para realizar esta acción',
      });
    }
  } catch (error) {
    console.error('Error al eliminar el juego:', error);
    res.status(500).send('Error interno del servidor');
  }
};

// Controlador para activar un juego
export const activarJuego = async (req, res) => {
  try {
    const { idJuego, idUsuario } = req.body;

    const [isAdmin] = await pool.query('SELECT admin FROM Usuarios WHERE idUsuario = ?', [idUsuario]);

    if (isAdmin[0].admin) {
      await pool.query('CALL activarJuego(?, ?)', [idJuego, idUsuario]);

      res.status(200).json({
        message: 'Juego activado exitosamente',
      });
    } else {
      res.status(403).json({
        message: 'No tienes permisos para realizar esta acción',
      });
    }
  } catch (error) {
    console.error('Error al activar el juego:', error);
    res.status(500).send('Error interno del servidor');
  }
};

// Controlador para obtener la lista de juegos
export const obtenerListaJuegos = async (req, res) => {
  try {
    const listaJuegos = await pool.query('CALL ObtenerListaJuegos()');

    res.status(200).json({
      juegos: listaJuegos[0],
    });
  } catch (error) {
    console.error('Error al obtener la lista de juegos:', error);
    res.status(500).send('Error interno del servidor');
  }
};
