import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../component/CartContext";
import "./CardPage.css"; // Make sure this file exists

const CartPage = () => {
  const { cart, dispatch } = useContext(CartContext);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  // 🧮 Calculate totals safely as numbers
  const totalItems = cart.reduce((total, item) => total + Number(item.qty), 0);
  const totalPrice = cart.reduce((sum, item) => sum + Number(item.price), 0);

  const handleRemove = (index) => {
    dispatch({ type: "REMOVE", index });
  };

  const handlePlaceOrder = () => {
    // Save to localStorage
    const previousOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const newOrder = {
      items: cart,
      date: new Date().toLocaleString(),
    };
    localStorage.setItem(
      "orders",
      JSON.stringify([...previousOrders, newOrder])
    );

    // Clear cart
    dispatch({ type: "CLEAR" });

    // Show success animation
    setShowSuccess(true);

    // Redirect after 2 seconds
    setTimeout(() => {
      navigate("/orders");
    }, 2000);
  };

  return (
    <>
      <div className="cart-page">
        <h2>Your Cart</h2>

        {showSuccess && (
          <div className="order-success">🎉 Order Placed Successfully!</div>
        )}

        <div className="cart-summary">
          <p>
            🛒{" "}
            <strong>
              You have {totalItems} item{totalItems !== 1 && "s"} in your cart
            </strong>
          </p>
        </div>

        {cart.length === 0 ? (
          <p className="cart-empty">Your cart is empty</p>
        ) : (
          <>
            <ul>
              {cart.map((item, index) => (
                <li key={index}>
                  <div>
                    <strong>{item.name}</strong> - {item.variant}
                    <br />₹{item.price} × {item.qty}
                  </div>
                  <button onClick={() => handleRemove(index)}>Remove</button>
                </li>
              ))}
            </ul>

            <p>
              💰 <strong>Total Price: ₹{totalPrice}</strong>
            </p>

            <button className="place-order-button" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default CartPage;
