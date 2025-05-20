import { Tweetbox } from "./Tweetbox";
import { TweetsSection } from "./TweetsSection";
import Footer from "./Footer.jsx";
import { Aside } from "../components/Aside.jsx";
import "../styles/home.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Sidebar } from '../components/Sidebar.jsx'
export function Home() {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const userId = id || localStorage.getItem("userId");
    if (!userId) return;
    fetch(`http://localhost:5001/user/${userId}`)
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
