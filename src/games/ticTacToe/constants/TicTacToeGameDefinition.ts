import type { GameDefinition } from '../../../gameDefinition/types/GameDefinition';
import { nextIndex } from '../../../generalPurpose/functions/nextIndex';
import { getTicTacToeGameResult } from '../functions/getTicTacToeGameResult';
import type { TicTacToeCustomGameConfig } from '../types/TicTacToeCustomGameConfig';
import type { TicTacToeCustomGameState } from '../types/TicTacToeCustomGameState';
import type { TicTacToeGameAction } from '../types/TicTacToeGameAction';
import type { TicTacToeGameResult } from '../types/TicTacToeGameResult';

export const TicTacToeGameDefinition: GameDefinition<
  TicTacToeCustomGameConfig,
  TicTacToeCustomGameState,
  TicTacToeGameAction,
  TicTacToeGameResult
> = {

  getMinPlayerCount: () => {
    return 2;
  },

  getMaxPlayerCount: () => {
    return 2;
  },

  getDefaultPlayerCount: () => {
    return 2;
  },

  getDefaultCustomGameConfig: () => {
    return {};
  },

  createInitialState: () => {
    return {
      currentPlayerIndex: 0,
      gameResult: null,
      customGameState: {
        grid: [[null, null, null], [null, null, null], [null, null, null]],
      },
    };
  },

  getStateAfterAction: (gameConfig, gameState, gameAction) => {
    const { playerIds } = gameConfig;
    const { currentPlayerIndex, customGameState } = gameState;
    const { grid } = customGameState;
    const { row, col } = gameAction;
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
      gameResult: nextGameResult,
      customGameState: {
        grid: nextGrid,
      },
    };
  },

};
