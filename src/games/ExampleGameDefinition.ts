import type { GameDefinition } from 'src/game/types/GameDefinition';
import type { SingleLoserGameReport, SingleWinnerGameReport } from 'src/game/types/GameReports';
import type {
  CurrentPlayerGameState,
  MultiplayerGameConfig
} from 'src/game/types/MultiplayerGameTypes';
import { err, ok } from 'src/generalPurpose/types/Result';

export type ExampleGameConfig = MultiplayerGameConfig & Readonly<{
  initialValue: number;
  targetValue: number;
  minDelta: number;
  maxDelta: number;
  misere: number;
}>;

export type ExampleGameState = CurrentPlayerGameState & Readonly<{
  currentValue: number;
}>;

export type ExampleGameAction = Readonly<{
  delta: number;
}>;

export type ExampleGameReport = SingleWinnerGameReport | SingleLoserGameReport | {};

export const ExampleGameDefinition: GameDefinition<
  ExampleGameConfig,
  ExampleGameState,
  ExampleGameAction,
  ExampleGameReport
> = {

  createInitialState: (config) => {
    if (config.players.length > 0) {
      return err(new Error('There must be at least one player!'));
    }
    return ok({
      currentPlayerIndex: 0,
      currentValue: config.initialValue,
    });
  },

  isLegalAction: (config, state, action) => {
    const { minDelta, maxDelta } = config;
    const { delta } = action;
    return minDelta <= delta && delta <= maxDelta;
  },

  performAction: (config, state, action) => {
    if (ExampleGameDefinition.isLegalAction(config, state, action)) {
      const { currentPlayerIndex, currentValue } = state;
      const { delta } = action;
      return ok({
        config,
        currentPlayerIndex: (currentPlayerIndex + 1) % config.players.length,
        currentValue: currentValue + delta,
      });
    } else {
      return err(new Error('Illegal action!'));
    }
  },

  isComplete: (config, state) => {
    return state.currentValue === config.targetValue;
  },

  getReport: (config, state) => {
    if (ExampleGameDefinition.isComplete(config, state)) {
      const { currentPlayerIndex } = state;
      const { misere } = config;
      if (misere) {
        return { winningPlayerIndex: currentPlayerIndex };
      } else {
        return { losingPlayerIndex: currentPlayerIndex };
      }
    } else {
      return {};
    }
  },

};
