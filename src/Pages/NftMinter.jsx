import { useState, useRef, useCallback, useEffect } from 'react'
import './NftMinter.css'
import DropBox from 'src/components/Dropbox';
import { Button, CircularProgress, TextField } from '@material-ui/core';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, Transaction, Keypair, SystemProgram } from '@solana/web3.js';
import Arweave from "arweave";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import arKey from '../components/arwallet.json'
import * as splToken from '@solana/spl-token'
import * as metaplex from '@metaplex-foundation/js'
import { createCreateMetadataAccountV2Instruction } from '@metaplex-foundation/mpl-token-metadata';
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletNfts } from '@nfteyez/sol-rayz-react'
import { walletAdapterIdentity } from '@metaplex-foundation/js'
import rabbitFilter from '../filter.json'


const NftMinter = () => {
    const [images, setImages] = useState([])
    const [isImage, setIsImage] = useState(false)
    const [imgFile, setImgFile] = useState(null)
    const [isUpload, setIsUpload] = useState(false)
    const [isMetadata, setIsMetadata] = useState(false)
    const [provider, setProvider] = useState(null)
    const [imgURI, setImgURI] = useState()
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
    const [isLoading, setIsLoading] = useState(false)
    const [text, setText] = useState('');
    const [isTx, setIsTx] = useState(false)
    const [TX, setTX] = useState('')


    const wallet = useAnchorWallet()
    let walletAddress = wallet?.publicKey.toString()
    const RPC = process.env.REACT_APP_SOLANA_RPC_HOST.toString()
    const feeAddress = new PublicKey('63CgiXpqYeziY9swqNw3oTuQy1TuNhcykGUy99q8X816')
    const connection = new Connection(RPC, "confirmed");

    const { nfts } = useWalletNfts({
        publicAddress: walletAddress
    })

    const getMints = JSON.stringify(nfts)

    var arr = []
    try {
        arr = JSON.parse(getMints).reduce((acc, val) => [...acc, val.mint], [])
    } catch (e) {
        console.log("Invalid json")
    }
    const checkTokens = rabbitFilter.some((r) => arr.indexOf(r) >= 0)

    const copy = async () => {
        setText(imgURI)
        await navigator.clipboard.writeText(text);
    }
    const copyMeta = async () => {
        setText(nftUri)
        await navigator.clipboard.writeText(text);
    }

    let arweaveFee = 1_000_000

    let fee = 0
    if (checkTokens === true) {
        fee = 0
    } else {
        fee = 10_000_000
    }

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
            setIsUpload(true)
            setIsMetadata(false)
        };
    };

    const clearUploadJson = () => {
        setUploadedJson(null)
        setFileName(null)
        setIsUpload(false)
        setIsMetadata(false)
        setNftUri(null)
        setIsLoading(false)
    }

    const clearUploadImage = () => {
        setImgFile(null)
        setImages(null)
        setIsPreview(false)
        setImgURI(null)
        setIsImage(false)
    }

    let checkEntry
    if ((nftDescription === null) || (nftName === null) || (nftRoyalty === null) || (nftSymbol === null)) {
        checkEntry = false
    } else {
        checkEntry = true
    }

    const uploadImage = async () => {
        setIsLoading(true)
        try {
            const feeTransaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: wallet.publicKey,
                    toPubkey: feeAddress,
                    lamports: arweaveFee,
                })
            )
            const signature = await sendTransaction(feeTransaction, connection);
            const latestBlockHash = await connection.getLatestBlockhash();
            await connection.confirmTransaction({
                blockhash: latestBlockHash.blockhash,
                lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
                signature: signature,

            });

            console.log('image upload tx:'+ signature)
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
            const id = transaction.id;
            const imageUrl = id ? `https://arweave.net/${id}` : undefined;
            setImgURI(imageUrl)
            console.log("imageUrl", imageUrl);
            setIsImage(true)
            setIsLoading(false)
        } catch (error) {
            console.error(error);
            setIsLoading(false)
        }

    }

    console.log('image uri:' + imgURI)

    let metadata
    let metadataRequest
    let uploadedMetadata

    if (isUpload) {
        uploadedMetadata = JSON.parse(uploadedJson)
        uploadedMetadata.image = imgURI
        uploadedMetadata.properties.image = imgURI
        metadataRequest = JSON.stringify(uploadedMetadata);
    } else {
        metadata = {
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
        metadataRequest = JSON.stringify(metadata);
    }

    const uploadMetadata = async () => {
        setIsLoading(true)
        try {
            const feeTransaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: wallet.publicKey,
                    toPubkey: feeAddress,
                    lamports: arweaveFee,
                })
            )
            const signature = await sendTransaction(feeTransaction, connection);
            const latestBlockHash = await connection.getLatestBlockhash();
            await connection.confirmTransaction({
                blockhash: latestBlockHash.blockhash,
                lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
                signature: signature,

            });

            console.log('Fee TX for Metadata Upload:' + signature)
            const arweave = Arweave.init({
                host: "arweave.net",
                port: 443,
                protocol: "https",
                timeout: 20000,
                logging: false,
            });
            const metadataTransaction = await arweave.createTransaction({
                data: metadataRequest,
            });

            metadataTransaction.addTag("Content-Type", "application/json");

            await arweave.transactions.sign(metadataTransaction, arKey);

            console.log("metadata txid", metadataTransaction.id);
            console.log(await arweave.transactions.post(metadataTransaction));
            console.log(metadataTransaction)
            setNftUri('https://arweave.net/' + metadataTransaction.id)
            setIsMetadata(true)
            setIsLoading(false)
        } catch (error) {
            console.error(error);
            setIsLoading(false)
        }

    }

    console.log('nft uri:' + nftUri)

    // const mintNFT = async () => {
    //     setIsLoading(true)
    //     let fuckoff = JSON.parse(metadataRequest)
    //     const lamports = await splToken.getMinimumBalanceForRentExemptMint(connection);
    //     const mintKeypair = Keypair.generate();
    //     const metadataPDA = await metaplex.findMetadataPda(mintKeypair.publicKey);
    //     const tokenATA = await splToken.getAssociatedTokenAddress(mintKeypair.publicKey, wallet.publicKey);
    //     const tokenMetadata = {
    //         name: fuckoff.name,
    //         symbol: fuckoff.symbol,
    //         uri: nftUri,
    //         sellerFeeBasisPoints: fuckoff['seller_fee_basis_points'],
    //         creators: [{ "address": wallet.publicKey, "share": 100 }],
    //         collection: null,
    //         uses: null
    //     };
    //     try {
    //         const nftFeeTX = new Transaction().add(
    //                SystemProgram.transfer({
    //                 fromPubkey: wallet.publicKey,
    //                 toPubkey: feeAddress,
    //                 lamports: fee,
    //             }),
    //         )
            
    //         const signature = await sendTransaction(nftFeeTX, connection);
    //         const latestBlockHash = await connection.getLatestBlockhash();

    //         await connection.confirmTransaction({
    //             blockhash: latestBlockHash.blockhash,
    //             lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
    //             signature: signature,

    //         });
    //         console.log(signature)

    //         const { Metaplex } = require('@metaplex-foundation/js');

    //         const metaplex = new Metaplex(connection)
    //         metaplex.use(walletAdapterIdentity(wallet))

    //         const { nft } = await metaplex
    // .nfts()
    // .create({
    //     uri: nftUri,
    //     maxSupply: 1,
    // })
    // .run();

    //         setTX(signature)
    //         setIsTx(true)
    //     } catch (error) {
    //         console.log(error)
    //         setIsLoading(false)
    //         setIsTx(false)
    //         alert(error)
    //     }
    // }

    return (
        <div className='minterMain'>
            {(wallet) ? (<>
                <h1 className='minterTitle'>Arweave Uploader</h1>
                <h4>Upload your images and metadata to arweave decentralized storage. (useful for NFTs)</h4>
                <h4>Fee of 0.001 SOL per image or metadata uploaded.</h4>
                <div className='mintContainer'>
                    <div className='imageUpload'>
                        {isPreview && <div className='imagePreviewModal'>
                            <h2>Preview</h2>
                            <img src={srcBlob} className='previewImage' alt='' />
                            <Button className='clearPreviewModal' onClick={clearUploadImage}>Clear Image</Button>
                            {(!isLoading && !isImage) ?
                                (<Button className='clearPreviewModal' onClick={uploadImage}>Get Image URI</Button>)
                                :
                                (isLoading & !isImage) ? (<Button className='clearPreviewModal'><CircularProgress /></Button>)
                                    :
                                    (<><h5>Copy the link below</h5><h5 className='copy' onClick={copy} >{imgURI}</h5></>)}
                        </div>}
                        <h3>Step One: Upload Image to Arweave</h3>
                        <br></br>
                        <DropBox onDrop={onDrop} />
                        <br></br>
                    </div>
                    <div className='metadataContainer' style={{marginBottom: '20px'}}>
                        <h3>Step Two: Upload Metadata to Arweave</h3>
                        <h5>Enter your details below or Upload your Own JSON.  The image uploaded in step one is applied to your metadata upload.  We are not responsible for formatting mistakes on uploaded JSONs</h5>
                        <Button className='clearPreviewModal' style={{marginTop: '5px'}} onClick={handleClick} disabled={uploadedJson}>Upload Your Own JSON</Button>
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

                        
                        {uploadedJson && <h5>File Uploaded: {fileName}</h5>}
                        {uploadedJson && <Button className='clearPreviewModal' onClick={clearUploadJson}>Clear</Button>}
                        <input style={{ display: 'none' }} ref={hiddenInput} type="file" onChange={handleFile} />
                        {(!isLoading && !isMetadata) ?
                                (<Button className='clearPreviewModal' onClick={uploadMetadata}>Get Metadata URI</Button>)
                                :
                                (isLoading & !isMetadata) ? (<Button className='clearPreviewModal'><CircularProgress /></Button>)
                                    :
                                    (<><h5>Copy the link below</h5><h5 className='copy' onClick={copyMeta} >{nftUri}</h5></>)}
                    </div>
                    {/* <div className='metadataContainer' style={{marginTop: '20px'}}> */}
                    {/* {(!isLoading && !isTx) ?
                                (<Button className='clearPreviewModal' onClick={mintNFT}>Mint NFT</Button>)
                                :
                                (isLoading & !isTx) ? (<Button className='clearPreviewModal'><CircularProgress /></Button>)
                                    :
                                    (<><h5>Your Tx:</h5><h5><a href={'https://solscan.io/tx/' + TX} target='_blank' rel='noreferrer'>Check Your TX on Solscan</a></h5></>)} */}
                    {/* </div> */}
                </div> </>) :
                (<>
                    <h1>Please Connect Your Wallet</h1>
                    <br></br>
                    <WalletMultiButton />
                </>)}
        </div>
    )
}

export default NftMinter