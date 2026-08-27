const express = require("express");
const app = express();
const alumnos = [{
    id: "1",
    nombre: "Juan",
    carrera: "programacion"
    },
    {
    id: "2",
    nombre: "Pedro",
    carrera: "diseño"
    }
]
app.get("/alumnos" , (req, res) => {
 res.json(alumnos)   
}
)

app.get("/alumnos/:id", (req, res) => {
    const id = Number(req.params.id);
    const alumno = alumnos.find((a) => a.id === id);
    res.json(alumno);
})

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
})

