import React from "react";
import family from "../images/family.png";
import EddGIF from "../images/EddGIF.gif";
import nftc from "../images/nftc.png";
import eddtitle from "../images/eddtitle.png";

import "./EddFox.css";


const EddFox = () => {
  return (
    <div className="EddFoxMain">
    <div style={{  
      width: "80%",
      borderRadius: "20px",
      padding: "20px",}}>

<img className="eddtitle"
          src={eddtitle}
          alt="eddtitle"
          ></img>

      <h3 style={{ marginTop: "10px", marginBottom: "30px", color: "orange" }}>Public Minting Begins September 27, 2022</h3></div>

<div className="EddMain2" style={{
          width: "80%",
          borderRadius: "20px",
          color: "white",
          padding: "50px",
          backgroundColor: "black",
        }}
      >
              <h3 style={{ marginTop: "0px", marginBottom: "30px", }}>...BUT WHITELIST MINT IS LIVE!</h3>
              <h4 style={{ marginTop: "10px", marginBottom: "10px" }}>click below if you have been deemed worthy:</h4>
    <a href="https://eddfox.vercel.app/" style={{marginTop: "30px", marginBottom: "40px"}}>
        <img
          className="EddGIF"
          src={EddGIF}
          alt="EddGIF"
        ></img>
      </a>

<div style={{padding: "10px", width: "100%", borderRadius: "10px",}}>      
Edd Fox will be available to the general public on Tuesday, September 27th, 2022, at 5 pm EST, 2 pm PT. Whitelist spots can be earned through participation in our discord! WL will be 0.25 SOL, and public sales will be at .7 SOL. Additionally, the top 22 ranked members in the discord the day of launch will be air dropped a free Edd Fox! The mint button will be added to the homepage of bobbyrabbits.com at the time of release. Come join in on the fun and see what we have been creating at the fox factory!
</div>
</div>


      <br></br>
      <div style={{  
          width: "80%",
          borderRadius: "20px",
          color: "white",
          padding: "40px",}}><h1>Meet Reuben</h1>
     
      <img className="family" src={family} alt="family" style={{marginTop: "30px", textalign: "center",
    alignitems: "center",
    justifycontent: "center"}} /></div>
      <div style={{
          width: "80%",
          borderRadius: "20px",
          color: "white",
          padding: "12px",
          marginBottom: "50px",
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
        <a href="https://discord.gg/GQgN7kSDVn/" target="_blank" style={{color: "yellow"}}>
          {" "}
          https://discord.gg/GQgN7kSDVn{" "}
        </a>
      </div>
      <a href="https://nftcalendar.io/event/edd-fox/">
        <img
          className="nftc"
          src={nftc}
          alt="nftc" 
          style={{
          marginBottom: "70px",
          }}
        ></img>
      </a>
    </div>
  );
};

export default EddFox;
