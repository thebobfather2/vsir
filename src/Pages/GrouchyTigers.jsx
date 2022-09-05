import React from "react";
import gtos from "../images/gtos.png";
import gtcubs from "../images/gtcubs.png";
import DiscordGT from "../images/DiscordGT.png";
import tigress from "../images/tigress.png";
import site from "../images/grouchy.png";

import "./GrouchyTigers.css";

const GrouchyTigers = () => {
  return (
    <div className="GTMainContainer">
    <div style={{  
      marginTop: "20px",
      borderRadius: "20px",
      padding: "20px",}}>
      <h1 className="GTTitle" style={{marginBottom: "30px", fontSize: "4em"}}>Grouchy Tiger Social Club</h1>
  </div>

    <div className="GTMain2">

    <a href="grouchytigersocialclub.com">
      <img
        className="site"
        src={site}
        alt="site"
        style={{ marginTop: "0px"}}
      ></img>
       <h3 style={{ marginTop: "0px", color: "white" }}>Official Website</h3>
    </a>
    <a href="https://opensea.io/collection/grouchy-tiger-social-club">
      <img
        className="gtos"
        src={gtos}
        alt="gtos"
        style={{ marginTop: "0px"}}
      ></img>
       <h3 style={{ marginTop: "0px", color: "white" }}>Buy Tigers On OpenSea</h3>
    </a>

    <a href="https://opensea.io/collection/grouchy-cubs-social-club">
      <img
        className="gtcubs"
        src={gtcubs}
        alt="gtcubs"
        style={{ marginTop: "0px"}}
      ></img>
       <h3 style={{ marginTop: "0px", color: "white" }}>Buy Cubs On OpenSea</h3>
    </a>
   
    <a href="https://mint.grouchytigersocialclub.com">
      <img
        className="tigress"
        src={tigress}
        alt="tigress"
        style={{ marginTop: "0px"}}
      ></img>
         <h3 style={{ marginTop: "0px", color: "white" }}>Mint A Tigress</h3>
    </a>  

    <a href="discord.gg/grouchytigers">
      <img
        className="DiscordGT"
        src={DiscordGT}
        alt="DiscordGT"
        style={{ marginTop: "0px"}}
      ></img>
         <h3 style={{ marginTop: "0px", color: "white" }}>Discord</h3>
    </a>  
    
    
    </div>

  </div>
);
};

export default GrouchyTigers;