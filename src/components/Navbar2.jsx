import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import Dropdown2 from "./Dropdown2";
import Dropdown3 from "./Dropdown3";
import Logo from "./img/poweredwhite.png";
import MELogo from "./img/MELogo.png";
import DiscordLogo from "./img/Discord.png";
import "./Navbar2.css";

function Navbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);
  const [dropdown3, setDropdown3] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnterTools = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeaveTools = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };
  const onMouseEnterUtils = () => {
    if (window.innerWidth < 960) {
      setDropdown2(false);
    } else {
      setDropdown2(true);
    }
  };

  const onMouseLeaveUtils = () => {
    if (window.innerWidth < 960) {
      setDropdown2(false);
    } else {
      setDropdown2(false);
    }
  };
  const onMouseEnterPartners = () => {
    if (window.innerWidth < 960) {
      setDropdown3(false);
    } else {
      setDropdown3(true);
    }
  };

  const onMouseLeavePartners = () => {
    if (window.innerWidth < 960) {
      setDropdown3(false);
    } else {
      setDropdown3(false);
    }
  };

  return (
    <>
      <nav className="navbar">

        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <img src={Logo} className="navLogo" />
          <i class="fab fa-firstdraft" />
        </Link>

        <a href="https://magiceden.io/creators/bobbyrabbits/" className="navbar-logo" onClick={closeMobileMenu}>
          <img src={MELogo} className="MELogo" />
          <i class="fab fa-firstdraft" />
        </a>

        <a href="https://discord.gg/PfGQnKZqNa/" className="navbar-logo" onClick={closeMobileMenu}>
          <img src={DiscordLogo} className="MELogo" />
          <i class="fab fa-firstdraft" />
        </a>

        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li
            className="nav-item"
            onMouseEnter={onMouseEnterTools}
            onMouseLeave={onMouseLeaveTools}
          >
            <Link to="/Shop" className="nav-links" onClick={closeMobileMenu}>
              Tools <i className="fas fa-caret-down" />
            </Link>
            {dropdown && <Dropdown />}
          </li>
          <li
            className="nav-item"
            onMouseEnter={onMouseEnterUtils}
            onMouseLeave={onMouseLeaveUtils}
          >
            <Link to="/Shop" className="nav-links" onClick={closeMobileMenu}>
              Utility <i className="fas fa-caret-down" />
            </Link>
            {dropdown2 && <Dropdown2 />}
          </li>

          <li
            className="nav-item"
          >
            <Link
              to="/Launchpad"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Launchpad <i className="fas fa-caret-down" />
            </Link>
          </li>

          <li
            className="nav-item"
            onMouseEnter={onMouseEnterPartners}
            onMouseLeave={onMouseLeavePartners}
          >
            <Link
              to="/Partners"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Partners <i className="fas fa-caret-down" />
            </Link>
            {dropdown3 && <Dropdown3 />}
          </li>

        </ul>
        <WalletMultiButton />
      </nav>
    </>
  );
}

export default Navbar;
