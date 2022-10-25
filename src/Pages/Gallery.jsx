import { Button, Grid, TextField } from "@material-ui/core";
import CircularProgress from "@mui/material/CircularProgress";
import { useWalletNfts } from "@nfteyez/sol-rayz-react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Connection, PublicKey } from "@solana/web3.js";
import { useCallback, useEffect, useState } from "react";
import magicEden from "../images/MELogo.png";
import Solscan from "../images/solscan.png";
import "./Gallery.css";

const Gallery = () => {
  const [enteredWallet, setEnteredWallet] = useState("");
  const [myWallet, setMyWallet] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // useEffect(() => {
  //   try {
  //     let pubkey = new PublicKey(myWallet)
  //     let  isSolana =  PublicKey.isOnCurve(pubkey.toBuffer())
  //     if (isSolana) {
  //       setIsError(!isSolana)
  //     }else{
  //       setIsError(!isSolana)
  //     }

  // } catch (error) {
  //     return false
  // }
  // },[myWallet])

  let walletAddress = "";
  const wallet = useAnchorWallet();
  walletAddress = wallet?.publicKey.toString();
  const connection = new Connection(
    "https://solana-api.projectserum.com/",
    "confirmed"
  );

  const { nfts } = useWalletNfts({
    publicAddress: myWallet,
    connection,
  });

  const [metadata, setMetadata] = useState({});

  const fetchMetadata = useCallback(async () => {
    setIsLoading(false);
    setIsError(false);
    for (const nft of nfts) {
      try {
        fetch(nft.data.uri)
          .then((response) => response.json())
          .then((meta) =>
            setMetadata((state) => ({ ...state, [nft.mint]: meta }))
          );
      } catch (error) {
        console.log(error);
      }
    }
  }, [nfts]);

  useEffect(() => {
    //if (!isSolana) setIsError(true)
    if (nfts?.length) {
      fetchMetadata();
    }
  }, [nfts, fetchMetadata]);

  const fetchInputWallet = (e) => {
    setEnteredWallet(e.target.value);
  };
  const handleEnter = () => {
    setMyWallet(enteredWallet);
    try {
      let pubkey = new PublicKey(myWallet);
      let isSolana = PublicKey.isOnCurve(pubkey.toBuffer());
      setIsError(false);
    } catch (error) {
      setIsError(true);
    }
  };
  const fetchWallet = () => {
    setMyWallet(walletAddress);
    if (!(nfts?.length > 0)) setIsLoading(false);
  };

  return (
    <div className="galleryMain">
      <h1 className="galleryTitle">Gallery</h1>
      <div className="walletSelect">
        <h4 className="instructions">
          Click button to use your connected wallet, or enter a valid wallet
          address in the search bar.
        </h4>
        <div className="inputs">
          {wallet?.publicKey ? (
            <Button
              size="large"
              className="mywallet"
              variant="outlined"
              onClick={fetchWallet}
            >
              Use My Wallet
            </Button>
          ) : (
            <>
              <div style={{ marginRight: "10px" }}>
                <WalletMultiButton>Connect Wallet</WalletMultiButton>
              </div>
            </>
          )}
          <TextField
            id="walletAddress"
            className="walletInput"
            label="Wallet Address"
            variant="outlined"
            onChange={(e) => fetchInputWallet(e)}
            onKeyPress={(ev) => {
              console.log(`Pressed keyCode ${ev.key}`);
              if (ev.key === "Enter") {
                handleEnter();
              }
            }}
            InputLabelProps={{
              style: {
                color: "white",
              },
            }}
            InputProps={{
              style: {
                color: "white",
              },
            }}
          />
        </div>
        <div className="Viewing">
          <h3>Viewing Wallet: {myWallet}</h3>
        </div>
      </div>
      {nfts?.length > 0 && !isLoading && !isError ? (
        <>
          {" "}
          {!isLoading && !isError ? (
            <div className="Gallery">
              <Grid
                container
                spacing={2}
                className="nftsgrid"
                justifyContent="space-evenly"
              >
                {nfts.map((nft, index) => (
                  <Grid item key={index} md={3} lg={2}>
                    <div className="AllImages">
                      <img
                        src={metadata?.[nft.mint]?.image}
                        className="nftImages"
                        alt="loading"
                      />
                      <br />
                      <p className="nftTitles">{nft.data.name}</p>
                      <div className="logoContainer">
                        <a
                          href={"https://magiceden.io/item-details/" + nft.mint}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            className="logos"
                            src={magicEden}
                            alt="Magic Eden Logo"
                          />
                        </a>
                        <a
                          href={"https://solscan.io/token/" + nft.mint}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            className="logos"
                            src={Solscan}
                            alt="Solscan Logo"
                          />
                        </a>
                      </div>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </div>
          ) : isLoading && !isError ? (
            <div className="galleryLoading">
              <div className="circprog">
                <h3 style={{ color: "white" }}>
                  Please Select Your Wallet or Enter a Valid Solana Address
                </h3>
                <CircularProgress
                  style={{ width: "100px", height: "100px", color: "white" }}
                />
              </div>
            </div>
          ) : (
            <div className="galleryLoading">
              <h1 style={{ color: "white" }}>
                Please Enter a Valid Solana Address
              </h1>
            </div>
          )}
        </>
      ) : !(nfts?.length > 0) && isLoading && !isError ? (
        <div className="galleryLoading">
          <div className="circprog">
            <h3 style={{ color: "white" }}>
              Please Select Your Wallet or Enter a Valid Solana Address
            </h3>
            <CircularProgress
              style={{ width: "100px", height: "100px", color: "white" }}
            />
          </div>
        </div>
      ) : !(nfts?.length > 0) && !isLoading && !isError ? (
        <div className="galleryLoading">
          <h1 style={{ color: "white" }}>
            You (or the wallet you're stalking) have 0 NFTs<br></br> or you've
            entered an invalid Solana address
          </h1>
          <a
            href="https://magiceden.io/marketplace/bobbyrabbits"
            target="_blank"
            rel="noreferrer"
          >
            <h3 style={{ color: "white" }}>
              Purchase a Bobby Rabbit NFT today!
            </h3>{" "}
            <img
              src={magicEden}
              alt="Magic Eden Logo"
              width="100px"
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "-20px",
              }}
            />
          </a>
        </div>
      ) : (
        <div className="galleryLoading">
          <h1 style={{ color: "white" }}>
            Please Enter a Valid Solana Address
          </h1>
        </div>
      )}
    </div>
  );
};

export default Gallery;
