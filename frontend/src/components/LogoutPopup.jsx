import { useNavigate } from "react-router-dom";
import TwitterLogo from "../assets/twitter-logo.svg";
import "../styles/logoutPopup.css";

export function LogoutPopup({ onCancel }) {
  const navigate = useNavigate();
  const logout = () => {
    navigate("/login", { replace: true });
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };
  return (
    <div className="logout-wrapper">
      <div className="logo-container">
        <img src={TwitterLogo} alt="Twitter Logo" />
      </div>
        <h3>Log out of Twitter</h3>
      <div className="btn-wrapper">
        <button className="logout-btn" onClick={logout}>
          Log out
        </button>
        <button onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
      </div>
    </div>
  );
}
