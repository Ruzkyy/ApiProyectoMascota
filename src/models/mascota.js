// models/mascota.js
const mongoose = require('mongoose');

const mascotaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  tipo: {
    type: String,
    enum: ['perro', 'gato', 'zorro', 'pinguino'],
    required: true
  },
  bienestar: {
    hambre: { type: Number, default: 100, min: 0, max: 100 },
    energia: { type: Number, default: 100, min: 0, max: 100 },
    diversion: { type: Number, default: 100, min: 0, max: 100 }
  },
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  creadoEn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Mascota', mascotaSchema);
