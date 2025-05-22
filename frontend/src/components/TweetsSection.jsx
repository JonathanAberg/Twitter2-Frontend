import { useState, useEffect } from "react";
import "../styles/tweetssection.css";
import Tweet from "./Tweet";

export function TweetsSection({ shouldRefresh, setShouldRefresh }) {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5001/api/tweets", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch tweets: ${response.status}`);
        }

        const data = await response.json();
        setTweets(data);

        if (shouldRefresh) {
          setShouldRefresh(false);
        }
      } catch (err) {
        console.error("Error fetching tweets:", err);
        setError("Failed to load tweets");
      } finally {
        setLoading(false);
      }
    };

    fetchTweets();
  }, [shouldRefresh]);

  if (loading) return <div className="loading">Loading tweets...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="tweets-container">
      {tweets.length > 0 ? (
        tweets.map((tweet, index) => (
          <Tweet
            key={tweet._id || index}
            tweet={{
              ...tweet,
              user: tweet.user || tweet.author || { name: "Unknown User" },
            }}
          />
        ))
      ) : (
        <div className="no-tweets">No tweets to display. Start tweeting!</div>
      )}
    </div>
  );
}
