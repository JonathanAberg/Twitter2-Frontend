import { Tweetbox } from "./Tweetbox";
import { TweetsSection } from "./TweetsSection";
import Footer from "./Footer.jsx";
import { Aside } from "../components/Aside.jsx";
import "../styles/home.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar.jsx";

// Missing component declaration
export function Home() {
  // Missing state declarations
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

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

        const response = await fetch(`http://localhost:5001/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
  }, [id]);

  return (
    <>
      <h1
        className="welcome-header"
        style={{
          padding: "10px 20px",
          borderBottom: "1px solid #e6ecf0",
          fontSize: "20px",
        }}
      >
        {loading
          ? "Loading..."
          : error
          ? error
          : user
          ? `Welcome, ${user.name}!`
          : "Welcome!"}
      </h1>
      <div className="content-frame">
        <Sidebar />
        <div className="content-column">
          <Tweetbox user={user} setUser={setUser} id={id} />
          <TweetsSection>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque
            commodi, eveniet sint repellendus saepe, repellat consequuntur
            dolorum dolores vel quasi hic cumque laborum debitis quia porro
            facere culpa placeat ex?
          </TweetsSection>
          <TweetsSection>Hej hopp, kaffekopp!</TweetsSection>
        </div>
        <Aside />
      </div>
      <Footer />
    </>
  );
}
