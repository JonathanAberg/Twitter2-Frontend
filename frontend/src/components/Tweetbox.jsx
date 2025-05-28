import { useState } from "react";
import "../styles/tweetbox.css";
import { FaImage, FaSmile, FaPoll, FaCalendarPlus } from "react-icons/fa";
import profilePlaceholder from "../assets/profile-placeholder.jpg";

export function Tweetbox({ user, setUser, id, onTweetPosted }) {
  const [post, setPost] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  // Fix: Use the placeholder directly if no profile picture
  const profilepic = user?.profilepicture
    ? `http://localhost:5001/uploads/${user.profilepicture}`
    : profilePlaceholder;

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
    <div className="tweet-box-container">
      <form onSubmit={handleSubmit}>
        <div className="tweet-box-content">
          <img
            src={profilepic}
            alt="Profile"
            className="tweet-box-profile-pic"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = profilePlaceholder;
            }}
          />
          <div className="tweet-box-input-area">
            <textarea
              className="tweet-box-input"
              placeholder="What's happening?"
              value={post}
              onChange={(e) => setPost(e.target.value)}
              maxLength={280}
            />

            <div className="tweet-box-actions">
              <div className="tweet-box-icons">
                <FaImage className="tweet-box-icon" />
                <FaSmile className="tweet-box-icon" />
                <FaPoll className="tweet-box-icon" />
                <FaCalendarPlus className="tweet-box-icon" />
              </div>
              <button
                className="tweet-button"
                type="submit"
                disabled={isPosting || !post.trim()}
              >
                {isPosting ? "Posting..." : "Tweet"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
