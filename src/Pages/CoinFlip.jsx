import { Button, CircularProgress } from "@material-ui/core";
import Alert from "@mui/material/Alert";
import * as spltoken from "@solana/spl-token";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import * as web3 from "@solana/web3.js";
import { Connection, Keypair, PublicKey, Transaction } from "@solana/web3.js";
import * as bs58 from "bs58";
import { useCallback, useEffect, useState } from "react";
import Confetti from "react-confetti";
import carot from "../images/carot.png";
import headGIF from "../images/heads.gif";
import headsCoin from "../images/headsCoin.png";
import tailsCoin from "../images/tailsCoin.png";
import flipAudio from "../sounds/flip.mp3";
import lossAudio from "../sounds/loss.mp3";
import winAudio from "../sounds/win.mp3";
import "./CoinFlip.css";

const CoinFlip = () => {
  const [userSelection, setUserSelection] = useState("");
  const [userBet, setUserBet] = useState(null);
  const [isHeads, setIsHeads] = useState(null);
  const [isWinner, setIsWinner] = useState(null);
  const [flipping, setFlipping] = useState(false);
  const [number, setNumber] = useState(null);
  const [lossMessage, setLossMessage] = useState("");
  const [isTokenAccount, setIsTokenAccount] = useState(false);
  const [balance, setBalance] = useState(0);
  const [fromTokenAccount, setFromTokenAccount] = useState();
  const [cansBalance, setCansBalance] = useState();
  const [tx, setTx] = useState("");
  const [rewardTX, setRewardTX] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const RPC = process.env.REACT_APP_CUSTOM_RPC.toString();
  const key = process.env.REACT_APP_TOKEN_ACCOUNT_KEY.toString();
  const payer = Keypair.fromSecretKey(bs58.decode(key));
  const payerPubkey = new PublicKey(
    "CANSZgvRqRMsfiWURDbF7CCKafASHacwuDFVzBeK6c5P"
  );
  const payerTokenAccount = new PublicKey(
    "VXXvSFH2DMZsvmXdeHuAiBWVQ6JnTyVBucjzyN4L8rV"
  );
  const rewardMint = new PublicKey(
    "6LDWqpaAXZSrdcHiSwBYfBgsy9HMjXZXdDkDtxxpknZW"
  );
  const wallet = useAnchorWallet();
  const connection = new Connection(RPC, "confirmed");
  const toTokenAccount = new PublicKey(
    "7bFkTdGwDPwY7edXqnkcmffrqu6dijWQN1BGHdcVsJv5"
  );
  const { publicKey, sendTransaction } = useWallet();
  let allowOwnerOffCurve = true;
  const mint = new PublicKey("CARoTGvYPajELZsoLQSovLY8fZmBkrrUoyJVJN3zGwQT");
  const [ata, setAta] = useState();

  const messageBank = [
    "LOLOLOLOL.  NOPE!",
    "You ain't got the sauce",
    "No...  Just no.",
    " 2 bad so sad :'(",
    "MMMMM muhfckin $CAROT TASTES GOOD",
    "When the fun stops",
    "You lost, you big fat loser",
  ];

  const winSound = () => {
    new Audio(winAudio).play();
  };
  const lossSound = () => {
    new Audio(lossAudio).play();
  };
  const flipSound = () => {
    new Audio(flipAudio).play();
  };

  const fetchCarotTokens = useCallback(async () => {
    //get tokens from wallet
    let response = await connection.getParsedTokenAccountsByOwner(
      wallet?.publicKey,
      {
        mint: mint,
      }
    );
    if (response.value.length === 0) {
      setBalance(0);
    } else {
      //begin filter for empty
      response.value.forEach((accountInfo, index) => {
        setBalance(
          accountInfo.account.data["parsed"]["info"]["tokenAmount"]["uiAmount"]
        );
        setFromTokenAccount(new PublicKey(accountInfo.pubkey.toBase58()));
      });
    }
  }, [wallet]);

  useEffect(() => {
    if (wallet) fetchCarotTokens();
  }, [wallet]);

  const fetchCansTokens = useCallback(async () => {
    //get tokens from wallet
    let response = await connection.getParsedTokenAccountsByOwner(
      wallet?.publicKey,
      {
        mint: rewardMint,
      }
    );
    if (response.value.length === 0) {
      setCansBalance(0);
    } else {
      //begin filter for empty
      response.value.forEach((accountInfo, index) => {
        setCansBalance(
          accountInfo.account.data["parsed"]["info"]["tokenAmount"]["uiAmount"]
        );
      });
    }
  }, [wallet]);

  useEffect(() => {
    if (wallet) fetchCansTokens();
  }, [wallet]);

  const checkforAccount = useCallback(async () => {
    let rewardToTokenAccount = await connection.getParsedTokenAccountsByOwner(
      wallet?.publicKey,
      { mint: rewardMint }
    );
    if (rewardToTokenAccount.value.length === 0) {
      setIsTokenAccount(false);
    } else {
      setIsTokenAccount(true);
    }

    const createdAccount = await spltoken.getAssociatedTokenAddress(
      rewardMint,
      wallet.publicKey,
      allowOwnerOffCurve,
      spltoken.TOKEN_PROGRAM_ID,
      spltoken.ASSOCIATED_TOKEN_PROGRAM_ID
    );
    setAta(createdAccount);
  });

  useEffect(() => {
    if (wallet) checkforAccount();
  }, [wallet]);

  const createAccount = useCallback(async () => {
    // let newRewardAccount = new PublicKey(ata.toBase58())
    setIsLoading(true);
    try {
      const transaction = new Transaction().add(
        spltoken.createAssociatedTokenAccountInstruction(
          wallet.publicKey, // payer
          ata, // ata
          wallet?.publicKey, // owner
          rewardMint, // mint
          spltoken.TOKEN_PROGRAM_ID,
          spltoken.ASSOCIATED_TOKEN_PROGRAM_ID
        )
      );
      const signature = await sendTransaction(transaction, connection);
      const latestBlockHash = await connection.getLatestBlockhash();

      await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: signature,
      });
      setRewardTX(signature);
      setIsLoading(false);
      setIsTokenAccount(true);
    } catch (error) {
      setRewardTX("false");
      console.error(error);
      setIsLoading(false);
    }
  });
  const makeTX = useCallback(async () => {
    let signature = "";
    let rewardToTokenAccount = await connection.getParsedTokenAccountsByOwner(
      wallet?.publicKey,
      { mint: rewardMint }
    );
    try {
      setIsLoading(true);
      const recipientTokenAccount = new PublicKey(
        rewardToTokenAccount.value[0].pubkey.toBase58()
      );
      const tx = new Transaction().add(
        spltoken.createTransferInstruction(
          payerTokenAccount,
          recipientTokenAccount,
          payer.publicKey,
          userBet * 2 * 100,
          [],
          spltoken.TOKEN_PROGRAM_ID
        )
      );
      signature = await web3.sendAndConfirmTransaction(connection, tx, [payer]);
      setRewardTX(signature);
      setIsLoading(false);
      console.log(signature);
    } catch (error) {
      setRewardTX("false");
      console.error(error);
      setIsLoading(false);
    }
  });
  const theFlip = () => {
    flipSound();
    setIsWinner(null);
    setFlipping(true);
    setIsLoading(true);
    let randomNumber = Math.round(Math.random());
    setNumber(randomNumber);

    if (randomNumber === 1 && userSelection === "heads") {
      setTimeout(function () {
        setFlipping(false);
        setIsWinner(true);
        setIsLoading(false);
        makeTX();
        winSound();
      }, 3000);
    } else if (randomNumber === 0 && userSelection === "tails") {
      setTimeout(function () {
        setFlipping(false);
        setIsWinner(true);
        setIsLoading(false);
        makeTX();
        winSound();
      }, 3000);
    } else {
      setTimeout(function () {
        setFlipping(false);
        setIsWinner(false);
        setIsLoading(false);
        lossSound();
        fetchCansTokens();
        fetchCarotTokens();
      }, 3000);
      setLossMessage(
        messageBank[Math.floor(Math.random() * messageBank.length)]
      );
    }
  };

  const flipCoin = useCallback(async () => {
    setLossMessage("");
    setIsLoading(true);
    if (userBet > 0) {
      if (!publicKey) throw new WalletNotConnectedError();
      setIsLoading(true);
      try {
        const transaction = new Transaction().add(
          spltoken.createTransferInstruction(
            fromTokenAccount,
            toTokenAccount,
            wallet.publicKey,
            userBet,
            [],
            spltoken.TOKEN_PROGRAM_ID
          )
        );
        const signature = await sendTransaction(transaction, connection);
        const latestBlockHash = await connection.getLatestBlockhash();
        let confirmed = "processed";

        await connection.confirmTransaction({
          blockhash: latestBlockHash.blockhash,
          lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
          signature: signature,
          Commitment: confirmed,
        });
        setTx(true);
        setIsLoading(false);
        theFlip();
        console.log(signature);
      } catch (error) {
        setTx(false);
        console.error(error);
        setIsLoading(false);
        setFlipping(false);
        setIsError(true);
        alert(
          "An error occured.  Please check your wallet and try again.  If you feel this is a mistake, please open a ticket in Bobby Rabbits Discord"
        );
      }
    }
  });
  return (
    <div className="CoinFlipMain">
      {wallet ? (
        <>
          {isWinner && (
            <div
              className="bigWinnerMain"
              onClick={() => {
                setIsWinner(false);
                fetchCansTokens();
                fetchCarotTokens();
              }}
            >
              <Confetti
                width={window.screen.availWidth}
                height={window.screen.availHeight}
              />
              <div className="winnerContainer">
                <h1>You won!</h1>
                <br></br>
                <h3>Sending you {userBet * 2} $CANS</h3>
                <br></br>
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  <>
                    {rewardTX.length > 6 ? (
                      <Alert severity="success">
                        Success - Transaction success{" "}
                        <strong>
                          <a
                            href={"https://solscan.io/tx/" + rewardTX}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Check Tx on Solscan
                          </a>
                        </strong>
                      </Alert>
                    ) : rewardTX === "false" ? (
                      <Alert severity="error">
                        Error - Transaction was not confirmed-
                        <strong>Please check wallet and try again</strong>
                      </Alert>
                    ) : (
                      <div></div>
                    )}
                  </>
                )}
                <Button
                  className="closeWinner"
                  onClick={() => {
                    setIsWinner(false);
                    fetchCansTokens();
                    fetchCarotTokens();
                  }}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
          <div className="balances">
            <div className="carotBalance">$CAROT Balance: {balance}</div>
            <div className="carotBalance">$CANS Balance: {cansBalance}</div>
          </div>
          <h1 className="CoinFlipTitle">Coin Flip </h1>
          <h3 style={{ marginTop: "-15px" }}>Beta</h3>
          <br></br>
          <h3>Use $CAROT to Win $CANS</h3>
          <br></br>
          {flipping ? (
            <img className="coinFlipping" src={carot} alt="coinflip" />
          ) : (
            <>
              {number === 0 ? (
                <img className="headOrTails" src={tailsCoin} alt="tailsCoin" />
              ) : number === 1 ? (
                <img className="headOrTails" src={headsCoin} alt="heads Coin" />
              ) : (
                <img className="headOrTails" src={carot} alt="carotCoin" />
              )}
            </>
          )}
          <br></br>
          <h3>Heads or Tails?</h3>
          <div className="choices">
            {userSelection === "heads" ? (
              <>
                <Button className="flipchosen">Heads</Button>
                <Button
                  className="flip"
                  onClick={() => {
                    setUserSelection("tails");
                  }}
                >
                  Tails
                </Button>
              </>
            ) : userSelection === "tails" ? (
              <>
                <Button
                  className="flip"
                  onClick={() => {
                    setUserSelection("heads");
                  }}
                >
                  Heads
                </Button>
                <Button className="flipchosen">Tails</Button>
              </>
            ) : (
              <>
                {" "}
                <Button
                  className="flip"
                  onClick={() => {
                    setUserSelection("heads");
                  }}
                >
                  Heads
                </Button>
                <Button
                  className="flip"
                  onClick={() => {
                    setUserSelection("tails");
                  }}
                >
                  Tails
                </Button>
              </>
            )}
          </div>
          <br></br>
          <h3>Make Your Bet</h3>
          <div className="betArray">
            <Button
              className={userBet === 1 ? "betsChosen" : "bets"}
              onClick={() => {
                setUserBet(1);
              }}
            >
              1 $CAROT
            </Button>
            <Button
              className={userBet === 5 ? "betsChosen" : "bets"}
              onClick={() => {
                setUserBet(5);
              }}
            >
              5 $CAROT
            </Button>
            <Button
              className={userBet === 10 ? "betsChosen" : "bets"}
              onClick={() => {
                setUserBet(10);
              }}
            >
              10 $CAROT
            </Button>
          </div>
          <br></br>
          {isTokenAccount ? (
            <>
              {!isLoading ? (
                <Button
                  size="large"
                  className="theFlipper"
                  onClick={flipCoin}
                  disabled={
                    !(userSelection === "heads" || userSelection === "tails") ||
                    userBet === null ||
                    balance < 1
                  }
                >
                  Flip
                </Button>
              ) : (
                <Button size="large" className="theFlipper">
                  <CircularProgress />
                </Button>
              )}
            </>
          ) : (
            <>
              {!isLoading ? (
                <Button
                  size="large"
                  className="theFlipper"
                  onClick={createAccount}
                >
                  Create Reward Account
                </Button>
              ) : (
                <Button size="large" className="theFlipper">
                  <CircularProgress />
                </Button>
              )}
            </>
          )}
          <br></br>
          {isWinner === null ? (
            <div className="Loser"></div>
          ) : (
            <>
              {isWinner ? (
                <div className="winnerWinner"></div>
              ) : (
                <div className="Loser">{lossMessage}</div>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <h2>Please Connect Wallet</h2>
          <br></br>
          <WalletMultiButton />
        </>
      )}
    </div>
  );
};

export default CoinFlip;
