const express = require("express");

const {
    obtenerMaterias,
    obtenerMateria,
    crearMateria,
    actualizarMateria,
    eliminarMateria
} = require("../controllers/materiaController");

const router = express.Router();

router.get("/", obtenerMaterias);

router.get("/:codigo", obtenerMateria);

router.post("/", (req, res, next) => {
    console.log("POST /materias recibido");
    next();
}, crearMateria);

router.post("/", crearMateria);

router.put("/:codigo", actualizarMateria);

router.delete("/:codigo", eliminarMateria);

module.exports = router;