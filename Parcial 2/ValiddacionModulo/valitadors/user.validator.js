const { checkSchema } = require("express-validator");

const validationSchema = checkSchema({
    nombre: {
        isLength: {
            options: {
                min: 5,
                max: 15
            },
            errorMessage: "El nombre no cumple con los parámetros"
        }
    },
    descripcion: {
        isLength: {
            options: {
                min: 5,
                max: 40
            },
            errorMessage: "La descripción no cumple con los parámetros"
        }
    }
});

module.exports = validationSchema;
