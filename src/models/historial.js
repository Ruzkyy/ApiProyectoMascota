const mongoose = require('mongoose');

const historialSchema = new mongoose.Schema({
  mascotaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mascota', required: true },
  accion: { type: String, enum: ['comer', 'dormir', 'jugar'], required: true },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Historial', historialSchema);
