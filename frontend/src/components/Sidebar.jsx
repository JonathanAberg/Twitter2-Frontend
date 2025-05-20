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
          Hem
        </li>
        <li>
          <FaSearch />
          Utforska
        </li>
        <li>
          <FaBell />
          Notiser
        </li>
        <li>
          <FaEnvelope />
          Meddelanden
        </li>
        <li>
          <FaBookmark />
          Bokmärken
        </li>
        <li onClick={() => goToProfile()}>
          <FaUser />
          Profil
        </li>
        <li>
          <FaEllipsisH />
          Mer
        </li>
      </ul>
    </div>
  );
}
