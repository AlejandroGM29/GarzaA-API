const express = require("express");
const cors = require("cors");
const multer = require('multer');
const path = require('path');
const folder = path.join(__dirname + '/archivos/')

console.log("server running on");
const storage = multer.diskStorage({
    destination: function(req,file,cb) {cb (null,folder)},
    filename: function(req,file,cb) {cb (null, file.originalname)}
});

const upload = multer({ storage: storage });

const app = express();
app.use(cors())
app.use(express.urlencoded({extended: true,}));
app.use(upload.single('archivo'));
app.use(express.json())

app.post('/archivo/',(req,res)=>{
    
    console.log("se recibio el formulario: " + JSON.stringify(req.body));
    res.json(req.body);
})

app.use((req,res,next) =>{
    res.status(404).json({
        message:"endpoint not found"
    })
})

