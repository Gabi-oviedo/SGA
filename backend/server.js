const express = require("express");
const app = express();
app.use(express.json());
const alumnosRoutes = require("./routes/alumno.routes");
app.use("/alumnos", alumnosRoutes);
const conectardb = require("./config/database");


conectardb();

app.listen(3000, () => {
    console.log("Servidor funcionando en http://localhost:3000")
})