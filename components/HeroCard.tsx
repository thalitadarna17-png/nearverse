import React from 'react';
import { Hero, HeroClass } from '../types';
import { Shield, Zap, Brain, HeartPulse } from 'lucide-react';

interface HeroCardProps {
  hero: Hero;
  selected?: boolean;
  onClick?: () => void;
  actionLabel?: string;
  onAction?: (e: React.MouseEvent) => void;
}

export const HeroCard: React.FC<HeroCardProps> = ({ hero, selected, onClick, actionLabel, onAction }) => {
  const getClassIcon = (cls: HeroClass) => {
    switch (cls) {
      case HeroClass.CyberKnight: return <Shield size={16} className="text-blue-400" />;
      case HeroClass.NeuralHacker: return <Brain size={16} className="text-purple-400" />;
      case HeroClass.ChronoMedic: return <HeartPulse size={16} className="text-emerald-400" />;
      default: return <Zap size={16} />;
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'border-slate-600';
      case 'Rare': return 'border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]';
      case 'Legendary': return 'border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.4)]';
      default: return 'border-slate-600';
    }
  };

  return (
    <div 
      onClick={onClick}
      className={`
        relative group cursor-pointer overflow-hidden rounded-lg border-2 bg-slate-900 transition-all duration-300
        ${selected ? 'scale-105 z-10 ring-2 ring-white' : 'hover:scale-102 hover:border-slate-400 opacity-80 hover:opacity-100'}
        ${getRarityColor(hero.rarity)}
      `}
    >
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10"></div>
        <img 
            src={hero.image} 
            alt={hero.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute top-2 right-2 z-20 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-[10px] font-bold uppercase border border-white/10">
            {hero.rarity}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 relative z-20 -mt-8">
        <div className="flex items-center justify-between mb-2">
            <h3 className="font-display font-bold text-lg text-white truncate">{hero.name}</h3>
            <div className="flex items-center gap-1 text-xs text-slate-300 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
                {getClassIcon(hero.class)}
                <span>Lvl {hero.level}</span>
            </div>
        </div>
        
        <div className="space-y-2 mb-4">
            <div className="flex justify-between text-xs text-slate-400">
                <span>Power</span>
                <span className="text-cyan-300 font-mono">{hero.power}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-600" style={{ width: `${(hero.xp / 10000) * 100}%` }}></div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 uppercase">
                <span>XP Progress</span>
                <span>{hero.xp} / 10000</span>
            </div>
        </div>

        {actionLabel && (
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onAction && onAction(e);
                }}
                className="w-full py-2 text-xs font-bold uppercase tracking-wider bg-cyan-900/30 border border-cyan-800 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-colors"
            >
                {actionLabel}
            </button>
        )}
      </div>
    </div>
  );
};