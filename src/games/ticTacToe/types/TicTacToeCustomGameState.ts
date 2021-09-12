import type { TicTacToeGrid } from './TicTacToeGrid';

export type TicTacToeCustomGameState = Readonly<{
  grid: TicTacToeGrid;
}>;
