import React from "react";
import { Link } from "react-router-dom";
import MintGnar from "../images/MintGnar.png";
import GnarTat from "../images/gnartat.png";
import GnarStaking from "../images/GnarStaking.png";

import "./GnarAFDAO.css";

const GnarAFDAO = () => {
  return (
    <div className="GnarMainContainer">
      <div className="GnarTitleContainer">
        <h1>Gnar AF DAO</h1>
        <h6 className="Subtitle">Your Ticket to the DAO Bringing Web3 Art into Every Home</h6>
      </div>

      <div className="GnarBody">

        <a href="https://gnarafdao.vercel.app/">
          <img
            className="MintGnar"
            src={MintGnar}
            alt="Mint Gnar DAO card"></img>
          <h3 className="Subheading">
            Mint Your DAO Card</h3>
        </a>

        <a href="https://stake.cardinal.so/3hdpn7vkfASdzWvqrLgT83TZLNWdhkG3C1LeubWk7RRZ">
          <img
            className="MintGnar"
            src={GnarStaking}
            alt="GnarStaking"
          ></img>
          <h3 className="Subheading">
            Stake For Rewards!
          </h3>
        </a>

        <Link to="/Gallery">
          <img
            className="MintGnar"
            src={GnarTat}
            alt="GnarTat"
          ></img>
         <h3 className="SubheadingG">Gallery</h3>
        </Link>
      </div>

      <div className="AboutContainer">
        
          <h1 className="GnarBody3">
            About GnarAF DAO
          </h1>

          <div className="GnarBody4" style={{ color: "white", textShadow: "2px 2px #000000"}}>
           Join the Discord here:{" "}
            <a
              href="https://discord.gg/wDrWEFDrpj"
              target="_blank"
              style={{ color: "#f725a0", marginBottom: "50px", textShadow: "1px 1px #672394" }}
            >
              {" "}
              https://discord.gg/wDrWEFDrpj{" "}
            </a>
          </div>
        </div>
      </div>
  );
};

export default GnarAFDAO;