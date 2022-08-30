import React from "react";
import BaadLogo from "../images/BaadLogo.png";
import Discord from "../images/Discord.png";
import "./Baad.css";

const Baad = () => {
  return (
  
  <div className="BaadMainContainer">
      <h1  style={{ marginTop: "100px" }} className="BaadTitle">Baad Goats</h1>
      <div>
      <a href="https://stake.cardinal.so/7CMdsPLuo23LXA7An2jh6At859n3PFWFFzfVAccd1wYu/">
        <img
          className="BaadLogo"
          src={BaadLogo}
          alt="BaadLogo"
          style={{ marginTop: "30px", marginBottom: "-10px", maxHeight: "300px" }}
        ></img>
                     <h3 style={{ marginBottom: "10px", color: "white" }}>Staking</h3>
      </a>
    </div>
     
      <a href="https://discord.gg/GspeH23eFb/">
        <img
          className="Discord"
          src={Discord}
          alt="Discord"
          style={{ marginTop: "30px", marginBottom: "5px", maxHeight: "300px" }}
        ></img>
                     <h3 style={{ marginBottom: "30px", color: "white" }}>Discord</h3>
      </a>
    </div>
  );
};

export default Baad;
