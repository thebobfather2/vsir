import { useState, useCallback, useEffect } from 'react'
import './Custom.css'
import { useAnchorWallet } from '@solana/wallet-adapter-react'
import filter from '../filter.json'
import { useWalletNfts } from '@nfteyez/sol-rayz-react'
import { Grid, Paper, Button } from '@material-ui/core'
import Alert from '@mui/material/Alert';
import carot from '../images/carot.png'
import { Connection, PublicKey } from '@solana/web3.js';
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import { Transaction } from "@solana/web3.js";
import * as spltoken from "@solana/spl-token";
import CircularProgress from '@mui/material/CircularProgress';


const Custom = () => {

  let walletAddress = ''
  const wallet = useAnchorWallet()
  walletAddress = wallet?.publicKey.toString()
  const filterList = JSON.parse(JSON.stringify(filter))
  const connection = new Connection("https://api.mainnet-beta.solana.com");

  const { nfts } = useWalletNfts({
    publicAddress: walletAddress

  })

  const [metadata, setMetadata] = useState({});

  const fetchMetadata = useCallback(async () => {
    for (const nft of nfts) {
      try {
        fetch(nft.data.uri)
          .then((response) => response.json())
          .then((meta) =>
            setMetadata((state) => ({ ...state, [nft.mint]: meta }))
          );
      } catch (error) {
        console.log(error)
      }

    }
  }, [nfts]);

  useEffect(() => {
    if (nfts?.length) fetchMetadata();
  }, [nfts, fetchMetadata]);

  const filterArray = Object.keys(metadata)
    .filter(key => filterList.includes(key))
    .reduce((obj, key) => {
      obj[key] = metadata[key];
      return obj;
    }, {});

  var result = Object.keys(filterArray).map((key) => [(key), filterArray[key]]);
  const [tx, setTx] = useState('')
  const [selected, setSelected] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const onClick = (e, index) => {
    setSelected(selected => selected.includes(result[index][0]) ? selected.filter(n => n !== selected[selected.indexOf(result[index][0])]) : [...selected, result[index][0]])
    e.target.classList.toggle('imagesClicked')
  }

  const { publicKey, sendTransaction } = useWallet();
  const fromWallet = wallet
  const mint = new PublicKey('CARoTGvYPajELZsoLQSovLY8fZmBkrrUoyJVJN3zGwQT')
  const toWallet = new PublicKey('BUTPxzZJje5b8ajX1MRcQd7pU11DwFf8HJGEkyw9fUP6')

  const onSPLClick = useCallback(async () => {
    if (!publicKey) throw new WalletNotConnectedError();
    setIsLoading(true)
    let nft1 = new PublicKey(selected[0])
    let nft2 = new PublicKey(selected[1])
    let nft3 = new PublicKey(selected[2])
    let fromTokenAccount = await connection.getParsedTokenAccountsByOwner(fromWallet.publicKey, { mint: mint, });
    let nftAccount1 = await connection.getParsedTokenAccountsByOwner(fromWallet.publicKey, { mint: nft1, });
    let nftAccount2 = await connection.getParsedTokenAccountsByOwner(fromWallet.publicKey, { mint: nft2, });
    let nftAccount3 = await connection.getParsedTokenAccountsByOwner(fromWallet.publicKey, { mint: nft3, });

    let toTokenAccount = new PublicKey('A7mLqNssZ2WBsZ7xotWtJhwrwDPSbtekhhURjkR52D8r')
    let allowOwnerOffCurve = true

    const ataNft1 = await spltoken.getAssociatedTokenAddress(
      nft1,
      toWallet,
      allowOwnerOffCurve,
      spltoken.TOKEN_PROGRAM_ID,
      spltoken.ASSOCIATED_TOKEN_PROGRAM_ID
    );
    const ataNft2 = await spltoken.getAssociatedTokenAddress(
      nft2,
      toWallet,
      allowOwnerOffCurve,
      spltoken.TOKEN_PROGRAM_ID,
      spltoken.ASSOCIATED_TOKEN_PROGRAM_ID
    );
    const ataNft3 = await spltoken.getAssociatedTokenAddress(
      nft3,
      toWallet,
      allowOwnerOffCurve,
      spltoken.TOKEN_PROGRAM_ID,
      spltoken.ASSOCIATED_TOKEN_PROGRAM_ID
    );
   
    try {
      const transaction = new Transaction().add(
        spltoken.createTransferInstruction(
          fromTokenAccount.value[0].pubkey,
          toTokenAccount,
          fromWallet.publicKey,
          1,
          [],
          spltoken.TOKEN_PROGRAM_ID
        ),
        spltoken.createAssociatedTokenAccountInstruction(
          fromWallet.publicKey, // payer
          ataNft1, // ata
          toWallet, // owner
          nft1, // mint
          spltoken.TOKEN_PROGRAM_ID,
          spltoken.ASSOCIATED_TOKEN_PROGRAM_ID
        ),
        spltoken.createTransferInstruction(
          nftAccount1.value[0].pubkey,
          ataNft1,
          fromWallet.publicKey,
          1,
          [],
          spltoken.TOKEN_PROGRAM_ID
        ),
        spltoken.createAssociatedTokenAccountInstruction(
          fromWallet.publicKey, // payer
          ataNft2, // ata
          toWallet, // owner
          nft2 // mint
        ),
        spltoken.createTransferInstruction(
          nftAccount2.value[0].pubkey,
          ataNft2,
          fromWallet.publicKey,
          1,
          [],
          spltoken.TOKEN_PROGRAM_ID
        ),
        spltoken.createAssociatedTokenAccountInstruction(
          fromWallet.publicKey, // payer
          ataNft3, // ata
          toWallet, // owner
          nft3 // mint
        ),
        spltoken.createTransferInstruction(
          nftAccount3.value[0].pubkey,
          ataNft3,
          fromWallet.publicKey,
          1,
          [],
          spltoken.TOKEN_PROGRAM_ID
        )
      );

      const signature = await sendTransaction(transaction, connection);
      const latestBlockHash = await connection.getLatestBlockhash();

      await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: signature,
      });
      setTx(signature)
      console.log(signature)
      setIsLoading(false)
    } catch (error) {
      setTx('false')
      console.error(error);
      setIsLoading(false)
    }
  })

  return (
    <div className='CustomMain'>
      <div className='CustomHeader'>
        <h1 className='title'>Custom 1 of 1 Bobby Rabbit</h1>
      </div>
      <div className='MainContainer'>
        <div className='RabbitSelect'>
          <h1 className='SelectRabbits'>Choose 3 OG to Retire</h1>
          {selected.length > 3 && <h1 className='Warning'>Please only select 3</h1>}
          <Grid container spacing={2}>
            {result.map((nft, index) => {
              return (
                <Grid item key={index} md={6} lg={4}>
                  <Paper className='images' elevation={8}>
                    <img src={nft[1].image} className='BobbyRabbits' alt='rabbits' onClick={(e) => onClick(e, index)} />
                    {selected.includes(result[index][0]) &&
                      <div className='clicked'><h1 className='selectedText'>Selected</h1></div>}
                  </Paper>
                </Grid>
              )
            })}
          </Grid>
        </div>
        <div className='completePurchase'>
          <img className='transactionCarot' src={carot} alt='carot coin' />
          <Paper elevation={8} className='completePurchase'>
            {(selected.length === 3) ? (<><h1 className='carots'>Pay 500 $CAROT to send 3 OGs to retirement and initiate your custom</h1><h3>After the transaction completes, please copy the link provided and create a discord ticket!</h3>
              {!isLoading ? (<Button size="large" className='transactionBtn' onClick={onSPLClick} disabled={!publicKey} >Order Your Custom</Button>) :
                (<Button size="large" variant='outlined' className='transactionBtn'><CircularProgress /></Button>)}</>) :
              (<h1 className='carots'>Please Select 3 OG Rabbits to Retire</h1>)}
          </Paper>
          {tx.length > 6 ?
            (<><Alert severity="success">
              Success - Transaction success <strong><a href={'https://solscan.io/tx/' + tx} target='_blank' rel='noreferrer'>Check Tx on Solscan</a></strong>
            </Alert>
              <h5 style={{ width: '90%' }}>Transaction: <a href={'https://solscan.io/tx/' + tx} target='_blank' rel='noreferrer'> Transaction Link</a></h5><h5 style={{ marginTop: '-10px' }}>Please copy the link above and open a ticket in discord!</h5></>) : tx === 'false' ?
              (<Alert severity="error">
                Error - Transaction was not confirmed-<strong>Please check wallet and try again</strong>
              </Alert>) : (<div></div>)
          }
        </div>
      </div>
    </div>
  )
}

export default Custom