import type { CurrentPlayerGameState } from '../../../game/types/CurrentPlayerGameState';
import type { SingleWinnerGameState } from '../../../game/types/SingleWinnerGameState';
import type { TicTacToeGrid } from './TicTacToeGrid';

export type TicTacToeGameState = CurrentPlayerGameState & SingleWinnerGameState & Readonly<{
  grid: TicTacToeGrid;
}>;
