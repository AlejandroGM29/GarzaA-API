const express = require("express");
const cors = require("cors");
const { validationResult } = require("express-validator");
const validationSchema = require("./valitadors/user.validator"); // Asegúrate de que la ruta al archivo sea correcta

const app = express();
app.use(cors());
app.listen(3000, () => {
    console.log(`Servidor Express iniciado en el puerto 3000`);
});

app.use(express.json());

app.post('/api/subir/', validationSchema, (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        console.log(req.body);
        res.json({ mensaje: "respuesta a petición post" });
    } else {
        res.status(400).json({ mensaje: "error al insertar datos", errors: result.array() });
    }
});

app.use((req, res, next) => {
    res.status(404).json({
        message: "endpoint not found"
    });
});
