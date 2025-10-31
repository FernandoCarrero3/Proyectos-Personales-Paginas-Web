// src/pages/Home.jsx
import React from 'react';
import { products } from '../data'; // 1. Importar nuestros productos
import ProductCard from '../components/ProductCard'; // 2. Importar la tarjeta

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-8 text-brand-dark">
        Our Products
      </h1>

      {/* 3. El Grid de Productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* 4. Hacemos un "map" sobre los datos y creamos una tarjeta por cada producto */}
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;