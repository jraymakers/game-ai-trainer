import type { GameStrategy } from '../../../gameStrategy/types/GameStrategy';
import type { JsonObject } from '../../../generalPurpose/types/Json';
import type { MonteCarloTreeSearchGameStrategyMemory } from '../types/MonteCarloTreeSearchGameStrategyMemory';

export const MonteCarloTreeSearchGameStrategy: GameStrategy<
  JsonObject,
  JsonObject,
  JsonObject,
  JsonObject,
  MonteCarloTreeSearchGameStrategyMemory
> = {
  getNextActionAndMemory: (gameState, gameConfig, gameDefinition, playerMemoryForGame) => {
    const actions = gameDefinition.getLegalActions(gameState, gameConfig);
    if (actions.length > 0) {
      const nextAction = actions[Math.floor(Math.random() * actions.length)];
      return {
        nextAction,
        nextPlayerMemoryForGame: {
          n: (playerMemoryForGame.n || 0) + 1,
        },
      };
    }
    return {};
  }
};
