import { useState, useEffect } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
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
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

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

  const toggleComments = () => {
    console.log("Toggling comments, current state:", showComments);
    setShowComments(!showComments);
  };

  useEffect(() => {
    if (showComments) {
      fetchComments();
    }
  }, [showComments, tweet._id]);

  // Fetch comments when showComments is toggled to true
  const fetchComments = async () => {
    if (!showComments || isLoadingComments) return;

    console.log("Fetching comments for tweet:", tweet._id);
    setIsLoadingComments(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5001/api/tweets/${tweet._id}/comments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const commentData = await response.json();
        console.log("Comments fetched:", commentData);
        setComments(commentData);
      } else {
        console.error("Failed to fetch comments:", response.status);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoadingComments(false);
    }
  };

  const handleCommentAdded = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  const handleCommentDeleted = (commentId) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment._id !== commentId)
    );
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:5001/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const userData = await response.json();
          setCurrentUser(userData);
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  // Add this new effect to fetch just the comment count on initial load
  useEffect(() => {
    const fetchCommentsCount = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:5001/api/tweets/${tweet._id}/comments/count`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const { count } = await response.json();
          // Just update the count without loading all comments
          setComments(Array(count).fill(null));
        }
      } catch (error) {
        console.error("Error fetching comments count:", error);
      }
    };

    fetchCommentsCount();
  }, [tweet._id]);

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
          <button className="tweet-action reply" onClick={toggleComments}>
            {comments.length > 0 ? <FaComment /> : <FaRegComment />}
            <span>{comments.length || 0}</span>
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

        {showComments && (
          <div className="tweet-comments-section">
            {currentUser && (
              <CommentForm
                tweetId={tweet._id}
                onCommentAdded={handleCommentAdded}
                user={currentUser}
              />
            )}
            {isLoadingComments ? (
              <div className="loading-comments">Loading comments...</div>
            ) : comments.length > 0 ? (
              <div className="comments-list">
                {comments.map((comment) =>
                  // Only render if comment exists and has an _id property
                  comment && comment._id ? (
                    <Comment
                      key={comment._id}
                      comment={comment}
                      tweetId={tweet._id}
                      onCommentDeleted={handleCommentDeleted}
                    />
                  ) : null
                )}
              </div>
            ) : (
              <div className="no-comments">
                No comments yet. Be the first to comment!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tweet;
