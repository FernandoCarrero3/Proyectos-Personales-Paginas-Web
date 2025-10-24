// 1. Importaciones
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importamos cors
require('dotenv').config();

// Importamos nuestro modelo de Nota
const Nota = require('./models/Nota'); 

// 2. Variables de configuración
const app = express();
const PUERTO = process.env.PUERTO || 4000;
const MONGO_URI = process.env.MONGO_URI;

// 3. Middlewares
// Middleware para permitir que el front-end se conecte (CORS)
app.use(cors()); 
// Middleware para que Express entienda el JSON que le envía el front-end
app.use(express.json()); 

// 4. Conexión a la Base de Datos
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Conexión a MongoDB exitosa');
    
    // Arrancamos el servidor solo si la DB está conectada
    app.listen(PUERTO, () => {
      console.log(`Servidor escuchando en el puerto ${PUERTO}`);
    });
  })
  .catch(err => {
    console.error('Error al conectar a MongoDB:', err);
  });

// ----------------------------------------------
// 5. RUTAS DE NUESTRA API (AQUÍ ESTÁ EL CRUD)
// ----------------------------------------------

// C.R.U.D: CREATE (Crear)
// Endpoint para CREAR una nueva nota
// Se activará con una petición POST a http://localhost:4000/api/notas
app.post('/api/notas', async (req, res) => {
  try {
    // req.body contiene el JSON que nos envía el front-end (React)
    const { titulo, contenido } = req.body;

    // Creamos una nueva nota usando el Modelo
    const nuevaNota = new Nota({
      titulo,
      contenido
    });

    // Guardamos la nota en la base de datos
    const notaGuardada = await nuevaNota.save();

    // Respondemos al front-end con la nota recién guardada (y un estado 201: Creado)
    res.status(201).json(notaGuardada);

  } catch (error) {
    console.error('Error al crear nota:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});


// C.R.U.D: READ (Leer)
// Endpoint para LEER TODAS las notas
// Se activará con una petición GET a http://localhost:4000/api/notas
app.get('/api/notas', async (req, res) => {
  try {
    // Usamos el modelo para buscar todas las notas en la DB
    const notas = await Nota.find(); // .find() sin argumentos trae todo

    // Respondemos con todas las notas en formato JSON
    res.status(200).json(notas);

  } catch (error) {
    console.error('Error al leer notas:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});


// C.R.U.D: UPDATE (Actualizar)
// Endpoint para ACTUALIZAR una nota por su ID
// Se activará con una petición PUT a http://localhost:4000/api/notas/ID_DE_LA_NOTA
app.put('/api/notas/:id', async (req, res) => {
  try {
    // req.params.id contiene el ID que viene en la URL
    const { id } = req.params; 

    // req.body contiene la nueva información a actualizar
    const { titulo, contenido } = req.body;

    // Buscamos la nota por su ID y la actualizamos
    // { new: true } hace que nos devuelva la nota actualizada, no la vieja
    const notaActualizada = await Nota.findByIdAndUpdate(
      id, 
      { titulo, contenido }, 
      { new: true }
    );

    res.status(200).json(notaActualizada);

  } catch (error) {
    console.error('Error al actualizar nota:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});


// C.R.U.D: DELETE (Borrar)
// Endpoint para BORRAR una nota por su ID
// Se activará con una petición DELETE a http://localhost:4000/api/notas/ID_DE_LA_NOTA
app.delete('/api/notas/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Buscamos la nota por ID y la borramos
    await Nota.findByIdAndDelete(id);

    // Respondemos con un mensaje de éxito
    res.status(200).json({ mensaje: 'Nota eliminada correctamente' });

  } catch (error) {
    console.error('Error al eliminar nota:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});


// Ruta de bienvenida (la que teníamos antes)
app.get('/', (req, res) => {
  res.send('API del Bloc de Notas funcionando');
});