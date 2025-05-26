import { useNavigate } from "react-router-dom";
import TwitterLogo from "../assets/twitter-logo.svg";
import "../styles/logoutPopup.css";

export function LogoutPopup({ onCancel }) {
  const navigate = useNavigate();
  return (
    <div className="logout-wrapper">
      <div className="logo-container">
        <img src={TwitterLogo} alt="Twitter Logo" />
        <h3>Log out of Twitter</h3>
      </div>
      <div className="btn-wrapper">
        <button
          className="logout-btn"
          onClick={() => navigate("/", { replace: true })}
        >
          Log out
        </button>
        <button onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
      </div>
    </div>
  );
}
