import React, { useState, useEffect, useRef } from "react";
import ProfileEditModal from "./ProfileEditModal";
import "../styles/ProfileHeader.css";
import { useParams } from "react-router-dom";
import profilePlaceholder from "../assets/profile-placeholder.jpg";
import coverdefault from "../assets/coverdefault.jpg";

const ProfileHeader = ({ user, onProfileUpdate }) => {
  const { id: viewedUserId } = useParams();
  const currentUserId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isfollowing, setIsfollowing] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);

  const profilePicRef = useRef(profilePlaceholder);
  const coverPicRef = useRef(coverdefault);
  const timestampRef = useRef(user?._timestamp || Date.now());

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  useEffect(() => {
    if (user?._timestamp) {
      timestampRef.current = user._timestamp;
    }
  }, [user?._timestamp]);

  useEffect(() => {
    if (user) {
      console.log(
        "Updating image sources with timestamp:",
        timestampRef.current
      );
      console.log("Profile picture path:", user.profilepicture);

      if (user.profilepicture && user.profilepicture.trim()) {
        const newProfilePic = `http://localhost:5001/uploads/${user.profilepicture}?t=${timestampRef.current}`;
        profilePicRef.current = newProfilePic;
        console.log("New profile picture URL:", newProfilePic);
      } else {
        profilePicRef.current = profilePlaceholder;
      }

      if (user.coverpicture && user.coverpicture.trim()) {
        coverPicRef.current = `http://localhost:5001/uploads/${user.coverpicture}?t=${timestampRef.current}`;
      } else {
        coverPicRef.current = coverdefault;
      }

      setForceUpdate((prev) => prev + 1);
    }
  }, [user]);

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

  const handleProfileUpdate = (updatedProfile) => {
    console.log("Profile update received:", updatedProfile);

    const newTimestamp = Date.now();

    const updatedUser = {
      ...user,
      name: updatedProfile.name || user.name,
      about: updatedProfile.about || user.about,
      hometown: updatedProfile.hometown || user.hometown,
      profilepicture: updatedProfile.profilepicture || user.profilepicture,
      coverpicture: updatedProfile.coverpicture || user.coverpicture,
      _timestamp: newTimestamp,
    };

    console.log("Updated user object:", updatedUser);
    onProfileUpdate(updatedUser);
  };

  return (
    <div className="profile-header">
      <div
        className="cover-photo"
        style={{
          backgroundImage: `url(${coverPicRef.current})`,
        }}
      ></div>
      <div className="profile-info">
        <div className="avatar-container">
          <img
            src={profilePicRef.current}
            alt="User"
            className="profile-avatar"
            key={`avatar-${forceUpdate}`}
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
