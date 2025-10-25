// 1. Importaciones
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importamos cors
require('dotenv').config();

// Importamos nuestro modelo de Nota
const Nota = require('./models/Nota');

// Importamos nuestro modelo de auth
const authRoutes = require('./routes/auth');

//Importamos nuestro guardia
const authMiddleware = require('./middleware/authMiddleware');

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

// Rutas de Autenticación (se activarán con /api/auth/...)
app.use('/api/auth', authRoutes);

// C.R.U.D: CREATE (Crear)
// Endpoint para CREAR una nueva nota
// Se activará con una petición POST a http://localhost:4000/api/notas
app.post('/api/notas', authMiddleware, async (req, res) => {
  try {
    const { titulo, contenido } = req.body;

    // 1. ¡Aquí está la magia! Obtenemos el ID del usuario
    //    gracias al middleware 'authMiddleware' (que lo puso en req.usuario)
    const userId = req.usuario.id;

    // 2. Creamos una nueva nota usando el Modelo
    const nuevaNota = new Nota({
      titulo,
      contenido,
      user: userId // 3. ¡Añadimos el ID del dueño!
    });

    // 4. Guardamos la nota en la base de datos
    const notaGuardada = await nuevaNota.save();
    res.status(201).json(notaGuardada);

  } catch (error) {
    console.error('Error al crear nota:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});


// C.R.U.D: READ (Leer)
// Endpoint para LEER TODAS las notas
// Se activará con una petición GET a http://localhost:4000/api/notas
app.get('/api/notas', authMiddleware, async (req, res) => {
  try {
    // 1. Obtenemos el ID del usuario logueado
    const userId = req.usuario.id;

    // 2. Usamos el modelo para buscar SOLO las notas
    //    donde el campo 'user' coincida con el ID del usuario.
    const notas = await Nota.find({ user: userId }).sort({ fecha: -1 }); // Opcional: .sort() las ordena por fecha (más nuevas primero)

    // 3. Respondemos con las notas (solo las suyas)
    res.status(200).json(notas);

  } catch (error) {
    console.error('Error al leer notas:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});


// C.R.U.D: UPDATE (Actualizar)
// Endpoint para ACTUALIZAR una nota por su ID
// Se activará con una petición PUT a http://localhost:4000/api/notas/ID_DE_LA_NOTA
app.put('/api/notas/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, contenido } = req.body;
    const userId = req.usuario.id;

    // 1. Buscamos la nota por su ID
    let nota = await Nota.findById(id);

    // 2. Verificamos si la nota existe
    if (!nota) {
      return res.status(404).json({ mensaje: 'Nota no encontrada' });
    }

    // 3. ¡VERIFICACIÓN DE PROPIEDAD!
    //    Comparamos el 'user' de la nota (que es un ObjectId)
    //    con el 'userId' del token (que es un string).
    if (nota.user.toString() !== userId) {
      return res.status(401).json({ mensaje: 'No autorizado. Esta nota no le pertenece.' });
    }

    // 4. Si todo es correcto, actualizamos la nota
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
app.delete('/api/notas/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.usuario.id;

    // 1. Buscamos la nota por su ID
    let nota = await Nota.findById(id);

    // 2. Verificamos si la nota existe
    if (!nota) {
      return res.status(404).json({ mensaje: 'Nota no encontrada' });
    }

    // 3. ¡VERIFICACIÓN DE PROPIEDAD!
    if (nota.user.toString() !== userId) {
      return res.status(401).json({ mensaje: 'No autorizado. Esta nota no le pertenece.' });
    }

    // 4. Si todo es correcto, la eliminamos
    await Nota.findByIdAndDelete(id);
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