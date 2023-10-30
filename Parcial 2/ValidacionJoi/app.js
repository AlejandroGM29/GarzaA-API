const express = require('express');
const Joi = require('joi');

const app = express();
app.use(express.json()); 

app.post('/api/usuarios', (req, res) => {
  const schema = Joi.object({
    nombre: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    edad: Joi.number().integer().min(18).required()
  });

  const { error, value } = schema.validate(req.body);


  if (error) {
    return res.status(400).send(error.details[0].message);
  }


  res.send(value);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
