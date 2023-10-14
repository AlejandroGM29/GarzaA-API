const express = require("express");
const cors = require("cors");
const multer = require('multer');
const path = require('path');


const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.listen(3000, () => {
    console.log(`Servidor Express iniciado en el puerto 3000`);
  });
app.post('/api/usuarios/', async (req, res) => { // Mark the function as async
    try {
        const { nombre, correo, tipoUsuario, contraseña } = req.body;

        const [rows] = await pool.query("CALL CrearUsuario(?,?,?,?)", [
            nombre,
            correo,
            tipoUsuario,
            contraseña,
        ]);

        res.send({
            id: rows.insertId,
            nombre,
            correo,
            tipoUsuario,
        });
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        res.status(500).send("Error interno del servidor");
    }
});

app.use((req, res, next) => {
    res.status(404).json({
        message: "Endpoint not found"
    });
});


