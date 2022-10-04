import React from "react";
import { Link } from "react-router-dom";
import eddtitle from "../images/eddtitle.png";
import family from "../images/family.png";
import Mintfox from "../images/mintfox.png";
import nftc from "../images/nftc.png";
import Potion from "../images/potion.png";
import feed from "../images/feed.png";
import Stakefox from "../images/stakefox.png";

import "./EddFox.css";

const EddFox = () => {
  return (
    <div className="EddMainContainer">
      <div className="EddTitleContainer">
        <img
          className="eddtitle"
          src={eddtitle}
          alt="eddtitle"
          style={{ maxWidth: "90%" }}
        ></img>
      </div>

      <div className="EddBody">
        <a href="https://magiceden.io/marketplace/eddfox">
          <img
            className="Mintfox"
            src={Mintfox}
            alt="Mintfox"
          ></img>
          <h3 style={{ marginBottom: "40px", color: "white", textShadow: "2px 2px #000000"}}>Buy A Fox</h3>
        </a>

        <a href="https://staking.bobbyrabbits.com/eddfox">
          <img
            className="Stakefox"
            src={Stakefox}
            alt="Stakefox"
            style={{ marginTop: "0px"}}
          ></img>
          <h3 style={{ marginBottom: "40px", color: "white", textShadow: "2px 2px #000000"}}>
            Earn $FIELD
          </h3>
        </a>

        <Link to="/FoxMart">
          <img
            className="Stakefox"
            src={Potion}
            alt="Potion"
            style={{ marginTop: "0px"}}
          ></img>
          <h3 style={{ marginBottom: "40px", color: "white", textShadow: "2px 2px #000000"}}>FoxMart</h3>
        </Link>

        <Link to="/UpgradeFox">
          <img
            className="Stakefox"
            src={feed}
            alt="Upgrade"
            style={{ marginTop: "0px"}}
          ></img>
         <h3 style={{ marginBottom: "40px", color: "white", textShadow: "2px 2px #000000"}}>Upgrade Your Fox</h3>
        </Link>
      </div>

      <div className="EddBody2">
          <h1 className="EddBody3">
            Meet Reuben
          </h1>
          <img
            className="family"
            src={family}
            alt="family"
            style={{
              marginTop: "10px"
            }}
          />

          <div className="EddBody4" style={{ color: "white"}}>
            Reuben Lacy, who holds a degree in industrial design from Auburn
            University, is a designer to his core. When he began to engage on a
            deeper level with the Bobby Rabbits, so many ideas and concepts were
            thrown around that we just knew he was going to become a creator.
            When he brought us the concept of Edd Fox, it was clear that this
            was an expansion of the Bobby Rabbits universe and storyline. Since
            graduating from Auburn, Reuben has used his degree and honed his
            skills by doing freelance work as well as landing an Art Department
            manager position with Uber Prints in 2018, located in Athens,
            Georgia. He currently resides in Carlin, Nevada with his wife and
            three kids, and of course his trusty stead, Bruno Calzone Lacy
            (dog). He enjoys everything design and if you've been a part of his
            Discord, you'll quickly notice that everything is used for
            inspiration. He enjoys camping with his family and his favorite
            hobby is fishing, by any means necessary. Join the Discord and get
            to know him here:{" "}
            <a
              href="https://discord.gg/GQgN7kSDVn/"
              target="_blank"
              style={{ color: "yellow", marginBottom: "50px" }}
            >
              {" "}
              https://discord.gg/GQgN7kSDVn{" "}
            </a>
          </div>
        </div>
      </div>
  );
};

export default EddFox;