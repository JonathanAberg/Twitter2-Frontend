import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Tweet.css";
import profilePlaceholder from "../assets/profile-placeholder.jpg";
import {
  FaRegComment,
  FaComment,
  FaRetweet,
  FaHeart,
  FaRegHeart,
  FaTrash,
} from "react-icons/fa";

const Tweet = ({ tweet, onTweetDeleted }) => {
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this tweet?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5001/api/tweets/${tweet._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        console.log("Tweet deleted successfully, updating UI...");

                if (typeof onTweetDeleted === "function") {
          onTweetDeleted(tweet._id);
        } else {
          console.warn("onTweetDeleted callback not provided");
          window.location.reload();
        }
      } else {
        const errorText = await response.text();
        console.error("Failed to delete tweet:", errorText);
        alert("Failed to delete tweet. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting tweet:", error);
      alert("An error occurred while deleting the tweet.");
    }
  };

    const [isLiked, setIsLiked] = useState(
    tweet.likes?.includes(localStorage.getItem("userId")) || false
  );
  const [likesCount, setLikesCount] = useState(tweet.likes?.length || 0);

  const formatDate = (dateString) => {
    try {
      const tweetDate = new Date(dateString);
      const now = new Date();

      const diffSeconds = Math.floor((now - tweetDate) / 1000);

      let displayTime;

      if (diffSeconds < 60) {
        displayTime = `${diffSeconds} s`;
      } else if (diffSeconds < 3600) {
        const minutes = Math.floor(diffSeconds / 60);
        displayTime = `${minutes}m`;
      } else if (diffSeconds < 86400) {
        const hours = Math.floor(diffSeconds / 3600);
        displayTime = `${hours}h`;
      } else if (diffSeconds < 604800) {
        const days = Math.floor(diffSeconds / 86400);
        displayTime = `${days}d`;
      } else {
        displayTime = tweetDate.toLocaleDateString("sv-SE", {
          day: "numeric",
          month: "short",
        });
      }

      const exactTime = tweetDate.toLocaleDateString("en-US", {
        year: "numeric",
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });

      return { displayTime, exactTime };
    } catch (error) {
      console.error("Error formatting date:", error);
      return {
        displayTime: "Error formatting date",
        exactTime: "Error formatting date",
      };
    }
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

  const currentUserId = localStorage.getItem("userId");
  const isAuthor = tweet.user?._id === currentUserId;

  return (
    <div className="tweet">
      <small style={{ display: "none" }}>Tweet ID: {tweet._id}</small>
      <div className="tweet-avatar">
        <img
          src={
            tweet.user.profilepicture
              ? `http://localhost:5001/uploads/${tweet.user.profilepicture}`
              : profilePlaceholder
          }
          alt={`${tweet.user?.name}`}
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
          <div className="tweet-date-container">
            <span className="tweet-date">
              · {formatDate(tweet.createdAt).displayTime}
            </span>
            <div className="tweet-date-tooltip">
              {formatDate(tweet.createdAt).exactTime}
            </div>
          </div>
          {isAuthor && (
            <button
              className="tweet-delete-btn"
              onClick={handleDelete}
              title="Delete tweet"
            >
              <FaTrash />
            </button>
          )}
        </div>
        <div className="tweet-text">
          {tweet.content.split(/(\s+)/).map((word, index) => {
            if (word.startsWith("#")) {
              return (
                <Link key={index} to={`/hashtag/${word.slice(1)}`}>
                  {word}
                </Link>
              );
            }
            return word;
          })}
        </div>
        <div className="tweet-actions">
          <button className="tweet-action reply">
            {tweet.replies?.length > 0 ? <FaComment /> : <FaRegComment />}

            <span>{tweet.replies?.length || 0}</span>
          </button>
          <button className="tweet-action retweet">
            <FaRetweet />
            <span>{tweet.retweets?.length || 0}</span>
          </button>
          <button
            className={`tweet-action like ${isLiked ? "liked" : ""}`}
            onClick={handleLike}
            data-testid="like-button"
          >
            {isLiked ? <FaHeart /> : <FaRegHeart />}
            <span>{likesCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
