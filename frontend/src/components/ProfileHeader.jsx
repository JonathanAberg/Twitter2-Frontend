import React, { useState, useEffect } from "react";
import ProfileEditModal from "./ProfileEditModal";
import "../styles/ProfileHeader.css";
import { useParams } from "react-router-dom";

const ProfileHeader = ({ user, onProfileUpdate }) => {
  const { id: viewedUserId } = useParams();
  const cuurentUserId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isfollowing, setIsfollowing] = useState(false);
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
      <div
        className="cover-photo"
        style={{
          backgroundImage: `url(${
            user.coverPhoto ||
            user.coverImage ||
            "/src/assets/default-cover.jpg"
          })`,
        }}
      ></div>
      <div className="profile-info">
        <div className="avatar-container">
          <img
            src={user.profileImage || "https://placehold.co/150x150"}
            alt={user.name || "User"}
            className="profile-avatar"
          />
        </div>
        <div className="user-actions">
          <button className="edit-profile-btn" onClick={handleEditProfile}>
            Edit profile
          </button>
          <button type="button" onClick={handleFollow}>
            {isfollowing ? "Unfollow" : "Follow"}
          </button>
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
              {user.location || "Earth"}
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
