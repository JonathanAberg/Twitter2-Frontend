import "../styles/home.css";
import { Tweetbox } from `./Tweetbox`;
import { TweetsSection } from "./TweetsSection";
import { LogoutPopup } from "./LogoutPopup";
import Inlogning from "../inlogning/inlogning";
import Inlogningsval from "../inlogning/inlogningsval";
import { useParams } from "react-router-dom";
import React,{useState,useEffect} from "react";


export function Home() {
    const {id}=useParams()
    const [user,setUser] = useState(null)
    useEffect(()=>{
        fetch(`http://localhost:5000/user/${id}`).then(res=>res.json()).then(data=> setUser(data))
    },[id])


  return (
    <>
      <div className="page-label">
        <h1>Home</h1>
      </div>
      <Tweetbox />
      <TweetsSection>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque commodi,
        eveniet sint repellendus saepe, repellat consequuntur dolorum dolores
        vel quasi hic cumque laborum debitis quia porro facere culpa placeat ex?
      </TweetsSection>
      <TweetsSection>Hej hopp, kaffekopp!</TweetsSection>
      <LogoutPopup />
    <Inlogning/>
     <Inlogningsval/>
    </>
  );
}
