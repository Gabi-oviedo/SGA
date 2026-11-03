const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                mensaje: "Debes ingresar email y contraseña"
            });
        }

        const usuario = await Usuario.findOne({
            email: email.trim().toLowerCase()
        }).select("+password");

        console.log("Email recibido:", email);
        console.log("Usuario encontrado:", !!usuario);

        if (!usuario) {
            return res.status(401).json({
                mensaje: "Email o contraseña incorrectos"
            });
        }

        console.log("Tiene contraseña:", !!usuario.password);

        const coincide = await bcrypt.compare(
            password,
            usuario.password
        );

        console.log("¿Coincide la contraseña?:", coincide);

        if (!coincide) {
            return res.status(401).json({
                mensaje: "Email o contraseña incorrectos"
            });
        }

        return res.status(200).json({
            mensaje: "Login correcto",
            id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "ERROR DE PRUEBA",
            detalle: error.message
        });
    }
};

module.exports = { login };
    