import { useState, useEffect, useCallback } from 'react'
import './Slots.css'
import bunnyHead from '../images/slotsImages/bunnyhead_square.png'
import carotCoin from '../images/slotsImages/Carot_square.png'
import carrot from '../images/slotsImages/carrot_square.png'
import brLogo from '../images/slotsImages/bobbyrabbits_square.png'
import { useAnchorWallet } from '@solana/wallet-adapter-react'
import { Connection, Keypair, PublicKey, Transaction } from '@solana/web3.js'
import * as web3 from '@solana/web3.js'
import * as spltoken from '@solana/spl-token'
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import * as bs58 from "bs58";
import { CircularProgress } from '@material-ui/core'
import { createTransferCheckedInstruction, transferChecked } from '@solana/spl-token'
import { inspect } from 'util'


const Slots = () => {
    const [spin, setSpin] = useState(false)
    const [ring1, setRing1] = useState()
    const [ring2, setRing2] = useState()
    const [ring3, setRing3] = useState()
    const [price, setPrice] = useState()
    const [input, setInput] = useState()
    const [realBet, setRealBet] = useState()
    const [balance, setBalance] = useState(0)
    const [fromTokenAccount, setFromTokenAccount] = useState()
    const [tx, setTx] = useState(false)
    const [rewardTX, setRewardTX] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isTokenAccount, setIsTokenAccount] = useState(false)

    const key = process.env.REACT_APP_TOKEN_ACCOUNT_KEY.toString()
    const payer = Keypair.fromSecretKey(bs58.decode(key))
    const payerPubkey = new PublicKey('CANSZgvRqRMsfiWURDbF7CCKafASHacwuDFVzBeK6c5P')
    const payerTokenAccount = new PublicKey('Hkf5p7119auQdo4nwu4eXQzo1QoRVBcsj4faFaK85CCQ')
    const rewardMint = new PublicKey('Fhpcm9o4BooagRwGSmCkkza7qh9f5YW3if53P13zmpY7')
    const wallet = useAnchorWallet()
    const connection = new Connection("https://bold-old-moon.solana-mainnet.quiknode.pro/ce6fe5d59cabd95814a4c61a6e69afbbfc625c9f/", "confirmed");
    const toTokenAccount = new PublicKey('GkNW1ST6MBnrSF5AD4bDPFKhHam3MUoJ4EBGfvXCQS5W')
    const { publicKey, sendTransaction } = useWallet();
    let allowOwnerOffCurve = true
    const mint = new PublicKey('GMs2urtxzWy5YSirjRqdbb3xWS4SsiFUfRBKTn1nzu58')
    const [ata, setAta] = useState()

    const fetchTokens = useCallback(async () => {
        //get tokens from wallet
        let response = await connection.getParsedTokenAccountsByOwner(wallet?.publicKey, {
            mint: mint,
        });
        if (response.value.length === 0) {
            setBalance(0)
        } else {
            //begin filter for empty
            response.value.forEach((accountInfo, index) => {
                setBalance(accountInfo.account.data["parsed"]["info"]["tokenAmount"]["uiAmount"])
                setFromTokenAccount(new PublicKey(accountInfo.pubkey.toBase58()))
            })
        }

    }, [wallet])

    useEffect(() => {
        if (wallet) fetchTokens();
    }, [wallet]);

    useEffect(() => {
        win()
    }, [ring3])

    function row1() {
        if (!spin) {
            return (
                <>
                    <div className="ringEnd"><img className='reelImages' src={bunnyHead} alt='bunny head' /></div>
                    <div className="ringEnd"><img className='reelImages' src={carotCoin} alt='carot coin' /></div>
                    <div className="ringEnd"><img className='reelImages' src={carrot} alt='carrot' /></div>
                    <div className="ringEnd"><img className='reelImages' src={brLogo} alt='text logo' /></div>
                </>
            )
        } else if (spin && ring1 == undefined) {
            return (
                <>
                    <div className="ringMoving"><img className='reelImages' src={bunnyHead} alt='bunny head' /></div>
                    <div className="ringMoving"><img className='reelImages' src={carotCoin} alt='carot coin' /></div>
                    <div className="ringMoving"><img className='reelImages' src={carrot} alt='carrot' /></div>
                    <div className="ringMoving"><img className='reelImages' src={brLogo} alt='text logo' /></div>
                </>
            )
        } else if (ring1 >= 1 && ring1 <= 50) {
            return (
                <>
                    <div className="ringEnd"><img className='reelImages' src={bunnyHead} alt='bunny head' /></div>
                    <div className="ringEnd"><img className='reelImages' src={carotCoin} alt='carot coin' /></div>
                    <div className="ringEnd"><img className='reelImages' src={carrot} alt='carrot' /></div>
                    <div className="ringEnd"><img className='reelImages' src={brLogo} alt='text logo' /></div>
                </>
            )
        } else if (ring1 > 50 && ring1 <= 75) {
            return (
                <>
                    <div className="ringEnd"><img className='reelImages' src={carotCoin} alt='carot coin' /></div>
                    <div className="ringEnd"><img className='reelImages' src={carrot} alt='carrot' /></div>
                    <div className="ringEnd"><img className='reelImages' src={brLogo} alt='text logo' /></div>
                    <div className="ringEnd"><img className='reelImages' src={bunnyHead} alt='bunny head' /></div>
                </>
            )
        } else if (ring1 > 75 && ring1 <= 95) {
            return (
                <>
                    <div className="ringEnd"><img className='reelImages' src={carrot} alt='carrot' /></div>
                    <div className="ringEnd"><img className='reelImages' src={brLogo} alt='text logo' /></div>
                    <div className="ringEnd"><img className='reelImages' src={bunnyHead} alt='bunny head' /></div>
                    <div className="ringEnd"><img className='reelImages' src={carotCoin} alt='carot coin' /></div>
                </>
            )
        } else if (ring1 > 95 && ring1 <= 100) {
            return (
                <>
                    <div className="ringEnd"><img className='reelImages' src={brLogo} alt='text logo' /></div>
                    <div className="ringEnd"><img className='reelImages' src={bunnyHead} alt='bunny head' /></div>
                    <div className="ringEnd"><img className='reelImages' src={carotCoin} alt='carot coin' /></div>
                    <div className="ringEnd"><img className='reelImages' src={carrot} alt='carrot' /></div>
                </>
            )
        }
    }

    function row2() {
        if (!spin) {
            return (
                <>
                    <div className="ringEnd"><img className='reelImages' src={brLogo} alt='text logo' /></div>
                    <div className="ringEnd"><img className='reelImages' src={bunnyHead} alt='bunny head' /></div>
                    <div className="ringEnd"><img className='reelImages' src={carotCoin} alt='carot coin' /></div>
                    <div className="ringEnd"><img className='reelImages' src={carrot} alt='carrot' /></div>
                </>
            )
        } else if (spin && ring2 == undefined) {
            return (
                <>
                    <div className="ringMoving"><img className='reelImages' src={bunnyHead} alt='bunny head' /></div>
                    <div className="ringMoving"><img className='reelImages' src={carotCoin} alt='carot coin' /></div>
                    <div className="ringMoving"><img className='reelImages' src={carrot} alt='carrot' /></div>
                    <div className="ringMoving"><img className='reelImages' src={brLogo} alt='text logo' /></div>
                </>
            )
        } else if (ring2 >= 1 && ring2 <= 50) {
            return (
                <>
                    <div className="ringEnd"><img className='reelImages' src={bunnyHead} alt='bunny head' /></div>
                    <div className="ringEnd"><img className='reelImages' src={carotCoin} alt='carot coin' /></div>
                    <div className="ringEnd"><img className='reelImages' src={carrot} alt='carrot' /></div>
                    <div className="ringEnd"><img className='reelImages' src={brLogo} alt='text logo' /></div>
                </>
            )
        } else if (ring2 > 50 && ring2 <= 75) {
            return (
                <>
                    <div className="ringEnd"><img className='reelImages' src={carotCoin} alt='carot coin' /></div>
                    <div className="ringEnd"><img className='reelImages' src={carrot} alt='carrot' /></div>
                    <div className="ringEnd"><img className='reelImages' src={brLogo} alt='text logo' /></div>
                    <div className="ringEnd"><img className='reelImages' src={bunnyHead} alt='bunny head' /></div>
                </>
            )
        } else if (ring2 > 75 && ring2 <= 95) {
            return (
                <>
                    <div className="ringEnd"><img className='reelImages' src={carrot} alt='carrot' /></div>
                    <div className="ringEnd"><img className='reelImages' src={brLogo} alt='text logo' /></div>
                    <div className="ringEnd"><img className='reelImages' src={bunnyHead} alt='bunny head' /></div>
                    <div className="ringEnd"><img className='reelImages' src={carotCoin} alt='carot coin' /></div>
                </>
            )
        } else if (ring2 > 95 && ring2 <= 100) {
            return (
                <>
                    <div className="ringEnd"><img className='reelImages' src={brLogo} alt='text logo' /></div>
                    <div className="ringEnd"><img className='reelImages' src={bunnyHead} alt='bunny head' /></div>
                    <div className="ringEnd"><img className='reelImages' src={carotCoin} alt='carot coin' /></div>
                    <div className="ringEnd"><img className='reelImages' src={carrot} alt='carrot' /></div>
                </>
            )
        }

    }

    function row3() {
        if (!spin) {
            return (
                <>
                    <div className="ringEnd"><img className='reelImages' src={brLogo} alt='text logo' /></div>
                    <div className="ringEnd"><img className='reelImages' src={bunnyHead} alt='bunny head' /></div>
                    <div className="ringEnd"><img className='reelImages' src={carotCoin} alt='carot coin' /></div>
                    <div className="ringEnd"><img className='reelImages' src={carrot} alt='carrot' /></div>
                </>
            )
        } else if (spin && ring3 == undefined) {
            return (
                <>
                    <div className="ringMoving"><img className='reelImages' src={bunnyHead} alt='bunny head' /></div>
                    <div className="ringMoving"><img className='reelImages' src={carotCoin} alt='carot coin' /></div>
                    <div className="ringMoving"><img className='reelImages' src={carrot} alt='carrot' /></div>
                    <div className="ringMoving"><img className='reelImages' src={carotCoin} alt='carot coin' /></div>
                    <div className="ringMoving"><img className='reelImages' src={carotCoin} alt='carot coin' /></div>
                    <div className="ringMoving"><img className='reelImages' src={brLogo} alt='text logo' /></div>
                </>
            )
        } else if (ring3 >= 1 && ring3 <= 50) {
            return (
                <>
                    <div className="ringEnd"><img className='reelImages' src={bunnyHead} alt='bunny head' /></div>
                    <div className="ringEnd"><img className='reelImages' src={carotCoin} alt='carot coin' /></div>
                    <div className="ringEnd"><img className='reelImages' src={carrot} alt='carrot' /></div>
                    <div className="ringEnd"><img className='reelImages' src={brLogo} alt='text logo' /></div>
                </>
            )
        } else if (ring3 > 50 && ring3 <= 75) {
            return (
                <>
                    <div className="ringEnd"><img className='reelImages' src={carotCoin} alt='carot coin' /></div>
                    <div className="ringEnd"><img className='reelImages' src={carrot} alt='carrot' /></div>
                    <div className="ringEnd"><img className='reelImages' src={brLogo} alt='text logo' /></div>
                    <div className="ringEnd"><img className='reelImages' src={bunnyHead} alt='bunny head' /></div>
                </>
            )
        } else if (ring3 > 75 && ring3 <= 95) {
            return (
                <>
                    <div className="ringEnd"><img className='reelImages' src={carrot} alt='carrot' /></div>
                    <div className="ringEnd"><img className='reelImages' src={brLogo} alt='text logo' /></div>
                    <div className="ringEnd"><img className='reelImages' src={bunnyHead} alt='bunny head' /></div>
                    <div className="ringEnd"><img className='reelImages' src={carotCoin} alt='carot coin' /></div>
                </>
            )
        } else if (ring3 > 95 && ring3 <= 100) {
            return (
                <>
                    <div className="ringEnd"><img className='reelImages' src={brLogo} alt='text logo' /></div>
                    <div className="ringEnd"><img className='reelImages' src={bunnyHead} alt='bunny head' /></div>
                    <div className="ringEnd"><img className='reelImages' src={carotCoin} alt='carot coin' /></div>
                    <div className="ringEnd"><img className='reelImages' src={carrot} alt='carrot' /></div>
                </>
            )
        }
    }

    const checkforAccount = useCallback(async () => {
        let rewardToTokenAccount = await connection.getParsedTokenAccountsByOwner(wallet?.publicKey, { mint: rewardMint, });
        if (rewardToTokenAccount.value.length === 0) {
            setIsTokenAccount(false)
        } else {
            setIsTokenAccount(true)
        }

        const createdAccount = await spltoken.getAssociatedTokenAddress(
            rewardMint,
            wallet.publicKey,
            allowOwnerOffCurve,
            spltoken.TOKEN_PROGRAM_ID,
            spltoken.ASSOCIATED_TOKEN_PROGRAM_ID
        );
        setAta(createdAccount)

    })

    useEffect(() => {
        if (wallet) checkforAccount();
    }, [wallet]);

    const createAccount = useCallback(async () => {
        // let newRewardAccount = new PublicKey(ata.toBase58())
        setIsLoading(true)
        try {
            const transaction = new Transaction().add(
                spltoken.createAssociatedTokenAccountInstruction(
                    wallet.publicKey, // payer
                    ata, // ata
                    wallet?.publicKey, // owner
                    rewardMint, // mint
                    spltoken.TOKEN_PROGRAM_ID,
                    spltoken.ASSOCIATED_TOKEN_PROGRAM_ID
                ),
            )
            const signature = await sendTransaction(transaction, connection);
            const latestBlockHash = await connection.getLatestBlockhash();

            await connection.confirmTransaction({
                blockhash: latestBlockHash.blockhash,
                lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
                signature: signature,
            });
            setRewardTX(signature)
            setIsLoading(false)
            setIsTokenAccount(true)
        } catch (error) {
            setRewardTX('false')
            console.error(error);
            setIsLoading(false)
        }
    })

    const sendReward1 = useCallback(async () => {
        let signature = ''
        let rewardToTokenAccount = await connection.getParsedTokenAccountsByOwner(wallet?.publicKey, { mint: rewardMint, });
        try {
            setIsLoading(true)
            const recipientTokenAccount = new PublicKey(rewardToTokenAccount.value[0].pubkey.toBase58())
            const tx = new Transaction().add(
                spltoken.createTransferInstruction(
                    payerTokenAccount,
                    recipientTokenAccount,
                    payer.publicKey,
                    realBet * 1500,
                    [],
                    spltoken.TOKEN_PROGRAM_ID
                )
            )
            signature = await web3.sendAndConfirmTransaction(connection, tx, [payer]);
            setRewardTX(signature)
            setIsLoading(false)
            console.log(signature)
        } catch (error) {
            setRewardTX('false')
            console.error(error);
            setIsLoading(false)
        }
    })

    const sendReward2 = useCallback(async () => {
        let signature = ''
        let rewardToTokenAccount = await connection.getParsedTokenAccountsByOwner(wallet?.publicKey, { mint: rewardMint, });
        try {
            setIsLoading(true)
            const recipientTokenAccount = new PublicKey(rewardToTokenAccount.value[0].pubkey.toBase58())
            const tx = new Transaction().add(
                spltoken.createTransferInstruction(
                    payerTokenAccount,
                    recipientTokenAccount,
                    payer.publicKey,
                    realBet * 2000,
                    [],
                    spltoken.TOKEN_PROGRAM_ID
                )
            )
            signature = await web3.sendAndConfirmTransaction(connection, tx, [payer]);
            setRewardTX(signature)
            setIsLoading(false)
            console.log(signature)
        } catch (error) {
            setRewardTX('false')
            console.error(error);
            setIsLoading(false)
        }
    })

    const sendReward3 = useCallback(async () => {
        let signature = ''
        let rewardToTokenAccount = await connection.getParsedTokenAccountsByOwner(wallet?.publicKey, { mint: rewardMint, });
        try {
            setIsLoading(true)
            const recipientTokenAccount = new PublicKey(rewardToTokenAccount.value[0].pubkey.toBase58())
            const tx = new Transaction().add(
                spltoken.createTransferInstruction(
                    payerTokenAccount,
                    recipientTokenAccount,
                    payer.publicKey,
                    realBet * 2500,
                    [],
                    spltoken.TOKEN_PROGRAM_ID
                )
            )
            signature = await web3.sendAndConfirmTransaction(connection, tx, [payer]);
            setRewardTX(signature)
            setIsLoading(false)
            console.log(signature)
        } catch (error) {
            setRewardTX('false')
            console.error(error);
            setIsLoading(false)
        }
    })

    const sendReward4 = useCallback(async () => {
        let signature = ''
        let rewardToTokenAccount = await connection.getParsedTokenAccountsByOwner(wallet?.publicKey, { mint: rewardMint, });
        try {
            setIsLoading(true)
            const recipientTokenAccount = new PublicKey(rewardToTokenAccount.value[0].pubkey.toBase58())
            const tx = new Transaction().add(
                spltoken.createTransferInstruction(
                    payerTokenAccount,
                    recipientTokenAccount,
                    payer.publicKey,
                    realBet * 5000,
                    [],
                    spltoken.TOKEN_PROGRAM_ID
                )
            )
            signature = await web3.sendAndConfirmTransaction(connection, tx, [payer]);
            setRewardTX(signature)
            setIsLoading(false)
            console.log(signature)
        } catch (error) {
            setRewardTX('false')
            console.error(error);
            setIsLoading(false)
        }
    })

    const sendReward5 = useCallback(async () => {
        let signature = ''
        let rewardToTokenAccount = await connection.getParsedTokenAccountsByOwner(wallet?.publicKey, { mint: rewardMint, });
        try {
            setIsLoading(true)
            const recipientTokenAccount = new PublicKey(rewardToTokenAccount.value[0].pubkey.toBase58())
            const tx = new Transaction().add(
                spltoken.createTransferInstruction(
                    payerTokenAccount,
                    recipientTokenAccount,
                    payer.publicKey,
                    1e2,
                    [],
                    spltoken.TOKEN_PROGRAM_ID
                )
            )
            signature = await web3.sendAndConfirmTransaction(connection, tx, [payer]);
            setRewardTX(signature)
            setIsLoading(false)
            console.log(signature)
        } catch (error) {
            setRewardTX('false')
            console.error(error);
            setIsLoading(false)
        }
    })

    function win() {
        if (ring1 <= 50 && ring2 <= 50 && ring3 <= 50 && ring1 !== undefined) {
            setPrice(1)
            sendReward1()
        } else if (ring1 > 50 && ring1 <= 75 && ring2 > 50 && ring2 <= 75 && ring3 > 50 && ring3 <= 75 && ring1 !== undefined) {
            setPrice(2)
            sendReward2()
        } else if (ring1 > 75 && ring1 <= 95 && ring2 > 75 && ring2 <= 95 && ring3 > 75 && ring3 <= 95 && ring1 !== undefined) {
            setPrice(3)
            sendReward3()
        } else if (ring1 > 95 && ring1 <= 100 && ring2 > 95 && ring2 <= 100 && ring3 > 95 && ring3 <= 100 && ring1 !== undefined) {
            setPrice(4)
            sendReward4()
        } else {
            setPrice(0)
        }
    }

    function rand() {
        setRing1(Math.floor(Math.random() * (100 - 1) + 1))
        setTimeout(function () { setRing2(Math.floor(Math.random() * (100 - 1) + 1)) }, 1000)
        setTimeout(function () { setRing3(Math.floor(Math.random() * (100 - 1) + 1)) }, 2000)
    }
    const sendCarot = useCallback(async () => {
        if (input > 0) {
            if (!publicKey) throw new WalletNotConnectedError();
            setIsLoading(true)
            try {
                const transaction = new Transaction().add(
                    spltoken.createTransferInstruction(
                        fromTokenAccount,
                        toTokenAccount,
                        wallet.publicKey,
                        input,
                        [],
                        spltoken.TOKEN_PROGRAM_ID
                    ),
                )
                const signature = await sendTransaction(transaction, connection);
                const latestBlockHash = await connection.getLatestBlockhash();
                let confirmed = 'processed'

                await connection.confirmTransaction({
                    blockhash: latestBlockHash.blockhash,
                    lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
                    signature: signature,
                    Commitment: confirmed,
                });
                setTx(true)
                setIsLoading(false)
                console.log(signature)
            } catch (error) {
                setTx(false)
                console.error(error);
                setIsLoading(false)
            }
        }
    })

    function play() {
        if (ring3 > 1 || !spin) {
            if (input <= balance && input >= 1) {
                if (tx) {
                    setRealBet(input)
                    setSpin(true)
                    setRing1()
                    setRing2()
                    setRing3()
                    setBalance(balance - input)
                    setTimeout(function () {
                        rand()
                    }, 2000)
                    setTx(false)
                } else {
                    window.alert('Transaction Failed or Unconfirmed, please try again')
                }
            } else {
                setPrice(10)
            }

        }
    }


    function win() {
        if (ring1 <= 50 && ring2 <= 50 && ring3 <= 50 && ring1 !== undefined) {
            setPrice(1)
            sendReward1()
        } else if (ring1 > 50 && ring1 <= 75 && ring2 > 50 && ring2 <= 75 && ring3 > 50 && ring3 <= 75 && ring1 !== undefined) {
            setPrice(2)
            sendReward2()
        } else if (ring1 > 75 && ring1 <= 95 && ring2 > 75 && ring2 <= 95 && ring3 > 75 && ring3 <= 95 && ring1 !== undefined) {
            setPrice(3)
            sendReward3()
        } else if (ring1 > 95 && ring1 <= 100 && ring2 > 95 && ring2 <= 100 && ring3 > 95 && ring3 <= 100 && ring1 !== undefined) {
            setPrice(4)
            sendReward4()
        } else {
            setPrice(0)
        }
    }

    function premio() {
        if (price === 1 && ring3 > 1) {
            return (
                <p className="priceInd">{"Winner, Winner, Chicken Dinner! You've won " + (realBet * 15) + "$CANS!"}</p>
            )
        } else if (price === 2 && ring3 > 1) {
            return (
                <p className="priceInd">{"Holy smokes! You've won " + (realBet * 20) + "$CANS!!"}</p>
            )
        } else if (price === 3 && ring3 > 1) {
            return (
                <p className="priceInd">{"Somebody stop them!!  You've won " + (realBet * 25) + "$CANS!!!"}</p>
            )
        } else if (price === 4 && ring3 > 1) {
            return (
                <p className="priceInd">{"WTF!! Jackpot! You've won: " + (realBet * 50) + "$CANS!!!!"}</p>
            )
        } else if (price === 0 && ring3 > 1) {
            return (
                <p className="priceInd">Sucks to suck!  Try again!</p>
            )
        } else if (price === 10) {
            return (
                <p className="priceInd">🥶 <span style={{ color: `red` }}>Not enough funds</span> </p>
            )
        }
    }

    function numChecker(e) {
        const value = e.target.value;
        const regex = /^[0-9]+$/;
        if (value.match(regex) && parseInt(value) >= 0 || value === "") {
            setInput(value);
        }
    }


    return (
        <div className='SlotsMain'>
            <h1 class="neon" data-text="U">SL<span class="flicker-slow">O</span>T<span class="flicker-fast">S</span></h1>
            <div className="fullSlot">
                <h1 className="price">Jackpot: 50x your bet in $CANS</h1>
                {/* <div className='jackpotImages'><img className='small icon' src=</div> */}
                <div className="slot">
                    <div className="row">
                        {row1()}
                    </div>
                    <div className="row">
                        {row2()}
                    </div>
                    <div className="row">
                        {row3()}
                    </div>
                </div>
                <h1 className="price">
                    {premio()}
                </h1>
                <div className="slotFoot">
                    <input value={input} type="number" onChange={(e) => numChecker(e)} className="betInput" placeholder="Enter Your Bet"></input>
                    {!isTokenAccount ? (<>{!isLoading ? (<button className="spinButton" onClick={createAccount} disabled={!publicKey}>Create Reward Account</button>) : (<button className="spinButton" onClick={createAccount} disabled={!publicKey}><CircularProgress /></button>)}</>) : (<>{!tx ? (<> {!isLoading ? (<button className="spinButton" onClick={sendCarot} disabled={isLoading}>Confirm Transaction</button>)
                        : (<button className="spinButton" disabled={isLoading}><CircularProgress /></button>)}</>) : (<button className="spinButton" onClick={() => play()}>Try Your Luck!</button>)}</>)}
                </div>
                <h1 className="price">{"Available $CAROT: " + Math.round((balance * 100)) / 100}</h1>
            </div>
        </div>
    )
}

export default Slots