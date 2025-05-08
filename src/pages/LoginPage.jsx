import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css"; // Add this if you have styles for login page

const LoginPage = ({ data }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
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
  };

  return (
    <>
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
    </>
  );
};

export default LoginPage; // Changed from Inloggning to LoginPage
