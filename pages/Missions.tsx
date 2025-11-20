import React, { useState } from 'react';
import { Hero, Quest } from '../types';
import { HeroCard } from '../components/HeroCard';
import { generateQuestLore } from '../services/geminiService';
import { Target, AlertTriangle, Loader2, CheckCircle } from 'lucide-react';

interface MissionsProps {
  heroes: Hero[];
}

export const Missions: React.FC<MissionsProps> = ({ heroes }) => {
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
  const [generatedQuest, setGeneratedQuest] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [missionStatus, setMissionStatus] = useState<'IDLE' | 'ACTIVE' | 'COMPLETED'>('IDLE');

  const handleGenerateMission = async (difficulty: string) => {
    if (!selectedHero) return;
    setLoading(true);
    setMissionStatus('IDLE');
    
    const lore = await generateQuestLore(selectedHero, difficulty);
    
    setGeneratedQuest({
        ...lore,
        difficulty,
        rewards: {
            starl: Math.floor(Math.random() * 500) + 100,
            xp: Math.floor(Math.random() * 1000) + 500
        }
    });
    setLoading(false);
  };

  const startMission = () => {
    setMissionStatus('ACTIVE');
    setTimeout(() => {
        setMissionStatus('COMPLETED');
    }, 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
      {/* Hero Selection */}
      <div className="lg:col-span-4 space-y-4 flex flex-col h-full">
        <h3 className="text-xl font-display font-bold text-cyan-400 flex items-center gap-2">
            <Target size={20} /> SELECT OPERATIVE
        </h3>
        <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {heroes.map(hero => (
                <div key={hero.id} className={hero.staked ? 'opacity-50 pointer-events-none grayscale' : ''}>
                     <HeroCard 
                        hero={hero} 
                        selected={selectedHero?.id === hero.id} 
                        onClick={() => !hero.staked && setSelectedHero(hero)}
                    />
                    {hero.staked && <p className="text-xs text-center text-red-400 mt-1">UNIT STAKED</p>}
                </div>
            ))}
        </div>
      </div>

      {/* Mission Control */}
      <div className="lg:col-span-8 flex flex-col h-full">
        <div className="bg-slate-900/80 border border-slate-700 rounded-lg p-8 flex-1 relative overflow-hidden">
            {/* CRT Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%]"></div>

            {!selectedHero ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-600">
                    <Target size={64} className="mb-4 animate-pulse" />
                    <p className="font-mono text-lg">AWAITING OPERATIVE SELECTION...</p>
                </div>
            ) : !generatedQuest ? (
                <div className="h-full flex flex-col items-center justify-center space-y-8 relative z-10">
                    <div className="text-center">
                        <h2 className="text-3xl font-display font-bold text-white mb-2">INITIATE PROTOCOL</h2>
                        <p className="text-slate-400">Select difficulty to scan for local anomalies using AI-SAT.</p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
                        {['Easy', 'Medium', 'Hard'].map((diff) => (
                            <button 
                                key={diff}
                                onClick={() => handleGenerateMission(diff)}
                                disabled={loading}
                                className={`py-4 border border-slate-600 bg-slate-800 hover:bg-cyan-900/50 hover:border-cyan-500 transition-all uppercase font-bold tracking-wider ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {diff}
                            </button>
                        ))}
                    </div>
                    {loading && (
                        <div className="flex items-center gap-3 text-cyan-400 animate-pulse">
                            <Loader2 className="animate-spin" />
                            <span className="font-mono">DECRYPTING MISSION PARAMETERS...</span>
                        </div>
                    )}
                </div>
            ) : (
                <div className="h-full flex flex-col relative z-10 animate-fade-in">
                    <div className="border-b border-slate-700 pb-6 mb-6">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-3xl font-display font-bold text-cyan-400 neon-text">{generatedQuest.title}</h2>
                            <span className="px-3 py-1 rounded border border-red-500 text-red-400 text-xs font-bold uppercase bg-red-950/30">
                                Threat: {generatedQuest.difficulty}
                            </span>
                        </div>
                        <p className="text-slate-300 leading-relaxed font-mono text-sm border-l-2 border-cyan-800 pl-4">
                            {generatedQuest.description}
                        </p>
                    </div>

                    <div className="bg-red-950/10 border border-red-900/30 p-4 rounded mb-6 flex gap-4 items-start">
                        <AlertTriangle className="text-red-500 shrink-0" />
                        <div>
                            <h4 className="text-red-400 font-bold text-sm uppercase mb-1">Enemy Signature Detected</h4>
                            <p className="text-slate-400 text-xs">{generatedQuest.encounter}</p>
                        </div>
                    </div>

                    <div className="mt-auto space-y-4">
                        <div className="flex justify-between items-center text-sm font-mono text-slate-400 bg-slate-950 p-4 rounded">
                            <span>POTENTIAL REWARDS:</span>
                            <div className="flex gap-4 text-white font-bold">
                                <span className="text-cyan-400">{generatedQuest.rewards.starl} $STARL</span>
                                <span className="text-purple-400">{generatedQuest.rewards.xp} XP</span>
                            </div>
                        </div>

                        {missionStatus === 'IDLE' && (
                            <button 
                                onClick={startMission}
                                className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold font-display tracking-widest uppercase rounded shadow-[0_0_20px_rgba(8,145,178,0.5)] transition-all"
                            >
                                Deploy Operative
                            </button>
                        )}
                        
                        {missionStatus === 'ACTIVE' && (
                            <div className="w-full py-4 bg-slate-800 text-cyan-400 font-bold font-mono text-center border border-cyan-900/50 flex items-center justify-center gap-3">
                                <Loader2 className="animate-spin" />
                                MISSION IN PROGRESS...
                            </div>
                        )}

                        {missionStatus === 'COMPLETED' && (
                            <div className="w-full py-4 bg-emerald-900/30 border border-emerald-500/50 text-emerald-400 font-bold font-mono text-center flex items-center justify-center gap-3 animate-bounce">
                                <CheckCircle />
                                MISSION SUCCESSFUL! REWARDS CLAIMED.
                            </div>
                        )}

                        <button 
                            onClick={() => setGeneratedQuest(null)}
                            className="w-full text-xs text-slate-500 hover:text-slate-300 py-2"
                        >
                            ABORT / NEW MISSION
                        </button>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};