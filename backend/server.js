const express = require("express")
const app = express()
const cors = require("cors")
app.use(express.json())
app.use(cors())
const alumnosRoutes = require("./routes/alumnos.routes")
app.use("/alumnos", alumnosRoutes)
const conectarBD = require("./config/database")
require("dotenv").config()
const PORT = process.env.PORT


conectarBD()
console.log("Ejecutado con nodemon")

app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:3000:${PORT}`)
})