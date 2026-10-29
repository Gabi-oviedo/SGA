const Usuario = require("../models/Usuario")
const bcrypt = require("bcrypt")

const login = async(req,res) => {
    try{
        const { email, password} = req.body

        if(!email || !password){
            return res.status(400).json({
                mensaje: "Debes inresar email y contraseña"
            })
        }
        const usuario = await Usuario.findOne({email: email.trim().toLowerCase()}).select("+password")

        if(!usuario){
            return res.status(401).json({
                mensaje: "Email o contraseña incorrectos"
            })
        }
        const coincide = await bcrypt.compare(password, usuario.password)
        if(!coincide){
            return res.status(401).json({
                mensaje: "email o contraseña incorrectos"
            })
        }
        return.res.status(200).json({
            mensaje: "Login correcto",
            id: usuario_id,
            nombre: usuario.nombre
            email: usuario.email,
            rol: usuario.rol
        })
    }catch(errror){
        console.error("error en login: ",errror)
        return res.status(500).json({
            mensaje:"Error interno del servidor"
        })
    }
}
    
    module.exports = {login}