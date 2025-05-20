import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Tweet.css";
import profilePlaceholder from "../assets/profile-placeholder.jpg";

const Tweet = ({ tweet }) => {
  const [isLiked, setIsLiked] = useState(
    tweet.likes?.includes(localStorage.getItem("userId")) || false
  );
  const [likesCount, setLikesCount] = useState(tweet.likes?.length || 0);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      const endpoint = isLiked
        ? `http://localhost:5001/api/tweets/${tweet._id}/unlike`
        : `http://localhost:5001/api/tweets/${tweet._id}/like`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setIsLiked(!isLiked);
        setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
      }
    } catch (error) {
      console.error("Error liking/unliking tweet:", error);
    }
  };

  return (
    <div className="tweet">
      <div className="tweet-avatar">
        <img
          src={tweet.user?.profileImage || profilePlaceholder}
          alt={`${tweet.user?.name}'s avatar`}
        />
      </div>
      <div className="tweet-content">
        <div className="tweet-header">
          <Link to={`/profile/${tweet.user?._id}`} className="tweet-name">
            {tweet.user?.name || "Unknown User"}
          </Link>
          <span className="tweet-username">
            @{tweet.user?.nickname || "unknown"}
          </span>
          <span className="tweet-date">· {formatDate(tweet.createdAt)}</span>
        </div>
        <div className="tweet-text">{tweet.content}</div>
        <div className="tweet-actions">
          <button className="tweet-action reply">
            <i className="fa fa-comment"></i>
            <span>{tweet.replies?.length || 0}</span>
          </button>
          <button className="tweet-action retweet">
            <i className="fa fa-retweet"></i>
            <span>{tweet.retweets?.length || 0}</span>
          </button>
          <button
            className={`tweet-action like ${isLiked ? "liked" : ""}`}
            onClick={handleLike}
          >
            <i className={`fa ${isLiked ? "fa-heart" : "fa-heart-o"}`}></i>
            <span>{likesCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
