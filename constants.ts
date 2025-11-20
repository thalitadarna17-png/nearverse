import { Hero, HeroClass, Rarity } from './types';

export const MOCK_HEROES: Hero[] = [
  {
    id: 'nft-001',
    name: 'Kaelen Vex',
    class: HeroClass.CyberKnight,
    level: 5,
    xp: 2400,
    rarity: Rarity.Rare,
    image: 'https://picsum.photos/400/400?random=1',
    staked: false,
    power: 78
  },
  {
    id: 'nft-002',
    name: 'Unit 734',
    class: HeroClass.NeuralHacker,
    level: 3,
    xp: 1200,
    rarity: Rarity.Common,
    image: 'https://picsum.photos/400/400?random=2',
    staked: true,
    power: 45
  },
  {
    id: 'nft-003',
    name: 'Dr. Aris',
    class: HeroClass.ChronoMedic,
    level: 8,
    xp: 5600,
    rarity: Rarity.Legendary,
    image: 'https://picsum.photos/400/400?random=3',
    staked: false,
    power: 120
  }
];

export const QUEST_TEMPLATES = [
  "Infiltrate the Neon Spire",
  "Salvage the Derelict Station",
  "Hack the Corporate Mainframe",
  "Escort the VIP through Sector 9"
];