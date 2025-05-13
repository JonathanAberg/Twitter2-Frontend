import { Tweetbox } from "./Tweetbox";
import { TweetsSection } from "./TweetsSection";
import Footer from "./Footer.jsx";
import { Aside } from "../components/Aside.jsx";
import "../styles/home.css";
import { data, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function Home() {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const userId = id || localStorage.getItem("token");
    if (!userId) return;
    fetch(`http://localhost:5000/user/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [id]);

  return (
    <>
      <div className="content-frame">
        <div className="content-column">
          <Tweetbox />
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
