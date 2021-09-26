import type { MemoryStore } from '../types/MemoryStore';
import type { PlayerMemory } from '../types/PlayerMemory';

export function updatePlayerMemory(
  memoryStore: MemoryStore,
  playerId: string,
  newPlayerMemory: PlayerMemory,
): MemoryStore {
  return {
    ...memoryStore,
    playerMemories: {
      ...memoryStore.playerMemories,
      [playerId]: newPlayerMemory,
    }
  };
}
