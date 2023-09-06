const { jsPDF } = require("jspdf");
const fs = require('fs');
const path = require('path');
var xl = require('excel4node');

const contenido = 'Este es el contenido del archivo que estamos creando con Node.js';
const nombreArchivo = 'archivo.txt';

// Crear la ruta completa utilizando path.join y __dirname
const rutaCompleta = path.join(__dirname,"\carpeta archvios", nombreArchivo);

fs.writeFile(rutaCompleta, contenido, (err) => {
  if (err) {
    console.error('Error al escribir en el archivo:', err);
  } else {
    console.log('Archivo creado exitosamente en:', rutaCompleta);
  }
});



// Default export is a4 paper, portrait, using millimeters for units
const doc = new jsPDF();

doc.text(contenido, 10, 10);
doc.save(path.join(__dirname,"\carpeta archvios","a4.pdf"));


var wb = new xl.Workbook();

// Add Worksheets to the workbook
var ws = wb.addWorksheet('Sheet 1');
var ws2 = wb.addWorksheet('Sheet 2');

// Create a reusable style
var style = wb.createStyle({
  font: {
    color: '#FF0800',
    size: 12,
  },
  numberFormat: '$#,##0.00; ($#,##0.00); -',
});

// Set value of cell A1 to 100 as a number type styled with paramaters of style
ws.cell(1, 1)
  .number(100)
  .style(style);

// Set value of cell B1 to 200 as a number type styled with paramaters of style
ws.cell(1, 2)
  .number(200)
  .style(style);

// Set value of cell C1 to a formula styled with paramaters of style
ws.cell(1, 3)
  .formula('A1 + B1')
  .style(style);

// Set value of cell A2 to 'string' styled with paramaters of style
ws.cell(2, 1)
  .string('saludos a la chapiza')
  .style(style);

// Set value of cell A3 to true as a boolean type styled with paramaters of style but with an adjustment to the font size.
ws.cell(3, 1)
  .bool(true)
  .style(style)
  .style({font: {size: 14}});

wb.write(path.join(__dirname,"\carpeta archvios",'Excel.xlsx'));