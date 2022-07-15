import React, { useState, useEffect } from 'react'
import './Navbar.css'
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import br from './img/poweredwhite.png'
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';


const Navbar = () => {
  let walletAddress = ''
  const wallet = useAnchorWallet();
  walletAddress = wallet?.publicKey.toString()
  const [toggleMenu, setToggleMenu] = useState(false)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const toggleNav = () => {
    setToggleMenu(!toggleMenu)
  }

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', changeWidth)
    return () => {
      window.removeEventListener('resize', changeWidth)
    }
  }, [])

  return (
    <nav>
      {(toggleMenu || screenWidth > 755) ? (
        <>
          <Link to='/'> <img className="navlogo" src={br} alt='logo' /></Link>
          <ul className="list">
            <br></br><br></br>
            <Link to='/Shop' onClick={toggleNav}> <li className='listItem'>The Shop</li></Link>
            <Link to='/Custom' onClick={toggleNav}> <li className='listItem'>Custom</li></Link>
            <Link to='/Send' onClick={toggleNav}> <li className='listItem'>Send $CAROT</li></Link>
            <Link to='/BulkSend' onClick={toggleNav} > <li className='listItem'>Bulk Send</li></Link>
            <Link to='/Cleaner' onClick={toggleNav}> <li className='listItem'>Wallet Cleaner</li></Link>
            <Link to='/Gallery' onClick={toggleNav}> <li className='listItem'>Gallery</li></Link>
            <Link to='/Slots' onClick={toggleNav}> <li className='listItem'>Slots</li></Link>
            <Link to='/Dashboard' onClick={toggleNav}> <li className='listItem'>Dashboard</li></Link>
            <a href='https://magiceden.io/marketplace/bobbyrabbits' target="_blank" rel="noreferrer" onClick={toggleNav}> <li className='listItem'>Buy A Rabbit</li></a>
            <br></br>
            <WalletModalProvider>
              <li><WalletMultiButton
                style={{ backgroundColor: 'black !important' }} /></li>
            </WalletModalProvider>
          </ul>
          <Button className='close' onClick={toggleNav}>Close</Button>
        </>
      ) : (<button onClick={toggleNav} className="btn">Menu</button>)}
    </nav>
  )
}

export default Navbar