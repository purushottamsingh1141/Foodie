// component/CartContext.js

import { createContext, useReducer } from "react";

// Create the context
export const CartContext = createContext();

// Reducer function to handle cart actions
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      // Check if item with same ID and variant exists
      const existingIndex = state.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.variant === action.payload.variant
      );

      if (existingIndex !== -1) {
        // Item already in cart, update quantity and price
        const updatedCart = [...state];
        updatedCart[existingIndex].qty += action.payload.qty;
        updatedCart[existingIndex].price += action.payload.price;
        return updatedCart;
      } else {
        // New item
        return [...state, action.payload];
      }

    case "REMOVE":
      // Remove item by index
      return state.filter((_, index) => index !== action.index);

    case "CLEAR":
      // Clear the entire cart
      return [];

    default:
      return state;
  }
};

// Provider component to wrap around your app
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartContext.Provider value={{ cart: state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
