import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar2.css';
import Dropdown from './Dropdown';
import Dropdown2 from './Dropdown2'
import Logo from './img/poweredwhite.png'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

function Navbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [dropdown2, setDropdown2] = useState(false)

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
      
      setDropdown2(false)
    } else {
      
      setDropdown2(true)
    }
  };

  const onMouseLeaveUtils = () => {
    if (window.innerWidth < 960) {
      setDropdown2(false);
    } else {
      setDropdown2(false);
      
    }
  };

  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          <img src={Logo} className='navLogo' />
          <i class='fab fa-firstdraft' />
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li
            className='nav-item'
            onMouseEnter={onMouseEnterTools}
            onMouseLeave={onMouseLeaveTools}
          >
            <Link
              to='/Shop'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Solana Tools <i className='fas fa-caret-down' />
            </Link>
            {dropdown && <Dropdown />}
          </li>
          <li
            className='nav-item'
            onMouseEnter={onMouseEnterUtils}
            onMouseLeave={onMouseLeaveUtils}
          >
            <Link
              to='/Shop'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              $CAROT Utility
            </Link>
            {dropdown2 && <Dropdown2 />}
          </li>
          <li className='nav-item'>
            <a
              href='https://magiceden.io/marketplace/bobbyrabbits'
              className='nav-links'
              target="_blank"
              rel='noreferrer'
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