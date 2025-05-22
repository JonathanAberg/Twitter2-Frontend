import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/SuggestedUsers.css";

const SuggestedUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No authentication token found");
          setLoading(false);
          return;
        }

        const response = await fetch("http://localhost:5001/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.status}`);
        }

        const data = await response.json();
        const filteredUsers = data
          .filter((user) => user._id !== currentUserId)
          .slice(0, 3);

        setUsers(filteredUsers);
      } catch (err) {
        console.error("Failed to load suggested users:", err);
        setError("Failed to load suggested users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentUserId]);

  const handleFollow = async (userId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5001/api/users/${userId}/follow`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to follow user");
      }

      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, isFollowed: true } : user
        )
      );
    } catch (err) {
      console.error("Error following user:", err);
    }
  };

  if (loading) return <div className="loading">Loading suggestions...</div>;
  if (error) return null;

  return (
    <div className="suggested-users">
      <h2 className="suggested-title">Follow Suggestions</h2>
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user._id} className="suggested-user">
            <Link to={`/profile/${user._id}`} className="user-link">
              <img
                src={user.profileImage || "https://placehold.co/40x40"}
                alt={user.name}
                className="user-avatar"
              />
              <div className="user-info">
                <span className="user-name">{user.name}</span>
                <span className="user-handle">
                  @{user.nickname || user.name}
                </span>
              </div>
            </Link>
            <button
              className="follow-button"
              onClick={() => handleFollow(user._id)}
            >
              Follow
            </button>
          </div>
        ))
      ) : (
        <p className="no-suggestions">No suggestions available</p>
      )}
    </div>
  );
};

export default SuggestedUsers;
