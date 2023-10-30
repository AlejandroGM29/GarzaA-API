
const express = require('express');
const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/', (req, res) => {
  res.send('Lista de usuarios');
});

// Ruta para obtener un usuario por ID
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Detalles del usuario ${userId}`);
});

// Exportar el router para ser utilizado en otros archivos
module.exports = router;
