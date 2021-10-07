import type { MCTSGameStrategyMemory } from '../types/MCTSGameStrategyMemory';
import type { MCTSStateMemory } from '../types/MCTSStateMemory';

export function updateMCTSStateMemory(
  memory: MCTSGameStrategyMemory | undefined,
  stateKey: string,
  callback: (stateMemory: MCTSStateMemory) => MCTSStateMemory,
): MCTSGameStrategyMemory {
  const definedMemory: MCTSGameStrategyMemory = memory || {}
  const currentStateMemory = definedMemory[stateKey] || { visits: 0, wins: 0 };
  const updatedStateMemory = callback(currentStateMemory);
  return {
    ...definedMemory,
    [stateKey]: updatedStateMemory,
  };
}
