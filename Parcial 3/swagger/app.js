import express from "express";
import cors from "cors";
import { pool } from "./db.js";
import user from "./routes/user.route.js";
import session from "express-session";
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API',
      version: '1.0.0',
      description: 'API para manejar los datos de un usuario',
    },
    servers: [
      { url: "http://localhost:3000" }
    ],
  },
  apis: [
    path.join(__dirname, "app.js"),            // Ruta al archivo app.js (ruta raíz)
    path.join(__dirname, "./routes/user.route.js") // Ruta al archivo user.route.js
  ],
};


const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "12x341|x", // Cambia esto a una cadena segura y secreta
    resave: false,
    saveUninitialized: true,
  })
);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Ruta de bienvenida base.
 *     description: Retorna un mensaje de bienvenida.
 *     responses:
 *       200:
 *         description: Retorna un objeto JSON con un mensaje de bienvenida.
 */
app.get("/", async (req, res) => {
  res.json({ message: "hola" });
});

app.use("/users", user);

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocs));

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
