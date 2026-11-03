const express = require("express");
const router = express.Router();

const { login } = require("../controllers/authController");


router.get("/ping", (req, res) => {
    console.log("PING RECIBIDO");
    res.json({ mensaje: "Auth funciona correctamente" });
});
router.post("/login", (req, res, next) => {

    next();
}, login);

module.exports = router;