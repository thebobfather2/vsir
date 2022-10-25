import { CandyShopDataValidator, Orders, Sell, Stat } from "@liqnft/candy-shop";
import { CandyShop } from "@liqnft/candy-shop-sdk";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useRef } from "react";
import styled from "styled-components";
import {
  CANDY_SHOP_CREATOR_ADDRESS_FOX,
  CANDY_SHOP_PROGRAM_ID_FOX,
  CANDY_SHOP_TREASURY_MINT_FOX,
  NETWORK,
} from "../components/candy-shop-fox";

import "./CarotMarket.css";

const FoxMart: React.FC = () => {
  const wallet = useAnchorWallet();
  const RPC = "https://solana-api.projectserum.com/";
  const candyShopRef = useRef<CandyShop>(
    new CandyShop({
      candyShopCreatorAddress: CANDY_SHOP_CREATOR_ADDRESS_FOX,
      treasuryMint: CANDY_SHOP_TREASURY_MINT_FOX,
      candyShopProgramId: CANDY_SHOP_PROGRAM_ID_FOX,
      env: NETWORK,
      // pass additional settings param to configure shop display
      settings: {
        currencySymbol: "$FIELD",
        currencyDecimals: 2,
        priceDecimals: 0,
        volumeDecimals: 1,
        mainnetConnectionUrl: RPC,
      },
    })
  );
  return (
    <div className="CarotMarketMain" style={{ padding: 40 }}>
      {wallet ? (
        <CandyShopDataValidator>
          <DesContainer>
            <Stat
              candyShop={candyShopRef.current}
              title={"FoxMart"}
              description={"Use Field Coin to purchase upgrades for Edd!"}
              style={{ paddingBottom: 50 }}
            />

            <h2
              style={{
                marginBottom: "20px",
                background: "black",
                color: "white",
                borderRadius: "20px",
                padding: "10px",
              }}
            >
              Purchase upgrades for your fox:
            </h2>
            <Orders
              wallet={wallet}
              candyShop={candyShopRef.current}
              walletConnectComponent={<WalletMultiButton />}
            />
            <h2
              style={{
                marginBottom: "20px",
                background: "black",
                color: "white",
                borderRadius: "20px",
                padding: "10px",
              }}
            >
              List your upgrades for sale in $FIELD:
            </h2>
            <Sell
              wallet={wallet}
              candyShop={candyShopRef.current}
              walletConnectComponent={<WalletMultiButton />}
              enableCacheNFT={true}
            />
          </DesContainer>
        </CandyShopDataValidator>
      ) : (
        <>
          <h1>Please Connect Wallet</h1>
          <br></br>
          <WalletMultiButton />
        </>
      )}
    </div>
  );
};

export default FoxMart;

const DesContainer = styled.div`
  width: 100%;
`;
