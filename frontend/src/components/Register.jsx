import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TwitterLogo from "../assets/twitter-logo.svg";
import "../styles/formsandinput.css";
import "../styles/loginselect.css";
import "../styles/authforms.css";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const newUser = { name, email, password };
      const response = await fetch("http://localhost:5001/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      localStorage.setItem("token", data.token);
      setEmail("");
      setName("");
      setPassword("");
      setConfirmPassword("");
      navigate("/login");
    } catch (_err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="loginselect-wrapper">
      <div className="image-container">
        <img src={TwitterLogo} alt="Twitter Logo" />
      </div>
      <h1 className="welcome-heading">Create your account</h1>

      {error && <div className="error-message">{error}</div>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            className="form-input"
            placeholder="Name"
            type="text"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            className="form-input"
            placeholder="E-mail"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            className="form-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
        </div>

        <div className="form-group">
          <input
            className="form-input"
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={8}
          />
        </div>

        <button className="twitter-button primary-button" type="submit">
          Sign Up
        </button>
      </form>

      <p className="no-account">
        Already have an account? <Link to={"/login"}>Log in</Link>
      </p>

      <div className="footer-links">
        <a href="#">About</a>
        <a href="#">Help Center</a>
        <a href="#">Terms of Service</a>
        <a href="#">Privacy Policy</a>
      </div>
    </div>
  );
};

export default Register;
