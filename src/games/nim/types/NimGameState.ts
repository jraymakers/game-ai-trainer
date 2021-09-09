import type { CurrentPlayerGameState } from '../../../game/types/CurrentPlayerGameState';
import type { SingleWinnerGameState } from '../../../game/types/SingleWinnerGameState';
import type { NimRows } from './NimRows';

export type NimGameState = CurrentPlayerGameState & SingleWinnerGameState & Readonly<{
  currentRows: NimRows;
}>;
