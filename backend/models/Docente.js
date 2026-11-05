const mongoose = require("mongoose");

const docenteSchema = new mongoose.Schema(
    {
        dni: {
            type: Number,
            required: true,
            unique: true
        },
        nombre: {
            type: String,
            required: true
        },

        especialidad: {
            type: String,
            required: true
        },

        correo: {
            type: String,
            required: true
        }
    },
    {
        versionKey: false
    }
);

const Docente = mongoose.model("Docente", docenteSchema);

module.exports = Docente;