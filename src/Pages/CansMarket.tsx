import { CandyShopDataValidator, Orders, Stat } from "@liqnft/candy-shop";
import { CandyShop } from "@liqnft/candy-shop-sdk";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useRef } from "react";
import styled from "styled-components";
import {
  CANDY_SHOP_CREATOR_ADDRESS,
  CANDY_SHOP_PROGRAM_ID_CANS,
  CANDY_SHOP_TREASURY_MINT_CANS,
  NETWORK,
} from "../components/candy-shop-cans";
import "./CarotMarket.css";

const CansMarket: React.FC = () => {
  const wallet = useAnchorWallet();
  const RPC = "https://solana-api.projectserum.com/";

  const candyShopRef = useRef<CandyShop>(
    new CandyShop({
      candyShopCreatorAddress: CANDY_SHOP_CREATOR_ADDRESS,
      treasuryMint: CANDY_SHOP_TREASURY_MINT_CANS,
      candyShopProgramId: CANDY_SHOP_PROGRAM_ID_CANS,
      env: NETWORK,
      // pass additional settings param to configure shop display
      settings: {
        currencySymbol: "$CANS",
        currencyDecimals: 0,
        priceDecimals: 0,
        volumeDecimals: 1,
        mainnetConnectionUrl: RPC,
      },
    })
  );
  return (
    <div className="CarotMarketMain">
      {wallet ? (
        <CandyShopDataValidator>
          <DesContainer>
            <Stat
              candyShop={candyShopRef.current}
              title={"$CANS NFT Marketplace"}
              description={"Use your $CANS to Purchase NFTs!"}
              style={{ paddingBottom: 50 }}
            />
            <Orders
              wallet={wallet}
              candyShop={candyShopRef.current}
              walletConnectComponent={<WalletMultiButton />}
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

export default CansMarket;

const DesContainer = styled.div`
  width: 100%;
`;
