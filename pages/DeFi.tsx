import React, { useState } from 'react';
import { ArrowRightLeft, TrendingUp, Lock } from 'lucide-react';
import { WalletState } from '../types';

interface DeFiProps {
    wallet: WalletState;
}

export const DeFi: React.FC<DeFiProps> = ({ wallet }) => {
    const [swapAmount, setSwapAmount] = useState('');
    const [isSwapping, setIsSwapping] = useState(false);

    const handleSwap = () => {
        setIsSwapping(true);
        setTimeout(() => setIsSwapping(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-2">
                <h2 className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                    RHEA FINANCE TERMINAL
                </h2>
                <p className="text-slate-400">Intergalactic Liquidity Protocol</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Swap Card */}
                <div className="bg-slate-900/80 border border-slate-700 p-6 rounded-xl relative overflow-hidden">
                     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-500"></div>
                     <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <ArrowRightLeft className="text-cyan-400" /> TOKEN SWAP
                     </h3>

                     <div className="space-y-4">
                        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                            <div className="flex justify-between text-xs text-slate-500 mb-2">
                                <span>FROM</span>
                                <span>BAL: {wallet.balanceStarl}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <input 
                                    type="number" 
                                    value={swapAmount}
                                    onChange={(e) => setSwapAmount(e.target.value)}
                                    className="bg-transparent text-2xl font-bold text-white outline-none w-full"
                                    placeholder="0.00"
                                />
                                <span className="font-bold text-cyan-400">$STARL</span>
                            </div>
                        </div>

                        <div className="flex justify-center -my-2 relative z-10">
                            <div className="bg-slate-800 p-2 rounded-full border border-slate-600">
                                <ArrowRightLeft size={16} className="text-slate-400" />
                            </div>
                        </div>

                        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                            <div className="flex justify-between text-xs text-slate-500 mb-2">
                                <span>TO (ESTIMATED)</span>
                                <span>BAL: {wallet.balanceQuant}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold text-slate-300">
                                    {swapAmount ? (parseFloat(swapAmount) * 0.05).toFixed(2) : '0.00'}
                                </span>
                                <span className="font-bold text-purple-400">$QUANT</span>
                            </div>
                        </div>

                        <button 
                            onClick={handleSwap}
                            disabled={!swapAmount || isSwapping}
                            className="w-full py-4 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-black font-bold uppercase tracking-wider rounded transition-all disabled:opacity-50"
                        >
                            {isSwapping ? 'PROCESSING ON NEAR...' : 'INITIATE SWAP'}
                        </button>
                     </div>
                </div>

                {/* Staking Stats */}
                <div className="space-y-6">
                    <div className="bg-slate-900/80 border border-slate-700 p-6 rounded-xl">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <TrendingUp className="text-emerald-400" /> YIELD METRICS
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-950 p-4 rounded border border-slate-800">
                                <div className="text-xs text-slate-500 mb-1">APR</div>
                                <div className="text-2xl font-mono text-emerald-400">142.5%</div>
                            </div>
                            <div className="bg-slate-950 p-4 rounded border border-slate-800">
                                <div className="text-xs text-slate-500 mb-1">TVL</div>
                                <div className="text-2xl font-mono text-white">$4.2M</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-900/20 to-slate-900 border border-purple-500/30 p-6 rounded-xl">
                        <h3 className="text-xl font-bold text-purple-300 mb-2 flex items-center gap-2">
                            <Lock size={18} /> QUANT VAULT
                        </h3>
                        <p className="text-sm text-slate-400 mb-4">
                            Stake your $QUANT to earn protocol fees and upgrade materials for your Cyber-Knights.
                        </p>
                        <button className="w-full py-3 border border-purple-500 text-purple-400 hover:bg-purple-500/10 rounded font-bold uppercase text-sm">
                            Deposit $QUANT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};