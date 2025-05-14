import "../styles/tweetbox.css";

import profilePlaceholder from "../assets/profile-placeholder.jpg";
import { useState } from "react";

export function Tweetbox({ user, setUser, id }) {
  const [post, setPost] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(``);
  };
  return (
    <form className="tweetbox-wrapper" onSubmit={handleSubmit}>
        <div className="tweetbox-top-layer">
          <div className="user-pic">
            <img src={profilePlaceholder} alt="Profile Picture" />
          </div>
          <input
            id="post-tweet-text-field"
            placeholder="What's happening?"
            type="text"
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />
        </div>
        <div className="tweetbox-bottom-container">
          <button className="post-tweet-btn" type="submit">
            Tweet
          </button>
        </div>
    </form>
  );
}
