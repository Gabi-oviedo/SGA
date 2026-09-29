const express = require("express");
const cors = require("cors");
const conectarBD = require("./config/database");
require("dotenv").config();

const alumnosRoutes = require("./routes/alumnos.routes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
conectarBD();

// Rutas
app.use("/alumnos", alumnosRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
    res.json({
        mensaje: "Servidor SGA funcionando correctamente"
    });
});

// Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});