import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import Dropdown2 from "./Dropdown2";
import Dropdown3 from "./Dropdown3";
import Logo from "./img/poweredwhite.png";
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
          <li className="nav-item">
            <a
              href="https://staking.bobbyrabbits.com/"
              className="nav-links"
              target="_blank"
              rel="noreferrer"
              onClick={closeMobileMenu}
            >
              Staking
            </a>
          </li>
          <li className="nav-item">
            <a
              href="https://magiceden.io/marketplace/bobbyrabbits"
              className="nav-links"
              target="_blank"
              rel="noreferrer"
              onClick={closeMobileMenu}
            >
              Buy a Rabbit
            </a>
          </li>
        </ul>
        <WalletMultiButton />
      </nav>
    </>
  );
}

export default Navbar;
