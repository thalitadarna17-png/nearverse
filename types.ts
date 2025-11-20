export enum HeroClass {
  CyberKnight = 'Cyber-Knight',
  NeuralHacker = 'Neural Hacker',
  ChronoMedic = 'Chrono-Medic'
}

export enum Rarity {
  Common = 'Common',
  Rare = 'Rare',
  Legendary = 'Legendary',
  Artifact = 'Artifact'
}

export interface Hero {
  id: string;
  name: string;
  class: HeroClass;
  level: number;
  xp: number;
  rarity: Rarity;
  image: string;
  staked: boolean;
  power: number;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Insane';
  rewardStarl: number;
  rewardXp: number;
  duration: number; // in seconds
  requiredLevel: number;
}

export interface WalletState {
  accountId: string | null;
  isConnected: boolean;
  balanceStarl: number;
  balanceQuant: number;
  nearBalance: number;
}

export type ViewState = 'DASHBOARD' | 'MISSIONS' | 'DEFI' | 'MARKETPLACE';