import { useEffect, useState } from "react";
import "../styles/searchresult.css";
import profilePlaceholder from "../assets/profile-placeholder.jpg";
import { useNavigate } from "react-router-dom";
export function SearchResult({ search }) {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [filterdusers, setFilterdusers] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:5001/api/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  useEffect(() => {
    const searchUser = users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilterdusers(searchUser);
  }, [search, users]);

  return (
    <>
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
