import { useState, useEffect } from "react";

import "../styles/aside.css";
import { FiSearch, FiMoreHorizontal } from "react-icons/fi";
import SuggestedUsers from "./SuggestedUsers";
import { SearchResult } from "./searchResult";

export function Aside() {
  const [tweets, setTweets] = useState([]);
  const [trending, setTrending] = useState([]);
  const [allhashtags, setAllhashtags] = useState([]);
  const [search, setSearch] = useState("");

  console.log("allhashtags som skickas till SearchResult:", allhashtags);

  
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
        const sorted = [...data].sort(
          (a, b) => b.likes.length - a.likes.length
        );
        setTweets(sorted.slice(0, 4));

        const hashtagCounts = {};

        sorted.forEach((tweet) => {
          tweet.hashtags.forEach((tag) => {
            hashtagCounts[tag] = (hashtagCounts[tag] || 0) + 1;
          });
        });
        setAllhashtags(hashtagCounts);
        const trendingHashtags = Object.entries(hashtagCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 4);

        setTrending(trendingHashtags);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="trends-aside-wrapper">
      <div className="search-wrapper">
        <FiSearch className="lucide-search-icon" />
        <input
          id="search-field"
          type="text"
          value={search}
          placeholder="Search Twitter"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div>
        {search.length > 0 && (
          <SearchResult trending={trending} allhashtags={allhashtags} search={search} />
        )}
      </div>
      <div className="trends">
        <h2 className="trends-aside-title">Trending Tweets</h2>

        {tweets.map((tweet) => (
          <TrendTopic
            key={tweet._id}
            title={
              tweet.content.length > 20
                ? tweet.content.slice(0, 4) + "..."
                : tweet.content
            }
            description={tweet.user?.nickname || "Unknown user"}
            tweets={`${tweet.likes.length} likes`}
          />
        ))}

        <h2 className="trends-aside-title">Trending Hashtags</h2>
        {trending.map(([tag, count]) => (
          <TrendTopic
            key={tag}
            title={`#${tag}`}
            description="Trending hashtag"
            tweets={`${count} tweets`}
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
