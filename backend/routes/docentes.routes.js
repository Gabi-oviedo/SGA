const express = require("express");

const {
    obtenerDocentes,
    obtenerDocente,
    crearDocente,
    actualizarDocente,
    eliminarDocente
} = require("../controllers/docentes.controller");

const router = express.Router();

router.get("/", obtenerDocentes);

router.get("/:dni", obtenerDocente);

router.post("/", crearDocente);

router.put("/:dni", actualizarDocente);

router.delete("/:dni", eliminarDocente);

module.exports = router;