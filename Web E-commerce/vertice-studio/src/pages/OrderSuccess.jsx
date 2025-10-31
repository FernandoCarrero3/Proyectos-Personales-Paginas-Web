// src/pages/OrderSuccess.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa'; // Un icono bonito

const OrderSuccess = () => {
  return (
    <div className="container mx-auto p-4 text-center max-w-2xl">
      <div className="bg-white p-10 rounded-lg shadow-md mt-16 inline-block">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-brand-dark mb-4">
          Thank you for your order!
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Your payment was successful and your order is confirmed.
        </p>
        <Link 
          to="/" 
          className="bg-brand-accent text-white px-8 py-3 rounded-lg text-lg hover:bg-opacity-90 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;