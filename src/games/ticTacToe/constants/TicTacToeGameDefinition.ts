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

  isLegalConfig: (config) => {
    return config.playerIds.length > 0;
  },

  createInitialState: (config) => {
    if (TicTacToeGameDefinition.isLegalConfig(config)) {
      return {
        currentPlayerIndex: 0,
        grid: [[null, null, null], [null, null, null], [null, null, null]],
        gameResult: null,
      };
    } else {
      throw new Error('Invalid configuration!');
    }
  },

  isLegalAction: (config, state, action) => {
    const { row, col } = action;
    return 0 <= row && row < 3 && 0 <= col && col < 3;
  },

  getStateAfterAction: (config, state, action) => {
    if (TicTacToeGameDefinition.isLegalAction(config, state, action)) {
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
    } else {
      return state;
    }
  },

};
