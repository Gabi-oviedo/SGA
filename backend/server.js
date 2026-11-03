const express = require("express");
const cors = require("cors");
const conectarBD = require("./config/database");
require("dotenv").config();
const mongoose = require("mongoose");
const materiasRoutes = require("./routes/materiasroutes");
const alumnosRoutes = require("./routes/alumnos.routes");
const docentesRoutes = require("./routes/docentes.routes");
const authRoutes = require("./routes/authRoutes");
const app = express();

app.use(express.json()) 
app.use(cors()) 
app.use("/alumnos", alumnosRoutes) 
app.use("/docentes", docentesRoutes)
app.use("/materias", materiasRoutes)
app.get("/ping", (req, res) => {
    console.log("PING PRINCIPAL RECIBIDO");
    res.json({ mensaje: "Servidor SGA correcto" });
});
app.use("/auth", authRoutes)


const PORT = process.env.PORT 

conectarBD() 

console.log("Ejecutado con nodemon")

app.listen(PORT, () => { 
    console.log(`Servidor funcionando en http://localhost:${PORT}`)
})


// Creo un middleware
// app.use((req, res, next) => {
//     console.log(req.method)
//     console.log(req.url)
//     next()
// })