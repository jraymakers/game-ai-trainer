import type { CurrentPlayerGameState } from '../../../game/types/CurrentPlayerGameState';
import type { NimRows } from './NimRows';

export type NimGameState = CurrentPlayerGameState & Readonly<{
  currentRows: NimRows;
  winnerIndex: number | null;
}>;
