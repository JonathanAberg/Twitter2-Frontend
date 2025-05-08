import "../styles/logoutPopup.css";
import React from "react";
export function LogoutPopup() {
  return (
    <div className="logout-wrapper">
      <div className="logo-container">
        <img src={"https://source.unsplash.com/random"} alt="Twitter Logo" />
      </div>
      <div className="logout-label">
        <h3>Log out of Twitter</h3>
      </div>
    </div>
  );
}
