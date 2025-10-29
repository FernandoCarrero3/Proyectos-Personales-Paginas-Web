// src/pages/RegisterPage.jsx
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import styles from './AuthForm.module.css'; // 1. Importar estilos
import Spinner from '../components/Spinner'; // 2. Importar Spinner

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // 3. Estado de carga

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    setLoading(true); // 4. Empezar a cargar

    try {
      await axios.post('http://localhost:4000/api/auth/register', { email, password });
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al registrarse');
    } finally {
      setLoading(false); // 5. Dejar de cargar
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Registro</h2>

      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
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
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? 'Creando...' : 'Crear Cuenta'}
          </button>
        </form>
      )}

      <p className={styles.link}>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
      </p>
    </div>
  );
}

export default RegisterPage;