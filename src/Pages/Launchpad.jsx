import React from "react";
import launchimg from "../images/launchimg.png";
import BaadLogo from "../images/BaadLogo.png";
import "./Launchpad.css";

const Launchpad = () => {
  return (
    <div className="LaunchpadMain">

<img className="launchimg"
          src={launchimg}
          alt="launchimg"
          ></img>
     
      <div className="LaunchpadMain2">
      <a href="https://baadgoats.vercel.app/">
        <img
          className="BaadLogo"
          src={BaadLogo}
          alt="BaadLogo"
          style={{ marginTop: "0px", marginRight: "10px" }}
      ></img>
         <h3 style={{ marginTop: "0px", marginRight: "10px", color: "white" }}>Mint Baad Goats</h3>
      </a>
      </div>

    </div>
  );
};

export default Launchpad;