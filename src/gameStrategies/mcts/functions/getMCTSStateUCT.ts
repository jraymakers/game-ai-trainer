import type { MCTSStateMemory } from '../types/MCTSStateMemory';

const sqrt_2 = Math.sqrt(2);

export function getMCTSStateUCT(stateMemory: MCTSStateMemory, logParentStateVisits: number): number | null {
  const { visits, wins } = stateMemory;
  if (visits > 0) {
    return (1 - wins/visits) + sqrt_2 * Math.sqrt(logParentStateVisits/visits);
  } else {
    return null;
  }
}
