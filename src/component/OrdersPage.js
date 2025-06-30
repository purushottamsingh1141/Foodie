import React, { useEffect, useState } from "react";
import "./OrdersPage.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <div className="orders-page">
      <h2>📦 Past Orders</h2>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        orders.map((order, index) => {
          // ✅ Calculate total for this order
          const totalAmount = order.items.reduce(
            (sum, item) => sum + item.basePrice * item.qty,
            0
          );

          return (
            <div className="order-card" key={index}>
              <h4>
                Order #{index + 1} - {order.date}
              </h4>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} ({item.variant}) × {item.qty} = ₹
                    {item.basePrice * item.qty}
                  </li>
                ))}
              </ul>
              <h5 style={{ textAlign: "right", marginTop: "8px" }}>
                Total: ₹{totalAmount}
              </h5>
            </div>
          );
        })
      )}
    </div>
  );
};

export default OrdersPage;
