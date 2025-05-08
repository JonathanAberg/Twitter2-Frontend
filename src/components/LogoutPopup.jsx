import TwitterLogo from "../assets/twitter-logo.svg";
import "../styles/logoutPopup.css";

export function LogoutPopup() {
  return (
    <div className="logout-wrapper">
      <div className="logo-container">
        <img src={TwitterLogo} alt="Twitter Logo" />
      </div>
      <div className="logout-label">
        <h3>Log out of Twitter</h3>
      </div>
    </div>
  );
}
