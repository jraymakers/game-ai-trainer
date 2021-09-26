import type { MCTSGameStrategyMemory } from '../types/MCTSGameStrategyMemory';
import { updateMCTSStateMemory } from './updateMCTSStateMemory';

export function incrementMCTSStateVisits(
  memory: MCTSGameStrategyMemory | undefined,
  stateKey: string,
): MCTSGameStrategyMemory {
  return updateMCTSStateMemory(memory, stateKey, (stateMemory) => {
    return {
      ...stateMemory,
      visits: stateMemory.visits + 1,
    };
  });
}
