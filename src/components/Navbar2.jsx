import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./img/vsn.png";
import "./Navbar2.css";

function Navbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);
  const [dropdown3, setDropdown3] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <nav className="navbar">

        <Link to="/VSNHome" className="navbar-logo" onClick={closeMobileMenu}>
          <img src={Logo} className="Nav-Logo" />
          <i class="fab fa-firstdraft" />
        </Link>

        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
        
        <li className="nav-item">
            <Link
              to="/Radio"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              RADIO <i className="fas fa-caret-down" />
            </Link>
          </li>
          
          <li className="nav-item">
            <Link
              to="/Marketplace"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              MARKETPLACE <i className="fas fa-caret-down" />
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/Marketplace"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              VIBE CITY <i className="fas fa-caret-down" />
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/Rewards"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              REWARDS <i className="fas fa-caret-down" />
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/Profile"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              PROFILE <i className="fas fa-caret-down" />
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/Wallet"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              WALLET <i className="fas fa-caret-down" />
            </Link>
          </li>

        </ul>
      </nav>
    </>
  );
}

export default Navbar;
