import { Link } from "react-router-dom";
import TwitterLogo from "../assets/twitter-logo.svg";
import "../styles/loginselect.css";

const LoginSelect = () => {
  return (
    <div className="loginselect-wrapper">
      <div className="image-container">
        <img src={TwitterLogo} alt="Twitter Logo" />
      </div>
      <h1 className="welcome-heading">Twitter 2</h1>

      <div className="loginselect-navigation">
        <Link to="/register" className="twitter-button primary-button">
          Create account
        </Link>

        <div className="divider">
          <span>or</span>
        </div>

        <Link to="/login" className="twitter-button secondary-button">
          Sign in
        </Link>
      </div>

      <p className="no-account">
        By signing up, you agree to the Terms of Service and Privacy Policy.
      </p>

      <div className="footer-links">
        <a href="#">About</a>
        <a href="#">Help Center</a>
        <a href="#">Terms of Service</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Cookie Policy</a>
        <a href="#">Accessibility</a>
        <a href="#">© 2025 The Booooys.</a>
      </div>
    </div>
  );
};

export default LoginSelect;
