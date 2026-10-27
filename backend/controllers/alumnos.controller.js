const Alumno = require("../models/Alumno");

async function obtenerAlumnos(req, res) {
    try {
        console.log("GET /alumnos: ejecutando consulta");
        console.log("Estado de conexión:", Alumno.db.readyState);
        console.log("Base de datos:", Alumno.db.name);

        const alumnos = await Alumno.find();

        console.log("Consulta completada. Cantidad:", alumnos.length);
        res.json(alumnos);
    } catch (error) {
        console.error("Error en obtenerAlumnos:", error);
        res.status(500).json({
            mensaje: "Error al obtener alumnos"
        });
    }
}

async function obtenerAlumno(req, res) {
    try {
        const alumno = await Alumno.findOne({
            legajo: Number(req.params.id)
        });

        if (!alumno) {
            return res.status(404).json({
                mensaje: "No se encontró el alumno."
            });
        }

        res.json(alumno);
    } catch (error) {
        console.error("Error en obtenerAlumno:", error);
        res.status(500).json({
            mensaje: "Error al obtener el alumno."
        });
    }
}

async function crearAlumno(req, res) {
    try {
        const { legajo, nombre, carrera, correo } = req.body;

        if (
            legajo == null ||
            legajo === "" ||
            !nombre ||
            !carrera ||
            !correo
        ) {
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios."
            });
        }

        if (typeof nombre !== "string") {
            return res.status(400).json({
                mensaje: "El nombre debe ser un texto."
            });
        }

        if (typeof legajo !== "number" || !Number.isFinite(legajo)) {
            return res.status(400).json({
                mensaje: "El legajo debe ser un número."
            });
        }

        const existe = await Alumno.findOne({ legajo });

        if (existe) {
            return res.status(400).json({
                mensaje: "El legajo ya existe."
            });
        }

        const nuevoAlumno = new Alumno({
            legajo,
            nombre,
            carrera,
            correo
        });

        await nuevoAlumno.save();

        res.status(201).json(nuevoAlumno);
    } catch (error) {
        console.error("Error en crearAlumno:", error);
        res.status(500).json({
            mensaje: "Error al crear el alumno"
        });
    }
}

async function actualizarAlumno(req, res) {
    try {
        const { nombre, carrera, correo } = req.body;

        const alumno = await Alumno.findOneAndUpdate(
            { legajo: Number(req.params.id) },
            { nombre, carrera, correo },
            { returnDocument: "after", runValidators: true }
        );

        if (!alumno) {
            return res.status(404).json({
                mensaje: "Debe elegir un id existente."
            });
        }

        res.json({
            mensaje: "Alumno actualizado correctamente.",
            alumno
        });
    } catch (error) {
        console.error("Error en actualizarAlumno:", error);
        res.status(500).json({
            mensaje: "Error al actualizar el alumno"
        });
    }
}

async function eliminarAlumno(req, res) {
    try {
        const alumno = await Alumno.findOneAndDelete({
            legajo: Number(req.params.id)
        });

        if (!alumno) {
            return res.status(404).json({
                mensaje: "Debe elegir un id existente."
            });
        }

        res.json({
            mensaje: "Alumno eliminado correctamente."
        });
    } catch (error) {
        console.error("Error en eliminarAlumno:", error);
        res.status(500).json({
            mensaje: "Error al eliminar el alumno"
        });
    }
}

module.exports = {
    obtenerAlumnos,
    obtenerAlumno,
    crearAlumno,
    actualizarAlumno,
    eliminarAlumno
};