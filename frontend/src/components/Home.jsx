import { Tweetbox } from "./Tweetbox";
import { TweetsSection } from "./TweetsSection";
import Footer from "./Footer.jsx";
import { Aside } from "../components/Aside.jsx";
import "../styles/home.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar.jsx";
export function Home() {
  const [tweets, setTweets] = useState([]);
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const fetchTweets = () => {
    fetch(`http://localhost:5001/api/tweets`)
      .then((res) => res.json())
      .then((data) => setTweets(data));
  };
  useEffect(() => {
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

  return (
    <>
      <h1>{user ? user.name : "Loading.."}</h1>
      <div className="content-frame">
        <Sidebar />
        <div className="content-column">
          <Tweetbox user={user} />
          {tweets && tweets.length > 0 ? (
            tweets.map((tweet) => (
              <TweetsSection key={tweet._id}>{tweet.content}</TweetsSection>
            ))
          ) : (
            <p>No tweets found</p>
          )}
          <TweetsSection>Hej hopp, kaffekopp!</TweetsSection>
        </div>
        <Aside />
      </div>
      <Footer />
    </>
  );
}
