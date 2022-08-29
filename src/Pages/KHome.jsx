import React from "react";
import k24logo from "../images/k24logo.png";
import Discord from "../images/Discord.png";
import "./KHome.css";

const KHome = () => {
  return (
 
    <div className="k24MainContainer">
    <h1 className="k24Title">24 Carrot Bunny Club</h1>
    <div>
    <a href="https://24carrotbunnyclub.com/">
      <img
        className="k24logo"
        src={k24logo}
        alt="k24logo"
        style={{ marginTop: "30px", marginBottom: "30px", maxHeight: "300px" }}
      ></img>
    </a>
  </div>
   
    <a href="https://discord.gg/GspeH23eFb/">
      <img
        className="Discord"
        src={Discord}
        alt="Discord"
        style={{ marginTop: "30px", marginBottom: "30px", maxHeight: "300px" }}
      ></img>
    </a>
  </div>
);
};

export default KHome;