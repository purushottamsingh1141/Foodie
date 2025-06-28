import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // 👈 detect route changes

  // 🔁 Re-check login status whenever route changes
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, [location]); // 👈 runs when route (path) changes

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">🍔 Foodie</div>

      <ul className={`nav-links`}>
        {isLoggedIn && (
          <li>
            <Link to="/menu">Menu</Link>
          </li>
        )}
        <li>
          <Link to="/">Home</Link>
        </li>
        {isLoggedIn && (
          <>
            <li>
              <Link to="/orders">Orders</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </>
        )}
      </ul>

      <div className="auth-buttons">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="auth-link">
              Login
            </Link>

            <Link to="/signup" className="auth-link">
              Signup
            </Link>
          </>
        ) : (
          <button onClick={handleLogout} className="logout-btn" id="auth-link">
            Logout
          </button>
        )}
      </div>

      <div className="hamburger" onClick={() => {}}>
        ☰
      </div>
    </nav>
  );
};

export default Navbar;
