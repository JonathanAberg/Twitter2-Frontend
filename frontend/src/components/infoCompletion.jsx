import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/infoCompletion.css";

export function InfoCompletion() {
  const [profilepicture, setProfilepicture] = useState(null);
  const [coverpicture, setCoverPicture] = useState(null);
  const [hometown, setHometown] = useState("");
  const [about, setAbout] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("profilepicture", profilepicture);
    formdata.append("coverpicture", coverpicture);
    formdata.append("hometown", hometown);
    formdata.append("about", about);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5001/api/users/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formdata,
      });
      if (response.ok) {
        navigate(`/home/${id}`, { replace: true });
      }
    } catch (err) {
      console.error("failed to submit", err);
    }
  };
  return (
    <div className="info-completion-container">
      <h2 className="info-completion-title">Complete Your Profile</h2>
      <form className="info-completion-form" onSubmit={handleSubmit}>
        <label htmlFor="profilepicture">
          Profile Picture
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfilepicture(e.target.files[0])}
          />
        </label>
        <label htmlFor="coverpicture">
          Cover Picture
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverPicture(e.target.files[0])}
          />
        </label>
        <label htmlFor="hometown">
          Hometown
          <input
            type="text"
            name="hometown"
            value={hometown}
            onChange={(e) => setHometown(e.target.value)}
          />
        </label>
        <label htmlFor="about">
          About
          <textarea
            name="about"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </label>
        <div className="info-completion-buttons">
          <input
            type="button"
            onClick={() => navigate(`/home/${id}`)}
            value="Skip"
            className="skip-button"
          />
          <input type="submit" value="Submit" className="submit-button" />
        </div>
      </form>
    </div>
  );
}
