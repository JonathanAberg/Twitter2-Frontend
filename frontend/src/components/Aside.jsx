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
      console.log("Tweets:", data);
      setTweets(data);
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
        <TrendTopic
          title="Samt"
          description="Trending in Sweden"
          tweets="2,640"
        />
        <TrendTopic
          title="China"
          description="Politics Treding"
          tweets="527K"
        />
        <TrendTopic
          title="#Israel"
          description="Trending in Sweden"
          tweets="10.4K"
        />
        <TrendTopic
          title="#babygirl"
          description="Trending in Sweden"
          tweets=""
        />
        <TrendTopic
          title="Newroz"
          description="Trending in Sweden"
          tweets="60.4K"
        />
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
        {tweets && <p className="tweets-amount">{tweets} Tweets</p>}
      </div>
      <FiMoreHorizontal className="lucide-ellipsis-icon" />
    </div>
  );
}
