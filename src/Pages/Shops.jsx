import React from "react";
import Merch from "../images/merch.jpeg";
import CarotCoin from "../images/$CAROT.gif";
import {Link} from "react-router-dom";
import "./Shop.css";

const Shop = () => {
  return (
 
    <div className="ShopMainContainer">
    <h1 style={{ marginTop: "40px" }} className="k24Title">Shop Bobby Rabbits</h1>
    <div className="k24Main2">
    <a href="https://bryanandrewpike.wixsite.com/website/bobby-rabbits-merch/">
      <img
        className="Merch"
        src={Merch}
        alt="Merch"
        style={{ marginTop: "40px", marginRight: "40px" }}
      ></img>
       <h3 style={{ marginTop: "10px", marginRight: "40px", color: "white" }}>Official Merch</h3>
    </a>
   
    <Link to="/CarotMarket">
      <img
        className="CarotCoin"
        src={CarotCoin}
        alt="CarotCoin"
        style={{ marginTop: "40px", marginLeft: "40px" }}
      ></img>
             <h3 style={{ marginTop: "10px",  marginLeft: "40px", color: "white" }}>$CAROT Marketplace</h3>
             </Link>   </div>
  </div>
);
};

export default Shop;