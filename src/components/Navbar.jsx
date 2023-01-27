import { Button } from "@material-ui/core";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./img/vsn.png";
import "./Navbar.css";

const Navbar = () => {
  let walletAddress = "";
  const wallet = useAnchorWallet();
  walletAddress = wallet?.publicKey.toString();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
  };

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", changeWidth);
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  return (
    <nav>
      {toggleMenu || screenWidth > 755 ? (
        <>
          <Link to="/">
            <img className="navlogo" src={Logo} alt="logo" />
          </Link>
          <ul className="list"close>
            <br></br>
            <br></br>



            <Link to="/Home" onClick={toggleNav}>
              <h1
                style={{
                  textDecoration: "underline",
                  fontSize: "1.8em",
                  color: "orange",
                  paddingTop: "30px",
                }}
              >
                HOME
              </h1>
            </Link>
            <br></br>

            <Link to="/Radio" onClick={toggleNav}>
              <h1
                style={{
                  textDecoration: "underline",
                  fontSize: "1.8em",
                  color: "orange",
                }}
              >
                RADIO
              </h1>
            </Link>
            <br></br>

            <Link to="/Marketplace" onClick={toggleNav}>
              <h1
                style={{
                  textDecoration: "underline",
                  fontSize: "1.8em",
                  color: "orange",
                }}
              >
                MARKETPLACE
              </h1>
            </Link>
            <br></br>


        <Link to="/VibeCity" onClick={toggleNav}>
              <h1
                style={{
                  textDecoration: "underline",
                  fontSize: "1.8em",
                  color: "orange",
                }}
              >
                VIBE CITY
              </h1>
            </Link>
            <br></br>

            <Link to="/Rewards" onClick={toggleNav}>
              <h1
                style={{
                  textDecoration: "underline",
                  fontSize: "1.8em",
                  color: "orange",
                }}
              >
                REWARDS
              </h1>
            </Link>
            <br></br>

            <Link to="/Profile" onClick={toggleNav}>
              <h1
                style={{
                  textDecoration: "underline",
                  fontSize: "1.8em",
                  color: "orange",
                }}
              >
                PROFILE
              </h1>
            </Link>
            <br></br>

            <Link to="/Wallet" onClick={toggleNav}>
              <h1
                style={{
                  textDecoration: "underline",
                  fontSize: "1.8em",
                  color: "orange",
                }}
              >
                WALLET
              </h1>
            </Link>
            <br></br>
            <WalletModalProvider>
              <li>
                <WalletMultiButton
                  style={{ backgroundColor: "black !important" }}
                />
              </li>
            </WalletModalProvider>
          </ul>
          <Button className="close" onClick={toggleNav} style={{marginTop: "25px"}}>
            Close
          </Button>
        </>
      ) : (
        <nav className="nav">
          
        <Link to="/" className="navbar-logo">
          <img src={Logo} className="navLogo"/>
        </Link>

        <button onClick={toggleNav} className="btn" style={{ marginTop: "22px", color: "white" }}>
          Menu
        </button>
        </nav>
      )}
    </nav>
  );
};

export default Navbar;
