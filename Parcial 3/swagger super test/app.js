import express from "express";
import cors from "cors";
import user from "./routes/user.route.js";
import session from "express-session";
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';
import fs from 'fs'
import {SwaggerTheme} from 'swagger-themes';
import redoc from 'redoc-express'
import OpenAPISnippet from 'openapi-snippet';
import request from 'supertest'
import assert from 'assert'

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ContenidoReadme = fs.readFileSync(path.join(__dirname)+'/README.md',{encoding:'utf8',flag:'r'})

const theme = new SwaggerTheme('v3');

const def = fs.readFileSync(path.join(__dirname, 'swagger.json'), { encoding: 'utf-8' });
const definition = JSON.parse(def);
definition.info.description=ContenidoReadme;
const options = {
  explorer: true,
  customCss: theme.getBuffer('dark')
};
let redocTheme_objeto = JSON.parse(def)

console.log(definition);

const swaggerOptions = {
  definition,
  apis: [         
    path.join(__dirname, "./routes/user.route.js")
  ],
};

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

app.get('/prueba', function(req, res) {
  res.status(200).json({message:"hola mundo"});
});

request(app)
  .get('/prueba')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '24')
  .expect(200)
  .end(function(err, res) {
    if(err != null){
      console.log(err)
    }else{
      console.log("el programa funciono correctamente")
    }
  });


app.use("/users", user);

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocs,options));
app.get(
  '/redocs',
  redoc({
    title: 'API Docs',
    specUrl: '/',
    nonce: '', // <= it is optional,we can omit this key and value
    // we are now start supporting the redocOptions object
    // you can omit the options object if you don't need it
    // https://redocly.com/docs/api-reference-docs/configuration/functionality/
    redocOptions: {
      theme: redocTheme_objeto
    }
  })
);

const openApi = swaggerDocs // Open API document
const targets = ['node_unirest', 'c'] // array of targets for code snippets. See list below...


try {
  // either, get snippets for ALL endpoints:
  const results = OpenAPISnippet.getSnippets(openApi, targets) // results is now array of snippets, see "Output" below.

  // ...or, get snippets for a single endpoint:
  const results2 = OpenAPISnippet.getEndpointSnippets(openApi, '/users/{user-id}/relationship', 'get', targets)
} catch (err) {
  // do something with potential errors...
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
