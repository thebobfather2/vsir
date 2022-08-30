import React from "react";
import k24logo from "../images/k24logo.png";
import Discord from "../images/Discord.png";
import "./KHome.css";

const KHome = () => {
  return (
 
    <div className="k24MainContainer">
    <h1 style={{ marginTop: "40px" }} className="k24Title">24 Carrot Bunny Club</h1>
    <div className="k24Main2">
    <a href="https://24carrotbunnyclub.com/">
      <img
        className="k24logo"
        src={k24logo}
        alt="k24logo"
        style={{ marginTop: "40px", }}
      ></img>
       <h3 style={{ marginTop: "10px", color: "white" }}>Website</h3>
    </a>
   
    <a href="https://discord.gg/GspeH23eFb/">
      <img
        className="Discord"
        src={Discord}
        alt="Discord"
      ></img>
             <h3 style={{ marginTop: "10px", color: "white" }}>Discord</h3>
    </a>   </div>
  </div>
);
};

export default KHome;