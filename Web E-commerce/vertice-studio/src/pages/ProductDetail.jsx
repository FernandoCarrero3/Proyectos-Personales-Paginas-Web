// src/pages/ProductDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom'; 
import { products } from '../data';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams(); 
  const product = products.find(p => p.id === Number(id));

  const { addToCart } = useCart();

  if (!product) {
    return <div className="text-center text-2xl mt-12">Product not found.</div>;
  }

  return (
    <div className="container mx-auto p-4 pt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Columna de la Imagen */}
        <div>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Columna de Información */}
        <div>
          <h1 className="text-4xl font-bold text-brand-dark mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-brand-accent mb-6">${product.price}</p>
          <p className="text-lg text-gray-700 mb-8">{product.description}</p>

          <button 
            onClick={() => addToCart(product)}
            className="w-full md:w-auto bg-brand-accent text-white px-10 py-3 rounded-lg text-lg hover:bg-opacity-90 transition-colors"
          >
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;