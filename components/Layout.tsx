import React from 'react';
import { ViewState, WalletState } from '../types';
import { Terminal, Activity, ShoppingBag, Zap, Shield, Globe, LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  view: ViewState;
  setView: (view: ViewState) => void;
  wallet: WalletState;
  onConnect: () => void;
  onDisconnect: () => void;
}

const NavItem = ({ active, onClick, icon: Icon, label }: any) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-3 w-full transition-all duration-300 ${
      active 
      ? 'text-cyan-400 bg-cyan-950/30 border-r-2 border-cyan-400' 
      : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900'
    }`}
  >
    <Icon size={24} className={active ? 'drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : ''} />
    <span className="text-[10px] mt-1 font-display tracking-widest uppercase">{label}</span>
  </button>
);

export const Layout: React.FC<LayoutProps> = ({ children, view, setView, wallet, onConnect, onDisconnect }) => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#020617] text-white relative">
      {/* Background Grid FX */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20" 
           style={{ 
             backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)',
             backgroundSize: '40px 40px'
           }}>
      </div>

      {/* Sidebar */}
      <div className="w-24 z-20 flex flex-col border-r border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="h-20 flex items-center justify-center border-b border-slate-800 bg-cyan-950/20">
            <Globe className="text-cyan-400 animate-pulse" size={32} />
        </div>

        <nav className="flex-1 py-6 space-y-2">
          <NavItem 
            active={view === 'DASHBOARD'} 
            onClick={() => setView('DASHBOARD')} 
            icon={Terminal} 
            label="Barracks" 
          />
          <NavItem 
            active={view === 'MISSIONS'} 
            onClick={() => setView('MISSIONS')} 
            icon={Zap} 
            label="Missions" 
          />
          <NavItem 
            active={view === 'DEFI'} 
            onClick={() => setView('DEFI')} 
            icon={Activity} 
            label="Finance" 
          />
          <NavItem 
            active={view === 'MARKETPLACE'} 
            onClick={() => setView('MARKETPLACE')} 
            icon={ShoppingBag} 
            label="Market" 
          />
        </nav>

        <div className="p-4 border-t border-slate-800">
            <div className="text-xs text-slate-600 text-center font-mono mb-2">v0.9.4 BETA</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-950/50 backdrop-blur-sm">
            <div>
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 tracking-widest">
                    NEAR<span className="text-white">VERSE</span>
                </h1>
                <p className="text-xs text-slate-400 font-mono">CONNECTED TO: TESTNET</p>
            </div>

            <div className="flex items-center gap-6">
                {wallet.isConnected && (
                    <div className="hidden md:flex gap-4 text-sm font-mono">
                        <div className="flex items-center gap-2 px-3 py-1 rounded border border-cyan-900 bg-cyan-950/30 text-cyan-300">
                            <span className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_cyan]"></span>
                            {wallet.balanceStarl.toLocaleString()} $STARL
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 rounded border border-purple-900 bg-purple-950/30 text-purple-300">
                            <span className="w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_10px_purple]"></span>
                            {wallet.balanceQuant.toLocaleString()} $QUANT
                        </div>
                    </div>
                )}

                <button
                    onClick={wallet.isConnected ? onDisconnect : onConnect}
                    className={`px-6 py-2 rounded-sm font-display text-sm font-bold tracking-wider transition-all border
                        ${wallet.isConnected 
                            ? 'border-red-900 bg-red-950/20 text-red-400 hover:bg-red-900/40' 
                            : 'border-cyan-500 bg-cyan-600/20 text-cyan-400 hover:bg-cyan-600/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                        }`}
                >
                    {wallet.isConnected ? (
                        <span className="flex items-center gap-2"><LogOut size={16}/> DISCONNECT</span>
                    ) : (
                        <span className="flex items-center gap-2"><Shield size={16}/> JACK IN</span>
                    )}
                </button>
            </div>
        </header>

        {/* View Area */}
        <main className="flex-1 overflow-y-auto p-8 relative">
             {children}
        </main>
      </div>
    </div>
  );
};