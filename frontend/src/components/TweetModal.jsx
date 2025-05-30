import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  FaTimes,
  FaImage,
  FaSmile,
  FaPoll,
  FaCalendarPlus,
} from "react-icons/fa";
import "../styles/TweetModal.css";
import profilePlaceholder from "../assets/profile-placeholder.jpg";

const TweetModal = ({ isOpen, onClose, user, onTweetPosted }) => {
  const [tweetContent, setTweetContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tweetContent.trim() && !selectedImage) return;

    setIsSubmitting(true);
    console.log("Submitting tweet with content:", tweetContent);

    try {
      const token = localStorage.getItem("token");

      const tweetData = {
        content: tweetContent,

        userId: user?.id || user?._id,
      };

      console.log("Sending tweet data:", tweetData);

      const response = await fetch("http://localhost:5001/api/tweets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tweetData),
      });

      console.log("Response status:", response.status);

      if (selectedImage) {
        console.log("Uploading image separately...");
        const imageFormData = new FormData();
        imageFormData.append("image", selectedImage);

        const uploadResponse = await fetch("http://localhost:5001/api/upload", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: imageFormData,
        });

        if (!uploadResponse.ok) {
          console.error("Failed to upload image");
        }
      }

      if (response.ok) {
        console.log("Tweet posted successfully");
        setTweetContent("");
        setSelectedImage(null);
        setImagePreview("");
        onTweetPosted();
        onClose();
      } else {
        let errorMessage = "Failed to post tweet. Please try again.";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
          console.error("Failed to post tweet:", errorData);
        } catch (e) {
          console.error("Error parsing error response:", e);
        }
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Error posting tweet:", error);
      alert("An error occurred while posting your tweet.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="tweet-modal-overlay">
      <div className="tweet-modal-content" ref={modalRef}>
        <div className="tweet-modal-header">
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div className="tweet-modal-body">
          <div className="tweet-modal-avatar">
            <img
              src={
                user?.profilepicture
                  ? `http://localhost:5001/uploads/${user.profilepicture}`
                  : profilePlaceholder
              }
              alt="Profile"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = profilePlaceholder;
              }}
            />
          </div>
          <div className="tweet-modal-input">
            <textarea
              ref={textareaRef}
              placeholder="What's happening?"
              value={tweetContent}
              onChange={(e) => setTweetContent(e.target.value)}
              rows={4}
            />
            {imagePreview && (
              <div className="image-preview-container">
                <button
                  className="remove-image-btn"
                  onClick={() => {
                    setSelectedImage(null);
                    setImagePreview("");
                  }}
                >
                  <FaTimes />
                </button>
                <img
                  src={imagePreview}
                  alt="Selected"
                  className="image-preview"
                />
              </div>
            )}
            <div className="tweet-modal-footer">
              <div className="tweet-modal-actions">
                <label className="tweet-modal-icon">
                  <FaImage />
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
                <button className="tweet-modal-icon">
                  <FaSmile />
                </button>
                <button className="tweet-modal-icon">
                  <FaPoll />
                </button>
                <button className="tweet-modal-icon">
                  <FaCalendarPlus />
                </button>
              </div>
              <button
                className="tweet-modal-button"
                onClick={handleSubmit}
                disabled={
                  isSubmitting || (!tweetContent.trim() && !selectedImage)
                }
              >
                {isSubmitting ? "Posting..." : "Tweet"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default TweetModal;
