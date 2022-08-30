import React from "react";
import BaadLogo from "../images/BaadLogo.png";
import Discord0 from "../images/Discord0.png";
import "./Baad.css";

const Baad = () => {
  return (
  
  <div className="BaadMainContainer">
      <h1 style={{ marginTop: "-200px" }} className="BaadTitle">Baad Goats</h1>
     
      <div className="BaadMain2">
      <a href="https://stake.cardinal.so/7CMdsPLuo23LXA7An2jh6At859n3PFWFFzfVAccd1wYu/">
        <img
          className="BaadLogo"
          src={BaadLogo}
          alt="BaadLogo"
          style={{marginTop: "20px", marginRight: "40px" }}>
          </img>
        <h3 style={{ marginTop: "-10px",  marginRight: "40px", color: "white" }}>Staking</h3>
      </a>
     
      <a href="https://discord.gg/GspeH23eFb/">
        <img
          className="Discord0"
          src={Discord0}
          alt="Discord0"
          style={{ marginTop: "20px", marginLeft: "40px" }}>
          </img>
        <h3 style={{ marginTop: "-10px",  marginLeft: "40px", color: "white" }}>Discord</h3>
      </a>
      </div>

    </div>
  );
};

export default Baad;
