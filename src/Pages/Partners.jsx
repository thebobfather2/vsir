import React from "react";
import { Link } from "react-router-dom";
import eddFox from "../images/eddFoxLogo.png";
import BaadLogo from "../images/BaadLogo.png";
import k24logo from "../images/k24logo.png";
import Launch from "../images/launch.png";
import apply from "../images/apply.png";
import partnerimg from "../images/partners.png";
import grouchy from "../images/grouchy.png";
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
      path: "/KHome",
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

  ];
  return (
    <div className="partnersMain" style={{marginTop: "20px"}}>

      <img className="partnerimg"
          src={partnerimg}
          alt="partnerimg"
          ></img>

      <h4 style={{fontSize: "1.2em", width: "75%", marginTop: "-30px"}}>Click for information on each of our fantastic partners!!</h4>
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
                  style={{ maxWidth: "200px" }}
                  alt="partner logo"
                />
                <h3 style={{ color: "white" }}>{partner.name}</h3>
              </div>
            </Link>
          );
        })}
      </div>
      
      <div className="Launch"  style={{width: "80%", marginTop: "20px"}}>
       <Link to='/Launchpad'>
        <img
          className="Launch"
          src={Launch}
          alt="Launch"
          style={{ marginTop: "0px", marginRight: "0px", borderRadius: "20px" }}
      ></img>
      </Link>
      </div>

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
