import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Comment.css";
import profilePlaceholder from "../assets/profile-placeholder.jpg";
import { FaHeart, FaRegHeart, FaTrash } from "react-icons/fa";

const Comment = ({ comment, tweetId, onCommentDeleted }) => {
  const [isLiked, setIsLiked] = useState(
    comment.likes?.includes(localStorage.getItem("userId")) || false
  );
  const [likesCount, setLikesCount] = useState(comment.likes?.length || 0);

  const formatDate = (dateString) => {
    try {
      const commentDate = new Date(dateString);
      const now = new Date();

      const diffSeconds = Math.floor((now - commentDate) / 1000);

      let displayTime;
      if (diffSeconds < 60) {
        displayTime = `${diffSeconds}s`;
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
        displayTime = commentDate.toLocaleDateString("sv-SE", {
          day: "numeric",
          month: "short",
        });
      }

      return displayTime;
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Unknown";
    }
  };

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5001/api/tweets/${tweetId}/comments/${comment._id}/like`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setIsLiked(!isLiked);
        setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
      }
    } catch (error) {
      console.error("Error liking/unliking comment:", error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this comment?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5001/api/tweets/${tweetId}/comments/${comment._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        if (typeof onCommentDeleted === "function") {
          onCommentDeleted(comment._id);
        }
      } else {
        console.error("Failed to delete comment:", await response.text());
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const currentUserId = localStorage.getItem("userId");
  const isAuthor = comment.user?._id === currentUserId;

  return (
    <div className="comment">
      <div className="comment-avatar">
        <img
          src={
            comment.user?.profilepicture
              ? `http://localhost:5001/uploads/${comment.user.profilepicture}`
              : profilePlaceholder
          }
          alt={comment.user?.name || "User"}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = profilePlaceholder;
          }}
        />
      </div>
      <div className="comment-content">
        <div className="comment-header">
          <Link to={`/profile/${comment.user?._id}`} className="comment-name">
            {comment.user?.name || "Unknown User"}
          </Link>
          <span className="comment-username">
            @
            {comment.user?.nickname ||
              comment.user?.name?.toLowerCase().replace(/\s/g, "") ||
              "unknown"}
          </span>
          <span className="comment-date">
            · {formatDate(comment.createdAt)}
          </span>
          {isAuthor && (
            <button
              className="comment-delete-btn"
              onClick={handleDelete}
              title="Delete comment"
            >
              <FaTrash />
            </button>
          )}
        </div>
        <div className="comment-text">{comment.content}</div>
        <div className="comment-actions">
          <button
            className={`comment-action like ${isLiked ? "liked" : ""}`}
            onClick={handleLike}
          >
            {isLiked ? <FaHeart /> : <FaRegHeart />}
            <span>{likesCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
