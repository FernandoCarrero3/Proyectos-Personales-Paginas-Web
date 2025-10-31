// src/pages/Cart.jsx
import React from 'react';
import { useCart } from '../context/CartContext'; 
import { Link } from 'react-router-dom'; // Asegúrate que 'Link' está importado
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa'; 

const Cart = () => {
  const { 
    cartItems, 
    cartTotal, 
    addToCart, 
    decrementItem, 
    removeFromCart 
  } = useCart();

  // Vista para carrito vacío (sin cambios)
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold my-8 text-brand-dark">Your Shopping Cart</h1>
        <p className="text-xl text-gray-600 mb-8">Your cart is currently empty.</p>
        <Link 
          to="/" 
          className="bg-brand-accent text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  // Vista con items (sin cambios en la lista)
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold my-8 text-center text-brand-dark">Your Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Columna Izquierda: Lista de Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-md gap-4">
              {/* Info del Producto */}
              <div className="flex items-center gap-4 w-full md:w-auto">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                <div>
                  <h3 className="text-lg font-bold text-brand-dark">{item.name}</h3>
                  <p className="text-brand-accent font-semibold">${item.price}</p>
                </div>
              </div>

              {/* Controles de Cantidad y Eliminar */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 border border-gray-300 rounded-md p-2">
                  <button 
                    onClick={() => decrementItem(item.id)} 
                    className="text-gray-600 hover:text-brand-dark"
                  >
                    <FaMinus />
                  </button>
                  <span className="font-bold text-lg">{item.quantity}</span>
                  <button 
                    onClick={() => addToCart(item)} 
                    className="text-gray-600 hover:text-brand-dark"
                  >
                    <FaPlus />
                  </button>
                </div>

                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 p-2"
                  title="Remove item" 
                >
                  <FaTrash size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Columna Derecha: Resumen del Pedido */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
            <h2 className="text-2xl font-bold text-brand-dark mb-4">
              Order Summary
            </h2>
            <div className="flex justify-between items-center text-xl font-bold mb-6">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            
            {/* CAMBIO AQUÍ: Convertimos el <button> en un <Link> 
              Mantenemos las mismas clases de Tailwind para que se vea igual.
            */}
            <Link 
              to="/checkout"
              className="w-full inline-block text-center bg-brand-accent text-white py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;