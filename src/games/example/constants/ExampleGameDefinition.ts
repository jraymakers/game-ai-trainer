import type { GameDefinition } from '../../../game/types/GameDefinition';
import { err, ok } from '../../../generalPurpose/types/Result';
import type { ExampleGameAction } from '../types/ExampleGameAction';
import type { ExampleGameConfig } from '../types/ExampleGameConfig';
import type { ExampleGameReport } from '../types/ExampleGameReport';
import type { ExampleGameState } from '../types/ExampleGameState';

export const ExampleGameDefinition: GameDefinition<
  ExampleGameConfig,
  ExampleGameState,
  ExampleGameAction,
  ExampleGameReport
> = {

  createInitialState: (config) => {
    if (config.playerIds.length > 0) {
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
        currentPlayerIndex: (currentPlayerIndex + 1) % config.playerIds.length,
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
