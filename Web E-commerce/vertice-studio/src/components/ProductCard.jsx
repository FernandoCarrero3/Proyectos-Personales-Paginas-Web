// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // <-- 1. Importar el hook

// 'product' es un "prop" que pasaremos desde Home.jsx
const ProductCard = ({ product }) => {
  const { id, name, price, image } = product;
  const { addToCart } = useCart(); // <-- 2. Obtener la función addToCart

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link to={`/product/${id}`}>
        {/* Aspect-ratio es genial para que todas las imágenes se vean uniformes */}
        <img 
          src={image} 
          alt={name} 
          className="w-full h-64 object-cover" 
        />
      </Link>
      <div className="p-4 bg-white">
        <h3 className="text-lg font-semibold text-brand-dark">{name}</h3>
        <p className="text-xl font-bold text-brand-accent my-2">${price}</p>

        {/* 3. Envolvemos los botones en un div para que se ordenen bien */}
        <div className="mt-4 space-y-2">
          <Link 
            to={`/product/${id}`} // Esto navega a /product/1, /product/2, etc.
            className="w-full text-center inline-block bg-brand-dark text-white px-4 py-2 rounded hover:bg-opacity-90"
          >
            View Details
          </Link>

          <button
            onClick={() => addToCart(product)}
            className="w-full text-center inline-block bg-brand-accent text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors"
          >
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductCard;