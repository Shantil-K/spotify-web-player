// src/Login.js
import React, { useState } from "react";
import axios from "axios";
import './login.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost/react-login-backend/login.php", {
        email,
        password,
      });

      if (response.data.success) {
        setMessage("Login successful!");
        alert("Login successful!");
        
        // Redirect if redirect_url is provided in the response
        if (response.data.redirect_url) {
          window.location.href = response.data.redirect_url;
        }
      } else {
        setMessage("Invalid email or password.");
        alert("Invalid Email or Password");
      }
    } catch (error) {
      console.error("There was an error!", error);
      setMessage("Server error.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title"></h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <input
            placeholder="Enter your email..."
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            placeholder="Enter your password..."
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
      {message && <p className="login-message">{message}</p>}
    </div>
  );
}

export default Login;
