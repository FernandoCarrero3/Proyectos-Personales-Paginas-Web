const mongoose = require('mongoose');

// Un "Esquema" (Schema) es el plano de cómo se verá un documento en la base de datos
const notaSchema = new mongoose.Schema({
  // Definimos los campos que tendrá una nota

  titulo: {
    type: String,
    required: true // El título será obligatorio
  },
  contenido: {
    type: String,
    required: false // El contenido es opcional
  },
  fecha: {
    type: Date,
    default: Date.now // Si no nos dan fecha, pone la fecha actual
  }
});

// Creamos el "Modelo" a partir del esquema.
// Mongoose tomará el nombre "Nota" y creará una colección en la DB llamada "notas" (en plural y minúscula)
const Nota = mongoose.model('Nota', notaSchema);

// Exportamos el modelo para poder usarlo en otros archivos (como en index.js)
module.exports = Nota;