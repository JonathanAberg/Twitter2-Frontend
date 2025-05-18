import '../styles/sidebar.css';

import { FaHome, FaSearch, FaBell, FaEnvelope, FaBookmark, FaUser, FaEllipsisH } from 'react-icons/fa';

export function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li><FaHome />Hem</li>
        <li><FaSearch />Utforska</li>
        <li><FaBell />Notiser</li>
        <li><FaEnvelope />Meddelanden</li>
        <li><FaBookmark />Bokmärken</li>
        <li><FaUser />Profil</li>
        <li><FaEllipsisH />Mer</li>
      </ul>
    </div>
  );
}
