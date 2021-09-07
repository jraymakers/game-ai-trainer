import type { GameDefinition } from '../../../game/types/GameDefinition';
import { err, ok } from '../../../generalPurpose/types/Result';
import type { NimGameConfig } from '../types/NiimGameConfig';
import type { NimGameAction } from '../types/NimGameAction';
import type { NimGameReport } from '../types/NimGameReport';
import type { NimGameState } from '../types/NimGameState';

export const NimGameDefinition: GameDefinition<
  NimGameConfig,
  NimGameState,
  NimGameAction,
  NimGameReport
> = {

  createInitialState: (config) => {
    if (config.playerIds.length > 0) {
      return err(new Error('There must be at least one player!'));
    }
    return ok({
      currentPlayerIndex: 0,
      currentRows: config.initialRows,
    });
  },

  isLegalAction: (config, state, action) => {
    const { currentRows } = state;
    const { rowIndex, itemsToRemove } = action;
    return 0 <= rowIndex && rowIndex < currentRows.length && itemsToRemove <= currentRows[rowIndex];
  },

  performAction: (config, state, action) => {
    if (NimGameDefinition.isLegalAction(config, state, action)) {
      const { currentPlayerIndex, currentRows } = state;
      const { rowIndex, itemsToRemove } = action;
      return ok({
        currentPlayerIndex: (currentPlayerIndex + 1) % config.playerIds.length,
        currentRows: currentRows.map(
          (rowItemCount, index) => index === rowIndex ? rowItemCount - itemsToRemove : rowItemCount
        ),
      });
    } else {
      return err(new Error('Illegal action!'));
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
