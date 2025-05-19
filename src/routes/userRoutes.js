const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const userSchema = require("../models/user");

// Registro
router.post("/signup", async (req, res) => {
    const { nombre, correo, contraseña } = req.body;
    const user = new userSchema({
        nombre: nombre,
        correo: correo,
        contraseña: contraseña,
    });
    user.contraseña = await user.encryptContraseña(user.contraseña);
    await user.save(); 
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: 60 * 60 * 24, 
    });
    res.json({
        auth: true,
        token,
    });
});

//inicio de sesión
router.post("/login", async (req, res) => {

    const { error } = userSchema.validate(req.body.correo, req.body.contraseña);
    if (error) return res.status(400).json({ error: error.details[0].message });
    const user = await userSchema.findOne({ correo: req.body.correo });
    if (!user) return res.status(400).json({ error: "Usuario no encontrado" });
    const validPassword = await bcrypt.compare(req.body.contraseña, user.contraseña);
    if (!validPassword)
        return res.status(400).json({ error: "contraseña no válida" });
    res.json({
        error: null,
        data: "Bienvenido(a)",
    });
});
module.exports = router;
