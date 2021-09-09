import type { GameDefinition } from '../../../gameDefinition/types/GameDefinition';
import { nextIndex } from '../../../generalPurpose/functions/nextIndex';
import { getTicTacToeGameResult } from '../functions/getTicTacToeGameResult';
import type { TicTacToeGameAction } from '../types/TicTacToeGameAction';
import type { TicTacToeGameConfig } from '../types/TicTacToeGameConfig';
import type { TicTacToeGameState } from '../types/TicTacToeGameState';

export const TicTacToeGameDefinition: GameDefinition<
  TicTacToeGameConfig,
  TicTacToeGameState,
  TicTacToeGameAction
> = {

  createInitialState: (config) => {
    return {
      currentPlayerIndex: 0,
      grid: [[null, null, null], [null, null, null], [null, null, null]],
      gameResult: null,
    };
  },

  getStateAfterAction: (config, state, action) => {
    const { playerIds } = config;
    const { currentPlayerIndex, grid } = state;
    const { row, col } = action;
    const nextCurrentPlayerIndex = nextIndex(currentPlayerIndex, playerIds);
    const nextGrid = grid.map(
      (gridRow, rowIndex) =>
        rowIndex === row
          ? gridRow.map((cell, colIndex) => colIndex === col ? currentPlayerIndex : cell)
          : gridRow
    );
    const nextGameResult = getTicTacToeGameResult(nextGrid);
    return {
      currentPlayerIndex: nextCurrentPlayerIndex,
      grid: nextGrid,
      gameResult: nextGameResult,
    };
  },

};
