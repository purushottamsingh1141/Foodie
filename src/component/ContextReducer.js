import React, { Children, createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {};

export const CartProvider = ({ Children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {Children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
