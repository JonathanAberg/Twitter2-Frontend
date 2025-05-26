import { useState, useEffect } from "react";
import "../styles/ProfileEditModal.css";

const defaultProfileImage = "/src/assets/profile-placeholder.jpg";
const defaultCoverImage = "/src/assets/default-cover.jpg";

const ProfileEditModal = ({ isOpen, onClose, user, onSave }) => {
  const [formData, setFormData] = useState({
    name: user.name || "",
    bio: user.bio || user.about || "",
    location: user.location || user.hometown || "",
  });

  const [profileFile, setProfileFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);

  const [profilePreview, setProfilePreview] = useState(
    user.profileImage || defaultProfileImage
  );
  const [coverPreview, setCoverPreview] = useState(
    user.coverPhoto || user.coverImage || defaultCoverImage
  );

  useEffect(() => {
    setFormData({
      name: user.name || "",
      bio: user.bio || user.about || "",
      location: user.location || user.hometown || "",
    });

    setProfilePreview(user.profileImage || defaultProfileImage);
    setCoverPreview(user.coverPhoto || user.coverImage || defaultCoverImage);
  }, [user]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const previewUrl = URL.createObjectURL(file);

      if (name === "profileImage") {
        setProfileFile(file);
        setProfilePreview(previewUrl);
      } else if (name === "coverPhoto") {
        setCoverFile(file);
        setCoverPreview(previewUrl);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();

    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("about", formData.bio);
    formDataToSubmit.append("hometown", formData.location);

    if (profileFile) {
      formDataToSubmit.append("profileImage", profileFile);
    }

    if (coverFile) {
      formDataToSubmit.append("coverImage", coverFile);
    }

    await onSave(formDataToSubmit, { isFormData: true });

    if (
      profilePreview &&
      profilePreview !== user.profileImage &&
      profilePreview !== defaultProfileImage
    ) {
      URL.revokeObjectURL(profilePreview);
    }

    if (
      coverPreview &&
      coverPreview !== user.coverImage &&
      coverPreview !== user.coverPhoto &&
      coverPreview !== defaultCoverImage
    ) {
      URL.revokeObjectURL(coverPreview);
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
              name="coverPhoto"
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
              name="profileImage"
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
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              maxLength="50"
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Your bio"
              maxLength="160"
              rows="3"
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
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
