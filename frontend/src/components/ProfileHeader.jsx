import React, { useState, useEffect } from "react";
import ProfileEditModal from "./ProfileEditModal";
import "../styles/ProfileHeader.css";
import { useParams } from "react-router-dom";

const ProfileHeader = ({ user, onProfileUpdate }) => {
  const { id: viewedUserId } = useParams();
  const currentUserId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isfollowing, setIsfollowing] = useState(false);
  const profilepic = user?.profilepicture
    ? `http://localhost:5001/${user.profilepicture}`
    : null;
  const coverpic = user?.coverpicture
    ? `http://localhost:5001/${user.coverpicture}`
    : null;
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

  const handleProfileUpdate = async (updatedProfile, options = {}) => {
    try {
      const token = localStorage.getItem("token");
      const userId = user.id;

      console.log(
        "Updating profile with:",
        options.isFormData ? "FormData" : "JSON"
      );

      let response;

      if (options.isFormData) {
        for (let pair of updatedProfile.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }

        response = await fetch(`http://localhost:5001/api/users/${userId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: updatedProfile,
        });
      } else {
        response = await fetch(`http://localhost:5001/api/users/${userId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: updatedProfile.name,
            about: updatedProfile.bio,
            hometown: updatedProfile.location,
            profileImage: updatedProfile.profileImage,
            coverImage: updatedProfile.coverPhoto,
          }),
        });
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Update failed:", response.status, errorData);
        throw new Error("Failed to update profile");
      }

      const updatedUserData = await response.json();
      console.log("Profile updated successfully:", updatedUserData);

      const mappedUserData = {
        id: updatedUserData._id,
        name: updatedUserData.name,
        username: updatedUserData.nickname,
        bio: updatedUserData.about,
        profileImage: updatedUserData.profileImage,
        coverImage: updatedUserData.coverImage || updatedUserData.coverPhoto,
        location: updatedUserData.hometown,
        followers: updatedUserData.followers?.length || 0,
        following: updatedUserData.following?.length || 0,
        joinDate: user.joinDate,
      };

      setIsEditModalOpen(false);

      onProfileUpdate(mappedUserData);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
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
          {profilepic && (
            <img src={profilepic} alt={"User"} className="profile-avatar" />
          )}
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
