import React, { useContext } from "react";
import { CartContext } from "../component/CartContext";

const CartPage = () => {
  const { cart, dispatch } = useContext(CartContext);

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.img} alt={item.name} />
              <div>
                <h4>{item.name}</h4>
                <p>Variant: {item.variant}</p>
                <p>Price: ₹{item.price}</p>
                <p>Qty: {item.qty}</p>
                <button
                  onClick={() =>
                    dispatch({ type: "INCREMENT", payload: index })
                  }
                >
                  +
                </button>
                <button
                  onClick={() =>
                    dispatch({ type: "DECREMENT", payload: index })
                  }
                >
                  -
                </button>
                <button
                  onClick={() => dispatch({ type: "REMOVE", payload: index })}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <h3>Total: ₹{getTotal()}</h3>
        </div>
      )}
    </div>
  );
};

export default CartPage;
