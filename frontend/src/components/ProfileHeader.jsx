import React, { useState, useEffect } from "react";
import ProfileEditModal from "./ProfileEditModal";
import "../styles/ProfileHeader.css";
import { useParams } from "react-router-dom";
import profilePlaceholder from "../assets/profile-placeholder.jpg";
import coverdefault from "../assets/coverdefault.jpg";
const ProfileHeader = ({ user, onProfileUpdate }) => {
  const { id: viewedUserId } = useParams();
  const currentUserId = localStorage.getItem("userId");
  console.log("viewedUserId:", viewedUserId);
  console.log("currentUserId:", currentUserId);
  const token = localStorage.getItem("token");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isfollowing, setIsfollowing] = useState(false);
  const profilepic = user?.profilepicture.trim()
    ? `http://localhost:5001/${user.profilepicture}`
    : null;
  const coverpic = user?.coverpicture.trim()
    ? `http://localhost:5001/${user.coverpicture}`
    : coverdefault;
  console.log("Profile pic:", user?.profilepicture);

  useEffect(() => {
    const fetchFollowStatus = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/users/${viewedUserId}/isfollowing`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setIsfollowing(data.isFollowing);
        }
      } catch (err) {
        console.error("Failed to fetch follow status:", err);
      }
    };

    if (viewedUserId !== currentUserId) {
      fetchFollowStatus();
    }
  }, [viewedUserId, currentUserId, token]);
  const handleFollow = async () => {
    const newFollow = isfollowing
      ? `http://localhost:5001/api/users/${viewedUserId}/unfollow`
      : `http://localhost:5001/api/users/${viewedUserId}/follow`;
    try {
      const response = await fetch(newFollow, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setIsfollowing(!isfollowing);
      }
    } catch (err) {
      console.error("failed to follow", err);
    }
  };

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleProfileUpdate = (updatedProfile) => {
    onProfileUpdate(updatedProfile);
  };

  return (
    <div className="profile-header">
      {coverpic && (
        <div
          className="cover-photo"
          style={{
            backgroundImage: `url(${coverpic})`,
          }}
        ></div>
      )}
      <div className="profile-info">
        <div className="avatar-container">
          <img
            src={profilepic}
            alt="User"
            className="profile-avatar"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = profilePlaceholder;
            }}
          />
        </div>
        <div className="user-actions">
          {viewedUserId === currentUserId ? (
            <button className="edit-profile-btn" onClick={handleEditProfile}>
              Edit profile
            </button>
          ) : (
            <button type="button" onClick={handleFollow}>
              {isfollowing ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
        <div className="user-details">
          <h2 className="user-name">{user.name || "User"}</h2>
          <p className="user-handle">
            @
            {user.username ||
              user.name?.toLowerCase().replace(/\s/g, "") ||
              "user"}
          </p>
          <p className="user-bio">
            {user.bio || user.about || "No bio available"}
          </p>
          <div className="user-metadata">
            <p>
              <i className="fas fa-map-marker-alt"></i>{" "}
              {user.hometown ? user.hometown : "Earth"}
            </p>
            <p>
              <i className="fas fa-calendar-alt"></i> Joined {user.joinDate}
            </p>
          </div>
          <div className="follow-stats">
            <p>
              <strong>{user.following}</strong> <span>Following</span>
            </p>
            <p>
              <strong>{user.followers}</strong> <span>Followers</span>
            </p>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <ProfileEditModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          user={user}
          onSave={handleProfileUpdate}
        />
      )}
    </div>
  );
};

export default ProfileHeader;
