import "../styles/tweetbox.css";
import { useState } from "react";
import profilePlaceholder from "../assets/profile-placeholder.jpg";

export function Tweetbox({ user, setUser, id, onTweetPosted }) {
  const [post, setPost] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const profilepic = user?.profilepicture
    ? `http://localhost:5001/${user.profilepicture}`
    : null;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!post.trim()) return;

    setIsPosting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5001/api/tweets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: post }),
      });

      if (response.ok) {
        setPost("");
        if (onTweetPosted) onTweetPosted();
      } else {
        console.error("Failed to post tweet:", await response.text());
      }
    } catch (error) {
      console.error("Error posting tweet:", error);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <form className="tweetbox-wrapper" onSubmit={handleSubmit}>
      <div className="tweetbox-top-layer">
        <div className="user-pic">
          {profilepic && <img src={profilepic} alt="Profile" />}
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
        <button
          className="post-tweet-btn"
          type="submit"
          disabled={isPosting || !post.trim()}
        >
          {isPosting ? "Posting..." : "Tweet"}
        </button>
      </div>
    </form>
  );
}
