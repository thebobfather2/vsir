
import { Grid, Button } from '@material-ui/core'
import './Shop.css'
import { Link } from 'react-router-dom'
import carotsend from '../images/$CAROT.gif'
import placeholder from './img/placeholder.png'


const Shop = () => {
  const items = [
    {
      "id": "1",
      "itemTitle": "Custom Bobby Rabbit",
      "itemImage": placeholder,
      "itemDescription": "Request a custom 1 of 1 Bobby Rabbit",
      "itemPrice": "500 $CAROT and 3 OG Bobby Rabbits",
      "path": "/Custom",
      "buttonText": "Buy"
    },
    {
      "id": "2",
      "itemTitle": "Send $CAROT Anywhere!",
      "itemImage": carotsend,
      "itemDescription": "Send $CAROT to any wallet!",
      "itemPrice": "Only Pay Transaction fee",
      "path": "/Send",
      "buttonText": "Send $CAROT"
    },
    {
      "id": "3",
      "itemTitle": "Bulk Send NFTs",
      "itemImage": placeholder,
      "itemDescription": "Send Multiple NFTs at once!",
      "itemPrice": "~0.003 SOL per NFT",
      "path": "/BulkSend",
      "buttonText": "Send NFTs"
    },
    {
      "id": "4",
      "itemTitle": "Wallet Cleaner",
      "itemImage": placeholder,
      "itemDescription": "Burn any NFT or Token and redeem your rent!",
      "itemPrice": ".001 SOL per NFT or supply of tokens burned, free for Bobby Rabbits holders",
      "path": "/Cleaner",
      "buttonText": "Clean Wallet"
    },
    {
      "id": "5",
      "itemTitle": "Gallery",
      "itemImage": placeholder,
      "itemDescription": "Use your $CAROT coin to purchase raffle tickets for various NFTs!",
      "itemPrice": "Price Subject to Change per NFT",
      "path": "/Gallery",
      "buttonText": "Go to Gallery"
    },
    {
      "id": "6",
      "itemTitle": "Raffles",
      "itemImage": placeholder,
      "itemDescription": "Use your $CAROT coin to purchase raffle tickets for various NFTs!",
      "itemPrice": "Price Subject to Change per NFT",
      "path": "/",
      "buttonText": "Coming Soon"
    },
    {
      "id": "7",
      "itemTitle": "Auctions",
      "itemImage": placeholder,
      "itemDescription": "Use your $CAROT coin to bid on awesome Solana NFTs!",
      "itemPrice": "Starting Bid Determined by NFT",
      "path": "/",
      "buttonText": "Coming Soon"
    }
  ]

  return (
    <>
      <h1 className='MainTitle'>Carot Shop </h1>
      <Grid container
        spacing={1}
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        className='grid'
        style={{ margin: '0', maxWidth: 'fit-content', textAlign: 'center' }}
      >
        {items.map(item => (
          <Grid item key={item.id} xs={8} sm={8} md={4} lg={3}>
            <div className='item'>
              <h1 className='itemTitle'>{item.itemTitle}</h1>
              <img className='itemImage' src={item.itemImage} alt='Utility'></img>
              <p className='itemDescription'>{item.itemDescription}</p>
              <h3 className='itemPrice'>{item.itemPrice}</h3>
              <Button component={Link} to={item.path} className="itemButton" variant='contained' size="large">{item.buttonText}</Button>
            </div>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default Shop