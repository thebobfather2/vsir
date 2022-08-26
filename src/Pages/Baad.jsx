import React from "react";
import BaadLogo from "../images/BaadLogo.png";
import EddGIF from "../images/EddGIF.gif";
import Discord from "../images/Discord.png";
import "./Baad.css";

const EddHome = () => {
  return (
  
  <div className="BaadMainContainer">
      <h1 className="BaadTitle">Baad Goats</h1>
      <div>
      <a href="https://stake.cardinal.so/7CMdsPLuo23LXA7An2jh6At859n3PFWFFzfVAccd1wYu/">
        <img
          className="BaadLogo"
          src={BaadLogo}
          alt="BaadLogo"
          style={{ marginTop: "30px", marginBottom: "30px", maxHeight: "300px" }}
        ></img>
      </a>
    </div>
     
      <a href="https://discord.gg/GQgN7kSDVn/">
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

export default EddHome;
