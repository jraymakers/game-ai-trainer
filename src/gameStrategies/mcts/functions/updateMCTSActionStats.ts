import type { MCTSGameStrategyMemory } from '../types/MCTSGameStrategyMemory';
import { updateMCTSActionMemory } from './updateMCTSActionMemory';

export function updateMCTSActionStats(
  memory: MCTSGameStrategyMemory | undefined,
  stateKey: string,
  actionKey: string,
  winsIncrement: number,
): MCTSGameStrategyMemory {
  return updateMCTSActionMemory(memory, stateKey, actionKey, ({ visits, wins }) => {
    return {
      visits: visits + 1,
      wins: wins + winsIncrement,
    };
  });
}
