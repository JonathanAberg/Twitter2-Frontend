import React, { useState } from "react";
import { data, Link, useNavigate } from "react-router-dom";
const Registering = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { name, email, password };
    await fetch("http://localhost:5000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => navigate(`/home/${data._id}`));
    console.log("good");
    setEmail("");
    setName("");
    setPassword("");
  };
  return (
    <>
      <h1>Sign up</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
        </label>
        <button type="submit">Sign Up </button>
      </form>
      <p>
        Alreday have a account? <Link to={"/inlogning"}>Log in </Link>
      </p>
    </>
  );
};
export default Registering;
