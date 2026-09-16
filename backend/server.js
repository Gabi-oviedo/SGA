require("dotenv").config()

const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())
app.use(express.json())

const alumnosRoutes = require("./routes/alumnos.routes")
app.use("/alumnos", alumnosRoutes)

const conectarBD = require("./config/database")
const PORT = process.env.PORT

conectarBD()

app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`)
})