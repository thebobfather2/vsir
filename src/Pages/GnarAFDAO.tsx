import React from "react";
import { Link } from "react-router-dom";
import family from "../images/family.png";
import MintGnar from "../images/MintGnar.png";
import GnarTat from "../images/gnartat.png";
import feed from "../images/feed.png";
import GnarStaking from "../images/GnarStaking.png";

import "./GnarAFDAO.css";

const GnarAFDAO = () => {
  return (
    <div className="EddMainContainer">
      <div className="EddTitleContainer">
        <h1>GnarAF DAO</h1>
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

        <a href="https://staking.bobbyrabbits.com">
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
          <h1 className="EddBody3">
            About GnarAF DAO
          </h1>

          <div className="EddBody4" style={{ color: "white"}}>
           Join the Discord here:{" "}
            <a
              href="https://discord.gg/wDrWEFDrpj"
              target="_blank"
              style={{ color: "yellow", marginBottom: "50px" }}
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