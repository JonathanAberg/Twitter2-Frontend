import { useState, useEffect } from "react";
import "../styles/ProfileEditModal.css";
import defaultProfileImageSrc from "../assets/profile-placeholder.jpg";
import defaultCoverImageSrc from "../assets/coverdefault.jpg";
import { useParams } from "react-router-dom";
import { FaTimes, FaCamera } from "react-icons/fa";

const ProfileEditModal = ({ isOpen, onClose, user, onSave }) => {
  const [profilepicture, setProfilepicture] = useState(null);
  const [coverpicture, setCoverPicture] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [hometown, setHometown] = useState("");
  const [about, setAbout] = useState("");
  const [name, setName] = useState("");

  const { id } = useParams();

  const MAX_NAME_LENGTH = 50;
  const MAX_BIO_LENGTH = 160;
  const MAX_LOCATION_LENGTH = 30;

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with profile picture:", profilepicture);
    console.log("Form submitted with cover picture:", coverpicture);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("about", about);
      formData.append("hometown", hometown);

      if (profilepicture) {
        formData.append("profilepicture", profilepicture);
        console.log("Appending profilepicture:", profilepicture.name);
      }

      if (coverpicture) {
        formData.append("coverpicture", coverpicture);
        console.log("Appending coverpicture:", coverpicture.name);
      }
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5001/api/users/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const updatedUserData = await response.json();
        console.log("Server response:", updatedUserData);
        const timestamp = new Date().getTime();

        onSave({
          name,
          about,
          hometown,
          profilepicture: profilepicture,
          coverpicture: coverpicture,
        });

        onClose();
      } else {
        const errorText = await response.text();
        console.error("Server error:", response.status, errorText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (file) {
      console.log(`Selected ${name} file:`, file.name);
      const reader = new FileReader();
      if (name === "profilepicture") {
        setProfilepicture(file);
        reader.onload = (e) => setProfilePreview(e.target.result);
      } else if (name === "coverpicture") {
        setCoverPicture(file);
        reader.onload = (e) => setCoverPreview(e.target.result);
      }
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <button onClick={onClose} className="close-button" aria-label="Close">
            <FaTimes />
          </button>
          <h3 className="modal-title">Edit profile</h3>
          <button
            type="submit"
            form="edit-profile-form"
            className="header-save-button"
          >
            Save
          </button>
        </div>

        <div className="cover-image-container">
          <img src={coverPreview} alt="Cover" className="cover-image" />
          <div className="image-upload-overlay">
            <label htmlFor="coverPhoto" className="image-upload-button">
              <FaCamera className="camera-icon" />
            </label>
          </div>
        </div>

        <div className="profile-image-container">
          <img src={profilePreview} alt="Profile" className="profile-image" />
          <div className="image-upload-overlay">
            <label htmlFor="profileImage" className="image-upload-button">
              <FaCamera className="camera-icon" />
            </label>
          </div>
        </div>

        <form id="edit-profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) =>
                setName(e.target.value.slice(0, MAX_NAME_LENGTH))
              }
              placeholder="Your name"
            />
            <span className="character-count">
              {name.length}/{MAX_NAME_LENGTH}
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="about"
              value={about}
              onChange={(e) =>
                setAbout(e.target.value.slice(0, MAX_BIO_LENGTH))
              }
              placeholder="Your bio"
              rows="3"
            ></textarea>
            <span className="character-count">
              {about.length}/{MAX_BIO_LENGTH}
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="hometown"
              value={hometown}
              onChange={(e) =>
                setHometown(e.target.value.slice(0, MAX_LOCATION_LENGTH))
              }
              placeholder="Your location"
            />
            <span className="character-count">
              {hometown.length}/{MAX_LOCATION_LENGTH}
            </span>
          </div>

          <input
            type="file"
            id="profileImage"
            name="profilepicture"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
          />

          <input
            type="file"
            id="coverPhoto"
            name="coverpicture"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
          />
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;
