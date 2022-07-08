
import { useState, useCallback } from 'react'
import './Send.css'
import { useAnchorWallet } from '@solana/wallet-adapter-react'
import { Connection, PublicKey } from '@solana/web3.js';
import { Paper, Button, TextField } from '@material-ui/core'
import $CAROT from '../images/carot.png'
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import { Transaction } from "@solana/web3.js";
import * as spltoken from "@solana/spl-token";
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

const Send = () => {

  const wallet = useAnchorWallet()
  const { publicKey, sendTransaction } = useWallet();
  const [receiver, setReceiver] = useState('')
  const [amount, setAmount] = useState('')
  const toSend = parseInt(amount)
  const connection = new Connection("https://bold-old-moon.solana-mainnet.quiknode.pro/ce6fe5d59cabd95814a4c61a6e69afbbfc625c9f/", "confirmed");
  const fromWallet = wallet
  const mint = new PublicKey('CARoTGvYPajELZsoLQSovLY8fZmBkrrUoyJVJN3zGwQT')
  const [isLoading, setIsLoading] = useState(false)
  const [tx, setTx] = useState('')

  const sendCarot = useCallback(async () => {
    setIsLoading(true)
    if (!publicKey) throw new WalletNotConnectedError();

    const toWallet = new PublicKey(receiver)
    let fromTokenAccount = await connection.getParsedTokenAccountsByOwner(fromWallet.publicKey, { mint: mint, });
    let toTokenAccount = await connection.getParsedTokenAccountsByOwner(toWallet, { mint: mint, });
    let allowOwnerOffCurve = true

    const ata = await spltoken.getAssociatedTokenAddress(
      mint,
      toWallet,
      allowOwnerOffCurve,
      spltoken.TOKEN_PROGRAM_ID,
      spltoken.ASSOCIATED_TOKEN_PROGRAM_ID
    );

    try {
      let transaction = []
      if (toTokenAccount.value.length === 0) {
        transaction = new Transaction().add(
          spltoken.createAssociatedTokenAccountInstruction(
            fromWallet.publicKey, // payer
            ata, // ata
            toWallet, // owner
            mint, // mint
            spltoken.TOKEN_PROGRAM_ID,
            spltoken.ASSOCIATED_TOKEN_PROGRAM_ID
          ),
          spltoken.createTransferInstruction(
            fromTokenAccount.value[0].pubkey,
            ata,
            fromWallet.publicKey,
            toSend,
            [],
            spltoken.TOKEN_PROGRAM_ID
          ),
        );
      } else {
        transaction = new Transaction().add(
          spltoken.createTransferInstruction(
            fromTokenAccount.value[0].pubkey,
            toTokenAccount.value[0].pubkey,
            fromWallet.publicKey,
            toSend,
            [],
            spltoken.TOKEN_PROGRAM_ID
          ),
        )
      }
      const signature = await sendTransaction(transaction, connection);
      const latestBlockHash = await connection.getLatestBlockhash();
      let confirmed = 'processed'

      await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: signature,
        Commitment: confirmed,
      });
      setTx(signature)
      console.log(signature)
      setIsLoading(false)
    } catch (error) {
      setTx('false')
      setIsLoading(false)
      console.error(error);
    }
  })

  return (
    <div className='SendMain'>
      <h1 className='SendTitle'>Send $CAROT</h1>
      <Paper className='Send' elevation={8}>
        <img className='carotGif' src={$CAROT} alt='carot gif' />
        <TextField
          required
          className='amountInput'
          id='amount'
          label='Amount'
          InputProps={{
            style: {
              color: "black"
            }
          }}
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }} />
        <TextField
          required
          className='amountInput'
          id='address'
          label='Address'
          InputProps={{
            style: {
              color: "black"
            }
          }}
          value={receiver}
          onChange={(e) => {
            setReceiver(e.target.value);
          }} />
        {!isLoading ?
          (<Button size="large" variant='outlined' className='transactionBtn' onClick={sendCarot} disabled={!publicKey} >Send $CAROT</Button>) :
          (<Button size="large" variant='outlined' className='transactionBtn'><CircularProgress /></Button>)
        }
        <br></br>{tx.length > 6 ?
          (<Alert severity="success">
            Success - Transaction success <strong><a href={'https://solscan.io/tx/' + tx}>Check Tx on Solscan</a></strong>
          </Alert>) : tx === 'false' ?
            (<Alert severity="error">
              Error - Transaction was not confirmed-<strong>Please Check Wallet and Try Again</strong>
            </Alert>) : (<div></div>)
        }
      </Paper>
    </div>
  )
}

export default Send