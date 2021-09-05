import { singleLoserScores, singleWinnerScores, zeroScores } from 'src/game/functions/PlayerScoresHelpers';
import type { BaseGameConfig, BaseGameState, GameDefinition } from 'src/game/types/GameDefinition';

export type NimRows = readonly number[];

export type NimGameConfig = BaseGameConfig & Readonly<{
  initialRows: NimRows;
  misere: boolean;
}>;

export type NimGameState = BaseGameState<NimGameConfig> & Readonly<{
  currentPlayerIndex: number;
  currentRows: NimRows;
}>;

export type NimGameAction = Readonly<{
  rowIndex: number;
  itemsToRemove: number;
}>

export const NimGameDefinition: GameDefinition<
  NimGameConfig,
  NimGameState,
  NimGameAction
> = {
  displayName: 'Nim',
  createInitialState: (config) => {
    if (config.players.length > 0) {
      return { message: 'There must be at least one player!' };
    }
    return {
      config,
      currentPlayerIndex: 0,
      currentRows: config.initialRows,
    };
  },
  isLegalAction: (state, action) => {
    const { currentRows } = state;
    const { rowIndex, itemsToRemove } = action;
    return 0 <= rowIndex && rowIndex < currentRows.length && currentRows[rowIndex] <= itemsToRemove;
  },
  performAction: (state, action) => {
    if (NimGameDefinition.isLegalAction(state, action)) {
      const { config, currentPlayerIndex, currentRows } = state;
      const { rowIndex, itemsToRemove } = action;
      return {
        config,
        currentPlayerIndex: (currentPlayerIndex + 1) % config.players.length,
        currentRows: currentRows.map(
          (rowItemCount, index) => index === rowIndex ? rowItemCount - itemsToRemove : rowItemCount
        ),
      }
    } else {
      return state;
    }
  },
  isCompleted: (state) => {
    return !state.currentRows.some(rowItemCount => rowItemCount > 0);
  },
  getPlayerScores: (state) => {
    if (NimGameDefinition.isCompleted(state)) {
      const { config, currentPlayerIndex } = state;
      const { players, misere } = config;
      const previousPlayerIndex = (currentPlayerIndex - 1 + players.length) % players.length;
      if (misere) {
        return singleLoserScores(state, previousPlayerIndex);
      } else {
        return singleWinnerScores(state, previousPlayerIndex);
      }
    } else {
      return zeroScores(state);
    }
  }
};
