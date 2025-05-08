import "../styles/tweetbox.css";
import React from "react";
export function Tweetbox() {
  return (
    <div className="tweetbox-wrapper">
      <div className="tweetbox-top-layer">
        <div className="user-pic">
          <img
            src={"https://source.unsplash.com/random"}
            alt="Profile Picture"
          />
        </div>
        <input
          id="post-tweet-text-field"
          placeholder="What's happening?"
          type="text"
        />
      </div>
      <div className="tweetbox-bottom-container">
        <button className="post-tweet-btn">Tweet</button>
      </div>
    </div>
  );
}
