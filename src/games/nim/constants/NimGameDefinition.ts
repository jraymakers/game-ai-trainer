import type { GameDefinition } from '../../../gameDefinition/types/GameDefinition';
import { nextIndex } from '../../../generalPurpose/functions/nextIndex';
import { getNimGameResult } from '../functions/getNimGameResult';
import type { NimGameAction } from '../types/NimGameAction';
import type { NimGameConfig } from '../types/NimGameConfig';
import type { NimGameState } from '../types/NimGameState';

export const NimGameDefinition: GameDefinition<
  NimGameConfig,
  NimGameState,
  NimGameAction
> = {

  isLegalConfig: (config) => {
    return config.playerIds.length > 0;
  },

  createInitialState: (config) => {
    if (NimGameDefinition.isLegalConfig(config)) {
      return {
        currentPlayerIndex: 0,
        currentRows: config.initialRows,
        gameResult: null,
      };
    } else {
      throw new Error('Invalid configuration!');
    }
  },

  isLegalAction: (config, state, action) => {
    const { currentRows } = state;
    const { rowIndex, itemsToRemove } = action;
    return 0 <= rowIndex && rowIndex < currentRows.length
      && 0 < itemsToRemove && itemsToRemove <= currentRows[rowIndex];
  },

  getStateAfterAction: (config, state, action) => {
    if (NimGameDefinition.isLegalAction(config, state, action)) {
      const { playerIds } = config;
      const { currentPlayerIndex, currentRows } = state;
      const { rowIndex, itemsToRemove } = action;
      const nextCurrentPlayerIndex = nextIndex(currentPlayerIndex, playerIds);
      const nextCurrentRows = currentRows.map(
        (rowItemCount, index) => index === rowIndex ? rowItemCount - itemsToRemove : rowItemCount
      );
      const nextGameResult = getNimGameResult(
        config, nextCurrentRows, currentPlayerIndex, nextCurrentPlayerIndex);
      return {
        currentPlayerIndex: nextCurrentPlayerIndex,
        currentRows: nextCurrentRows,
        gameResult: nextGameResult,
      };
    } else {
      return state;
    }
  },

};
