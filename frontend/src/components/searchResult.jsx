import { useEffect, useState } from "react";
import profilePlaceholder from "../assets/profile-placeholder.jpg";
import { useNavigate } from "react-router-dom";

import "../styles/searchresult.css";

export function SearchResult({ search, allhashtags, trending }) {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [filterdusers, setFilterdusers] = useState([]);
  const [filteredHashtags, setFilteredHashtags] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:5001/api/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
useEffect(() => {
  if (trending && search.length > 0) {
    const matched = trending
      .map((tag) => tag[0])
      .filter((tagName) =>
        tagName.toLowerCase().includes(search.replace("#", "").toLowerCase())
      );
    setFilteredHashtags(matched);
  } else {
    setFilteredHashtags([]);
  }
}, [search, trending]);

  useEffect(() => {
    const searchUser = users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilterdusers(searchUser);
  }, [search, users]);

return (
  <>
      {filteredHashtags.length > 0 && (
      <ul className="hashtaglist">
        {filteredHashtags.map((tag, index) => (
          <li key={index} className="hashtagresult">
            #{tag}
          </li>
        ))}
      </ul>
    )}
    <ul className="searchlist">
      {filterdusers.map((user) => (
        <li
          key={user._id}
          className="searchresult"
          onClick={() => navigate(`/profile/${user._id}`)}
        >
          <img
            src={
              user.profilepicture
                ? `http://localhost:5001/uploads/${user.profilepicture}`
                : profilePlaceholder
            }
            alt="Profile"
            onError={(e) => {
              e.target.src = profilePlaceholder;
            }}
          />
          <h2>{user.name}</h2>
        </li>
      ))}
    </ul>
  </>
);
}