
import { Grid, Button } from '@material-ui/core'
import './Shop.css'
import { Link } from 'react-router-dom'
import carotsend from '../images/carot.png'
import placeholder from '../images/bunnyhead.png'
import bulkIcon from '../images/icons/bulksend.png'
import galleryIcon from '../images/icons/gallery.png'
import slotIcon from '../images/icons/slots.png'
import walletIcon from '../images/icons/wallet.png'
import dashboardIcon from '../images/icons/dashboard.png'
import carotShop from '../images/carotshop.jpeg'
import dots from '../images/dots.png'


const Shop = () => {
  const items = [
    {
      "id": "1",
      "itemTitle": "Custom Rabbit",
      "itemImage": placeholder,
      "itemDescription": "Request a custom 1 of 1 Bobby Rabbit",
      "itemPrice": "500 $CAROT and 3 OG Bobby Rabbits",
      "path": "/Custom",
      "buttonText": "Buy"
    },
    {
      "id": "2",
      "itemTitle": "Send $CAROT",
      "itemImage": carotsend,
      "itemDescription": "Send $CAROT to any wallet!",
      "itemPrice": "Only Pay Transaction fee",
      "path": "/Send",
      "buttonText": "Send $CAROT"
    },
    {
      "id": "3",
      "itemTitle": "Bulk Send NFTs",
      "itemImage": bulkIcon,
      "itemDescription": "Send Multiple NFTs at once!",
      "itemPrice": "~0.003 SOL per NFT",
      "path": "/BulkSend",
      "buttonText": "Send NFTs"
    },
    {
      "id": "4",
      "itemTitle": "Wallet Cleaner",
      "itemImage": walletIcon,
      "itemDescription": "Burn any NFT or Token and redeem your rent!",
      "itemPrice": ".001 SOL per NFT or supply of tokens burned, free for Bobby Rabbits holders",
      "path": "/Cleaner",
      "buttonText": "Clean Wallet"
    },
    {
      "id": "5",
      "itemTitle": "Gallery",
      "itemImage": galleryIcon,
      "itemDescription": "View the NFTs in any wallet!",
      "itemPrice": "Price Subject to Change per NFT",
      "path": "/Gallery",
      "buttonText": "Go to Gallery"
    },
    {
      "id": "6",
      "itemTitle": "Slots",
      "itemImage": slotIcon,
      "itemDescription": "Use your $CAROT coin win $CANS!",
      "itemPrice": "5 $CAROT Per Spin",
      "path": "/Slots",
      "buttonText": "Test Your Luck"
    },
    {
      "id": "7",
      "itemTitle": "Holder's Dashboard",
      "itemImage": dashboardIcon,
      "itemDescription": "Use your $CAROT coin win $CANS!",
      "itemPrice": "5 $CAROT Per Spin",
      "path": "/Dashboard",
      "buttonText": "Test Your Luck"
    }
  ]

  return (
    <>
      {/* <img src={carotShop} className='carotshopimage' alt='carot shop'/> */}
    <div className='MainShopContainer'>
      <div className='menuContainer'>
        <div className='menuHeading'>
          <h1 className='menuTitle'>Welcome to the Carot Shop</h1>
          <h2 className='menuSubtitle'>The Carot Menu</h2>
        </div>
        <div className='TheMenu'>
          <div className='Category'>
            <div className='CategoryTitle'>
              <h2 className='CatTitle'>Solana Tools</h2>
              <div className='underline'></div>
            </div>
            <div className='menuItems'>
            <div className='items1'>
              <Link to='/BulkSend'><h3 className='eachMenuItem'>Bulk Send NFTs</h3></Link>
              <h3 className='Prices'>0.005 SOL/NFT or Free for Bobby Rabbits Holders</h3>
              </div>
              <div className='itemsUnderline'></div>
            <div className='items1'>
            <Link to='/Cleaner'><h3 className='eachMenuItem'>Wallet Cleaner</h3></Link>
              <h3 className='Prices'>0.001 SOL/Burned NFT or Token Set or Free for Bobby Rabbits Holders</h3>
              </div>
              <div className='itemsUnderline'></div>
            <div className='items1'>
            <Link to='/Upload'><h3 className='eachMenuItem'>Arweave Uploader</h3></Link>
              <h3 className='Prices'>0.001 SOL per Image or Metadata Uploaded</h3>
              </div>
              <div className='itemsUnderline'></div>
            <div className='items1'>
            <Link to='/Gallery'><h3 className='eachMenuItem'>Gallery</h3></Link>
              <h3 className='Prices'>Free</h3>
              </div>
              <div className='itemsUnderline'></div>
            </div>
          </div>
          <div className='Category'>
            <div className='CategoryTitle'>
              <h2 className='CatTitle'>Rabbit Utility</h2>
              <div className='underline'></div>
            </div>
            <div className='menuItems'>
            <div className='items1'>
              <Link to='/Custom'><h3 className='eachMenuItem'>Custom Bobby Rabbit</h3></Link>
              <h3 className='Prices'>3 OG Rabbits and 500 $CAROT Coin</h3>
              </div>
              <div className='itemsUnderline'></div>
              <div className='items1'>
            <Link to='/Slots'><h3 className='eachMenuItem'>Slots</h3></Link>
              <h3 className='Prices'>Minimum bet 1 $CAROT Coin</h3>
              </div>
              <div className='itemsUnderline'></div>
              <div className='items1'>
            <Link to='/Flip'><h3 className='eachMenuItem'>Coin Flip</h3></Link>
              <h3 className='Prices'>Minimum bet 1 $CAROT Coin</h3>
              </div>
              <div className='itemsUnderline'></div>
            </div>
            <div className='items1'>
            <Link to='/Dashboard'><h3 className='eachMenuItem'>Holder's Dashboard</h3></Link>
              <h3 className='Prices'>Must Own OG or Icy Rabbit</h3>
              </div>
              <div className='itemsUnderline'></div>
            <div className='items1'>
            <Link to='/Carot-Market'><h3 className='eachMenuItem'>$CAROT Marketplace</h3></Link>
              <h3 className='Prices'>Individually Priced</h3>
              </div>
              <div className='itemsUnderline'></div>
            <div className='items1'>
            <Link to='/Cans-Market'><h3 className='eachMenuItem'>$CANS Marketplace</h3></Link>
              <h3 className='Prices'>Individually Priced</h3>
              </div>
              <div className='itemsUnderline'></div>
           
            <div className='items1'>
            <Link to='/Send'><h3 className='eachMenuItem'>$Carot Send</h3></Link>
              <h3 className='Prices'>Typical Solana Transaction Fee</h3>
              </div>
              <div className='itemsUnderline'></div>
          </div>
        </div>
      
      {/* <div className='toolsContainer'>
        {items.map(item => (
         
          <Link to={item.path} style={{color: 'black'}}>
            <div className='item'>
              <h1 className='itemTitle'>{item.itemTitle}</h1>
              <img className='itemImage' src={item.itemImage} alt='Utility'></img>
             <br></br>
            </div>
            </Link>
      
        ))}
     
      </div> */}
      </div>
      </div>
    </>
  )
}

export default Shop