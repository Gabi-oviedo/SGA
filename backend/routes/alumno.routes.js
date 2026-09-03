const express = require("express");
//const alumnosController = require("../controllers/alumnos.controller");
const {
  obteneralumnos,
  obtenerAlumno,
  crearAlumno,
  actualizarAlumno,
  eliminarAlumno
} = require("../controllers/alumnos.controller");
const router = express.Router();

router.get("/", obteneralumnos);

router.get("/:id", obtenerAlumno);

router.post("/", crearAlumno);

router.put("/:id", actualizarAlumno);

router.delete("/:id", eliminarAlumno);
module.exports = router;
