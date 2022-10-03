import React from "react";
import { Link } from "react-router-dom";
import eddFox from "../images/eddFoxLogo.png";
import BaadLogo from "../images/BaadLogo.png";
import k24logo from "../images/k24logo.png";
import Launch from "../images/launch.jpeg";
import apply from "../images/apply.png";
import partnerimg from "../images/partners.png";
import grouchy from "../images/grouchy.png";
import jtlogo from "../images/jtlogo.png";
import "./Partners.css";

const Partners = () => {
  const partners = [
    {
      name: "Edd Fox",
      image: eddFox,
      path: "/EddFox",
    },
    {
      name: "24 Carrot",
      image: k24logo,
      path: "/BunnyClub",
    },
    {
      name: "Baad Goats",
      image: BaadLogo,
      path: "/Baad",
    },
    {
      name: "Grouchy Tigers",
      image: grouchy,
      path: "/GrouchyTigers",
    },
    {
      name: "Jack Tuber",
      image: jtlogo,
      path: "/JackTuber",
    },

  ];
  return (
    <div className="partnersMain" style={{marginTop: "20px"}}>

      <img className="partnerimg"
          src={partnerimg}
          alt="partnerimg"
          ></img>

      <div className="partnerContainer">
        {partners.map((partner) => {
          return (
            <Link to={partner.path}>
              <div
                style={{
                  backgroundColor: partner.primaryColor,
                  padding: "20px",
                  margin: "10px",
                  borderRadius: "10px",
                }}
                className="partnerCard"
              >
                <img
                  src={partner.image}
                  style={{ maxWidth: "130px" }}
                  alt="partner logo"
                />
                <h3 style={{ color: "white" }}>{partner.name}</h3>
              </div>
            </Link>
          );
        })}
      </div>
      
      <div className="Launch"  style={{marginTop: "20px", marginBottom: "20px"}}>
       <Link to='/Launchpad'>
        <img
          className="Launch"
          src={Launch}
          alt="Launch"
          style={{ marginTop: "0px", marginRight: "0px", borderRadius: "20px" }}
      ></img>
      </Link>
      </div>

      <h3 className="BulkTitle" style={{marginTop: "50px", fontFamily: "Titan One", fontSize: "50px"}}>What Are Partners?</h3>
      <h4 style={{marginTop: "15px", marginBottom: "50px", width: "80%",
          borderRadius: "20px",
          color: "white",
          padding: "50px",
          backgroundColor: "black"}}>Bobby Rabbits Partners was designed to create a path forward for many aspiring projects and their communities 
          who have struggled during the bear market to compete with the limited resources they’ve had at their disposal. Allowing specialists to focus 
          on their areas of expertise creates an efficient environment - we don’t need artists learning how to code React apps nor is it cost-efficient 
          or a good user experience to have individual ecosystems struggling to grow in segmented universes. We will be adding partner landing pages to 
          our directory as applications are approved to showcase projects who have shown good intentions and passion for Web3. We eventually hope to have 
          a wide range of projects we work with, and eventually a path for all of these projects to stake for a universal coin. These projects will be 
          capable of staking at various rates but in the same machine, so a collector could have 10 different NFTs, but instead of dancing around the internet 
          to manage their holdings, they will be able to interact all within the same website and ecosystem. This makes it infinitely more useful than having 
          10 random coins for each project, and it’s an infinitely better user experience only having to collect from a single stake pool and having a single 
          coin that can give discounts or unlock token gating on several different projects’ stores and utilities.
          <br></br>
          </h4>  

      <h3 className="BulkTitle" style={{marginTop: "50px", fontFamily: "Titan One", fontSize: "50px"}}>Our Mission</h3>
      <h4 style={{marginTop: "15px", marginBottom: "50px", width: "80%",
          borderRadius: "20px",
          color: "white",
          padding: "50px",
          backgroundColor: "black"}}>Our mission is to provide a space for trusted projects and their communities to network and engage
          with each other, interact, and work towards common goals in Web3. Our ultimate vision is to provide a Launchpad for smaller 
          projects to mint, stake, and participate in interactive games and utilities which will be accessible collectively through all of our NFTs. 
          <br></br>
          <h4 style={{marginTop: "30px"}}>-The Bobby Rabbits Team</h4>
          </h4>


      <div className="applyMain" style={{width: "80%"}}>
      <a href="https://form.jotform.com/222465387255159">
        <img
          className="apply"
          src={apply}
          alt="apply"
          style={{ marginTop: "30px", marginRight: "0px", borderRadius: "20px"}}
      ></img>
      </a>
      </div>

    </div>

    
  );
};

export default Partners;
