import { Link } from "react-router-dom";

import TwitterLogo from '../assets/twitter-logo.svg'

import '../styles/loginselect.css'

const LoginSelect = () => {
  return (
    <>
    <div className="loginselect-wrapper">
      <div className="image-container">
      <img src={TwitterLogo} alt="Twitter Logo" />
      </div>
      <h1>Logga in på Twitter</h1>
        <input className="userdetails-input" type="text" placeholder="Mobil, E-postadress eller användarnamn" />
      <Link to={"register"}>
        <button className="next-btn" value={"Sign up"}>Nästa</button>
      </Link>
        <button className="forgot-password" value={"Forgot password"}>Har du glömt lösenordet?</button>
    </div>
    <p className="inline">Har du inget konto? &nbsp;</p>
    <Link to={"register"}>
    Registrera dig
    </Link>
    </>
  );
};
export default LoginSelect;