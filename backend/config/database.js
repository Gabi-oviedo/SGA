const mongoose = require("mongoose");

async function conectardb(){

    try{
        await mongoose.connect("mongodb://localhost:27017/SGA");
        console.log("Conectado a la base de datos");
    }
    catch{
        console.log(error)
    }
}

module.exports = conectardb;
