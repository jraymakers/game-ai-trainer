import type { GameDefinition } from '../../../gameDefinition/types/GameDefinition';
import { nextIndex } from '../../../generalPurpose/functions/nextIndex';
import { getNimGameResult } from '../functions/getNimGameResult';
import { serializeNimRows } from '../functions/serializeNimRows';
import type { NimCustomGameConfig } from '../types/NimCustomGameConfig';
import type { NimCustomGameState } from '../types/NimCustomGameState';
import type { NimGameAction } from '../types/NimGameAction';
import type { NimGameResult } from '../types/NimGameResult';

export const NimGameDefinition: GameDefinition<
  NimCustomGameConfig,
  NimCustomGameState,
  NimGameAction,
  NimGameResult
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
    return {
      initialRows: [3, 5, 7],
      misere: true,
    };
  },

  getStateKey: (gameState, gameConfig) => {
    const miserePart = gameConfig.customGameConfig.misere ? 'M' : 'N';
    const rowsPart = serializeNimRows(gameState.customGameState.currentRows)
    return `${miserePart}_${rowsPart}`;
  },

  getActionKey: (gameAction) => {
    return `${gameAction.rowIndex}_${gameAction.itemsToRemove}`;
  },

  createInitialState: (gameConfig) => {
    return {
      currentPlayerIndex: 0,
      gameResult: null,
      customGameState: {
        currentRows: gameConfig.customGameConfig.initialRows,
      }
    };
  },

  getLegalActions: (gameState) => {
    const { customGameState } = gameState;
    const { currentRows } = customGameState;
    const actions: NimGameAction[] = [];
    currentRows.forEach((rowItemCount, rowIndex) => {
      for (let itemsToRemove = rowItemCount; itemsToRemove >= 1; itemsToRemove--) {
        actions.push({ rowIndex, itemsToRemove });
      }
    });
    return actions;
  },

  getStateAfterAction: (gameAction, gameState, gameConfig) => {
    const { players, customGameConfig } = gameConfig;
    const { currentPlayerIndex, customGameState } = gameState;
    const { currentRows } = customGameState;
    const { rowIndex, itemsToRemove } = gameAction;
    const nextCurrentPlayerIndex = nextIndex(currentPlayerIndex, players);
    const nextCurrentRows = currentRows.map(
      (rowItemCount, index) => index === rowIndex ? rowItemCount - itemsToRemove : rowItemCount
    );
    const nextGameResult = getNimGameResult(
      customGameConfig, nextCurrentRows, currentPlayerIndex, nextCurrentPlayerIndex);
    return {
      currentPlayerIndex: nextCurrentPlayerIndex,
      gameResult: nextGameResult,
      customGameState: {
        currentRows: nextCurrentRows,
      }
    };
  },

};
