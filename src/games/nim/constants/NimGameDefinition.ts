import type { GameDefinition } from '../../../game/types/GameDefinition';
import { nextIndex } from '../../../generalPurpose/functions/nextIndex';
import { prevIndex } from '../../../generalPurpose/functions/prevIndex';
import type { NimGameAction } from '../types/NimGameAction';
import type { NimGameConfig } from '../types/NimGameConfig';
import type { NimGameReport } from '../types/NimGameReport';
import type { NimGameResult } from '../types/NimGameResult';
import type { NimGameState } from '../types/NimGameState';
import type { NimRows } from '../types/NimRows';

function getNextNimGameResult(
  config: NimGameConfig,
  nextRows: NimRows,
  prevCurrentPlayerIndex: number,
  nextCurrentPlayerIndex: number,
): NimGameResult | null {
  if (!nextRows.some(rowItemCount => rowItemCount > 0)) {
    if (config.misere) {
      return { winnerIndex: nextCurrentPlayerIndex }; 
    } else {
      return { winnerIndex: prevCurrentPlayerIndex };
    }
  }
  return null;
}

export const NimGameDefinition: GameDefinition<
  NimGameConfig,
  NimGameState,
  NimGameAction,
  NimGameReport
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
      const nextGameResult = getNextNimGameResult(
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

  isComplete: (config, state) => {
    return !state.currentRows.some(rowItemCount => rowItemCount > 0);
  },

  getReport: (config, state) => {
    if (NimGameDefinition.isComplete(config, state)) {
      const { currentPlayerIndex } = state;
      const { playerIds, misere } = config;
      const previousPlayerIndex = prevIndex(currentPlayerIndex, playerIds);
      if (misere) {
        return { losingPlayerIndex: previousPlayerIndex };
      } else {
        return { winningPlayerIndex: previousPlayerIndex };
      }
    } else {
      return {};
    }
  },

};
