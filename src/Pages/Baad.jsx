import React from "react";
import BaadLogo from "../images/BaadLogo.png";
import DiscordGray from "../images/DiscordGray.png";
import "./Baad.css";

const Baad = () => {
  return (
  
  <div className="BaadMainContainer">
      <h1 style={{ marginTop: "-150px" }} className="BaadTitle">Baad Goats</h1>
     
      <div className="BaadMain2">
      <a href="https://stake.cardinal.so/7CMdsPLuo23LXA7An2jh6At859n3PFWFFzfVAccd1wYu/">
        <img
          className="BaadLogo"
          src={BaadLogo}
          alt="BaadLogo"
          style={{marginTop: "40px", marginRight: "40px" }}>
          </img>
        <h3 style={{ marginTop: "-10px",  marginRight: "40px", color: "black" }}>Staking</h3>
      </a>
     
      <a href="https://discord.gg/GspeH23eFb/">
        <img
          className="DiscordGray"
          src={DiscordGray}
          alt="DiscordGray"
          style={{ marginTop: "40px", marginLeft: "40px" }}>
          </img>
        <h3 style={{ marginTop: "-10px",  marginLeft: "40px", color: "black" }}>Discord</h3>
      </a>
      </div>

    </div>
  );
};

export default Baad;
