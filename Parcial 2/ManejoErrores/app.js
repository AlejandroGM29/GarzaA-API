const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors())
app.listen(3000, () => {
    console.log(`Servidor Express iniciado en el puerto 3000`);
});
app.use(express.json())

  app.get('/api/error', (req, res, next) => {
    // Generamos un error intencionalmente
    const error = new Error('Este es un error generado intencionalmente');
    error.status = 500; // Establecemos el código de estado HTTP del error (por ejemplo, 500 para errores del servidor)
    next(error); // Pasamos el control al siguiente middleware con el error
});

app.use((err, req, res, next) => {
  console.log(err.message)
  res.status(err.status || 500); // Establecemos el código de estado HTTP del error
  //res.status(502).send("hubo un error en el servidor: " + err.message)
  res.json({
      error: {
          message: err.message // Enviamos el mensaje de error al cliente
      }
  });
});




app.use((req,res,next) =>{
    res.status(404).json({
        message:"endpoint not found"
    })
})
