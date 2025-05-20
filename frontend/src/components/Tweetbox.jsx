import "../styles/tweetbox.css";
import profilePlaceholder from "../assets/profile-placeholder.jpg";
import { useState } from "react";

export function Tweetbox({ user, setUser, id }) {
  const [post, setPost] = useState("");
  const [isPosting, setIsPosting] = useState(false);

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
        // if the Home component has a function to refresh the tweets, call it here @Linus
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
          <img
            src={user?.profileImage || profilePlaceholder}
            alt="Profile Picture"
          />
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
