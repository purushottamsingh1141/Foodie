import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(""); // Optional: for error popup

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://foodie-g41l.onrender.com/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      setError("❌ Enter valid details.");
      setSuccess(false);
      setTimeout(() => setError(""), 3000);
    } else {
      setSuccess(true);
      setError("");
      setFormData({
        name: "",
        email: "",
        password: "",
        location: "",
      });
      setTimeout(() => {
        setSuccess(false);
        navigate("/login"); // 👈 Redirect after success
      }, 1500);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Address"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Sign Up</button>

        <p className="login-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>

      {/* ✅ Success Message */}
      {success && (
        <div className="success-popup">🎉 Account created successfully!</div>
      )}

      {/* ❌ Optional Error Message */}
      {error && <div className="error-popup">{error}</div>}
    </div>
  );
};

export default Signup;
