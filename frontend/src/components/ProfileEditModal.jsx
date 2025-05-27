import { useState, useEffect } from "react";
import "../styles/ProfileEditModal.css";
import defaultProfileImageSrc from "../assets/profile-placeholder.jpg";
import defaultCoverImageSrc from "../assets/coverdefault.jpg";
import { useParams } from "react-router-dom";

const ProfileEditModal = ({ isOpen, onClose, user, onSave }) => {
  const [profilepicture, setProfilepicture] = useState(null);
  const [coverpicture, setCoverPicture] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [hometown, setHometown] = useState("");
  const [about, setAbout] = useState("");
  const [name, setName] = useState("");

  const { id } = useParams();

  useEffect(() => {
    if (user && isOpen) {
      setName(user.name || "");
      setAbout(user.about || "");
      setHometown(user.hometown || "");

      setProfilepicture(null);
      setCoverPicture(null);

      setProfilePreview(
        user.profilepicture
          ? `http://localhost:5001/uploads/${user.profilepicture}`
          : defaultProfileImageSrc
      );

      setCoverPreview(
        user.coverpicture
          ? `http://localhost:5001/uploads/${user.coverpicture}`
          : defaultCoverImageSrc
      );
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const previewUrl = URL.createObjectURL(file);
      if (name === "profilepicture") {
        setProfilepicture(file);
        setProfilePreview(previewUrl);
      } else if (name === "coverpicture") {
        setCoverPicture(file);
        setCoverPreview(previewUrl);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();

    formDataToSubmit.append("name", name);
    formDataToSubmit.append("about", about);
    formDataToSubmit.append("hometown", hometown);

    if (profilepicture) {
      formDataToSubmit.append("profilepicture", profilepicture);
    }

    if (coverpicture) {
      formDataToSubmit.append("coverpicture", coverpicture);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5001/api/users/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSubmit,
      });

      if (response.ok) {
        console.log("Profile updated successfully");
        onSave && onSave();
        onClose();
      }
    } catch (err) {
      console.error("Failed to submit", err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit Profile</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="coverPhoto">Cover Photo</label>
            <div className="image-preview-container">
              <img
                src={coverPreview}
                alt="Cover preview"
                className="image-preview cover-preview"
              />
            </div>
            <input
              type="file"
              id="coverPhoto"
              name="coverpicture"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
            />
            <label htmlFor="coverPhoto" className="file-label">
              Choose new cover photo
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="profileImage">Profile Image</label>
            <div className="image-preview-container">
              <img
                src={profilePreview}
                alt="Profile preview"
                className="image-preview profile-preview"
              />
            </div>
            <input
              type="file"
              id="profileImage"
              name="profilepicture"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
            />
            <label htmlFor="profileImage" className="file-label">
              Choose new profile picture
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              maxLength="50"
            />
          </div>

          <div className="form-group">
            <label htmlFor="about">Bio</label>
            <textarea
              id="bio"
              name="about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Your bio"
              maxLength="160"
              rows="3"
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="hometown">Location</label>
            <input
              type="text"
              id="location"
              name="hometown"
              value={hometown}
              onChange={(e) => setHometown(e.target.value)}
              placeholder="Your location"
              maxLength="30"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-button">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;
