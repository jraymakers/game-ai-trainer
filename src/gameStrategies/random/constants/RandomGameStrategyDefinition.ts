import type { GameStrategyDefinition } from '../../../gameStrategyDefinition/types/GameStrategyDefinition';
import { randomItem } from '../../../generalPurpose/functions/randomItem';
import type { JsonObject } from '../../../generalPurpose/types/Json';

export const RandomGameStrategyDefinition: GameStrategyDefinition<
  JsonObject,
  JsonObject,
  JsonObject,
  JsonObject,
  null
> = {
  getNextActionAndMemory: (gameState, gameConfig, gameDefinition) => {
    const actions = gameDefinition.getLegalActions(gameState, gameConfig);
    if (actions.length > 0) {
      const nextAction = randomItem(actions);
      return {
        nextAction,
      };
    }
    return null;
  }
};
