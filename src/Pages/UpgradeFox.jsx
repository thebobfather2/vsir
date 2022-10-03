import { Button, Grid, Paper } from "@material-ui/core";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useWalletNfts } from "@nfteyez/sol-rayz-react";
import * as spltoken from "@solana/spl-token";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { useCallback, useEffect, useState } from "react";
import filter from "../foxfilter.json";
import fieldcoin from "../images/fieldcoin.png";
import filter2 from "../upgradefilter.json";
import "./UpgradeFox.css";

const UpgradeFox = () => {
  let walletAddress = "";
  const wallet = useAnchorWallet();
  walletAddress = wallet?.publicKey.toString();
  const filterList = JSON.parse(JSON.stringify(filter));
  const filterList2 = JSON.parse(JSON.stringify(filter2));
  const connection = new Connection(
    "https://bold-old-moon.solana-mainnet.quiknode.pro/ce6fe5d59cabd95814a4c61a6e69afbbfc625c9f/",
    "confirmed"
  );

  const { nfts } = useWalletNfts({
    publicAddress: walletAddress,
  });

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
        console.log(error);
      }
    }
  }, [nfts]);

  useEffect(() => {
    if (nfts?.length) fetchMetadata();
  }, [nfts, fetchMetadata]);

  const filterArray = Object.keys(metadata)
    .filter((key) => filterList.includes(key))
    .reduce((obj, key) => {
      obj[key] = metadata[key];
      return obj;
    }, {});

  const filterArray2 = Object.keys(metadata)
    .filter((key) => filterList2.includes(key))
    .reduce((obj, key) => {
      obj[key] = metadata[key];
      return obj;
    }, {});

  var result = Object.keys(filterArray).map((key) => [key, filterArray[key]]);
  const [tx, setTx] = useState("");
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  var result2 = Object.keys(filterArray2).map((key) => [
    key,
    filterArray2[key],
  ]);
  const [tx2, setTx2] = useState("");
  const [selected2, setSelected2] = useState([]);
  const [isLoading2, setIsLoading2] = useState(false);

  const onClick = (e, index) => {
    setSelected((selected) =>
      selected.includes(result[index][0])
        ? selected.filter(
            (n) => n !== selected[selected.indexOf(result[index][0])]
          )
        : [...selected, result[index][0]]
    );
    e.target.classList.toggle("imagesClicked");
  };

  const onClick2 = (e, index) => {
    setSelected2((selected2) =>
      selected2.includes(result2[index][0])
        ? selected2.filter(
            (n) => n !== selected2[selected2.indexOf(result2[index][0])]
          )
        : [...selected2, result2[index][0]]
    );
    e.target.classList.toggle("imagesClicked");
  };

  const { publicKey, sendTransaction } = useWallet();
  const fromWallet = wallet;
  const mint = new PublicKey("61X22Z6QnRzeuaPjvdWN4npRBBFNpVdkdMgWvRNt5dfm");
  const toWallet = new PublicKey("CK3Dam3dsMUdupHXDYJwBkzPjLe6NHZ9GHC2LMCLxTYV");

  const onSPLClick = useCallback(async () => {
    if (!publicKey) throw new WalletNotConnectedError();
    setIsLoading(true);
    let nft1 = new PublicKey(selected[0]);
    let nft2 = new PublicKey(selected2[0]);
    let fromTokenAccount = await connection.getParsedTokenAccountsByOwner(
      fromWallet.publicKey,
      { mint: mint }
    );
    let nftAccount1 = await connection.getParsedTokenAccountsByOwner(
      fromWallet.publicKey,
      { mint: nft1 }
    );
    let nftAccount2 = await connection.getParsedTokenAccountsByOwner(
      fromWallet.publicKey,
      { mint: nft2 }
    );

    let toTokenAccount = new PublicKey(
      "GRTUAG6biTRTEQNCH7KrHQEdUq33cLpASQR8WhQzvM5K"
    );
    let allowOwnerOffCurve = true;

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

    try {
      const transaction = new Transaction().add(
        spltoken.createTransferInstruction(
          fromTokenAccount.value[0].pubkey,
          toTokenAccount,
          fromWallet.publicKey,
          1000,
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
        )
      );

      const signature = await sendTransaction(transaction, connection);
      const latestBlockHash = await connection.getLatestBlockhash();

      await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: signature,
      });
      setTx(signature);
      console.log(signature);
      setIsLoading(false);
    } catch (error) {
      setTx("false");
      console.error(error);
      setIsLoading(false);
    }
  });

  return (
    <div className="CustomMain">
      <div className="CustomHeader">
        <h1 className="title" style={{marginTop: "-40px", marginBottom: "40px" }}>
          Upgrade Your Fox
        </h1>
      </div>

      <div className="MainContainer">
        <div className="RabbitSelect">
          <h2 className="SelectRabbits" style={{ marginBottom: "30px" }}>
            Which Edd Fox would you like to upgrade?
          </h2>
          {selected.length > 1 && (
            <h2 className="Warning" style={{ marginTop: "-25px" }}>
              Please only select 1!
            </h2>
          )}
          <Grid container spacing={1} className="rabbitGrid">
            {result.map((nft, index) => {
              return (
                <Grid item key={index} md={6} lg={4}>
                  <Paper className="images" elevation={8}>
                    <img
                      src={nft[1].image}
                      className="BobbyRabbits"
                      alt="rabbits"
                      onClick={(e) => onClick(e, index)}
                    />
                    {selected.includes(result[index][0]) && (
                      <div className="clicked">
                        <h1 className="selectedText">Selected</h1>
                      </div>
                    )}
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </div>

        <div className="RabbitSelect" style={{minWidth: "30%"}}>
          <h2 className="SelectRabbits" style={{ marginBottom: "30px" }}>
            Choose a power up:
          </h2>
          {selected2.length > 1 && (
            <h2 className="Warning" style={{ marginTop: "-25px" }}>
              Please only select 1!
            </h2>
          )}
          <Grid container spacing={2} className="rabbitGrid">
            {result2.map((nft, index) => {
              return (
                <Grid item key={index} md={6} lg={4}>
                  <Paper className="images" elevation={8}>
                    <img
                      src={nft[1].image}
                      className="BobbyRabbits"
                      alt="rabbits"
                      onClick={(e) => onClick2(e, index)}
                    />
                    {selected2.includes(result2[index][0]) && (
                      <div className="clicked">
                        <h1 className="selectedText">Selected</h1>
                      </div>
                    )}
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </div>

        <div className="completePurchase">
          <img className="transactionCarot" src={fieldcoin} alt="field coin" />
          {selected.length === 1 && selected2.length === 1 ? (
            <>
              <h1 className="carots" style={{ marginBottom: "10px" }}>
                Pay 10 $FIELD to upgrade your Fox!
              </h1>
              <h3>
                After the transaction completes, we will transform your fox and send him back. If you have any questions, ping us in the Discord!
              </h3>
              {!isLoading ? (
                <Button
                  size="large"
                  className="transactionBtn"
                  style={{ marginBottom: "30px" }}
                  onClick={onSPLClick}
                  disabled={!publicKey}
                >
                  Upgrade Your Fox!
                </Button>
              ) : (
                <Button
                  size="large"
                  variant="outlined"
                  className="transactionBtn"
                >
                  <CircularProgress />
                </Button>
              )}
            </>
          ) : (
            <h1 className="carots" style={{ marginBottom: "20px" }}>
              Make Your Selections
            </h1>
          )}
          {tx.length > 6 ? (
            <>
              <Alert severity="success">
                Success - Transaction success{" "}
                <strong>
                  <a
                    href={"https://solscan.io/tx/" + tx}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Check Tx on Solscan
                  </a>
                </strong>
              </Alert>
              <h5 style={{ width: "90%" }}>
                Transaction:{" "}
                <a
                  href={"https://solscan.io/tx/" + tx}
                  target="_blank"
                  rel="noreferrer"
                >
                  {" "}
                  Transaction Link
                </a>
              </h5>
              <h5 style={{ marginTop: "-10px" }}>
                Please copy the link above and share in the Fed Foxes thread in
                Discord!
              </h5>
            </>
          ) : tx === "false" ? (
            <Alert severity="error">
              Error - Transaction was not confirmed-
              <strong>Please check wallet and try again</strong>
            </Alert>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpgradeFox;
