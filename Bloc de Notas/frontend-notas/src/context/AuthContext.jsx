// src/context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// 1. Creamos el Contexto
const AuthContext = createContext();

// 2. Creamos un "hook" personalizado para usar el contexto más fácil
//    En lugar de usar useContext(AuthContext) en cada componente,
//    usaremos useAuth()
export const useAuth = () => {
    return useContext(AuthContext);
};

// 3. Creamos el "Proveedor" del contexto
//    Este es el componente que "envolverá" nuestra app
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token')); // 4. Estado para el token
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token')); // 5. Estado para saber si está autenticado

    // 6. Efecto para actualizar el estado si el token cambia
    useEffect(() => {
        // Si el token existe en el localStorage, estamos autenticados
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
            // Configuramos axios para que envíe el token en TODAS las peticiones
            axios.defaults.headers.common['x-auth-token'] = storedToken;
        } else {
            // Si no, nos aseguramos de que no estamos autenticados
            setToken(null);
            setIsAuthenticated(false);
            delete axios.defaults.headers.common['x-auth-token'];
        }
    }, [token]); // Se ejecuta cuando 'token' cambia

    // 7. Función de Login
    const login = async (email, password) => {
        try {
            const res = await axios.post('http://localhost:4000/api/auth/login', { email, password });
            const { token } = res.data;

            // Guardamos el token en el localStorage (para que no se borre al recargar)
            localStorage.setItem('token', token);
            // Actualizamos el estado del token (esto disparará el useEffect)
            setToken(token);
        } catch (error) {
            console.error('Error en el login:', error.response.data.mensaje);
            // Lanzamos el error para que el formulario de login pueda cogerlo
            throw new Error(error.response.data.mensaje || 'Error al iniciar sesión');
        }
    };

    // 8. Función de Logout
    const logout = () => {
        // Borramos el token del localStorage
        localStorage.removeItem('token');
        // Actualizamos el estado (esto disparará el useEffect)
        setToken(null);
    };

    // 9. Los "valores" que el globo de datos compartirá con la app
    const value = {
        token,
        isAuthenticated,
        login,
        logout
        // (Podríamos añadir 'register' aquí también, si quisiéramos)
    };

    // 10. Retornamos el Proveedor con los valores
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};