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
    ? `http://localhost:5001/uploads/${user.profilepicture}`
    : null;
  const coverpic = user?.coverpicture.trim()
    ? `http://localhost:5001/uploads/${user.coverpicture}`
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

  const handleProfileUpdate = async (updatedProfile, options = {}) => {
    try {
      const token = localStorage.getItem("token");
      const userId = user.id;

      let response;
      let endpoint = `http://localhost:5001/api/users/${userId}`;

      console.log(
        "Updating profile with:",
        options.isFormData ? "FormData" : "JSON"
      );

      if (options.isFormData) {
        for (let pair of updatedProfile.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }

        response = await fetch(endpoint, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: updatedProfile,
        });
      } else {
        response = await fetch(endpoint, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: updatedProfile.name,
            about: updatedProfile.bio,
            hometown: updatedProfile.location,
            profilepicture: updatedProfile.profilepicture,
            coverpicture: updatedProfile.coverpicture,
          }),
        });
      }

      if (!response.ok) {
        const errorData = await response.text();
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
        profilepicture: updatedUserData.profilepicture,
        coverpicture: updatedUserData.coverpicture,
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
