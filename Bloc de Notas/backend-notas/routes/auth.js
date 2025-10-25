// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // 1. Importamos bcrypt
const jwt = require('jsonwebtoken'); // 1. ¡Importamos jsonwebtoken!

// 2. Importamos el modelo de Usuario que creamos
const User = require('../models/User');

// ----------------------------------------------
// RUTA DE REGISTRO: POST /api/auth/register
// ----------------------------------------------
router.post('/register', async (req, res) => {
    try {
        // 3. Obtenemos el email y la contraseña del cuerpo (body) de la petición
        const { email, password } = req.body;

        // 4. Validamos los datos (simple)
        if (!email || !password) {
            return res.status(400).json({ mensaje: 'Email y contraseña son requeridos' });
        }
        if (password.length < 6) {
            return res.status(400).json({ mensaje: 'La contraseña debe tener al menos 6 caracteres' });
        }

        // 5. Verificamos si el email ya existe en la base de datos
        const usuarioExistente = await User.findOne({ email: email });
        if (usuarioExistente) {
            // 400 = Bad Request (el usuario hizo algo mal)
            return res.status(400).json({ mensaje: 'El email ya está en uso' });
        }

        // 6. ¡Encriptamos la contraseña!
        //    genSalt(10) genera un "ruido" aleatorio. 10 es el coste (más alto, más seguro pero más lento)
        const salt = await bcrypt.genSalt(10);
        //    hash() combina la contraseña del usuario con el "ruido" (salt)
        const hashedPassword = await bcrypt.hash(password, salt);

        // 7. Creamos el nuevo usuario con la contraseña encriptada
        const nuevoUsuario = new User({
            email: email,
            password: hashedPassword // ¡Guardamos la encriptada, no la original!
        });

        // 8. Guardamos el usuario en la base de datos
        const usuarioGuardado = await nuevoUsuario.save();

        // 9. Respondemos al front-end
        //    (No enviamos la contraseña de vuelta, ni siquiera la encriptada)
        //    201 = Creado
        res.status(201).json({
            _id: usuarioGuardado._id,
            email: usuarioGuardado.email
        });

    } catch (error) {
        console.error('Error en el registro:', error);
        // 500 = Error Interno del Servidor
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
});

// ----------------------------------------------
// RUTA DE LOGIN: POST /api/auth/login
// ----------------------------------------------
router.post('/login', async (req, res) => {
    try {
        // 2. Obtenemos el email y la contraseña del body
        const { email, password } = req.body;

        // 3. Validamos (simple)
        if (!email || !password) {
            return res.status(400).json({ mensaje: 'Email y contraseña son requeridos' });
        }

        // 4. Buscamos al usuario por su email
        const usuario = await User.findOne({ email: email });
        if (!usuario) {
            // Si el usuario NO existe, damos un error genérico
            // Por seguridad, no decimos "El usuario no existe"
            return res.status(400).json({ mensaje: 'Credenciales inválidas' });
        }

        // 5. Comparamos la contraseña enviada con la encriptada en la BD
        //    bcrypt.compare() hace la magia de comparar la contraseña plana (password)
        //    con la encriptada (usuario.password)
        const esMatch = await bcrypt.compare(password, usuario.password);

        if (!esMatch) {
            // Si las contraseñas NO coinciden, damos el mismo error genérico
            return res.status(400).json({ mensaje: 'Credenciales inválidas' });
        }

        // 6. ¡ÉXITO! El usuario es válido. Ahora creamos el Token.

        //    El 'payload' es la información que guardaremos DENTRO del token
        //    Solo guardamos el ID del usuario, es suficiente.
        const payload = {
            usuario: {
                id: usuario._id
            }
        };

        // 7. Firmamos el token
        jwt.sign(
            payload,
            process.env.JWT_SECRET, // Usamos la 'frase secreta' del .env
            { expiresIn: '1h' }, // El token expirará en 1 hora
            (error, token) => {
                if (error) throw error;

                // 8. Enviamos el token al front-end
                res.status(200).json({ token });
            }
        );

    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
});

module.exports = router;