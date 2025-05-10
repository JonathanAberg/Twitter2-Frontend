import { useState } from "react";
import React from "react";

const Login = ({ data }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = data?.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      alert("correct");
    } else {
      alert("incorrect");
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
export default Login;