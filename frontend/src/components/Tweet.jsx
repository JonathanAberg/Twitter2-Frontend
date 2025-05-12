import { useState } from "react";
import "../styles/Tweet.css";
import { mockUserData } from "../mockData";
import {
  FaComment,
  FaRetweet,
  FaHeart,
  FaRegHeart,
  FaShareAlt,
} from "react-icons/fa";

const Tweet = ({ tweet }) => {
  const [likes, setLikes] = useState(tweet.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [retweets, setRetweets] = useState(tweet.retweets);
  const [isRetweeted, setIsRetweeted] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleRetweet = () => {
    if (isRetweeted) {
      setRetweets(retweets - 1);
    } else {
      setRetweets(retweets + 1);
    }
    setIsRetweeted(!isRetweeted);
  };

  console.log("Rendering Tweet:", tweet.id);

  return (
    <div className="tweet">
      <div className="tweet-avatar">
        <img src={tweet.userImage || mockUserData.profileImage} alt="Profile" />
      </div>
      <div className="tweet-content">
        <div className="tweet-header">
          <span className="tweet-name">{tweet.userName}</span>
          <span className="tweet-username">@{tweet.userHandle}</span>
          <span className="tweet-time">{tweet.time}</span>
        </div>
        <div className="tweet-text">{tweet.content}</div>
        {tweet.media && (
          <div className="tweet-media">
            <img src={tweet.media} alt="Tweet media" />
          </div>
        )}
        <div className="tweet-actions">
          <div className="tweet-action">
            <FaComment />
            <span>{tweet.comments}</span>
          </div>
          <div
            className={`tweet-action ${isRetweeted ? "retweeted" : ""}`}
            onClick={handleRetweet}
          >
            <FaRetweet />
            <span>{retweets}</span>
          </div>
          <div
            className={`tweet-action ${isLiked ? "liked" : ""}`}
            onClick={handleLike}
          >
            {isLiked ? <FaHeart /> : <FaRegHeart />}
            <span>{likes}</span>
          </div>
          <div className="tweet-action">
            <FaShareAlt />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
