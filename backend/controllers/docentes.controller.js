const Docente = require("../models/Docente");

async function obtenerDocentes(req, res) {
    const docentes = await Docente.find();
    res.json(docentes);
}

async function obtenerDocente(req, res) {
    const docente = await Docente.findById(req.params.id);

    if (!docente) {
        return res.status(404).json({
            mensaje: "Debe elegir un docente existente."
        });
    }

    res.json(docente);
}

async function crearDocente(req, res) {
    const { nombre, especialidad, correo } = req.body;

    if (!nombre || !especialidad || !correo) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios."
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
        nombre,
        especialidad,
        correo
    });

    await nuevoDocente.save();

    res.status(201).json(nuevoDocente);
}

async function actualizarDocente(req, res) {
    const { nombre, especialidad, correo } = req.body;

    const docente = await Docente.findByIdAndUpdate(
        req.params.id,
        {
            nombre,
            especialidad,
            correo
        },
        {
            returnDocument: "after"
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
}

async function eliminarDocente(req, res) {
    const docente = await Docente.findByIdAndDelete(req.params.id);

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