import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials), // ✅ Corrected here
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      setSuccess(true);
      setError("");
      localStorage.setItem("authToken", json.authToken);
      setTimeout(() => {
        setSuccess(false);
        navigate("/"); // Redirect to homepage after success
      }, 500);
    } else {
      setError("❌ Invalid Email or Password");
      setSuccess(false);
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login to Foodie</h2>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={credentials.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>

          <p className="signup-link">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>

        {success && (
          <div className="success-popup">🎉 Logged in successfully!</div>
        )}

        {error && <div className="error-popup">{error}</div>}
      </div>
    </>
  );
};

export default Login;
