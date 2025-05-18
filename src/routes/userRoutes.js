const express = require("express");
const router = express.Router();
const Usuario = require("../models/user");
const bcrypt = require("bcrypt");

router.post('/signup', async (req, res) => {
    const { nombre, correo, contraseña } = req.body;

    // Validar que los datos requeridos estén presentes
    if (!correo || !nombre || !contraseña) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    try {
        const user = new Usuario({
            nombre,
            correo,
            contraseña
        });

        // Guardar el usuario
        await user.save();

        // Enviar la respuesta sin información sensible
        res.status(201).json({
            nombre: user.nombre,
            correo: user.correo,
            fechaRegistro: user.fechaRegistro
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'El correo ya está registrado.' });
        }
        console.error(error);
        res.status(500).json({ message: 'Hubo un error al crear el usuario.' });
    }
});

module.exports = router;
