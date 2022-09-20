import { PublicKey, Cluster } from "@solana/web3.js";
import { CandyShop } from "@liqnft/candy-shop-sdk";

const CANDY_SHOP_CREATOR_ADDRESS_FOX = new PublicKey(
  process.env.REACT_APP_CANDY_SHOP_CREATOR_ADDRESS_FOX!
);
const CANDY_SHOP_TREASURY_MINT_FOX = new PublicKey(
  process.env.REACT_APP_CANDY_SHOP_TREASURY_MINT_FOX!
);
const CANDY_SHOP_PROGRAM_ID_FOX = new PublicKey(
  process.env.REACT_APP_CANDY_SHOP_PROGRAM_ID_FOX!
);
const NETWORK = process.env.REACT_APP_SOLANA_NETWORK! as Cluster;

const candyShopFox = new CandyShop({
  candyShopCreatorAddress: CANDY_SHOP_CREATOR_ADDRESS_FOX,
  treasuryMint: CANDY_SHOP_TREASURY_MINT_FOX,
  candyShopProgramId: CANDY_SHOP_PROGRAM_ID_FOX,
  env: NETWORK,
  settings: {
    currencyDecimals: Number(0),
    currencySymbol: "$FIELD",
  },
});

export {
  candyShopFox,
  CANDY_SHOP_CREATOR_ADDRESS_FOX,
  CANDY_SHOP_TREASURY_MINT_FOX,
  CANDY_SHOP_PROGRAM_ID_FOX,
  NETWORK,
};
