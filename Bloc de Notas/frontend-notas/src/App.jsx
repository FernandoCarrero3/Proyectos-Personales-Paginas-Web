// src/App.jsx
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

// 1. Importamos useAuth
import { useAuth } from './context/AuthContext';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotasPage from './pages/NotasPage';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  // 2. Obtenemos el estado de autenticación y la función 'logout'
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // 3. Creamos una función para manejar el logout
  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirigimos al login después de salir
  };

  return (
    <div className='app-container'>
      <header>
        <h1>Mi Bloc de Notas Full-Stack</h1>
        <nav>
          {/* 4. Lógica condicional para la navegación */}
          {isAuthenticated ? (
            // Si está autenticado
            <>
              <Link to="/">Mis Notas</Link>
              {/* Usamos un <span> que parece un link para llamar a la función.
                También podrías usar un <button>
              */}
              <span
                onClick={handleLogout}
                style={{ cursor: 'pointer', marginLeft: '15px', color: '#e74c3c' }}
              >
                Logout
              </span>
            </>
          ) : (
            // Si NO está autenticado
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" style={{ marginLeft: '15px' }}>Registro</Link>
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