import { useState } from "react";
import "../styles/CommentForm.css";
import profilePlaceholder from "../assets/profile-placeholder.jpg";

const CommentForm = ({ tweetId, onCommentAdded, user }) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const profilePic = user?.profilepicture
    ? `http://localhost:5001/uploads/${user.profilepicture}`
    : profilePlaceholder;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5001/api/tweets/${tweetId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content }),
        }
      );

      if (response.ok) {
        const newComment = await response.json();
        setContent("");
        if (onCommentAdded) {
          onCommentAdded(newComment);
        }
      } else {
        console.error("Failed to post comment:", await response.text());
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="comment-form">
      <div className="comment-form-avatar">
        <img
          src={profilePic}
          alt="Profile"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = profilePlaceholder;
          }}
        />
      </div>
      <form onSubmit={handleSubmit} className="comment-form-content">
        <textarea
          placeholder="Write a reply..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={140}
          className="comment-input"
        />
        <div className="comment-form-actions">
          <span className="comment-char-count">{content.length}/140</span>
          <button
            type="submit"
            disabled={isSubmitting || !content.trim()}
            className="comment-submit-btn"
          >
            {isSubmitting ? "Replying..." : "Reply"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
