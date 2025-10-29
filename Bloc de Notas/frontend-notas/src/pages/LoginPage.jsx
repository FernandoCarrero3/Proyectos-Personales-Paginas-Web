// src/pages/LoginPage.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import styles from './AuthForm.module.css'; // 1. Importar estilos del formulario
import Spinner from '../components/Spinner'; // 2. Importar Spinner

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // 3. Estado de carga

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true); // 4. Empezar a cargar

    try {
      await login(email, password);
      navigate('/'); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // 5. Dejar de cargar (incluso si hay error)
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Login</h2>

      {/* 6. Mostrar Spinner si está cargando, si no, el formulario */}
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
            {loading ? 'Iniciando...' : 'Iniciar Sesión'}
          </button>
        </form>
      )}

      <p className={styles.link}>
        ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </div>
  );
}

export default LoginPage;