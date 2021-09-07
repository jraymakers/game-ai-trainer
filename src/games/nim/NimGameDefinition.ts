import type { GameDefinition } from '../../game/types/GameDefinition';
import type { SingleLoserGameReport, SingleWinnerGameReport } from '../../game/types/GameReports';
import type { CurrentPlayerGameState, MultiplayerGameConfig } from '../../game/types/MultiplayerGameTypes';
import { err, ok } from '../../generalPurpose/types/Result';

export type NimRows = readonly number[];

export type NimGameConfig = MultiplayerGameConfig & Readonly<{
  initialRows: NimRows;
  misere: boolean;
}>;

export type NimGameState = CurrentPlayerGameState & Readonly<{
  currentRows: NimRows;
}>;

export type NimGameAction = Readonly<{
  rowIndex: number;
  itemsToRemove: number;
}>

export type NimGameReport = SingleWinnerGameReport | SingleLoserGameReport | {};

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
