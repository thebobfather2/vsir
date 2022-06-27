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
            <Link to='/'> <li className='listItem'>Home</li></Link>
            <Link to='/Custom'> <li className='listItem'>Custom</li></Link>
            <Link to='/Send'> <li className='listItem'>Send $CAROT</li></Link>
            <Link to='/BulkSend'> <li className='listItem'>Bulk Send</li></Link>
            <Link to='/Cleaner'> <li className='listItem'>Wallet Cleaner</li></Link>
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