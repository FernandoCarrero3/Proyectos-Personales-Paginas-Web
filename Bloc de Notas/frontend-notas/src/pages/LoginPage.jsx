// src/pages/LoginPage.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Para mostrar errores de login
  
  const { login } = useAuth(); // 1. Obtenemos la función 'login' del contexto
  const navigate = useNavigate(); // 2. Hook para redirigir

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Limpiamos errores anteriores

    try {
      // 3. Llamamos a la función 'login' del contexto
      await login(email, password);
      
      // 4. Si tiene éxito, redirigimos a la página principal
      navigate('/'); 
    } catch (err) {
      // 5. Si falla (desde el AuthContext), mostramos el error
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto' }}>
      <h2>Login</h2>
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
        <button type="submit">Iniciar Sesión</button>
      </form>
      <p>
        ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </div>
  );
}

export default LoginPage;