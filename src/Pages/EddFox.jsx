import React from "react";
import family from "../images/family.png";
import EddGIF from "../images/EddGIF.gif";
import nftc from "../images/nftc.png";
import eddtitle from "../images/eddtitle.png";
import fieldcoin from "../images/fieldcoin.png";

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

    </div>

<div className="EddMain2" style={{
          width: "80%",
          borderRadius: "20px",
          color: "white",
          padding: "50px",
          backgroundColor: "black",
        }}
      >
    <h3 style={{ marginTop: "-20px", marginBottom: "0px", color: "yellow" }}>WHITELIST MINT NOW!</h3>
    <a href="https://eddfox.vercel.app/" style={{marginTop: "30px", marginBottom: "40px"}}>
        <img
          className="EddGIF"
          src={EddGIF}
          alt="EddGIF"
        ></img>
      </a>
      <h1 style={{ marginTop: "-10px", marginBottom: "0px", color: "white" }}>INFO</h1>
<div style={{padding: "20px", width: "100%", borderRadius: "10px",}}>      
Edd Fox will be available to the general public on Tuesday, September 27th, 2022, at 5 pm EST. 
</div>
<div style={{marginBottom: "10px", padding: "10px", width: "100%", borderRadius: "10px",}}>
  Whitelist spots can be earned through participation in our discord! Those holding "Edd Fox WL" tokens 
  will have immediate access to mint foxes for only 0.25 SOL. If there are any foxes remaining by September 27th, public sale will 
  go live for 0.7 SOL. 
  </div>
  <div style={{padding: "10px", width: "100%", borderRadius: "10px",}}>
    Additionally, the top 22 ranked members in the Discord the day of launch will be air dropped a free Edd Fox! Come join in on the fun and see what we have been creating at The Fox Factory!
</div>


<a href="https://stake.cardinal.so/HXnHeFBrByshnrLMdKXurzekfma2QJaV2HPnGX3Do6Rj" style={{marginTop: "30px", marginBottom: "40px"}}>
<h1 style={{ marginTop: "0px", marginBottom: "0px", color: "yellow" }}>STAKING</h1>
 <img
          className="EddGIF"
          src={fieldcoin}
          alt="EddGIF"
        ></img>
         <h4 style={{ marginTop: "-10px", marginBottom: "-50px", color: "yellow" }}>click here to stake for field coin</h4>
      </a>
</div>


      <br></br>
      <div style={{  
          width: "80%",
          borderRadius: "20px",
          color: "white",
          padding: "40px",}}>
      
      <h1 style={{fontSize: "3em", marginTop: "0px"}}>Meet Reuben</h1>
     
      <img className="family" src={family} alt="family" style={{marginTop: "20px", marginBottom: "-30px", textalign: "center",
    alignitems: "center",
    justifycontent: "center"}} /></div>
      <div style={{
          width: "80%",
          borderRadius: "20px",
          color: "white",
          padding: "12px",
          marginBottom: "40px",
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
          marginBottom: "60px",
          }}
        ></img>
      </a>
    </div>
  );
};

export default EddFox;
