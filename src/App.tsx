import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  GlowWalletAdapter,
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import React, { FC, ReactNode, useEffect, useMemo, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Navbar2 from "./components/Navbar2";
import Shop from "./components/Shop";
import Auctions from "./Pages/Auctions";
import Baad from "./Pages/Baad";
import BulkSend from "./Pages/BulkSend";
import CansMarket from "./Pages/CansMarket";
import CarotMarket from "./Pages/CarotMarket";
import Cleaner from "./Pages/Cleaner";
import CoinFlip from "./Pages/CoinFlip";
import Custom from "./Pages/Custom";
import Dashboard from "./Pages/Dashboard";
import EddFox from "./Pages/EddFox";
import Gallery from "./Pages/Gallery";
import Home from "./Pages/Home";
import NftMinter from "./Pages/NftMinter";
import Partners from "./Pages/Partners";
import Raffles from "./Pages/Raffles";
import Send from "./Pages/Send";
import Slots from "./Pages/Slots";
import BunnyClub from "./Pages/BunnyClub";
import Launchpad from "./Pages/Launchpad";
import GrouchyTigers from "./Pages/GrouchyTigers";
import JackTuber from "./Pages/JackTuber";
import FoxMart from "./Pages/FoxMart";
import UpgradeFox from "./Pages/UpgradeFox";
import GnarAFDAO from "./Pages/GnarAFDAO";


require("./App.css");
require("@solana/wallet-adapter-react-ui/styles.css");

const App: FC = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", changeWidth);
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  return (
    <div className="App">
      <HashRouter>
        <Context>
          {screenWidth > 755 ? <Navbar2 /> : <Navbar />}

          <Content />
        </Context>
      </HashRouter>
    </div>
  );
};
export default App;

const Context: FC<{ children: ReactNode }> = ({ children }) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded.
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

const Content: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/Send" element={<Send />} />
        <Route path="/BulkSend" element={<BulkSend />} />
        <Route path="/Cleaner" element={<Cleaner />} />
        <Route path="/Custom" element={<Custom />} />
        <Route path="/Raffles" element={<Raffles />} />
        <Route path="/Auctions" element={<Auctions />} />
        <Route path="/Slots" element={<Slots />} />
        <Route path="/Gallery" element={<Gallery />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Carot-Market" element={<CarotMarket />} />
        <Route path="/Cans-Market" element={<CansMarket />} />
        <Route path="/Flip" element={<CoinFlip />} />
        <Route path="/EddFox" element={<EddFox />} />
        <Route path="/Partners" element={<Partners />} />
        <Route path="/Baad" element={<Baad />} />
        <Route path="/BunnyClub" element={<BunnyClub />} />
        <Route path="/Launchpad" element={<Launchpad />} />
        <Route path="/GrouchyTigers" element={<GrouchyTigers />} />
        <Route path="/JackTuber" element={<JackTuber />} />
        <Route path="/FoxMart" element={<FoxMart />} />
        <Route path="/UpgradeFox" element={<UpgradeFox />} />
        <Route path="/NftMinter" element={<NftMinter />} />
        <Route path="/GnarAFDAO" element={<GnarAFDAO />} />
      </Routes>
    </>
  );
};
