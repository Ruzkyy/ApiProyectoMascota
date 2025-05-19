const express = require("express");
const router = express.Router();
const Historial = require("../models/historial");

// Obtener historial de una mascota
router.get("/mascotas/:id/historial", async (req, res) => {
  try {
    const historial = await Historial.find({ mascotaId: req.params.id }).sort({ fecha: -1 });
    res.json(historial);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




module.exports = router;
