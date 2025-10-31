// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom'; 

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail'; 
import Cart from './pages/Cart';
import Checkout from './pages/Checkout'; // <-- 1. Importar
import OrderSuccess from './pages/OrderSuccess'; // <-- 2. Importar

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-light text-brand-dark">
      <Navbar />
      <main className="flex-grow">
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} /> {/* <-- 3. Añadir ruta */}
          <Route path="/order-success" element={<OrderSuccess />} /> {/* <-- 4. Añadir ruta */}
        </Routes>
        
      </main>
      <Footer />
    </div>
  );
}

export default App;