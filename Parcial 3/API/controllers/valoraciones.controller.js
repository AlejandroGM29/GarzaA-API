import { pool } from "../db.js";
// Middleware para validar si el usuario está logeado
const validarSesion = (req, res, next) => {
  if (req.session.loggedin === true) {
    next();
  } else {
    res.status(401).json({
      message: 'No autorizado. Inicia sesión primero.',
    });
  }
};

// Controlador para calificar un juego
export const calificarJuego = async (req, res) => {
  try {
    const { idJuego, puntuacion, comentario } = req.body;
    const idUsuario = req.session.Id; // Suponiendo que guardas la información del usuario en la sesión

    // Insertar nueva valoración utilizando el procedimiento almacenado
    await pool.query('CALL calificarJuego(?, ?, ?, ?)', [idJuego, idUsuario, puntuacion, comentario]);

    res.status(201).json({
      message: 'Juego calificado exitosamente',
    });
  } catch (error) {
    console.error('Error al calificar el juego:', error);
    res.status(500).send('Error interno del servidor');
  }
};

export const obtenerPuntuacionesPorJuego = async (req, res) => {
    try {
      const idJuego = req.headers['id-juego']; // Obtén la id del juego desde el header
  
      // Verifica si la id del juego está presente en el header
      if (!idJuego) {
        return res.status(400).json({
          message: 'Falta la id del juego en el header',
        });
      }
  
      // Llama al procedimiento almacenado para obtener las puntuaciones por juego
      const [result] = await pool.query('CALL ObtenerPuntuacionesPorJuego(?)', [idJuego]);
  
      const juegoNombre = result[0][0].juegoNombre; // Nombre del juego
  
      // Puntuaciones del juego con nombres de usuario y comentarios
      const puntuaciones = result[1];
  
      res.status(200).json({
        juegoNombre,
        puntuaciones,
      });
    } catch (error) {
      console.error('Error al obtener las puntuaciones por juego:', error);
      res.status(500).send('Error interno del servidor');
    }
  };