const express = require('express');
const usuariosRouter = require('./usuarios'); // Importar el router de usuarios

const app = express();

// Usar el router de usuarios en la ruta /usuarios
app.use('/usuarios', usuariosRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
