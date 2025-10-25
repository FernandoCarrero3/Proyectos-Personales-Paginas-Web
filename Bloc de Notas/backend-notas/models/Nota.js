const mongoose = require('mongoose');

const notaSchema = new mongoose.Schema({
  
  titulo: {
    type: String,
    required: true
  },
  contenido: {
    type: String,
    required: false
  },
  fecha: {
    type: Date,
    default: Date.now
  },

  // --- ¡NUEVO CAMPO! ---
  // 1. Este campo guardará el ID del usuario que creó la nota.
  user: {
    type: mongoose.Schema.Types.ObjectId, // Es un tipo de dato especial de Mongoose
    ref: 'User', // 2. Le dice a Mongoose que este ID se refiere a un documento del modelo 'User'
    required: true // 3. Hacemos que sea obligatorio. Una nota NO puede existir sin un dueño.
  }
  
});

const Nota = mongoose.model('Nota', notaSchema);

module.exports = Nota;