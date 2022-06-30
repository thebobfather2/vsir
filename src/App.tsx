import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
    GlowWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import React, { FC, ReactNode, useMemo } from 'react';
import Navbar from './components/Navbar'
import Shop from './components/Shop'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Send from './Pages/Send'
import Custom from './Pages/Custom';
import Raffles from './Pages/Raffles';
import Auctions from './Pages/Auctions';
import BulkSend from './Pages/BulkSend';
import Cleaner from './Pages/Cleaner';
import Gallery from './Pages/Gallery';

require('./App.css')
require('@solana/wallet-adapter-react-ui/styles.css');

const App: FC = () => {
    return (
        <div className='App'>
            <BrowserRouter>
                <Context>
                    <Navbar />
                    <Content />
                </Context>
            </BrowserRouter>
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
                <Route path="/" element={<Shop />} />
                <Route path="/Send" element={<Send />} />
                <Route path="/BulkSend" element={<BulkSend />} />
                <Route path="/Cleaner" element={<Cleaner />} />
                <Route path="/Custom" element={<Custom />} />
                <Route path="/Raffles" element={<Raffles />} />
                <Route path="/Auctions" element={<Auctions />} />
                <Route path="/Gallery" element={<Gallery />} />
            </Routes>
        </>
    );
};
