import { useState } from "react";
import { LogoutPopup } from "./LogoutPopup";
import { ShowCurrentProfile } from "./ShowCurrentProfile";
import { ThemeToggle } from "./ThemeToggle";
import "../styles/footer.css";

const Footer = ({ user, setUser }) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <footer>
      <div className="logout-select-box">
      <ShowCurrentProfile user={user} setUser={setUser}>
        <div className={showPopup ? "popup" : "hide"}>
          <LogoutPopup onCancel={() => setShowPopup(false)} />
        </div>
        <button className="logout-select" onClick={togglePopup}>
          ...
        </button>
        </ShowCurrentProfile>
        </div>
      <div className="theme-toggle-container">
        <ThemeToggle>
          Switch to dark/light mode
        </ThemeToggle>
      </div>
    </footer>
  );
};

export default Footer;