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
import fs from 'fs'
import {SwaggerTheme} from 'swagger-themes';


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const theme = new SwaggerTheme('v3');
const def = fs.readFileSync(path.join(__dirname, 'swagger.json'), { encoding: 'utf-8' });
const definition = JSON.parse(def);

const options = {
  explorer: true,
  customCss: theme.getBuffer('dark')
};

console.log(definition);

const swaggerOptions = {
  definition,
  apis: [
    path.join(__dirname, "app.js"),            
    path.join(__dirname, "./routes/user.route.js")
  ],
};

// Puedes usar ahora la variable swaggerOptions según sea necesario.


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
  res.json(swaggerDocs);
});

app.use("/users", user);

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocs,options));

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
