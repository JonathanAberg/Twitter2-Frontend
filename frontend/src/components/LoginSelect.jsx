import { Link, useNavigate } from "react-router-dom";

import TwitterLogo from "../assets/twitter-logo.svg";

import "../styles/loginselect.css";

const LoginSelect = () => {
  return (
    <>
      <div className="loginselect-wrapper">
        <div>
          <div className="image-container">
            <img src={TwitterLogo} alt="Twitter Logo" />
          </div>
          <h1>Welcome to Twitter</h1>
        </div>
        <Link to={"/register"}>
          {" "}
          <button type="button">Sign up</button>
        </Link>
        <Link to={"/login"}>
          {" "}
          <button type="button">Log in</button>
        </Link>
      </div>
    </>
  );
};
export default LoginSelect;
