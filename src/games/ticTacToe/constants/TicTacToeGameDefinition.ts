import type { GameDefinition } from '../../../gameDefinition/types/GameDefinition';
import { nextIndex } from '../../../generalPurpose/functions/nextIndex';
import { getTicTacToeGameResult } from '../functions/getTicTacToeGameResult';
import { serializeTicTacToeGrid } from '../functions/serializeTicTacToeGrid';
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

  getStateKey: (gameState) => {
    return serializeTicTacToeGrid(gameState.customGameState.grid);
  },

  getActionKey: (gameAction) => {
    return `${gameAction.rowIndex}_${gameAction.colIndex}`;
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

  getLegalActions: (gameState) => {
    const { customGameState } = gameState;
    const { grid } = customGameState;
    const actions: TicTacToeGameAction[] = [];
    grid.forEach((gridRow, rowIndex) => {
      gridRow.forEach((cell, colIndex) => {
        if (cell === null) {
          actions.push({ rowIndex, colIndex });
        }
      });
    });
    return actions;
  },

  getStateAfterAction: (gameAction, gameState, gameConfig) => {
    const { players } = gameConfig;
    const { currentPlayerIndex, customGameState } = gameState;
    const { grid } = customGameState;
    const { rowIndex: actionRowIndex, colIndex: actionColIndex } = gameAction;
    const nextCurrentPlayerIndex = nextIndex(currentPlayerIndex, players);
    const nextGrid = grid.map(
      (gridRow, rowIndex) =>
      rowIndex === actionRowIndex
          ? gridRow.map((cell, colIndex) => colIndex === actionColIndex ? currentPlayerIndex : cell)
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
