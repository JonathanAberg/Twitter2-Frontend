import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import {
  FaHome,
  FaSearch,
  FaBell,
  FaEnvelope,
  FaBookmark,
  FaUser,
  FaEllipsisH,
} from "react-icons/fa";
import "../styles/sidebar.css";
import TwitterLogo from "../assets/twitter-logo.svg";
import TweetModal from "./TweetModal";

export function Sidebar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const goToProfile = () => {
    navigate(`/profile/${id}`);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:5001/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const isActive = (path) => {
    return (
      location.pathname === path ||
      (path.includes("/profile") && location.pathname.includes("/profile"))
    );
  };

  const openTweetModal = () => {
    setIsModalOpen(true);
  };

  const closeTweetModal = () => {
    setIsModalOpen(false);
  };

  const handleTweetPosted = () => {
    const event = new CustomEvent("tweetPosted");
    window.dispatchEvent(event);
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

      <button className="tweet-button" onClick={openTweetModal}>
        <span>Tweet</span>
      </button>
      {isModalOpen && user && (
        <TweetModal
          isOpen={isModalOpen}
          onClose={closeTweetModal}
          user={user}
          onTweetPosted={handleTweetPosted}
        />
      )}
    </div>
  );
}
