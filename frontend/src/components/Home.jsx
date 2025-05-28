import { Tweetbox } from "./Tweetbox";
import { TweetsSection } from "./TweetsSection";
import Footer from "./Footer.jsx";
import "../styles/home.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Aside } from "./Aside.jsx";
import { Sidebar } from "../components/Sidebar.jsx";
import { ShowCurrentProfile } from "./ShowCurrentProfile.jsx";


export function Home() {
  const [tweets, setTweets] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [shouldRefreshTweets, setShouldRefreshTweets] = useState(false);

  const fetchTweets = () => {
    fetch(`http://localhost:5001/api/tweets`)
      .then((res) => res.json())
      .then((data) => setTweets(data));
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = id || localStorage.getItem("userId");
        if (!userId) {
          setLoading(false);
          setError("No user ID found");
          return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          setError("No authentication token found");
          return;
        }

        const response = await fetch(
          `http://localhost:5001/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.status}`);
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error("Failed to load user:", err);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();

    const userId = id || localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (!userId) return;
    fetch(`http://localhost:5001/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Failed to load user:", err));
  }, [id]);
  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <>
    <div className="home-content">
      <h1 className="welcome-header">
        {loading
          ? "Loading..."
          : error
          ? error
          : user
          ? `Welcome, ${user.name}!`
          : "Welcome!"}
      </h1>
      <div className="content-frame">
                <div className="content-column">
          <Tweetbox
            user={user}
            setUser={setUser}
            id={id}
            onTweetPosted={() => setShouldRefreshTweets(true)}
          />
          <TweetsSection
            shouldRefresh={shouldRefreshTweets}
            setShouldRefresh={setShouldRefreshTweets}
          />
        </div>
        <Aside />
      </div>
     </div>
    </>
  );
}
