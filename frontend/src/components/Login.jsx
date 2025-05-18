import { useState } from "react";
import "../styles/formsandinput.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const goHome = (id) => {
    navigate(`/home/${id}`);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5001/user/login", {
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
      goHome(user._id);
      console.log("good ");
    } catch (err) {
      alert("Login failed. Try again.", err);
    }
  };
  return (
    <>
      <div className="login-column">
      <form className="login-form" onSubmit={handleSubmit}>
      <h1>Log in</h1>
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
        <input className="login-btn" type="submit" value="Login" />
      </form>
      </div>
    </>
  );
};
export default Login;
