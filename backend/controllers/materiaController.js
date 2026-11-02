const Materia = require("../models/Materia");

async function obtenerMaterias(req, res) {
    try {
        const materias = await Materia.find();
        res.json(materias);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error interno del servidor." });
    }

}

async function obtenerMateria(req, res) {
    try {
        const materia = await Materia.findOne({ codigo: req.params.codigo });

        if (!materia) {
            return res.status(404).json({
                mensaje: "Debe elegir una materia existente."
            });
        }

        res.json(materia);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error interno del servidor." });
    }
}

async function crearMateria(req, res) {
     console.log("POST /materias recibido");
    try {
        const { codigo, nombre, descripcion, cargaHoraria, estado } = req.body;

        if (!codigo || !nombre || !estado || 
    cargaHoraria === undefined ||
    cargaHoraria === null ||
    cargaHoraria === "") {
            return res.status(400).json({
                mensaje: "los campos codigo, nombre, carga horaria y estado son obligatorios"
            });
        }

        if (typeof codigo !== "string") {
            return res.status(400).json({
                mensaje: "el codigo debe ser un texto."
            });
        }

        if (typeof nombre !== "string") {
            return res.status(400).json({
                mensaje: "el nombre debe ser un texto."
            });
        }

        if (descripcion !== undefined && typeof descripcion !== "string") {
            return res.status(400).json({
                mensaje: "la descripcion debe ser un texto."
            });
        }

        if (typeof cargaHoraria !== "string") {
            return res.status(400).json({
                mensaje: "la carga horaria debe ser un texto."
            });
        }

        if (typeof estado !== "string") {
            return res.status(400).json({
                mensaje: "el estado debe ser un texto."
            });
        }

        const nuevaMateria = new Materia({
            codigo,
            nombre,
            descripcion,
            cargaHoraria,
            estado
        });

        await nuevaMateria.save();

        res.status(201).json(nuevaMateria);


    } catch (error) {

        if (error.name === "ValidationError") {
            const mensajes = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({ mensaje: mensajes.join(" ") });
        }

        if (error.code === 11000) {
            return res.status(409).json({ mensaje: "Ya existe una materia con ese código." });
        }

        console.error(error);
        res.status(500).json({ mensaje: "Error interno del servidor." });

    }
}

async function actualizarMateria(req, res) {
    try {

        const { codigo, nombre, descripcion, cargaHoraria, estado } = req.body;
        const materia = await Materia.findOneAndUpdate({ codigo: req.params.codigo },
            {
                codigo,
                nombre,
                descripcion,
                cargaHoraria,
                estado
            },
            {
                returnDocument: "after", runValidators: true
            }
        );

        if (!materia) {
            return res.status(404).json({
                mensaje: "Debe elegir una materia existente."
            });
        }

        res.json({
            mensaje: "Materia actualizada correctamente.",
            materia
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ mensaje: "ese codigo ya pertenece a otra materia." });
        }
        if (error.name === "ValidationError") {
            const mensajes = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({ mensaje: mensajes.join(" ") });
        }
        console.error(error);
        res.status(500).json({ mensaje: "Error interno del servidor." });
    }
}

async function eliminarMateria(req, res) {
    try {
        const materia = await Materia.findOneAndDelete({ codigo: req.params.codigo });

        if (!materia) {
            return res.status(404).json({
                mensaje: "Debe elegir una materia existente."
            });
        }

        res.json({
            mensaje: "Materia eliminada correctamente."
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error interno del servidor." });
    }
}

module.exports = {
    obtenerMaterias,
    obtenerMateria,
    crearMateria,
    actualizarMateria,
    eliminarMateria
};