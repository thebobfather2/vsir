import React from "react";
import jtos from "../images/night.png";
import jtos2 from "../images/ladiez.png";
import jacklogo from "../images/jtlogo.png";
import twitter from "../images/twitter.png";

import "./JackTuber.css";

const JackTuber = () => {
  return (
    <div className="JTMainContainer">
    <div style={{  
      marginTop: "20px",
      borderRadius: "20px",
      padding: "20px",}}>
      <h1 className="JTTitle" style={{marginBottom: "30px"}}>Jack Tuber</h1>
  </div>

    <div className="JTMain2">

    <a href="https://opensea.io/collection/night-creeps/">
      <img
        className="jtos"
        src={jtos}
        alt="jtos"
        style={{ marginTop: "0px"}}
      ></img>
       <h3 style={{ marginTop: "0px", color: "white" }}>Buy Night Creeps</h3>
    </a>

    <a href="https://opensea.io/collection/ladiezoftheuniverse/">
      <img
        className="jtos2"
        src={jtos2}
        alt="jtos2"
        style={{ marginTop: "30px"}}
      ></img>
       <h3 style={{ marginTop: "0px", color: "white" }}>Buy Ladiez Of The Universe</h3>
    </a>

    <a href="https://www.voice.com/jacktuber/">
      <img
        className="jacklogo"
        src={jacklogo}
        alt="jacklogo"
        style={{ marginTop: "30px"}}
      ></img>
       <h3 style={{ marginTop: "0px", color: "white" }}>Voice</h3>
    </a>

    <a href="https://twitter.com/Jack__tuber/">
      <img
        className="twitter"
        src={twitter}
        alt="twitter"
        style={{ marginTop: "30px"}}
      ></img>
       <h3 style={{ marginTop: "0px", color: "white" }}>Twitter</h3>
    </a>
    
    </div>

  </div>
);
};

export default JackTuber;