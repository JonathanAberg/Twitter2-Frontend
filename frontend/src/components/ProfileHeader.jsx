import React, { useState } from "react";
import ProfileEditModal from "./ProfileEditModal";
import "../styles/ProfileHeader.css";

const ProfileHeader = ({ user, onProfileUpdate }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
