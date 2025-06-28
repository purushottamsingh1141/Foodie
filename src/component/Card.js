import React, { useState, useContext } from "react";
import { CartContext } from "./CartContext";
import "./Card.css";

const Card = ({ foodItem }) => {
  const { dispatch } = useContext(CartContext);

  // ✅ Setup default empty options first to avoid hook condition error
  const options = foodItem?.options?.[0] || {};
  const priceOptions = Object.keys(options);
  const [selectedSize, setSelectedSize] = useState(priceOptions[0] || "");

  if (!foodItem) return null; // ✅ Now safe after hooks

  const handleAddToCart = () => {
    dispatch({
      type: "ADD",
      payload: {
        id: foodItem._id,
        name: foodItem.name,
        img: foodItem.img,
        qty: 1,
        variant: selectedSize,
        basePrice: options[selectedSize],
        price: options[selectedSize],
      },
    });
  };

  return (
    <div className="food-card">
      <img
        src={foodItem.img || "https://via.placeholder.com/150"}
        alt={foodItem.name || "Food"}
        className="food-image"
      />
      <h3 className="food-name">{foodItem.name}</h3>

      <select
        className="select"
        value={selectedSize}
        onChange={(e) => setSelectedSize(e.target.value)}
      >
        {priceOptions.map((size) => (
          <option key={size} value={size}>
            {size} - ₹{options[size]}
          </option>
        ))}
      </select>

      <div className="food-footer">
        <span className="food-price">₹{options[selectedSize]}</span>
        <button className="add-to-cart" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
