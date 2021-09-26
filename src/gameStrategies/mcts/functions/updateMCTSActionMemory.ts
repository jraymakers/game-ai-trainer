import type { MCTSActionMemory } from '../types/MCTSActionMemory';
import type { MCTSGameStrategyMemory } from '../types/MCTSGameStrategyMemory';
import { updateMCTSStateMemory } from './updateMCTSStateMemory';

export function updateMCTSActionMemory(
  memory: MCTSGameStrategyMemory | undefined,
  stateKey: string,
  actionKey: string,
  callback: (actionMemory: MCTSActionMemory) => MCTSActionMemory,
): MCTSGameStrategyMemory {
  return updateMCTSStateMemory(memory, stateKey, (stateMemory) => {
    const actionMemories = stateMemory.actionMemories;
    const actionMemory: MCTSActionMemory = actionMemories[actionKey] || { visits: 0, wins: 0 };
    const updatedActionMemory = callback(actionMemory);
    return {
      ...stateMemory,
      actionMemories: {
        ...actionMemories,
        [actionKey]: updatedActionMemory,
      }
    };
  });
}
