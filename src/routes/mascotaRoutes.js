//routes/mascotaRoutes.js
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

//Consultar todos los animales
router.get("/mascota", (req, res) => {
    mascotaSchema.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

router.put("/mascotas/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, tipo, bienestar } = req.body;

  mascotaSchema
    .updateOne({ _id: id }, {
      $set: { nombre, tipo, bienestar }
    })
    .then((data) => res.json(data))
    .catch((error) => res.status(500).json({ message: error.message }));
});

router.delete("/mascotas/:id", (req, res) => {
  const { id } = req.params;

  mascotaSchema
    .findByIdAndDelete(id)
    .then((data) => res.json(data))
    .catch((error) => res.status(500).json({ message: error.message }));
});

// Obtener solo las estadísticas actuales de una mascota
router.get("/mascotas/:id/estadisticas", async (req, res) => {
  const { id } = req.params;

  try {
    const mascota = await mascotaSchema.findById(id, "bienestar nombre tipo");
    if (!mascota) {
      return res.status(404).json({ message: "Mascota no encontrada" });
    }
    res.json({
      nombre: mascota.nombre,
      tipo: mascota.tipo,
      bienestar: mascota.bienestar
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
