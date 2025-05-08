import React, { useState } from "react";
import "../styles/ProfileHeader.css";
import ProfileEditModal from "./ProfileEditModal";

const ProfileHeader = ({ user, onProfileUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log("ProfileHeader: Rendering with user:", user);

  if (!user) {
    console.error("ProfileHeader: No user data provided");
    return (
      <div className="profile-header-error">Error: No user data available</div>
    );
  }

  const handleEditProfile = () => {
    setIsModalOpen(true);
  };

  const handleSaveProfile = (updatedProfile) => {
    // Call the parent component's update function with the new data
    if (onProfileUpdate) {
      onProfileUpdate(updatedProfile);
    } else {
      console.log(
        "Profile update function not provided. Updated data:",
        updatedProfile
      );
    }
  };

  return (
    <div className="profile-header">
      <div
        className="cover-photo"
        style={{
          backgroundImage: `url(${user.coverImage || user.coverPhoto})`,
        }}
      ></div>
      <div className="profile-info">
        <div className="avatar-container">
          <img
            src={user.profileImage}
            alt={user.name}
            className="profile-avatar"
          />
        </div>
        <div className="user-actions">
          <button className="edit-profile-btn" onClick={handleEditProfile}>
            Edit profile
          </button>
        </div>
        <div className="user-details">
          <h2 className="user-name">{user.name}</h2>
          <p className="user-handle">@{user.username}</p>
          <p className="user-bio">{user.bio}</p>
          <div className="user-metadata">
            <p className="location">
              <i className="icon-location"></i> {user.location}
            </p>
            <p className="join-date">
              <i className="icon-calendar"></i> Joined {user.joinDate}
            </p>
          </div>
          <div className="follow-stats">
            <span>
              <strong>{user.following}</strong> Following
            </span>
            <span>
              <strong>{user.followers}</strong> Followers
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
