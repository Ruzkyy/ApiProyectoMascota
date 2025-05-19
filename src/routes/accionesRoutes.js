const express = require("express");
const router = express.Router();
const Mascota = require("../models/mascota");
const Historial = require("../models/historial");


// Acción: Comer
router.post("/mascotas/:id/comer", async (req, res) => {
  try {
    const mascota = await Mascota.findById(req.params.id);
    mascota.bienestar.hambre = Math.min(100, mascota.bienestar.hambre + 20);
    mascota.bienestar.diversion = Math.max(0, mascota.bienestar.diversion - 10);
    await mascota.save();
    await new Historial({ mascotaId: mascota._id, accion: 'comer' }).save();
    res.json(mascota);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Acción: Dormir
router.post("/mascotas/:id/dormir", async (req, res) => {
  const { id } = req.params;
  const { horas } = req.body;

  const energiaGanada = {
    1: 10,
    4: 30,
    7: 60
  };

  if (![1, 4, 7].includes(horas)) {
    return res.status(400).json({ message: "Las horas deben ser 1, 4 o 7" });
  }

  try {
    const mascota = await Mascota.findById(id);
    if (!mascota) {
      return res.status(404).json({ message: "Mascota no encontrada" });
    }

    mascota.bienestar.energia = Math.min(
      mascota.bienestar.energia + energiaGanada[horas],
      100
    );
    await mascota.save();

    res.json({
      message: `La mascota durmió ${horas} hora(s) y recuperó energía.`,
      energiaActual: mascota.bienestar.energia
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Acción: Jugar
router.post("/mascotas/:id/jugar", async (req, res) => {
  try {
    const mascota = await Mascota.findById(req.params.id);
    mascota.bienestar.diversion = Math.min(100, mascota.bienestar.diversion + 20);
    mascota.bienestar.energia = Math.max(0, mascota.bienestar.energia - 15);
    await mascota.save();
    await new Historial({ mascotaId: mascota._id, accion: 'comer' }).save();
    res.json(mascota);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
