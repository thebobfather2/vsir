
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
      <h1 className='MainTitle'>Carot Shop </h1>
      {/* <Grid container
        spacing={0}
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        className='grid'
        style={{ margin: '0', maxWidth: '60%', textAlign: 'center' }}
      > */}
      <div className='toolsContainer'>
        {items.map(item => (
          // <Grid item key={item.id} lg>
          <Link to={item.path} style={{color: 'black'}}>
            <div className='item'>
              <h1 className='itemTitle'>{item.itemTitle}</h1>
              <img className='itemImage' src={item.itemImage} alt='Utility'></img>
             <br></br>
            </div>
            </Link>
          // </Grid>
        ))}
      {/* </Grid> */}
      </div>
    </>
  )
}

export default Shop