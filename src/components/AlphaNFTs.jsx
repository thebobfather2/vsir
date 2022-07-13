import { useState, useCallback, useEffect } from 'react'
import { Connection, PublicKey } from '@solana/web3.js'
import { useWalletNfts } from '@nfteyez/sol-rayz-react'
import * as spltoken from '@solana/spl-token'
import '../Pages/Dashboard.css'
import { Paper } from '@material-ui/core'
import { TokenListProvider, TokenInfo } from '@solana/spl-token-registry';

const AlphaNFTs = () => {
    //fetchMetadata to display image field
    const alphaWalletString = 'AhU6zW8Ef4ptmAK7Dq3NGgpciVEGAUTbFMU1YeCAgRxa'

    const alphapublic_key = new PublicKey("AhU6zW8Ef4ptmAK7Dq3NGgpciVEGAUTbFMU1YeCAgRxa");
    const connection = new Connection("https://bold-old-moon.solana-mainnet.quiknode.pro/ce6fe5d59cabd95814a4c61a6e69afbbfc625c9f/", "confirmed");

    const [metadata, setMetadata] = useState({});
    const { nfts } = useWalletNfts({
        publicAddress: alphaWalletString,
        sort: true
    })

    // we need to fetch the metadata seperately from the NFTs data.uri field
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
    console.log(nfts)
    //fetch alpha tokens
    const [alphaTokens, setAlphaTokens] = useState([])

    const fetchAlphaTokens = useCallback(async () => {
        //get tokens from wallet
        let response = await connection.getParsedTokenAccountsByOwner(alphapublic_key, {
            programId: spltoken.TOKEN_PROGRAM_ID,
        });

        //initialize variables to hold the tokens and empty accounts after filtering.
        let token = []
        //begin filter for empty
        response.value.forEach((accountInfo, index) => {
            //filter for tokens with amount over 1 (ft vs nft filter)
            if (parseInt(accountInfo.account.data["parsed"]["info"]["tokenAmount"]["amount"]) > 1) {
                token.push(accountInfo)
                setAlphaTokens([...token])
            }
        }
        )
    }, [alphapublic_key])

    useEffect(() => {
        {
            fetchAlphaTokens()
        }
    }, [])

    const [theTokenList, setTheTokenList] = useState([])

    const getTokenList = useCallback(() => {
        new TokenListProvider().resolve().then((tokens) => {
            const tokenList = tokens.filterByClusterSlug('mainnet-beta').getList();
            setTheTokenList(tokenList)
        })
    })
    useEffect(() => {
        getTokenList()
    }, [])

    const [tokenName, setTokenName] = useState([])
    let listOfTokens = []
    let fuckthisshit = []

    theTokenList.map(item => {
        for (let fuckhole = 0; fuckhole < alphaTokens.length; ++fuckhole) {

            if (item.address === alphaTokens[fuckhole].account.data.parsed.info.mint) {
                let thisTokenAddress = item.address
                let thisTokenName = item.name
                listOfTokens.push({
                    mint: thisTokenAddress,
                    name: thisTokenName
                })
            }
        }
    })
    
    return (
        <>
        <div className='Wholeshebang'>
            <h3 style={{ position: 'absolute', top: '5px', left: '20px' }}>Alpha Holdings</h3>
            <div className='AlphaBlock'>
                <h3 style={{marginBottom: '20px'}}>NFTs</h3>
            <div className='alphaNFTs'>
                {nfts.map((nft, index) => {
                    return (

                        <img src={metadata?.[nft.mint]?.image} className='BobbyRabbits' alt='no image' />

                    )
                })}
            </div>
        </div>
            <div className='Tokens'>
                <h3>Tokens</h3>
                {alphaTokens.map((token, index) => {
                    return (
                        <> 
                        <div className='eachTokens'>
                            {((token.account.data.parsed.info.mint) === (listOfTokens[listOfTokens.findIndex(object => object.mint === token.account.data.parsed.info.mint)]?.mint)) ? (<h4 className='tokenAddress'>{listOfTokens[listOfTokens.findIndex(object => object.mint === token.account.data.parsed.info.mint)].name}</h4>) : (<h4 className='tokenAddress'>{token.account.data['parsed']['info']['mint']}</h4>)}
                            <div style={{ display: 'flex' }}> Balance:
                                <div style={{ padding: '2px', backgroundColor: 'white', marginLeft: '4px', borderRadius: '5px' }}><h5 style={{ color: "black", marginTop: '0', marginBottom: '0' }}>{token.account.data['parsed']['info']['tokenAmount']['uiAmount']}</h5></div>
                            </div>
                        </div>
                        </>
                    )
                })}
            </div>
</div>
        </>
    )
}

export default AlphaNFTs