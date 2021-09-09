import type { GameRegistration } from '../../game/types/GameRegistration';
import { NimGameRegistration } from '../../games/nim/constants/NimGameRegistration';
import { TicTacToeGameRegistration } from '../../games/ticTacToe/constants/TicTacToeGameRegistration';

export const gameCatalog: readonly GameRegistration[] = [
  NimGameRegistration,
  TicTacToeGameRegistration,
];
