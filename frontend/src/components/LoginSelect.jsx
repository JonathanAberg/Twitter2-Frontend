import React from "react";
import { Link } from "react-router-dom";
const LoginSelect = () => {
  return (
    <>
      <h1>Welcome</h1>
      <Link to={"inlogning"}>
        <input type="button" value={"Log in"} />
      </Link>
      <Link to={"registering"}>
        <input type="button" value={"sign up"} />
      </Link>
    </>
  );
};
export default LoginSelect;