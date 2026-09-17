const express = require("express")
const app = express()
cost cors = require("cors")
ap.use(express.json())
app.use(cors())
const alumnosRoues = require("./routes/alumnos.routes")
app.use("/alumnos", alumosRoutes)
const conectarBD = reqire("./config/database")
require("dotenv").confi()
const PORT = process.env.PORT || 300;


conectarBD()
console.log("Ejecutado con nodemon")

app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`)
}