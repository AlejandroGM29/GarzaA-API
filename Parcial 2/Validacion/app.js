const express = require("express");
const cors = require("cors");
const multer = require('multer');
const path = require("path");
const { check, validationResult } = require("express-validator");

const app = express();
app.use(cors())
app.listen(3000, () => {
  console.log(`Servidor Express iniciado en el puerto 3000`);
});

app.use(express.json())

app.post('/api/subir/',[check('edad').isNumeric(),check('correo').isEmail()],(req,res)=>{
    const result = validationResult(req);
    if(result.isEmpty()){
      console.log(req.body)
      res.json({mensaje:"respuesta a peticion post"})
    }  else{
      res.json({mensaje: "error al insertar datos", result})
    }
  })


app.use((req,res,next) =>{
    res.status(404).json({
        message:"endpoint not found"
    })
})

