import type { MCTSStateMemory } from './MCTSStateMemory';

export type MCTSGameStrategyMemory = {
  readonly [stateKey: string]: MCTSStateMemory | undefined;
};
