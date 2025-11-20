import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Missions } from './pages/Missions';
import { DeFi } from './pages/DeFi';
import { connectWallet, disconnectWallet } from './services/nearService';
import { ViewState, WalletState, Hero } from './types';
import { MOCK_HEROES } from './constants';

function App() {
  const [view, setView] = useState<ViewState>('DASHBOARD');
  const [wallet, setWallet] = useState<WalletState>({
    accountId: null,
    isConnected: false,
    balanceStarl: 0,
    balanceQuant: 0,
    nearBalance: 0
  });
  const [heroes, setHeroes] = useState<Hero[]>([]);

  const handleConnect = async () => {
    try {
      const walletData = await connectWallet();
      setWallet(walletData);
      // Simulate fetching user NFTs after connection
      setHeroes(MOCK_HEROES); 
    } catch (error) {
      console.error("Failed to connect", error);
    }
  };

  const handleDisconnect = async () => {
    const walletData = await disconnectWallet();
    setWallet(walletData);
    setHeroes([]);
    setView('DASHBOARD');
  };

  const handleMint = () => {
    alert("Simulating Mint Transaction on NEAR Testnet...");
    const newHero = { ...MOCK_HEROES[0], id: `nft-minted-${Date.now()}`, name: 'New Recruit' };
    setHeroes([...heroes, newHero]);
  };

  // Render Content based on View
  const renderContent = () => {
    if (!wallet.isConnected) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in">
                <div className="w-24 h-24 bg-cyan-500/10 rounded-full flex items-center justify-center mb-6 border border-cyan-500/50 shadow-[0_0_50px_rgba(6,182,212,0.3)]">
                    <div className="w-16 h-16 bg-cyan-400 rounded-full animate-pulse"></div>
                </div>
                <h1 className="text-5xl font-display font-bold text-white mb-4">WELCOME TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">NEARVERSE</span></h1>
                <p className="text-slate-400 max-w-md text-lg mb-8">Connect your Neural Link (Wallet) to access the decentralized resistance network.</p>
                <button 
                    onClick={handleConnect}
                    className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-lg tracking-widest uppercase rounded shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all transform hover:scale-105"
                >
                    Initialize Connection
                </button>
            </div>
        );
    }

    switch (view) {
        case 'DASHBOARD': return <Dashboard heroes={heroes} onMint={handleMint} />;
        case 'MISSIONS': return <Missions heroes={heroes} />;
        case 'DEFI': return <DeFi wallet={wallet} />;
        case 'MARKETPLACE': return (
            <div className="flex items-center justify-center h-full text-slate-500 font-mono">
                MARKETPLACE MODULE OFFLINE (MAINTENANCE)
            </div>
        );
        default: return <Dashboard heroes={heroes} onMint={handleMint} />;
    }
  };

  return (
    <Layout 
        view={view} 
        setView={setView} 
        wallet={wallet} 
        onConnect={handleConnect} 
        onDisconnect={handleDisconnect}
    >
        {renderContent()}
    </Layout>
  );
}

export default App;