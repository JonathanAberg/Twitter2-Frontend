import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/sidebar.css";

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
  const goToProfile = () => {
    navigate(`/profile/${id}`);
  };
  return (
    <div className="sidebar">
      <ul>
        <li>
          <FaHome />
          Home
        </li>
        <li>
          <FaSearch />
          Search
        </li>
        <li>
          <FaBell />
          Notification
        </li>
        <li>
          <FaEnvelope />
          Messages
        </li>
        <li>
          <FaBookmark />
          Bookmarks
        </li>
        <li onClick={() => goToProfile()}>
          <FaUser />
          Profile
        </li>
        <li>
          <FaEllipsisH />
          More
        </li>
      </ul>
    </div>
  );
}
