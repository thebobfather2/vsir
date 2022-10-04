import { Button } from "@material-ui/core";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import br from "./img/poweredwhite.png";
import Logo from "./img/poweredwhite.png";
import MELogo from "./img/MELogo.png";
import DiscordLogo from "./img/Discord.png";
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
            <img className="navlogo" src={br} alt="logo" />
          </Link>
          <ul className="list"close  style={{marginTop: "30px"}}>
            <br></br>
            <br></br>



            <Link to="/Shop" onClick={toggleNav}>
              <h1
                style={{
                  textDecoration: "underline",
                  fontSize: "1.8em",
                  color: "orange",
                }}
              >
                Solana Tools
              </h1>
            </Link>
            <br></br>

            <Link to="/Shop" onClick={toggleNav}>
              <h1
                style={{
                  textDecoration: "underline",
                  fontSize: "1.8em",
                  color: "orange",
                }}
              >
                Utility
              </h1>
            </Link>
            <br></br>

            <a
  href="https://staking.bobbyrabbits.com/"
  rel="noreferrer"
  onClick={toggleNav}
  style={{
    textDecoration: "underline",
    fontSize: "1.8em",
    color: "orange",
  }}
>
  <h1
    style={{
      textDecoration: "underline",
      fontSize: "1em",
      color: "orange",
    }}
  >
    Staking
  </h1>
</a>
<br></br>

<Link to="/Launchpad" onClick={toggleNav}>
              <h1
                style={{
                  textDecoration: "underline",
                  fontSize: "1.8em",
                  color: "orange",
                }}
              >
                Launchpad
              </h1>
            </Link>
            <br></br>


            <Link to="/Partners" onClick={toggleNav}>
              <h1
                style={{
                  textDecoration: "underline",
                  fontSize: "1.8em",
                  color: "orange",
                }}
              >
                Partners
              </h1>
            </Link>
            <br></br>

        <a href="https://magiceden.io/creators/bobbyrabbits/" style={{marginTop: "-10px"}} className="navbar-logo2" onClick={toggleNav}>
          <img src={MELogo} className="MELogo" />
          <i class="fab fa-firstdraft" />
        </a>

        <a href="https://discord.gg/PfGQnKZqNa" className="navbar-logo2" onClick={toggleNav}>
          <img src={DiscordLogo} className="MELogo" />
          <i class="fab fa-firstdraft" />
        </a>

            <br></br>

            <Link to="/" className="navbar-logo2" onClick={toggleNav}>
          <img src={Logo} className="navLogo2" />
          <i class="fab fa-firstdraft" />
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
          <Button className="close" onClick={toggleNav} style={{marginTop: "20px"}}>
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
