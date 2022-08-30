import React from "react";
import { Link } from "react-router-dom";
import eddFox from "../images/eddFoxLogo.png";
import BaadLogo from "../images/BaadLogo.png";
import k24logo from "../images/k24logo.png";
import "./Partners.css";

const Partners = () => {
  const partners = [
    {
      name: "Edd Fox",
      image: eddFox,
      path: "/EddFox",
    },
    {
      name: "Baad Goats",
      image: BaadLogo,
      path: "/Baad",
    },
    {
      name: "24 Carrot Bunny Club",
      image: k24logo,
      path: "/KHome",
    },
  ];
  return (
    <div className="partnersMain" style={{marginTop: "20px"}}>
      <h1 className="BulkTitle">Partners</h1>
      <h4>Click for information on each of our fantastic partners!!</h4>
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
                  style={{ maxWidth: "100px" }}
                  alt="partner logo"
                />
                <h3 style={{ color: "white" }}>{partner.name}</h3>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Partners;
