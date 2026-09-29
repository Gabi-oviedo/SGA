const mongoose = require("mongoose");

const alumnoSchema = new mongoose.Schema(
    {
        legajo: {
            type: Number,
            required: true,
            unique: true
        },

        nombre: {
            type: String,
            required: true
        },

        carrera: {
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

const Alumno = mongoose.model("Alumno", alumnoSchema);

module.exports = Alumno;