const express = require("express");
const router = express.Router(); //manejador de rutas de express
const mascotaSchema = require("../models/mascota");
//Nuevo animal
router.post("/mascota", (req, res) => {
    const mascota = mascotaSchema(req.body);
    mascota
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
