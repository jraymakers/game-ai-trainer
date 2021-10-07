import type { GameConfig } from '../../../gameDefinition/types/GameConfig';
import type { GameDefinition } from '../../../gameDefinition/types/GameDefinition';
import type { GameState } from '../../../gameDefinition/types/GameState';
import type { JsonObject } from '../../../generalPurpose/types/Json';
import type { MCTSGameStrategyMemory } from '../types/MCTSGameStrategyMemory';
import type { MCTSStateMemory } from '../types/MCTSStateMemory';
import { getMCTSStateMemoryForKey } from './getMCTSStateMemoryForKey';

export function getMCTSStateMemory(
  gameDefinition: GameDefinition<JsonObject, JsonObject, JsonObject, JsonObject>,
  gameConfig: GameConfig<JsonObject>,
  gameState: GameState<JsonObject, JsonObject>,
  memory: MCTSGameStrategyMemory | undefined,
): MCTSStateMemory | undefined {
  const stateKey = gameDefinition.getStateKey(gameState, gameConfig);
  return getMCTSStateMemoryForKey(stateKey, memory);
}
