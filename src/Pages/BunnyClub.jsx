import React from "react";
import GhostBunny from "../images/ghostbunny.png";
import DiscordGray from "../images/DiscordGray.png";
import Carrot24 from "../images/k24logo.png";
import Gem from "../images/gem.png";


import "./BunnyClub.css";

const BunnyClub = () => {
  return (
    <div className="k24MainContainer">
    <div style={{  
      marginTop: "20px",
      borderRadius: "20px",
      padding: "20px",}}>
      <h1 className="k24Title" style={{marginBottom: "20px"}}>24 Carrot Bunny Club</h1>
  </div>

    <div className="k24Main2">

    <a href="https://ghostbunny.vercel.app/">
      <img
        className="GhostBunny"
        src={GhostBunny}
        alt="GhostBunny"
        style={{ marginTop: "0px"}}
      ></img>
       <h3 style={{marginBottom: "40px", color: "white" }}>Mint Ghost Bunny</h3>
    </a>

    <a href=" https://stake.cardinal.so/BbhGccmag4C9SrEituginjFmVkNudAATdefRgFKzBpQw">
      <img
        className="GhostBunny"
        src={Gem}
        alt="GhostBunny"
        style={{ marginTop: "0px"}}
      ></img>
       <h3 style={{marginBottom: "40px", color: "white" }}>Ghost Bunny Staking</h3>
    </a>

    <a href="https://24carrotbunnyclub.com/">
      <img
        className="GhostBunny"
        src={Carrot24}
        alt="Carrot24"
        style={{ marginTop: "0px"}}
      ></img>
       <h3 style={{ marginBottom: "20px", color: "white" }}>Official Website</h3>
    </a>

    <a href="https://discord.gg/GspeH23eFb/">
      <img
        className="DiscordGray"
        src={DiscordGray}
        alt="DiscordGray"
        style={{ marginTop: "0px"}}
      ></img>
         <h3 style={{ marginBottom: "40px", color: "white" }}>Discord</h3>
    </a>  
    
    </div>

  </div>
);
};

export default BunnyClub;