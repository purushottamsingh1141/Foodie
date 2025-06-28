import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section about">
            <h2>🍔 Foodie</h2>
            <p>
              Delivering delicious meals to your door — fast, fresh, and hot.
            </p>
          </div>

          <div className="footer-section links">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/menu">Menu</Link>
              </li>
              <li>
                <Link to="/order">Orders</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section contact">
            <h3>Contact Us</h3>
            <p>Email: support@foodie.com</p>
            <p>Phone: +91 98765 43210</p>
            <p>Location: Lucknow, India</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Foodie. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
