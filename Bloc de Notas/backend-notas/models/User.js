const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // El email debe ser único
    lowercase: true, // Guardamos todo en minúsculas
    trim: true // Quita espacios en blanco al inicio y final
  },
  password: {
    type: String,
    required: true,
    minlength: 6 // Mínimo 6 caracteres
  }
});

// Creamos el modelo "User"
const User = mongoose.model('User', userSchema);

module.exports = User;