
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const Usuario = require("./models/Usuario");

async function actualizarAdmin() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const email = "admin@sga.com";
        const password = "ClaveDePrueba123!";

        const hash = await bcrypt.hash(password, 10);

        const usuario = await Usuario.findOneAndUpdate(
            { email },
            { password: hash },
            { new: true }
        );

        if (!usuario) {
            console.log("No se encontró el administrador.");
            return;
        }

        console.log("Contraseña del administrador actualizada.");

    } catch (error) {
        console.error("Error:", error.message);
    } finally {
        await mongoose.disconnect();
    }
}

actualizarAdmin();

