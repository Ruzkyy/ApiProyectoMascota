//models/user.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  contraseña: {
    type: String,
    required: true
  },
  fechaRegistro: {
    type: Date,
    default: Date.now
  }
});


usuarioSchema.methods.encryptContraseña = async (clave) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(clave, salt);
}


// Método para comparar contraseñas
usuarioSchema.methods.compararContraseña = function (contraseñaIngresada) {
  return bcrypt.compare(contraseñaIngresada, this.contraseña);
};

module.exports = mongoose.model('Usuario', usuarioSchema);
