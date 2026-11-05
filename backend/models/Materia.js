const mongoose = require("mongoose");

const materiaSchema = new mongoose.Schema(
    {
        codigo: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        nombre: {
            type: String,
            required: true,
            minlength: 4, 
            maxlength: 30, 
            trim: true
        },

        descripcion: {
            type: String
        },

        cargaHoraria: {
            type: String,
            required: true
        },

        estado: {
            type: String,
            required:true, 
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