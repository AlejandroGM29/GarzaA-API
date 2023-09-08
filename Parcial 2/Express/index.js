const express = require('express')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const mysql = require('mysql2/promise')
const app = express();

var accesLogStream = fs.createWriteStream(path.join(__dirname, 'acces.logs'), {flags: 'a'})
app.use(morgan('combined',{stream:accesLogStream}));

app.get("/usuarios",async (req,res)=>{
    try{
        const conn = await mysql.createConnection({host:'localhost',user:'root',password:'',database:'kidsvoice'})
        const [ rows,fields] = await conn.query('select * from usuarios')
        res.json(rows);
    }catch{
        res.json({mensaje:"Error de conexion"});
    }
    });

    app.get("/usuarios/:id",async (req,res)=>{
            console.log(req.params.id);
            const conn = await mysql.createConnection({host:'localhost',user:'root',password:'',database:'kidsvoice'})
            const [rows, fields] = await conn.query('select * from usuarios where ID =' + req.params.id);
            res.json(rows);
            if(rows.length==0){
                res.json({mensaje:"usuariro no existente"});
            }else{
                res.json(rows);
            }
        });
        
    app.listen(8080,()=>{
        console.log("el servidor express escuchando en el puerto 8080");
    })