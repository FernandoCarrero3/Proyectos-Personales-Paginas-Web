// src/pages/RegisterPage.jsx
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  const { login } = useAuth(); // 1. Obtenemos 'login' para iniciar sesión después
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      // 2. Paso 1: Registrar al usuario
      await axios.post('http://localhost:4000/api/auth/register', { 
        email, 
        password 
      });

      // 3. Paso 2: Si el registro fue exitoso, hacer login
      await login(email, password);

      // 4. Paso 3: Redirigir a la página principal
      navigate('/');
    } catch (err) {
      // 5. Capturamos el error (ej. "El email ya está en uso")
      setError(err.response?.data?.mensaje || 'Error al registrarse');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto' }}>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Crear Cuenta</button>
      </form>
      <p>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
      </p>
    </div>
  );
}

export default RegisterPage;