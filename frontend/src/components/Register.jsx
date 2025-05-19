import "../styles/formsandinput.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { name, email, password };
    const response = await fetch("http://localhost:5001/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    }).then((res) => res.json());

    alert("correct");
    localStorage.setItem("token", response.token);
    setEmail("");
    setName("");
    setPassword("");
    navigate("/login");
  };
  return (
    <>
      <div className="signup-column">
        <h1>Sign up</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="name">
            <input
              className="highlight-input"
              placeholder="Name"
              type="text"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label htmlFor="email">
            <input
              className="highlight-input"
              placeholder="E-mail"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label htmlFor="password">
            <input
              className="highlight-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </label>
          <label htmlFor="connfirm-password">
            <input
              className="highlight-input"
              type="password"
              placeholder="Confirm your password.."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </label>
          <button className="signup-btn" type="submit">
            Sign Up{" "}
          </button>
        </form>
        <p>
          Alreday have a account? <Link to={"/login"}>Log in </Link>
        </p>
      </div>
    </>
  );
};
export default Register;
