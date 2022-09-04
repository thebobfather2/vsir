import React from "react";
import BaadLogo3 from "../images/BaadLogo.png";
import Discord0 from "../images/DiscordGray.png";
import "./Baad.css";

const Baad = () => {
  return (
  
  <div className="BaadMainContainer">

      <h1 className="BaadTitle" 
      style={{marginTop: "0px",
      borderRadius: "20px",
      padding: "50px" }}>Baad Goats</h1>
     
      <div className="BaadMain2">

      <a href="https://baadgoats.vercel.app/">
        <img
          className="BaadLogo3"
          src={BaadLogo3}
          alt="BaadLogo3"
      ></img>
         
        <h3 style={{color: "white"}}>Mint</h3>
      </a>

      <a href="https://stake.cardinal.so/7CMdsPLuo23LXA7An2jh6At859n3PFWFFzfVAccd1wYu/">
        <img
          className="BaadLogo3"
          src={BaadLogo3}
          alt="BaadLogo3"
      ></img>
         
        <h3 style={{color: "white"}}>Staking</h3>
      </a>
     
      <a href="https://discord.gg/GspeH23eFb/">
        <img
          className="Discord0"
          src={Discord0}
          alt="Discord0"
      ></img>
         
        <h3 style={{color: "white"}}>Discord</h3>
      </a>


      </div>



    </div>
  );
};

export default Baad;
