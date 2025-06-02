import { useState, useEffect, useCallback } from "react";
import "../styles/tweetssection.css";
import Tweet from "./Tweet";

export function TweetsSection({ shouldRefresh, setShouldRefresh }) {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTweets = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

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
      console.log("Tweets fetched successfully in TweetsSection:", data);
    } catch (err) {
      console.error("Error fetching tweets:", err);
      setError("Failed to load tweets");
    } finally {
      setLoading(false);
      setShouldRefresh(false);
    }
  }, [setShouldRefresh]);

  useEffect(() => {
    if (shouldRefresh || (tweets.length === 0 && !error && loading)) {
      fetchTweets();
    }
  }, [shouldRefresh, fetchTweets, tweets.length, error, loading]);

  const handleTweetDeleted = (deletedTweetId) => {
    console.log("Removing tweet with ID:", deletedTweetId);

    setTweets((prevTweets) => {
      const updatedTweets = prevTweets.filter(
        (tweet) => tweet._id !== deletedTweetId
      );
      console.log(
        "Tweets before:",
        prevTweets.length,
        "Tweets after:",
        updatedTweets.length
      );
      return updatedTweets;
    });
  };

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
              user: tweet.user ||
                tweet.author || { name: "Unknown User", nickname: "unknown" },
            }}
            onTweetDeleted={handleTweetDeleted}
          />
        ))
      ) : (
        <div className="no-tweets">No tweets to display. Start tweeting!</div>
      )}
    </div>
  );
}
