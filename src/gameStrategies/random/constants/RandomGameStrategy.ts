import type { GameStrategy } from '../../../gameStrategy/types/GameStrategy';
import type { JsonObject } from '../../../generalPurpose/types/Json';

export const RandomGameStrategy: GameStrategy<JsonObject, JsonObject, JsonObject, JsonObject, JsonObject> = {
  getNextActionAndPlayerGameState: (gameState, gameConfig, gameDefinition, playerMemoryForGame) => {
    const actions = gameDefinition.getLegalActions(gameState, gameConfig);
    if (actions.length > 0) {
      const nextAction = actions[Math.floor(Math.random() * actions.length)];
      const currentActionsTaken = +(playerMemoryForGame.actionsTaken ?? 0);
      return { nextAction, nextPlayerMemoryForGame: { actionsTaken: currentActionsTaken + 1 } };
    }
    return {};
  }
};
