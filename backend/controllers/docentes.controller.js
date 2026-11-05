const Docente = require("../models/Docente");

async function obtenerDocentes(req, res) {
    const docentes = await Docente.find();
    res.json(docentes);
}

async function obtenerDocente(req, res) {
    const docente = await Docente.findById(req.params.dni);

    if (!docente) {
        return res.status(404).json({
            mensaje: "Debe elegir un docente existente."
        });
    }

    res.json(docente);
}

async function crearDocente(req, res) {
    const { dni, nombre, especialidad, correo } = req.body;
    console.log("DATOS RECIBIDOS POR EL BACKEND:", req.body);
    if (!dni || !nombre || !especialidad || !correo) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios."
        });
    }

    if (!Number.isInteger(Number(dni))) {
        return res.status(400).json({
            mensaje: "El DNI debe ser un número entero."
        });
    }

    if (typeof nombre !== "string") {
        return res.status(400).json({
            mensaje: "El nombre debe ser un texto."
        });
    }

    if (typeof especialidad !== "string") {
        return res.status(400).json({
            mensaje: "La especialidad debe ser un texto."
        });
    }

    if (typeof correo !== "string") {
        return res.status(400).json({
            mensaje: "El correo debe ser un texto."
        });
    }

    const nuevoDocente = new Docente({
        dni,
        nombre,
        especialidad,
        correo
    });

    await nuevoDocente.save();

    res.status(201).json(nuevoDocente);
}

async function actualizarDocente(req, res) {
    try {
        const { dni, nombre, especialidad, correo } = req.body;

        const docente = await Docente.findOneAndUpdate(
            { dni: Number(req.params.dni) },
            { dni: Number(dni), nombre, especialidad, correo },
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!docente) {
            return res.status(404).json({
                mensaje: "Debe elegir un docente existente."
            });
        }

        res.json({
            mensaje: "Docente actualizado correctamente.",
            docente
        });

    } catch (error) {
        console.error("Error al actualizar docente:", error);

        if (error.code === 11000) {
            return res.status(409).json({
                mensaje: "Ya existe un docente con ese DNI."
            });
        }

        res.status(500).json({
            mensaje: "Error interno del servidor."
        });
    }
}

async function eliminarDocente(req, res) {
    const docente = await Docente.findOneAndDelete({
        dni: Number(req.params.dni)
    });

    if (!docente) {
        return res.status(404).json({
            mensaje: "Debe elegir un docente existente."
        });
    }

    res.json({
        mensaje: "Docente eliminado correctamente."
    });
}

module.exports = {
    obtenerDocentes,
    obtenerDocente,
    crearDocente,
    actualizarDocente,
    eliminarDocente
};