import type { GameDefinition } from '../../../game/types/GameDefinition2';
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

  isLegalConfig: (config) => {
    return config.playerIds.length > 0;
  },

  createInitialState: (config) => {
    if (ExampleGameDefinition.isLegalConfig(config)) {
      return {
        currentPlayerIndex: 0,
        currentValue: config.initialValue,
      };
    } else {
      throw new Error('Invalid configuration!');
    }
  },

  isLegalAction: (config, state, action) => {
    const { minDelta, maxDelta } = config;
    const { delta } = action;
    return minDelta <= delta && delta <= maxDelta;
  },

  getStateAfterAction: (config, state, action) => {
    if (ExampleGameDefinition.isLegalAction(config, state, action)) {
      const { currentPlayerIndex, currentValue } = state;
      const { delta } = action;
      return {
        currentPlayerIndex: (currentPlayerIndex + 1) % config.playerIds.length,
        currentValue: currentValue + delta,
      };
    } else {
      return state;
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
