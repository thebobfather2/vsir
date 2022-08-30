import React from "react";
import GhostBunny from "../images/ghostbunny.png";
import DiscordGray from "../images/DiscordGray.png";
import "./KHome.css";

const KHome = () => {
  return (
 
    <div className="k24MainContainer">
    <h1 style={{ marginTop: "40px" }} className="k24Title">24 Carrot Bunny Club</h1>
    <div className="k24Main2">
    <a href="https://24carrotbunnyclub.com/">
      <img
        className="GhostBunny"
        src={GhostBunny}
        alt="GhostBunny"
        style={{ marginTop: "40px", marginRight: "40px" }}
      ></img>
       <h3 style={{ marginTop: "10px", marginRight: "40px", color: "white" }}>Official Website</h3>
    </a>
   
    <a href="https://discord.gg/GspeH23eFb/">
      <img
        className="DiscordGray"
        src={DiscordGray}
        alt="DiscordGray"
        style={{ marginTop: "40px", marginLeft: "40px" }}
      ></img>
             <h3 style={{ marginTop: "10px",  marginLeft: "40px", color: "white" }}>Discord</h3>
    </a>   </div>
  </div>
);
};

export default KHome;