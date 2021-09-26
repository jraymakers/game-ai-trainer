import type { MCTSGameStrategyMemory } from '../types/MCTSGameStrategyMemory';
import type { MCTSStateMemory } from '../types/MCTSStateMemory';

export function updateMCTSStateMemory(
  memory: MCTSGameStrategyMemory | undefined,
  stateKey: string,
  callback: (stateMemory: MCTSStateMemory) => MCTSStateMemory,
): MCTSGameStrategyMemory {
  const definedMemory: MCTSGameStrategyMemory = memory || { stateMemories: {} }
  const stateMemories = definedMemory.stateMemories;
  const stateMemory = stateMemories[stateKey] || { visits: 0, actionMemories: {} };
  const updatedStateMemory = callback(stateMemory);
  return {
    ...definedMemory,
    stateMemories: {
      ...stateMemories,
      [stateKey]: updatedStateMemory,
    }
  };
}
