import { useState } from "react";
import "../styles/formsandinput.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        alert("incorrect email or password ");
      }
      const user = await res.json();
      localStorage.setItem("token", user.token);

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
          Email{" "}
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </p>
        <p>
          Password{" "}
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </p>
        <input type="submit" value="login" />
      </form>
    </>
  );
};
export default Login;
