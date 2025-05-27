import { useState } from "react";
import "../styles/formsandinput.css";
import { useNavigate } from "react-router-dom";
import TwitterLogo from "../assets/twitter-logo.svg";

const Login = () => {
  const navigate = useNavigate();
  const goHome = (id) => {
    navigate(`/home/${id}`, { replace: true });
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5001/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        alert("incorrect email or password ");
        return;
      }
      const user = await res.json();
      localStorage.setItem("token", user.token);
      localStorage.setItem("userId", user._id);
      console.log("Login successfull for user:", user.name || user.email);
      goHome(user._id);
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed. Try again.", err);
    }
  };
  return (
    <>
      <div className="login-column">
        <form className="login-form" onSubmit={handleSubmit}>
          <img
            className="logo-container"
            src={TwitterLogo}
            alt="Twitter Logo"
          />
          <h1>Log in to Twitter 2</h1>
          <div className="input-details">
            <strong>E-mail</strong>{" "}
            <input
              className="highlight-input"
              placeholder="Enter your E-mail address.."
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <strong>Password</strong>{" "}
            <input
              className="highlight-input"
              placeholder="Enter your password details.."
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input className="login-btn" type="submit" value="Login" />
          <input
            className="nopassword-btn"
            type="button"
            value="Forgot your password?"
          />
        </form>
      </div>
    </>
  );
};
export default Login;
