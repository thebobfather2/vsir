import React from "react";
import family from "../images/family.png";
import EddGIF from "../images/EddGIF.gif";
import Discord from "../images/Discord.png";
import "./EddHome.css";

const EddHome = () => {
  return (
  
  <div className="EddHomeMainContainer">
      <h1 className="EddHomeTitle">Edd Fox</h1>
      <h3 style={{ marginTop: "100px" }}>Rabbits are friends, not food!</h3>
      <br></br>
      <img className="family" src={family} alt="family" />
      <h3 style={{ marginTop: "15px" }}>Meet Reuben</h3>
      <br></br>

      <div>

      </div>
      <h3 style={{ marginTop: "30px" }}>Minting September 27, 2022</h3>
     
      <a href="https://discord.gg/GQgN7kSDVn/">
        <img
          className="Discord"
          src={Discord}
          alt="Discord"
          style={{ marginTop: "30px", marginBottom: "30px", maxHeight: "300px" }}
        ></img>
      </a>
     
      <a href="https://nftcalendar.io/event/edd-fox/">
        <img
          className="EddGIF"
          src={EddGIF}
          alt="EddGIF"
          style={{ marginTop: "15px", marginBottom: "30px", maxHeight: "300px" }}
        ></img>
      </a>
    </div>
  );
};

export default EddHome;
