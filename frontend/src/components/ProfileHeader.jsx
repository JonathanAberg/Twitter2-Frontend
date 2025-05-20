import React, { useState } from "react";
import ProfileEditModal from "./ProfileEditModal";

const ProfileHeader = ({ user, onProfileUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditProfile = () => {
    setIsModalOpen(true);
  };

  const handleSaveProfile = (updatedProfile) => {
    onProfileUpdate(updatedProfile);
    setIsModalOpen(false);
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
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop
              e.target.src =
                "https://placehold.co/150x150/gray/white?text=User";
            }}
          />
        </div>
        <div className="user-actions">
          <button className="edit-profile-btn" onClick={handleEditProfile}>
            Edit profile
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
            <p className="location">
              <i className="icon-location"></i>{" "}
              {user.location || user.hometown || "Unknown location"}
            </p>
            <p className="join-date">
              <i className="icon-calendar"></i> Joined{" "}
              {user.joinDate || new Date().toLocaleDateString()}
            </p>
          </div>
          <div className="follow-stats">
            <span>
              <strong>{user.following || 0}</strong> Following
            </span>
            <span>
              <strong>{user.followers || 0}</strong> Followers
            </span>
          </div>
        </div>
      </div>

      <ProfileEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
        onSave={handleSaveProfile}
      />
    </div>
  );
};

export default ProfileHeader;
