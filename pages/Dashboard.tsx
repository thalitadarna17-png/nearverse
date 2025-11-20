import React from 'react';
import { Hero } from '../types';
import { HeroCard } from '../components/HeroCard';
import { Users, Plus } from 'lucide-react';

interface DashboardProps {
  heroes: Hero[];
  onMint: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ heroes, onMint }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
            <h2 className="text-3xl font-display font-bold text-white mb-1">Barracks</h2>
            <p className="text-slate-400 text-sm max-w-lg">Manage your operatives. Stake them in the Chrono-Vaults to earn $QUANT or deploy them on missions.</p>
        </div>
        <button 
            onClick={onMint}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-sm font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all"
        >
            <Plus size={18} />
            Recruit Hero
        </button>
      </div>

      {heroes.length === 0 ? (
        <div className="h-64 flex flex-col items-center justify-center border border-dashed border-slate-700 rounded-lg bg-slate-900/50 text-slate-500">
            <Users size={48} className="mb-4 opacity-50" />
            <p>No operatives found in local barracks.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {heroes.map(hero => (
            <HeroCard 
                key={hero.id} 
                hero={hero} 
                actionLabel={hero.staked ? "Unstake" : "Stake"}
                onAction={() => console.log("Stake toggle", hero.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};