import { useState, useRef, useCallback, useEffect } from 'react'
import './NftMinter.css'
import DropBox from 'src/components/Dropbox';
import { Button, TextField } from '@material-ui/core';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, Transaction, Keypair, SystemProgram } from '@solana/web3.js';
import Arweave from "arweave";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import arKey from '../components/arwallet.json'
import * as splToken from '@solana/spl-token'
import * as metaplex from '@metaplex-foundation/js'
import { createCreateMetadataAccountV2Instruction } from '@metaplex-foundation/mpl-token-metadata';
import { useWallet } from "@solana/wallet-adapter-react";


const NftMinter = () => {
    const [images, setImages] = useState([])
    const [imgFile, setImgFile] = useState(null)
    const [provider, setProvider] = useState(null)
    const [imgURI, setImgURI] = useState('')
    const [uploadedJson, setUploadedJson] = useState('')
    const [nftName, setNftName] = useState(null)
    const [nftSymbol, setNftSymbol] = useState(null)
    const [nftDescription, setNftDescription] = useState(null)
    const [nftRoyalty, setNftRoyalty] = useState(null)
    const [nftUri, setNftUri] = useState('')
    const [fileName, setFileName] = useState()
    const [isPreview, setIsPreview] = useState(false)
    const [nftMeta, setNftMeta] = useState(null)
    const { publicKey, sendTransaction } = useWallet();

    const wallet = useAnchorWallet()
    let walletAddress = wallet?.publicKey.toString()
    const feeAddress = new PublicKey('63CgiXpqYeziY9swqNw3oTuQy1TuNhcykGUy99q8X816')
    const connection = new Connection("https://bold-old-moon.solana-mainnet.quiknode.pro/ce6fe5d59cabd95814a4c61a6e69afbbfc625c9f/", "confirmed");


    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.map((file, index) => {
            const reader = new FileReader();
            reader.onload = function (e) {
                setImages(
                    { id: index, src: e.target.result },
                );
                setImgFile(Buffer.from(reader.result))
                setIsPreview(true)
            };
            reader.readAsArrayBuffer(file)
            return file;

        });
    }, []);


    const blob = new Blob([imgFile])
    let srcBlob = URL.createObjectURL(blob);

    const hiddenInput = useRef(null)

    const handleClick = event => {
        hiddenInput.current.click()
    }

    const handleFile = e => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        setFileName(e.target.files[0].name)
        fileReader.onload = e => {

            setUploadedJson(e.target.result);

        };
    };



    const clearUploadJson = () => {
        setUploadedJson(null)
        setFileName(null)
    }

    const clearUploadImage = () => {
        setImgFile(null)
        setImages(null)
        setIsPreview(false)
    }

    let checkEntry
    if ((nftDescription === null) || (nftName === null) || (nftRoyalty === null) || (nftSymbol === null)) {
        checkEntry = false
    } else {
        checkEntry = true
    }

    console.log(checkEntry)



    const mintNFT = async () => {
            const arweave = Arweave.init({
                host: "arweave.net",
                port: 443,
                protocol: "https",
                timeout: 20000,
                logging: false,
            });
            const transaction = await arweave.createTransaction({
                data: imgFile,
            });
            transaction.addTag("Content-Type", "image/png");

            await arweave.transactions.sign(transaction, arKey);

            const response = await arweave.transactions.post(transaction);
            console.log(response);
            const id = transaction.id;
            const imageUrl = id ? `https://arweave.net/${id}` : undefined;
            setImgURI(imageUrl)
            console.log("imageUrl", imageUrl);

            const metadata = {
                name: nftName,
                symbol: nftSymbol,
                description: nftDescription,
                seller_fee_basis_points: (parseInt(nftRoyalty) * 100),
                properties: {
                    files: [
                        {
                            uri: imgURI,
                            type: "image/png",
                        },
                    ],
                    category: "image",
                    maxSupply: 0,
                    creators: [
                        {
                            address: walletAddress,
                            share: 100,
                        },
                    ],
                },
                image: imgURI,
            };
            
            setTimeout(() => console.log('Initial timeout!'), 6000);

            let metadataRequest

            if (uploadedJson?.length > 0) {
                const uploadedMetadata = JSON.parse(uploadedJson)
                uploadedMetadata.image = imgURI
                uploadedMetadata.properties.image = imgURI
                metadataRequest = JSON.stringify(uploadedMetadata);
                setNftMeta(metadataRequest)
            } else {
                metadataRequest = JSON.stringify(metadata);
                setNftMeta(metadataRequest)
            }

            const metadataTransaction = await arweave.createTransaction({
                data: metadataRequest,
            });

            metadataTransaction.addTag("Content-Type", "application/json");

            await arweave.transactions.sign(metadataTransaction, arKey);

            console.log("metadata txid", metadataTransaction.id);
            console.log(await arweave.transactions.post(metadataTransaction));

            setNftUri('https://arweave.net/' + metadataTransaction.id)
let fuckoff = JSON.parse(metadataRequest)
            const lamports = await splToken.getMinimumBalanceForRentExemptMint(connection);
            const mintKeypair = Keypair.generate();
            const metadataPDA = await metaplex.findMetadataPda(mintKeypair.publicKey);
            const tokenATA = await splToken.getAssociatedTokenAddress(mintKeypair.publicKey, wallet.publicKey);
            const tokenMetadata = {
                name: fuckoff.name,
                symbol: fuckoff.symbol,
                uri: nftUri,
                sellerFeeBasisPoints: fuckoff['seller_fee_basis_points'],
                creators: fuckoff.creators,
                collection: null,
                uses: null
            };
            try{
            const createNewTokenTransaction = new Transaction().add(
                SystemProgram.createAccount({
                    fromPubkey: wallet.publicKey,
                    newAccountPubkey: mintKeypair.publicKey,
                    space: splToken.MINT_SIZE,
                    lamports: lamports,
                    programId: splToken.TOKEN_PROGRAM_ID,
                }),
                splToken.createInitializeMintInstruction(
                    mintKeypair.publicKey,
                    0,
                    wallet.publicKey,
                    wallet.publicKey,
                    splToken.TOKEN_PROGRAM_ID),
                splToken.createAssociatedTokenAccountInstruction(
                    wallet.publicKey,
                    tokenATA,
                    wallet.publicKey,
                    mintKeypair.publicKey,
                ),
                splToken.createMintToInstruction(
                    mintKeypair.publicKey,
                    tokenATA,
                    wallet.publicKey,
                    1,
                ),
                createCreateMetadataAccountV2Instruction({
                    metadata: metadataPDA,
                    mint: mintKeypair.publicKey,
                    mintAuthority: wallet.publicKey,
                    payer: wallet.publicKey,
                    updateAuthority: wallet.publicKey,
                },
                    {
                        createMetadataAccountArgsV2:
                        {
                            data: tokenMetadata,
                            isMutable: true
                        }
                    }
                )
            );
            const signature = await sendTransaction(createNewTokenTransaction, connection, { signers: [mintKeypair] });
            const latestBlockHash = await connection.getLatestBlockhash();

            await connection.confirmTransaction({
                blockhash: latestBlockHash.blockhash,
                lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
                signature: signature,

            });
            console.log(signature)
        } catch (error){
console.log(error)
        }      
    }

    return (
        <div className='minterMain'>
            {(wallet) ? (<>
                <h1 className='minterTitle'>NFT Minter</h1>
                <h4>Upload an image, enter your details and mint your own NFT!</h4>
                <h4>Fee of 0.01 SOL per nft minted + Solana Fees.  Only pay Solana fees as Bobby Rabbit's Holder.</h4>
                <div className='mintContainer'>
                    <div className='imageUpload'>
                        {isPreview && <div className='imagePreviewModal'>

                            <h2>Preview</h2>
                            <img src={srcBlob} className='previewImage' alt='' />
                            <Button className='clearPreviewModal' onClick={clearUploadImage}>Clear Image</Button>
                        </div>}
                        <h3>Upload Image</h3>
                        <br></br>
                        <DropBox onDrop={onDrop} />
                        <br></br>
                    </div>
                    <div className='metadataContainer'>
                        <h3>Enter Your NFT Details</h3>
                        <TextField
                            required
                            className='metadataInput'
                            id='name'
                            label='Name'
                            disabled={uploadedJson}
                            InputProps={{
                                style: {
                                    color: "black"
                                }
                            }}
                            value={nftName}
                            onChange={(e) => {
                                setNftName(e.target.value);
                            }} />
                        <br></br>
                        <TextField
                            required
                            className='metadataInput'
                            id='symbol'
                            label='Symbol (no more than 4 letters)'
                            disabled={uploadedJson}
                            InputProps={{
                                style: {
                                    color: "black"
                                }
                            }}
                            value={nftSymbol}
                            onChange={(e) => {
                                setNftSymbol(e.target.value);
                            }} />
                        <br></br>
                        <TextField
                            required
                            className='metadataInput'
                            id='Description'
                            label='Brief Description'
                            disabled={uploadedJson}
                            InputProps={{
                                style: {
                                    color: "black"
                                }
                            }}
                            value={nftDescription}
                            onChange={(e) => {
                                setNftDescription(e.target.value);
                            }} />
                        <br></br>
                        <TextField
                            required
                            className='metadataInput'
                            id='Royalty'
                            label='Royalty (% as a number 1 = 1%, 5 = 5%, etc)'
                            disabled={uploadedJson}
                            InputProps={{
                                style: {
                                    color: "black"
                                }
                            }}
                            value={nftRoyalty}
                            onChange={(e) => {
                                setNftRoyalty(e.target.value);
                            }} />
                        <br></br>

                        <Button className='preview' onClick={handleClick} disabled={uploadedJson}>Upload JSON</Button>
                        {uploadedJson && <h5>File Uploaded: {fileName}</h5>}
                        {uploadedJson && <Button className='clearJson' onClick={clearUploadJson}>Clear</Button>}
                        <input style={{ display: 'none' }} ref={hiddenInput} type="file" onChange={handleFile} />
                        <Button onClick={mintNFT} disabled={!wallet || !imgFile || (!uploadedJson && !checkEntry)}>Mint NFT</Button>
                    </div>
                </div> </>) :
                (<>
                    <h1>Please Connect Your Wallet</h1>
                    <WalletMultiButton />
                </>)}
        </div>
    )
}

export default NftMinter