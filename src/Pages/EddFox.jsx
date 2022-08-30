import React from "react";
import family from "../images/family.png";
import EddGIF from "../images/EddGIF.gif";
import nftc from "../images/nftc.png";
import "./EddFox.css";

const EddFox = () => {
  return (
    <div className="EddFoxMain">
    <div style={{  
      width: "80%",
      marginTop: "20px",
      borderRadius: "20px",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      padding: "20px",}}>

          <h1 className="EddFoxTitle">Edd Fox</h1>
      <h3 style={{ marginTop: "10px", marginBottom: "20px" }}>Minting September 27, 2022</h3>


    <div className="EddMain2">
      <a href="https://nftcalendar.io/event/edd-fox/">
        <img
          className="EddGIF"
          src={EddGIF}
          alt="EddGIF"
          style={{marginTop: "0px" }}
        ></img>
      </a>

    </div>
    </div>

      <br></br>
      <div style={{  
          width: "80%",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          borderRadius: "20px",
          color: "white",
          padding: "20px",}}><h1>Meet Reuben</h1>
      <img className="family" src={family} alt="family" /></div>
      <br></br>

      <div
        style={{
          width: "80%",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          borderRadius: "20px",
          color: "white",
          padding: "20px",
          marginBottom: "30px",
        }}
      >
        Reuben Lacy, who holds a degree in industrial design from Auburn
        University, is a designer to his core. When he began to engage on a
        deeper level with the Bobby Rabbits, so many ideas and concepts were
        thrown around that we just knew he was going to become a creator. When
        he brought us the concept of Edd Fox, it was clear that this was an
        expansion of the Bobby Rabbits universe and storyline. Since graduating
        from Auburn, Reuben has used his degree and honed his skills by doing
        freelance work as well as landing an Art Department manager position
        with Uber Prints in 2018, located in Athens, Georgia. He currently
        resides in Carlin, Nevada with his wife and three kids, and of course
        his trusty stead, Bruno Calzone Lacy (dog). He enjoys everything design
        and if you've been a part of his Discord, you'll quickly notice that
        everything is used for inspiration. He enjoys camping with his family
        and his favorite hobby is fishing, by any means necessary. Join the
        Discord and get to know him here:{" "}
        <a href="https://discord.gg/GQgN7kSDVn/" target="_blank">
          {" "}
          https://discord.gg/GQgN7kSDVn{" "}
        </a>
      </div>
    </div>
  );
};

export default EddFox;
