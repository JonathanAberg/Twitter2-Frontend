import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // DEVELOPMENT MODE: Skip real API call and use mock login
    console.log("DEV MODE: Using mock login");

    // Create a mock user in localStorage
    const mockUser = {
      _id: "dev123",
      name: "Development User",
      username: "devuser",
      email: email,
    };

    // Save to localStorage for persistence
    localStorage.setItem("user", JSON.stringify(mockUser));

    // Navigate to home page
    navigate("/"); // Changed from /home/{id} to root route

    /* Original code - commented out during development
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        alert("incorrect email or password ");
        return;
      }
      const user = await res.json();
      navigate(`/home/${user._id}`);
      console.log("good ");
    } catch (err) {
      alert("Login failed. Try again.");
    }
    */
  };

  // Add a dev mode quick login button
  const handleDevModeLogin = (e) => {
    e.preventDefault();

    const mockUser = {
      _id: "dev123",
      name: "Development User",
      username: "devuser",
      email: "dev@example.com",
    };

    localStorage.setItem("user", JSON.stringify(mockUser));
    navigate("/");
  };

  return (
    <div className="login-container">
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <p>
          email{" "}
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </p>
        <p>
          password{" "}
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </p>
        <input type="submit" value={"log in"} />
      </form>

      {/* Development mode quick login button */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={handleDevModeLogin}
          style={{
            backgroundColor: "#ff9800",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          DEV MODE: Quick Login
        </button>
      </div>

      <p style={{ textAlign: "center", marginTop: "15px" }}>
        Don't have an account? <Link to="/register">Sign up</Link>
      </p>
    </div>
  );
};

export default LoginPage;
