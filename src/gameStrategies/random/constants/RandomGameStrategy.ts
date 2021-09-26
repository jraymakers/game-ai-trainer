import type { GameStrategy } from '../../../gameStrategy/types/GameStrategy';
import { randomItem } from '../../../generalPurpose/functions/randomItem';
import type { JsonObject } from '../../../generalPurpose/types/Json';
import type { RandomGameStrategyMemory } from '../types/RandomGameStrategyMemory';

export const RandomGameStrategy: GameStrategy<
  JsonObject,
  JsonObject,
  JsonObject,
  JsonObject,
  RandomGameStrategyMemory
> = {
  getNextActionAndMemory: (gameState, gameConfig, gameDefinition, playerMemoryForGame) => {
    const actions = gameDefinition.getLegalActions(gameState, gameConfig);
    if (actions.length > 0) {
      const nextAction = randomItem(actions);
      return {
        nextAction,
        nextPlayerMemoryForGame: {
          actionsTaken: (playerMemoryForGame.actionsTaken || 0) + 1,
        },
      };
    }
    return {};
  }
};
