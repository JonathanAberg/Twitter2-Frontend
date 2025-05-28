import { useState } from "react";
import { LogoutPopup } from "./LogoutPopup";
import { ShowCurrentProfile } from "./ShowCurrentProfile";
import { ThemeToggle } from "./ThemeToggle";
import "../styles/footer.css";

const Footer = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <footer>
      <ShowCurrentProfile />
      <div className="theme-toggle-container">
        <ThemeToggle />
      </div>
      <div className="logout-select-box">
        <button className="logout-select" onClick={togglePopup}>
          ...
        </button>
        <div className={showPopup ? "popup" : "hide"}>
          <LogoutPopup onCancel={() => setShowPopup(false)} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
