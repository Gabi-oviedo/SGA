const Alumno = require("../models/Alumno")

async function obtenerAlumnos(req, res) {
    try {
        const alumnos = await Alumno.find()
        res.json(alumnos)
    } catch (error) {
        console.error(error)
        res.status(500).json({ mensaje: "Error al obtener los alumnos." })
    }
}

async function obtenerAlumno(req, res) {
    try {
        const alumno = await Alumno.findOne({
            legajo: Number(req.params.id)
        })
        if (!alumno) {
            return res.status(404).json({
                mensaje: "Debe elegir un id existente."
            })
        }
        res.json(alumno)
    } catch (error) {
        console.error(error)
        res.status(500).json({ mensaje: "Error al obtener el alumno." })
    }
}

async function crearAlumno(req, res) {
    try {
        const { legajo, nombre, carrera, correo } = req.body
        if (!legajo || !nombre || !carrera || !correo) {
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios."
            })
        }
        if (typeof nombre !== "string") {
            return res.status(400).json({
                mensaje: "El nombre no debe ser numérico."
            })
        }
        if (typeof legajo !== "number") {
            return res.status(400).json({
                mensaje: "El legajo debe ser un número"
            })
        }
        const existe = await Alumno.findOne({ legajo })
        if (existe) {
            return res.status(400).json({
                mensaje: "El legajo ya existe"
            })
        }
        const nuevoAlumno = await Alumno.create({
            legajo,
            nombre,
            carrera,
            correo
        })
        res.status(201).json(nuevoAlumno)
    } catch (error) {
        console.error(error)
        res.status(500).json({ mensaje: "Error al crear el alumno." })
    }
}

async function actualizarAlumno(req, res) {
    try {
        const { nombre, carrera, correo } = req.body
        const alumno = await Alumno.findOneAndUpdate(
            { legajo: Number(req.params.id) },
            { nombre, carrera, correo },
            { returnDocument: "after" }
        )
        if (!alumno) {
            return res.status(404).json({
                mensaje: "Debe elegir un id existente."
            })
        }
        res.json({ mensaje: "Alumno actualizado correctamente." })
    } catch (error) {
        console.error(error)
        res.status(500).json({ mensaje: "Error al actualizar el alumno." })
    }
}

async function eliminarAlumno(req, res) {
    try {
        const alumno = await Alumno.findOneAndDelete(
            { legajo: Number(req.params.id) }
        )
        if (!alumno) {
            return res.status(404).json({
                mensaje: "Debe elegir un id existente."
            })
        }
        res.json({ mensaje: "Alumno eliminado correctamente" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ mensaje: "Error al eliminar el alumno." })
    }
}

module.exports = { obtenerAlumnos, obtenerAlumno, crearAlumno, actualizarAlumno, eliminarAlumno }