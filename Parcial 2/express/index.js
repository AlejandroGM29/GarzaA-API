const express = require('express');
const app = express();


app.get("/alumnos", (req, res) => {
    res.json({ respuesta: "contestando a petición GET en la ruta de alumnos" });
 });
 

app.post("/alumnos", (req, res) => {
    // Puedes enviar una respuesta JSON en esta ruta también si lo deseas
    res.send("contestando a peticion post en ruta empleado")
});

app.listen(8080, () => {
    console.log("servidor express escuchando en el puerto 8080");
});
