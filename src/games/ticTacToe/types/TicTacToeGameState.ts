import type { CurrentPlayerGameState } from '../../../game/types/CurrentPlayerGameState';
import type { TicTacToeGameResult } from './TicTacToeGameResult';
import type { TicTacToeGrid } from './TicTacToeGrid';

export type TicTacToeGameState = CurrentPlayerGameState & Readonly<{
  grid: TicTacToeGrid;
  gameResult: TicTacToeGameResult | null;
}>;
