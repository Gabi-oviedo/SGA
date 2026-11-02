const mongoose = require("mongoose");

const materiaSchema = new mongoose.Schema(
    {
        codigo: {
            type: String,
            required: [true, "el código es obligatorio"],
            unique: true,
            trim: true
        },

        nombre: {
            type: String,
            required: [true, "el nombre es obligatorio"],
            minlength: [4, "el nombre debe tener mínimo 4 caracteres"],
            maxlength: [30, "el nombre no puede superar los 30 caracteres"],
            trim: true
        },

        descripcion: {
            type: String,
            validate: {
                validator: function (valor) {
                    return valor === "" || valor.trim().length > 0;
                    },
                message: "La descripción no puede contener solo espacios"
                     }
        },

        cargaHoraria: {
            type: String,
            required: [true, "la carga horaria es obligatoria"],
            validate : {
              validator: valor => /^[1-9]\d*$/.test(valor),
                message: "el número debe ser entero"
            }
        },

        estado: {
            type: String,
            required: [true, "el estado es obligatorio"],
            enum: {
                values: ["activa", "inactiva"],
                message: "Debe seleccionar un estado válido"
            }
        }
    },
    {
        versionKey: false
    }
);

const Materia = mongoose.model("Materia", materiaSchema);

module.exports = Materia;