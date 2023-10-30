import express from "express";
import cors from "cors";
import jsonwebtoken from "jsonwebtoken";


const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/login', (req,res,next)=>{
  console.log("hola mundo")
  var token = jsonwebtoken.sign(req.body,'clavesecreta')
  console.log(token)
  res.header("authorization", token).json(token);
})

app.get("/sistema", validateToken, (req,res,next)=>{
  res.json({
    message: "acceso consedido"
  })
})

app.listen(3000,()=>{
  console.log("servidor funcionando")
})

function validateToken(req, res, next) {
  const accessToken = req.headers["authorization"];
  console.log(req.headers["authorization"])
  if (!accessToken) {
    return res.status(401).json({
      message: "Acceso denegado",
      info: "Token de acceso no proporcionado",
    });
  }
  jsonwebtoken.verify(accessToken, 'clavesecreta', (accessTokenError, user) => {
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


app.use((req, res, next) => {
  res.status(404).json({
    message: "endpoint not found",
  });
});

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(err.status || 500); // Establecemos el código de estado HTTP del error
  //res.status(502).send("hubo un error en el servidor: " + err.message)
  res.json({
    error: {
      message: err.message, // Enviamos el mensaje de error al cliente
    },
  });
});

export default app;
