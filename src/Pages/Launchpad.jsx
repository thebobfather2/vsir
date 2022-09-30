import React from "react";
import launchimg from "../images/launchimg.png";
import BaadGif from "../images/baad.gif";
import CarrotGif from "../images/Carrot.gif";
import "./Launchpad.css";

const Launchpad = () => {
  return (
    <div className="LaunchpadMain">

<img className="launchimg"
          src={launchimg}
          alt="launchimg"
          ></img>

     <br></br>
     <div className="Projects">

      <div className="LaunchpadMain2">
      <a href="https://ghostbunny.vercel.app/">
        <img
          className="CarrotGif"
          src={CarrotGif}
          alt="CarrotGif"
      ></img>
         <h3 style={{fontSize: "1.5em", color: "white", marginTop: "10px" }}>Mint Ghost Bunny</h3>
      </a>
      </div>

      <div className="LaunchpadMain2">
      <a href="https://baadgoats.vercel.app/">
        <img
          className="BaadGif"
          src={BaadGif}
          alt="BaadGif"
      ></img>
         <h3 style={{fontSize: "1.5em", color: "white", marginTop: "10px"}}>Mint Baad Goats</h3>
      </a>
      </div>
      </div>
    </div>
  );
};

export default Launchpad;