import React, { useState, useCallback, useEffect } from 'react'
import './BulkSend.css'
import { useAnchorWallet } from '@solana/wallet-adapter-react'

import { useWalletNfts } from '@nfteyez/sol-rayz-react'
import { Grid, Paper, Button, TextField } from '@material-ui/core'
import Alert from '@mui/material/Alert';
import { Connection, PublicKey } from '@solana/web3.js';
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import { SystemProgram, Transaction } from "@solana/web3.js";
import * as spltoken from "@solana/spl-token";
import CircularProgress from '@mui/material/CircularProgress';
import rabbitFilter from '../filter.json'
import refresh from '../images/refresh.png'

const BulkSend = () => {

    let walletAddress = ''
    const wallet = useAnchorWallet()
    walletAddress = wallet?.publicKey.toString()

    console.log(rabbitFilter)
    //   const filterList = JSON.parse(JSON.stringify(filter))

    const connection = new Connection('https://bold-old-moon.solana-mainnet.quiknode.pro/ce6fe5d59cabd95814a4c61a6e69afbbfc625c9f/', "confirmed");

    const { nfts } = useWalletNfts({
        publicAddress: walletAddress

    })
    console.log(nfts)

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

    const [selected, setSelected] = useState([])

    const getMints = JSON.stringify(nfts)

    var arr = []
    try {
        arr = JSON.parse(getMints).reduce((acc, val) => [...acc, val.mint], [])
    } catch (e) {
        console.log("Invalid json")
    }
    const checkTokens = rabbitFilter.some((r) => arr.indexOf(r) >= 0)

    console.log(checkTokens)
    const onClick = (e, index) => {
        setSelected(selected => selected.includes(nfts[index].mint) ? selected.filter(n => n !== selected[selected.indexOf(nfts[index].mint)]) : [...selected, nfts[index].mint])

    }

    const { publicKey, sendTransaction } = useWallet();
    const [receiver, setReceiver] = useState('')

    const feeWallet = new PublicKey('5BNK4Kq1b5rDcr3fkqhfJLz58XEfcT3sPJdxLAB6n7Cq')
    console.log(receiver)

    const [isLoading, setIsLoading] = useState(false)
    const [tx, setTx] = useState('')
    const fromWallet = wallet

    console.log(selected)


    const sendNfts = useCallback(async () => {
        if (!publicKey) throw new WalletNotConnectedError();
        setIsLoading(true)


        const toWallet = new PublicKey(receiver)
        let instructions = []
        let allowOwnerOffCurve = true



        for (let i = 0; i < selected.length; i++) {
            let mint = new PublicKey(selected[i])
            let toTokenAccount = await connection.getParsedTokenAccountsByOwner(toWallet, { mint: mint, });
            let nftAccount = await connection.getParsedTokenAccountsByOwner(fromWallet.publicKey, { mint: mint, })
            console.log(nftAccount)

            const ataNft = await spltoken.getAssociatedTokenAddress(
                mint,
                toWallet,
                allowOwnerOffCurve,
                spltoken.TOKEN_PROGRAM_ID,
                spltoken.ASSOCIATED_TOKEN_PROGRAM_ID
            );

            if (toTokenAccount.value.length === 0) {
                instructions.push(
                    spltoken.createAssociatedTokenAccountInstruction(
                        fromWallet.publicKey, // payer
                        ataNft, // ata
                        toWallet, // owner
                        mint, // mint
                        spltoken.TOKEN_PROGRAM_ID,
                        spltoken.ASSOCIATED_TOKEN_PROGRAM_ID
                    ),
                    spltoken.createTransferInstruction(
                        nftAccount.value[0].pubkey,
                        ataNft,
                        fromWallet.publicKey,
                        1,
                        [],
                        spltoken.TOKEN_PROGRAM_ID
                    ),
                )
            } else {
                instructions.push(
                    spltoken.createTransferInstruction(
                        nftAccount.value[0].pubkey,
                        toTokenAccount.value[0].pubkey,
                        fromWallet.publicKey,
                        1,
                        [],
                        spltoken.TOKEN_PROGRAM_ID
                    ),
                )
            }
        }
        console.log(instructions)
        let fee = 0
        if (checkTokens === true) {
            fee = 1
        } else {
            fee = 3_000_000 * selected.length
        }
        instructions.push(
            SystemProgram.transfer({
                fromPubkey: fromWallet.publicKey,
                toPubkey: feeWallet,
                lamports: fee,
            })
        )
        try {
            const transaction = new Transaction().add(...instructions);

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
    const refreshPage = () => {
        window.location.reload();
      }


    return (
        <div className='BulkMain'>
            <h1 className='BulkTitle'>Bulk Send NFTs</h1>
            <div className='BulkContainer'>
                <div className='BulkNfts'>
                    <h1 className='selectNfts'>Select Your NFTs (7 at a time) </h1>
                    <Grid
                        container
                        spacing={2}
                        className="nftsgrid"
                    >

                        {(nfts || []).map((nft, index) => (
                            <Grid item key={index} md={6} lg={3}>
                                <div className='BulkImages' onClick={(e) => onClick(e, index)}>

                                    <img src={metadata?.[nft.mint]?.image} width="150" alt="loading" />
                                    <br />
                                    <p className='nftTitles'>{nft.data.name}</p>
                                    {selected.includes(nfts[index].mint) &&
                                        <div className='clicked'><h1 className='selectedText'>Selected</h1></div>}
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </div>
                <div className='BulkPurchase'>
                    <h1>Send Your NFTs</h1>
                    <h3>Approximately 0.005 SOL per nft </h3>
                    <h5 style={{ marginTop: '-15px' }}>(Solana fees + Small Usage fee)</h5>
                    <h4 style={{ marginTop: '-5px', marginBottom: '35px' }}>*Service is free for Bobby Rabbits Holders*</h4>
                    <TextField
                        required
                        className='toWallet'
                        id='toWallet'
                        variant='outlined'
                        label='Recipient Address'
                        InputLabelProps={{
                            style: {
                                color: "white"
                            }
                        }}
                        InputProps={{
                            style: {
                                color: "white"
                            }
                        }}
                        value={receiver}
                        onChange={(e) => {
                            setReceiver(e.target.value);
                        }} />{selected.length > 7 && <h4>{selected.length} NFTS Selected. Please Remove {selected.length - 7}</h4>}
                    {!isLoading ? (<Button size="large" className='transactionBtn' onClick={sendNfts} disabled={!publicKey || selected.length > 7 || selected.length === 0} >Send NFTs</Button>) :
                        (<Button size="large" variant='outlined' className='transactionBtn'><CircularProgress /></Button>)}<br></br>
                        <Button className='refresh' variant='contained' onClick={refreshPage}>Refresh<img className='refreshIcon' src={refresh} alt='refresh' /></Button><br></br>
                    {tx.length > 6 ?
                        (<Alert severity="success">
                            Success - Transaction success <strong><a href={'https://solscan.io/tx/' + tx} target='_blank' rel='noreferrer'>Check Tx on Solscan</a></strong>
                        </Alert>) : tx === 'false' ?
                            (<Alert severity="error">
                                Error - Transaction was not confirmed-<strong>Please check wallet and try again</strong>
                            </Alert>) : (<div></div>)
                    }
                    <Paper elevation={8} className='completePurchase'></Paper>
                </div>
            </div>
        </div>
    )
}

export default BulkSend