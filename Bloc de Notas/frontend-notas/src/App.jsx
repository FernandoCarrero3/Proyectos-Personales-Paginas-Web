// src/App.jsx
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; 
import styles from './App.module.css'; // 1. Importar estilos

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotasPage from './pages/NotasPage';
import ProtectedRoute from './components/ProtectedRoute'; 

function App() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className='app-container'>
      {/* 2. Aplicar estilos al header y nav */}
      <header className={styles.header}>
        <h1>Mi Bloc de Notas</h1>
        <nav className={styles.nav}>
          {isAuthenticated ? (
            <>
              <Link to="/">Mis Notas</Link>
              <span 
                onClick={handleLogout} 
                className={styles.logoutButton}
              >
                Logout
              </span>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Registro</Link>
            </>
          )}
        </nav>
      </header>

      <main>
        <Routes>
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <NotasPage />
              </ProtectedRoute>
            } 
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;