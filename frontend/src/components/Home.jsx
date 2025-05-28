import { Tweetbox } from "./Tweetbox";
import { TweetsSection } from "./TweetsSection";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "./UserContext";

import "../styles/home.css";

export function Home() {
  const { id } = useParams();
  const [tweets, setTweets] = useState([]);
  const [shouldRefreshTweets, setShouldRefreshTweets] = useState(false);

  const { user } = useUser();

  const fetchTweets = () => {
    fetch(`http://localhost:5001/api/tweets`)
      .then((res) => res.json())
      .then((data) => setTweets(data));
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <>
      <div className="home-content">
        <h1 className="welcome-header">
          {user ? `Welcome, ${user.name}!` : "Welcome!"}
        </h1>
        <div className="content-frame">
          <div className="content-column">
            <Tweetbox
              user={user}
              id={id}
              onTweetPosted={() => setShouldRefreshTweets(true)}
            />
            <TweetsSection
              shouldRefresh={shouldRefreshTweets}
              setShouldRefresh={setShouldRefreshTweets}
            />
          </div>
        </div>
      </div>
    </>
  );
}