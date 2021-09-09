import type { CurrentPlayerGameState } from '../../../game/types/CurrentPlayerGameState';
import type { TicTacToeRow } from './TicTacToeRow';

export type TicTacToeGameState = CurrentPlayerGameState & Readonly<{
  grid: readonly TicTacToeRow[];
}>;
