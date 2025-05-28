import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import "../styles/sidebar.css";
import TwitterLogo from "../assets/twitter-logo.svg";
// Remove ThemeToggle import
// import { ThemeToggle } from "./ThemeToggle";

import {
  FaHome,
  FaSearch,
  FaBell,
  FaEnvelope,
  FaBookmark,
  FaUser,
  FaEllipsisH,
} from "react-icons/fa";

export function Sidebar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const goToProfile = () => {
    navigate(`/profile/${id}`);
  };

  const userId = localStorage.getItem("userId");

  const isActive = (path) => {
    return (
      location.pathname === path ||
      (path.includes("/profile") && location.pathname.includes("/profile"))
    );
  };

  const menuItems = [
    { icon: <FaHome />, text: "Home", path: `/home/${userId}` },
    { icon: <FaSearch />, text: "Explore", path: "/explore" },
    { icon: <FaBell />, text: "Notifications", path: "/notifications" },
    { icon: <FaEnvelope />, text: "Messages", path: "/messages" },
    { icon: <FaBookmark />, text: "Bookmarks", path: "/bookmarks" },
    { icon: <FaUser />, text: "Profile", path: `/profile/${userId}` },
    { icon: <FaEllipsisH />, text: "More", path: "/more" },
  ];

  return (
    <div className="sidebar">
      <div className="logo-container">
        <Link to={`/home/${userId}`}>
          <img src={TwitterLogo} alt="Twitter Logo" className="twitter-logo" />
        </Link>
      </div>

      <nav className="sidebar-menu">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={isActive(item.path) ? "active" : ""}
              >
                <span className="icon">{item.icon}</span>
                <span className="label">{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <button className="tweet-button">
        <span>Tweet</span>
      </button>
    </div>
  );
}
