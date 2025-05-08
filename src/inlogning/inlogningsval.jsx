import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
const Inlogningsval = () => {
  return (
    <>
      <h1>Welcome</h1>
      <Link to={"login"}>
        <input type="button" value={"Log in"} />
      </Link>
      <Link to={"register"}>
        <input type="button" value={"sign up"} />
      </Link>
    </>
  );
};
export default Inlogningsval;
