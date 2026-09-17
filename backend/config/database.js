const mongoose = require("mongose")

async fnction  conectarD() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Base de datos conectada.")
    } catch (error) {
        console.log(error)
    }
}

module.exports = conectar