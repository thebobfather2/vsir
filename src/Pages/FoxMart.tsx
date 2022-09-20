import { useRef } from "react";
import { CandyShop } from "@liqnft/candy-shop-sdk";
import { CandyShopDataValidator, Orders, Stat } from "@liqnft/candy-shop";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import {
  CANDY_SHOP_CREATOR_ADDRESS_FOX,
  CANDY_SHOP_TREASURY_MINT_FOX,
  CANDY_SHOP_PROGRAM_ID_FOX,
  NETWORK,
} from "../components/candy-shop-fox";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import styled from "styled-components";
import './CarotMarket.css'

const FoxMart: React.FC = () => {
  const wallet = useAnchorWallet();

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
      },
    })
  );
  return (
    <div className='CarotMarketMain' style={{padding: 80}}>
      { wallet? (

          <CandyShopDataValidator>
       <DesContainer>
      <Stat
        candyShop={candyShopRef.current}
        title={"Fox Mart"}
        description={
          "Use Field Coin to purchase potions for Edd!"
        }
        style={{ paddingBottom: 50 }}
      />
      <Orders
        wallet={wallet}
        candyShop={candyShopRef.current}
        walletConnectComponent={<WalletMultiButton />}
      />
    </DesContainer></CandyShopDataValidator>) :
     (<>
    <h1>Please Connect Wallet</h1>
    <br></br>
    <WalletMultiButton />
    </>)}
    </div>
  )
}

export default FoxMart

const DesContainer = styled.div`
  width: 100%;
`;