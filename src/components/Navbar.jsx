import { Button } from "@material-ui/core";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import br from "./img/poweredwhite.png";
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
            {" "}
            <img className="navlogo" src={br} alt="logo" />
          </Link>
          <ul className="list">
            <br></br>
            <br></br>
            <Link to="/" onClick={toggleNav}>
              <li className="listItem">Home</li>
            </Link>
            <Link to="/Shop" onClick={toggleNav}>
              <li className="listItem">The Shop</li>
            </Link>
            <br></br>
            <h1
              style={{
                textDecoration: "underline",
                fontSize: "1.8em",
                color: "orange",
              }}
            >
              Solana Tools
            </h1>
            <br></br>
            <Link to="/Custom" onClick={toggleNav}>
              {" "}
              <li className="listItem">Custom</li>
            </Link>
            <Link to="/Send" onClick={toggleNav}>
              {" "}
              <li className="listItem">Send $CAROT</li>
            </Link>
            <Link to="/Slots" onClick={toggleNav}>
              {" "}
              <li className="listItem">Slots</li>
            </Link>
            <Link to="/Flip" onClick={toggleNav}>
              {" "}
              <li className="listItem">Coin Flip</li>
            </Link>
            <Link to="/Dashboard" onClick={toggleNav}>
              {" "}
              <li className="listItem">Dashboard</li>
            </Link>
            <Link to="/Carot-Market" onClick={toggleNav}>
              {" "}
              <li className="listItem">$CAROT Marketplace</li>
            </Link>
            <Link to="/Cans-Market" onClick={toggleNav}>
              {" "}
              <li className="listItem">$CANS Marketplace</li>
            </Link>
            <a
              href="https://staking.bobbyrabbits.com/"
              target="_blank"
              rel="noreferrer"
              onClick={toggleNav}
            >
              {" "}
              <li className="listItem">Icy Staking</li>
            </a>
            <br></br>
            <h1
              style={{
                textDecoration: "underline",
                fontSize: "1.8em",
                color: "orange",
              }}
            >
              Buy Rabbits
            </h1>
            <br></br>
            <a
              href="https://magiceden.io/marketplace/icyrabbits"
              target="_blank"
              rel="noreferrer"
              onClick={toggleNav}
            >
              {" "}
              <li className="listItem">Buy An Icy Rabbit</li>
            </a>
            <a
              href="https://magiceden.io/marketplace/bobbyrabbits"
              target="_blank"
              rel="noreferrer"
              onClick={toggleNav}
            >
              {" "}
              <li className="listItem">Buy A Rabbit</li>
            </a>
            <br></br>
            <WalletModalProvider>
              <li>
                <WalletMultiButton
                  style={{ backgroundColor: "black !important" }}
                />
              </li>
            </WalletModalProvider>
          </ul>
          <Button className="close" onClick={toggleNav}>
            Close
          </Button>
        </>
      ) : (
        <button onClick={toggleNav} className="btn">
          Menu
        </button>
      )}
    </nav>
  );
};

export default Navbar;
