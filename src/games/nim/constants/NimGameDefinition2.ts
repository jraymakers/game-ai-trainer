import type { GameDefinition } from '../../../game/types/GameDefinition2';
import type { NimGameConfig } from '../types/NimGameConfig';
import type { NimGameAction } from '../types/NimGameAction';
import type { NimGameReport } from '../types/NimGameReport';
import type { NimGameState } from '../types/NimGameState';

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
      };
    } else {
      throw new Error('Invalid configuration!');
    }
  },

  isLegalAction: (config, state, action) => {
    const { currentRows } = state;
    const { rowIndex, itemsToRemove } = action;
    return 0 <= rowIndex && rowIndex < currentRows.length && itemsToRemove <= currentRows[rowIndex];
  },

  getStateAfterAction: (config, state, action) => {
    if (NimGameDefinition.isLegalAction(config, state, action)) {
      const { currentPlayerIndex, currentRows } = state;
      const { rowIndex, itemsToRemove } = action;
      return {
        currentPlayerIndex: (currentPlayerIndex + 1) % config.playerIds.length,
        currentRows: currentRows.map(
          (rowItemCount, index) => index === rowIndex ? rowItemCount - itemsToRemove : rowItemCount
        ),
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
      const previousPlayerIndex = (currentPlayerIndex - 1 + playerIds.length) % playerIds.length;
      if (misere) {
        return { losingPlayerIndex: previousPlayerIndex };
      } else {
        return { winningPlayerIndex: previousPlayerIndex };
      }
    } else {
      return {};
    }
  }

};
