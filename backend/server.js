const express = require("express");
const cors = require("cors");
const conectarBD = require("./config/database");
require("dotenv").config();
const mongoose = require("mongoose");

const alumnosRoutes = require("./routes/alumnos.routes");
const docentesRoutes = require("./routes/docentes.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/alumnos", alumnosRoutes);
app.use("/docentes", docentesRoutes);

app.get("/", (req, res) => {
res.json({
mensaje: "Servidor SGA funcionando correctamente"
});
});

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
    try {
        await conectarBD();

        console.log("Estado de conexión:", mongoose.connection.readyState);
        console.log("Base de datos:", mongoose.connection.name);

        const Alumno = require("./models/Alumno");
        const alumnos = await Alumno.find();

        console.log("Consulta correcta. Cantidad de alumnos:", alumnos.length);

        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("No se pudo iniciar el servidor:", error);
        process.exit(1);
    }
}

iniciarServidor();