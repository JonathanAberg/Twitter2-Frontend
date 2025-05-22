import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
export function InfoCompelettion() {
  const [profilepicture, setProfilepicture] = useState(null);
  const [coverpicture, setCoverPicture] = useState(null);
  const [hometown, setHometown] = useState("");
  const [bio, setBio] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("profilepicture", profilepicture);
    formdata.append("coverpicture", coverpicture);
    formdata.append("hometown", hometown);
    formdata.append("bio", bio);
    try {
      const response = await fetch("http://localhost:5001/api/users", {
        method: "POST",
        body: formdata,
      });
      if (response.ok) {
        navigate(`/home/${id}`);
      }
    } catch (err) {
      console.error("failed to submit", err);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
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
        <label htmlFor="bio">
          Bio
          <textarea
            name="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </label>
        <input type="submit" value={"Submit"} />
      </form>
    </>
  );
}
