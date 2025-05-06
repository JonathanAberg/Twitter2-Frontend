import React from "react";
import { Link } from "react-router-dom";
export function LoginSelection() {
  return (
    <>
      <h1>Welcome</h1>
      <Link to="/login">
        <input type="button" value="Log in" />
      </Link>
      <Link to="/register">
        <input type="button" value="sign up" />
      </Link>
    </>
  );
};