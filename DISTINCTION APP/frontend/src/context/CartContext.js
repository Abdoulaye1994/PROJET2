import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();
export { CartContext };

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingItem = cart.find(item => 
      item.id === product.id && 
      item.variant?.size === product.variant?.size && 
      item.variant?.range === product.variant?.range && 
      item.variant?.color === product.variant?.color
    );

    if (existingItem) {
      setCart(prev => prev.map(item => 
        item.id === product.id && 
        item.variant?.size === product.variant?.size && 
        item.variant?.range === product.variant?.range && 
        item.variant?.color === product.variant?.color
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart(prev => [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  const removeFromCart = (product) => {
    setCart(prev => prev.filter(item => 
      !(item.id === product.id && 
        item.variant?.size === product.variant?.size && 
        item.variant?.range === product.variant?.range && 
        item.variant?.color === product.variant?.color)
    ));
  };

  const updateQuantity = (product, quantity) => {
    setCart(prev => 
      prev.map(item => 
        item.id === product.id && 
        item.variant?.size === product.variant?.size && 
        item.variant?.range === product.variant?.range && 
        item.variant?.color === product.variant?.color
          ? { ...item, quantity }
          : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
