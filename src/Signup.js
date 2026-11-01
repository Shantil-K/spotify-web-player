// src/Signup.js
import React, { useState } from "react";
import axios from "axios";
import './signup.css';

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost/react-login-backend/Signup.php", {
        email,
        password,
      });

      if (response.data.success) {
        setMessage("Signup successful!");
        alert("Signup successful!");
        window.location.href = "/login";
      } else {
        setMessage(response.data.message || "Signup failed.");
      }
    } catch (error) {
      console.error("There was an error!", error);
      setMessage("Server error.");
    }
  };

  const redirectToLogin = () => {
    window.location.href = "http://localhost:3000/login";
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignup}>
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
        <div className="form-group">
          <input
            placeholder="Confirm your password..."
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="signup-button">Sign Up</button>
        <button type="button" className="login-redirect-button" onClick={redirectToLogin}>
          Login
        </button>
      </form>
      {message && <p className="signup-message">{message}</p>}
    </div>
  );
}

export default Signup;
