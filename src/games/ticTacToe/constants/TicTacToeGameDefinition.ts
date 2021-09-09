import type { GameDefinition } from '../../../game/types/GameDefinition';
import { nextIndex } from '../../../generalPurpose/functions/nextIndex';
import type { TicTacToeGameAction } from '../types/TicTacToeGameAction';
import type { TicTacToeGameConfig } from '../types/TicTacToeGameConfig';
import type { TicTacToeGameReport } from '../types/TicTacToeGameReport';
import type { TicTacToeGameState } from '../types/TicTacToeGameState';

export const TicTacToeGameDefinition: GameDefinition<
  TicTacToeGameConfig,
  TicTacToeGameState,
  TicTacToeGameAction,
  TicTacToeGameReport
> = {

  isLegalConfig: (config) => {
    return config.playerIds.length > 0;
  },

  createInitialState: (config) => {
    if (TicTacToeGameDefinition.isLegalConfig(config)) {
      return {
        currentPlayerIndex: 0,
        grid: [[null, null, null], [null, null, null], [null, null, null]],
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
      return {
        currentPlayerIndex: nextIndex(currentPlayerIndex, playerIds),
        grid: grid.map(
          (gridRow, rowIndex) =>
            rowIndex === row
              ? gridRow.map((cell, colIndex) => colIndex === col ? currentPlayerIndex : cell)
              : gridRow
        ),
      };
    } else {
      return state;
    }
  },

  isComplete: (config, state) => {
    // todo
    return false;
  },

  getReport: (config, state) => {
    if (TicTacToeGameDefinition.isComplete(config, state)) {
      // todo
      return {};
    } else {
      return {};
    }
  },

};
