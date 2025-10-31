// src/context/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Crear el Contexto
const CartContext = createContext();

// 2. Crear el Proveedor (Provider)
export const CartProvider = ({ children }) => {

  // 3. El Estado
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem('cartItems');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Could not parse cart data:", error);
      return [];
    }
  });

  // 4. Efecto para guardar en localStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // 5. Funciones (Acciones)

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);

      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => 
      prevItems.filter(item => item.id !== productId)
    );
  };

  const decrementItem = (productId) => {
    setCartItems(prevItems => 
      prevItems.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity - 1;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      }).filter(item => item !== null) 
    );
  };

  // 6. NUEVA FUNCIÓN
  const clearCart = () => {
    setCartItems([]);
  };

  // 7. Datos Derivados (Getters)
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  // 8. El valor que proveeremos
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    decrementItem,
    clearCart, // <-- AÑADIDO AQUÍ
    cartCount,
    cartTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// 9. Hook Personalizado (Custom Hook)
export const useCart = () => {
  return useContext(CartContext);
};