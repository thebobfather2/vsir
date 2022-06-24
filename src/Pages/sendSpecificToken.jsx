import React, { useState, useCallback, useEffect } from 'react'
import { useAnchorWallet } from '@solana/wallet-adapter-react'
import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as spltoken from "@solana/spl-token";

const Custom = () => {

    
    const wallet = useAnchorWallet()

    const { publicKey, sendTransaction } = useWallet();
  const fromWallet = wallet
  
  const mint = new PublicKey('CARoTGvYPajELZsoLQSovLY8fZmBkrrUoyJVJN3zGwQT')
  const toWallet = new PublicKey('BUTPxzZJje5b8ajX1MRcQd7pU11DwFf8HJGEkyw9fUP6')

  const onSPLClick = useCallback(async () => {
    if (!publicKey) throw new WalletNotConnectedError()

    let fromTokenAccount = await connection.getParsedTokenAccountsByOwner(fromWallet.publicKey, {mint: mint,})
    let toTokenAccount = new PublicKey('A7mLqNssZ2WBsZ7xotWtJhwrwDPSbtekhhURjkR52D8r')

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
        )
    const signature = await sendTransaction(transaction, connection);
    const latestBlockHash = await connection.getLatestBlockhash();
    
    await connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: signature,
      
    });
    setTx(signature)
    console.log(signature)
  } catch (error) {
    setTx('false')
    console.error(error);
  }
  })
  return (
    <div> Custom </div>
  )
}

  export default Custom