// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartCount } = useCart();

  return (
    <nav className="bg-brand-light shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-brand-dark">
          Vertice Studio
        </Link>
        <Link to="/cart" className="bg-brand-accent text-white px-4 py-2 rounded hover:bg-opacity-90">
          {/* 3. Usar el valor dinámico */}
          Cart ({cartCount})
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;