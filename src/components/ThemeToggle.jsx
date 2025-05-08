import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import "../styles/ThemeToggle.css";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="theme-toggle-wrapper">
      <button
        className={`theme-toggle ${theme}`}
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        <div className="toggle-track">
          <div className="toggle-icon light">
            <FaSun />
          </div>
          <div className="toggle-icon dark">
            <FaMoon />
          </div>
          <div className="toggle-thumb"></div>
        </div>
      </button>
    </div>
  );
};

export default ThemeToggle;
