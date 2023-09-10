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
        const [ rows,fields] = await conn.query('select * from usuaros')
        res.json(rows);
    }catch(err){
        res.status(500).json({mensaje:err.message})
    }
    });

    app.get("/usuarios/:id",async (req,res)=>{
        try{console.log(req.params.id);
            const conn = await mysql.createConnection({host:'localhost',user:'root',password:'',database:'kidsvoice'})
            const [rows, fields] = await conn.query('select * from usuarios where ID =' + req.params.id);
            if(rows.length==0){
                res.status(404).json({mensaje:"usuario no existe"})
            }else{
                res.json(rows);
            }}
            catch(err){
                res.json({mensaje:err.message});   
            }
            
        });


    app.listen(8080,()=>{
        console.log("el servidor express escuchando en el puerto 8080");
    })