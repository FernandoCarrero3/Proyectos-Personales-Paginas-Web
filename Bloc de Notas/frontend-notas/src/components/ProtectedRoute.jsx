// src/components/ProtectedRoute.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

// Este componente actuará como un "envoltorio" (wrapper)
// Recibe 'children', que en nuestro caso será la <NotasPage />
function ProtectedRoute({ children }) {

  // 1. Obtenemos el estado de autenticación de nuestro contexto
  const { isAuthenticated } = useAuth();

  // 2. Comprobamos si el usuario NO está autenticado
  if (!isAuthenticated) {
    // 3. Si no lo está, lo redirigimos a "/login"
    //    'replace' evita que el usuario pueda volver atrás con
    //    el botón del navegador a la página que intentaba visitar.
    return <Navigate to="/login" replace />;
  }

  // 4. Si SÍ está autenticado, simplemente mostramos el componente
  //    hijo (es decir, la <NotasPage />)
  return children;
}

export default ProtectedRoute;