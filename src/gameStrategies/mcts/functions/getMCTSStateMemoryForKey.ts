import type { MCTSGameStrategyMemory } from '../types/MCTSGameStrategyMemory';
import type { MCTSStateMemory } from '../types/MCTSStateMemory';

export function getMCTSStateMemoryForKey(
  stateKey: string,
  memory: MCTSGameStrategyMemory | undefined,
): MCTSStateMemory | undefined {
  if (memory) {
    return memory[stateKey];
  }
  return undefined;
}