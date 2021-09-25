import type { GameStrategy } from '../../../gameStrategy/types/GameStrategy';
import type { JsonObject } from '../../../generalPurpose/types/Json';

export const RandomGameStrategy: GameStrategy<JsonObject, JsonObject, JsonObject, JsonObject> = {
  getNextAction: (gameState, gameConfig, gameDefinition) => {
    const actions = gameDefinition.getLegalActions(gameState, gameConfig);
    // console.log(actions);
    if (actions.length > 0) {
      const action = actions[Math.floor(Math.random() * actions.length)];
      // console.log(action);
      return action;
    } else {
      console.warn('no legal actions!');
      return {};
    }
  }
};
