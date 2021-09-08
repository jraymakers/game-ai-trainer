import type { GameRegistration } from '../../game/types/GameRegistration';
import { NimGameRegistration } from '../../games/nim/constants/NimGameRegistration';

export const gameCatalog: readonly GameRegistration[] = [
  NimGameRegistration,
];
