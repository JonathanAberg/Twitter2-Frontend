import { useState, useEffect } from "react";

import "../styles/aside.css";
import { FiSearch, FiMoreHorizontal } from "react-icons/fi";
import SuggestedUsers from "./SuggestedUsers";

export function Aside() {
  const [tweets, setTweets] = useState([]);

useEffect(() => {
  const token = localStorage.getItem("token");

  fetch("http://localhost:5001/api/alltweets", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Fel vid hämtning: " + res.status);
      return res.json();
    })
.then((data) => {
  const sorted = [...data].sort((a, b) => b.likes.length - a.likes.length);
  setTweets(sorted.slice(0, 5));
})
    .catch((err) => console.error(err));
}, []);

return (
  <div className="trends-aside-wrapper">
    <div className="search-wrapper">
      <FiSearch className="lucide-search-icon" />
      <input id="search-field" type="text" placeholder="Search Twitter" />
    </div>

    <div className="trends">
      <h2 className="trends-aside-title">Trends for you</h2>

      {tweets.map((tweet) => (
        <TrendTopic
          key={tweet._id}
          title={
            tweet.content.length > 5
              ? tweet.content.slice(0, 5) + "..."
              : tweet.content
          }
          description={tweet.user?.nickname || "Unknown user"}
          tweets={`${tweet.likes.length} likes`}
        />
      ))}
    </div>

    <SuggestedUsers />
  </div>
);

}

function TrendTopic({ title, description, tweets }) {
  return (
    <div className="topic-wrapper">
      <div className="topic-container">
        <p className="trend-description">{description}</p>
        <strong className="topic">{title}</strong>
        {tweets && <p className="tweets-amount">{tweets}</p>}
      </div>
      <FiMoreHorizontal className="lucide-ellipsis-icon" />
    </div>
  );
}
